<template>
	<div id="payIntrestVue">
		<div class="title">微信支付</div>
		<div class="msgbox">
			<table border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th><img src="../assets/img/borrow.png"/></th>
					<th><img src="../assets/img/rely.png"/></th>
					<th><img src="../assets/img/others.png"/></th>
				</tr>
				<tr>
					<td>
						<div class="mybtn" data-pay="1" >
							<img src="../assets/img/80.png" alt="" @click.stop='show("wechatpay80")'/>
						</div>
					</td>
					<td>
						<div class="mybtn" data-pay="2">
							<img src="../assets/img/110.png" @click.stop='show("wechatpay110")'alt="" />
						</div>
					</td>
					<td>
						<div class="mybtn" data-pay="3" @click.stop='show("wechatpay")'>
							其他金额
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="mybtn" data-pay="4">
							<img src="../assets/img/160.png" @click.stop='show("wechatpay160")' alt="" />
						</div>
					</td>
					<td>
						<div class="mybtn" data-pay="5">
							<img src="../assets/img/220.png" @click.stop='show("wechatpay220")'alt="" />
						</div>
					</td>
					<td>
					</td>
				</tr>
			</table>
		</div>
		<div class="title">支付宝支付</div>
		<div class="msgbox">
			<table border="0" cellspacing="0" cellpadding="0">
				<tr>
					<th><img src="../assets/img/borrow.png"/></th>
					<th><img src="../assets/img/rely.png"/></th>
					<th><img src="../assets/img/others.png"/></th>
				</tr>
				<tr>
					<td>
						<div class="mybtn" data-pay="6">
							<img src="../assets/img/80.png" alt="" @click.stop='show("zfbpay80")'/>
						</div>
					</td>
					<td>
						<div class="mybtn" data-pay="7">
							<img src="../assets/img/110.png" alt="" @click.stop='show("zfbpay110")' />
						</div>
					</td>
					<td>
						<div class="mybtn" data-pay="8" @click.stop='show("zfbpay")'>
							其他金额
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div class="mybtn" data-pay="9">
							<img src="../assets/img/160.png" alt="" @click.stop='show("zfbpay160")' />
						</div>
					</td>
					<td>
						<div class="mybtn" data-pay="10">
							<img src="../assets/img/220.png" alt="" @click.stop='show("zfbpay220")' />
						</div>
					</td>
					<td>
					</td>
				</tr>
			</table>
		</div>
		<div class="popView" @click='hide($event)' >
			<div class="qrcodeBox" >
				<div class="qrcodeBox-inner" @click.stop=''>
				<!-- 	<img class="payImg" id='payIMGwechatpay80' src="../assets/img/wechatpay80.jpg"/>
					<img class="payImg" id='payIMGwechatpay110' src="../assets/img/wechatpay110.png"/>
					<img class="payImg" id='payIMGwechatpay' src="../assets/img/wechatpay.png"/>
					<img class="payImg" id='payIMGwechatpay160' src="../assets/img/wechatpay160.jpg"/>
					<img class="payImg" id='payIMGwechatpay220' src="../assets/img/wechatpay220.png"/>
					<img class="payImg" id='payIMGzfbpay80' src="../assets/img/zfbpay80.jpg"/>
					<img class="payImg" id='payIMGzfbpay110' src="../assets/img/zfbpay110.jpg"/>
					<img class="payImg" id='payIMGzfbpay' src="../assets/img/zfbpay.jpg"/>
					<img class="payImg" id='payIMGzfbpay160' src="../assets/img/zfbpay160.jpg"/>
					<img class="payImg" id='payIMGzfbpay220' src="../assets/img/zfbpay220.jpg"/>
					<p>请长按扫码支付</p> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
  	show(pay){
  		// console.log('e',e.target.getAttribute('pic'))
  		// var el=e.target
  		var popView=document.querySelector('.popView')
  		// var payImg=document.querySelector('#payImg')
  		// payImg.src=el.getAttribute('pic')

  		// console.log('popView',popView)
  		popView.style.display='block'
  		var el=document.querySelector('#payIMG'+pay)
  		console.log('el',el)
  		el.style.display='block'
  	},
  	hide(e){
  		var popView=document.querySelector('.popView')
  		popView.style.display='none'
  		var pays=document.querySelectorAll('.payImg'),l=pays.length,i
  		for(i=0;i<l;i++){
  			pays[i].style.display='none'
  		}
  	},
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
	#payIntrestVue {
		.popView{

			position: fixed;
			top: 0;left: 0;bottom: 0;right: 0;
			/*padding: 40*0.01rem;*/
			background: rgba(0, 0, 0, 0.8);
			display: none;
			z-index: 999;
			p{
				padding-top: 10*0.01rem;
				text-align: center;
				font-size: 14*0.01rem;
				margin-top: 0;
				margin-bottom: 10*0.01rem;
				color: #8f8f94;
			}
			.qrcodeBox{
				position: absolute;
				width: 240*0.01rem;
				height: 500*0.01rem;
				left: 0;right: 0;top: 0;bottom: 0;
				/*display: inline-block;*/
				margin:auto;
				 vertical-align:middle;
				/*line-height: 500*0.01rem;*/
				.qrcodeBox-inner{
					position: relative;
					top:50%;
					transform: translateY(-50%);
				}
			}
			.payImg {
				position: relative;
				/*width: 240*0.01rem;*/
				width: 240*0.01rem;
				line-height: 500*0.01rem;
				display: none;
			}


		}
		padding: 20*0.01rem 30*0.01rem 0;
		text-align: center;
		.title{
			margin: 0;
			padding: 20*0.01rem 0 10*0.01rem;
			color: #727171;
			font-size: 20*0.01rem;
			border-bottom: 1*0.01rem solid #dcdbdb;
		}
		table {
			
			td:nth-child(3) {
				color: #f17477;
				font-size: 13*0.01rem;
				font-weight: 700;
			}
			img{
				height: 14*0.01rem;
				border: 0;
			}
			width: 100%;
			border-spacing: 0;
			border-collapse: collapse;
			tbody{
				display: table-row-group;
				vertical-align: middle;
				border-color: inherit;

			}
			tr{
				display: table-row;
				vertical-align: inherit;
				border-color: inherit;
			}
			th{
				width: 30%;
				font-weight: bold;
				text-align: -internal-center;

			}
			td{
				width: 30%;
				padding: 15*0.01rem 0;
				.mybtn {
					display: inline-block;
					width: 80%;
					padding: 5*0.01rem 0;
					border: 1*0.01rem solid #e71419;
					border-radius: 5*0.01rem;
				}
			}
			td, th {
				
				display: table-cell;
				vertical-align: inherit;

			}
		}
		.msgbox {
			padding: 20*0.01rem;
		}
	}

</style>
