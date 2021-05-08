<template>
	<view
		v-if="show"
		class="no-network-main"
		:style="{ height: backgroundHeight + 'px', width: backgroundWidth + 'px' }"
	>
		<view class="no-network-area">
			<view
				class="no-network-picture"
				:style="{ height: backgroundImageHeight, width: backgroundImageWidth }"
			></view>
			<view class="no-network-content">哎呀，网络信号丢失</view>
			<view class="no-network-handle">
				请检查网络，或前往
				<span class="go-to-sitting" @click="gotoSitting">设置</span>
			</view>
			<view class="no-network-retry" @click="retry">重试</view>
		</view>
	</view>
</template>

<script>
import gotoAppPermissionSetting from './utils.js'
export default {
	name: 'FhNoNetwork',
	mounted() {
		const that = this
		// #ifdef APP-PLUS
		uni.getNetworkType({
			success: function(res) {
				console.log(res)
				if (res.networkType == 'none' || res.networkType == 'unknown') {
					that.shrink()
				} else {
					that.unfold()
				}
			}
		})
		// #endif
		uni.onNetworkStatusChange(function(res) {
			if (res.isConnected) {
				that.unfold()
				console.log(res.networkType)
			} else {
				that.shrink()
			}
		})
	},
	computed: {
		backgroundImageWidth() {
			if (this.backgroundWidth < 768) {
				return this.backgroundWidth + 'px'
			}
			return '439.46rpx'
		},
		backgroundImageHeight() {
			if (this.backgroundWidth < 768) {
				return this.backgroundWidth / 2 + 'px'
			}
			return '219.73rpx'
		}
	},
	data() {
		return {
			show: false,
			backgroundHeight: uni.getSystemInfoSync().screenHeight,
			backgroundWidth: uni.getSystemInfoSync().screenWidth
		}
	},
	methods: {
		shrink: function() {
			this.show = true
		},
		unfold: function() {
			this.show = false
		},
		gotoSitting: function() {
			gotoAppPermissionSetting()
		},
		retry: function() {
			uni.getNetworkType({
				success: function(res) {
					console.log(res)
					if (res.networkType == 'none' || res.networkType == 'unknown') {
						uni.showToast({
							title: '无网络连接',
							icon: 'none'
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.no-network-main {
	position: absolute;
	top: 0;
	background-color: #ffffff;
	z-index: 10000;
	display: flex;
	justify-content: center;
	align-items: center;
	.no-network-area {
		.no-network-picture {
			background-image: url(../../static/fh-no-network/no-network.png);
			background-repeat: no-repeat;
			background-size: contain;
		}
		.no-network-content {
			width: 100%;
			text-align: center;
			height: 18.32rpx;
			line-height: 18.32rpx;
			color: #333333;
			font-family: PingFangSC-Medium;
			font-size: 13.19rpx;
			margin-bottom: 6.6rpx;
		}
		.no-network-handle {
			width: 100%;
			text-align: center;
			height: 14.65rpx;
			line-height: 14.65rpx;
			font-family: PingFangSC-Regular;
			font-size: 10.26rpx;
			color: #666666;
			margin-bottom: 29.3rpx;
		}
		.go-to-sitting {
			height: 14.65rpx;
			line-height: 14.65rpx;
			font-family: PingFangSC-Regular;
			font-size: 10.26rpx;
			color: #1677ff;
		}
		.no-network-retry {
			width: 209.48rpx;
			height: 33.7rpx;
			border: 1.47rpx solid #333333;
			border-radius: 16.48rpx;
			line-height: 32.23rpx;
			text-align: center;
			font-size: 11.72rpx;
			font-family: PingFangSC-Medium;
			letter-spacing: 1.18rpx;
			margin: 0 auto;
		}
	}
}
</style>
