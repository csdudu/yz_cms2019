<template>
  <div class="du_bar_filter jcsb">
  	<el-select v-model="published_val" placeholder="选择发布状态" class="published_bar"
			@change = "publishedH"
		>
			<el-option
				v-for="item in published_options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>

		<el-date-picker
			v-model="date_val"
			type="daterange"
			align="right"
			unlink-panels
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期">
		</el-date-picker>

		<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search_val" width="120px" class="search_bar">
		</el-input>

		<el-button type="primary" icon="el-icon-zoom-in" @click="handleFilter">筛选 </el-button>

  </div>
</template>

<script>
export default {
  name: 'du_bar_filter',
  props: [],
  data() {
    return {
      search_val: "",
      published_val:undefined,
      date_val:"",
      published_options:[
      	{label:"已发布",value:true},
      	{label:"未发布",value:false}
      ]
    }
  },
  methods:{
  	publishedH(){
  		this.$emit("submit",_val);
		},
		handleFilter(){
  		let _val = {
  			shop:this.published_options[this.published_val].label,
  			date0:this.date_val[0]||"",
  			date1:this.date_val[1]||"",
  			during:this.during_val
  		};
  		// console.table("click:",_val);
  		this.$emit("submit",_val);
  	}
  }
}
</script>

<style lang="scss" scoped>
	
	.btn1{margin-left: 10px;}
	
</style>
