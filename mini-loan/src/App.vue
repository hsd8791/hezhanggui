<template>
  <div id="app">
 
    <router-view></router-view>
    <div id="footNav">
      <span class='nav-btn' :class='{active:activeI===0}' @click='goPage(0)'>首 页</span>
      <span class='nav-btn' :class='{active:activeI===1}' @click='goPage(1)'>说 明</span>
     <!--  <router-link class='nav-btn' :class='{active:activeI===0}' to='/index' @click='goPage(0)'>首页</router-link>
     <router-link class='nav-btn' :class='{active:activeI===1}' to='/descrip' @click='goPage(1)'>说明</router-link> -->
   </div>

 </div>
</template>

<script>
  import router from './router'
  export default {
    data:function() {
      return {
        activeI: 0,
        paths: [
          '/index',
          '/descrip'
        ]
      }
    },
    methods:{
      goPage:function(index){
        this.activeI=index
        router.push(this.paths[index])
        // console.log('router',router)
        // console.log('this.activeI',this.activeI)
      }
    },
    created:function(){
      // console.log('ready',window.location.href)
      // var parser = document.createElement('a');
      // parser.href =window.location.href
      // router.push(parser.pathname+parser.search+parser.hash)
    },
    components: {}
  }
</script>

<style lang="scss" scoped>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 0.6rem;*/
  }
  #footNav{
    width: 100%;
    background: rgba(222,222,222,1);
    position: fixed;
    height: 0.5rem;
    bottom: 0;
    display: flex;
    .nav-btn{
      width: 50%;
      height: 100%;
      text-decoration: none;
      display: inline-block;
      font-size: 0.24rem;
      vertical-align: center;
      line-height: 0.5rem;
      color: #fff;
      /*position: relative;*/

    }
    .active{
      background: #eee;
      color:#cd331c;
    }
  }

</style>
