<template>
	<div id="contactsVue">
		<div class="bar">
			
			<ul :class="{'active':isOpen}">

				<li @click="doit(1)">
					<a href="javascript:void(0)">
						<img src="./assets/img/qq.png" alt="">
					</a>
				</li>
				<li @click="doit(2)">
					<a href="javascript:void(0)">
						<span class="icon-wechat"></span>
					</a>
				</li>
				<li @click="doit(3)">
					<a href="tel:4000577009">
						<span class="icon-phone-hang-up"></span>
					</a>
				</li>
				<!-- <li @click="doit(4)">
					<a href="javascript:void(0)">
						<img src="./assets/img/zfb.png" alt="">
					</a>
				</li>
				<li @click="doit(5)">
					<a href="javascript:void(0)">
						<img src="./assets/img/jdb.png" alt="">
					</a>
				</li> -->
				<!-- <li @click="doit(6)">
					<a href="javascript:void(0)">
						<img src="./assets/img/gongzhonghao_icon.png" alt="">
					</a> -->
				</li>
			</ul>
			<div class="keycontrol" @click="control">
				{{openMsg}}
			</div>
		</div>
		<div id="qrcode" v-show="qrcode > 0 " @click="baibai()">
			<img @click.stop='' v-show="qrcode == 1" src="./assets/img/wechatMe.jpeg" alt="">
			<img @click.stop='' v-show="qrcode == 2" src="./assets/img/qqMe.png" alt="">
			<!-- <img @click.stop='' v-show="qrcode == 3" src="./assets/img/zfbMe.jpeg" alt="">
			<img @click.stop='' v-show="qrcode == 4" src="./assets/img/jdbMe.jpeg" alt=""> -->
			<!-- <img @click.stop='' v-show="qrcode == 5" src="./assets/img/qrcode_xh.jpg" alt=""> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					isOpen: true,
					openMsg: "收起",
					qrcode: 0
				}
			},
			methods: {
				control: function() {
					if (this.isOpen) {
						this.isOpen = false;
						this.openMsg = "展开";
					} else {
						this.isOpen = true;
						this.openMsg = "收起";
					}
				},
				doit: function(choose) {
					console.log('chooose',choose)
					switch (choose) {
						case 1:
							this.qrcode = 2;

							// window.open("http://wpd.b.qq.com/page/info.php?nameAccount=4000577009");
							// window.location = "http://qm.qq.com/cgi-bin/qm/qr?k=65gJlYPrNgfWw8eO1e4Ju4uM_3AeHtNE";
							break;
						case 2:
							this.qrcode = 1;
							break;
						case 3:
							break;
						case 4:
							this.qrcode = 3;

							break;
						case 5:
							this.qrcode = 4;
							break;
						case 6:
						this.qrcode = 5;
							break;
					}
				},
				baibai: function() {
					this.qrcode = 0;
				}
			},
			events: {},
			components: {}
	}
</script>

<style lang='scss' scoped>
	#contactsVue{
		z-index:999999;
		position: fixed;
		right: 10*0.01rem;
		bottom: 70*0.01rem;
		.keycontrol{
			padding: 5*0.01rem;
			font-size: 16*0.01rem;
			line-height: 32*0.01rem;
			background: #bbb3b3;
			color: #Fcf4f4;
		}
		ul.active{
			display: block;
		}
		ul {
			/*float: left;*/
			list-style: none;
			padding: 0;
			margin: 0;
			display: none;
			li{
				a{
					display: block;
					padding: 5*0.01rem;
					text-decoration: none;
					color: #007aff;
					width: 42*0.01rem;
					img{
					width: 100%;
					display: block;
					}
				}
				
				&:nth-child(1) {
			    background: #6da9df;
			    a{
			    	color: black;
			    }
				}
				&:nth-child(2),&:nth-child(3){
					background: #75c34b;
					a {
						color: white;
						span{
							font-size: 28*0.01rem;
							line-height: 32*0.01rem;
							display: block;
						}
					}
				}
				&:nth-child(3){
					background: #fbb021;
				}
				&:nth-child(4),	&:nth-child(5),&:nth-child(6){
					a{
						padding: 0;
					}
				}
			}

		}
		#qrcode{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.8);
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			-ms-grid-row-align: center;
			align-items: center;
			img{
				width: 80%;
			}
		}
	}

</style>
