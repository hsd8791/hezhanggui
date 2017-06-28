<template>
	<div>
		<div id="location">{{orientedAdd}}</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orientedAdd:''
			}
		},
		methods:{},
		events: {},
		created:function(){
			var self_=this
			var mapSrc='http://webapi.amap.com/maps?v=1.3&key=88803f8a6ef6758ba4e2ba70b425e43c'
			var mapScript=document.createElement('script')
			mapScript.src=mapSrc
			document.body.appendChild(mapScript)
			mapScript.onload=function(){
				console.log('Amap loaded',this.readyState )
				var map, geolocation;
				map = new AMap.Map('', {
					resizeEnable: true
				});
				map.plugin('AMap.Geolocation', function() {
					geolocation = new AMap.Geolocation({
						enableHighAccuracy: false,
						timeout: 10000,         
						buttonOffset: new AMap.Pixel(10, 20),
						zoomToAccuracy: true,
						buttonPosition:'RB'
					});
					map.addControl(geolocation);
					geolocation.getCurrentPosition();
					AMap.event.addListener(geolocation, 'complete', onComplete);
					AMap.event.addListener(geolocation, 'error', onError);      
				});
				function onComplete(data) {
					console.log('data',data)
					var str=['定位成功'];
					str.push('经度：' + data.position.getLng());
					str.push('纬度：' + data.position.getLat());
					str.push('纬度：' + data.position.getLat());
					if(data.accuracy){
						str.push('精度：' + data.accuracy + ' 米');
					}
					str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
					console.log('oriented',str)
					console.log('oriented',data.formattedAddress)
					console.log('this.orientedAdd',self_)
					self_.orientedAdd=data.formattedAddress
				}
				function onError(data) {
					console.log('定位失败')
				}
			}
		},
		components: {}
	}
</script>

<style lang='scss' scoped>

</style>
