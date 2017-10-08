<template>
  <div class="simple-remindVue">
    <transition name="slide"  v-on:after-leave="afterLeave" v-on:afterEnter='afterEnter'>

      <div class="simple-remind" v-if='isShow'>
        <p class="remind-msg">{{msg}}</p>
      </div>

    </transition>
    <div class="cover"   v-if='isShow'  >

    </div>
  </div>
</template>

<script>
import bus from '../../bus.js'
export default {
  data() {
    // 显示
    // slide
    // disapear
    // callback
    return {

    }
  },
  created(){
    setTimeout(function() {
      bus.remindSimple.isShow=false
    }, 1000);
  },
  computed:{
    msg(){
      return bus.remindSimple.remindMsg
    },
    isShow(){
      return bus.remindSimple.isShow
    },
    cbLeave(){
      let nullFunc= ()=>{}
      return bus.remindSimple.cbLeave || nullFunc
    },
    cbEnter(){
      let nullFunc= ()=>{}
      return bus.remindSimple.cbEnter || nullFunc
    },
  },
  methods:{
    test(){
      bus.remindSimple.isShow=false
    },
    afterLeave(){
      this.cbLeave()
    },
    afterEnter(){
      setTimeout(()=> {
        this.cbEnter()
      }, 200);
    },
  },

  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.cover{
  position: fixed;
  background:transparent;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 99999;
}
.simple-remind{
  position: absolute;
  top: 0.4rem;
  width: 100%;
  z-index: 99999;
  background: #e0635c;
  /*transform: scaleY(1);*/
  transform-origin: top;
  transition: 1s linear;
}
.remind-msg{
  color:#fff;
  font-size: 0.16rem;
  line-height: 0.2rem;
  margin:0.05rem;
}

.slide-enter-to{
  transform:  scaleY(1);
}
.slide-enter{
  transform:scaleY(0);
}
.slide-leave-active{
  transition: 0.2s cubic-bezier(0.24, 1.13, 1, 1);
}
.slide-enter-active{
  transition: 0.2s cubic-bezier(0.24, 1.13, 1, 1);
}
.slide-leave-to {
  transform: scaleY(0);
}
</style>