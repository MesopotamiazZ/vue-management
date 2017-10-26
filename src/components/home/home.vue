<template>
	<el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="brand">
        <span>{{sysName}}</span>
      </el-col>
      <el-col :span="10" class="control">
        <div class="btn-menu">
          <i class="icon-menu" v-on:click="clickMenu"></i>
        </div>
      </el-col>
      <el-col :span="10" class="userinfo">
        <user-info :userInfo="user"></user-info>
      </el-col>
    </el-col><!-- header -->
    <el-col :span="24" class="main">
      <aside :class="!isCollapse? 'full-aside':'little-aside'" ref="aside">
        <el-menu :default-active="$route.path" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="icon-tools"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">首页</el-menu-item>
              <el-menu-item index="1-2">记账</el-menu-item>
              <el-menu-item index="1-3">记事</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item> -->
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls" class="tab-item"></i>{{isCollapse?'':item.name}}
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden" v-on:click="$router.push(child.path)">
                  {{child.name}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" v-on:click="$router.push(item.children[0].path)"><i :class="item.iconCls" class="tab-item">
              </i><span slot="title" class="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </aside><!-- 侧边栏 -->
      <section class="content-container" ref="contentContainer">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="top-title">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-col>
        </div>
      </section><!-- 右侧内容显示 -->
    </el-col><!-- main -->
	</el-row>
</template>

<script>
import UserInfo from '../userInfo/userInfo'
export default {
  data () {
    return {
      sysName: 'VUEBOOK',
      isCollapse: false,
      user: JSON.parse(sessionStorage.getItem('user'))[0]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu () {
      this.isCollapse = !this.isCollapse
    }
  },
  components: {
    UserInfo: UserInfo
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  // @import "~common/stylus/variable"
  @font-face
    font-family: 'icomoon'
    src:  url('../../common/fonts/icomoon.eot?96q067')
    src:  url('../../common/fonts/icomoon.eot?96q067#iefix') format('embedded-opentype'),
      url('../../common/fonts/icomoon.ttf?96q067') format('truetype'),
      url('../../common/fonts/icomoon.woff?96q067') format('woff'),
      url('../../common/fonts/icomoon.svg?96q067#icomoon') format('svg')
    font-weight: normal
    font-style: normal

  [class^="icon-"], [class*=" icon-"]
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important
    speak: none
    font-style: normal
    font-weight: normal
    font-variant: normal
    text-transform: none
    line-height: 1
    font-size: 20px

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale

  .icon-nav:before
    content: "\e900"
    color: #cdcdcd
  .icon-tools:before
    content: "\e901"
    color: #cdcdcd
  .icon-note:before
    content: "\e902"
    color: #cdcdcd
  .icon-account-book:before
    content: "\e903"
    color: #cdcdcd
  .icon-menu:before
    content: "\e904"
    color: #cdcdcd
  .icon-explain:before
    content: "\e905"
    color: #cdcdcd
  .icon-chart:before
    content: "\e906"
    color: #cdcdcd
  .icon-arrow-down:before
    content: "\e907"
    color: #cdcdcd
  .icon-main:before
    content: "\e908"
    color: #cdcdcd
  .icon-manage:before
    content "\e909"
    color: #cdcdcd

  html 
    overflow-y: hidden
    overflow-x: hidden
  .container
    position: absolute
    top: 0
    // left: 0
    bottom: 0
    width: 100%
    .header
      height: 60px
      line-height: 60px
      background-color: #324057// $color-background
      .brand
        font-size: 20px
        color: #fff
        font-weight: 700
        // border-right: 0.1px solid #EFF2F7
        span
          padding: 5px
          margin-left: 40px
      .userinfo
        text-align: right
        padding-right: 20px
        color: #fff
      .control
        // vertical-align: middle
        height: 100%
        .btn-menu
          text-align: center
          width: 30px
          height: 60px
          float: left
          overflow: hidden
          margin-left: 10px
          i
            cursor: pointer
    .main
      display: flex
      position: absoluete
      top: 60px
      left: 0
      width: 100%
      height: 100%
      .full-aside
        flex: 0 0 230px
        width: 230px
        height: 100%
        // vertical-align: top
        .el-menu-item-group__title
          padding: 0
        .tab-item
          margin: 0 25px 0 5px
        .el-menu-vertical
          height: 100%
      .little-aside
        flex: 0 0 64px
        width: 64px
        // vertical-align: top
        .el-menu-item-group__title
          padding: 0
        .tab-item
          margin: 0 25px 0 5px
        .title
          font-size: 0
        .el-menu-vertical
          height: 100%
      .content-container
        flex: 1
        padding: 10px 20px 70px
        // overflow-x: hidden
        overflow-y: auto
        .grid-content
          .top-title
            .title
              display: inline-block
              float: left
            .breadcrumb-inner
              display: inline-block
              float: right
          .content-wrapper
            background-color: #fff
            box-sizing: border-box
          
        
        

  /**element-ui扩展**/
  // .el-menu-vertical-demo:not(.el-menu--collapse) {
  //   width: 230px;
  //   min-height: 400px;
  // }
</style>