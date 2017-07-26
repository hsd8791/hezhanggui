<template>
	<div id="contactWayVue" class="input" v-loading='loading' element-loading-text='请稍后'>
		<h1 class="title">
			<app-back></app-back>联系方式
			<span class="edit-input" v-if='!editing' @click='edit'>编辑</span>
		</h1>
		<h2 class="sub-title">个人联系方式</h2>
		<div class="container">
			<!-- <div class="wraper">
				<label :disabled='!editing'>QQ昵称：</label> 
				<el-input  :disabled='!editing' placeholder='请输入QQ昵称' v-model='nickQq' @blur.once='blured'  :class='{"valid-border":nickQqValid,"error-border":!nickQqValid}'></el-input>
				<i :class="{'el-icon-check':nickQqValid,'el-icon-close':!nickQqValid}"></i>
			</div> -->
			<div class="wraper">
				<label>QQ账号：</label> 
				<el-input :disabled='!editing' placeholder='请输入QQ账号' v-model='acQQ' @blur.once='blured'  :class='{"valid-border":acQQValid,"error-border":!acQQValid}'></el-input>
				<i :class="{'el-icon-check':acQQValid,'el-icon-close':!acQQValid}"></i>
			</div>
			<!-- <div class="wraper">
				<label>微信昵称：</label> 
				<el-input :disabled='!editing' placeholder='请输入微信昵称' v-model='nickWechat' @blur.once='blured'  :class='{"valid-border":nickWechatValid,"error-border":!nickWechatValid}'></el-input>
				<i :class="{'el-icon-check':nickWechatValid,'el-icon-close':!nickWechatValid}"></i>
			</div> -->
			<div class="wraper">
				<label>微信账号：</label> 
				<el-input :disabled='!editing' placeholder='请输入微信账号' v-model='acWechat' @blur.once='blured'  :class='{"valid-border":acWechatValid,"error-border":!acWechatValid}'></el-input>
				<i :class="{'el-icon-check':acWechatValid,'el-icon-close':!acWechatValid}"></i>
			</div>
		</div>
		<h2 class="sub-title">紧急联系人</h2>
		<div class="container" v-for='(item,index) in relatives'>
			<div class="wraper">
				<label>姓名：</label>
				<el-input :disabled='!editing' :placeholder="'请输入'+relationPlaceholders[index]+'姓名'" v-model='item.name' @blur.once='blured'  :class='{"valid-border":item.nameValid,"error-border":!item.nameValid}' @change='validatename(item)'></el-input>
				<i :class="{'el-icon-check':item.nameValid,'el-icon-close':!item.nameValid}"></i>
			</div>

			<div class="wraper ">
				<label>关系：</label>
				<el-select :disabled='!editing' v-model="item.relative" placeholder="关系"  @change='validateRelative(item)'  class=''>
				<el-option v-for="relation in relationOpts[index]" :key="relation.value" :label="relation.label" :value="relation.value"></el-option></el-select>
			</div>
			<!-- <div class="wraper">
				<label>关系：</label>
				<el-input :disabled='!editing'  placeholder='关系' v-model='item.relative' @blur.once='blured'  @change='validateRelative(item)'></el-input>
				<i :class="{'el-icon-check':item.relativeValid,'el-icon-close':!item.relativeValid}"></i>
			</div> -->


			<div class="wraper">
				<label>电话：</label>
				<el-input :disabled='!editing' type='tel' placeholder='电话号码' v-model='item.phone' @blur.once='blured'  :class='{"valid-border":item.phoneValid,"error-border":!item.phoneValid}'  @change='validatePhone(item)'></el-input>
				<i :class="{'el-icon-check':item.phoneValid,'el-icon-close':!item.phoneValid}"></i>
			</div>
			<!-- <div class="delete"  -->
			<!-- </div> -->
		</div>
		<transition>
			<el-button type='success' :disabled='!allValid' class='submit' v-if='editing' @click='submit'>提交</el-button>
			<!-- <el-button type='warning'  class='submit' v-if='!editing' @click='edit'>修改</el-button> -->
		</transition>
		<remind :remind='remind'></remind>
	</div>
</template>

