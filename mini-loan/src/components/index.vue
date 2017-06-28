<template>
	<div id="indexVue">
		<h3 class="title">操作</h3>
		<div class="container">
			<div class="row">
				<div class="cell" @click='goP("/apply_borrow")'>
					<div class="item-icon"><i class="icon-database"></i></div>
					<div class="item-name">分享给经纪人</div>
				</div>
				<div class="cell" @click='goP("/apply_lend")'>
					<div class="item-icon"><i class="icon-banknote"></i></div>
					<div class="item-name">分享给客户</div>
				</div>
				<div class="cell" @click=''>
				</div>
				<div class="cell" @click='goP("/")'>
					<!-- <div class="item-icon"><i class="icon-address-book"></i></div> -->
					<!-- <div class="item-name">基本信息</div> -->
				</div>

			</div>
		</div>
		<h3 class='title first-title'>必填认证认证信息</h3>
		<div class="container">
			<div class="row" v-for='row in essentialCell'>
				<div class="cell" v-for='cell in row' @click='goP(cell.link)'>
					<div class="item-icon"><i :class="cell.icon"></i></div>
					<div class="item-name">{{cell.title}}</div>
				</div>
			</div>
		</div>
		<h3 class="title">可选信息</h3>
		<div class="container">
			<div class="row" v-for='row in optionalCell'>
				<div class="cell" v-for='cell in row' @click='goP(cell.link)'>
					<div class="item-icon"><i :class="cell.icon"></i></div>
					<div class="item-name">{{cell.title}}</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
	import router from'../router'
	export default {
		data() {
			return {
				essentialCell:[
				[
				{title:'身份认证',link:'/identity',icon:'icon-address-book',},
				{title:'联系方式',link:'/contact_way',icon:'icon-phone',},
				{title:'身份证上传',link:'/upload',icon:'icon-upload',},
				{title:'手机认证',link:'/shujumohe',icon:'icon-mobile',},
				],
				// [
				// {title:'负债调查',link:'/debt',icon:'icon-puzzle',},
				// 		],
						],
						optionalCell:[
						[
						{title:'个人概况',link:'/profile',icon:'icon-documents',},
						{title:'工作信息',link:'/job_info',icon:'icon-profile',},
						{title:'行业名单',link:'/',icon:'icon-info',},
						{title:'芝麻认证',link:'/zhima',icon:'icon-eye-plus',},

						],
						]
					}
				},
				methods:{
					goP(path){
						router.push(path)
					}
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
				/*border-bottom-width:0.15rem;*/
		/*background:
		linear-gradient(180deg, $cellBorder 0.5%,$cellBorder 0.8%,transparent 0.8% ),
		linear-gradient(90deg, transparent 99.5%,$cellBorder 99.5%,$cellBorder 99.8%,transparent 99.8% );
		background-repeat:repeat-y repeat-x;
		background-size:100% $cellHeight,25.5% 100%; 
		background-clip:content-box;*/
		/*background-origin: border-box; */


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
