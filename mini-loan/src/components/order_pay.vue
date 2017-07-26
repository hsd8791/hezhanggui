<template>
	<div id="orderPayVue" class="input">
		<h1 class="title">
      <!-- <app-back></app-back> -->
      支付
    </h1>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      fromPath:'/',
    	response:null,
    	loading:true,
    	editing:true,
    	backAfterPost:false,// watch out
    	url:'order/pay',
      statusUrl:'order/status?payId=',
      payTypes:['WX_NATIVE','WX_JSAPI'],
      payId:'',
      payData:{},
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
    payInvoke(){
      // return ()=>{
        console.log({
                 "appId":this.payData.appId,     //公众号名称，由商户传入     
                 "timeStamp":this.payData.timeStamp,         //时间戳，自1970年以来的秒数     
                 "nonceStr":this.payData.nonceStr, //随机串     
                 "package":this.payData.package,     
                 "signType":this.payData.signType,         //微信签名方式：     
                 "paySign":this.payData.paySign //微信签名 
             })
         WeixinJSBridge.invoke(
             'getBrandWCPayRequest', {
                 "appId":this.payData.appId,     //公众号名称，由商户传入     
                 "timeStamp":this.payData.timeStamp,         //时间戳，自1970年以来的秒数     
                 "nonceStr":this.payData.nonceStr, //随机串     
                 "package":this.payData.package,     
                 "signType":this.payData.signType,         //微信签名方式：     
                 "paySign":this.payData.paySign //微信签名 
             },
             (res)=>{     
                 if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                    console.log('push forward')
                 }else{
                  console.log('failed')
                 }
                 // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
             }
         ); 
      // }
    },
    get(){
      if(!this.payId){
        console.warn('no payId')
        return
      }
      var url=publicFun.urlConcat(this.url,{
        payId:this.payId,
        payType:this.payTypes[1],
      })
      publicFun.get(url,this,()=>{
        console.log('pay id',this.response.body.data.payInfo)
        this.payData=this.response.body.data.payInfo
        if (typeof WeixinJSBridge == "undefined"){
           if( document.addEventListener ){
               document.addEventListener('WeixinJSBridgeReady', this.payInvoke, false);
           }else if (document.attachEvent){
               document.attachEvent('WeixinJSBridgeReady', this.payInvoke); 
               document.attachEvent('onWeixinJSBridgeReady', this.payInvoke);
           }
        }else{
          this.payInvoke();
          var T=setInterval(()=>{
            publicFun.get(this.statusUrl+this.payId,this,()=>{
              console.log('res status pay',this.response.body)
              var data=this.response.body.data
              if(data.status==='success'){
                clearInterval(T)
                var r=this.remind
                r.remindMsg='支付成功'
                r.isShow=true
                r.remindOpts=[
                {msg:'确定',callback:()=>{
                  // publicFun.goPage(-1,()=>{
                  // bus.$emit('paid_service_paid')
                  // publicFun.goPage('/paid_service/history')
                  publicFun.goPage(this.fromPath)
                  // })
                }}
                ]

              }
            })
          },2000)
        }

      })
    },
  },
  beforeRouteEnter(to,from,next){
    console.log('from',from)

    next(vm=>{
       vm.fromPath=from.fullPath
    })
  },
  created(){

    // console.log('route',this.$route.query.payId)
    this.payId=this.$route.query.payId
    this.get()
  },
  components: {}
}
</script>

<style>

</style>
