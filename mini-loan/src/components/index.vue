<template>
	<div id="indexVue">
		<!-- <h3 class="title">操作</h3> -->
		<div class="ctrl-container">
			<!-- <div class="row"> -->
				<div class="ctrl-bttn" @click='goP("/apply_borrow")'>
					<!-- <div class="item-icon"><i class="icon-database"></i></div> -->
					<div class="item-name">我要借款</div>
				</div>
				<div class="ctrl-bttn" @click='goP("/apply_lend")'>
					<!-- <div class="item-icon"><i class="icon-banknote"></i></div> -->
					<div class="item-name">我要放贷</div>
				</div>
				<div class="ctrl-bttn" @click=''>
					<!-- <div class="item-icon"><i class="icon-banknote"></i></div> -->
					<div class="item-name">我要赚钱</div>
				</div>
				<!-- <div class="ctrl-bttn" @click='goP("/")'> -->
					<!-- <div class="item-icon"><i class="icon-address-book"></i></div> -->
					<!-- <div class="item-name">基本信息</div> -->
				<!-- </div> -->

			<!-- </div> -->
		</div>
		<h3 class='title first-title'>必填认证认证信息</h3>
		<div class="container">
			<div class="row" v-for='row in essentialCell'>
				<div class="cell" v-for='cell in row' @click='goP(cell.url)'>
					<div class="item-icon"><i :class="cell.icon"></i></div>
					<div class="item-name">{{cell.label}}</div>
				</div>
			</div>
		</div>
		<h3 class="title">可选认证信息</h3>
		<div class="container">
			<div class="row" v-for='row in optionalCells'>
				<div class="cell" v-for='cell in row' @click='goP(cell.url)'>
					<div class="item-icon"><i :class="cell.icon"></i></div>
					<div class="item-name">{{cell.label}}</div>
				</div>
			</div>
		</div>
		
		</div>
	</div>

</div>
</template>

<script>
	import publicFun from '../js/public.js'
	import bus from '../bus.js'
	export default {
		// name:'index',
		data() {
				return {
					//从bus中导入
					//??需拆分成4个一组
					essentialCell:[
						// [1], 
					],
					// essentialCell1: [
					// 	[{
					// 		title: '个人信息',
					// 		link: '/identity',
					// 		icon: 'icon-address-book',
					// 	}, {
					// 		title: '联系方式',
					// 		link: '/contact_way',
					// 		icon: 'icon-phone',
					// 	}, {
					// 		title: '身份证上传',
					// 		link: '/upload',
					// 		icon: 'icon-upload',
					// 	}, {
					// 		title: '手机认证',
					// 		link: '/shujumohe',
					// 		icon: 'icon-mobile',
					// 	}, ],
					// 	// [
					// 	// {title:'负债调查',link:'/debt',icon:'icon-puzzle',},
					// 	// 		],
					// ],
					optionalCells: [
						// [{
						// 		title: '个人概况',
						// 		link: '/profile',
						// 		icon: 'icon-documents',
						// 	}, {
						// 		title: '工作信息',
						// 		link: '/job_info',
						// 		icon: 'icon-profile',
						// 	}, {
						// 		title: '行业名单',
						// 		link: '/',
						// 		icon: 'icon-info',
						// 	}, {
						// 		title: '芝麻认证',
						// 		link: '/zhima',
						// 		icon: 'icon-eye-plus',
						// 	},

						// ],
					],

				}
			},
			methods: {
				goP(path) {
					publicFun.goPage(this.$route.path + path)
				},
				createCells(cells,arr){
					var tempArr=[],len=arr.length
					var rows,i,j,k
					tempArr=tempArr.concat(bus[arr[0]],bus[arr[1]])
					 // tempArr=bus.fillStatus.concat(bus.fillStatus2)
					// console.log('tempArr',tempArr)
					// this.essentialCell=[[]]
					rows=Math.floor(tempArr.length/4)
					for(i=0;i<rows;i++){
						// console.log('essentialCell',this.essentialCell[i][0],tempArr[i+0])
						cells[i]=[]
						cells[i][0]=tempArr[i+0]
						cells[i][1]=tempArr[i+1]
						cells[i][2]=tempArr[i+2]
						cells[i][3]=tempArr[i+3]
					}
						cells[rows]=[]
					for(j=rows*4,k=0;j<tempArr.length;j++,k++){
						cells[rows][k]=tempArr[j]
					}
				},
			},
			created(){
				// var tempArr=bus.fillStatus.concat(bus.fillStatus2)
				// // console.log('tempArr',tempArr)
				// var rows=Math.floor(tempArr.length/4),i,j,k
				// // this.essentialCell=[[]]
				// for(i=0;i<rows;i++){
				// 	// console.log('essentialCell',this.essentialCell[i][0],tempArr[i+0])
				// 	this.essentialCell[i]=[]
				// 	this.essentialCell[i][0]=tempArr[i+0]
				// 	this.essentialCell[i][1]=tempArr[i+1]
				// 	this.essentialCell[i][2]=tempArr[i+2]
				// 	this.essentialCell[i][3]=tempArr[i+3]
				// }
				// 	this.essentialCell[rows]=[]
				// for(j=rows*4,k=0;j<tempArr.length;j++,k++){
				// 	this.essentialCell[rows][k]=tempArr[j]
				// }
				this.createCells(this.essentialCell,['fillStatus','fillStatus2'])
				this.createCells(this.optionalCells,['fillStatusOpt','fillStatusOpt2'])
				bus.$on('checked_fill_status',val=>{
					// console.log('on checked_fill_status',this.$route.path)
					this.createCells(this.essentialCell,['fillStatus','fillStatus2'])
				})
				// this.createCells(this.optionalCells)


			},
			events: {},
			components: {}
	}
