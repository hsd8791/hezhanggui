<template>
  <div id="applyDetailVue">
    <div class="input">
      <h1 class="title">
        <app-back></app-back>
        申请记录
      </h1>
    </div>
  </div>
</template>

<script>
import publicFun from '../js/public.js'
import bus from '../bus.js'
export default {
  data() {
    return {
      marketInfo:null,
      applyRecord:null,
      applyId:null,
      response:null,
      loading:false,
      editing:true,
      backAfterPost:false,// watch out
      urls:{
        market:'lendSupermaket/supermaketInfoByUid',
        applyRecord:'lendApply/borrowLoanRecords',
      },
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
  created(){
    let query=this.$route.query
    this.applyRecord=bus.applyRecordViewing
    this.applyId=query.apply_id
    this.lendingUid=query.lendingUid
    this.getMarketInfo()
  },
  methods:{
    getMarketInfo(){
      let url=publicFun.urlConcat(this.urls.market,{
        uid:this.lendingUid
      })
      publicFun.get(url,this,()=>{
        console.log('res',this.response.body)
        this.marketInfo=this.response.body.data
      })
    },
  },
  events: {},
  components: {}
}
</script>

<style>

</style>
