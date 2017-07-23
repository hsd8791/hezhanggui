<template>
  <div class="" id='testVue'>
    <app-record-list :url='url'>
      <app-record v-for='record in records' :key="record">
        <i class="icon-database icon-avator" style="font-size: 0.3rem" slot='avator'></i>
        <span slot='rt'>{{record.createTime }}</span>
        <span slot='rd'>{{record.remark}}</span>
        <span slot='ld'>{{record.babaName}} {{record.babaPhone}}</span>
        <span slot='lt'>{{record.money}}元</span>
      </app-record>
      
    </app-record-list>
    <!-- <app-test></app-test> -->
  </div>
</template>

<script>
  import bus from '../bus.js'
  import publicFun from '../js/public.js'
  import appTest from './mine_commission_detail.vue'
  export default {
    data () {
      return {

        // config:{
        url:'brokerage/getRecords',
        // },
        records:[],
        response:null,
        loading:true,
        editing:true,
        backAfterPost:false,// watch out
        url:'brokerage/getRecords',
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

    }
    ,
    created:function(){
      bus.$on('test_records',(val)=>{
        console.log('test_records',val)
        this.records=val
      })
    },
    watch:{

    },
    components: {
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' scoped>
	h1{
    font-size: 0.25rem;
    background: red
  }
  form{
    /*height: auto;*/
  }
  input[type='submit']{
    position: relative;
  }
  .radio{
    /*height: 0.25rem;*/
  }

</style>
<style type="text/css">
  #testVue{
    .icon-avator{
      font-size: 0.25rem;
    }
  }
</style>