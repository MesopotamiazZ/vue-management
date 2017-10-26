<template>
	<div class="userInfo">
    <el-dropdown trigger="hover">
      <span class="el-dropdown-link userinfo-inner">{{userInfo.username}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的消息</el-dropdown-item>
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    props: {
      userInfo: {
        type: Object
      }
    },
    data () {
      return {}
    },
    methods: {
      logout () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {
          // type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user')
          _this.$router.push('/login')
        }).catch(() => {

        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .userInfo
    cursor: pointer
    padding-right: 25px
    .userinfo-inner
      color: #fff
      font-size: 17px
</style>