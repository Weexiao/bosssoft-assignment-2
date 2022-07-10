<template>
  <el-main>
    <!--查询条件-->
    <el-form
      ref="searchForm"
      :model="searchModel"
      label-width="120px"
      :inline="true"
      size="small"
    >
      <el-form-item>
        <el-input v-model="searchModel.roleName" placeholder="Please enter role name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search(pageNo, pageSize)">Search</el-button>
        <el-button icon="el-icon-refresh-right" @click="resetValue">Refresh</el-button>
        <el-button type="success" icon="el-icon-plus" @click="openAddWindow">Add</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <el-table
      :data="roleList"
      :height="tableHeight"
      border
      stripe
      style="width: 100%; margin-bottom: 10px;"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="50"
        align="center"
      />
      <el-table-column prop="roleName" label="Name" />
      <el-table-column prop="remark" label="Remark" />
      <el-table-column label="Operation" align="center" width="290">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="mini"
            @click="handleEdit(scope.row)"
          >Edit</el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row)"
          >Delete</el-button>
          <el-button
            icon="el-icon-setting"
            type="primary"
            size="mini"
            @click="assignRole(scope.row)"
          >Assign Role</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页工具-->
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

    <!--添加和修改角色窗口-->
    <system-dialog
      :title="roleDialog.title"
      :visible="roleDialog.visible"
      :width="roleDialog.width"
      :height="roleDialog.height"
      @onClose="onClose"
      @onConfirm="onConfirm"
    >
      <div slot="content">
        <el-form
          ref="roleForm"
          :model="role"
          :rules="rules"
          label-width="120px"
          :inline="false"
          size="small"
        >
          <el-form-item label="Code" prop="roleCode">
            <el-input v-model="role.roleCode" />
          </el-form-item>
          <el-form-item label="Name" prop="roleName">
            <el-input v-model="role.roleName" />
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="role.remark" type="textarea" :rows="5" />
          </el-form-item>
        </el-form>
      </div>
    </system-dialog>
    <!--分配权限树窗口-->
    <system-dialog
      :title="assignDialog.title"
      :visible="assignDialog.visible"
      :width="assignDialog.width"
      :height="assignDialog.height"
      @onClose="onAssignClose"
      @onConfirm="onAssignConfirm"
    >
      <div slot="content">
        <el-tree
          ref="assignTree"
          :data="assignTreeData"
          node-key="id"
          :props="defaultProps"
          empty-text="No data"
          :show-checkbox="true"
          :highlight-current="true"
          default-expand-all
        />
      </div>
    </system-dialog>
  </el-main>
</template>

<script>
// 导入role.js脚本
import roleApi from '@/api/role'
// 导入对话框组件
import SystemDialog from '@/components/system/SystemDialog'
// 导入叶节点判断
import leafUtils from '@/utils/leaf'