</script>

		<style lang='scss' scoped>
			$cellBorder:#e2e3e4;
			/*$outBorder:#fff;*/
			$outBorder:#f4f4f4;
			$cellHeight:0.94rem;
			$itemNameColor:#8f8e94;
			/*#323233;*/
			$itemIconColor:#8f8e94;
			h3.first-title{
				/*margin-top: 1.52rem;*/
			}
			.ctrl-container{
				display: flex;
				/**{
					border:1px solid red;
				}*/
				.ctrl-bttn{
					width: 33%;
					margin:0.15rem;
					padding:0.1rem;
					background-color:#d6322c;
					color: #eee;
					font-size: 0.16rem;
					background: linear-gradient(90deg,#d6322c 0%,#d6322c 30%,#eda29a);
					border-width: 0;
					border-radius: 0.1rem;
				}
			}
			.cell{

				.item-icon{
					margin:0.2rem 0 0;
					/*border:1px solid red;*/
					i{
						font-size:0.24rem;
						line-height: 1.4;
						color:$itemIconColor;
						/*color:$cellBorder;*/
					}
				}
				.item-name{
					font-size:0.14rem;
					color:$itemNameColor;
					/*color:$cellBorder;*/
					/*border:1px solid red;*/
				}
			}
			.container{
				/*background: #fff;*/
				/*border:1px solid red;*/
				border:$outBorder solid 0px;
		.cell{
			/*background:#fff;*/
			box-sizing: border-box;
			/*width: 1.25rem;*/
			width: $cellHeight;
			height: $cellHeight;
			border: 0px solid $cellBorder;
			border-right-width: 0.5px;
			/*border-radius: 0.15rem;*/
			/*border:0.05rem #fff solid;*/
			/*display: inline-block;*/
		}
		.cell:nth-child(4){
			/*border:1px solid red;*/
			border-right-width: 0px;
		}
		.row{
			display: flex;
			/*flex-wrap: wrap;*/
			box-sizing: border-box;
			border: 0px solid $cellBorder;
			border-bottom-width: 0.5px;
		}
		.row:first-child{
			border-top-width: 0.5px;
		}
	}


	.title{
		text-align: left;
		padding: 0.05rem 0.1rem;
		color:#757575;
	}
	h3.title:first-child{
	}
	.banner{
		width: 100%;
		position: fixed;
		top: 0;left: 0;
	}
</style>
