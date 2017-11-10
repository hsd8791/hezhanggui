<template>
	<div id="applyLendVue" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title"><app-back></app-back>开始放贷</h1>
      <el-button type='success'  @click='share("borrower")'>点击分享给借款人</el-button>

<!--     <div class="container container-owner" >
      <div class="wraper">
        <label>放贷人：</label> 
        <el-input :disabled='!editing' placeholder='请输入放贷人真实姓名' v-model='owner' @blur.once='blured'  :class='{"valid-border":ownerValid,"error-border":!ownerValid}'></el-input>
        <i :class="{'el-icon-check':ownerValid,'el-icon-close':!ownerValid}"></i>
      </div>
      <el-button type='success' @click='submitOwner'v-if='!haveOwner' :disabled='!ownerValid'>成为实名放贷人</el-button>
    </div>
    <div v-if='(haveOwner)'>
      <el-button type='success'  @click='goP("/market_mine")' v-if='!(myInfo.logo&&myInfo.name)'> 申请贷款超市</el-button>
    </div> -->
    <div @click='goP("/market_mine")' v-if='haveOwner&&myInfo.logo&&myInfo.name'  >
    <!-- <div @click='goP("/market_mine")' v-if='false'  > -->

      <app-record class='market-container'>
      <div class="avator-pic" :style="{backgroundImage: 'url('+myInfo.logo+')'}" slot='avator'></div>
      <span slot='lt' style="letter-spacing: -0.01rem;">
        {{myInfo.name}}&nbsp;&nbsp;
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
      </span>
      <!-- <span slot='rt'>{{}}</span> -->
      <span slot='rd'>
        <span class="required-info-box">
          <span class='required-text'>身份验证</span>
        </span>
        <span class="required-info-box">
          <span class='required-text'>手机认证</span>
        </span>
        <span class="required-info-box">
          <span class='required-text'>芝麻认证</span>
        </span>        
        <span class="required-info-box">
          <span class='required-text'>身份证</span>
        </span>
      </span>
      <span slot='ld'>{{myInfo.intro}}</span>
    </app-record>
  </div>
  <!-- <el-button type='success'  @click='share("partner")'>点击推广给朋友</el-button> -->
  <!-- <div class="weixin_layout" id='cover'></div> -->
  <share :show='shareCoverShow'></share>
  <remind :remind='remind'></remind>
</div>

</template>

<script>
	// import '../css/input.css'
	import publicFun from '../js/public.js'
	import remind from '../components/tmpts/remind.vue'
	import share from '../components/tmpts/share_cover.vue'
	import bus from '../bus.js'
	export default {
		data() {
			return {
        owner:'',
        myInfo:{},
        haveOwner:false,
        haveLogo:false,
        shareCoverShow:'none',
        response:null,
        loading:false,
        editing:true,
        url:'',
        urlOwnerSubmit:'lendSupermaket/myInfoPersonal',
        urlMyInfo:'lendSupermaket/myInfo',
        // backAfterPost:false,
        remind:{
          isShow:false,
          remindMsg:'请先登录',
          self_:this,
          remindOpts:[
          {msg:'确定',callback:()=>publicFun.goPage('/login')},
          ],
        },
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
    goP(p){
      publicFun.goPage(this.$route.path+p)
    },
    share(to){
      if(bus.account==='请登录'){
        this.remind.isShow=true
        // publicFun.goPage('/login')
      }
      // if(to==='partner'){
        // this.changeUrlSign()
      // }
      // if(to==='borrower'){
      // }
      this.changeUrl()
      this.showCover()
    },
    showCover(){
      this.shareCoverShow='block'
    },
    changeUrl(){
      if(publicFun.isWeiXin()){
        return
      }
      window.history.pushState("object or string", "Title",bus.relativeUrlTest+'/m/#/index/apply_borrow?uniqueId='+bus.uniqueId+'&share=1')

    },
    submitOwner(){
      var r=this.remind
      r.remindMsg='请确定是否提交'
      r.remindMsgDscrp='提交后无法修改，请确认'
      r.remindOpts=[
      {msg:'确定',callback:()=>{
        this.confirmSubmitOwner()
        r.remindMsgDscrp=''
      }},
      {msg:'取消',callback:()=>{
        r.remindMsgDscrp=''
      }}
      ]
      r.isShow=true
    },
    confirmSubmitOwner(){
      var postBody={
        owner:this.owner,
      }
      publicFun.post(this.urlOwnerSubmit,postBody,this,()=>{
        console.log('')
        this.getInfo()
      })
    },
    getInfo(){
      publicFun.get(this.urlMyInfo,this,()=>{
        console.warn('res myInfo',this.response.body)
        this.owner=this.response.body.data.owner
        this.myInfo=this.response.body.data
        if(!this.owner){
          this.editing=true
        }else{
          this.haveOwner=true
        }
      },()=>{},()=>{
        // console.warn('res myInfo',this.response.body)
        if(this.response.body.error==30000){
          this.editing=true
        }
      })
    },
    configMenueShare(){
      wx.onMenuShareAppMessage({
          title: '壹号超市', // 分享标题
          desc: '点击向'+publicFun.phonePartshow(bus.account)+'借款', // 分享描述
          link: 'https://www.yi576.com'+bus.relativeUrlTest+'/m/#/index/apply_borrow?uniqueId='+bus.uniqueId+'&share=1', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://www.yi576.com/m/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: ()=> { 
            var remind=this.remind
            remind.remindMsg='分享成功'
            remind.remindOpts=[{msg:'确定'}]
            remind.isShow=true
            
              // 用户确认分享后执行的回调函数
            },
            cancel: ()=> { 
              var remind=this.remind
              remind.remindMsg='取消分享'
              remind.remindOpts=[{msg:'确定'}]
              remind.isShow=true
              // 用户取消分享后执行的回调函数
            }
          });
    },

    blured($event) {
      var el = $event.target.parentElement.parentElement
      el.className += ' validate'
    },
    // changeUrlSign(){
      // window.history.pushState("object or string", "Title",'/m/#/index/login_code?signup=1&uniqueId='+bus.uniqueId)

    // },
  },
  computed:{
    ownerValid(){
      var reg=publicFun.reg.chinese
      return reg.test(this.owner)
    },

  },
  watch:{
    editing(v){
      console.log('editing',v)
    },
    'myInfo.logo':function(v){
      if(v){
        this.haveLogo=true
      }else{
        this.haveLogo=false
      }
    }
  },
  events: {},
  created(){
    this.getInfo()
    // this.path=this.$route.path
    var wxInterval=setInterval(()=>{
      if(bus.wxConfiged){
        clearInterval(wxInterval)
        this.configMenueShare()
      }
    })
    publicFun.checkSession(this)
    bus.$on('close_share_cover',()=>{
      this.shareCoverShow='none'
      // window.history.pushState("object or string", "Title",'/m/#'+this.$route.path)
      if(!publicFun.isWeiXin()){
        publicFun.goPage(-1)
      }

    })
  },
  components: {
  	share:share,
    remind:remind,
  }
}
</script>

<style lang='scss' scoped>

</style>
<style lang='scss'>
/*  #applyLendVue{

   .container-owner .el-button--success{
    margin-bottom: 0.15rem;
  }
  
}
*/
</style>
