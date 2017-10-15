<template>
	<section>
		<el-col :span="24" class="toolbar toolbartop">
			<el-form :inline="true">
        <el-form-item>
          <el-button type="primary" v-on:click="record">记一笔</el-button>
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
      <el-table-column prop="bincomeorpay" label="收支" width="100" :formatter="formatterIncomeOrPay">
      </el-table-column>
      <el-table-column prop="bremark" label="备注" width="250">
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
    <el-col :span="24" class="toolbar toolbarbottom">
      <el-button type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
      <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" :page="page">
      </el-pagination>
    </el-col>

    <el-dialog title="记一笔" :visible.sync="addFormVisible">
      <el-form :model="addform">
        <el-form-item label="收支" :label-width="formLabelWidth">
          <el-select v-model="addform.bincomeorpay" placeholder="请选择收支类型">
            <el-option label="支出" value="0"></el-option>
            <el-option label="收入" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="addform.bdate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="addform.baccount" auto-complete="off" placeholder="￥0.00"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="addform.bcategory" placeholder="请选择分类">
            <el-option label="居家" value="1"></el-option>
            <el-option label="交通" value="2"></el-option>
            <el-option label="餐饮" value="3"></el-option>
            <el-option label="购物" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addform.bremark" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editform">
        <el-form-item label="收支" :label-width="formLabelWidth">
          <el-select v-model="editform.bincomeorpay" placeholder="请选择收支类型">
            <el-option label="支出" value="0"></el-option>
            <el-option label="收入" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="editform.bdate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="editform.baccount" auto-complete="off" placeholder="￥0.00"></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="editform.bcategory" placeholder="请选择分类">
            <el-option label="居家" value="1"></el-option>
            <el-option label="交通" value="2"></el-option>
            <el-option label="餐饮" value="3"></el-option>
            <el-option label="购物" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="editform.bremark" type="textarea" :rows="3" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
        pageSize: 10,
        addFormVisible: false,
        editFormVisible: false,
        addform: {
          bincomeorpay: '0',
          bdate: '',
          baccount: '',
          bcategory: '',
          bremark: ''
        },
        editform: {
          bincomeorpay: '',
          bdate: '',
          baccount: '',
          bcategory: '',
          bremark: ''
        },
        formLabelWidth: '50px'
      }
    },
    created () {
      // vue实例创建完成后进行加载
      this.getAccountBooks()
    },
    methods: {
      record () {
        // 点击记账触发此事件
        this.addFormVisible = true
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleEdit (index, row) {
        console.log(row)
        this.editFormVisible = true
        this.editform = Object.assign({}, row)
        if (this.editform.bincomeorpay === 0) {
          this.editform.bincomeorpay = '支出'
        } else {
          this.editform.bincomeorpay = '收入'
        }
        if (this.editform.bcategory === 1) {
          this.editform.bcategory = '居家'
        } else if (this.editform.bcategory === 2) {
          this.editform.bcategory = '交通'
        } else if (this.editform.bcategory === 3) {
          this.editform.bcategory = '餐饮'
        } else {
          this.editform.bcategory = '购物'
        }
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      batchRemove () {
        // 批量删除
      },
      handleCurrentChange (val) {
        // currentPage改变时触发
        this.listLoading = true
        this.page = val
        console.log(this.page)
        axios.get('http://localhost:3000/get-book', {params: {start: this.page, end: this.pageSize}}).then((res) => {
          this.total = res.data[1]
          this.accountBooks = res.data[0]
          this.listLoading = false
        })
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
        return '￥' + row.baccount
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
      },
      formatterIncomeOrPay (row, column) {
        return row.bincomeorpay !== 0 ? '收入' : '支出'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .el-input__inner
    width: 192px
  .toolbartop
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
  .toolbarbottom
    width: 100%
    height: 50px
    background-color: #EFF2F7
    margin-bottom: 10px
    margin-top: 10px
    position: relative
    .el-button
      position: absolute
      top: 7px
      left: 10px
    .el-pagination
      position: absolute
      top: 7px
      right: 10px
</style>