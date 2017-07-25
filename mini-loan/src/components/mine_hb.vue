<template>
	<div id="mineHbVue">
	<div class="input">
		<h1 class="title">
				<app-back></app-back>
				我的禾币
		</h1>
	</div>
		<div class="hb-container">
		剩余禾币：￥{{hb.hb |moneyParser}}
		</div>
		<div class="hb-container">
		冻结禾币：￥{{hb.freezeHb |moneyParser}}
		</div>
	</div>
</template>

<script>
	import bus from '../bus.js'
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				hb:{},
				response:null,
				loading:true,
				editing:true,
    	backAfterPost:false,// watch out
    	url:'account/hb',
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
  methods:{
  	get(){
  		publicFun.get(this.url,this,()=>{
  			console.log('hb res',this.response.body)
  			this.hb=this.response.body.data
  		})
  	}
  },
  filters:{
  	moneyParser(v){
  		return Number(v/100).toFixed(2)
  	},
  },
  created(){
  	this.get()
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.hb-container{
	font-size: 0.24rem;
	margin:0.15rem;
}

</style>
