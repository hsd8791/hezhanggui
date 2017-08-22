<template>
	<div id="marketListVue" >
      <div class="input">
        <h1 class="title" v-loading='loading' element-loading-text='请稍后'>
          贷款超市列表
          <span class='edit-input' @click='goP("/market_mine")'>我的超市</span>
        </h1>
      </div>
    <app-record-list :cfg='config' v-record='config.name' class='market-list'>
      <!-- <div v-for='info in list' @click='goP("/market_detail?id="+info.id)'> -->

      <div v-for='info in list' @click='goApply(info)' class="market-container">
        <div class="avator">
          <div class="avator-pic" :style="{backgroundImage: 'url('+info.logo+')'}" ></div>
        </div>
        <div class="info-container">
          <div class="info-applied">申请数：{{info.view_num}}</div>
          <div class="info-fee">{{info.loan_amount_desc}}元</div>
          <div class="info-expire">期限{{info.loan_time_desc}}天</div>
        </div>
        <div class="new-remind" v-if='isNew(info.create_time)'>
          <div class="inner">
            new!
          </div>
        </div>

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
      limit:16,
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
<<<<<<< HEAD

=======
>>>>>>> dev
    goApply(info){
      //001 market_id  002 qudao if have
      let qudao = sessionStorage.getItem('salesWay')
      let MtaH5Body = {'001':info.id}
      if(qudao){
        MtaH5Body['002']=qudao
        MtaH5Body['003']=qudao+'_'+info.id
        // MtaH5.clickStat('1',{'002':qudao})
      }
      console.log('MtaH5Body',MtaH5Body)
      
      // MtaH5.clickStat('1',{'001':info.id})
      MtaH5.clickStat('1',MtaH5Body)
      if(info.url){
        publicFun.get('lendSupermaket/view?id='+info.id,this,()=>{
          // alert('sent viewed')
<<<<<<< HEAD
          window.location.href=info.url
        })
=======
          this.loading=true
        })

        setTimeout(function() {
          window.location.href=info.url
        }, 200);
>>>>>>> dev
      }else{
        publicFun.get('lendSupermaket/view?id='+info.id,this,()=>{
        })
        publicFun.goPage(this.$route.path+"/market_detail/market_"+info.id)
      }
    },
    isNew(t){
      let i=(new Date()).getTime()-t
      // console.log('i',(new Date()).getTime(),i)
      if(i<259200000){
        return true
      }else{
        return false
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

</style>
<style type="text/css" lang='scss'>
  
  #marketListVue{
    .market-container{

      overflow: hidden;
      width: 50%;
      border:1px solid #fff;
      height: 0.8rem;
      position: relative;
      background: #f4f4f4;
      .avator{
        width:0.5rem;
        height:0.5rem;
        left:0.1rem;
        margin:auto 0;
        border:1px solid #ccc;
        position: absolute;
        top: 0;bottom: 0;
        .avator-pic{
          width:100%;
          height:100%;
          position: absolute;
          left: 0;
          background:url(#) no-repeat center center;
          background-size: contain;

        }
      }
      .info-container{
        width: 65%;
        padding:0.12rem 0;
        padding-left: 0.05rem;
        position: absolute;
        right: 0;
        top: 0;
        text-align: left;
        font-size: 0.13rem;
        .info-fee,.info-expire,.info-applied{

        }
        .info-fee{
          color:#F44343;
          font-size: 0.14rem;
        }
        .info-expire{
          color:#888;
        }
        .info-applied{
          color:#666;
        }
      }
      .new-remind{
        transform: rotate(45deg);
        border:1px solid red;
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        right: -0.3rem;top: -0.3rem;
        .inner{
          width: 100%;
          height: 0.2rem;
          font-size: 0.14rem;
          line-height: 0.2rem;
          position: absolute;
          background: #ED0C30;
          color:#fff;
          bottom: 0;

        }
      }
    }
    .list-container{
      .list-container-inner{
        display: flex;
        flex-wrap: wrap;
      }
      /*margin-bottom: 0.4rem;*/
      border:1px solid #fff;
    }
  }
</style>
