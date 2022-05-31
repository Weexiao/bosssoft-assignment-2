<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">Find Password</h3>
      </div>

      <!--找回密码-->
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="phone"
          v-model="loginForm.phone"
          placeholder="Phone"
          name="phone"
          type="text"
          tabindex="1"
          auto-complete="on"
          maxlength="11"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
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
          v-model="loginForm.confirmPassword"
          :type="passwordType"
          placeholder="Please enter your password again"
          name="confirmPassword"
          tabindex="3"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div>
        <Vcode
          :show="loginForm.showVcode"
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
import { validEqual, validPhoneNum } from '@/utils/validate'
import { validPassword } from '@/utils/validate'
import Vcode from 'vue-puzzle-vcode'

export default {
  name: 'ForgetPassword',
  components: {
    Vcode
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhoneNum(value)) {
        callback(new Error('Please enter the correct phone number'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('Password must contain at least numbers and English, with a length of 8-18'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('The two passwords that you entered do not match'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        phone: '',
        showVcode: false, // 是否显示验证码
        password: '',
        confirmPassword: ''
      },
      loginRules: {
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' },
          { min: 11, max: 11, message: 'The length of the phone number must be 11', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' },
          { min: 8, max: 18, message: 'The length of the password must be 8-18', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPassword, trigger: 'blur' },
          { min: 8, max: 18, message: 'The length of the password must be 8-18', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
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
      if (validPhoneNum(this.loginForm.phone) && validPassword(this.loginForm.password) && validEqual(this.loginForm.confirmPassword, this.loginForm.password)) {
        this.loginForm.showVcode = true
      }
    },
    success(msg) {
      this.loginForm.showVcode = false // 隐藏验证码
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
      this.loginForm.showVcode = false // 隐藏验证码
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
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
