<template>
	<div id="fillStatusEssential" class='input' v-if='!fillStatusCfg.allFilled'>
		<h3 class="subtitle">请完成以下信息后提交</h3>

		<div class="container">
			<div class="unordered-list"  v-for='(item,index) in fillStatusCfg.fillStatus' @click='goPage(item.url)' v-if='!item.status'>
				{{item.label}}
				<i class="el-icon-arrow-right"></i>
			</div>
			<div class="unordered-list"  v-for='(item,index) in fillStatusCfg.fillStatus2' @click='goPage(item.url)' v-if='!(item.status&&item.status2)'>
				{{item.label}}
				<i class="el-icon-arrow-right"></i>
			</div>
		</div>
	</div>
</template>

<script>
import bus from '../../bus.js'
import publicFun from '../../js/public.js'
export default {
  data() {
    return {
    	fillStatusCfg:{},
    	response:null,
    	loading:false,
    	editing:true,
    	backAfterPost:false,// watch out
    	url:'',
    	remind:{
    		isShow:false,
    		remindMsg:'remind',
    		self_:this,
    		remindOpts:[
    		{msg:'确定',},
    		],
    	},
    }
  },
  created(){
  	this.getFillStatusSet()
  },
  methods:{
  	goPage(p) {
  		publicFun.goPage(this.$route.path+p)
  	},
  	getFillStatusSet(){
  			//每次进入单独判断数据魔盒是否板定成功
  			// publicFun.checkSingleFilled	('credit/shujumoheSimQueryStatus','cfgEssential')
  		bus.$on('checked_fill_status', val => {
  			this.fillStatusCfg = val
  		})
  			//?? 获取fillStatus 状态
  		this.fillStatusCfg = bus.fillStatusCfg
  		bus.checkFilled(bus.cfgEssential)
  	},
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.subtitle{
	/*height: 0.25rem;*/
	/*background: #ccc;*/
	font-size: 0.18rem;
	line-height: 1.4;
	text-align: left;
	margin: 0.1rem 0;
	margin-left: 0.15rem;
	padding-left: 0.1rem;

}
</style>
