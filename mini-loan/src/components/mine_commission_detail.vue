<template>
	<div id="mineCommissionDetails" class="input">
		<h1 class="title">
			<app-back></app-back>
			佣金明细
		</h1>

		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
export default {
  data() {
    return {
      
      response:null,
      loading:true,
      editing:true,
      backAfterPost:false,// watch out
      url:'brokerage/getRecords',
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
  	this.get()
  },
  methods:{
  	get(){
  		publicFun.get(this.url,this,()=>{
  			var data=this.response.body
  			console.log('data brokerage rcd',data)
  		})
  	},
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
