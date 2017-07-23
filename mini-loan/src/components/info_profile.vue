<template>
	<div id="profileVue" class='input' v-loading='loading' element-loading-text='请稍后'>
			<h1 class="title">
				<app-back></app-back>个人信息
				<span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
			</h1>
		<div class="container">
			<div class="wraper">
				<label>学历：</label>
				<el-select :disabled='!editing' v-model="education" placeholder="请选择">
				<el-option v-for="item in options.education" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
			</div>
			<div class="wraper">
				<label>婚姻状况：</label>
				<el-select :disabled='!editing' v-model="marriage" placeholder="请选择">
				<el-option v-for="item in options.marriage" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
			</div>
			<div class="wraper">
				<label>子女情况：</label>
				<el-select :disabled='!editing' v-model="kids" placeholder="请选择">
				<el-option v-for="item in options.kids" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
			</div>
		</div>

		<div class="container">
			<h2 class="sub-title title">现居地</h2>
			<div class=" residence">
				<div class="wraper ">
					<label>省/直辖市：</label>
					<el-select :disabled='!editing' v-model="province" placeholder="省/直辖市" @change='provinceChange' class='province'>
					<el-option v-for="item in options.province" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
				</div>
				<div class="wraper ">
					<label>市/直辖市：</label>
					<el-select :disabled='!editing' v-model="city" placeholder="地级市" @change='cityChange' class='city'>
					<el-option v-for="item in options.city" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
				</div>

				<div class="wraper ">
					<label>市/区:</label>
					<el-select :disabled='!editing' v-model="district" placeholder="县级市/区" class='district'>
					<el-option v-for="item in options.district" :key="item.value" :label="item.label" :value="item.value"></el-option></el-select>
				</div>

				<div class="wraper">
					<label>详细地址</label>
					<el-input :disabled='!editing' placeholder='详细地址' v-model='addDetail' @blur.once='blured'  :class='{"valid-border":addDetailValid,"error-border":!addDetailValid}'></el-input>
					<i :class="{'el-icon-check':addDetailValid,'el-icon-close':!addDetailValid}"></i>
				</div>
			</div>
		</div>
		<el-button type='success' :disabled='!allValid' class='submit' v-if='editing' @click='submit'>提交</el-button>
		<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
	// import '../css/input.css'
	import remind from './tmpts/remind.vue'
	import publicFun from './../js/public.js'
	export default {
		data() {
			return {
				education:'',
				marriage:'',
				kids:'',
				// residence:'',
				addDetail:'',
				province:'',
				city:'',
				district:'',
				street:'',
				districtSearch:null,
				formData:{
					education:'',
				},
				response:null,
				loading:true,
				editing:false,
				url1:'userInfo/personal',
				url2:'userInfo/address',
				isShow2:false,
				backAfterPost:true,
				remind:{
					isShow:false,
					remindMsg:'remind',
					self_:this,
					remindOpts:[
					{msg:'确定',},
					],
				},
				options:{
					education:[
					{value:'初中及以下',},
					{value:'高中或中专',},
					{value:'大专',},
					{value:'本科',},
					{value:'研究生及以上',},
					],
					marriage:[
					{value:'未婚',},
					{value:'已婚',},
					{value:'离异',},
					{value:'丧偶',},
					],
					kids:[
					{value:'无',},
					{value:'1个',},
					{value:'2个',},
					{value:'3个及以上',},
					],
					province:[],
					city:[],
					district:[],
					street:[],
				},
			}
		},
		methods: {
			nameOfAdcode(opts,adcode){
				var l=opts.length,i
				for(i=0;i<l;i++){
					if(opts[i].value==adcode){
						return opts[i].label
					}
				}
			},
			submit(){
				var postBody = {}
				postBody.education=this.education
				postBody.marriage=this.marriage
				postBody.kids=this.kids
				// e.g. postBody.nickQq = this.nickQQ 
				publicFun.post(this.url1,postBody,this,()=>{
					var postBody2 = {}
					postBody2.province=this.province	
					postBody2.city=this.city	
					postBody2.fullAddress=this.addDetail	
					postBody2.region=this.district	
					postBody2.CompleteAddress=this.residence				
					publicFun.post(this.url2,postBody2,this,()=>{
						console.log('url2',this.response2)
					})
				})
				
			},
			get(){
				publicFun.get(this.url1,this,()=>{
					console.log('res outer',this.response)
					var data=this.response.body.data
					if(!data){
						return
					}
					this.education=data.education
					this.marriage=data.marriage
					this.kids=data.kids
				})
				publicFun.get(this.url2,this,()=>{
					console.log('res outer 2',this.response.body)
					var data=this.response.body.data
					if(!data){
						return
					}
					if(!data){
						return
					}
					this.province=data.province //provinceChange 会将以下的赋值清空
					this.city=data.city
					this.addDetail=data.fullAddress
					this.district=data.region
				})
			},
			edit(){
				this.editing=true
			},
			provinceChange(){
				var self_=this
				self_.city=''
				self_.district=''
				self_.options.district=[]
				self_.street=''
				self_.options.street=[]
				// console.log('province',this.province)
				self_.districtSearch.search(self_.province,function(status,result){
					var searchRslt=result.districtList[0].districtList
					// console.log('city',searchRslt)
					self_.options.city=[]
					var len=searchRslt.length,i
					for(i=0;i<len;i++){
						self_.options.city.push({label:searchRslt[i].name,value:searchRslt[i].adcode,})
					}
					if(self_.response.body.data){
						self_.city=self_.response.body.data.city
						self_.response.body.data.city=''
					}
				})
			},
			cityChange(){
				var self_=this
				self_.district=''
				self_.street=''
				self_.options.street=[]
				// console.log('province',this.province)
				self_.districtSearch.search(self_.city,function(status,result){
					var searchRslt=result.districtList[0].districtList
					// console.log('city',searchRslt)
					self_.options.district=[]
					var len=searchRslt.length,i
					for(i=0;i<len;i++){
						self_.options.district.push({label:searchRslt[i].name,value:searchRslt[i].adcode,})
					}
					if(self_.response.body.data){
						self_.district=self_.response.body.data.region
						self_.response.body.data.region=''
					}
				})
			},
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
		},
		created:function(){
			var self_=this
			var mapScript=document.createElement('script')
			var mapSrc='http://webapi.amap.com/maps?v=1.3&key=88803f8a6ef6758ba4e2ba70b425e43c'
			mapScript.src=mapSrc
			document.body.appendChild(mapScript)
			mapScript.onload=function(){
				console.log('amap loaded')
				AMap.service('AMap.DistrictSearch',function(){
					self_.districtSearch = new AMap.DistrictSearch({
						level : 'country',  
						subdistrict : 3    
					});
					self_.districtSearch.search('中国',function(status,result){
						var searchRslt=result.districtList[0].districtList
						self_.options.province=[]
						var len=searchRslt.length,i
						for(i=0;i<len;i++){
							self_.options.province.push({label:searchRslt[i].name,value:searchRslt[i].adcode,})
						}
						self_.get()
					})
				})
			}

		},
		watch:{
			// education:function(){
			// 	this.setFormData('education')
			// },
			// marriage:function(){
			// 	this.setFormData('marriage')
			// },
			// kids:function(){
			// 	this.setFormData('kids')
			// },
			// education:function(){
			// 	this.setFormData('education')
			// },
			// residence:function(){
			// 	var t=this
			// 	if(t.provinceValid&&t.cityValid&&t.districtValid&&t.addDetailValid){
			// 		t.formData.residence=t.residence
			// 	}else{
			// 		t.formData.residence=null
			// 	}
			// }
		},
		computed:{
			residence:function(){
				var t=this,index
				var province=t.nameOfAdcode(t.options.province,this.province)||''
				var city=t.nameOfAdcode(t.options.city,this.city)||''
				if(city.match('市辖区')){
					city='市辖区'
				}
				var district=t.nameOfAdcode(t.options.district,this.district)||''
				var addDetail=this.addDetail||''
				var s=province+' '+city+' '+district+' '+addDetail
				return s
			},
			educationValid:function(){
				var reg=/.+/;
				return reg.test(this.education)
			},
			marriageValid:function(){
				var reg=/.+/;
				return reg.test(this.marriage)
			},
			kidsValid:function(){
				var reg=/.+/;
				return reg.test(this.kids)
			},
			addDetailValid:function(){
				var reg=/.+/;
				return reg.test(this.addDetail)
			},
			provinceValid:function(){
				var reg=/.+/;
				return reg.test(this.province)
			},
			cityValid:function(){
				var reg=/.+/;
				return reg.test(this.city)
			},
			districtValid:function(){
				var reg=/.+/;
				return reg.test(this.district)
			},

			allValid:function(){
				var t=this
				return t.educationValid&&t.marriageValid&&t.kidsValid&&t.cityValid&&t.districtValid&&t.addDetailValid
			},
		},
		events: {},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
	*{
		/*border:1px solid red;*/
	}
	#profileVue{
		.el-input__icon+.el-input__inner{
			padding-right:0;
		}

		.residence{
			/*display: flex;*/
			/*width: 75%;*/
			/*margin-left: 25%;*/
			.el-select{
				/*margin:0;*/

			}
			.province{
				/*margin-left:25%;*/
			}
			.city{

			}
			.district{

			}
		}
	}
</style>
<style type="text/css" lang='scss'>
	#profileVue{
		.el-input__inner{
			padding-right: 0;
		}
	}

</style>