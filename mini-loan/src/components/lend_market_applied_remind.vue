<template>
	<div id="hzgQrcode">
		<p class="text">关注【禾掌柜】微信公众号，</p>
    <p class="text">还能领取1000~50000元额度。</p>
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
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{
      back(){
        var r=location.hash.replace("#",'')
        var arr=r.split('/'),i=0
        while(i<2){
          arr.pop()
          i++
        }
        var newR=arr.join('/')
        publicFun.goPage(newR)
      },
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
  .text{
    font-size: 0.2rem;
    text-align:left; 
    margin:0.25rem;
    line-height: 1.2;
  }
	.qrcode{
    width: 2.5rem;
  }
</style>
