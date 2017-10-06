<template>
  <div id="applyDetailVue">
    <div class="input">
      <h1 class="title">
        <app-back></app-back>
        申请记录
      </h1>
    <div class="container" v-if='true'>
      <app-info :title="'申请对象'">{{applyRecord.name}}</app-info>
      <app-info :title="'申请金额'" v-if='applyRecord.amount'>{{applyRecord.amount |moneyParser}}</app-info>
      <app-info :title="'申请时间'">{{applyRecord.creat_time|timeParser}}</app-info>
      <app-info :title='"申请条件"' v-if='marketInfo&&applyRecord.status===2||applyRecord.status===4' >
          <p class="info-detail-line" v-if='marketInfo.zmxyScore'>芝麻信用分要求大于{{marketInfo.zmxyScore}}分</p>
          <p class="info-detail-line" v-if='marketInfo.zmxyHuabei'>花呗额度要求大于{{marketInfo.zmxyHuabei}}元</p>
          <p class="info-detail-line"  v-if='false'>{{info.applyConditionDesc}}</p>
      </app-info>
      <app-info :title="'年龄要求'" v-if='applyRecord.status===2||applyRecord.status===4'>{{marketInfo.age}}周岁</app-info>
    <!-- </div> -->
    <hr>
    <!-- <div class="container" v-if='marketInfo'> -->
      <!-- <app-info :title="'查看状态'">{{viewed?'已查看':'未查看'}}</app-info> -->
      <app-info :title="'申请结果'" >{{longApplied?-999:applyRecord.status | statusParser}}</app-info>
      <!-- <app-info :title="'申请结果'" >{{applyRecord.status | statusParser}}</app-info> -->
      <app-info :title='"审核意见"' v-if='applyRecord.status!==0&&applyRecord.remark'>  {{applyRecord.remark}}</app-info>
      <app-info :title="'联系方式'" v-if='marketInfo'>
        <span v-if='marketInfo.tel'><a :href="'tel:'+marketInfo.tel">{{marketInfo.tel}}</a></span>
        <span v-if='!marketInfo.tel'>请通过右侧联系方式联系禾掌柜工作人员</span>
      </app-info>
    </div>
    <el-button type='success' @click='goApply' v-if='canApply'>
      {{submitText}}
    </el-button>

    <!-- <el-button type='success' @click='goApply' v-if='longApplied||(haveRecord&&(applyRecord.status===2))'>
      {{applyRecord.status===2?'重新':'再次'}}申请
    </el-button> -->
    </div>
  </div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      platform:{},
      marketInfo:null,
      applyRecord:{},
      applyId:null,
      response:null,
      loading:false,
      editing:true,
      backAfterPost:false,// watch out
      urls:{
        market:'lendSupermaket/supermaketInfoByUid',
        applyRecord:'lendApply/borrowLoanRecords',
      },
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
    // setTimeout(()=> {
    //   if(this.marketInfo.tel){
    //     this.marketInfo.tel='13777722216'
    //   }
    // }, 3000);
    let query=this.$route.query
    if(bus.applyRecordViewing){
      this.applyRecord=bus.applyRecordViewing
    }else{
      this.applyId=query.apply_id
      this.getApplyRecord()

    }
    this.lendingUid=query.lendingUid
    this.getMarketInfo()
  },
  methods:{
    getApplyRecord(){
      let url = publicFun.urlConcat(this.urls.applyRecord,{applyId:this.applyId})
      publicFun.get(url,this,()=>{
        this.applyRecord=this.response.body.data.data[0]
      })
    },
    goApply(){
      let a=this.applyRecord,url
      if(a.status===3||a.status===1){
        publicFun.goPage('/market_list/market_detail/market_'+this.marketInfo.id)
      }else{
        url=publicFun.urlConcat('/apply_borrow_market',this.$route.query)
        publicFun.goPage(this.$route.path+url)
      } 
      bus.marketDetailViewing=this.marketInfo
    },
    getMarketInfo(){
      let url=publicFun.urlConcat(this.urls.market,{
        uid:this.lendingUid
      })
      publicFun.get(url,this,()=>{
        console.log('res',this.response.body)
        this.marketInfo=this.response.body.data
      })
    },
  },
  computed:{
    // viewed(){
    //   if(this.applyRecord.phone.indexOf('****')>-1){
    //     return false
    //   }else{
    //     return true
    //   }
    // },
    submitText() {
      let a=this.applyRecord
      if(a.status===0||a.status===1||a.status===3){
        return '再次申请'
      }
      if(a.status===2){
        return '重新申请'
      }
      return '点击申请'
    },
    longApplied(){
      let a=this.applyRecord
      if(a){
        return a.status===0&&publicFun.longApplied(a.creat_time)
      }else{
        return false
      }
    },
    canApply(){
      let t=this,a=this.applyRecord
      if(!a){
        return true
      }else{
        if(a.status===0){
          if(t.longApplied){
            return true
          }else{
            return false
          }
        }
        if(a.status===4){
          return false
        }
        if(a.status===3||a.status===2||a.status===1){
          return true
        }
      }
    },
  },
  filters:{
    statusParser(v){
      return publicFun.auditStatusDscrpParse(v)
    },
    timeParser(v){
      return publicFun.getTimeString(v)
    },
    moneyParser(v){
      return (Number(v)/100).toFixed(2)+'元'
    },
  },
  watch:{
    'marketInfo.loanWay':function(v){
      if(!v){
        return
      }
      this.platform=JSON.parse(v)
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.container{
  padding: 0.1rem 0.15rem ;
}
.platform{
  &:after{
    content:' /';
  }
  &:last-child{
    &:after{
      content:'';
    }
  }
}
</style>
