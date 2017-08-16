<template>
	<div id="marketListVue" v-loading='loading' element-loading-text='请稍后'>
      <div class="input">
        <h1 class="title">
          贷款超市列表
          <span class='edit-input' @click='goP("/market_mine")'>我的超市</span>
        </h1>
      </div>
    <app-record-list :cfg='config' v-record='config.name'>
      <!-- <div v-for='info in list' @click='goP("/market_detail?id="+info.id)'> -->
      <div v-for='info in list' @click='goApply(info)'>
      <app-record  class='market-container' >
      <div class="avator-pic" :style="{backgroundImage: 'url('+info.logo+')'}" slot='avator'></div>
      <span slot='lt' style="letter-spacing: -0.01rem;">
        {{info.name}}
        <span class="apply-count">
        {{info.view_num}}次申请
        </span>
<!--         <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i> -->
      </span>
      <span slot='rt'>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
        <i class="icon-cool market-star"></i>
      </span>
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
    <div class="bottom-slogan">
      <!-- <div class="promotion">
        入驻贷款超市即送50禾币！
      </div> -->
      <div class="contact-container">
        <p class="contact">获客合作电话/微信：<a href="tel:13777722216">18622272224</a></p>
        <!-- <p class="contact">微信：18622272224，QQ：2591632277</p> -->
      </div>
    </div>
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
    goApply(info){
      // console.log('info url',info)
      if(info.url){
        window.location.href=info.url
      }else{
        publicFun.goPage(this.$route.path+"/market_detail/market_"+info.id)
      }
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

.apply-count{
  font-size: 0.13rem;
  color:#ccc;
}
.bottom-slogan{
  position: absolute;
  bottom: 0;
  width: 100%;
  .promotion{
    font-size: 0.2rem;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .contact-container{
    height: 0.4rem;
    font-size: 0.18rem;
    .contact{
      line-height: 0.4rem;
    }
  }
}
</style>
<style type="text/css" lang='scss'>
  
  #marketListVue{
    .list-container{
      margin-bottom: 0.4rem;
      border:1px solid #fff;
    }
  }
</style>
