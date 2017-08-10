<template>
	<div id="marketApplyVue" class="input" v-inner-scroll>
    <!--   -->
    <h1 class="title">
      <app-back></app-back>
      贷款超市信息
      <span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
    </h1>

    <div class="container-avatar">
      <h2 class="sub-title">贷款超市LOGO</h2>
      <pic-load :uploadConfig='uploadConfig'></pic-load>
    </div>
    <div class="container">
      <div class="wraper">
        <label>产品名称：</label> 
        <el-input :disabled='!editing' placeholder='请输入产品名称' v-model='marketInfo.name' @blur.once='blured'  :class='{"valid-border":nameValid,"error-border":!nameValid}'></el-input>
        <i :class="{'el-icon-check':nameValid,'el-icon-close':!nameValid}"></i>
      </div>
      <div class="wraper">
        <label>产品简介：</label> 
        <el-input :disabled='!editing' placeholder='请输入产品简介' v-model='marketInfo.intro' @blur.once='blured'  :class='{"valid-border":introValid,"error-border":!introValid}'></el-input>
        <i :class="{'el-icon-check':introValid,'el-icon-close':!introValid}"></i>
      </div>
      <div class="wraper" v-if='false'>
        <label>客服电话：</label> 
        <el-input :disabled='!editing' placeholder='请输入客服电话' v-model='marketInfo.tel' type='tel' @blur.once='blured'  :class='{"valid-border":telValid,"error-border":!telValid}'></el-input>
        <i :class="{'el-icon-check':telValid,'el-icon-close':!telValid}"></i>
      </div>
      <div class="wraper">
        <label>年龄要求：</label> 
        <el-input :disabled='!editing' placeholder='例：22-34' v-model='marketInfo.age' @blur.once='blured'  :class='{"valid-border":ageValid,"error-border":!ageValid}'></el-input>
        <i :class="{'el-icon-check':ageValid,'el-icon-close':!ageValid}"></i>
      </div>
      <div class="wraper">
        <label>放款金额：</label> 
        <el-input :disabled='!editing' placeholder='例：500-2000' v-model='marketInfo.loanAmountDesc' @blur.once='blured'  :class='{"valid-border":loanAmountValid,"error-border":!loanAmountValid}'></el-input>
        <i :class="{'el-icon-check':loanAmountValid,'el-icon-close':!loanAmountValid}"></i>
      </div>
      <div class="wraper">
        <label>放款期限：</label> 
        <el-input :disabled='!editing' placeholder='例：7-14 （单位：天）' v-model='marketInfo.loanTimeDesc' @blur.once='blured'  :class='{"valid-border":loanTimeValid,"error-border":!loanTimeValid}'></el-input>
        <i :class="{'el-icon-check':loanTimeValid,'el-icon-close':!loanTimeValid}"></i>
      </div>
      <div class="wraper" v-if='false'>
        <label>放款利率：</label> 
        <el-input :disabled='!editing' placeholder='请输入放款利率 %' v-model='marketInfo.interestPercent' @blur.once='blured'  :class='{"valid-border":interestPercentValid,"error-border":!interestPercentValid}'></el-input>
        <i :class="{'el-icon-check':interestPercentValid,'el-icon-close':!interestPercentValid}"></i>
      </div>
      <div class="wraper" v-if='false'>
        <label>手续费利率：</label> 
        <el-input :disabled='!editing' placeholder='请输入手续费利率 %' v-model='marketInfo.servicePercent' @blur.once='blured'  :class='{"valid-border":servicePercentValid,"error-border":!servicePercentValid}'></el-input>
        <i :class="{'el-icon-check':servicePercentValid,'el-icon-close':!servicePercentValid}"></i>
      </div>

      <!-- <el-checkbox v-model="platform.jiedaibao">借贷宝</el-checkbox> -->
      <div class="wraper">
        <label>放款平台:</label> 
        <div class="container-check-box">
          <el-checkbox class='check-box' :disabled='!editing' v-model="platform.jiedaibao">借贷宝</el-checkbox>
          <el-checkbox class='check-box' :disabled='!editing' v-model="platform.jinjiedao">今借到</el-checkbox>
          <el-checkbox class='check-box' :disabled='!editing' v-model="platform.wuyoujietiao">无忧借条</el-checkbox>
          <el-checkbox class='check-box' :disabled='!editing' v-model="platform.susujie">速速借</el-checkbox>
          <el-checkbox class='check-box' :disabled='!editing' v-model="platform.other">其他</el-checkbox>
        </div>
      </div>
      <div class="wraper">
        <label>申请条件：</label>
        <!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
        <el-input type='textarea' :rows='4' placeholder='申请条件描述' v-model='marketInfo.applyConditionDesc' @blur.once='blured'  :class='{"valid-border":applyConditionDescValid,"error-border":!applyConditionDescValid}'></el-input>
        <!-- <i :class="{'el-icon-check':applyConditionDescValid,'el-icon-close':!applyConditionDescValid}"></i> -->
      </div>

      <el-button type='success' @click='submitInfo' v-if='editing' :disabled='!allValid'>提交</el-button>
    </div>
    <remind :remind='remind'></remind>
	<!-- <div>从apply_lend 进入</div>
		<div>填写姓名并申请</div>
		<div>申请后展开详细信息填写</div>
  </div> -->
