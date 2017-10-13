<template>
  <div id="biddingRecordVue" v-loading='loading' element-loading-text='请稍后'>
    <div class="input">
      <h1 class="title">
        <app-back></app-back>
        竞价排名记录
      </h1>
    </div>
    <app-record-list :cfg='config' v-record='config.name' >
      <app-record v-for='item in records' :canClick=false>
        <span slot='lt'>位置：{{item.pos}}</span>
        <span slot='rt'>{{item.createTime | timeParser}}</span>
        <span slot='ld'>{{item.startDate | dateParser}}至{{item.endDate | dateParser}}</span>
        <span slot='rd'>{{item.isValid?'购买成功':'购买失败'}}</span>
      </app-record>
    </app-record-list>
    <remind :remind='remind'></remind>
  </div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      config:{
        url:'lendSupermaket/myAdOrders',
        name:'bidding_record',
        limit:10,
      },
      records:null,
      response:null,
      loading:false,
      editing:true,
      backAfterPost:false,// watch out
      url:'lendSupermaket/myAdOrders',
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
    getRecord(){
      publicFun.get(this.url,this,()=>{
        console.log('res bidding record',this.response.body.data.data)
        this.records=this.response.body.data.data
      })
    }
  },
  created(){
    // this.getRecord()
    bus.$on(this.config.name,(val)=>{
      // console.log('event name',this.config.name)
      // console.log('test_records',val)
      // this.list={}
      this.records=val
      // let l=val.length
      // this.listObj={}
      // for(let i=0;i<l;i++){
      //   // console.log('id',val[i].id)
      //   // console.log('val[i].uid',val[i].uid)
      //   this.listObj[val[i].uid]=val[i]
      // }
    })
  },
  filters:{
    dateParser(v){
      return publicFun.getTimeString(v,5,10)
    },
    timeParser(v){
      return publicFun.getTimeString(v)
    },
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
