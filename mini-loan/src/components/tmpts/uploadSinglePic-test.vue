<template>
	<div class="input-file-box input" >
		<!-- <div></div> -->
		<!-- accept只能过滤上传类型，限定需使用JS的正则表达式 -->
		<form action="http://hzg.he577.com/userInfo/addAccessory" enctype="multipart/form-data" method="post"> 

			<input type="file" name='imgFile' id='pic' @change='changeP($event)' accept="*/*" >
			<label for="pic">pic </label>
			<div class='delete' @click.prevent='deleteP($event)'>delete</div>
			<img class="img" :src="urlF">
			<span class='file-name'>{{fileName}}</span>
			<input type="text" name='type' value="0">
			<input type="submit" name=''  class="submit">
		</form>
		<el-button type='success'  v-if='editing' @click='submit'>提交</el-button>
		<el-button type='warning'  v-if='!editing' @click='edit'>修改</el-button>
		<remind :remind='remind'></remind>
	</div>

</template>

<script>
	import bus from '../../bus.js'
	// import '../../css/input.css'
	import remind from './remind.vue'
	import publicFun from '../../js/public.js'

	export default {
		data() {
			return {
				fileImg:null,
				editing: true,
				loading: false,
				loadingText: 'loading',
				fileName: '',
				urlF: '',
				remind: {
					isShow: false,
					remindMsg: 'remind',
					self_: this,
					remindOpts: [{
						msg: '确定',
					}, ],
				},
				testdata:null,
				input:null,
			}
		},
		methods: {
			submit() {
				// var urlF = this.getFileUrl(input)
				console.log('fileImg',this.fileImg)

				this.loading = true //this
				var url = 'http://hzg.he577.com/userInfo/addAccessory' 
				// var url = 'http://localhost:1337/upload' 
				// var xhr = new XMLHttpRequest()
				var formData = new FormData();
				formData.append("imgFile", this.input.files[0]);
				formData.append("type", '0');
				// xhr.open('POST',url)
				// xhr.setRequestHeader("Cookie", document.cookie);
				// xhr.onreadystatechange=function(){
				// 	console.log('readyState',xhr.readyState)
				// 	console.log('status',xhr.status	)
				// 	console.log('xhr.responseText',xhr.responseText)
				// }
				// xhr.send(formData)

				console.log('formData',formData.entries())
				for (var key of formData.entries()) {
					console.log(key[0] + ', ' + key[1]);
				}

				this.$http.post(url, formData).then(res => {
					// this.loading = false
					// this.remind.remindMsg = '提交成功'
					// this.remind.isShow = true
					// this.editing = false
					console.log('res', res.body)
				}, err => {
					this.loading = false
					this.remind.remindMsg = '连接失败'
					this.remind.isShow = true
				})
			},
			edit() {},
			changeP: function($event) {
				var input = $event.target
				console.log('input',input)
				this.input=input
				var urlF = this.getFileUrl(input)
				this.fileImg=urlF
				var outer = input.parentElement
					// var img=outer.getElementsByTagName('img')[0]
					// var name=outer.getElementsByTagName('span')[0]
					// console.log('url',urlF)
					console.log('changed', input.files[0].name)
					// console.log('img',img)
					this.fileName = input.files[0].name
					this.urlF = urlF
					outer.removeChild(input)
					setTimeout(function() {
						outer.appendChild(input)
					}, 10);
				},
				deleteP: function($event) {
				// console.log('delete',$event.target.parentElement.parentElement)
				var outer = $event.target.parentElement
				var input = outer.getElementsByTagName('input')[0]
					// var img=outer.getElementsByTagName('img')[0]
					// console.log('input',input)
					// console.log('input',input.files[0].name)
					input.value = ''
					this.urlF = ''
					this.fileName = ''

				},
			getFileUrl: function(input) { //缩略图
				var urlF;
				if (navigator.userAgent.indexOf("MSIE") >= 1) {
					urlF = input.value;
				} else if (navigator.userAgent.indexOf("Firefox") > 0) {
					urlF = window.URL.createObjectURL(input.files.item(0));
				} else if (navigator.userAgent.indexOf("Chrome") > 0) {
					urlF = window.URL.createObjectURL(input.files.item(0))
				} else {
					urlF = window.URL.createObjectURL(input.files.item(0))
				}
				return urlF;
			}
		},
		created:function(){
			this.testdata=new FormData()
			this.testdata.append('testkey','testvalue')
			console.log('testdata',this.testdata)
		},
		events: {},
		components: {
			remind:remind,
		}
	}
</script>

<style lang='scss' scoped>
	form{
		position: relative;
		border:1px solid cyan;
	}
	
	$outerHeight:0.5rem;
	$outerWidth:80%;
	*{
		/*border:1px solid red;*/
	}
	input,label{
		-webkit-tap-highlight-color:transparent;
	}
	input{
		height: $outerHeight;
		line-height: 1;
		width: 100%;
		position: absolute;
		top: 0;
		opacity: 0.1;
	}
	label{
		width: 100%;
		/*margin: 0 auto;*/
		display: block;
		height: $outerHeight;
		font-size: 0.24rem;
		line-height: $outerHeight;
		
	}
	.delete{
		width: 1rem;
		height: 0.25rem;
		font-size: 0.16rem;
		line-height: 0.25rem;
		position: absolute;
		top: 0;
	}
	.input-file-box{
		width: $outerWidth;
		position: relative;
		margin: 0 auto;
		overflow: hidden;
		/*height: $outerHeight;*/
		.file-name{
			height: 0.16rem;
			font-size: 0.16rem;
			line-height: 1;
		}
		.submit{
			position: relative;
			background: red;
			opacity: 1;
			height: 2rem;
			width: 1rem;
			position: absolute;
			bottom: -1rem;
		}
		.img{
			/*width: 100%;*/
			width: 1rem;
		}
	}
</style>
