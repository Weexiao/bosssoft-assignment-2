<template>
  <div class="edit-roles">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Edit Roles</h3>
      </div>

      <el-form-item label="Type" :label-width="formLabelWidth" prop="type">
        <el-input
          ref="type"
          v-model="form.type"
          placeholder="TypeName"
          name="type"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Description" :label-width="formLabelWidth" prop="description">
        <el-input
          ref="description"
          v-model="form.description"
          placeholder="Description"
          name="type"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Status" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="Select a status">
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
  name: 'EditRoles',
  data() {
    const validateType = (rule, value, callback) => {
      if (!validEnglish(this.form.type)) {
        callback(new Error('Type must be in English'))
      } else {
        callback()
      }
    }
    const validateDescription = (rule, value, callback) => {
      if (!validEnglish(this.form.description)) {
        callback(new Error('Description must be in English'))
      } else {
        callback()
      }
    }
    return {
      form: {
        type: '',
        description: '',
        status: ''
      },
      formLabelWidth: '120px',
      rules: {
        type: [
          { required: true, validator: validateType, trigger: 'blur' }
        ],
        description: [
          { required: true, validator: validateDescription, trigger: 'blur' }
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
