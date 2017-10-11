<template>
	<section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUser">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col><!--工具条-->
    <el-table :data="users" highlight-current-row v-loading="listLoading">
      <el-table-column prop="uid" label="ID" width="120">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table><!--列表项-->
	</section>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        filters: {
          name: ''
        },
        users: [],
        listLoading: false
      }
    },
    mounted () {
      this.getAllUser()
    },
    methods: {
      getAllUser: function () {
        // 获取所有用户数据
        this.listLoading = true
        axios.get('http://localhost:3000/get-alluser').then((res) => {
          this.users = res.data
          this.listLoading = false
        })
      },
      getUser: function () {
        // 获取查询到用户数据
      },
      handleCurrentChange: function () {
        // 123
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .toolbar
    width: 100%
    height: 50px
    background-color: #EFF2F7
    margin-bottom: 10px
    margin-top: 10px
    .el-form
      height: 50px
      position: relative
      .el-button
        position: absolute
        top: 7px
        left: 10px
      .el-input__inner
        margin: 7px 10px 0
</style>