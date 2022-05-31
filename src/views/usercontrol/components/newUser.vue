<template>
  <div class="new-user">
    <el-form ref="form" :model="form" :rules="rules" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">New User</h3>
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
      <el-form-item label="phone" :label-width="formLabelWidth" prop="phone">
        <el-input
          ref="phone"
          v-model="form.phone"
          placeholder="Phone"
          name="phone"
          type="text"
          tabindex="2"
          auto-complete="on"
          minlength="11"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item label="QQ" :label-width="formLabelWidth" prop="tencentNum">
        <el-input
          ref="TencentNum"
          v-model="form.TencentNum"
          placeholder="QQ"
          name="TencentNum"
          type="text"
          tabindex="3"
          auto-complete="on"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="Email"
          name="Email"
          tabindex="4"
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
import { validUsername, validPhoneNum, validTencentNum, validEmail, validPassword, validEqual } from '@/utils/validate'

export default {
  name: 'NewUser',
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
    const validatePhoneNum = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your phone number'))
      } else {
        if (!validPhoneNum(value)) {
          callback(new Error('Mobile number must be mainland mobile number'))
        } else {
          callback()
        }
      }
    }
    const validateTencentNum = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your tencent number'))
      } else {
        if (!validTencentNum(value)) {
          callback(new Error('QQ number must be 5-10 digits'))
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
        if (!validEqual(this.form.password, this.form.confirmPassword)) {
          callback(new Error('Two passwords are inconsistent'))
        } else {
          callback()
        }
      }
    }
    return {
      formLabelWidth: '120px',
      passwordType: 'password',
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
        phone: '',
        tencent: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      },
      rules: {
        name: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhoneNum, trigger: 'blur' }
        ],
        tencent: [
          { validator: validateTencentNum, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
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
