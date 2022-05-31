<template>
  <div class="roles-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Type">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Description">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Number">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Created At">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Updated At">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Action">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 导入编辑用户界面 -->
    <el-dialog :visible.sync="dialogEditVisiable">
      <EditRoles />
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/roles'
import EditRoles from './editRoles'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        active: 'success',
        inactive: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    EditRoles
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      dialogEditVisiable: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      this.$emit('create') // for test
      getList().then(response => {
        this.list = response.data.items
        this.loading = false
      })
    },
    handleEdit(row) {
      this.dialogEditVisiable = true
      console.log(row)
    },
    handleDelete(row) {
      this.$confirm('Are you sure to delete this record?', 'Confirm', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        console.log(row)
      })
    }
  }
}
</script>

