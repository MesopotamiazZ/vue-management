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
    <div id="myEcharts1"></div>
    <div id="myEcharts2"></div>
	</section>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
export default {
  data () {
    return {
      totalExpend: 0,
      totalIcome: 0,
      surplus: 0,
      totalExpendData: [{home: 0, traffic: 0, repast: 0, shop: 0}],
      totalIncomeDate: [{company: 0}],
      lineIncomeData: [],
      lineExpendData: []
    }
  },
  created () {
    this.getTotalExpend()
  },
  mounted () {
    this.getEchartsData()
    // this.drawEcharts()
    let _this = this
    setTimeout(function () {
      _this.drawEcharts()
    }, 500)
    // this.$nextTick(function () {
    //   this.drawEcharts()
    // })
  },
  updated () {
    // let url = 'http://localhost:3000/get-totalExpend'
    // axios.get(url).then((res) => {
    //   // console.log(res.data)
    //   let temp = res.data
    //   this.getTotal(temp)
    //   this.getCategory(temp)
    //   this.getSurplus()
    // })
  },
  methods: {
    drawEcharts () {
      let myCharts1 = echarts.init(document.getElementById('myEcharts1'))
      let myCharts2 = echarts.init(document.getElementById('myEcharts2'))
      let option1 = {
        title: {text: '收入支出折线图'},
        tooltip: {},
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['收入', '支出']
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} 元'
          }
        },
        series: [
          {
            name: '支出',
            type: 'line',
            data: this.lineExpendData
          },
          {
            name: '收入',
            type: 'line',
            data: this.lineIncomeData
          }
        ]
      }
      let option2 = {
        title: {
          text: '费用支出分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '费用支出分布',
            type: 'pie',
            clockwise: 'true',
            startAngle: '0',
            radius: '60%',
            data: [
              {
                value: 70,
                name: '居家',
                itemStyle: {
                  normal: {
                    color: 'rgb(255,192,0)',
                    shadowBlur: '90',
                    shadowColor: 'rgba(0,0,0,0.8)',
                    shadowOffsetY: '30'
                  }
                }
              },
              {
                value: 10,
                name: '交通',
                itemStyle: {
                  normal: {
                    color: 'rgb(122,48,158)'
                  }
                }
              },
              {
                value: 10,
                name: '餐饮',
                itemStyle: {
                  normal: {
                    color: 'rgb(1,175,80)'
                  }
                }
              },
              {
                value: 10,
                name: '购物',
                itemStyle: {
                  normal: {
                    color: 'rgb(29,124,175)'
                  }
                }
              }
            ]
          }
        ]
      }
      myCharts1.setOption(option1)
      myCharts2.setOption(option2)
    },
    getTotalExpend () {
      let url = 'http://localhost:3000/get-totalExpend'
      let uid = JSON.parse(sessionStorage.getItem('user'))[0].uid
      axios.get(url, {params: {uid: uid}}).then((res) => {
        // console.log(res.data)
        let temp = res.data
        this.getTotal(temp)
        this.getCategory(temp)
        this.getSurplus()
      })
    },
    getEchartsData () {
      let url = 'http://localhost:3000/get-echartsData'
      let uid = JSON.parse(sessionStorage.getItem('user'))[0].uid
      axios.get(url, {params: {uid: uid}}).then((res) => {
        console.log(res.data)
        let data = res.data
        console.log(res.data.length)
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i][0].account)
          if (i <= 11) {
            if (data[i][0].account === null) {
              this.lineIncomeData.push(0)
            } else {
              this.lineIncomeData.push(data[i][0].account)
            }
          } else {
            if (data[i][0].account === null) {
              this.lineExpendData.push(0)
            } else {
              this.lineExpendData.push(-data[i][0].account)
            }
          }
        }
        console.log(this.lineIncomeData)
        console.log(this.lineExpendData)
      })
    },
    getTotal (temp) {
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].bincomeorpay === 0) {
          this.totalExpend += temp[i].baccount
        } else {
          this.totalIcome += temp[i].baccount
        }
      }
    },
    getCategory (temp) {
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
    },
    getSurplus () {
      this.surplus = this.totalIcome - this.totalExpend
    }
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
  #myEcharts1
    width: 600px
    height: 400px
    padding-top: 15px
    display: inline-block
  #myEcharts2
    width: 600px
    height: 400px
    padding-top: 15px
    display: inline-block
</style>