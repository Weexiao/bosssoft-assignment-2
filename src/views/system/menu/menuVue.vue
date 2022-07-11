<template>
  <el-main>
    <!--新增按钮-->
    <el-button type="success" icon="el-icon-plus" @click="openAddWindow" v-if="hasPermission('sys:menu:add')">New</el-button>
    <!--数据表格-->
    <el-table
      style="margin-top: 10px"
      :height="tableHeight"
      :data="menuList"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children' }"
      :border="true"
      stripe
    >
      <el-table-column prop="label" label="Name" align="center" />
      <el-table-column prop="type" label="Type" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == '0'" size="normal">Menu</span>
          <span type="success" v-else-if="scope.row.type == '1'" size="normal">Content</span>
          <span type="warning" v-else-if="scope.row.type == '2'" size="normal">Button</span>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="Icon" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon" v-if="scope.row.icon.includes('el-icon')"></i>
          <svg-icon v-else :icon-class="scope.row.icon"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" align="center"></el-table-column>
      <el-table-column prop="path" label="Path" align="center"></el-table-column>
      <el-table-column prop="url" label="Url" align="center"></el-table-column>
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMenu(scope.row)" v-if="hasPermission('sys:menu:edit')">Edit</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteMenu(scope.row)" v-if="hasPermission('sys:menu:add')">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增或编辑弹框-->
    <system-dialog
      :title="menuDialog.title"
      :width="menuDialog.width"
      :height="menuDialog.height"
      :visible="menuDialog.visible"
      @onClose="onClose"
      @onConfirm="onConfirm"
    >
      <div slot="content">
        <el-form
          :model="menu"
          ref="menuForm"
          :rules="rules"
          label-width="80px"
          :inline="true"
          size="small"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item prop="type" label="Type">
                <el-radio-group v-model="menu.type">
                  <el-radio label="0">Menu</el-radio>
                  <el-radio label="1">Content</el-radio>
                  <el-radio label="2">Button</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="parentName" size="small" label="Superior">
            <el-input
              @click.native="selectParentMenu"
              v-model="menu.parentName"
              :readonly="true"
            ></el-input>
          </el-form-item>
          <el-form-item prop="label" size="small" label="Label">
            <el-input v-model="menu.label"></el-input>
          </el-form-item>
          <el-form-item size="small" label="Icon">
            <my-icon @selecticon="setIcon" ref="child" />
          </el-form-item>
          <el-form-item
            prop="name"
            v-if="menu.type == 1"
            size="small"
            label="Name"
          >
            <el-input v-model="menu.name"></el-input>
          </el-form-item>
          <el-form-item
            prop="path"
            v-if="menu.type != 2"
            size="small"
            label="Path"
          >
            <el-input v-model="menu.path"></el-input>
          </el-form-item>
          <el-form-item
            prop="url"
            v-if="menu.type == 1"
            size="small"
            label="Url"
          >
            <el-input v-model="menu.url"></el-input>
          </el-form-item>
          <el-form-item prop="code" size="small" label="Code">
            <el-input v-model="menu.code"></el-input>
          </el-form-item>
          <el-form-item size="small" label="Order">
            <el-input v-model="menu.orderNum"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </system-dialog>

    <!--选择所属菜单弹框-->
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
          style="font-size: 14px"
          ref="parentTree"
          :data="parentMenuList"
          node-key="id"
          :props="defaultProps"
          empty-text="No data"
          :show-checkbox="false"
          default-expand-all
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <div class="customer-tree-node" slot-scope="{ node, data }">
            <!--长度为0表示没有下级-->
            <span v-if="data.children.length === 0">
              <i class="el-icon-document" style="color: #8c8c8c; font-size: 18px;" />
            </span>
            <span v-else @click.stop="openBtn(data)">
              <svg-icon icon-class="add-s" v-if="data.open" />
              <svg-icon icon-class="sub-s" v-else />
            </span>
            <span style="margin-left: 3px">{{ node.label }}</span>
          </div>
        </el-tree>
      </div>
    </system-dialog>
  </el-main>
</template>

<script>
import menuApi from '@/api/menu'
// 导入组件
import SystemDialog from '@/components/system/SystemDialog.vue'
// 导入自定义的icon图标库
// import { elementIcons } from '@/utils/icons'
// 导入icon选择器
import MyIcon from '@/components/system/MyIcon'

