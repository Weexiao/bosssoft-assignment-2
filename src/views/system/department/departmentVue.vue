<template>
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
        <el-input v-model="searchModel.departmentName" placeholder="Please enter the department name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search()">Search</el-button>
        <el-button icon="el-icon-refresh-right" @click="resetValue()">Refresh</el-button>
        <el-button type="success" icon="el-icon-plus" @click="openAddWindow()">Add</el-button>
      </el-form-item>
    </el-form>

    <!--数据表格-->
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="departmentName" label="Name" />
      <el-table-column prop="parentName" label="Superior department" />
      <el-table-column prop="address" label="Dept Address" />
      <el-table-column prop="phone" label="Dept Phone" />
      <el-table-column label="Operation" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit-outline"
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >
            Edit
          </el-button>
          <el-button
            icon="el-icon-edit-close"
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加和编辑部门窗口-->
    <system-dialog
      :title="deptDialog.title"
      :visible="deptDialog.visible"
      :width="deptDialog.width"
      :height="deptDialog.height"
      @onClose="onClose"
      @onConfirm="onConfirm"
    >
      <div slot="content">
        <el-form
          ref="deptForm"
          :model="dept"
          :rules="rules"
          label-width="80px"
          :inline="true"
          size="small"
        >
          <el-form-item label="Superior" prop="parentName">
            <el-input
              v-model="dept.parentName"
              :readonly="true"
              @click.native="selectDepartment()"
            />
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="dept.departmentName" />
          </el-form-item>
          <el-form-item label="Phone">
            <el-input v-model="dept.phone" />
          </el-form-item>
          <el-form-item label="Address">
            <el-input v-model="dept.address" />
          </el-form-item>
          <el-form-item label="Order">
            <el-input v-model="dept.orderNum" />
          </el-form-item>
        </el-form>
      </div>
    </system-dialog>

    <!--选择所属部门窗口-->
    <system-dialog
      :title="parentDialog.title"
      :visible="parentDialog.visible"
      :width="parentDialog.width"
      :height="parentDialog.height"
      @onClose="parentOnClose"
      @onConfirm="parentOnConfirm"
    >
      <div slot="content">
        <el-tree
          ref="parentTree"
          :data="treeList"
          node-key="id"
          :props="defaultProps"
          :default-expand-all="true"
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <div slot-scope="{ node, data }" class="customer-tree-node">
            <span v-if="data.children.length === 0">
              <i class="el-icon-document" />
            </span>
            <span v-else @click="openBtn(data)">
              <svg-icon v-if="data.open" icon-class="add-s" />
              <svg-icon v-else icon-class="sub-s" />
            </span>
            <span style="margin-left: 5px">{{ node.label }}</span>
          </div>
        </el-tree>
      </div>
    </system-dialog>
  </el-main>
</template>

<script>
import departmentApi from '@/api/department'
// 导入对话框组件
import SystemDialog from '@/components/system/SystemDialog.vue'

