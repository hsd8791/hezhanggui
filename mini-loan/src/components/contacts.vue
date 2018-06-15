<template>
  <div class="container input">
    <h1 class="title"><app-back></app-back>联系方式</h1>
    <p class="contact">获客合作电话/微信：<a href="tel:16657272304">16657272304</a></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },
  methods:{},
  events: {},
  components: {}
}
</script>

<style lang='scss' scoped>
.container{
}
.contact{
  margin-top: 0.2rem;
  font-size: 0.2rem;
}

</style>
