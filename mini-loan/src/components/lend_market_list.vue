<template>
	<div id="marketListVue" v-loading='loading' element-loading-text='请稍后'>
      <div class="input">
        <h1 class="title">贷款超市列表</h1>
      </div>

    <app-record-list :cfg='config' v-record='config.name'>
      <!-- <div v-for='info in list' @click='goP("/market_detail?id="+info.id)'> -->
      <div v-for='info in list' @click='goP("/market_detail/market_"+info.id)'>
      <app-record  class='market-container' >
      <div class="avator-pic" :style="{backgroundImage: 'url('+info.logo+')'}" slot='avator'></div>
      <span slot='lt' style="letter-spacing: -0.01rem;">
        {{info.name}}&nbsp;&nbsp;
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
      </span>
      <!-- <span slot='rt'>{{}}</span> -->
      <span slot='rd'>
        <span class="required-info-box">
          <span class='required-text'>身份验证</span>
        </span>
        <span class="required-info-box">
          <span class='required-text'>手机认证</span>
        </span>
        <span class="required-info-box">
          <span class='required-text'>芝麻认证</span>
        </span>        
      </span>
      <span slot='ld'>{{info.intro}}</span>
    </app-record>
    </div>
    </app-record-list>


    <remind :remind='remind'></remind>
	</div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      config:{
      url:'lendSupermaket/list',
      name:'withdraw_record',
      },
      list:{},
      response:null,
      loading:true,
      editing:true,
      backAfterPost:false,// watch out
      url:'lendSupermaket/list',
      remind:{
        isShow:false,
        remindMsg:'remind',
        self_:this,
        remindOpts:[
        {msg:'确定',},
        ],
      },
    }

  },
  methods:{
    get(){
      publicFun.get(this.url,this,()=>{
        this.list=this.response.body.data.data
        console.log('res list',this.response.body)
      })
    },
    goP(p){
      publicFun.goPage(this.$route.path+p)
    },
  },
  created(){
    this.get()
    bus.$on(this.config.name,(val)=>{
      // console.log('event name',this.config.name)
      // console.log('test_records',val)
      this.list=val
    })
  },
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>


</style>
