# 从相册获取图片并回显
* `<fh-photograph-gallery-tailor></fh-photograph-gallery-tailor>`这个组件的主要功能是拍照、打开相册、裁剪并回显在页面，点击上传按钮弹出选择框，就可以选择打开相册还是拍照，最后进入到裁剪阶段，确定之后就将图片的路径显示在页面上。

# 安装方式
* 本组件符合easycom规范，通过使用**HBuilderX导入插件**或者**下载插件ZIP**，将解压出**fh-photograph-gallery-tailor**文件夹放到**components**目录下。

# 基本用法
```
<fh-photograph-gallery-tailor 
@echoImg="echoImg" 
:visible.sync="show" 
:width="500" 
:height="500"
></fh-photograph-gallery-tailor>
```
* 完整示例

```
<template>
	<view class="content">
		<view class="">
			<button type="default" @click="uploadClick">上传</button>
			<fh-photograph-gallery-tailor @echoImg="echoImg" :visible.sync="show" :width="500" :height="500"></fh-photograph-gallery-tailor>
		</view>
		<view class="img">
			<image class="echoimg" :src="resImg" mode="aspectFill"></image>
		</view>

	</view>
</template>

<script>
import fhPhotographGalleryTailor from '../../components/fh-photograph-gallery-tailor/fh-photograph-gallery-tailor.vue'
export default {
	components: {
		fhPhotographGalleryTailor
	},
	data() {
		return {
			show:false,
			resImg:''
		}
	},
	onLoad() {},
	methods: {
		uploadClick() {
			this.show = true
		},
		echoImg(res) {
			this.resImg = res
			this.show = false
		}
	}
}
</script>

<style lang="scss" scoped>
	.img{
		width: 100%;
		height: 100%;
		margin-top: 50px;
	}
	.echoimg{
		width: 500rpx;
		height: 500rpx;
	}
</style>


```
# 字段说明
| 序号 | 字段       | 说明           |
|------|-----------|----------------|
| 1    | @echoImg  | 回显图片的链接 |
| 2    | visible.sync  | 监听是否显示上传框 |
| 3    | width  | 裁剪图片的宽度，单位px |
| 4    | height  | 裁剪图片的高度，单位px |
