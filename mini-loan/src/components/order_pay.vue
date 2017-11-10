<template>
  <div id="orderPayVue" class="input" >
    <h1 class="title" v-loading='loading' element-loading-text='请稍后'>支付</h1>
    <div class="cover-paying" v-show='paying'>
      <div class="input card-pay ">
        <div class="code-remind">
          <app-back :remind='"<"' :color="'#ccc'" class='rechoose-card' :method='cardPay'></app-back >
          <p :style="{color:verifyCodeMsgErr?'red':'black',}">
          {{verifyCodeMsg||verifyCodeMsgErr}}
          </p>
        </div>
        <div class="container">
          <div class="wraper">
            <label>验证码：</label>
            <!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
            <el-input placeholder='手机验证码' v-model='verifyCode' @blur.once='blured'  :class='{"valid-border":verifyCodeValid,"error-border":!verifyCodeValid}'></el-input>
            <el-button class='getVerify' type="warning" @click='getCode(urls.reGetCode)' :disabled="banGetCode">{{codeBtnMsg}}</el-button>
            <!-- <i :class="{'el-icon-check':verifyCodeValid,'el-icon-close':!verifyCodeValid}"></i> -->
          </div>
        </div>
        <el-button type='success' @click='cardPayCommit':disabled='!verifyCodeValid'>支付</el-button>
      </div>
    </div>
    <div class="binding-card" v-if='binding' >
      <div class="input">
        <h1 class="title">
          <app-back :method='cancelBinding'></app-back>
          绑定新银行卡
        </h1>
      </div>
      <app-bind-card :callback='cardPay' ></app-bind-card>
    </div>
    <app-choose :choose=choose ></app-choose>
    <remind :remind='remind'></remind>
  </div>
</template>

