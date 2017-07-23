<template>
	<div class="tmpt-record " >
			<div class="record-container">
					<div class="avator">
						<slot name='avator'></slot>
					</div>
					<!-- <div class="loan-record" >{{item.applyId}}</div> -->
					<div class="record-brief">
						<div class="record-brief-up">
							<!-- <span class="record-name">{{item.name}}</span> -->
							<!-- <span class="record-time">{{item.createTime | timeParser}}</span> -->
							<span class="record-lt">
								<slot name='lt'></slot>
							</span>
							<span class="record-rt">
								<slot name='rt'></slot>
							</span>
						</div>
						<div class="record-brief-down">
							<!-- <span class="record-description">手机:{{item.phone}}</span> -->
							<!-- <span class="record-description">金额:{{item.amount||'comming'}}</span> -->
							<!-- <span class="record-status">{{item.status | statusParser}}</span> -->
							<span class="record-ld">
								<slot name='ld'></slot>
							</span>
							<!-- <span class="record-description"> -->
								<!-- <slot name=></slot> -->
							<!-- </span> -->
							<span class="record-rd">
								<slot name='rd'></slot>
							</span>
						</div>
					</div>
					<i class="el-icon-arrow-right"></i>
				</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
    	// loading:true,
     	
    }
  },
  props:{

  },
  filters:{
  	
  },
  methods:{},
  events: {},
  components: {}
}
</script>

<style>

</style>
