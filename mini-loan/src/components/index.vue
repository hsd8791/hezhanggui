<template>
  <div>
   <img src="../assets/img/banner.jpg" class='banner'>
    <h1 class='test' >禾掌柜</h1>
    <a class='apply' href='http://www.he577.com/hzgui/index.html'>申 请</a>
    <a class="runner" href="http://www.he577.com/hzgui/newCustomer.html">手机运营商</a>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    }
  }
</script>

<style lang='scss' scoped>
  .banner{
    width: 100%;
  }
  h1{
    font-size: 0.7rem;
    /*background: #cd331c;*/
    color:#cd331c;
    padding:0.2rem;
  }
  a{
    font-size: 0.3rem;
    display: block;
    border:2px #cd331c solid;
    border-radius: .2rem;
    width: 2rem;
    padding:0.1rem 0;
    margin:0.5rem auto;
    color: #cd331c;
    text-decoration: none;
  }
  .runner{
    border-color: #e49731;
    color:#e49731;
  }

</style>