export default {
  name: 'RoleVue',
  components: {
    SystemDialog
  },
  data() {
    return {
      // 分配权限窗口属性
      assignDialog: {
        title: '',
        visible: false,
        height: 450,
        width: 400
      },
      // 角色id
      roleId: '',
      // 树结点数据
      assignTreeData: [],
      // 树结点属性
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 查询条件
      searchModel: {
        roleName: '',
        pageNo: 1,
        pageSize: 10,
        userId: this.$store.getters.userId
      },
      roleList: [], // 数据列表
      tableHeight: 0, // 表格高度
      pageNo: 1, // 当前页码
      pageSize: 10, // 每页条数
      total: 0, // 总条数
      rules: {
        roleCode: [
          { required: true, message: 'Please enter role code', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: 'Please enter role name', trigger: 'blur' }
        ]
      },
      // 添加和修改角色窗口属性
      roleDialog: {
        title: '',
        visible: false,
        width: 500,
        height: 230
      },
      // 角色对象
      role: {
        id: '',
        roleCode: '',
        roleName: '',
        remark: '',
        createUser: this.$store.getters.userId
      }
    }
  },
  created() {
    this.search()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 220
    })
  },
  methods: {
    /**
     * 分配权限
     */
    async assignRole(row) {
      // 设置角色id
      this.roleId = row.id
      // 构建参数
      const params = {
        roleId: row.id,
        userId: this.$store.getters.userId
      }
      // 发送查询请求
      const res = await roleApi.getAssignTree(params)
      // console.log(res)
      // 判断是否成功
      if (res.success) {
        // 获取当前登录用户拥有的所有权限
        const permissionList = res.data.permissionPOList
        // 获取当前被分配的角色已经拥有的权限信息
        const checkList = res.data.checkList
        // 判断当前菜单是否为末级
        const { setLeaf } = leafUtils()
        // 设置权限菜单列表
        const newPermissionList = setLeaf(permissionList)
        // 设置树节点菜单数据
        this.assignTreeData = newPermissionList
        // 将回调延迟到下次dom更新循环之后进行，在修改数据之后立即使用他，然后等待Dom刷新
        this.$nextTick(() => {
          // 获取树菜单的节点数据
          const nodes = this.$refs.assignTree.children
          // 设置子节点
          this.setChild(nodes, checkList)
        })
      }
      // 显示窗口
      this.assignDialog.visible = true
      // 设置窗口标题
      this.assignDialog.title = `Set Permission for [${row.roleName}]`
    },
    /**
     * 设置子节点
     */
    setChild(childNodes, checkList) {
      // 判断是否存在子节点
      if (childNodes && childNodes.length > 0) {
        // 循环所有权限
        for (let i = 0; i < childNodes.length; i++) {
          // 根据data或key拿到tree组件中的node
          const node = this.$refs.assignTree.getNode(childNodes[i])
          // 判断是否已经拥有对应的角色数据
          if (checkList && checkList.length > 0) {
            // 循环遍历已有的权限集合
            for (let j = 0; j < checkList.length; j++) {
              // 找到已经存在的菜单权限节点
              if (checkList[j] === childNodes[i].id) {
                // 如果节点为展开状态，则树节点选中
                if (childNodes[i].open) {
                  this.$refs.assignTree.setChecked(node, true)
                  break
                }
              }
            }
          }
          // 如果存在子节点，则递归选中
          if (childNodes[i].children) {
            this.setChild(childNodes[i].children, checkList)
          }
        }
      }
    },
    /**
     * 分配权限窗口取消事件
     */
    onAssignClose() {
      this.assignDialog.visible = false
    },
    /**
     * 分配权限窗口确认事件
     */
    async onAssignConfirm() {
      // 获取选中的节点key
      const ids = this.$refs.assignTree.getCheckedKeys()
      // 获取选中节点的父节点id
      const pids = this.$refs.assignTree.getHalfCheckedKeys()
      // 组装选中的节点id数据
      const listId = ids.concat(pids)
      // 组装参数
      const params = {
        roleId: this.roleId,
        permissionIds: listId
      }
      // 发送请求
      const res = await roleApi.assignSave(params)
      // 判断是否成功
      if (res.success) {
        // 关闭窗口
        this.assignDialog.visible = false
        // 提示
        this.$message.success(res.message)
      } else {
        this.$message.error(res.data)
      }
    },
    /**
     * 查询
     */
    async search(pageNo = 1, pageSize = 10) {
      this.searchModel.pageNo = pageNo // 当前页码
      this.searchModel.pageSize = pageSize // 每页显示数量
      // 发送查询请求
      const res = await roleApi.getRoleList(this.searchModel)
      // 执行成功
      if (res.success) {
        // 角色列表
        this.roleList = res.data.records
        // 总数量
        this.total = res.data.total
      }
    },
    /**
     * 重置查询条件
     */
    resetValue() {
      // 清空查询条件
      this.searchModel.roleName = ''
      // 重新查询
      this.search()
    },
    /**
     * 当每页数量发送变化时触发该事件
     */
    handleSizeChange(size) {
      this.pageSize = size // 每页显示数量交给成员变量
      this.search(this.pageNo, size) // 重新查询
    },
    /**
     * 当页码发送变化时触发该事件
     */
    handleCurrentChange(page) {
      this.pageNo = page
      this.search(page, this.pageSize) // 重新查询
    },
    /**
     * 打开添加窗口
     */
    openAddWindow() {
      // 清空表单数据
      this.$resetForm('roleForm', this.role)
      this.roleDialog.title = 'Add Role'
      this.roleDialog.visible = true
    },
    /**
     * 窗口取消事件
     */
    onClose() {
      this.roleDialog.visible = false
    },
    /**
     * 窗口确定事件
     */
    onConfirm() {
      // 表单验证
      this.$refs['roleForm'].validate(async valid => {
        if (valid) {
          let res = null
          // 判断角色id是否为空
          if (this.role.id === '') {
            // 发送添加请求
            res = await roleApi.addRole(this.role)
          } else {
            // 发送修改请求
            res = await roleApi.updateRole(this.role)
          }
          // 判断是否成功
          if (res.success) {
            this.$message.success(res.message)
            // 刷新
            this.search(this.pageNo, this.pageSize)
            // 关闭窗口
            this.roleDialog.visible = false
          } else {
            this.$message.error(res.message)
          }
        }
      })
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(row) {
      // 数据回显
      this.$objCopy(row, this.role)
      // 设置窗口标题
      this.roleDialog.title = 'Edit Role'
      // 显示编辑角色窗口
      this.roleDialog.visible = true
    },
    /**
     * 删除
     */
    async handleDelete(row) {
      const result = await roleApi.checkRole({ id: row.id })
      if (!result.success) {
        this.$message.warning(result.message)
      } else {
        const confirm = await this.$myconfirm('Are you sure to delete this role?')
        if (confirm) {
          const res = await roleApi.deleteById({ id: row.id })
          if (res.success) {
            this.$message.success(res.message)
            this.search(this.pageNo, this.pageSize)
          } else {
            this.$message.error(res.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
