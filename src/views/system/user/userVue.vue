<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <!--左侧部门树形菜单列表-->
    <el-aside
      style="
        padding: 10px 0px 0px 0px;
        background: #fff;
        border-right: 1px solid #dfe6ec;
      "
      width="200px"
    >
      <el-tree
        ref="leftTree"
        style="font-size: 14px"
        :data="deptList"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        empty-text="No data"
        :show-checkbox="false"
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <div slot-scope="{ node, data }" class="custom-tree-node">
          <div>
            <span v-if="data.children.length == 0">
              <i class="el-icon-document" />
            </span>
            <span v-else @click.stop="openBtn(data)">
              <svg-icon v-if="data.open" icon-class="add-s" />
              <svg-icon v-else icon-class="sub-s" />
            </span>
            <!--名称-->
            <span style="margin-left: 3px">{{ node.label }}</span>
          </div>
        </div>
      </el-tree>
    </el-aside>
    <!--右侧用户数据-->
    <!--表格数据-->
    <el-main>
      <!--查询条件-->
      <el-form
        ref="searchForm"
        :model="searchModel"
        label-width="80px"
        :inline="true"
        size="small"
      >
        <el-form-item>
          <el-input v-model="searchModel.username" placeholder="Please enter the username" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchModel.realName" placeholder="Please enter the real name" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchModel.phone" placeholder="Please enter the phone number" />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="search(departmentId, pageNo, pageSize)">Search</el-button>
          <el-button icon="el-icon-refresh" @click="resetValue()">Reset</el-button>
          <el-button icon="el-icon-plus" size="small" type="success" @click="openAddWindow()" v-if="hasPermission('sys:user:add')">Add</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据-->
      <el-table
        :height="tableHeight"
        :data="userList"
        border
        stripe
        style="width: 100%;margin-bottom: 10px"
      >
        <el-table-column prop="username" label="Username" align="center" />
        <el-table-column prop="realName" label="Real Name" align="center" />
        <el-table-column prop="departmentName" label="Department" align="center" />
        <el-table-column prop="phone" label="Phone" align="center" />
        <el-table-column prop="email" label="Email" align="center" />
        <el-table-column align="center" width="290" label="Operation">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
              v-if="hasPermission('sys:user:edit')"
            >
              Edit
            </el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              v-if="hasPermission('sys:user:delete')"
            >
              Delete
            </el-button>
            <el-button
              icon="el-icon-setting"
              size="mini"
              type="primary"
              @click="assignRole(scope.row)"
              v-if="hasPermission('sys:user:edit')"
            >
              Assign Role
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页工具栏-->
      <el-pagination
        background
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!--添加和编辑用户窗口-->
      <system-dialog
        :title="userDialog.title"
        :height="userDialog.height"
        :width="userDialog.width"
        :visible="userDialog.visible"
        @onClose="onClose"
        @onConfirm="onConfirm"
      >
        <div slot="content">
          <el-form
            ref="userForm"
            :model="user"
            :rules="rules"
            label-width="80px"
            :inline="true"
            size="small"
          >
            <el-form-item prop="username" label="Username">
              <el-input v-model="user.username" />
            </el-form-item>
            <el-form-item v-if="user.id === ''" prop="password" label="Password">
              <el-input v-model="user.password" type="password" />
            </el-form-item>
            <el-form-item prop="departmentName" label="Department">
              <el-input
                v-model="user.departmentName"
                :readonly="true"
                @click.native="selectDepartment()"
              />
            </el-form-item>
            <el-form-item prop="realName" label="Real Name">
              <el-input v-model="user.realName" />
            </el-form-item>
            <el-form-item prop="phone" label="Phone">
              <el-input v-model="user.phone" />
            </el-form-item>
            <el-form-item prop="nickName" label="Nick Name">
              <el-input v-model="user.nickName" />
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input v-model="user.email" type="email" />
            </el-form-item>
            <el-form-item prop="gender" label="Gender">
              <el-radio-group v-model="user.gender">
                <el-radio :label="0">Male</el-radio>
                <el-radio :label="1">Female</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </system-dialog>
      <!--所属部门弹框-->
      <system-dialog
        :title="parentDialog.title"
        :width="parentDialog.width"
        :height="parentDialog.height"
        :visible="parentDialog.visible"
        @onClose="onParentClose"
        @onConfirm="onParentConfirm"
      >
        <div slot="content">
          <el-tree
            ref="parentTree"
            :data="parentList"
            default-expand-all
            node-key="id"
            :props="parentProps"
            :show-checkbox="false"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="parentClick"
          >
            <div class="customer-tree-node" slot-scope="{ node, data }">
              <span v-if="data.children.length == 0">
                <i class="el-icon-document" />
              </span>
              <span v-else @click.stop="openParentBtn(data)">
                <svg-icon v-if="data.open" icon-class="add-s" />
                <svg-icon v-else icon-class="sub-s" />
              </span>
              <span style="margin-left: 3px">{{ node.label }}</span>
            </div>
          </el-tree>
        </div>
      </system-dialog>
      <!--分配角色窗口-->
      <system-dialog
        :title="assignDialog.title"
        :width="assignDialog.width"
        :height="assignDialog.height"
        :visible="assignDialog.visible"
        @onClose="onAssignClose"
        @onConfirm="onAssignConfirm"
      >
        <div slot="content">
          <!--分配角色数据列表-->
          <el-table
            ref="assignRoleTable"
            :data="assignRoleList"
            border
            stripe
            :height="assignHeignt"
            style="width: 100%;margin-bottom: 10px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            ></el-table-column>
            <el-table-column prop="roleCode" label="Role Code" />
            <el-table-column prop="roleName" label="Role Name" />
            <el-table-column prop="remark" label="Remark" />
          </el-table>
          <!--分页工具栏-->
          <el-pagination
            @size-change="assignSizeChange"
            @current-change="assignCurrentChange"
            :current-page.sync="roleVo.pageNo"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="roleVo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="roleVo.total"
            background
          >
          </el-pagination>
        </div>
      </system-dialog>
    </el-main>
  </el-container>
