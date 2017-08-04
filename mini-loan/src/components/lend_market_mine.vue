<template>
	<div id="marketApplyVue">
    <div class="input">
      <h1 class="title">
        <app-back></app-back>
        贷款超市信息
        <span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
      </h1>

         
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
        <div class="wraper">
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
          <el-input :disabled='!editing' placeholder='例：500-2000' v-model='marketInfo.loanAmount' @blur.once='blured'  :class='{"valid-border":loanAmountValid,"error-border":!loanAmountValid}'></el-input>
          <i :class="{'el-icon-check':loanAmountValid,'el-icon-close':!loanAmountValid}"></i>
        </div>
        <div class="wraper">
          <label>放款期限：</label> 
          <el-input :disabled='!editing' placeholder='例：7-14 （单位：天）' v-model='marketInfo.loanTime' @blur.once='blured'  :class='{"valid-border":loanTimeValid,"error-border":!loanTimeValid}'></el-input>
          <i :class="{'el-icon-check':loanTimeValid,'el-icon-close':!loanTimeValid}"></i>
        </div>
        <div class="wraper">
          <label>放款利率：</label> 
          <el-input :disabled='!editing' placeholder='请输入放款利率 %' v-model='marketInfo.interestPercent' @blur.once='blured'  :class='{"valid-border":interestPercentValid,"error-border":!interestPercentValid}'></el-input>
          <i :class="{'el-icon-check':interestPercentValid,'el-icon-close':!interestPercentValid}"></i>
        </div>
        <div class="wraper">
          <label>手续费利率：</label> 
          <el-input :disabled='!editing' placeholder='请输入手续费利率 %' v-model='marketInfo.servicePercent' @blur.once='blured'  :class='{"valid-border":servicePercentValid,"error-border":!servicePercentValid}'></el-input>
          <i :class="{'el-icon-check':servicePercentValid,'el-icon-close':!servicePercentValid}"></i>
        </div>
        <div class="wraper">
          <label>申请条件：</label>
          <!-- :class="{'valid':idCardNumValid,'error':!idCardNumValid}" -->
          <el-input type='textarea' :rows='4' placeholder='申请条件描述' v-model='marketInfo.applyCondition' @blur.once='blured'  :class='{"valid-border":applyConditionValid,"error-border":!applyConditionValid}'></el-input>
          <!-- <i :class="{'el-icon-check':applyConditionValid,'el-icon-close':!applyConditionValid}"></i> -->
        </div>

        <el-button type='success' @click='submitInfo' v-if='editing' :disabled='!allValid'>提交</el-button>
      </div>
    </div>
    <remind :remind='remind'></remind>
	<!-- <div>从apply_lend 进入</div>
		<div>填写姓名并申请</div>
		<div>申请后展开详细信息填写</div>
  </div> -->
	</div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      marketInfo:{
        // name:'',
        // intro:'',
        // tel:'',
        // age:'',
        // applyCondition:'',
        // loanAmount:'',
        // loanTime:'',
        // interestPercent:'',
        // servicePercent:'',
        name:'黄',
        intro:'哈哈',
        tel:'12345678901',
        age:'11',
        applyCondition:'11',
        loanAmount:'1111',
        loanTime:'11',
        interestPercent:'11',
        servicePercent:'11',
      },
      response:null,
      loading:true,
      editing:false,
      backAfterPost:false,// watch out
      urlOwnerSubmit:'lendSupermaket/myInfoPersonal',
      urlMyInfo:'lendSupermaket/myInfo',
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

    edit() {
      this.editing = true
    },
    submitInfo(){
      // var postBody={
      //   name:this.name,
      //   intro:this.intro,
      //   tel:this.tel,
      //   age:this.age,
      //   applyCondition:this.applyCondition,
      //   loanAmount:this.loanAmount,
      //   loanTime:this.loanTime,
      //   interestPercent:this.interestPercent,
      //   servicePercent:this.servicePercent,
      // }
      var postBody=this.marketInfo
      publicFun.post(this.urlMyInfo,postBody,this,()=>{

      })
    },
    getInfo(){
      publicFun.get(this.urlMyInfo,this,()=>{
        console.log('res my market info',this.response.body)
        var data=this.response.body.data
        if(!data.name){
          this.editing=true
        }
      })
    },
    blured($event) {
      var el = $event.target.parentElement.parentElement
      el.className += ' validate'
    },
  },
  created(){
    this.getInfo()
  },
  computed:{
    
    nameValid(){
      var reg=publicFun.reg.chinese
      return reg.test(this.marketInfo.name)
    },
    introValid(){
      var reg=publicFun.reg.chinese
      return reg.test(this.marketInfo.intro)
    },
    telValid(){
      var reg=/\d./
      return reg.test(this.marketInfo.tel)
    },
    ageValid(){
      var reg=/.+/
      return reg.test(this.marketInfo.age)
    },
    loanAmountValid(){
      var reg=/.+/
      return reg.test(this.marketInfo.loanAmount)
    },
    loanTimeValid(){
      var reg=/.+/
      return reg.test(this.marketInfo.loanTime)
    },
    interestPercentValid(){
      var reg=/.+/
      return reg.test(this.marketInfo.interestPercent)
    },
    servicePercentValid(){
      var reg=/.+/
      return reg.test(this.marketInfo.servicePercent)
    },

    applyConditionValid:function(){
      var reg=/.+/;
      return reg.test(this.marketInfo.applyCondition)
    },
    allValid:function(){
      var t=this
      return t.nameValid&&t.introValid&&t.telValid&&t.ageValid&&t.applyConditionValid&&t.loanAmountValid&&t.loanTimeValid&&t.interestPercentValid&&t.servicePercentValid && true
    },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.container{
  padding-bottom: 0.15rem;
}
	
</style>
