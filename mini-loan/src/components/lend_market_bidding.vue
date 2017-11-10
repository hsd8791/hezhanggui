<template>
  <div id="marketBiddingVue">
    <div class="input fixed-title" v-loading='loading' element-loading-text='请稍后'>
      <h1 class="title">
        <app-back></app-back>
        排名购买
        <span class="edit-input"  @click='goBiddingRecord' >购买记录</span>
      </h1>
    </div>
    <div class="input qty-container " v-show='choosingQty' @click='choosingQty=false'>
      <div class="qty-box" @click.stop='' >
        <div class="qty-title">
          <div class="input-label">选择购买天数:</div>
            <!-- <el-input-number v-model="buyQty" class='qty-input'   :min="1" :max="crrtMaxQty"></el-input-number> -->
        </div>
        <el-button  class='choose-date' type='success'  v-for='(item,index) in canBuyDate' :class="{'is-disabled':index>buyQty-1}" @click='toggleChoose(index)'>{{item}}</el-button>
        <el-button type='success'  @click='confirmCharge'>确定</el-button>
        <i class="close-bttn icon-cancel-circle" @click='choosingQty=false'></i>
        <div @click='' class="show-rule-box">
            <span class=""  @click='showRuleForce' >购买规则</span>
        </div>
      </div>
    </div>
   
    <div class=" products-container">
      <div :class="{'disabled':prdct.days<=0||prdct.startDateTime<endDate||!isBuyTime}"  class="prdct-item" v-for='prdct in adList'   @click='chooseQty(prdct)' v-if='prdct.pos<12' >
        <div class="prdct-item-inner-box">
          <div class="prdct-line origin-price" >原价：{{prdct.price*2 | hbParser}}钻石</div>
          <div class="prdct-line">现价：{{prdct.price | hbParser}}钻石</div>
          <div class="prdct-line">起始日期：{{prdct.startDate}}</div>
          <div class="prdct-line" v-if='prdct.name'>当日商家：{{prdct.name}}</div>
          <div class="prdct-line" v-if='prdct.countdown===-1'>24小时内无法购买</div>
          <div class="prdct-line countdown" v-if='prdct.countdown>0&&prdct.startDateTime>=endDate'>{{'购买倒计时：'+timeString(prdct.countdown)}}</div>
          <div class="prdct-line" v-if='prdct.countdown===0&&prdct.startDateTime>=endDate'>可购买{{prdct.days}}天</div>
          <div class="prdct-line" v-if='prdct.startDateTime<endDate'>无权购买此位置</div>
        </div>

      </div>
    </div>
    <!-- <div @click='' class="show-rule-box">
        <span class=""  @click='showRuleForce' >购买规则</span>
    </div> -->
    <remind :remind='remind'>
      <div v-if='confirmingChargeInfo'>
        <p class='rule-text charge-info'>购买日期：{{chargeInfo.dates}}</p>
        <p class='rule-text charge-info'>花费钻石：{{chargeInfo.price}}</p>
        <p class='rule-text charge-info'>购买位置：{{chargeInfo.position}}号位</p>
      </div>
    </remind>
    <remind :remind='remindRule' v-if='!viewedRules'>
      <div v-if='ruleIsShow'>
        <p class='rule-text rule-title'>规则说明:</p>
        <p class='rule-text'>1.一次最多购买3天</p>
        <p class='rule-text'>2.每日中午12点-24点开放广告位购买，本产品一旦购买成功即不支持退款，请悉知。</p>
        <p class='rule-text'>3.一个广告位在相同时间内，最多只有一个商家能购买成功，系统会自动退款未成功的订单，您可在购买记录中查看购买结果，所以先买先得，不要犹豫啦，赶快购买吧。</p>
        <p class='rule-text'>4.系统将在每日中午12点完成商家广告位入驻，次日12点下架，并且重新根据当日入驻商家重新完成排序。</p>
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
      confirmingChargeInfo:false,
      ruleReadingInterval:null,
      urls:{
        ad:'lendSupermaket/ad',
        order:'order/createSupermaketAdOrder',
        record:'lendSupermaket/myAdOrders',
      },
      endDate:null,
      crrtMaxQty:1,
      ruleIsShow:false,
      choosingQty:false,
      buyQty:2,
      canBuyDate:[],
      buyDate:[],
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
      remindRule:{ //可以整合进remind
        isShow:false,
        remindMsg:'remind',
        self_:this,
        remindOpts:[
          {msg:'确定',},
        ],
      },
      chargeInfo:{
        dates:null,
        price:null,
        position:null,
      },
    }
  },
  destroyed(){
    clearInterval(this.ruleReadingInterval)
  },
  methods:{
    toggleChoose(i){
      console.log('index',i)
      
      if(i===this.buyQty-1&&this.buyQty!==1){
        this.buyQty=i
      }else{
        this.buyQty=i+1
      }

      
    },
    timeString(countdown){
      let h=Math.floor(countdown/3600)
      let temp=countdown%3600
      // console.log('temp',temp)
      let m=Math.floor(temp/60)
      let s=temp%3600%60
      h=publicFun.toTwo(h)
      m=publicFun.toTwo(m)
      s=publicFun.toTwo(s)
      return `${h}时${m}分`
      // return `${h}:${m}:${s}`
    },
    showRuleForce(){
      bus.viewedBiddingRules=false
      this.showRule()
    },
    showRule(){
      let r=this.remindRule
      this.ruleIsShow=true
      r.remindMsg = ''
      r.isShow=true
      r.remindOpts=[{msg:'确定',disabled:false,callback:()=>{
        this.ruleIsShow=false
        r.isShow=false
        bus.viewedBiddingRules=true
      }}]
      // let tick=5
      // r.remindOpts=[{msg:'确定('+tick+'s)',disabled:true,callback:()=>{
      //   this.ruleIsShow=false
      // }}]
      
      // this.ruleReadingInterval=setInterval(()=>{
      //   tick--
      //   r.remindOpts[0].msg='确定('+tick+'s)'
      //   if(tick===0){
      //     r.remindOpts=[{msg:'确定',disabled:false,callback:()=>{
      //       this.ruleIsShow=false
      //       r.isShow=false
      //     }}]
      //     clearInterval(this.ruleReadingInterval)
      //   }
      // },1000)
    },
    goBiddingRecord(){
      publicFun.goPage(this.$route.path+"/bidding_record")
    },
    getAd(){
      publicFun.get(this.urls.ad,this,()=>{
        console.log('res ad',this.response.body.data)
        this.adList=this.response.body.data
        this.adList.forEach(item=>{
          item.startDateTime=this.getTime(item.startDate)//应该设成 item.startDateTime
        })
      })
    },
    getTime(time){
      let arr=time.split('-'),
      year=arr[0],month=arr[1],d=arr[2]
      // console.log('yyyy-mm-dd',year,month,d)
      let date=new Date()
      date.setFullYear(year)
      date.setMonth(month-1)
      date.setDate(d)
      return date.getTime()
    },
    setChooseDate(p){
      let l=p.days
      this.canBuyDate=[]
      for(let i=0;i<l;i++){
        this.canBuyDate.unshift(this.buyDate[2-i])
      }
      // ,date=publicFun.getTimeString(p.startDateTime,5,10)
      
      
      // console.log('date',date)
    },
    chooseQty(p){
      console.log('p.endDate',p.startDateTime)
      if(p.days<=0||p.startDateTime<this.endDate){return}
      if(!this.isBuyTime){
        let r=this.remind
        r.remindMsg='中午12点后开放购买'
        r.remindOpts=[{msg:'确定',}]
        r.isShow=true
        return
      }
      this.buyQty=p.days
      this.setChooseDate(p)
      this.canBuyQty=p.days
      this.crrtMaxQty=p.days
      this.choosingQty=true
      this.choosedPrdct=p
    },
    getRecord(){
      let url=publicFun.urlConcat(this.urls.record,{
        limit:1,
      })
      publicFun.get(url,this,()=>{
        console.log('res bidding record',this.response.body.data.data)
        let data=this.response.body.data.data
        this.endDate=data[0]?data[0].endDate:0
        // this.records=this.response.body.data.data
      })
    },
    confirmCharge(){
      let r=this.remind,p=this.choosedPrdct,qty=this.buyQty,datesString='',datesArr=this.canBuyDate
      for(let i=0;i<qty;i++){
        datesString=datesString+datesArr[i]+' '
      }
      this.confirmingChargeInfo=true
      r.remindMsg='请核对以下购买信息'
      // r.remindMsg=`请确认是否使用${p.price/100*qty}钻石购买${datesString}的排名`
      let info=this.chargeInfo
      info.price=(p.price/100*qty).toFixed(2)
      info.dates=datesString
      info.position=p.pos+1
      r.remindOpts = [{
        msg: '确定',
        callback: () => {
          this.confirmingChargeInfo=false
          this.charge()
        }
      }, {
        msg: '取消'
      }]
      r.isShow=true
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
        console.log('payId',payId)
        // return
        let transactionId = this.response.body.data.transactionId
        let url=publicFun.urlConcat('/pay_hb',{
          transactionId: transactionId,
          payId:payId,
          path:this.$route.path+'/bidding_record'
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
    function mmddString(n){
      let s=publicFun.getTimeString((new Date()).getTime()+86400000*n,5,10)
      console.log('date',s)
      return s
    }
    this.buyDate.push(mmddString(1))
    this.buyDate.push(mmddString(2))
    this.buyDate.push(mmddString(3))
    // console.log('today',publicFun.getTimeString(new Date(),5,10))
    // console.log('today',publicFun.getTimeString((new Date()).getTime()+86400000,5,10))
    // console.log('today',publicFun.getTimeString((new Date()).getTime()+86400000*2,5,10))
    this.showRule()
    this.getAd()
    this.getRecord()
  },
  computed:{
    viewedRules(){
      return bus.viewedBiddingRules
    },
    isBuyTime(){
      return (new Date()).getHours()>=12
    },
  },
  events: {},
  components: {},
}
</script>

<style lang='scss' scoped>
  .products-container{
    display: flex;
    flex-wrap: wrap;
    margin:0.15rem;
    /*background-clip: border-box;*/
    div.disabled{
      color:#ccc;
      background: #eee;
      &:active{
        color:#ccc;
        background:#eee;
      }
    }
    .prdct-item{
      /*opacity: 1;*/
      padding:0.05rem;
      width: 48%;
      margin:1%;
      /*height: 0.75rem;*/
      border:1px solid #333;
      /*border-radius: 0.05rem;*/
      /*background: #e03b35;*/
      /*background-clip: padding-box;*/
      /*margin:0.055rem;*/
      letter-spacing: -0.5px;
      color:#444;
      display: flex;
      flex-direction: column;
      justify-content:center;
      .prdct-item-inner-box{

      }
      .countdown{
        font-weight: bold;
      }
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

      .origin-price{
        text-decoration: line-through;
      }
      &:active{
        background-color: #ddd;
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
    opacity: 1;
    /*height: 2rem;*/
    background: #f8f8f8;
    position: relative;
    margin:auto;
    top:50%;
    transform: translateY(-50%);
    border:1px solid transparent;
    border-radius: 0.15rem;
    padding:0.1rem;
    /*padding:1rem;*/
    padding-bottom: 0.2rem;
    .choose-date{
      width: 27%;
      height: 0.34rem;
      line-height: 0.24rem;
      padding:0.05rem;
      font-size: 0.14rem;
      border:0;
      margin:0.05rem;
      /*margin-top:0.2rem;*/
    }
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
    .close-bttn{
      position: absolute;
      right: 0.0rem;top: 0.0rem;
      padding:0.05rem;
      font-size: 0.2rem;
      color:#ccc;
    }
  }
  .show-rule-box{
    text-align: right;
    font-size: 0.16rem;
    margin-top: 0.15rem;
    text-decoration: underline;
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
