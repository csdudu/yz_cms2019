<template>
  <div class="du_bar_filter jcsb">
  	<el-select v-model="shop_val" placeholder="选择门店">
  	    <el-option
  	      v-for="item in shop_options"
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

  	<div>
  		<el-radio-group v-model="during_val">
		    <el-radio-button label="本周">本周</el-radio-button>
		    <el-radio-button label="上周">上周</el-radio-button>
		    <el-radio-button label="本月">本月</el-radio-button>
		    <el-radio-button label="上月">上月</el-radio-button>
		  </el-radio-group>
	
		  <el-button type="primary" @click="clickH" class="btn1" size="small">查询</el-button>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'du_bar_filter',
  props: ["href"],
  data() {
    return {
      during_val: "本周",
      shop_val:0,
      date_val:"",
      shop_options:[
      	{label:"全部门店",value:0},
      	{label:"东区门店",value:1},
      	{label:"西区门店",value:2},
      	{label:"南区门店",value:3},
      ]
    }
  },
  methods:{
  	clickH(){
  		let _val = {
  			shop:this.shop_options[this.shop_val].label,
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
	.du_bar_filter{
		background-color: #fff; padding: 10px; border-radius: 5px; box-shadow: 0 0 3px #ddd;
	}
	.btn1{margin-left: 10px;}
	
</style>
