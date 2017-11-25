<template>
	<div id="hzgQrcode">
  <div class="input">
    <h1 class="title">提示</h1>
  </div>
		<p class="text">关注【禾掌柜】微信公众号，</p>
    <p class="text">还能领取1000~50000元额度。</p>
    <p class="text">
      更多贷款请到贷款超市申请
      <span class="link" @click='goMarket'>
        【点这里进入贷款超市】
      </span>
    </p>
		<img src="../assets/img/hzg_qrcode.jpg" class="qrcode">
    <div class="input">
      <el-button type='success' @click='back'>确定</el-button>
    </div>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
export default {
  data() {
    return {
    }
  },
  methods:{
      back(){
        // var r=location.hash.replace("#",'')
        // var arr=r.split('/'),i=0
        // while(i<2){
        //   arr.pop()
        //   i++
        // }
        // var newR=arr.join('/')
        publicFun.goPage('/mine/apply_list/lendingUid_0')
      },
      goMarket(){
        publicFun.goPage('/market_list')
      }
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .text{
    font-size: 0.16rem;
    text-align:left; 
    margin:0.12rem 0.25rem ; 
    line-height: 1.4;
  }
	.qrcode{
    width: 2.5rem;
  }
  .link{
    color: #1953CD
  }
</style>
