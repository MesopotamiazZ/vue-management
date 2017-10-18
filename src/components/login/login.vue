<template>
	<el-form :model="ruleForm1" :rules="loginRules" label-position="left" label-width="70px" class="login-contaier" ref="ruleForm1">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username" label="用户名">
      <el-input type="text" v-model="ruleForm1.username" auto-complete="off" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="ruleForm1.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
// import {requestLogin} from '../../api/api.js'
// import axios from 'axios'
export default {
  data () {
    return {
      ruleForm1: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      checked: true,
      logining: false
    }
  },
  beforeCreate () {
    // 在vue实例创建之前验证sessionStorage中是否存有登录信息，以判断是否鞥路过
  },
  methods: {
    handleSubmit () {
      // 登录
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login-contaier
    width: 350px
    position: absolue
    left: 0
    right: 0
    margin: 180px auto
    border: 1px solid #eaeaea
    border-radius: 5px
    box-shadow: 0 0 25px #cac6c6
    padding: 35px 35px 15px 35px
    .title
      text-align: center
      margin: 0 0 35px 0
      color: #505458
    .remember
      margin 0 0 35px 70px
</style>