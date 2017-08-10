<template>
  <!-- <transition name='back'> -->

  <div id="footNav" class='foot-nav'>
      <span class='nav-btn' :class='{active:activeI===0}' @click='goPage(0)'>
         <div class="nav-icon"><i class="icon-home"></i></div>
         <div class="nav-item">首页</div>
     </span>
     <span class='nav-btn' :class='{active:activeI===1}' @click='goPage(1)'>
         <div class="nav-icon"><i class="icon-bookmarks"></i></div>
         <div class="nav-item">认证</div>
     </span>
     <span class='nav-btn' :class='{active:activeI===2}' @click='goPage(2)'>
         <div class="nav-icon"><i class="icon-file-text"></i></div>
         <div class="nav-item">借单</div>
     </span>
     <span class='nav-btn' :class='{active:activeI===3}' @click='goPage(3)'>
         <div class="nav-icon"><i class="icon-user"></i></div>
         <div class="nav-item">我们</div>
     </span>

 </div>
 <!-- </transition> -->
</template>

<script>
import router from './router'
import bus from './bus.js'
export default {
    data: function() {
        return {
            activeI: 0,
            showFoot: true,
            // footActive:true,
            paths: [ //显示footnav的路径
                '/index0',
                '/index',
                '/loan_bill',
                '/introduce',
                '/',
            ],
        }
    },
    methods: {
        goPage: function(index) {
            setTimeout(() => { //incase same foot component
                this.activeI = index
            }, 50);
            router.push(this.paths[index])
        },
        checkPath(p){
            //先判断是否显示
            //再判断显示哪个
            var arr=p.split('/')
            if(arr[2]!==undefined&&arr[2].length!==0){
                bus.$emit('foot_show_change',false)
                return
            }
            p='/'+arr[1]
            // console.log('? index',p.indexOf('?'))
            var queryMark=p.indexOf('?')

            if(queryMark>0){
                p=p.slice(0,queryMark)
            }

            // console.log('arr',arr)
            var index=this.paths.indexOf(p)
            // console.log('this.paths',p)
            if(index<0){
                bus.$emit('foot_show_change',false)
            }else{
                bus.$emit('foot_show_change',true)
                var splitPath=p.split('/')
                if(splitPath[1]===''){
                    this.activeI=0
                }else{
                this.activeI= this.paths.indexOf('/'+splitPath[1])
                }
            }

        },

    },
    // props:['activeI'],
    created: function() {
        router.beforeEach((to, from, next) => {
                // 先判断全路径
                // 1.判断前进还是后退
                //  下面代码
                // 2.判断是否显示foot
                // check path
                // if(!from.path){
                //     console.log('got the undefined path')
                //     next()
                // }
                // console.log('to', to.path)
                    // console.log('from', from.path)
                var depthTo = to.path.split('/').length
                var depthFrom = from.path.split('/').length
                    // console.log('depth',depthFrom,depthTo)
                // var name = to.name
                    // console.log('name',name)
                // var activeFoot = this.cmpntNames.indexOf(name)
                // if (activeFoot > 3) {
                    // if (activeFoot === 4) {
                        // activeFoot = 1
                    // }
                // }
                // console.log('activeFoot', activeFoot)
                // this.activeI = activeFoot
                var action
                if (depthTo > depthFrom) {
                    action = 'forward'
                } else if (depthTo < depthFrom) {
                    action = 'back'
                } else {
                    action = 'samelevel'
                }
                // console.log('action', action)
                bus.$emit('url_change', action)
                // if (activeFoot < 0) {
                //     bus.$emit('foot_show_change', false, action)
                // } else {
                //     bus.$emit('foot_show_change', true, action)
                // }
                this.checkPath(to.path)
                next()

            })
            // bus.$on('foot_index_change',(val)=>{
            // console.log('get change footindex',val)
            // this.activeI=val
            // })
                var self_ = this
        // var url = location.href
        var urlPath = location.pathnname
        // console.log('location',location)
        var urlHash = location.hash
        urlHash = urlHash.replace('#', '')
        // console.log('urlHash.indexOf()',urlHash.indexOf('?'))
        // var queryMark=urlHash.indexOf('?')
        // console.log('queryMark',queryMark)
        // if(queryMark>0){
            // urlHash=urlHash.slice(0,queryMark)
        // }
            // console.log('urlHash',urlHash.split('/')[1])
        this.checkPath(urlHash)
        // var aUrl = urlHash.split('/')
        // this.activeI = getIndex(this.paths, '/' + urlHash.split('/')[1])
        //     // console.log('getIndex(this.paths,urlHash)',getIndex(this.paths,urlHash))
        // function getIndex(arr, val) {
        //     var l = arr.length,
        //         i
        //     if (val == '/') {
        //         return 0
        //     }
        //     for (i = 0; i < l; i++) {
        //         if (arr[i] === val) {
        //             return i
        //         }
        //     }
        //     return -1
        // }
        // console.log('hash',urlHash)
    },
    components: {}
}
</script>
<style lang='scss' scoped>
	.hide-foot{
		display: none;
	}
</style>

