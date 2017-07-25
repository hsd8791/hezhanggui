<template>
	<div id="mineCommissionDetails" class="input">
		<h1 class="title" v-loading='loading' element-loading-text='请稍后'>
			<app-back></app-back>
			佣金明细
		</h1>

		 <app-record-list :cfg='config' v-record='config.name'>
      <app-record v-for='record in records' :key="record">
        <i class="icon-database icon-avator" style="font-size: 0.3rem" slot='avator'></i>
        <span slot='rt'>{{record.createTime | timeParser}}</span>
        <span slot='rd'>{{record.remark}}</span>
        <span slot='ld'>{{record.babaName}} {{record.babaPhone}}</span>
        <span slot='lt'>{{record.money}}元</span>
      </app-record>
    </app-record-list>
	<remind :remind='remind'></remind>
</div>
</template>

<script>
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
  export default {
    data () {
      return {

        config:{
	        url:'brokerage/getRecords',
	        name:'commission_detail'
        },
        records:[],
        response:null,
        loading:false,
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
    methods:{

    },
    filters:{
    	timeParser(v){
    		return publicFun.getTimeString(v)
    	}
    },
    created(){
      bus.$on(this.config.name,(val)=>{
      	console.log('event name',this.config.name)
        console.log('test_records',val)
        this.records=val
      })
    },
    watch:{

    },
    components: {
    }
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
