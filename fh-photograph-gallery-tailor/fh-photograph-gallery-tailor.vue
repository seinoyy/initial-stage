<template>
	<view v-if="show" class="person-avatar-edit">
		<view v-if="!hidden" class="person-avatar-edit__type-choice" @tap="close"></view>
		<view
			class="person-avatar-edit__choice-frame"
			:class="{ 'person-avatar-edit__choice-frame-hidden': hidden }"
		>
			<view class="person-avatar-edit__item" @tap="toCamera">拍照</view>
			<view class="person-avatar-edit__item" @tap="toAlbum">从本地相册选择</view>
			<view class="person-avatar-edit__space"></view>
			<view class="person-avatar-edit__item" @tap="close">取消</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'fh-photograph-gallery-tailor',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		width:{
			type: Number,
			default: 500
		},
		height:{
			type: Number,
			default: 500
		}
	},
	watch: {
		visible: {
			handler: function(newVal, oldVal) {
				if (newVal) {
					this.open()
				} else {
					this.close()
				}
			},
			immediate: true
		}
	},
	computed: {
		movePictureStyle() {
			const top = this.pictureTop + 'px'
			const left = this.pictureLeft + 'px'
			return {
				top,
				left
			}
		}
	},
	data() {
		return {
			show: false,
			hidden: true,
			echoImg: ''
		}
	},
	methods: {
		open: function() {
			this.show = true
			const that = this
			setTimeout(() => {
				that.hidden = false
			}, 100)
		},
		close: function() {
			this.hidden = true
			const that = this
			this.$emit('update:visible', false)
			setTimeout(() => {
				that.show = false
			}, 300)
		},
		toCamera: function() {
			// 开相机
			const cmr = plus.camera.getCamera()
			const res = cmr.supportedImageResolutions[0]
			const fmt = cmr.supportedImageFormats[0]
			console.log('Resolution: ' + res + ', Format: ' + fmt)
			const that = this
			cmr.captureImage(
				function(path) {
					console.log(path)
					that.echoImg = path
					 that.$emit('echoImg',that.echoImg)
				},
				function(error) {
					console.log('Capture image failed: ' + error.message)
				},
				{
					resolution: res,
					format: fmt,
					crop: {
						width: that.width,
						height: that.height,
						resize: true
					}
				}
			)
		},
		toAlbum: function() {
			// 开我的相册
			console.log('开我的相册')
			const that = this
			plus.gallery.pick(
				function(path) {
					that.echoImg = path.files[0]
					that.$emit('echoImg',that.echoImg)
				},
				function(e) {
					console.log('取消选择图片')
				},
				{
					filter: 'image',
					multiple: false,
					crop: {
						width: that.width,
						height: that.height,
						resize: true
					}
				}
			)
		},
		/* 根据屏幕进行计算*/
		widthConversion: function(width) {
			const widthStr = uni.getSystemInfoSync().screenWidth
			const screenWidth = Number.isNaN(widthStr) ? 0 : Number.parseFloat(widthStr + '')
			return (width * screenWidth) / 375
		},
		heightConversion: function(height) {
			const heightStr = uni.getSystemInfoSync().screenHeight
			const screenHeight = Number.isNaN(heightStr) ? 0 : Number.parseFloat(heightStr + '')
			return (height * screenHeight) / 812
		},
	}
}
</script>

<style lang="scss" scoped>
	@function px2vw($px) {
		@return $px / 375 * 100vw;
	}
	@function px2vh($px) {
		@return $px / 812 * 100vh;
	}
.person-avatar-edit {
	width: 0;
	height: 0;
	.person-avatar-edit__type-choice {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 500;
		background-color: rgba(#000000, 0.6);
	}
	.person-avatar-edit__choice-frame {
		position: absolute;
		top: 100vh;
		left: 0;
		width: 100%;
		transform: translate(0, -100%);
		z-index: 501;
		height: px2vh(204);
		background-color: #ffffff;
		border-radius: px2vw(8) px2vw(8) 0 0;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		.person-avatar-edit__item {
			width: 100%;
			height: px2vh(54);
			line-height: px2vh(54);
			font-family: PingFangSC-Regular;
			font-size: px2vw(17);
			color: #000000;
			text-align: center;
		}
		.person-avatar-edit__space {
			width: 100%;
			height: px2vh(8);
			background-color: #f5f7fa;
		}
	}
	.person-avatar-edit__choice-frame-hidden {
		transform: translate(0, 0);
	}
	.person-avatar-edit__transition {
		transition-property: transform;
		transition-timing-function: ease;
		transition-delay: 0s;
		transition-duration: 0.3s;
	}
}
</style>
