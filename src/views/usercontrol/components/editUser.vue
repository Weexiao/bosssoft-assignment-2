<template>
  <div class="edit-user">
    <el-form ref="form" :model="form" :rules="loginRules" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Edit User</h3>
      </div>

      <el-form-item label="Username" :label-width="formLabelWidth" prop="username">
        <el-input
          ref="username"
          v-model="form.name"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="Email"
          name="Email"
          tabindex="2"
          type="email"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth" prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item label="Password Again" :label-width="formLabelWidth" prop="confirmPassword">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="form.confirmPassword"
          :type="passwordType"
          placeholder="Please enter your password again"
          name="password"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Role" :label-width="formLabelWidth">
        <el-select v-model="form.role" placeholder="Select a role">
          <el-option
            v-for="item in roles"
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
import { validUsername, validEmail, validPassword } from '@/utils/validate'

export default {
  name: 'EditUser',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!this.form.name) {
        callback(new Error('Please enter your username'))
      } else {
        if (!validUsername(this.form.name)) {
          callback(new Error('Username must be in English without special characters'))
        } else {
          callback()
        }
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!this.form.email) {
        callback(new Error('Please enter your email'))
      } else {
        if (!validEmail(this.form.email)) {
          callback(new Error('Email format error'))
        } else {
          callback()
        }
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!this.form.password) {
        callback(new Error('Please enter your password'))
      } else {
        if (!validPassword(this.form.password)) {
          callback(new Error('Password must contain at least numbers and English, with a length of 8-18'))
        } else {
          callback()
        }
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!this.form.confirmPassword) {
        callback(new Error('Please enter your password again'))
      } else {
        if (this.form.password !== this.form.confirmPassword) {
          callback(new Error('Two passwords are inconsistent'))
        } else {
          callback()
        }
      }
    }
    return {
      roles: [
        {
          id: 1,
          name: 'Admin'
        },
        {
          id: 2,
          name: 'User'
        }
      ],
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        status: ''
      },
      passwordType: 'password',
      loginRules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      formLabelWidth: '100px'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    dialogHandleSubmit(form) {
      this.$refs[form].validate((valid) => {
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
