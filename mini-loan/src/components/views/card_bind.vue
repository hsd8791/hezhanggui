<template>
	<div id="cardBindView">
		<div class="input" v-loading='loading' element-loading-text='请稍后'>
			<div class="container">
				<div class="wraper">
          <label class="label" :disabled='!editing'>姓名：</label> 
          <el-input :disabled='true'   placeholder='' v-model='name' @blur.once='blured'  :class='{"valid-border":nameValid,"error-border":!nameValid}'></el-input>
          <i class="icon-warning" @click='nameRemind'></i>
        </div>
  			<div class="wraper">
  				<label class="label" :disabled='!editing'>银行卡：</label> 
  				<el-input :disabled='false'  type='number' placeholder='仅支持储蓄卡' v-model='bankcard' @blur.once='blured'  :class='{"valid-border":bankcardValid,"error-border":!bankcardValid}'></el-input>
  				<!-- <i :class="{'el-icon-check':bankcardValid,'el-icon-close':!bankcardValid}"></i> -->
  			</div>
			</div>
      <div class="card-remind">
        <p>支持以下银行储蓄卡：工商银行、农业银行、中国银行、建设银行、储蓄银行、广发银行、光大银行、中信银行、兴业银行、交通银行、浦发银行、平安银行、民生银行、华夏银行、招商银行</p>
      </div>
			<el-button type='success' :disabled='!bankcardValid' class='submit'  @click='submit'>提交</el-button>
		</div>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../../js/public.js'
export default {
  data() {
    return {
    	bankcard:'',
      name:'',
      nameValid:true,
   		response:null,
   		loading:false,
   		editing:true,
   		backAfterPost:false,// watch out
   		url:'unspay/bind?bankCardNo=',
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
  props:{
    callback:{
      default:()=>{

      }
    }
  },
  methods:{
  	submit(){
  		publicFun.get(this.url+this.bankcard,this,()=>{
  			let r=this.remind
  			r.remindMsg='绑定成功'
  			r.remindOpts=[{msg:'确定',callback:()=>{
          this.callback()
        }}]
  			r.isShow=true
  		})
  	},
    nameRemind(){
      let r=this.remind
      r.remindMsg='只能绑定本人的卡号用于支付和接受放款，如姓名有误请到认证信息中修改。'
      r.remindOpts=[{msg:'我知道了'}]
      r.isShow=true
    },
    getName(){
      publicFun.get('userInfo/identity',this,()=>{
        this.name=this.response.body.data.name
        console.log('res name and ..',this.response.body)
      })
    },
  	blured($event){
  		var el=$event.target.parentElement.parentElement
  		el.className+=' validate'
  	},
  },
  events: {},
  created(){
    this.getName()
  	publicFun.checkSession(this)
  },
  computed:{
  	bankcardValid:function(){
  		var reg=/\d/;
  		return reg.test(this.bankcard)
  	},
  },
  components: {}
}
</script>

<style lang='scss' scoped>
#cardBindView{

  .icon-warning{
    color:#09bb07;
    opacity: 1; 
  }
  .card-remind{
    padding:0.1rem 0.2rem;
    font-size: 0.14rem;
    text-align: left;
    line-height: 1.4;
  }
}
</style>
