<template>
  <div class="">
    <form method="post" action="http://localhost:1337/upload" enctype="multipart/formData">
      <!-- <app-radio  :infos='sex' :defaultV='formData.sex'></app-radio> -->
      <hr>
      <app-pic></app-pic>
      <!-- <input type="file" name='test'> -->
      <input type="submit" value="submit">
    </form>
    <!-- <el-radio class="radio" v-model="radio" label="1">备选项</el-radio> -->
    <!-- <el-radio class="radio" v-model="radio" label="2">备选项</el-radio> -->

   <!--  <el-upload
    class="upload"
    action="http://localhost:8080/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload> -->
  <!-- <el-radio class="radio" v-model="radio" label="2">备选项</el-radio> -->
</div>
</template>

<script>
  import appRadio from './tmpts/radio.vue'
  import Pic from './tmpts/uploadSinglePic.vue'
  import bus from '../bus.js'

  export default {
    name: 'tst',
    data () {
      return {
        radio:0
        ,
        fileList:[],
        sex: {
          name: 'sex',
          options: [
          {
            id: 'female',
            value: 'female'
          }, {
            id: 'male',
            value: 'male'
          }, {
            id: 'gay',
            value: 'gay'
          },{
            id: '11',
            value: '11'
          },{
            id: '22',
            value: '22'
          },{
            id: '33',
            value: '33'
          }
          ]
        },
        formData:{
          sex:'male'
        }
      }
    },
    methods:{
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
    ,
    created:function(){
      var self_=this
      bus.$on(this.sex.name,function(val){
        self_.formData.sex=val
      })
    },
    watch:{

    },
    components: {
      'app-radio': appRadio,
      'app-pic': Pic
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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