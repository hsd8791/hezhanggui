<template>
	<div id="marketListVue" v-inner-scroll  @click='hideFloatDetail'>
      <div class="input">
        <h1 class="title" v-loading='loading' element-loading-text='请稍后'>
          贷款超市列表
          <span class='edit-input-left' @click='toggleChoose'>{{multipleMsg}}</span>
          <span class='edit-input' @click='goP("/market_mine")'>我的超市</span>
        </h1>   
        
      </div>
      <div class="link-bidding" @click='goBidding' v-if='isMarket'>
        <!-- 戳我，开始赚更多更多钱！ -->
        提升排名
      </div>

    <app-record-list :top='isMarket?0.8:0.4' :cfg='config' v-record='config.name' class='market-list'>
      <!-- <div v-for='info in list' @click='goP("/market_detail?id="+info.id)'> -->

      <div v-for='info in list' @click='goApply(info)' class="market-container" :key='info.id'>
        <div class="inner-container" :class="{'inner-container-small':choosing}">
          
          <div class="avator">
            <div class="avator-pic" :style="{backgroundImage: 'url('+info.logo+')'}" ></div>
          </div>
          <div class="info-container">
            <div class="info-applied">申请数：{{info.view_num}}</div>
            <div class="info-fee">{{info.loan_amount_desc}}元</div>
            <div class="info-expire">期限{{info.loan_time_desc}}天</div>
          </div>
          <div class="new-remind" v-if='isNew(info.create_time)'>
            <div class="inner">
              new!
            </div>
          </div>
        </div>
        <div class="checkbox-container" @click.stop='disabledRemind(info)' v-show='choosing'>
          <el-checkbox class='checkbox' v-model='marketChoosed' :label='info.uid' @click.stop='' :disabled='info.url!==""||cannotApplyMarket[info.uid]!==undefined'></el-checkbox>
          <i class="icon-copy detail-icon" @click.stop='viewDetail(info)' v-if='!(info.url!==""||cannotApplyMarket[info.uid]!==undefined)'></i>
        </div>
      </div>
    </app-record-list>
    <div class="float-detail" v-if='viewingMarketInfo'>
      <div class="detail-box">
        <p class="float-info-line info-title" v-if='viewingMarketInfo.intro'>{{viewingMarketInfo.name}}</p>
        <p class="float-info-line" v-if='viewingMarketInfo.intro'>{{viewingMarketInfo.intro}}</p>
        <p class="float-info-line" v-if='viewingMarketInfo.zmxy_score'>芝麻信用分要求大于{{viewingMarketInfo.zmxy_score}}分</p>
        <p class="float-info-line" v-if='viewingMarketInfo.zmxy_huabei'>花呗额度要求大于{{viewingMarketInfo.zmxy_huabei}}元</p>
        <p class="float-info-line"  v-if='false'>{{viewingMarketInfo.applyConditionDesc}}</p>
        <div class="float-detail-close" @click='hideFloatDetail'>关闭</div>
      </div>
    </div>
    <div class="input submit" v-if='choosing'>
      <!-- <p class="choose-qty">已选<span class="text">{{marketChoosed.length}}</span>个</p> -->
      <el-button type='success' class='submit-bttn' :disabled='!marketChoosed.length' @click='goSubmitMulti'>已选择{{marketChoosed.length}}个，前往申请</el-button>
    </div>
    <remind :remind='remind'></remind>
	</div>
</template>

<script>

