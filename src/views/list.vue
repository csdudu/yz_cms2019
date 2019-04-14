<template>
  <div class="du_list p30">
      <h2>{{rtit}}</h2><div class=""></div>
    <div class="h10"></div>
    <!-- <du_bar_filter class="bar1"
       @published="publishedH"
       @datePick="datePickH"
       @searchTit="searchTitH"
    > </du_bar_filter> -->
    <div class="du_bar_filter bar1 jcsb">
      <div class="left_bar">
        <el-select v-model="listQuery.published" placeholder="选择发布状态" class="published_bar" @change="getList">
      <el-option v-for="item in published_options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
      </el-select>
      
      <el-date-picker v-model="listQuery.during" type="daterange" align="right" unlink-panels range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期"
      @change="getList"
      >
      </el-date-picker></div>

      <el-input placeholder="请输入内容" v-model="listQuery.title" class="search_bar" @keyup.native.enter="getList"
      >
        <el-button slot="append" icon="el-icon-zoom-in" @click="getList">开始筛选</el-button>
      </el-input>

      

    </div>

    <div class="h10"></div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" stripe
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" align="center" width="40">
      </el-table-column>

      <el-table-column label="排序" align="center" width="80px">
        <template slot-scope="scope">
          <el-input v-model="scope.row.order" size="small"></el-input>
        </template>
      </el-table-column>


      <el-table-column label="标题" >
        <template slot-scope="scope">
          {{ scope.row.pid }} - {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" align="center" width="100px">
        <template slot-scope="scope">{{ scope.row.timestamp|cDateMini }}
        </template>
      </el-table-column>
      
      <el-table-column label="发布状态" align="center" width="80px">
        <template slot-scope="scope">
          <span v-if="scope.row.published"> 已发布 </span>
          <span class="danger" v-else> 未发布 </span>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="170px">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" size="mini" @click="handleUpdate(scope.row)">修改 </el-button>
          <el-button icon="el-icon-delete" size="mini" @click="handleUpdate(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="h10"></div>

    <el-pagination layout="sizes, total, prev, pager, next, jumper" :current-page.sync="listQuery.page"
    class="p10"
      :page-size="listQuery.limit" :total="item_total" :page-sizes="pageSizes" @current-change="handleCurrentChange"
      @size-change="handleSizeChange" />
    
    <div class="h10"></div>
    <div class="btnPanel bar1">
      <el-button type="primary" icon="el-icon-delete"  @click="delListH">删除所选</el-button>
      <el-button type="primary" icon="el-icon-delete"  @click="delPicH">删除所选简图</el-button>
      <el-button type="primary" icon="el-icon-tickets" @click="sortListH">重新排序</el-button>
      <el-button type="primary" icon="el-icon-upload2" @click="publishListH">发布所选</el-button>
      <el-button type="primary" icon="el-icon-circle-close-outline" @click="stopPublishListH">停止发布所选</el-button>
    </div>

    
  </div>
</template>

<script>
import du_bar_filter from '@com/du_bar_filter'

export default {
  name: 'du_list',
  components: {
    du_bar_filter,

  },
  data() {
    return {
      search_val: "",
      published_val:undefined,
      
      published_options:[
      {label:"全部",value:undefined},
      {label:"已发布",value:1},
      {label:"未发布",value:0}
      ],
      
      pageSizes:[10,20,50],   //每页条数切换
      listQuery: { //API入口参数
        during:[],
        page: 1,
        limit: 10,
        published: undefined,
        title: undefined,
      },
      listLoading: false,
      item_total:undefined, //列表总条目
      list:[],
      selection:[]    //当前被选中的id集合
    }
  },
  computed: {
    api(){
      return this.$route.meta.api
    },
    rid(){
      return this.$route.params.id
    },
    rtit(){
      return this.$route.meta.sub[this.$route.params.id]
    }
  },
  methods: {
    submitH(e) {
      console.log("过滤框行为:",e);
    },
    handleUpdate(){

    },

    // 选中列表条目
    handleSelectionChange(val) {
      this.selection = _.map(val, "pid");
    },

    ///////////////过滤条

    // 发布状态
    publishedH(val){
        // this.listQuery.published = val;
        this.getList()
    },

    // 时间范围
    clickH(val){
    },
    
    //////////////翻页行为
    handleCurrentChange(val){
        console.log("翻页",val);
        this.getList()
    },
    handleSizeChange(val) {
        console.log("改变每页条数",val);
        this.listQuery.limit = val;
        this.getList()
    },

    // 加载服务器数据
    getList() {
        this.listLoading = true;

        this.$req({
        url: '/du_list',
        params: this.listQuery
      }).then((res) => {
          this.list = res.list;
          this.item_total = res.total;

          // 模拟加载进度
          setTimeout(() => {
          this.listLoading = false
          }, 500)
      });
    },
    postList(postUrl,txt) {
      if(this.selection.length==0){
        this.$message({
          message: "未选中条目",
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      
      this.listLoading = true;
        // 模拟加载进度
      setTimeout(() => {
      this.listLoading = false
      }, 500)

      this.$req({
      url: postUrl,
      method:"post",
      data: this.selection
      }).then((res) => {
          this.list = res.list;
          this.item_total = res.total;

          this.$message({
            message: txt+"操作成功！",
            type: 'success',
            duration: 3 * 1000
          })
      });
    },
    
    delListH() {
      this.postList("/delList","删除所选")
    },
    delPicH() {
      this.postList("/delPic","删除所选简图")
    },
    publishListH() {
      this.postList("/publishList","发布所选")
    },
    stopPublishListH() {
      this.postList("/stopPublishList","停止发布所选")
    },
    sortListH() {
      let _sele = _.filter(this.list, function(o) { return o.order });
      if(_sele.length==0){
        this.$message({
          message: "未填入序号，无法执行排序",
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      
      this.listLoading = true;
        // 模拟加载进度
      setTimeout(() => {
      this.listLoading = false
      }, 500)

      this.$req({
        url: "/sortList",
        method:"post",
        data: _sele
      }).then((res) => {
          this.list = res.list;
          this.item_total = res.total;

          this.$message({
            message: "排序成功！",
            type: 'success',
            duration: 3 * 1000
          })
      });
      
    },
  },
  created () {
      this.getList();
      
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
