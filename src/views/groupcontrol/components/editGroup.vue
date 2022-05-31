<template>
  <div class="edit-group">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Edit Group</h3>
      </div>

      <el-form-item label="Department" :label-width="formLabelWidth" prop="department">
        <el-input
          ref="department"
          v-model="form.department"
          placeholder="Department"
          name="department"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Status" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="Select a status" :label-width="formLabelWidth">
          <el-option
            v-for="item in rolesStatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-button type="primary" @click="dialogHandleSubmit('form')">Submit</el-button>
    </el-form>
  </div>
</template>

<script>
import { validEnglish } from '@/utils/validate'

export default {
  name: 'EditGroup',
  data() {
    const validateDepartment = (rule, value, callback) => {
      if (!this.form.department) {
        callback(new Error('Department is required'))
      } else if (!validEnglish(this.form.department)) {
        callback(new Error('Department must be in English'))
      } else {
        callback()
      }
    }
    return {
      form: {
        department: '',
        status: ''
      },
      formLabelWidth: '120px',
      rules: {
        department: [
          { required: true, message: 'Please enter a department', trigger: 'blur' },
          { validator: validateDepartment, trigger: 'blur' }
        ],
        status: [
          { required: true, message: 'Please select a status', trigger: 'blur' }
        ]
      },
      rolesStatus: [
        { id: 1, name: 'Active' },
        { id: 2, name: 'Inactive' }
      ]
    }
  },
  methods: {
    dialogHandleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        //   this.$emit('submit', this.form)
        // } else {
        //   console.log('error submit!!')
        //   return false
        // }
        if (valid) {
          this.$message({
            type: 'success',
            message: 'Successfully!'
          })
        } else {
          this.$message({
            type: 'error',
            message: 'Please check the form!'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
