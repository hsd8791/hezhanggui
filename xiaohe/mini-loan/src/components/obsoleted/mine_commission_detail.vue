<template>
	<div id="mineCommissionDetails" class="input">
		<h1 class="title">
			<app-back></app-back>
			佣金明细
		</h1>
		<div class="list-container" v-scroll-load='{method:getmore}' >
			<!-- <div class="list-top"></div> -->
			<div class="list-container-inner">
				<app-record v-for='record in records' :key="record">
					<i class="icon-database icon-avator" slot='avator'></i>
					<span slot='rt'>{{record.createTime}}</span>
					<span slot='rd'>{{record.remark}}</span>
					<span slot='ld'>{{record.babaName}} {{record.babaPhone}}</span>
					<span slot='lt'>{{record.money}}元</span>
			</app-record>
			<div class="list-bottom" v-if='allGet'>没有更多啦...</div>
			</div>
		</div>
	<remind :remind='remind'></remind>
</div>
</template>

<script>
	import publicFun from '../js/public.js'
	export default {
	data() {
		return {
			response: null,

			loading: true,
			records: [],
			editing: true,
			backAfterPost: false, // watch out
			url: 'brokerage/getRecords',
			crrtPage:1,
			ttlPage:null,
			getting:false,
			allGet:false,
			remind: {
				isShow: false,
				remindMsg: 'remind',
				self_: this,
				remindOpts: [{
					msg: '确定',
				}, ],
			},
		}
	},
  created(){
  	this.get()
  },
  methods:{
  	scrolling(){
  		console.log('scrolling')
  	},
  	getmore(){
  		if( this.crrtPage <= this.ttlPage && this.getting === false){
  			console.warn('get!!')
  			this.get()
  		}
  	},
  	//getting
  	//ttlPage
  	//crrtPage
  	//allGet
  	//limit
  	//[status]
  	//
  	//uncertain parameters
  	//url
  	get(){
  		if(this.getting){
  			return
  		}
  		if(this.ttlPage){
	  		if(this.allGet){
	  			// console.log('all get')
	  			return
	  		}
  		}
  		console.log('geting')
  		var url=publicFun.urlConcat(this.url,{
  			limit:9,
  			page:this.crrtPage,
  		})
  		//url
  		//which data to concat
  		this.getting=true
  		publicFun.get(url,this,()=>{
  			var data=this.response.body
  			console.log('data brokerage rcd',data.data)
  			this.records=this.records.concat(data.data.data)
  			this.ttlPage=data.data.pages
  			if(this.ttlPage>this.crrtPage){
  				this.crrtPage++
  			}else{
  				this.allGet=true
  			}
  			this.getting=false
  		},()=>{
  			this.getting=false
  		})
  	},

  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
	#mineCommissionDetails{
		.icon-avator{
			font-size: 0.3rem;
		}
		.list-container{
			margin-top: 0.4rem;
		}
	}
</style>
