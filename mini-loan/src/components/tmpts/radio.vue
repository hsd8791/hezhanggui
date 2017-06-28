<template>
	<div class='input-radio-box'>
		<div class="wrapper"  v-for='item in infos.options' >
			<input type="radio" :checked='defaultV==item.value':id='item.id' :name="infos.name"  :value="item.value" @change='emitChange($event)' :key='item.id'/>
			<label :for='item.id' ><span class="checking"></span>{{item.value}}</label>
		</div>
	</div>
</template>

<script>
	import bus from '../../bus.js'
	export default {
		data() {
			return {
			}
		},
		props: {
		// id: {},
		// value: {},
		// name:{},
		// options:{},
		infos:{
			type:Object,
			required:true
		}
		,
		defaultV:{
			required:true
		}
	},
	computed:{},
	methods:{
		emitChange:function($event){
			bus.$emit('sex',$event.target.value)
		}
	},
	events: {},
	components: {}
}
</script>

<style scoped lang='scss'>
	$outerWidth:80%;
	$outerHeight:0.4rem;
	$labelColor:#666;
	$checkBoxSize:0.15rem;
	*{
		/*border:1px solid red;*/
	}

	label{
		font-size: 0.25rem;
		line-height: $outerHeight;
		/*height: $outerHeight;*/
		width: 100%;
		color:$labelColor;
	}
	.input-radio-box{
		position: relative;
		/*height: 0.4rem;*/
	}
	.wrapper{
		position: relative;
		overflow: hidden;
		margin: 0 auto;
		height: 0.4rem;
		width:$outerWidth;
		border:1px #c3c9d0 solid;
		/*background: rgb(224,224,224);*/
	}
	input,label{
		box-sizing: border-box;
		position: absolute;
		top: 0;left: 0;
		/*height: $outerHeight;*/
		-webkit-tap-highlight-color:rgba(153,204,102,0.25);
		transition: 0.5s cubic-bezier(0.09, 0.7, 0.4, 0.93);

	}
	label:active{
		background: rgba(153,204,102,0.25);
	}
	input + label{
		padding-left: 0.4rem;
		/*width: auto;*/
		text-align: left;
		vertical-align: middle;
		/*background: */
	}
	.checking{
		display: inline-block;
		width:$checkBoxSize;
		height:$checkBoxSize;
		position: absolute;
		left: 0.15rem;
		top: 0;bottom: 0;
		margin:auto 0;
		border: 0.02rem solid rgb(192,192,192);
		border-radius: 50%;
		background: rgb(224,224,224);
		transition: 0.3s cubic-bezier(0.73, 0.18, 0.87, 0.56);
		/*background-image: linear-gradient(rgb(240,240,240),rgb(224,224,224));*/
	}
	input[type='radio']{
		opacity: 0;
	}
	input[type=radio]:checked + label> .checking{
		background: rgb(153,204,102)
	}
	
</style>