<script>
// import '../css/input.css'
import publicFun from '../js/public.js'
import remind from '../components/tmpts/remind.vue'
export default {
	data() {
			return {
				directRelation: [
				{
					value: '父亲',
					label: '父亲'
				}, {
					value: '母亲',
					label: '母亲'
				}, {
					value: '兄弟姐妹',
					label: '兄弟姐妹'
				}, 
				 ],
				// relationPlaceholders: ['直系亲属', ''],
				relationPlaceholders: ['', ''],
				relatives: [{
					relative: null,
					phone: null,
					name: null
				}, {
					relative: null,
					phone: null,
					name: null
				}],
				relativesAllVailid: false,
				response: null,
				// loading:false,
				loading: true,
				editing: true,
				nickQq: '',
				acQQ: '',
				nickWechat: '',
				acWechat: '',
				url: 'userInfo/contact',
				url2: 'userInfo/relatives',
				formData: {},
				backAfterPost:true,
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
			submit() {
				var postBody = {}
				postBody.nickQq = this.nickQq
				postBody.acQq = this.acQQ
				postBody.nickWechat = this.nickWechat
				postBody.acWechat = this.acWechat
				publicFun.post(this.url, postBody, this, () => {
					console.log('post res', this.response)
					var postBody = {},
						postData = []
					var l = this.relatives.length,
						i
					for (i = 0; i < l; i++) {
						postData.push({})
						postData[i].name = this.relatives[i].name
						postData[i].relative = this.relatives[i].relative
						postData[i].phone = this.relatives[i].phone
					}
					var jsonStr = JSON.stringify(postData)
					console.log('formData', postData)
					console.log('jsonStr', jsonStr)
					postBody.data = jsonStr
					console.log('postBody', postBody)


					publicFun.post(this.url2, postBody, this, () => {

					})
				})
			},
			get() {
				publicFun.get(this.url, this, () => {
					console.log('res outer', this.response)
					var data = this.response.body.data
					if (!data) {
						return
					}
					this.nickQq = data.nickQq
					this.acQQ = data.acQq
					this.nickWechat = data.nickWechat
					this.acWechat = data.acWechat
					publicFun.get(this.url2, this, () => {
						console.log('res outer url2', this.response.body.data.relatives)
						var data = this.response.body.data
						console.log('data', data)
						if (data.relatives) {
							this.relatives = data.relatives
							var r = this.relatives,
								i
							console.log('r', r)
							for (i = 0; i < r.length; i++) {
								console.log('validtae', i)
								this.validatename(r[i])
								this.validateRelative(r[i])
								this.validatePhone(r[i])
							}

						}
					}, () => {
						console.log('res outer url2', this.response)

					})
				})
			},
			validateAllRelations() {
				var l = this.relatives.length,
					i, flag = true
				for (i = 0; i < l; i++) {
					flag = flag && this.relatives[i].validAll
					if (!flag) {
						this.relativesAllVailid = false
						return
					}
				}
				this.relativesAllVailid = true
			},
			validatename(it) {
				// console.log('validate name')
				var reg = /.+/
				var t = reg.test(it.name)
				it.nameValid = t
				it.validAll = it.nameValid && it.relativeValid && it.phoneValid
				this.validateAllRelations()
			},
			validateRelative(it) {
				var reg = /.+/
				var t = reg.test(it.relative)
				it.relativeValid = t
				it.validAll = it.nameValid && it.relativeValid && it.phoneValid
				this.validateAllRelations()
			},
			validatePhone(it) {
				var reg = /.+/
				var t = reg.test(it.phone)
				it.phoneValid = t
				it.validAll = it.nameValid && it.relativeValid && it.phoneValid
				this.validateAllRelations()
			},
			edit() {
				this.editing = true
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
			nickQq: function() {
				this.setFormData('nickQq')
			},
			acQQ: function() {
				this.setFormData('acQQ')
			},
			nickWechat: function() {
				this.setFormData('nickWechat')
			},
			acWechat: function() {
				this.setFormData('acWechat')
			},
		},
		computed: {
			relationOpts: function() {
				return [
					this.directRelation,
					this.directRelation.concat([{
						value: '亲戚',
						label: '亲戚'
					}, {
						value: '朋友',
						label: '朋友'
					}, ])
				]
			},
			nickQqValid: function() {
				var reg = /.+/;
				return reg.test(this.nickQq)
			},
			acQQValid: function() {
				var reg = /(^\d{5,11}$)|(^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$)/;
				return reg.test(this.acQQ)
			},
			nickWechatValid: function() {
				var reg = /.+/;
				return reg.test(this.nickWechat)
			},
			acWechatValid: function() {
				var reg = /[a-zA-Z\d_]{5,}/;
				return reg.test(this.acWechat)
			},

			allValid: function() {
				var t = this
				console.log('computing allValid')
					// var relationValid=true,l=this.relatives.length,i,c
					// for(i=0;i<l;i++){
					// 	c=this.relatives[i]
					// 	relationValid=relationValid&&c.phoneValid&&c.relationValid&&c.nameValid
					// }
					// var validR=this.relatives[0].validAll&&this.relatives[1].validAll
					//  t.nickQqValid && t.nickWechatValid &&
				return t.relativesAllVailid && t.acQQValid &&  t.acWechatValid && true //&&

			},
		},
		created() {
			this.get()
			this.relatives[0].value='父亲'
		},
		events: {},
		components: {
			remind: remind,
		}
}
</script>

<style lang='scss' scoped>

</style>
