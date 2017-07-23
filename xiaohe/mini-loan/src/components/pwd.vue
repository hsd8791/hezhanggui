<template>
	<div id="pwdVue" class="input"> 
		<h1 class="title"><app-back></app-back>密码设置</h1>
		<div class="container" v-loading='loading' element-loading-text='请稍后'>
			<div class="wraper">
				<label>密码：</label>
				<el-input placeholder='至少包含数字和字母 8位以上' v-model='pwd' @blur.once='blured'  :class='{"valid-border":pwdValid,"error-border":!pwdValid}' ></el-input>
				<i :class="{'el-icon-check':pwdValid,'el-icon-close':!pwdValid}"></i>
			</div>
		</div>
		<el-button type='success' :disabled='!pwdValid' class='submit' @click='setPwd'>提交</el-button>
<!-- 		<div class="cover" v-if='remind'>
			<div class="remind">
				<div class="remind-msg">{{remindMsg}}</div>
				<div class="ctrl-box">
					<div class="ctrl-btn" v-for='item in remindOpts' @click='item.method(self_)'>{{item.msg}}
					</div>
				</div>
			</div>
		</div> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	// import urlConcat from '../js/urlConcat.js'
	import publicFun from '../js/public.js'
	import remind from './tmpts/remind.vue'
	import Bus from '../bus.js'
	export default {
		data() {
			return {
				pwd:'',
				loading:false,
				enterFrom:null,
				backStep:'/index',
				remind:{
					isShow:false,
					remindMsg:'设置成功',
					self_:this,
					remindOpts:[
					{msg:'确定',callback:()=>{
						// publicFun.goPage(this.backStep)
					}},
					
					],
				}
				,
				formData:{

				}
			}
		},
		//	一个
		methods: {
			blured($event){
				var el=$event.target.parentElement.parentElement
				el.className+=' validate'
			},
			setFormData(dataKey){
				if(this[dataKey+'Valid']){
					this.formData[dataKey]=this[dataKey]
				}else{
					this.formData[dataKey]=null
				}
			},
			setPwd(){
				this.loading=true				
				var url = publicFun.urlConcat('account/setPwd',{password:this.pwd})
				console.log('url',url)
				// var var url='http://192.168.1.58:8080/account/loginByPwd?phone='+this.cellphone+'?='
				this.$http.get(url).then(response => {
					this.loading=false

					// console.log('response',response.body)
					var res=response.body
					if(res.error){
						console.log('res',res,res.msg)
					}else{
						this.remind.remindMsg='设置成功'
						console.log('set success')
						this.remind.isShow=true
						this.remind.remindOpts=[{msg:'确定',callback:()=>{
							var r = location.hash.replace("#", '')
							var arr = r.split('/')
							console.log('arr',arr)
							publicFun.goPage('/'+arr[1])
						}}]
						// setTimeout(() =>{
							
						// }, 800);
						publicFun.wechatAuth(this)

					}
					// console.log('response.body',response.body)
					// var step
					// switch(this.enterFrom){
					// 	case 'mine': this.backStep= -1;break
					// 	case 'login': this.backStep= -2;break
					// 	default: break;
					// 	// case 'mine': this.backStep= -1;break
					// }
					// publicFun.goPage(step)
					
				}, response => {
					console.log('err',response)
				});
			}
		},
		watch:{
			pwd:function(val){
				this.setFormData('pwd')
			},
		},
		created:function(){
			// Bus.$on('close_remind',function(){})
		},
		// beforeRouteEnter(to,from,next){
		// 	console.log('from',from)
		// 	console.log('to',to)
		// 	console.log('enter from',from.name)
		// 	next(vm=>{
		// 		vm.enterFrom=from.name
		// 	})
		// },
		computed:{
			pwdValid:function(){
				var reg=/^.{8,}$/;
				return reg.test(this.pwd)
			},
			allValid:function(){
				var t=this
				return t.idCardNumValid&&true//&&
			},
		},
		events: {},
		components: {
			remind:remind
		}
	}
</script>


<style lang='scss' scoped>	
	#pwdVue{
		
	}
	.cover{
		position: fixed;
		background: rgba(0,0,0,0.6);
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 2;
		.remind{
			height: 1.05rem;
			width: 2.7rem;
			background: #f8f8f8;
			position: absolute;
			left: 0;right: 0;
			top: 0;bottom: 0;
			margin:auto;
			border-radius: 0.15rem;
			.remind-msg{
				width: 100%;
				height: 0.64rem;
				line-height: 0.64rem;
				font-size: 0.18rem;	
				color:#010101;
				border: 0px solid #d2d2d2;
				border-bottom-width: 1px;
			}
			.ctrl-box{
				display: flex;
				.ctrl-btn{
					width: 100%;
					height: 0.4rem;
					line-height: 0.4rem;
					font-size: 0.18rem;
					border: 0px solid #d2d2d2 ;
					border-right-width: 1px;
					color:#0081ff;
				}
				.ctrl-btn:last-child{
					border-width: 0px;
				}
			}
		}
	}

</style>