<script>
  import publicFun from '../js/public.js'
  import bus from '../bus.js'
  export default {
    data() {
      return {
    //     response:null,
    //     loading:true,
    //     editing:true,
    //   backAfterPost:false,// watch out
    //   url:'order/pay',
    //   payStatusPolling:null,
    //   statusUrl:'order/status?payId=',
    //   successPath:'',
    //   payTypes:['WX_NATIVE','WX_JSAPI'],
    //   payId:'',
    //   payData:{},
    //   remind:{
    //     isShow:false,
    //     remindMsg:'remind',
    //     self_:this,
    //     remindOpts:[
    //     {msg:'确定',},
    //     ],
    //   },
    // }
        verifyCodeMsg:'验证码已发送，如未收到，请点击重新发送',
        verifyCodeMsgErr:'',
        banGetCode:false,
        response: null,
        loading: false,
        editing: true,
        tokenChoosed: '',
        backAfterPost: false, // watch out
        cards: [],
        paying: false,
        binding: false,
        codeBtnMsg: '重新发送',
        verifyCode: '',
        urls: {
          pay: 'order/pay',
          cards: 'unspay/mycards',
          getCode: 'order/unspay/prepare',
          reGetCode: 'unspay/sendVerCode',
        },
        statusUrl: 'order/status?payId=',
        successPath: '',
        payTypes: {
          wechatMobile:'WX_JSAPI',
          wechatPC:'WX_NATIVE',
          unspay:'UNSPAY',
        },
        payId: '',
        payData: {},
        remind: {
          isShow: false,
          remindMsg: 'remind',
          self_: this,
          remindOpts: [{
            msg: '确定',
          }, ],
        },
        choose:{
          back:null,
          isShow:false,
          title:'',
          self_:this,
          chooseOpts:[
          ],
        },

      }
  },
  computed:{
    verifyCodeValid(){
      var reg=/^\d{6}$/;
      return reg.test(this.verifyCode)
    },
  },
  methods:{
    blured($event){
      var el=$event.target.parentElement.parentElement
      el.className+=' validate'
    },
    choosePayType(){
      this.choose={
        back:null,
        isShow:true,
        title:'选择支付方式',
        self_:this,
        chooseOpts:[
        {type:'微信支付',callback:()=>{
          this.wechatPay()
        }},
        {type:'快捷支付',callback:()=>{
          this.cardPay()
        }},
        ],
      }
    },
    cancelChoose(){
      this.choose.isShow=false
      var r=location.hash.replace("#",'')
      var arr=r.split('/')
      arr.pop()
      var newR=arr.join('/')
      let query=this.$route.query
      newR=publicFun.urlConcat(newR,{
        action:query.action,
        billId:query.billId,
        v:Math.random().toFixed(5)
      })
      publicFun.goPage(newR)
    },
    cancelBinding(){
      this.binding=false
      this.choose.isShow=true
    },
    payInvoke() {
      this.polling()
      console.log({
        "appId": this.payData.appId, //公众号名称，由商户传入     
        "timeStamp": this.payData.timeStamp, //时间戳，自1970年以来的秒数     
        "nonceStr": this.payData.nonceStr, //随机串     
        "package": this.payData.package,
        "signType": this.payData.signType, //微信签名方式：     
        "paySign": this.payData.paySign //微信签名 
      })
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": this.payData.appId, //公众号名称，由商户传入     
          "timeStamp": this.payData.timeStamp, //时间戳，自1970年以来的秒数     
          "nonceStr": this.payData.nonceStr, //随机串     
          "package": this.payData.package,
          "signType": this.payData.signType, //微信签名方式：     
          "paySign": this.payData.paySign //微信签名 
        },
        (res) => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            console.log('push forward')
          } else {
            console.log('failed')
          }
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        }
      );
    },
    polling() {
      this.payStatusPolling= setInterval(() => {
        publicFun.get(this.statusUrl + this.payId, this, () => {
          console.log('res status pay', this.response.body)
          var data = this.response.body.data
          if (data.status == 'success') {
            clearInterval(T)
            var r = this.remind
            r.remindMsg = '支付成功'
            r.isShow = true
            r.remindOpts = [{
              msg: '确定',
              callback: () => {
                if (this.successPath) {
                  publicFun.goPage(this.successPath)
                  return
                }
                publicFun.goPage(-2)
              }
            }]
            setTimeout(() => {
              publicFun.goPage(this.successPath)
            }, 500);
          }
        })
      }, 2000)
    },
    banGetCodeInterval(){
       var expire=30,self_=this
       this.codeBtnMsg=expire+'s后获取'
       var T=setInterval(function(){
        expire--
        self_.codeBtnMsg=expire+'s后获取'
        if(!expire){
          clearInterval(T)
          self_.banGetCode=false
          self_.codeBtnMsg="获取验证码"
        }
       },1000)
    },
    getCode(u){
      this.banGetCode=true
      this.banGetCodeInterval()
      let url=publicFun.urlConcat(u,{
        token:this.tokenChoosed,
        payId:this.payId,
      })
      publicFun.get(url,this,()=>{
      },()=>{

      },()=>{
        if(this.response.body.error){
          this.verifyCodeMsgErr=this.response.body.msg
          this.verifyCodeMsg=''
        }
      })
    },
    cardPay(){
      this.paying=false
      this.binding=false
      publicFun.get(this.urls.cards,this,()=>{
        let cards=this.response.body.data
        ,options=[],len=cards.length
        ,c=this.choose,temp

        for(let i=0;i<len;i++){
          let l=cards[i].length
          temp={type:'银行卡：'+cards[i].cardNo,callback:()=>{
            this.tokenChoosed=cards[i].token
            this.getCode(this.urls.getCode)
            this.paying=true
          }}
          options.push(temp)
        }
        options.push({type:'使用其他银行卡',callback:()=>{
            this.binding=true
            
          }})
        c.back=this.cancelChoose.bind(this)
        c.chooseOpts=options
        c.title='请选择银行卡'
        c.isShow=true
      })

      // c.isShow=true
    },
    cardPayCommit(){
      this.polling()
      if(!this.payId){
        console.warn('no payId')
        return
      }
      var url=publicFun.urlConcat(this.urls.pay,{
        payId:this.payId,
        payType:this.payTypes.unspay,
        unspayToken:this.tokenChoosed,
        verCode:this.verifyCode,
      })
      publicFun.get(url, this, () => {
        console.log('pay id', this.response.body)
        let r = this.remind,
          data = this.response.body.data,
          result = data.payInfo.result,
          msg
        switch (result) {
          case '00':
            msg = '支付成功'
            break;
          case '10':
            msg = '交易处理中'
            break;
          case '20':
            msg = '支付失败'
            break;
          default:
            msg = '未知状态'
            break;
        }
        r.remindMsg = msg
        r.remindOpts = [{
          msg: '确定',callback:()=>{

          }
        }]
        r.isShow = true

      })
    },
    wechatPay(){
      if(!this.payId){
        console.warn('no payId')
        return
      }
      var url=publicFun.urlConcat(this.urls.pay,{
        payId:this.payId,
        payType:this.payTypes.wechatMobile,
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
        this.chooseRslt()
      }
    })
    },
    chooseRslt(){
       var r=this.remind
        r.isShow=true
        r.remindMsg='选择支付结果'
        r.remindOpts=[
        {msg:'已完成',callback:()=>{
          publicFun.goPage('/mine')
        }},
        {msg:'未完成',callback:()=>{
          publicFun.goPage(-1)
        }},
        ]
      },
  },
  
  created(){
    this.choosePayType()
    var query=this.$route.query
    this.payId=query.payId
    // if(bus.relativeUrlTest){
    //   this.$http.get('?payId='+this.payId).then(res=>{
    //     let r=this.remind
    //     r.isShow=true
    //     r.remindMsg='测试支付成公'
    //     r.remindOpts=[{msg:'确定',callback:()=>{
    //         publicFun.goPage(-1)
    //     }}]
    //   })
    //   return
    // }
    this.successPath=query.path
    // setTimeout(()=> {
    // }, 1000);
    // this.payStatusPolling=setInterval(()=>{
    //   publicFun.get(this.statusUrl+this.payId,this,()=>{
    //     console.log('res status pay',this.response.body)
    //     var data=this.response.body.data
    //     if(data.status=='success'){
    //       clearInterval(this.payStatusPolling)
    //       var r=this.remind

    //       r.remindMsg='支付成功'
    //       r.isShow=true
    //       r.remindOpts=[
    //       {msg:'确定',callback:()=>{
    //         if(this.successPath){
    //           publicFun.goPage(this.successPath)
    //           return
    //         }
    //         publicFun.goPage(-1)
    //       }}
    //       ]
    //       setTimeout(()=> {
    //           publicFun.goPage(this.successPath)
    //       }, 500);
    //     }
    //   })
    // },2000)
    // this.get()
  },
  beforeRouteLeave(to,from,next){
    console.log('leave pay page')
    clearInterval(this.payStatusPolling)
    next()
  },
  components: {}
}
</script>

