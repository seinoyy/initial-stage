<template>
	<view v-if="show" class="apple-login-main" @click="appleLogin">
		<slot>
			<button size="mini">{{ content }}</button>
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
.apple-login-main {
}
</style>
