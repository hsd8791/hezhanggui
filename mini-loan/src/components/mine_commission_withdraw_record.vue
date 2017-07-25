<template>
	<div id="commissionWithdrawRecord">
		<div class="input">
			
			<h1 class="title">
				<app-back></app-back>
				提现记录
			</h1>
		</div>

		<app-record-list :cfg='config' v-record='config.name'>
		<app-record v-for='record in records' :key="record">
		<i class="icon-database icon-avator" style="font-size: 0.3rem" slot='avator'></i>
		<span slot='lt'>￥{{record.money | moneyParser}}元</span>
		<span slot='rt'>{{record.createTime | timeParser}}</span>
		<span slot='rd'>{{record.status}}</span>
		<span slot='ld'>{{record.babaName}} {{record.babaPhone}}</span>
	</app-record>
</app-record-list>
<remind :remind='remind'></remind>
</div>
</template>

<script>
	import bus from '../bus.js'
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				config:{
				url:'brokerage/extraRecords',
				name:'withdraw_record',
				},
				records:[],
				response:null,
				loading:true,
				editing:true,
				backAfterPost:false,
				url:'brokerage/extraRecords',
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
			bus.$on(this.config.name,(val)=>{
				// console.log('event name',this.config.name)
			  // console.log('test_records',val)
			  this.records=val
			})
		},
		filters:{
			moneyParser(v){
				return Number(v/100).toFixed(2)
			},
			timeParser(v){
				return publicFun.getTimeString(v)
			}
		},
		methods:{},
		events: {},
		components: {}
	}
</script>

<style>

</style>
