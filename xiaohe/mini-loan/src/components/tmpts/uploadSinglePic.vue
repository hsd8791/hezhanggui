<template>
	<div class="input-file-box" >
		<!-- <div></div> -->
		<!-- accept只能过滤上传类型，限定需使用JS的正则表达式 -->
		<!-- <form action="http://hzg.he577.com/userInfo/addAccessory" enctype="multipart/form-data" method="post">  -->
		<div class="container input" v-loading='loading' :element-loading-text='loadingText'>
			
			<input type="file" name='imgFile' :id='uploadConfig.id' @change='changeP($event)' accept="image/*" >
			<div class="thumb"  v-if='urlF' @click.prevent='' :style="{backgroundImage: 'url('+urlF+')'}">
				
				<!-- <img class="img" :src="urlF" v-if='urlF'> -->
			</div>
			<div class="img-ctrl" >
				<el-button  class='img-ctrl-btn' type='success' v-if='!editing' @click='test'>重新上传</el-button>
				<el-button class='img-ctrl-btn' :disabled='!urlF||!editing' type='warning' @click.prevent='deleteP($event)' v-if='editing'>删除</el-button>
				<p></p>
				<el-button class='img-ctrl-btn' :disabled='!urlF||!editing' type='success' @click.prevent='submit($event)' v-if='editing'>上传</el-button>
			</div>
			<label :for="uploadConfig.id" v-if='!urlF'> 
				<add-btn class='select'></add-btn> 
			</label>

		</div>
		<remind :remind='remind'></remind >

	<!-- 		
			<span class='file-name'>{{fileName}}</span>
			<input type="text" name='type' value="0">
			<div class='delete' @click.prevent='deleteP($event)'>delete</div> -->


			<!-- <input type="submit" name=''  class="submit"> -->
			<!-- </form> -->
		<!-- <el-button type='success'  v-if='editing' @click='submit'>提交</el-button>
		<el-button type='warning'  v-if='!editing' @click='edit'>修改</el-button>
		<remind :remind='remind'></remind> -->
	</div>

</template>

