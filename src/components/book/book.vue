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
      <el-table-column prop="bdate" label="日期" width="120">
      </el-table-column>
      <el-table-column prop="baccount" label="金额" width="100" :formatter="formatterAccount">
      </el-table-column>
      <el-table-column prop="bcategory" label="类别" width="100" :formatter="formatterCategory">
      </el-table-column>
      <el-table-column prop="bremark" label="备注" width="180">
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
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" :page="page">
      </el-pagination>
    </el-col>
	</section>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        accountBooks: [], // 账本数据
        listLoading: false, // table是否需要加载
        multipleSelection: [], // 记录用户的选择项
        total: 0, // 账本数据条数
        page: 1, // 分页数
        pageSize: 20
      }
    },
    created () {
      // vue实例创建完成后进行加载
      this.getAccountBooks()
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
        // currentPage改变时触发
      },
      getAccountBooks () {
        // vue实例创建完成后对其进行分页查询
        this.listLoading = true
        axios.get('http://localhost:3000/get-book', {params: {start: this.page, end: this.pageSize}}).then((res) => {
          this.total = res.data[1]
          this.accountBooks = res.data[0]
          this.listLoading = false
        })
      },
      formatterAccount (row, column) {
        return row.baccount + '.00'
      },
      formatterCategory (row, column) {
        let categoryNum = row.bcategory
        if (categoryNum === 1) {
          return '居家'
        } else if (categoryNum === 2) {
          return '交通'
        } else if (categoryNum === 3) {
          return '餐饮'
        } else {
          return '购物'
        }
      }
    }
  }
</script>

<style>

</style>