</template>

<script>
// 导入部门api脚本
import departmentApi from '@/api/department'
// 导入用户api脚本
import userApi from '@/api/user'
import SystemDialog from '@/components/system/SystemDialog'
import { validPhoneNum, validChinese, validUsername, validPassword, validEmail } from '@/utils/validate'

export default {
  name: 'UserVue',
  components: { SystemDialog },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the phone number'))
      } else {
        if (!validPhoneNum(value)) {
          callback(new Error('Please enter the correct phone number'))
        } else {
          callback()
        }
      }
    }
    const validateChinese = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the Chinese'))
      } else {
        if (!validChinese(value)) {
          callback(new Error('Please enter the correct Chinese'))
        } else {
          callback()
        }
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the username'))
      } else {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct username'))
        } else {
          callback()
        }
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the password'))
      } else {
        if (!validPassword(value)) {
          callback(new Error('Please enter the correct password'))
        } else {
          callback()
        }
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter the email'))
      } else {
        if (!validEmail(value)) {
          callback(new Error('Please enter the correct email'))
        } else {
          callback()
        }
      }
    }
    return {
      // 分配角色窗口属性
      assignDialog: {
        title: '',
        width: 800,
        height: 410,
        visible: false
      },
      // 角色对象
      roleVo: {
        pageNo: 1,
        pageSize: 10,
        userId: '',
        total: 0
      },
      // 角色列表
      assignRoleList: [],
      // 分配角色窗口高度
      assignHeignt: 0,
      // 被选择的角色id
      selectedIds: [],
      // 被分配角色的用户id
      selectedUserId: '',
      // 选中所属部门窗口属性
      parentDialog: {
        title: 'Please select the superior department',
        width: 450,
        height: 300,
        visible: false
      },
      // 树节点属性
      parentProps: {
        children: 'children',
        label: 'departmentName'
      },
      // 所属部门节点数据
      parentList: [],
      // 添加和修改用户窗口属性
      userDialog: {
        title: '',
        height: 410,
        width: 610,
        visible: false
      },
      // 用户对象
      user: {
        id: '',
        departmentId: '',
        departmentName: '',
        email: '',
        realName: '',
        phone: '',
        nickName: '',
        password: '',
        username: '',
        gender: ''
      },
      rules: {
        departmentName: [
          { required: true, trigger: 'change', message: 'Please select the department' },
          { validator: validateChinese }
        ],
        realName: [
          { required: true, trigger: 'blur', message: 'Please enter real name' },
          { validator: validateUsername }
        ],
        phone: [
          { required: true, trigger: 'blur', message: 'Please enter phone number' },
          { min: 11, max: 11, validator: validatePhone }
        ],
        username: [
          { required: true, trigger: 'blur', message: 'Please enter username' },
          { validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', message: 'Please enter password' },
          { min: 8, max: 18, validator: validatePassword }
        ],
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        gender: [{ required: true, trigger: 'change', message: 'Please select the gender' }]
      },
      // 自定义点击次数，默认0次
      treeClickCount: 0,
      // 查询条件对象
      searchModel: {
        username: '',
        realName: '',
        phone: '',
        departmentId: '',
        pageNo: 1,
        pageSize: 10
      },
      userList: [], // 用户列表数据
      tableHeight: 0, // 表格高度
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      departmentId: '', // 部门id
      containerHeight: 0, // 容器高度
      deptList: [], // 左侧部门树形菜单列表
      // 树节点属性
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      }
    }
  },
  created() {
    // 查询部门列表
    this.getDeptList()
    // 调用查询用户列表
    this.search(this.departmentId)
  },
  mounted() {
    this.$nextTick(() => {
      // 内容高度
      this.containerHeight = window.innerHeight - 85
      // 表格高度
      this.tableHeight = window.innerHeight - 220
      this.assignHeignt = window.innerHeight - 350
    })
  },
  methods: {
    /**
     * 打开分配角色
     */
    async assignRole(row) {
      // 防止回显出现问题
      this.selectedIds = []
      this.selectedUserId = ''
      // 被分配用户的id
      this.selectedUserId = row.id
      // 显示窗口
      this.assignDialog.visible = true
      // 设置标题
      this.assignDialog.title = `Set User Role for [${row.realName}]`
      // 查询当前登录用户的所有角色信息
      await this.getAssignRoleList()
      // 获取当前被分配用户的id
      const params = {
        userId: row.id
      }
      const res = await userApi.getRoleIdByUserId(params)
      if (res.success && res.data) {
        this.selectedIds = res.data
        // 循环遍历
        this.selectedIds.forEach((key) => {
          this.assignRoleList.forEach((item) => {
            if (item.id === key) {
              this.$refs.assignRoleTable.toggleRowSelection(item, true)
            }
          })
        })
      }
    },
    /**
     * 查询当前登录用户的所有角色信息
     */
    async getAssignRoleList(pageNo = 1, pageSize = 10) {
      // 给用户id赋值
      this.roleVo.userId = this.$store.getters.userId
      this.roleVo.pageNo = pageNo
      this.roleVo.pageSize = pageSize
      // 发送查询请求
      const res = await userApi.getAssignRoleList(this.roleVo)
      // 判断是否成功
      if (res.success) {
        // 角色列表赋值
        this.assignRoleList = res.data.records
        this.roleVo.total = res.data.total
      }
    },
    /**
     * 分配角色取消事件
     */
    onAssignClose() {
      this.assignDialog.visible = false
    },
    /**
     * 分配角色确认事件
     */
    async onAssignConfirm() {
      // 判断用户是否有选中角色
      if (this.selectedIds.length === 0) {
        this.$message.warning('Please select role')
        return
      }
      const params = {
        userId: this.selectedUserId,
        roleIds: this.selectedIds
      }
      // 发送请求
      const res = await userApi.assignRoleSave(params)
      if (res.success) {
        this.$message.success(res.message)
        this.assignDialog.visible = false
      } else {
        this.$message.error(res.message)
      }
    },
    assignSizeChange(size) {
      this.roleVo.pageSize = size
      this.getAssignRoleList(this.roleVo.pageNo, size)
    },
    assignCurrentChange(page) {
      this.roleVo.pageNo = page
      this.getAssignRoleList(page, this.roleVo.pageSize)
    },
    handleSelectionChange(rows) {
      const roleIds = []
      for (let i = 0; i < rows.length; i++) {
        roleIds.push(rows[i].id)
      }
      this.selectedIds = roleIds
    },
    /**
     * 打开添加窗口
     */
    openAddWindow() {
      this.$resetForm('userForm', this.user) // 清空表单
      this.userDialog.visible = true // 显示窗口
      this.userDialog.title = 'New User' // 设置标题
    },
    /**
     * 新增或编辑取消事件
     */
    onClose() {
      this.userDialog.visible = false
    },
    /**
     * 新增或编辑确认事件
     */
    onConfirm() {
      this.$refs.userForm.validate(async(valid) => {
        let res = null
        if (valid) {
          if (this.user.id === '') {
            res = await userApi.addUser(this.user)
          } else {
            res = await userApi.updateUser(this.user)
          }
        }
        if (res.success) {
          this.$message.success(res.message)
          this.search(this.departmentId, this.pageNo, this.pageSize)
          this.userDialog.visible = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    /**
     * 打开选中所属部门窗口
     */
    async selectDepartment() {
      // 查询上级部门数据
      const res = await departmentApi.getDepartmentList(null)
      // 判断是否成功
      if (res.success) {
        this.parentList = res.data
      }
      // 显示窗口
      this.parentDialog.visible = true
    },
    /**
     * 选中上级部门取消事件
     */
    onParentClose() {
      this.parentDialog.visible = false
    },
    /**
     * 选择上级部门确认事件
     */
    onParentConfirm() {
      this.parentDialog.visible = false
    },
    /**
     * 上级部门树节点点击事件
     */
    parentClick(data) {
      this.user.departmentId = data.id
      this.user.departmentName = data.departmentName
    },
    /**
     * 上级部门树加减号图标点击事件
     */
    openParentBtn(data) {
      data.open = !data.open
      this.$refs.parentTree.store.nodesMap[data.id].expanded = !data.open
    },
    /**
     * 查询部门列表
     */
    async getDeptList() {
      const res = await departmentApi.getDepartmentList()
      if (res.success) {
        this.deptList = res.data
      }
    },
    /**
     * 左侧树节点点击事件
     */
    handleNodeClick(data, node) {
      // 记录点击次数
      this.treeClickCount++
      // 清除多点
      if (this.treeClickCount >= 2) {
        return
      }
      // 计时器，以300毫秒为单位
      this.timer = window.setTimeout(() => {
        if (this.treeClickCount === 1) {
          this.treeClickCount = 0
          // 设置部门id
          this.departmentId = data.id
          // 调用查询用户列表
          this.search(this.departmentId)
        } else if (this.treeClickCount > 1) {
          this.treeClickCount = 0
          // 设置部门id
          this.departmentId = ''
          // 调用查询用户列表
          this.search(this.departmentId)
        }
      }, 300)
    },
    /**
     * 查询用户列表
     * @param departmentId
     * @param pageNo
     * @param pageSize
     */
    async search(departmentId, pageNo = 1, pageSize = 10) {
      this.searchModel.pageNo = pageNo
      this.searchModel.pageSize = pageSize
      this.searchModel.departmentId = departmentId
      // 发送查询请求
      const res = await userApi.getUserList(this.searchModel)
      if (res.success) {
        this.userList = res.data.records
        this.total = res.data.total
      }
    },
    /**
     * 当每页数量发生变化时触发该事件
     * @param size
     */
    handleSizeChange(size) {
      this.pageSize = size
      this.search(this.departmentId, this.pageNo, size)
    },
    /**
     * 当页码发生变化时触发该事件
     * @param page
     */
    handleCurrentChange(page) {
      this.pageNo = page
      // 调用查询方法
      this.search(this.departmentId, page, this.pageSize)
    },
    /**
     * 重置查询条件
     */
    resetValue() {
      // 清空查询条件
      this.searchModel = {}
      // 重新查询
      this.searchModel(this.departmentId)
    },
    // 加减号点击事件
    openBtn(data) {
      // 修改折叠展开状态
      data.open = !data.open
      this.$refs.leftTree.store.nodesMap[data.id].expanded = !data.open
    },
    /**
     * 编辑用户
     */
    handleEdit(row) {
      // 设置弹框属性
      this.userDialog.title = 'Edit User' // 设置标题
      this.userDialog.visible = true // 显示窗口
      this.$objCopy(row, this.user)
    },
    /**
     * 删除
     */
    async handleDelete(row) {
      const confirm = await this.$myconfirm('Are you sure to delete this user?')
      if (confirm) {
        const params = { id: row.id }
        const res = await userApi.deleteUser(params)
        if (res.success) {
          this.$message.success(res.message)
          this.search(this.departmentId, this.pageNo, this.pageSize)
        } else {
          this.$message.error(res.message)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
