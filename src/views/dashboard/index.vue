<template>
  <div class="dashboard-container">
    <h1> 主界面 但还没想好写什么</h1>
    <el-image
      style="width: auto; height: auto"
      :src="url"
      :preview-src-list="srcList"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      url: 'https://w.wallhaven.cc/full/l3/wallhaven-l3xk6q.jpg',
      srcList: [
        'https://w.wallhaven.cc/full/l3/wallhaven-l3xk6q.jpg'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
