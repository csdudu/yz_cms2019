<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="bar_info">
          <h2>{{overall[0].tit}}</h2>
          <h1>{{overall[0].val | cDateFull}}</h1>
        </div>
      </el-col>
      
      <el-col :span="6">
        <div class="bar_info">
          <h2>{{overall[1].tit}}</h2>
          <h1>{{overall[1].val}}<sub>条</sub></h1>
        </div>
      </el-col>
      
      <el-col :span="8">
        <div class="bar_info">
          <h2>{{overall[2].tit}}</h2>
          <h1>{{overall[2].val|cDate}}</h1>
        </div>
      </el-col>
    </el-row>

    <div class="h30"></div>

    <du_bar_filter @submit="submitH"> </du_bar_filter>

    <div class="h20"></div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;"
      @sort-change="sortChange">

      <el-table-column label="id" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" align="center" width="80px">
        <template slot-scope="scope">
          <!-- {{ scope.row.order}} -->
          <el-input v-model="scope.row.order"></el-input>
        </template>
      </el-table-column>


      <el-table-column label="标题" >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="发布状态" align="center" width="80px">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.published"> 已发布 </el-tag>
          <el-tag type="danger" v-else> 未发布 </el-tag>
        </template>
      </el-table-column>
      
      
      
      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="120px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script>
import du_bar_filter from '@com/du_bar_filter'
// import req from '@/utils/req'

export default {
  name: 'DashboardAdmin',
  components: {
    du_bar_filter,

  },
  data() {
    return {
      listLoading: false,
      overall:[
        {tit:"最后更新时间",val:"2018/3/9 12:00"},
        {tit:"数据总条数",val:123},
        {tit:"网站续费时间",val:"2020/9/9"},
      ],
      // 去重客流
      list:[],
      val1:0,
      val2:"0",
    }
  },
  methods: {
    submitH(e) {
      console.log("过滤框行为:",e);
    },
    handleUpdate(){

    },
    sortChange(data) {
      console.log(data);
      
      // const {
      //   prop,
      //   order
      // } = data
      // if (prop === 'id') {
      //   this.sortByID(order)
      // }
    },
  },
  created () {
      /* let aa = req("aaa"); */
      console.log(moment("2018-03-01 23:48").format("YYYY年MM月DD日 HH:MM"));
      this.$req({
        url: '/du_list',
        params: { 
          page: 1,
          limit: 10,
          published: undefined,
          title: undefined,
          sort: '+id'
        }
      }).then((res) => {
          console.table("--------",res.items[0]);
          this.list = res.items;
      });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  td{border: 1px #ccc solid; padding: 10px;}
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
    h1{font-size: 26px; margin: 0.4em 0;
      sub{line-height: 100%; vertical-align: bottom; bottom:0; font-size: 50%; color: #666; margin: 0 0.2em;}
    }
  }
</style>
