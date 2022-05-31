<template>
  <div class="register-container">
    <el-form ref="regisForm" :model="regisForm" :rules="regisRules" class="regis-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Register</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="regisForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="regisForm.phone"
          placeholder="Phone"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
          maxlength="11"
        />
      </el-form-item>

      <el-form-item prop="TencentNum">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="TencentNum"
          v-model="regisForm.TencentNum"
          placeholder="QQ"
          name="TencentNum"
          type="text"
          tabindex="1"
          auto-complete="on"
          maxlength="10"
        />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="email"
          v-model="regisForm.email"
          placeholder="Email"
          name="email"
          type="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="regisForm.password"
          :type="passwordType"
          placeholder="Please enter your password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="confirmPassword"
          v-model="regisForm.confirmPassword"
          :type="passwordType"
          placeholder="Please enter your password again"
          name="confirmPassword"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div>
        <Vcode
          :show="regisForm.showVcode"
          @success="success"
          @close="close"
        />
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSubmit">Submit</el-button>

      <div class="tips">
        <span>
          <span>Ready for login?</span>
          <el-button type="text" @click.native.prevent="returnLogin">Click here</el-button>
        </span>
      </div>
    </el-form>
  </div>
</template>

<script>
import Vcode from 'vue-puzzle-vcode'
import { validUsername, validPhoneNum, validTencentNum, validEmail, validPassword, validEqual } from '@/utils/validate'

export default {
  name: 'Register',
  components: {
    Vcode
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your username'))
      } else {
        if (!validUsername(value)) {
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
      if (!value) {
        callback(new Error('Please enter your email'))
      } else {
        if (!validEmail(value)) {
          callback(new Error('Email format error'))
        } else {
          callback()
        }
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password'))
      } else {
        if (!validPassword(value)) {
          callback(new Error('Password must contain at least numbers and English, with a length of 8-18'))
        } else {
          callback()
        }
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password again'))
      } else {
        if (value !== this.regisForm.password) {
          callback(new Error('Two passwords are inconsistent'))
        } else {
          callback()
        }
      }
    }
    return {
      regisForm: {
        username: '',
        phone: '',
        TencentNum: '',
        email: '',
        password: '',
        confirmPassword: '',
        showVcode: false
      },
      regisRules: {
        username: [
          { required: true, message: 'Please enter your username', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: 'Please enter your phone number', trigger: 'blur' },
          { validator: validatePhoneNum, trigger: 'blur' }
        ],
        TencentNum: [
          { required: true, message: 'Please enter your Tencent number', trigger: 'blur' },
          { validator: validateTencentNum, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter your email', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter your password', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'Please enter your password again', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      loading: false
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
    returnLogin() {
      this.$router.push({ path: '/login' })
    },
    handleSubmit() {
      if (validUsername(this.regisForm.username) && validPhoneNum(this.regisForm.phone) && validTencentNum(this.regisForm.TencentNum) && validEmail(this.regisForm.email) && validPassword(this.regisForm.password) && validEqual(this.regisForm.password, this.regisForm.confirmPassword)) {
        this.regisForm.showVcode = true // 通过了验证
      }
    },
    success(msg) {
      this.regisForm.showVcode = false // 隐藏验证码
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.loading = true
      //     this.$http.post('/api/user/forgetPassword', this.loginForm).then(res => {
      //       this.loading = false
      //       if (res.data.code === 0) {
      //         this.$message({
      //           type: 'success',
      //           message: 'Reset password successfully'
      //         })
      //         this.$router.push({ path: '/login' })
      //       } else {
      //         this.$message({
      //           type: 'error',
      //           message: res.data.message
      //         })
      //       }
      //     })
      //   }
      // })
      this.$message({
        type: 'success',
        message: 'Reset password successfully'
      })
      this.$router.push({ path: '/login' })
    },
    close() {
      this.regisForm.showVcode = false // 隐藏验证码
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .regis-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
