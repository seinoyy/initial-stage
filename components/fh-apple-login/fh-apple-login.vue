<template>
	<view v-if="show" class="fh-apple-login-main" @click="appleLogin">
		<slot>
			<view class="fh-apple-login-button">
				<view class="fh-apple-icon"></view>
				{{ content }}
			</view>
		</slot>
	</view>
</template>

<script>
import utils from './utils.js'
export default {
	name: 'FhAppleLogin',
	props: {
		content: {
			type: String,
			default: '通过apple账号登录'
		}
	},
	mounted: async function() {
		this.show = await this.serviceCheck()
	},
	data() {
		return {
			show: false
		}
	},
	methods: {
		appleLogin: async function() {
			let result
			try {
				result = await utils.appleLogin()
				this.$emit('afterAppleLogin', result.authResult)
			} catch (e) {
				console.error(e)
			}
		},
		serviceCheck: async function() {
			try {
				const service = await utils.getThirdService('apple')
				return !!service
			} catch (e) {
				return false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.fh-apple-login-main {
	width: 146.49rpx;
	height: 33.7rpx;
	border-radius: 4.4rpx;
	border: 0.74rpx solid #333333;
	.fh-apple-login-button {
		width: 146.49rpx;
		height: 33.7rpx;
		border-radius: 4.4rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 33.7rpx;
		font-family: PingFangSC-Medium;
		font-size: 11.72rpx;
		color: #333333;
		.fh-apple-icon {
			width: 11.72rpx;
			height: 11.72rpx;
			background-image: url(../../static/fh-apple-login/fh-apple-icon.png);
			background-repeat: no-repeat;
			background-size: contain;
			margin-right: 7.33rpx;
		}
	}
}
</style>