<script>
	import bus from '../../bus.js'
	// import '../../css/input.css'
	import publicFun from '../../js/public.js'
	import remind from './remind.vue'
	import addBtn from './add-btn.vue'
	export default {
		data() {
			return {
				loadingText:'请稍后',
				fileImg:null,
				editing: true,
				loading: false,
				fileName: '',
				response:null,
				// url:'userInfo/addAccessory',
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
		props:{
			uploadConfig:{},
      // {url:'userInfo/addAccessory',data:{type:0},resKey:'idcardUrl',id:'IDscanFront'},
    },
    methods: {
    	test:function(){
    		// console.log('test test')
    		this.edit()
    	},
    	submit(){
    		var formData = new FormData();
    		var cfg=this.uploadConfig
    		formData.append('imgFile',this.input.files[0])

    		for(let key in cfg.data){
    			formData.append(key,cfg.data[key])
    		}
    		// console.log('formData',formData) // sorry this can't work
    		var xhr=new XMLHttpRequest()
    		xhr.withCredentials = true;  
    		xhr.open('post','http://hzg.he577.com/'+cfg.url)
    		// xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    		xhr.addEventListener('readystatechange',()=>{
    			if(xhr.readyState===4&&xhr.status===200){
    				console.log('success',xhr.response)
	    			this.response={}
	    			this.response.body=JSON.parse(xhr.response)
    				// console.log('this,response',JSON.parse(xhr.response))    			
    				publicFun.postRes(this.response,this)
    			}
    			console.log('xhr ready change')
    			console.log('xhr',xhr.readyState)
    			console.log('xhr',xhr.response)
    			console.log('xhr',xhr)
    		},false)
    		xhr.onerror=function(e){
    			console.log('error',e)
    		}
    		xhr.onloadstart=function(){
    			console.log('start upload')
    		}
    		
					if (!xhr.upload) {
						console.log('xhr.upload error')
					} else {
						if (xhr.upload.onprogress === undefined) {
							console.log('xhr.upload.onprogress error')
						} else {
							xhr.upload.addEventListener("progress", (e) => {
								console.log('progress', e)
								var percentage = Math.round((e.loaded * 100) / e.total);
								this.loadingText = percentage + '%'
								console.log('loaded', percentage)
							})
						}
					}
				
    		
    		// xhr.
    		// xhr.upload.addEventListener("progress", function(e) {
    			// if (e.lengthComputable) {

    			// 	console.log('progrssing')
    			// }
    		// }, false);
    		xhr.send(formData)
    		this.loading=true
    		// publicFun.post(cfg.url, formData, this,()=>{
    		// 	console.log('success')
    		// } )  
    	},
    	get(){
    		var cfg=this.uploadConfig
				// console.log('cfg',cfg)
				publicFun.get(cfg.url, this,()=>{
					// console.log('response',this.response)
					var res=this.response.body.data
					// console.log('this.url',this.urlF,res.idcardUrl)
					if(res){
						this.urlF=res[cfg.resKey]
					}
				})
			},
			edit:function($event){
				// console.log('editing')
				this.editing=true
				// this.input.value = ''
				this.urlF = ''
				this.fileName = ''
			},
			changeP: function($event) {
				var input = $event.target.parentElement.parentElement.getElementsByTagName('input')[0]
				console.log('input.files[0].size',input.files[0].size)
				console.log('input.files[0].size',input.files[0].type)
				if(input.files[0].size>1024*1024){
					var r = this.remind
					r.remindMsg='大小超过1M'
					r.isShow=true
				}
				// console.log(' $event.target.parentElement', $event.target.parentElement.parentElement)
				// console.log(' $event.target', $event.target)
				// console.log('input',input)
				this.input=input
				var urlF = this.getFileUrl(this.input)
				this.fileImg=urlF

				var outer = input.parentElement
					// var img=outer.getElementsByTagName('img')[0]
					// var name=outer.getElementsByTagName('span')[0]
					// console.log('url',urlF)
					// console.log('changed', input.files[0].name)
					// console.log('img',img)
					this.fileName = input.files[0].name
					this.urlF = urlF
					outer.removeChild(input)//避免卡顿
					setTimeout(function() {
						outer.appendChild(input)
					}, 30);
				},
				deleteP: function($event) {
					// console.log('delete',$event.target.parentElement.parentElement)
					// var outer = $event.target.parentElement
					// var input = outer.getElementsByTagName('input')[0]
					// var img=outer.getElementsByTagName('img')[0]
					// console.log('input',input)
					// console.log('input',input.files[0].name)
					this.input.value = ''
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
			// this.testdata=new FormData()
			// this.testdata.append('testkey','testvalue')
			// console.log('this',this)
			// console.log('this',this.$el)
			// console.log('parent',this.$parent)
			// console.log('this',this.$data)
			this.get()
			
			// console.log('this.$el',this)
			// console.log('this.$el',this.$el)
			// this.input=this.$el.getElementsByTagName('input')[0]
		},
		events: {},
		components: {
			remind:remind,
			'add-btn':addBtn,
		}
	}
</script>

<style lang='scss' scoped>
/*	form{
		position: relative;
		border:1px solid cyan;
	}*/
	
	$outerHeight:0.8rem;
	$outerWidth:100%;
	$boxSize:0.6rem;
	*{
		/*border:1px solid red;*/
	}
	input,label{
		-webkit-tap-highlight-color:transparent;
	}
	input{
		height: 0;
		width: 0;
		/*height: $outerHeight;*/
		line-height: 1;
		/*width: 100%;*/
		position: absolute;
		top: 0;
		opacity: 0;
	}
	div.container{
		width: 100%;
		display: flex;
		height: $outerHeight;
		background: #fff;
		text-align: left;
		align-items:center;
		margin: 0;
		.thumb{
			width:$boxSize;
			height:$boxSize;
			border:1px solid #cccccc;
			background:url(#) no-repeat center center;
			background-size: contain;
			margin-left: 0.15rem;
		}
		label{
			display: inline;
			width: $boxSize;
			height: $boxSize;
			margin-left: 0.15rem;
			/*line-height: inherit;*/
			line-height: $outerHeight;
			/*width: 100%;*/
			/*margin: 0 auto;*/
			/*display: block;*/
			/*height: $outerHeight;*/
		}
		.img-ctrl{
			position: absolute;
			right: 0.15rem;
		}
		.img-ctrl-label{
			display: block;
			width: 0.6rem;
			height: 0.2rem;
			margin: 0;padding: 0;
		}
		.img-ctrl-btn{
			display: block;
			font-size: 0.14rem;
			height: 0.25rem;
			width: 0.7rem;
			line-height: 0.2rem;
			padding: 0;
			margin:0.05rem;

		}
	}
	.delete{
		width: 1rem;
		height: 0.25rem;
		font-size: 0.16rem;
		line-height: 0.25rem;
		/*position: absolute;*/
		/*bottom: 0;*/
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
			width: 1rem;
		}
	}
</style>
