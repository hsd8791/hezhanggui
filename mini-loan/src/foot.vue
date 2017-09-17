<template>
  <!-- <transition name='back'> -->
  <div id="footNav" class='foot-nav'>
      <span class='nav-btn' :class='{active:activeI===0}' @click='goPage(0)'>
         <div class="nav-icon"><i class="icon-home"></i></div>
         <div class="nav-item">首页</div>
     </span>
     <span class='nav-btn' :class='{active:activeI===1}' @click='goPage(1)'>
     <!-- <span class='nav-btn' :class='{active:activeI===1}' @click=''> -->
         <div class="nav-icon"><i class="icon-cool"></i></div>
         <div class="nav-item">贷款超市</div>
     </span>
     <span class='nav-btn' :class='{active:activeI===2}' @click='goPage(2)'>
         <div class="nav-icon"><i class="icon-hammer"></i></div>
         <div class="nav-item">后台</div>
     </span>
     <span class='nav-btn' :class='{active:activeI===3}' @click='goPage(3)'>
         <div class="nav-icon"><i class="icon-user"></i></div>
         <div class="nav-item">我的</div>
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
                '/index',
                '/market_list', //paid_service
                '/manage',
                '/mine',
            ],
            specialPaths: [
                '/paid_service/create',
                '/paid_service/history',
                '/',
            ],
            cmpntNames: [
                'index',
                'market_list',
                'manage',
                'mine',
                'paidServiceHistory'
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
        getFirstRoute(p) {
            var splitPath = p.split('/')
            if (splitPath[1] === '') {
                this.activeI = 1
            } else {
                this.activeI = this.paths.indexOf('/' + splitPath[1])
            }
        },
        checkPath(p) {
            //先判断是否显示
            //再判断显示哪个
            //判断是否有二级
            // console.log('path',p)
            if (this.specialPaths.indexOf(p) >= 0) {
                bus.$emit('foot_show_change', true)
                this.getFirstRoute(p)
                return
            }
            var arr = p.split('/')
            if (arr[2] !== undefined && arr[2].length !== 0) {
                // console.log('no foot')
                bus.$emit('foot_show_change', false)
                return
            }
            //一级的路径
            p = '/' + arr[1]
            // console.log('? index', p.indexOf('?'))
            var queryMark = p.indexOf('?')

            if (queryMark > 0) {
                p = p.slice(0, queryMark)
            }

            // console.log('arr',arr)
            var index = this.paths.indexOf(p)
                // console.log('this.paths',p)
            if (index < 0) {
                bus.$emit('foot_show_change', false)
            } else {
                bus.$emit('foot_show_change', true)
                var splitPath = p.split('/')
                if (splitPath[1] === '') {
                    this.activeI = 0
                } else {
                    this.activeI = this.paths.indexOf('/' + splitPath[1])
                }
            }

        },
        wxDefaultConfig(){
            wx.onMenuShareAppMessage({
                title: '禾掌柜', // 分享标题
                desc: '禾掌柜-用户授信贷款管理', // 分享描述
                link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: ()=> { 
                  var remind=this.remind
                  remind.remindMsg='分享成功'
                  remind.remindOpts=[{msg:'完成'}]
                  remind.isShow=true
                },
                cancel: ()=> { 
                  // var remind=this.remind
                  // remind.remindMsg='取消分享'
                  // remind.remindOpts=[{msg:'确定'}]
                  // remind.isShow=true
                }
            });
        }

    },
    // props:['activeI'],
    created: function() {
        router.beforeEach((to, from, next) => {
            // 先判断全路径
            // 1.判断前进还是后退
            //  下面代码
            // 2.判断是否显示foot
            // check path
            // console.log('to', to.path)
            // console.log('from', from.path)
            // if(!from.path){
            //     console.log('got the undefined path')
            //     next()
            // }
            var depthTo = to.path.split('/').length
            var depthFrom = from.path.split('/').length
            var action
            if (depthTo > depthFrom) {
                action = 'forward'
            } else if (depthTo < depthFrom) {
                action = 'back'
            } else {
                action = 'samelevel'
            }
            bus.$emit('url_change', action)
            // console.log('to.path', to.path)
            this.checkPath(to.path)
            this.wxDefaultConfig()
            next()
        })

        var self_ = this
        var urlPath = location.pathnname
        var urlHash = location.hash
        urlHash = urlHash.replace('#', '')
        this.checkPath(urlHash)
    },
    components: {}
}
</script>
<style lang='scss' scoped>
	.hide-foot{
		display: none;
	}
</style>

