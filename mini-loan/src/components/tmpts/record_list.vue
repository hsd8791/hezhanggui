<template>
  <div  class="record-list input" >
    <!-- <h1 class="title" v-loading='loading' element-loading-text='请稍后'>
      <app-back></app-back>
      佣金明细
    </h1> -->
    <div v-loading='loading' element-loading-text='请稍后'></div>
    <div class="list-container" v-scroll-load='{method:getmore,listSelector:".list-container-inner"}' @scoll.preventDefault=''>
      <div class="list-container-inner" v-pull-refresh='{method:getNew}'>
        <div class="list-top" v-if='records.length>0'>——释放刷新——</div>
        <div class="list-top" v-if='records.length===0'>无数据</div>
       <!--  <app-record v-for='record in records' :key="record">
          <i class="icon-database icon-avator" slot='avator'></i>
          <span slot='rt'>{{record.createTime}}</span>
          <span slot='rd'>{{record.remark}}</span>
          <span slot='ld'>{{record.babaName}} {{record.babaPhone}}</span>
          <span slot='lt'>{{record.money}}元</span>
        </app-record> -->
        <!-- slot for app-record -->
        <slot></slot>
        <div class="list-bottom" v-if='allGet'>————我是有底线的————</div>
      </div>
    </div>
    <remind :remind='remind'></remind>
  </div>
</template>

<script>
  import publicFun from '../../js/public.js'
  import bus from '../../bus.js'
  export default {
    data() {
      return {
        response: null,
        loading: true,
        records: [],
        editing: true,
      backAfterPost: false, // watch out
      // url: '',
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
  props:['cfg'],
  created(){
  	// this.url=this.config.url
    this.getNew()
  },
  methods:{
    getmore(){
      if( this.crrtPage <= this.ttlPage && this.getting === false){
        // console.warn('get!!')
        this.get()
      }
    },
    getNew(){
      if(this.getting==true){
        return
      }else{
        this.getting==true
        this.records=[]
        this.ttlPage=null
        this.crrtPage=1
        this.allGet=false
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
      // console.log('url config',this.cfg)
      // console.log('url config',this.cfg)
      var url=publicFun.urlConcat(this.cfg.url,{
        limit:8,
        page:this.crrtPage,
      })
      //url
      //which data to concat
      this.getting=true
      publicFun.get(url,this,()=>{
        var data=this.response.body
        console.log('data brokerage rcd',data.data)
        this.records=this.records.concat(data.data.data)
        // bus.$emit(this.cfg.name,this.records)
        var array=[],obj={
          "id": 5,
          "uid": 1,
          "babaUid": 1,
          "babaPhone": "17777777777", //提供佣金的下线手机号
          "babaName": "哈哈哈", //提供佣金的下线名字
          "money": 13, //单位分
          "transactionId": "20170628151349110001", //业务编号
          "remark": "充值奖励", //目前有 ：充值奖励、消费奖励、取消奖励
          "createTime": 1498793212000
        },i
        for (i=0;i<10;i++){
          array[i]=obj
        }
        // bus.$emit(this.cfg.name,array)
        bus.$emit(this.cfg.name,this.records)
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

  .record-list{
    touch-action:none;
    .icon-avator{
      font-size: 0.3rem;
    }
    .list-container{
      margin-top: 0.4rem;
      /*.list-container-inner{*/
        /*}*/
      }
    }
    .list-top{
      position: absolute;
      top: 0.2rem;
      font-size: 0.14rem;
      width: 100%;
      overflow: visible;
      text-align: center;
    }
  </style>
