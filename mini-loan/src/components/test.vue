<template>
  <div class="">
    <form method="get" action="index">

      <h1>{{ msg }}11ww</h1>
      <!-- :name='sex.name' -->
      <app-radio class='test' v-for='item in sex.options' :id='item.id'  :value='item.value' :key='item.id' :name='sex.name' :default='formData.sex'></app-radio> 
      <input type="submit" value="submit"> 
    </form>
    <!-- <app-radio></app-radio>  -->
  </div>
</template>

<script>
  import appRadio from './tmpts/radio.vue'
  import bus from './bus.js'

  export default {
    name: 'tst',
    data () {
      return {
        msg: 'this is a test template',
        sex: {
          name: 'sex',
          options: [{
            id: 'female',
            value: 'female'
          }, {
            id: 'male',
            value: 'male'
          }, {
            id: 'gay',
            value: 'gay'
          }]
        },
        formData:{
          sex:'male'
        }
      }
    },
    created:function(){
      var self_=this
      bus.$on(this.sex.name,function(val){
        self_.formData.sex=val
      })
    },
    watch:{
      'formData.sex':function(val,oldV){
        console.log('val',val, oldV)
      }
    },
    components:{
      'app-radio':appRadio
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1{
    font-size: 0.25rem;
    background: red
  }
</style>