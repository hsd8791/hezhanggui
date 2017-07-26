<template>

  <div id="upload-vue" class="input">
    <h1 class="title"><app-back></app-back>附件上传</h1>
    <h2 class="sub-title">身份证正面：</h2>
    <pic-load :uploadConfig='uploadConfig[0]'></pic-load>
    <h2 class="sub-title">身份证背面：</h2>
    <pic-load :uploadConfig='uploadConfig[1]'></pic-load>
    <h2 class="sub-title">手持身份证照片：</h2>
    <pic-load :uploadConfig='uploadConfig[2]'></pic-load>
    <!-- <el-button type='success' @click='goBack'>返回</el-button> -->
    <!-- <div class="container"> -->
    <!-- </div> -->
  </div>

</div>
</template>

<script>
  import picLoad from './tmpts/uploadSinglePic.vue'
  import publicFun from '../js/public.js'
  export default {
    data() {
     return {
      orientedAdd:'',
      IDscanFront:[],
      imgHoldID:[],
      uploadConfig:[
      {url:'userInfo/addAccessory',data:{type:0},resKey:'idcardUrl',id:'IDscanFront'},
      {url:'userInfo/addAccessory',data:{type:2},resKey:'idcardUrl3',id:'IDscanBack'},
      {url:'userInfo/addAccessory',data:{type:1},resKey:'idcardUrl2',id:'imgHoldID'},
      ]

    }
  },

  methods:{
    goBack(){
      publicFun.goPage(-1)
    }
  },
  events: {},
  components: {
    'pic-load':picLoad
  }
}
</script>

<style lang='scss' scoped>
  *{
    /*border:1px solid red;*/
  }
  .input{
    .upload{
      width: 75%;
      margin-left: 25%;
    }
  }
</style>
