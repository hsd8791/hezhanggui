<template>
  <div>
    <div class="input">

      <h1 class="title">
        <app-back></app-back>
        回款管理
      </h1>
    </div>
    <div v-if='info.fee'>
      
      <h3>我的回款管理</h3>
      <p class="descrip" v-if='!info.endDate'>
        新用户首月免费 
        <span class="link" @click='buyCuishou'>立即免费试用</span>
      </p>
      <p class="descrip">包月费用：
        <span class='original-price'>{{info.fee/(info.discount*0.01)|money}}金币</span> 
        <span v-if='!info.endDate'>{{0|money}}金币</span>
        <span v-if='info.endDate'>{{info.fee|money}}金币</span>
      </p>
      <!-- <p class="descrip">包月费用：{{info.fee*info.discount*0.01|money}}金币 折后价</p> -->
      <!-- <p class="descrip" v-if='info.endDate||true'>
        到期时间：{{info.endDate|date}}金币
        <span class='link' @click='buyCuishou'>购买</span>
      </p> -->
      <p class="descrip" v-if='info.endDate'>
        到期时间：{{info.endDate|date}} 
        <span class='link' @click='buyCuishou'>续期</span>
      </p>
    </div>
    <!-- 可以查看当天还有多少人没有还款，查看对应人的信息，相关联系方式进行电话联系以及记录催收情况 -->
    <h3>使用说明</h3>
    <p class="descrip">
      1.登录
      <a href="http://www.ho163.com">http://www.ho163.com</a>
    </p>
    <p class="descrip">
      2.添加使用账号：个人中心->子账号系统管理，类型选择催收或者第三方催收
    </p>
    <p class="descrip">
      3.电脑版登录地址： 
      <a href="https://www.ho163.com">https://www.ho163.com</a>，
      登录类型选择"客服/第三方"
    </p>
    <p class="descrip">
      4.移动端版本访问地址：
      <a href="https://www.ho163.com/cuishou">https://www.ho163.com/cuishou</a>
    </p>
    <h3>产品说明：</h3>
    <p class="descrip">
      针对【陈管家】商家的贷后管理需求，设计一款可以联动商户系统后台的移动端的贷后管理系统，涵盖贷款记录展示功能、联系人数据展示功能、一键拨号功能、回款管理记录功能等，能较好的覆盖贷后管理需求。
    </p>
    <h3>回款管理系统：</h3>
    <p class="descrip">
      移动版使用费，按每月500金币，目前6折优惠，折后价格每月300金币。陈管家商家上架后才能购买使用，用户首月使用0金币【首月免费使用】，次月开始收费。
      <!-- 添加开启和关闭自动续费功能。添加购买开通页 -->
    </p>
    <!-- <p class="descrip">1.查看到期未还客户列表</p>
    <p class="descrip">2.查看到期未还客户详细信息</p>
    <p class="descrip">3.根据相关信息进行回款管理，并记录。</p>
    <p class="descrip">更多功能，敬请期待...</p> -->
<!--     <h3>回款管理系统移动版：</h3>
    <p class="descrip">
       
    </p> -->
    <!-- <app-info :title='"陈管家后台管理地址："' class='backend-container' >
     
    </app-info> -->
    <remind :remind=remind></remind>
  </div>
</template>

<script>
import publicFun from './../js/public.js'
export default {
  data() {
    return {
      info:{},
      response:null,
      loading:false,
      editing:true,
      backAfterPost:false,// watch out
      urls:{
        info:'lendSupermaket/cuishouSysInfo',
        order:'order/createCuishouOrder',
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
    this.getInfo()
  },
  filters:{
    money(v){
      return Number(v/100).toFixed(2)
    },
    date(v){
      return publicFun.getTimeString(v,0,10)
    },
  },
  // let transactionId = this.response.body.data.transactionId
  // let url=publicFun.urlConcat('/pay_hb',{
  //   transactionId: transactionId,
  //   payId:payId,
  //   path:this.$route.path+'/bidding_record'
  // })
  // publicFun.goPage(this.$route.path+url)
  methods:{
    submitBuy(){
      publicFun.get(this.urls.order,this,()=>{
        var info=this.response.body.data
        var payId=info.payId
        var transactionId=info.transactionId
        var path=this.$route.path
        var url=publicFun.urlConcat('/pay_hb',{
          transactionId,
          payId,
          path,
        })
        console.log('url',url)
        publicFun.goPage(this.$route.path+url)
      })
    },
    buyCuishou(){
      var r=this.remind
      r.remindOpts=[{msg:'确定',callback:()=>{
        this.submitBuy()
      }},{
        msg:'取消',
      }]
      r.remindMsg='确认购买一个月回款管理系统服务'
      r.isShow=true
    },
    getInfo(){
      let url=publicFun.urlConcat(this.urls.info,{})
      publicFun.get(url,this,()=>{
        this.info=this.response.body.data
        console.log('res',this.response)
      })
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.link{
  color:#2C63FB;
  text-decoration: underline;
}
h3{
  font-size: 0.16rem;
  text-align: left;
  margin:0.05rem 0.15rem;
}
.original-price{
  text-decoration: line-through;
}
.descrip{
  line-height: 1.6;
  text-align: left;
  font-size: 0.14rem;
  color:#666;
  margin:0.05rem 0.15rem;
}
</style>