export default {
  name: 'DepartmentVue',
  components: {
    SystemDialog
  },
  data() {
    return {
      // 选择所属部门属性
      parentDialog: {
        title: 'Select the superior department',
        visible: false,
        width: 300,
        height: 300
      },
      // 树形菜单列表
      treeList: [],
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      },
      searchModel: {
        departmentName: '' // 部门名称
      },
      tableData: [], // 表格数据列表
      deptDialog: {
        title: 'New Department',
        visible: false, // 是否显示
        width: 600,
        height: 200
      },
      // 部门对象
      dept: {
        id: '',
        pid: '',
        parentName: '',
        departmentName: '',
        address: '',
        phone: '',
        orderNum: ''
      },
      // 表单验证规则
      rules: {
        parentName: [{ required: true, trigger: 'change', message: 'Please select the superior department' }],
        departmentName: [{ required: true, trigger: 'blur', message: 'Please enter the department name' }]
      }
    }
  },
  // 初始化时执行
  created() {
    this.search() // 调用查询方法
  },
  methods: {
    /**
     * 选择所属部门
     */
    async selectDepartment() {
      // 显示窗口
      this.parentDialog.visible = true
      // 获取部门列表
      const res = await departmentApi.getParentTreeList()
      // 判断是否成功
      if (res.success) {
        // 赋值
        this.treeList = res.data
        console.log(this.treeList)
      }
    },
    /**
     * 选择所属部门取消事件
     */
    parentOnClose() {
      this.parentDialog.visible = false
    },
    /**
     * 选择所属部门确定事件
     */
    parentOnConfirm() {
      this.parentDialog.visible = false
    },
    /**
     * 树节点点击事件
     */
    handleNodeClick(data) {
      // 当点击树节点时，赋予选中的值
      this.dept.parentName = data.departmentName
      this.dept.pid = data.id
    },
    /**
     * 点击树节点+-号折叠展开事件
     */
    openBtn(data) {
      // 修改折叠展开状态
      data.open = !data.open
      this.$refs.parentTree.store.nodesMap[data.id].expanded = !data.open
    },
    /**
     * 查询部门列表
     */
    async search() {
      // 发送查询请求
      const res = await departmentApi.getDepartmentList(this.searchModel)
      console.log(this.searchModel)
      // 判断是否存在数据
      if (res.success) {
        this.tableData = res.data
        console.log(this.tableData)
      }
    },
    /**
     * 重置
     */
    resetValue() {
      this.searchModel = {} // 清空数据
      this.search() // 重新调用方法
    },
    /**
     * 编辑部门
     * @param row
     */
    handleEdit(row) {
      // 数据回显
      this.$objCopy(row, this.dept)
      // 设置窗口标题
      this.deptDialog.title = 'Edit Department'
      // 显示编辑部门窗口
      this.deptDialog.visible = true
    },
    /**
     * 删除部门
     * @param row
     */
    async handleDelete(row) {
      // 检查部门下是否存在部门或用户
      const result = await departmentApi.checkDepartment({ id: row.id })
      // 判断是否可以删除
      if (!result.success) {
        // 提示不能删除
        this.$message.warning(result.message)
      } else {
        // 确认是否删除啊
        const confirm = await this.$myconfirm('Are you sure to delete the department?')
        if (confirm) {
          // 发送删除请求
          const res = await departmentApi.deleteById({ id: row.id })
          // 判断是否成功
          if (res.success) {
            // 提示删除成功
            this.$message.success(res.message)
            // 重新查询数据
            this.search()
          } else {
            // 提示删除失败
            this.$message.error(res.message)
          }
        }
      }
    },
    /**
     * 弹窗取消事件
     */
    onClose() {
      // 关闭窗口
      this.deptDialog.visible = false
    },
    /**
     * 弹窗确认事件
     */
    onConfirm() {
      // 表单验证
      this.$refs.deptForm.validate(async(valid) => {
        // 如果验证通过
        if (valid) {
          let res = null // 后端返回的数据
          // 判断部门id是否有数据，若id为空，则表示新增，否则则为修改
          if (this.dept.id === '') {
            // 新增
            res = await departmentApi.addDept(this.dept)
          } else {
            // 修改
            res = await departmentApi.updateDept(this.dept)
          }
          // 判断是否成功
          if (res.success) {
            // 刷新
            this.search()
            // 关闭窗口
            this.deptDialog.visible = false
          } else {
            this.$message.error(res.message)
          }
        }
      })
    },
    /**
     * 打开添加部门窗口
     */
    openAddWindow() {
      // 清空表单数据
      this.$resetForm('deptForm', this.dept)
      // 设置窗口标题
      this.deptDialog.title = 'New Department'
      // 显示添加部门窗口
      this.deptDialog.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-tree {
    .el-tree-node {
      position: relative;
      padding-left: 10px;
    }
    .el-tree-node__children {
      padding-left: 20px;
    }
    .el-tree-node :last-child:before {
      height: 40px;
    }
    .el-tree > .el-tree-node:before {
      border-left: none;
    }
    .el-tree > .el-tree-node:after {
      border-top: none;
    }
    .el-tree-node:before,
    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }
    .tree :first-child .el-tree-node:before {
      border-left: none;
    }
    .el-tree-node:before {
      border-left: 1px dotted #d9d9d9;
      bottom: 0px;
      height: 100%;
      top: -25px;
      width: 1px;
    }
    .el-tree-node:after {
      border-top: 1px dotted #d9d9d9;
      height: 20px;
      top: 14px;
      width: 24px;
    }
    .el-tree-node__expand-icon.is-leaf {
      width: 8px;
    }
    .el-tree-node__content > .el-tree-node__expand-icon {
      display: none;
    }
    .el-tree-node__content {
      line-height: 30px;
      height: 30px;
      padding-left: 10px !important;
    }
  }
  ::v-deep .el-tree > div {
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }
</style>
