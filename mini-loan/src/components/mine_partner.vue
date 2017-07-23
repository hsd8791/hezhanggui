<template>
	<div id="partnerVue" >
		<div class="input" v-loading='loading' element-loading-text='请稍后'>

			<h1 class="title">
      <app-back ref='back' :text='"我的"' :link='"/mine"'>
      <!-- <span slot='11' >111</span> -->
      </app-back>
      我的下线   
      </h1>
    </div>
    <div class="list-container" @scroll='scrolling($event)'>
      <div class="list-container-inner">
        <div class="lv2-partner" v-for='lv2 in lv2Partners'>
          <div style="background: #ccc">二级代理姓名：{{lv2.name}} </div>
          <!-- <div>手机:{{lv2.phone}}</div> -->
          <div class="lv3Partners" v-for='lv3 in lv2.agentLv3'>三级代理：{{lv3.name}}</div>
        </div>
      </div>
      <div class="list-bottom" v-if='allGet'>没有更多啦...</div>
    </div>
    <remind :remind='remind'></remind >
  </div>
</template>

<script>
  // import bus from '../bus.js'
  import publicFun from '../js/public.js'
  // import remind from '../components/tmpts/remind.vue'
  export default {
    data() {
      return {
        allGet:false,
        getting:false,
       lv2Partners:[],
       lv3Partners:null,
       currentPage:1,
       ttlPage:null,
       response:null,
       loading:false,
       editing:true,
       backAfterPost:false,
       url:'agent/findAgent',
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
  	this.get()

  },
  methods:{
  	get(){
  		var url = publicFun.urlConcat(this.url,{
  			limit:3,
  			page:this.currentPage
  		})
  		publicFun.get(url,this,()=>{
  			console.log('partner res',this.response)
  			var data=this.response.body.data
        if(!data){
          return
        }
  			this.lv2Partners=this.lv2Partners.concat(data.data.agentLv2)
        this.ttlPage=data.pages
        console.log('partner',data)
        this.currentPage++
        if(this.currentPage===this.ttlPage){
          this.allGet=true
        }
        this.getting=false
      })
  	},
    scrolling(e){
        // console.log('scrolling')
        // this.loading=true
        // return
        // console.log('e',e.target.scrollTop)
        var el=document.querySelector('.list-container-inner')
        var btt=el.getBoundingClientRect().bottom
        // console.log('btt',btt)
        if(btt<(screen.height+50)&&this.currentPage<=this.ttlPage&&this.getting===false){
          this.getting=true
          this.get()
        }
      },
    },
    events: {},
    components: {
      // remind:remind,
    },
  }
</script>

<style lang='scss' scoped>
  .list-container{
    font-size: .3rem;
    line-height: 1.4;
    margin-top: 0.5rem;
  }

</style>
