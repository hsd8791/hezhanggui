<template>
  <div id="marketBiddingVue">
    <div class="input" v-loading='loading' element-loading-text='请稍后'>
      <h1 class="title">
        <app-back></app-back>
        排名购买
        <span class="edit-input"  @click='goBiddingRecord' >购买记录</span>
      </h1>
    </div>
    <div class="input qty-container " v-show='choosingQty' @click='choosingQty=false'>
      <div class="qty-box" @click.stop=''>
      <div class="qty-title">
        
        <div class="input-label">选择购买天数:</div>
        <!-- <span class='qty-input-box'> -->
          <el-input-number v-model="buyQty" class='qty-input' @change="handleChange"  :min="1" :max="3"></el-input-number>
        <!-- </span> -->
      </div>
          <el-button type='success'  @click='charge'>确定</el-button>
      </div>
    </div>
    <div class=" products-container">
      <div class="prdct-item"  v-for='prdct in adList' @click='chooseQty(prdct)'>
        <div class="prdct-price">原价：{{prdct.price*2 | hbParser}}禾币</div>
        <div class="prdct-price">现价：{{prdct.price | hbParser}}禾币</div>
        <div class="prdct-price">起始日期：{{prdct.startDate}}</div>
        <!-- <div class="prdct-rmb">售价:{{prdct.moneyFee | moneyParser}}元</div> -->
      </div>
    </div>
    <remind :remind='remind'></remind>
    <remind :remind='remindRule'>
      <div v-if='ruleIsShow'>
        <p class='rule-text rule-title'>规则说明:</p>
        <p class='rule-text'>1.本产品一旦购买成功即不支持退款，请悉知。</p>
        <p class='rule-text'>2.一个广告位在相同时间内，最多只有一个商家能购买成功，系统会自动退款未成功的订单，您可在购买记录中查看购买结果，所以先买先得，不要犹豫啦，赶快购买吧。</p>
        <p class='rule-text'>3.系统将在每日凌晨2点完成商家广告位入驻，次日凌晨1:59分下架，并且重新根据当日入驻商家重新完成排序。</p>
      </div>
    </remind>
  </div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      ruleReadingInterval:null,
      urls:{
        ad:'lendSupermaket/ad',
        order:'order/createSupermaketAdOrder',
      },
      ruleIsShow:false,
      choosingQty:false,
      buyQty:1,
      adList:[],
      response:null,
      loading:false,
      choosedPrdct:null,
      backAfterPost:false,// watch out
      remind:{
        isShow:false,
        remindMsg:'remind',
        self_:this,
        remindOpts:[
        {msg:'确定',},
        ],
      },
      remindRule:{
        isShow:false,
        remindMsg:'remind',
        self_:this,
        remindOpts:[
        {msg:'确定',},
        ],
      },
    }
  },
  destroyed(){
    clearInterval(this.ruleReadingInterval)
  },
  methods:{

    showRule(){
      let r=this.remindRule
      this.ruleIsShow=true
      r.remindMsg = ''
      r.isShow=true
      let tick=5
      r.remindOpts=[{msg:'确定('+tick+'s)',disabled:true,callback:()=>{
        this.ruleIsShow=false
      }}]

      
      this.ruleReadingInterval=setInterval(()=>{
        tick--
        r.remindOpts[0].msg='确定('+tick+'s)'
        if(tick===0){
          r.remindOpts=[{msg:'确定',disabled:false,callback:()=>{
            this.ruleIsShow=false
          }}]
          clearInterval(this.ruleReadingInterval)
        }
      },1000)
    },
    goBiddingRecord(){
      publicFun.goPage(this.$route.path+"/bidding_record")
    },
    getAd(){
      publicFun.get(this.urls.ad,this,()=>{
        console.log('res ad',this.response.body.data)
        this.adList=this.response.body.data
      })
    },
    chooseQty(p){
      this.choosingQty=true
      this.choosedPrdct=p
    },
    charge(){
      let prdct=this.choosedPrdct
      let url=publicFun.urlConcat(this.urls.order,{
        startDate:prdct.startDate,
        pos:prdct.pos,
        days:this.buyQty,
      })
      this.choosingQty=false
      publicFun.get(url,this,()=>{
        console.log('order',this.response.body)
        let payId=this.response.body.data.payId
        let transactionId = this.response.body.data.transactionId
        let url=publicFun.urlConcat('/pay',{
          transactionId: transactionId,
          payId:payId,
        })
        console.log('url',url)
        // return
        publicFun.goPage(this.$route.path+url)
      })
    },
  },
  filters:{
    moneyParser(v){
      return Number(v/100).toFixed(2)
    },
    hbParser(v){
      return Number(v/100).toFixed(0)
    }
  },
  created(){
    this.showRule()
    this.getAd()
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .products-container{
    display: flex;
    flex-wrap: wrap;
    margin:0.15rem;
    /*background-clip: border-box;*/
    .prdct-item{
      padding:0.05rem;
      width: 50%;
      height: 0.75rem;
      border:5px solid transparent;
      border-radius: 0.05rem;
      background: #e03b35;
      background-clip: padding-box;
      /*margin:0.055rem;*/
      letter-spacing: -0.5px;
      color:#fff;
      .prdct-hb{
        font-size: 0.16rem;
        margin:0.15rem 0 0;
      }
      .prdct-rmb{
        font-size: 0.13rem;
        margin: 0;
        margin-top: 0.05rem;
        transform: scale(1);
      }
      &:active{
        background: #cc2a1b;
        color: #fff;
      }
    }
  }
  .rule-text{
    text-align: left;
    margin:0.1rem 0.1rem;
    font-size: 0.14rem;
  }
  .rule-title{
    margin-top: 0.15rem;
    font-size: 0.2rem;
  }
  .qty-container{
    position: fixed;
    top:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    
  }
  .rule-text{

  }
  .qty-box{
    width: 2.7rem;
    /*height: 2rem;*/
    background: #f8f8f8;
    position: relative;
    margin:auto;
    top:50%;
    transform: translateY(-50%);
    border:1px solid transparent;
    border-radius: 0.15rem;
    padding:0.1rem;
    padding-bottom: 0.2rem;
    .qty-title{
      /*border:1px solid red;*/
      font-size: 0.16rem;
      margin:0.05rem 0;
      padding:0.05rem 0;
      /*baseline: center;*/
       vertical-align:text-top;
    }
    .qty-input{
      display: block;
      margin-top:0.05rem;
      margin:0.15rem auto 0;
    }
    .qty-input-box{
      /*display: block;*/
      width: 0.8rem;
      
    }
    .input-label{
      display: inline;
      font-size: 0.2rem;
    }
  }
</style>
<style lang='scss'>
  .input{
    .qty-input-box{
      position: relative;
      /*border:1px solid red;*/
      .el-input-number{
        position: absolute;
        top: 0;
      }
    }
    .el-input-number{
      width: 1.4rem;
      .el-input__inner{
        height: 0.44rem;
        padding-right: 0.6rem;
        padding-left:0.2rem;
        font-size: 0.18rem;

      }
    }
    
    .el-input-number__decrease,.el-input-number__increase{
      width:0.44rem;
      line-height:0.44rem;
    }
    .el-input-number__decrease{
      right:0.45rem;
    }
  }
</style>
