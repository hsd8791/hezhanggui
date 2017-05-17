<template>
	<div class='input-radio'>
		<!-- <div class="wrapper"> -->
		<input type="radio" :id='id' :name="name" :checked='defaultPick' :value="value"  @change='emitChange'/>
		<label :for='id' >{{value}}</label>
		<!-- </div> -->
	</div>

</template>

<script>
	import bus from '../bus.js'
	export default {
		data() {
			return {
			
				
			}
		},
  props: {
  	id: {
			// required: true
		},
		name: {
			required: true
		},
		value: {
			default: 'this is default value'
		},
		default:{}
		
	},
	computed:{
		defaultPick:function(){
			return this.default==this.value
		}
	},
	methods:{
	
		emitChange:function(){
			// console.log('this,count',this.count)
			// this.count++
			// // console.log('this name',this.name)
			bus.$emit(this.name,this.value)
		}
	},
	events: {},
	components: {}
}
</script>

<style scoped lang='scss'>
	*{
		border:1px solid red;
	}

	label{
		font-size: 0.25rem;
		height: 0.4rem;
		width: 100%;
	}
	.input-radio{
		position: relative;
		height: 0.4rem;
	}
	.wrapper{
		position: relative;
		height: 0.4rem;
	}
	input,label{
		position: absolute;
		top: 0;left: 0;
		height: 0.4rem;
	}
	input + label{
		margin-left: 0.4rem;
		text-align: left;
	}
	
</style>
