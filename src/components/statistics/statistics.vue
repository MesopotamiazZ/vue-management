<template>
	<section class="echarts">
		<el-collapse accordion>
		  <el-collapse-item>
		  	<template slot="title">
		  		<span>总支出: {{totalExpend}} 元</span>
		  	</template>
		    <el-table :data="totalExpendData" style="width: 100%">
          <el-table-column prop="home" label="居家"></el-table-column>
          <el-table-column prop="traffic" label="交通"></el-table-column>
          <el-table-column prop="repast" label="餐饮"></el-table-column>
          <el-table-column prop="shop" label="购物"></el-table-column>
        </el-table>
		  </el-collapse-item>
		  <el-collapse-item>
		  	<template slot="title">
		  		<span>总收入: {{totalIcome}} 元</span>
		  	</template>
        <el-table :data="totalIncomeDate" style="width: 100%">
          <el-table-column prop="company" label="公司"></el-table-column>
        </el-table>
		  </el-collapse-item>
		  <el-collapse-item>
		  	<template slot="title">
		  		<span>结余: {{surplus}} 元</span>
		  	</template>
		  </el-collapse-item>
		</el-collapse>
	</section>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      totalExpend: 0,
      totalIcome: 0,
      surplus: 0,
      totalExpendData: [{home: 0, traffic: 0, repast: 0, shop: 0}],
      totalIncomeDate: [{company: 0}]
    }
  },
  created () {
    let url = 'http://localhost:3000/get-totalExpend'
    axios.get(url).then((res) => {
      console.log(res.data)
      let temp = res.data
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].bincomeorpay === 0) {
          this.totalExpend += temp[i].baccount
        } else {
          this.totalIcome += temp[i].baccount
        }
      }
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].bincomeorpay === 0) {
          if (temp[i].bcategory === 1) {
            this.totalExpendData[0].home += temp[i].baccount
          } else if (temp[i].bcategory === 2) {
            this.totalExpendData[0].traffic += temp[i].baccount
          } else if (temp[i].bcategory === 3) {
            this.totalExpendData[0].repast += temp[i].baccount
          } else {
            this.totalExpendData[0].shop += temp[i].baccount
          }
        } else {
          this.totalIncomeDate[0].company += temp[i].baccount
        }
      }
      this.surplus = this.totalIcome - this.totalExpend
    })
  }
}
</script>
	
<style lang="stylus" rel="stylesheet/stylus">
.echarts
  margin-top: 20px
  .el-collapse
    .el-collapse-item
      .el-collapse-item__header
        span
          color: green
      .el-collapse-item__wrap
        text-align: center
        .cell
          text-align: center
      .el-collapse-item__content
        padding: 0
</style>