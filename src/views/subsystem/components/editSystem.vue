<template>
  <div class="edit-system">
    <el-form :model="form" :rules="loginRules" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">EditUser</h3>
      </div>

      <el-form-item label="Title" :label-width="formLabelWidth" prop="Title">
        <el-input
          ref="title"
          name="title"
          v-model="form.title"
          placeholder="Title"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item label="Rank" :label-width="formLabelWidth" prop="rank">
        <el-input
          ref="rank"
          v-model="form.rank"
          placeholder="Rank"
          name="Rank"
          tabindex="2"
          type="text"
          auto-complete="on"
          maxlength="3"
        />
      </el-form-item>
      <el-form-item label="Score" :label-width="formLabelWidth" prop="score">
        <el-input
          ref="score"
          v-model="form.score"
          placeholder="Score"
          name="Score"
          tabindex="3"
          type="text"
          auto-complete="on"
          maxlength="2"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validUsername, validPositiveInteger } from '@/utils/validate'

export default {
  name: 'EditSystem',
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter a title'))
      } else {
        if (!validUsername(value)) {
          callback(new Error('Please enter a valid title'))
        } else {
          callback()
        }
      }
    }
    const validateRank = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter a rank'))
      } else {
        if (!validPositiveInteger(value)) {
          callback(new Error('Please enter a valid rank'))
        } else {
          callback()
        }
      }
    }
    const validateScore = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter a score'))
      } else {
        if (!validPositiveInteger(value)) {
          callback(new Error('Please enter a valid score'))
        } else {
          callback()
        }
      }
    }
    return {
      form: {
        title: '',
        rank: '',
        score: ''
      },
      loginRules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        rank: [
          { validator: validateRank, trigger: 'blur' }
        ],
        score: [
          { validator: validateScore, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  }
}
</script>

<style scoped>

</style>
