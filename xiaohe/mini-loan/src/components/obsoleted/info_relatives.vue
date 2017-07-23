<template>
	<div id="relativeVue" class='input' v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title">紧急联系人</h1>
		<div class="container" v-for='(item,index) in relatives'>
			<div class="wraper">
				<label>姓名：</label>
				<el-input placeholder='请输入家属全名' v-model='item.name' @blur.once='blured'  :class='{"valid-border":item.nameValid,"error-border":!item.nameValid}' @change='validatename(item)'></el-input>
				<i :class="{'el-icon-check':item.nameValid,'el-icon-close':!item.nameValid}"></i>
			</div>
			<div class="wraper">
				<label>关系：</label>
				<el-input placeholder='关系' v-model='item.relative' @blur.once='blured'   :class='{"valid-border":item.relativeValid,"error-border":!item.relativeValid}'  @change='validateRelative(item)'></el-input>
				<i :class="{'el-icon-check':item.relativeValid,'el-icon-close':!item.relativeValid}"></i>
			</div>
			<div class="wraper">
				<label>电话：</label>
				<el-input type='tel' placeholder='电话号码' v-model='item.phone' @blur.once='blured'  :class='{"valid-border":item.phoneValid,"error-border":!item.phoneValid}'  @change='validatePhone(item)'></el-input>
				<i :class="{'el-icon-check':item.phoneValid,'el-icon-close':!item.phoneValid}"></i>
			</div>
			<!-- <div class="delete"  -->
			<el-button type='danger'@click='deleteRelative(index)'>删除</el-button>
			<!-- </div> -->
		</div>
		<div id="addrelative" >
			<div id="addBtn"  @click='addrelative($event)'>
				<add-btn ></add-btn>
			</div>
		</div>
		<el-button type='success' :disabled='false' class='submit' v-if='editing' @click='submit'>提交</el-button>
		<el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button>
		<remind :remind='remind'></remind >
	</div>

</template>

<script>
	// import '../css/input.css'
	import addBtn from '../components/tmpts/add-btn.vue'
	import remind from './tmpts/remind.vue'
	import publicFun from '../js/public.js'
	export default {
		data() {
			return {
				relatives: [],
				validAll:false,
				formData: [],
				response:null,
				loading:true,
				editing:true,
				url:'userInfo/relatives',
				backAfterPost:true,
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
			
		},
		created: function() {
			this.get()
			// this.addrelative()
		},
		methods: {
			submit(){
				var postBody = {}
				var l=this.relatives.length,i
				for(i=0;i<l;i++){
					this.formData.push({})
					this.formData[i].name=this.relatives[i].name
					this.formData[i].relative=this.relatives[i].relative
					this.formData[i].phone=this.relatives[i].phone
				}
				var jsonStr=JSON.stringify(this.formData)
				console.log('formData',this.formData)
				console.log('jsonStr',jsonStr)
				postBody.data=jsonStr//.substring(1,jsonStr.length)
				console.log('postBody',postBody)

				// e.g. postBody.nickQq = this.nickQQ 
				publicFun.post(this.url,postBody,this,()=>{
					//success 
					//this.response
				})
			},
			get(){
				publicFun.get(this.url,this,()=>{
					console.log('res outer',this.response.body.data.relatives)
					var data=this.response.body.data
					console.log('data',data)
					if(data.relatives){
						this.relatives=data.relatives
					}
					// if(this.re)
				// e.g.	this.acWechat=data.acWechat
				})
			},
			edit(){
				this.editing=true
			},
			logVue(){
				console.log('vueapp',this.$data.relatives[0])
				console.log('vueapp',this.$data.relatives[0].nameValid)
			},

			validatename(it){
				var reg=/.+/
				var t=reg.test(it.name)
				it.validAll=it.nameValid&&it.relativeValid&&it.phoneValid
				it.nameValid=t
			},
			validateRelative(it){
				var reg=/.+/
				var t=reg.test(it.relative)
				it.validAll=it.nameValid&&it.relativeValid&&it.phoneValid
				it.relativeValid=t
			},
			validatePhone(it){
				var reg=/.+/
				var t=reg.test(it.phone)
				it.validAll=it.nameValid&&it.relativeValid&&it.phoneValid
				it.phoneValid=t
			},
			deleteRelative(i){
				var r
				this.relatives.splice(i,1)

			},
			addrelative($event) {
				// console.log('add')
				var self_=this
				var newRel={
					name:'',
					relative:'',
					phone:'',
					nameValid:false,
					relativeValid:false,
					phoneValid:false,
					validAll:false,
				}
				console.log('this',self_.relatives)
				self_.relatives.push(newRel)
				setTimeout(function() {
					if($event!==undefined){
						var inputs=self_.$el.getElementsByTagName('input')
						console.log('adding',$event)
						console.log('this',inputs)

						inputs[self_.relatives.length*3-3].focus()
					}
				}, 10);

			},
			blured($event) {
				var el = $event.target.parentElement.parentElement
				el.className += ' validate'
			},
			setFormData(dataKey) {
				if (this[dataKey + 'Valid']) {
					this.formData[dataKey] = this[dataKey]
				} else {
					this.formData[dataKey] = null
				}
			},
		},
		watch: {
		},
		computed: {

		},
		events: {},
		components: {
			'add-btn':addBtn,
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
	.delete{
		height: 0.44rem;
		width: 100%;
		/*background: red;*/
	}
	.container{
		border:0px solid #e2e3e4;
		/*border-bottom-width: 0.2rem*/

	}
	#addrelative{
		font-size: 0.14rem;
		padding: 0.05rem 0;
		/*background: #73e673;*/
		background: #fff;
		height: 0.8rem;
		position: relative;
		#addBtn{
			/*width: 0.6rem;*/
			/*height: 0.6rem;*/
			position: absolute;
			height: 0.6rem;
			width: 0.6rem;
			top: 0;bottom: 0;
			margin:auto 0;
			margin-left: 0.15rem;
		}
/*		#addBtn{
			width: 0.6rem;
			height: 0.6rem;
			border:1px solid #cccccc;
			position: absolute;
			margin:auto 0;
			top: 0;bottom: 0;
			margin-left: 0.15rem;
			&:after,&:before{
				content:' ';
				background:#cccccc;		
				width: 0.3rem;
				height: 0.04rem;
				position: absolute;
				top: 0;right: 0;bottom: 0;left: 0;
				margin:auto;
				border-radius: 1px;
			}
			&:before{
				width: 0.04rem;
				height: 0.3rem;
			}
		}*/

	}
</style>

<style lang='scss'>

</style>