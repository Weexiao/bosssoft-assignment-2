<template>
  <div>
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

      <el-table-column width="110" align="center" label="Department">
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Number">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110" align="center" label="Status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
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

    <el-dialog :visible.sync="dialogEditVisiable">
      <EditGroup />
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/group'
import EditGroup from '@/views/groupcontrol/components/editGroup'

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
    EditGroup
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