import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      viewingMarketInfo:null,
      cannotApplyMarket:{},
      config:{
      url:'lendSupermaket/list',
      name:'market_list',
      limit:16,
      },
      multipleMsg:'多选',
      marketChoosed:[],
      choosing:false,
      // marketId arr
      // toggle choosing   model checkbox 
      // if not completed to index
      // choose
      // post all
      list:[],
      listObj:{},
      response:null,
      loading:false,
      editing:true,
      backAfterPost:false,// watch out
      url:'lendSupermaket/list',
      urlApply: 'lendApply/lendApply',
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
    // get(){
    //   publicFun.get(this.url,this,()=>{
    //     this.list=this.response.body.data.data
    //     console.log('res list',this.response.body)
    //   })
    // },

    viewDetail(info){
      console.log('view detail')
      this.viewingMarketInfo=info
    },
    hideFloatDetail(){
      this.viewingMarketInfo=null
    },
    disabledRemind(info){
      console.log('click')
      let r=this.remind
      if(info.url!==''){
        r.remindMsg='该贷款超市需单独操作' 
        r.remindOpts=[{msg:'确定'}]
        r.isShow=true
        return
      }
      if(this.cannotApplyMarket[info.uid]===0){//不确定用哪个key
        // r.remindMsg='请勿24小时内重复申请' 
        r.remindMsg='已申请，请勿重复申请' 
        r.remindOpts=[{msg:'确定'}]
        r.isShow=true
        return
      }
      if(this.cannotApplyMarket[info.uid]===4){
        r.remindMsg='无法向该超市发起申请' 
        r.remindOpts=[{msg:'确定'}]
        r.isShow=true
      }
    },
    toggleChoose(){
      console.log('this vm',this.$root)
      let b = this.choosing
      if(b){
        this.multipleMsg = '多选'
        this.choosing = !b
      }else{
        publicFun.checkSession(this,()=>{
          this.cannotApplyMarket = bus.cannotApplyMarket
          this.multipleMsg = '取消'
          this.choosing = !b
        })
      }
     
      // this.$root.checkSession({
      //   forceLogin: true,
      //   callback: () => {
      //     let b = this.choosing
      //     this.cannotApplyMarket = bus.cannotApplyMarket
      //     if (b) {
      //       this.multipleMsg = '多选'
      //     } else {
      //       this.multipleMsg = '取消'
      //     }
      //     this.choosing = !b
      //   }
      // }) 
    },
    goSubmitMulti(){

      bus.marketChosenInfo={}
      let keys = this.marketChoosed,info=this.listObj
      ,l=keys.length
      bus.marketChosenQty=l
      for(let i=0;i<l;i++){
        bus.marketChosenInfo[keys[i]]=info[keys[i]]
      }
      publicFun.goPage(this.$route.path+'/market_applymulti')
      return

      if(bus.cfgEssential.allFilled){

      }else{
        let r=this.remind
        r.remindMsg='请完成必填认证后再申请'
        r.remindOpts=[{
          msg:'前往填写',callback:()=>{
            publicFun.goPage('/index')
          }
        },{
          msg:'知道了',callback:()=>{

          }
        }]
        r.isShow=true
      }
      console.log('bus.config',bus.cfgEssential)
    },
    goBidding(){
      publicFun.goPage(this.$route.path+'/market_bidding')
    },
    goP(p){
      publicFun.goPage(this.$route.path+p)
    },
    goApply(info){
      //001 market_id  002 qudao if have
      let qudao = sessionStorage.getItem('salesWay')
      let MtaH5Body = {'001':info.id}
      if(qudao){
        MtaH5Body['002']=qudao
        MtaH5Body['003']=qudao+'_'+info.id
        // MtaH5.clickStat('1',{'002':qudao})
      }
      console.log('MtaH5Body',MtaH5Body)
      
      // MtaH5.clickStat('1',{'001':info.id})
      MtaH5.clickStat('1',MtaH5Body)
      if(info.url){
        publicFun.get('lendSupermaket/view?id='+info.id,this,()=>{
          // alert('sent viewed')
          window.location.href=info.url
        })

      }else{
        publicFun.get('lendSupermaket/view?id='+info.id,this,()=>{
        })
        publicFun.goPage(this.$route.path+"/market_detail/market_"+info.id)
      }
    },
    isNew(t){
      let i=(new Date()).getTime()-t
      // console.log('i',(new Date()).getTime(),i)
      if(i<259200000){
        return true
      }else{
        return false
      }
    },
  },
  deactivated(){
    // console.log('deactivated')
  },
  activated(){
    // console.log('acitved')
    let listContainer=document.querySelector('.list-container')
    // console.log('listContainer',listContainer)
    listContainer.scrollTop=bus.marketListScrollTop
    this.cannotApplyMarket=bus.cannotApplyMarket
    let listObj=bus.marketChosenInfo
    this.marketChoosed=[]
    for(let key in listObj){
      console.log('key',key)
      this.marketChoosed.push(Number(key))
    }
    if(!this.marketChoosed.length){
      this.choosing=false
      this.multipleMsg='多选'
    }
  },
  computed:{
    isMarket(){
      return bus.isMarket
    },
  },
  created(){
    // 每次重新赋值，后续需优化
    bus.$on(this.config.name,(val)=>{
      // console.log('event name',this.config.name)
      // console.log('test_records',val)
      // this.list={}
      this.list=val
      let l=val.length
      this.listObj={}
      for(let i=0;i<l;i++){
        // console.log('id',val[i].id)
        // console.log('val[i].uid',val[i].uid)
        this.listObj[val[i].uid]=val[i]
      }
    })
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>

.apply-count{
  font-size: 0.13rem;
  color:#ccc;
}
@keyframes blink{
  0% {background:#FF2800}
  40%{background: #DBEF00}
  100%{background: #FF2800}
}
.link-bidding{
  animation: blink 0.3s infinite linear;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.2rem;
  background: #FF2800;
  color:#fff;
}
</style>
<style type="text/css" lang='scss'>
  
  #marketListVue{
    .float-detail{
      position: fixed;
      top: 0;left: 0;
      width: 100%;
      height: 100%;
      background:rgba(0,0,0,0.2);
      z-index: 9999;
      .detail-box{
        position: relative;
        background: #fff;
        width: 60%;
        padding-top:0.1rem ;
        border-radius: 0.1rem;
        top:50%;
        margin: 0 auto;
        transform:translateY(-50%);
      }
      .float-detail-close{
        border:0px solid #d2d2d2;
        border-top-width: 1px;
        padding:0.07rem;
        color: #0081ff;
        font-size: 0.16rem;
      }
    }
    .float-info-line{
      line-height: 1.2;
      text-align: left;
      padding:0 0.2rem;
      font-size: 0.14rem;
      margin-bottom: 0.1rem;
    }
    .info-title{
      font-weight: bold;
    }
    .submit{
      position: fixed;
      bottom: 0;
      z-index: 3;
      height: 0.5rem;
      .choose-qty{
        position: absolute;
        background: #fddfec;
        text-align: center;
        top: -0.3rem;
        width: 100%;
        line-height: 0.3rem;
        font-size: 0.16rem;
        color:#666;
        .text{
          color:#D80F0F;
          font-weight: bold;
        }
      }
      .submit-bttn{
        width: 100%;
        margin:0;
        height: 100%;
      }
    }
    .checkbox{
      position: absolute;
      left: 0;right: 0;
      top: 0;bottom: 0;
      /*margin:auto ;*/
      height:0.8rem;
      width: 100%;
      padding:0.25rem 0;
      padding-left: 0.05rem;
      margin:0;
      /*border:1px solid red;*/
    }
    .inner-container{
      width: 100%;
      height:100%;
      transform: scale(1);
      transform-origin: right;
      transition: .15s;
    }
    .inner-container-small{
      transform: scale(0.9);
    }
    .checkbox-container{
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    .detail-icon{
      color:#999;
      /*z-index: 9999;*/
      position: absolute;
      right: 0;
      top: 0;
      padding:0.05rem;
    }
    .market-container{

      overflow: hidden;
      width: 50%;
      border:1px solid #fff;
      height: 0.8rem;
      position: relative;
      background: #f4f4f4;
      .avator{
        width:0.5rem;
        height:0.5rem;
        left:0.1rem;
        margin:auto 0;
        border:1px solid #ccc;
        position: absolute;
        top: 0;bottom: 0;
        .avator-pic{
          width:100%;
          height:100%;
          position: absolute;
          left: 0;
          background:url(#) no-repeat center center;
          background-size: contain;

        }
      }
      .info-container{
        width: 65%;
        padding:0.12rem 0;
        padding-left: 0.05rem;
        position: absolute;
        right: 0;
        top: 0;
        text-align: left;
        font-size: 0.13rem;
        .info-fee,.info-expire,.info-applied{

        }
        .info-fee{
          color:#F44343;
          font-size: 0.14rem;
        }
        .info-expire{
          color:#888;
        }
        .info-applied{
          color:#666;
        }
      }
      .new-remind{
        transform: rotate(45deg);
        border:1px solid red;
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        right: -0.3rem;top: -0.3rem;
        .inner{
          width: 100%;
          height: 0.2rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          position: absolute;
          background: #ED0C30;
          color:#fff;
          bottom: 0;

        }
      }
    }
    .list-container{
      .list-container-inner{
        display: flex;
        flex-wrap: wrap;
      }
      /*margin-bottom: 0.4rem;*/
      border:1px solid #fff;
    }
  }

</style>
<style type="text/css" lang='scss'>
#marketListVue{

  .el-checkbox__label{
    opacity: 0;
  } 
}
</style>
