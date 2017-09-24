<template>
	<div id="marketDetailVue" v-loading='loading' element-loading-text='请稍后'>
		<div class="input">
      <h1 class="title">
        <app-back :backStep=2></app-back>
        {{info.name||''}}
        <span  class="edit-input" @click='viewApplyRecord'>申请记录</span>
      </h1>  
    </div>
    <div class="basic-info basic-title" v-if='info.name'>
      <div class="basic-title-cell">金额</div>
      <div class="basic-title-cell">年龄</div>
      <div class="basic-title-cell">期限</div>
      <!-- <div class="basic-title-cell">费用</div> -->
    </div>
    <div class="basic-info" v-if='info.name'>
      <div class="basic-info-cell">{{info.loanAmountDesc}}元</div>
      <div class="basic-info-cell">{{info.age}}周岁</div>
      <div class="basic-info-cell">{{info.loanTimeDesc}}天</div>
      <!-- <div class="basic-info-cell"> -->
        <!-- <div class="sub-cell">日利率:{{info.interestPercent|persentParser}}</div> -->
        <!-- <div class="sub-cell">手续费:{{info.servicePercent|persentParser}}</div> -->
      <!-- </div> -->
    </div>
    <div class="info-container" v-if='info.name'>
      <app-info :title='"放贷简介"'>{{info.intro}}</app-info>
      <app-info :title='"必需材料"'>身份认证 手机认证 芝麻信用</app-info>
      <app-info :title='"申请条件"'>
          <p class="info-detail-line" v-if='info.zmxyScore'>芝麻信用分要求大于{{info.zmxyScore}}分</p>
          <p class="info-detail-line" v-if='info.zmxyHuabei'>花呗额度要求大于{{info.zmxyHuabei}}元</p>
          <p class="info-detail-line"  v-if='false'>{{info.applyConditionDesc}}</p>
      </app-info>
      <app-info :title='"放款平台"'>
        <span v-if='platform.jiedaibao' class="platform">借贷宝</span>
        <span v-if='platform.jinjiedao' class="platform">今借到</span>
        <span v-if='platform.wuyoujietiao' class="platform">无忧借条</span>
        <span v-if='platform.susujie' class="platform">速速借</span>
        <span v-if='platform.other' class="platform">其他</span>
      </app-info>
    </div>

    <div class="info-container comment" v-if='applyRecord'>
      <hr>
      <br>
      <app-info :title='"最近申请状态"'> {{longApplied?-999:applyRecord.status | statusParser}}</app-info>
      <app-info :title='"联系电话"'  v-if='applyRecord.status!==4&&applyRecord.tel'>  {{info.tel}}</app-info>
      <app-info :title='"审核意见"' v-if='applyRecord.status!==0&&applyRecord.remark'>  {{applyRecord.remark}}</app-info>
    </div>
    <div class="input action-bttn">
      <el-button type='success' @click='goApply' v-if='!haveRecord'>
        申请
      </el-button>

      <el-button type='success' @click='goApply' v-if='longApplied||(haveRecord&&(applyRecord.status===2))'>
        {{applyRecord.status===2?'重新':'再次'}}申请
      </el-button>
      <!-- <el-button type='success' @click='' v-if='haveRecord'></el-button> -->
      <!-- <div  v-if='haveRecord'>{{applyRecord.status|statusParser}}</div> -->
    </div>
    <remind :remind='remind'></remind>
  </div>
</template>

<script>
  import publicFun from '../js/public.js'
  import bus from '../bus.js'
  export default {
  	name:'paticular_lend_market_detail',
    data() {
      return {
        platform:{},
        // noApply:'',
      response:null,
      loading:false,
      editing:true,
      info:{},
      applyRecord:'',
      backAfterPost:false,// watch out
      urlMarketInfo:'lendSupermaket/supermaketInfo',
      urlApplyRecord:'lendApply/borrowLoanRecords',
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
  filters:{
    persentParser(v){
      return v+'%'
    },
    statusParser(v){
      return publicFun.auditStatusParse(v)
    }
  },
  methods:{
    getMarketInfo(){
      var url=publicFun.urlConcat(this.urlMarketInfo,{
        id:this.$route.params.id.split('_')[1]
      })
      publicFun.get(url,this,()=>{
        console.log('market detail',this.response.body)
        this.info=this.response.body.data
        if(bus.account!=='请登录'){
          this.getApplyInfo()
        }
      })
    },
    getApplyInfo(){
      var url = publicFun.urlConcat(this.urlApplyRecord,{
        lendingUid:this.info.uid,
        limit:1,
      })
      publicFun.get(url,this,()=>{
        console.log('apply res',this.response.body)
        this.applyRecord=this.response.body.data.data[0]
      })
    },
    goApply(){
      var url=publicFun.urlConcat('/apply_borrow_market',{
        // phone:this.info.phone
      })
      console.log('url',url)
      bus.marketDetailViewing=this.info
      publicFun.goPage(this.$route.path+url)
    },
    viewApplyRecord(){
      let url = publicFun.urlConcat('/apply_list',{
        lendingUid:1
      })
      publicFun.goPage(this.$route.path+url)
    },
  },
  created(){
    this.getMarketInfo()
    // this.getApplyInfo()
  },
  computed:{
    haveRecord(){
      return Boolean(this.applyRecord)
    },
    longApplied(){
      let a=this.applyRecord
      if(a){
        return a.status===0&&publicFun.longApplied(a.creat_time)
        // return (now.getTime()-this.applyRecord.creat_time)>86400000
      }else{
        return false
      }
    }
  },
  watch:{
    'info.loanWay':function(v){
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
  *{
    /*border:1px solid red;*/
  }
  .action-bttn{
    padding-bottom: 0.15rem;
  }
  .basic-info{
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    .basic-info-cell{
      width: 35%;
      height: 100%;
      color:red;
      font-size: 0.16rem;
      border:1px solid #ccc;
      border-left: 0px;
/*      .sub-cell{
        line-height: 1;
        margin:0.05rem 0;
        &:first-child{
          margin-top:0.1rem;
        }
      }*/
      &:first-child{
        border-left: 1px;
      };
    }
  }
  .basic-title{
    height: 0.3rem;
    .basic-title-cell{
      width: 35%;
      height: 100%;
      color:#666;
      line-height: 0.3rem;
      font-size: 0.18rem;
      border:1px solid #ccc;
      border-left: 0px;
      border-bottom: 0px;
      &:first-child{
        border-left: 1px;
      };
    }
  }
  .info-title{
    color:blue;
    text-align: left;
    font-size: 0.2rem;
  }
  .info-container{
    .info-detail-line{
      margin:0.05rem 0;
    }
    margin:0.15rem;
    @at-root .info-detail{
      text-align: left;
      margin:0.15rem 0;
      font-size: 0.18rem;
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
    }
  }
</style>