<style lang='scss' scoped>
.card-pay{
      width: 3.2rem;
      padding:0.1rem;
      background: #f8f8f8;
      position: relative;
      margin:auto;
      top:50%;
      transform: translateY(-50%);
      border:1px solid transparent;
      border-radius: 0.15rem;
}

  .cover-paying{
    position: fixed;
    background: rgba(0,0,0,0.1);
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 99999;
    }
  .binding-card{
    position: fixed;
    /*background: rgba(0,0,0,0.6);*/
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 99999;
  }
#orderPayVue{
  .getVerify{
    position: absolute;
    margin:auto 0;
    top: 0;bottom: 0; right: 0.05rem;
    height: 0.36rem;
    width: 1rem;
    padding:0.1rem;
    color:#222;
    background-color: #dfe0dd;
    border-color:#dfe0dd;
    /*box-sizing: content-box;*/
  }
}
  button[class~='el-button--warning'].is-disabled{
    opacity: 0.3;
  }
  button[class~='el-button--success'].is-disabled{
    opacity: 0.4;
  }
  .back{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0.5rem;
    .text{
      height: 0.16rem;
      text-decoration: underline;
      font-weight: normal;
      line-height: 1;
      font-size: 0.16rem;
      color:#fff;
      position: absolute;
      display: block;
      margin:auto ;
      top: 0;right: 0;left: 0;bottom: 0;
    }
  }
  .code-remind{
    font-size: 0.16rem;
    padding:0.1rem 0.3rem;
    position: relative;
    .rechoose-card{
      width: 0.3rem;
      height: 0.5rem;
    }
  }
</style>
