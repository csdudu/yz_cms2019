<template>
  <div class="dashboard-editor-container">
    <du_bar_filter
      @submit="submitH">
    </du_bar_filter>

    <div class="h20"></div>

    <!-- <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->
    

    <el-row :gutter="20">
      <el-col  :span="6" v-for="item in data1" :key="item.tit">
        <div class="bar_info">
          <h2>{{item.tit}}</h2>
          <h1>{{item.total_sales}}</h1>
          <div class="foot">
            昨日¥{{item.total_prev}} 
            变化率{{item.rate}}%
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="h20"></div>

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->


    

    <el-row :gutter="20">
      <el-col :span="18">
        <div class="bg1 p20">
          <div class=" tar">
            <el-radio-group v-model="val1">
              <el-radio-button label="0">正序</el-radio-button>
              <el-radio-button label="1">倒序</el-radio-button>
              <el-radio-button label="2">低于平均</el-radio-button>
            </el-radio-group>
          </div>

          <el-tabs v-model="val2">
            <el-tab-pane label="去重客流" name="0">
              <ul class="list_progress">
                <li v-for="item in data2.guest">
                  <div class="tit">{{item.tit}}</div>
                  <el-progress :percentage="item.val"></el-progress>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="销售额" name="1">
              <ul class="list_progress">
                <li v-for="item in data2.sale">
                  <div class="tit">{{item.tit}}</div>
                  <el-progress :percentage="item.val"></el-progress>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="订单数" name="2">
              <ul class="list_progress">
                <li v-for="item in data2.order">
                  <div class="tit">{{item.tit}}</div>
                  <el-progress :percentage="item.val"></el-progress>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="单客价" name="3">
              <ul class="list_progress">
                <li v-for="item in data2.order">
                  <div class="tit">{{item.tit}}</div>
                  <el-progress :percentage="item.val"></el-progress>
                </li>
              </ul>
            </el-tab-pane>

            <el-tab-pane label="定时任务补偿" name="4">
              <ul class="list_progress">
                <li v-for="item in data2.order">
                  <div class="tit">{{item.tit}}</div>
                  <el-progress :percentage="item.val"></el-progress>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="bg1 bar2">
          <div class="tit">门店排名</div>
          <div class="cont">
            <ul class="list1">
              <li>这是一条新闻的标题</li>
              <li>这是一条新闻的标题</li>
              <li>这是一条新闻的标题</li>
              <li>这是一条新闻的标题</li>
              <li>这是一条新闻的标题</li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

import du_bar_filter from './components/du_bar_filter'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    du_bar_filter,
    // PanelGroup,
    // LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      // lineChartData: lineChartData.newVisitis,
      data1:[
        {tit:"销售总额",total_sales:134,total_prev:23,rate:23},
        {tit:"订单总量",total_sales:134,total_prev:23,rate:23},
        {tit:"客单价",total_sales:134,total_prev:23,rate:23},
        {tit:"成交率",total_sales:134,total_prev:23,rate:23}
      ],
      // 去重客流
      data2:{
        guest:[
          {tit:"叠翠名城",val:34},
          {tit:"中海",val:84},
          {tit:"阳光100",val:94},
          {tit:"江山帝景",val:54}
        ],
        sale:[
          {tit:"叠翠名城",val:84},
          {tit:"中海",val:34},
          {tit:"阳光100",val:66},
          {tit:"江山帝景",val:44}
        ],
        order:[
          {tit:"叠翠名城",val:11},
          {tit:"中海",val:3},
          {tit:"阳光100",val:4},
          {tit:"江山帝景",val:33}
        ],
        price:[
          {tit:"叠翠名城",val:11},
          {tit:"中海",val:3},
          {tit:"阳光100",val:4},
          {tit:"江山帝景",val:33}
        ],
        ratio:[
          {tit:"叠翠名城",val:11},
          {tit:"中海",val:3},
          {tit:"阳光100",val:4},
          {tit:"江山帝景",val:33}
        ]
      },
      val1:0,
      val2:"0",
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    submitH(e) {
      console.log("过滤框行为:",e);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  .bar_info{
    background-color: #fff; padding: 20px; box-shadow: 0 0 3px #ddd;
    h2{font-size: 14px;}
    h1{font-size: 30px; margin: 0.4em 0;}
    .foot{border-top: 1px #ccc solid; padding: .5em -0px;}
  }
</style>
