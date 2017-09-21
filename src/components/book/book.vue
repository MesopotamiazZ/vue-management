<template>
	<section>
		<el-col :span="24" class="toolbar">
			<el-form :inline="true">
        <el-form-item>
          <el-button type="primary" v-on:click="remark">记录</el-button>
        </el-form-item>
      </el-form>
		</el-col><!--工具条-->
    <el-table :data="accountBooks" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="日期" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="金额" width="100">
      </el-table-column>
      <el-table-column prop="age" label="类别" width="100">
      </el-table-column>
      <el-table-column prop="birth" label="备注" width="180">
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
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total">
      </el-pagination>
    </el-col>
	</section>
</template>

<script>
  // import axios from 'axios'
  export default {
    data () {
      return {
        accountBooks: [], // 账本数据
        listLoading: false, // table是否需要加载
        multipleSelection: [], // 记录用户的选择项
        total: 0, // 账本数据条数
        page: 1 // 分页数
      }
    },
    created () {
      // vue实例创建完成后进行加载
    },
    methods: {
      remark () {

      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      batchRemove () {
        // 批量删除
      },
      handleCurrentChange () {
        // currentPage改变是触发
      }
    }
  }
</script>

<style>

</style>