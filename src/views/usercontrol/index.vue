<template>
  <div class="app-container">
    <h2>User Control</h2>
    <el-button type="text" @click.native.prevent="dialogNewVisiable=true">New</el-button>
    <el-dialog :visible.sync="dialogNewVisiable">
      <NewUser />
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="Name" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Department" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Age" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>

      <el-table-column label="Salary" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.salary }}
        </template>
      </el-table-column>

      <el-table-column label="Position" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Action">
        <template slot-scope="scope">
          <span>
            <el-button
              type="text"
              @click="handleEdit(scope.row)"
            >
              Edit
            </el-button>
            <el-button
              type="text"
              @click="handleDelete(scope.row)"
            >
              Delete
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 导入编辑用户界面 -->
    <el-dialog :visible.sync="dialogEditVisiable">
      <EditUser />
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import EditUser from './components/editUser.vue'
import NewUser from './components/newUser.vue'

export default {
  name: 'Usercontrol',
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: 'success',
        admin: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    EditUser,
    NewUser
  },
  data() {
    return {
      dialogEditVisiable: false,
      dialogNewVisiable: false,
      list: null,
      listLoading: true,
      showVcode: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
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

<style scoped>

</style>
