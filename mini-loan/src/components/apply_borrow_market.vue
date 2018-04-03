<template>
	<div id="applyBorrowMarketVue">
		<div class="input">
			<h1 class="title" v-loading='loading' element-loading-text='请稍后'>
				<app-back :query='true'></app-back>
				申请借款
			</h1>
			   <app-record :canClick=false class='market-container' v-if='marketInfo'>
			   <div class="avator-pic" :style="{backgroundImage: 'url('+marketInfo.logo+')'}" slot='avator'></div>
			   <span slot='lt' style="letter-spacing: -0.01rem;">
			     {{marketInfo.name}}
			   </span>
			   <span slot='rd'>
			     <!-- <span class="required-info-box">
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
			     </span> -->
			   </span>
			   <span slot='ld'>{{marketInfo.loanAmountDesc}}元</span>
			   <span slot='rt'>申请数：{{marketInfo.viewNum}}</span>
				 </app-record>
			<div class="container phone-lender">
				<div class="wraper">
					<label>借款金额：</label> 
					<el-input  type='number' :placeholder='amountHolder' v-model='amount' @blur.once='blured'  :class='{"valid-border":amountValid,"error-border":!amountValid}'></el-input>
					<i :class="{'el-icon-check':amountValid,'el-icon-close':!amountValid}"></i>
				</div>
			</div>
			<el-button type='success' class="confirm" @click='apllyBorrow' :disabled='!(allValid&&canApply)&&false'>{{submitText}}</el-button>

		</div>

		<fill-status-essential></fill-status-essential>

		<remind :remind=remind></remind>
	</div>
</template>

<script>
//如果从market detail 进入 不需要重新请求，如果直接点开进入，需要重新请求market数据
//applyRecord:{},// 需判定、
//判断状态，发起申请
//判断24小时内是否有申请
import bus from '../bus.js'
import publicFun from '../js/public.js'
export default {
  data() {
    return {

    	amountHolder:'填写申请金额，选填',
    	amount:'',
    	applyRecord:null,// 需判定、
    	marketInfo:{},
    	response:null,
    	loading:false,
    	editing:true,
    	backAfterPost:false,// watch out
    	urls:{
    		applyRecord:'lendApply/borrowLoanRecords',
    		apply:'lendApply/lendApply',
    		market:'lendSupermaket/supermaketInfo',
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
  computed:{
		submitText() {
			let a=this.applyRecord
			if(!a){
				return '点击申请'
			}
			if(a.status===0||a.status===1){
				return '再次申请'
			}
			if(a.status===2){
				return '重新申请'
			}
			return '点击申请'
		},
  	amountValid: function() {
  		var reg = /^[1-9][0-9]*$/
  		return reg.test(this.amount)||this.amount==''
  	},
  	allValid:function(){
  		let t=this
  		// return true
  		return t.fillStatusCfg.allFilled
  	},
  	canApply(){
  		let t=this,a=this.applyRecord
  		if(!a){
  			return true
  		}else{
  			if(a.status===0){
  				if(t.longApplied){
  					return true
  				}else{
  					return false
  				}
  			}
  			if(a.status===4){
  				return false
  			}
  			if(a.status===3||a.status===2||a.status===1){
  				return true
  			}
  		}
  	},
  	fillStatusCfg(){
  		return bus.fillStatusCfg
  	},
  	longApplied(){
  	  let a=this.applyRecord
  	  if(a){
  	    return a.status===0&&publicFun.longApplied(a.creat_time)
  	  }else{
  	    return false
  	  }
  	},
  },
  created(){
  	this.marketInfo=bus.marketDetailViewing
  	if(!this.marketInfo){
	  	if (/market_/.test(this.$route.path)) {
	  		this.getMarketInfo()
	  	}
  	}else{
  		this.getApplyRecord()
  	}
  },
  methods:{
    getMarketInfo() {
      var array = this.$route.path.split('/'),
        id = array[array.length - 2].split('_')[1]
      var url = publicFun.urlConcat(this.urls.market, {
        id: id
      })
      publicFun.get(url, this, () => {
        console.log('market detail', this.response.body)
        this.marketInfo = this.response.body.data
        this.getApplyRecord()
      })
    },
    getApplyRecord() {
      var url = publicFun.urlConcat(this.urls.applyRecord, {
        lendingUid: this.marketInfo.uid,
        limit: 1,
      })
      publicFun.get(url, this, () => {
        this.applyRecord = this.response.body.data.data[0] || null
      })
    },
    goToMultiSelection(){
      // console.log('')
      const url=publicFun.urlConcat('/market_list',{
        multipleSelecting:1
      })
      publicFun.goPage(url)
      console.log('%c go to multiple apply','color:red',)
    },
    submitOnSuccess() {
      var r = this.remind
      r.remindMsg = '提交成功'
      r.remindMsgDscrp = '您还有未领取的额度，是否多选申请领取'
      r.remindOpts = [{
        msg: '确定',
        callback: () => {
          r.remindMsgDscrp=null
          this.goToMultiSelection()
        }
      }, {
        msg: '取消',
        callback() {
          publicFun.goPage(this.$route.path + '/lend_market_applied_remind')
        },
      }]
      r.isShow=true
    },

  	apllyBorrow() {
  		var r=this.remind
  		if (!this.fillStatusCfg.allFilled&&!bus.relativeUrlTest) {
  			r.remindMsg='必填认证信息不完整'
  			r.remindMsgDscrp='请检查必填认证信息项是否已填写'
  			r.remindOpts=[{
  				msg:'确定',
  				callback:()=>{
  					publicFun.goPage('/index')
  					r.remindMsgDscrp=null
  				}
  			}]
  			r.isShow=true
  			return
  		}
  		r.remindMsg = '请确认是否提交'
  		r.remindOpts = [{
  			msg: '确定',
  			callback: () => {
					var postBody = {}
  				if(this.marketInfo.phone){
  					postBody.phone=this.marketInfo.phone
  				}else{
  					postBody.phone=this.phoneLender
  				}
  				if(this.amount){
  					postBody.amount=this.amount*100
  				}
  				var urlApply = publicFun.urlConcat(this.urls.apply, postBody)
  				publicFun.post(urlApply, {}, this, () => {
            // console.log('this.response.body.error',this.response.body.error)
            if(this.response.body.error==0){
              // console.log('%c go multiple apply','color:red',)
              bus.cannotApplyMarket[this.marketInfo.uid]=0
              this.submitOnSuccess()
              return
            }else{
              // this.submitOnSuccess()
            }
  					
  				}, () => {})
  			}
  		}, {
  			msg: '取消',
  		}, ]
  		r.isShow = true

  	},
  	blured($event) {
  		var el = $event.target.parentElement.parentElement
  		el.className += ' validate'
  	},
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.market-container{
  width: 100%;
}
</style>