export default {
  name: 'MenuVue',
  components: {
    SystemDialog,
    MyIcon
  },
  data() {
    return {
      // 图标列表
      iconList: [],
      // 用户选中的图标
      userChooseIcon: '',
      // 上级菜单弹框属性
      parentDialog: {
        title: 'Please select the superior menu',
        width: 300,
        height: 400,
        visible: false
      },
      // 树属性定义
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 所属菜单列表
      parentMenuList: [],
      // 新增或编辑弹框属性
      menuDialog: {
        title: '',
        width: 630,
        height: 270,
        visible: false
      },
      // 菜单属性
      menu: {
        id: '',
        type: '',
        parentId: '',
        parentName: '',
        label: '',
        icon: '',
        name: '',
        path: '',
        url: '',
        code: '',
        orderNum: ''
      },
      rules: {
        type: [{ required: true, message: 'Please select a type', trigger: 'change' }],
        parentName: [{ required: true, message: 'Please select a superior', trigger: 'change' }],
        label: [{ required: true, message: 'Please enter a label', trigger: 'blur' }],
        name: [{ required: true, message: 'Please enter a name', trigger: 'blur' }],
        path: [{ required: true, message: 'Please enter a path', trigger: 'blur' }],
        url: [{ required: true, message: 'Please enter a url', trigger: 'blur' }],
        code: [{ required: true, message: 'Please enter a code', trigger: 'blur' }]
      },
      menuList: [], // 菜单列表
      tableHeight: 0 // 表格高度
    }
  },
  methods: {
    /**
     * 选择所属菜单
     */
    async selectParentMenu() {
      // 显示窗口
      this.parentDialog.visible = true
      // 发送请求窗口
      const res = await menuApi.getParentMenuList()
      // 判断是否成功
      if (res.success) {
        // 赋值
        this.parentMenuList = res.data
        // console.log(this.parentMenuList)
      }
    },
    /**
     * 查询菜单列表
     */
    async search() {
      // 发送查询请求
      const res = await menuApi.getMenuList()
      // 判断是否成功
      if (res.success) {
        // 赋值
        this.menuList = res.data
      }
    },
    /**
     * 打开添加窗口
     */
    openAddWindow() {
      this.$resetForm('menuForm', this.menu) // 清空表单数据
      this.menuDialog.title = 'Add Menu' // 设置弹框标题
      this.menuDialog.visible = true // 显示弹框
      this.$nextTick(() => {
        this.$refs['child'].userChooseIcon = '' // 清空图标
      })
    },
    /**
     * 给icon绑定点击事件
     */
    setIcon(icon) {
      // this.userChooseIcon = icon // 设置用户选择的图标
      this.menu.icon = icon // 设置菜单图标
    },
    /**
     * 添加和修改菜单窗口关闭事件
     */
    onClose() {
      this.menuDialog.visible = false // 隐藏弹框
    },
    /**
     * 选择所属菜单取消事件
     */
    onParentClose() {
      this.parentDialog.visible = false // 隐藏弹框
    },
    /**
     * 添加和修改菜单窗口确认事件
     */
    onConfirm() {
      // 表单验证
      this.$refs.menuForm.validate(async(valid) => {
        if (valid) {
          let res = null
          // 判断菜单id是否为空
          if (this.menu.id === '') {
            // 发送添加请求
            res = await menuApi.addMenu(this.menu)
          } else {
            // 修改
            res = await menuApi.updateMenu(this.menu)
          }

          // 判断是否成功
          if (res.success) {
            this.$message.success(res.message)
            // 刷新
            window.location.reload()
            // 关闭窗口
            this.menuDialog.visible = false
          } else {
            this.$message.error(res.message)
          }
        }
      })
    },
    /**
     * 选择所属菜单确认事件
     */
    onParentConfirm() {
      this.parentDialog.visible = false // 隐藏弹框
    },
    /**
     * 切换图标
     * @param data
     */
    openBtn(data) {
      data.open = !data.open
      this.$refs.parentTree.store.nodesMap[data.id].expanded = !data.open
    },
    /**
     * 所属菜单节点点击事件
     */
    handleNodeClick(data) {
      // 所属父级菜单ID
      this.menu.parentId = data.id
      // 所属父级菜单名称
      this.menu.parentName = data.label
    },
    /**
     * 编辑菜单
     * @param {Object} row 菜单信息
     */
    editMenu(row) {
      // 把当前要编辑的数据复制到数据域，给表单回显
      this.$objCopy(row, this.menu)
      // 设置弹框属性
      this.menuDialog.title = 'Edit Menu'
      this.menuDialog.visible = true
      this.$nextTick(() => {
        this.$refs['child'].userChooseIcon = row.icon // 设置图标
      })
    },
    /**
     * 删除菜单
     * @param {Object} row 菜单信息
     */
    async deleteMenu(row) {
      // 判断是否存在子菜单
      const res = await menuApi.checkPermission({ id: row.id })
      // 判断是否可以删除
      if (!res.success) {
        this.$message.warning(res.message)
      } else {
        // 确认可以删除
        const confirm = await this.$myconfirm('Are you sure to delete this menu?')
        if (confirm) {
          // 发送删除请求
          const res = await menuApi.deleteById({ id: row.id })
          // 判断是否成功
          if (res.success) {
            this.$message.success(res.message)
            // 刷新
            this.search()
          } else {
            this.$message.error(res.message)
          }
        }
      }
    }
  },
  created() {
    // 调用查询菜单列表的方法
    this.search()
    // 调用获取图标列表的方法
    // this.getIconList()
  },
  mounted() {
    this.$nextTick(() => {
      // 计算表格高度
      this.tableHeight = window.innerHeight - 180
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
