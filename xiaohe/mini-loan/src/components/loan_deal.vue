<template>
	<div id="loanDealVue">
		<div class="input">
			<h1 class="title">
				<app-back></app-back>
				{{action|actionParser}}
			</h1>
<!-- 			<div>
				续期费:￥{{reBorrowFee | moneyParser}}
				逾期费:￥{{overdueFee | moneyParser}}
				重借利息:￥{{reBorrowFee____ | moneyParser}}
			</div> -->

      <div class="container phone-lender" >

        <div class="wraper" v-if="action=='renewal'">
          <label class="amout-label">续期费用：</label>
          <div class="amount">{{reBorrowFee | moneyParser}}</div>
        </div>
        <!-- <div class="wraper" v-if="action=='special'||action=='renewal'"> -->

        <div class="wraper" v-if="action=='reborrow'">
          <label class="amout-label">重借费用：</label>
          <div class="amount">{{reBorrowFee____ | moneyParser}}</div>
        </div>
        <div class="wraper" v-if="true">
          <label class="amout-label">逾期费用：</label>
          <div class="amount">{{overdueFee | moneyParser}}</div>
        </div>
      </div>
      <div class="container">
        <div class="wraper"  v-if="action!=='special'">
          <label class="amout-label">总和：</label>
          <div class="amount">{{ttlFee | moneyParser}}</div>
        </div>
        <div class="wraper" v-if="action=='special'">
          <label class="amout-label">支付:</label>
          <el-input class='custom-pay' id='specialInput' v-model='specialAmount'  placeholder="0.00" type='number'></el-input>
        </div>
      </div>
      <div class="amount-emphasis" >￥{{amount | amountParser}}</div>
      <el-button type='success' @click='submit' :disabled='amount==0' >支付</el-button>
    </div>
    <p class="description" v-if='action=="special"'>
      说明：【特殊】用于补交费用或其他方式还款，金额可以自定义输入。
    </p>
    <remind :remind='remind'></remind>
  </div>
</template>

<script>
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				title:'',
				response:null,
				loading:true,
				editing:true,
        platform:'',
    	backAfterPost:false,// watch out
    	urlLendInfo:'accounting/myLendInfo',
    	urlOrder:'order/createXiaoheOrder',
    	overdueFee:null,
    	moneyFee:null,
      reBorrowFee:null,
      action:null,
      specialAmount:null,
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
  	moneyParser(v){
  		return Number(v/100).toFixed(2)
  	},
    amountParser(val){
      // console.log('amount',val)
      if(!val){
        return (0).toFixed(2)
      }
      // console.log('val',val)
      return Number(val/100).toFixed(2)
    },
    actionParser(v){
      var s
      switch (v) {
        case 'special':
        s = '特殊';
        break;
        case 'renewal':
        s = '续期';
        break;
        case 'reborrow':
        s = '重借';
        break;
        default:
        s = '未知操作';
        break;
      }
      return s
    }
  },
  created(){
  	var q=this.$route.query
  	this.title=q.title
  	this.action=q.action


    var T=setInterval(function(){
      var input=document.querySelector('.el-input__inner')
      if(input){
        clearInterval(T)
        input.setAttribute('pattern','[0-9]*')
        console.log('setted pattern')
      }
    },100)
    // setTimeout(function() {
    //   var input=document.querySelector('.el-input__inner')
    //   console.log('input',input)
    //   input.setAttribute('pattern','[0-9]*')
    // }, 1000);
    if(this.action==='renewal'){

    }
    this.getFee()
  },
  methods:{
  	getFee(){
  		publicFun.get(this.urlLendInfo,this,()=>{
  			console.log('res lender',this.response)
  			var data=this.response.body.data
        console.log('data lending info',data)
  			this.overdueFee=data.overdueFee
  			this.moneyFee=data.moneyFee
        this.reBorrowFee=data.reBorrowFee-data.overdueFee
        this.platform=data.lendingWay
      })
  	},
    submit(){

      var queryBody={}
      queryBody.mark='none'
      if(this.action=='special'){
        queryBody.moneyFee=this.specialAmount*100
      }else{
        queryBody.moneyFee=this.ttlFee
      }
      var url=publicFun.urlConcat(this.urlOrder,queryBody)
      console.log('url',url)
      // var path=publicFun.urlConcat('/loan_bill/loan_deal_remind',{
      //   action:this.action
      // })
      // publicFun.goPage(path)
      publicFun.goPage(this.$route.fullPath+'/')
      publicFun.get(url,this,()=>{
        console.log('res create',this.response)
        var payId=this.response.body.data.payId
        var successPath
        if(this.action=='special'){
          successPath='/loan_bill'
        }else{
          successPath=publicFun.urlConcat('/loan_bill/loan_deal_remind',{
            action:this.action,
            amount:this.moneyFee,
            platform:this.platform,
          })
        }

        console.log('successPath',successPath)
        var url = publicFun.urlConcat('/loan_bill/loan_deal/pay',{
          payId:payId,
          action:this.action,
          path:encodeURIComponent(successPath),
        })
        console.log('url',url)
        publicFun.goPage(url)
      })
    },
  },
  computed:{
    ttlFee(){
      var m=0,t=this
      
      switch(t.action){
        case 'reborrow': m=m+t.reBorrowFee____+t.overdueFee; break;
        case 'renewal': m+=(t.overdueFee+t.reBorrowFee); break;
        case 'repayment': m+=t.overdueFee; break;
        case 'special': m+=t.overdueFee; break;
      }
      return m
    },
    reBorrowFee____() {
      return 0.2 * this.moneyFee
    },
    amount(){
      if(this.action=='special'){
        return Number(this.specialAmount*100).toFixed(0)
      }else{
        return this.ttlFee
      }
    },
  },
  watch:{
    specialAmount(v){
      console.log('specialAmount',v)
      var n=parseFloat(v)
      // this.specialAmount=n
    }
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .amount{
    height: 0.4rem;
    font-size: 0.20rem;
    text-align: right;
    padding-right: 0.15rem;
    line-height: 0.4rem;
    /*font-weight: bold;*/
  }
  #loanDealVue{
    .phone-lender{
      margin-top:0.2rem;
    }
    .amout-label{
      color:#8e8e8e;
    }
  }
  .amount-emphasis{
    font-size: 0.4rem;
  }
  .description{
    font-size: 0.18rem;
    margin:0.2rem;
    text-align:left;
    line-height: 1.6;
  }

</style>
<style lang='scss'>
  #loanDealVue{
    .el-input__inner{
      text-align: right;
      padding-right:0.15rem;
      font-size: 0.20rem;
      /*font-weight: bold;*/
    }
  }

</style>