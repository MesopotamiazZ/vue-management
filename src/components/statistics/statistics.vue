<template>
	<section class="echarts">
		<el-collapse accordion>
		  <el-collapse-item>
		  	<template slot="title">
		  		<span>总支出: {{totalExpend}}</span>
		  	</template>
		    <el-table :data="totalExpendData" style="width: 100%">
          <el-table-column prop="date" label="居家"></el-table-column>
          <el-table-column prop="name" label="交通"></el-table-column>
          <el-table-column prop="name" label="餐饮"></el-table-column>
          <el-table-column prop="name" label="购物"></el-table-column>
        </el-table>
		  </el-collapse-item>
		  <el-collapse-item>
		  	<template slot="title">
		  		<span>总收入: {{totalIcome}}</span>
		  	</template>
		  </el-collapse-item>
		  <el-collapse-item>
		  	<template slot="title">
		  		<span>结余: {{surplus}}</span>
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
      totalExpendData: []
    }
  },
  created () {
    let url = 'http://localhost:3000/get-totalExpend'
    axios.get(url, {params: {bincomeorpay: 0}}).then((res) => {
      console.log(res.data)
    })
  }
}
</script>
	
<style lang="stylus" rel="stylesheet/stylus">
	.echarts
		margin-top: 20px
</style>