</div>
</template>

<script>
import picLoad from './tmpts/uploadAvatar.vue'
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
      return {
        platform: {
          jiedaibao:'',
          jinjiedao:'',
          wuyoujietiao:'',
          susujie:'',
          other:'',
        },
        marketInfo: {
          loanWay: '',
          name: '',
          intro: '',
          tel: '', //absoluted
          age: '',
          applyConditionDesc: '',
          loanAmountDesc: '',
          loanTimeDesc: '',
          interestPercent: '', //absoluted
          servicePercent: '', //absoluted
          // name:'黄',
          // intro:'哈哈',
          // tel:'12345678901',
          // age:'11',
          // applyConditionDesc:'11',
          // loanAmountDesc:'1111',
          // loanTimeDesc:'11',
          // interestPercent:'11',
          // servicePercent:'11',
        },
        // uploadConfig:{url:'lendSupermaket/uploadLogo',data:{},resKey:'',id:'lendSupermaketAvatar'},
        uploadConfig: {
          urlGet: 'lendSupermaket/myInfo',
          urlPost: 'lendSupermaket/uploadLogo',
          data: {},
          resKey: 'logo',
          id: 'lendSupermaketAvatar',
        },
        response: null,
        loading: true,
        editing: false,
        backAfterPost: false, // watch out
        urlOwnerSubmit: 'lendSupermaket/myInfoPersonal',
        urlMyInfo: 'lendSupermaket/myInfo',
        remind: {
          isShow: false,
          remindMsg: 'remind',
          self_: this,
          remindOpts: [{
            msg: '确定',
          }, ],
        },
      }
    },
    methods: {

      edit() {
        this.editing = true
      },
      submitInfo() {
        var marketInfo = this.marketInfo
        var postBody = this.marketInfo
        postBody.applyCondition = marketInfo.applyConditionDesc
        postBody.loanAmount = marketInfo.loanAmountDesc
        postBody.loanTime = marketInfo.loanTimeDesc
        publicFun.post(this.urlMyInfo, postBody, this, () => {

        })
      },
      getInfo() {
        publicFun.get(this.urlMyInfo, this, () => {
          console.log('res my market info', this.response.body)
          var data = this.response.body.data
          this.marketInfo = data
          if (!data.name) {
            this.editing = true
          }
        })
      },
      blured($event) {
        var el = $event.target.parentElement.parentElement
        el.className += ' validate'
      },
    },
    created() {
      this.getInfo()
    },
    computed: {

      nameValid() {
        var reg = publicFun.reg.chinese
        return reg.test(this.marketInfo.name)
      },
      introValid() {
        var reg = publicFun.reg.chinese
        return reg.test(this.marketInfo.intro)
      },
      telValid() {
        var reg = /\d./
        return reg.test(this.marketInfo.tel)
      },
      ageValid() {
        var reg = /.+/
        return reg.test(this.marketInfo.age)
      },
      loanAmountValid() {
        var reg = /.+/
        return reg.test(this.marketInfo.loanAmountDesc)
      },
      loanTimeValid() {
        var reg = /.+/
        return reg.test(this.marketInfo.loanTimeDesc)
      },
      interestPercentValid() {
        var reg = /.+/
        return reg.test(this.marketInfo.interestPercent)
      },
      servicePercentValid() {
        var reg = /.+/
        return reg.test(this.marketInfo.servicePercent)
      },

      applyConditionDescValid: function() {
        var reg = /.+/;
        return reg.test(this.marketInfo.applyConditionDesc)
      },
      platformString:function(){
        var p=this.platform
        var obj= {
          jiedaibao:p.jiedaibao,
          jinjiedao:p.jinjiedao,
          wuyoujietiao:p.wuyoujietiao,
          susujie:p.susujie,
          other:p.other,
        }
        return JSON.stringify(obj)
      },
      allValid: function() {
        var t = this
        return t.nameValid &&
          t.introValid &&
          // t.telValid&&
          t.ageValid &&
          t.applyConditionDescValid &&
          t.loanAmountValid &&
          t.loanTimeValid &&
          publicFun.notAllNull(t.platform)&&
          // t.interestPercentValid&&
          // t.servicePercentValid &&
          true
      },
    },
    watch:{
      platformString:function(v){
        this.marketInfo.loanWay=v
      },
      'marketInfo.loanWay':function(v){
        this.platform=JSON.parse(v)
      }
    },
    events: {},
    components: {
      'pic-load': picLoad
    }
}
</script>

<style lang='scss' scoped>
  .container{
    padding-bottom: 0.15rem;
  } 
  #marketApplyVue{
    .container-check-box{
      padding: 0.06rem 0;
      margin-left: 25%;
      text-align: left;
      .check-box{
        position: relative;
        display: inline-block;
        width: auto;
        /*width: auto;*/
      }
    }
  }
</style>
