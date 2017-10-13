<template>
  <div id="biddingRecordVue" v-loading='loading' element-loading-text='请稍后'>
    <div class="input">
      <app-back></app-back>
      <h1 class="title">
        竞价排名记录
      </h1>
    </div>
    <app-record-list :cfg='cfg'></app-record-list>
    <remind :remind='remind'></remind>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response:null,
      loading:false,
      editing:true,
      backAfterPost:false,// watch out
      url:'lendSupermaket/myAdOrders',
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
  methods:{},
  events: {},
  components: {}
}
</script>

<style>

</style>
