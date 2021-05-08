# 苹果授权登录DIY组件

<fh-apple-login\>是一个集成苹果授权登录的可定制组件，组件打通苹果账号授权流程并返回登录成功后的信息。本组件使用需要配合部分配置的设置具体可以参考[iOS 苹果授权登录（Sign in with Apple）/Apple登录/苹果登录集成教程](https://ask.dcloud.net.cn/article/36651)。
# 平台差异
一般是有三方登录的app在app store发布需要用到
# 安装方式
本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，通过**使用HBuilderX导入插件**或者**下载插件ZIP**，将解压出**fh-apple-login**文件夹放到**components**目录下。
# API
## Props
| 属性名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| content | String | - | 通过apple账号登录 | 初始按钮文字 |
## Event
| 事件名 | 返回参数 | 说明 |
|--------|------|--------|
| afterAppleLogin | authResult | 苹果返回的账号登录结果，里面包含accessToken和openId，可以接入自己的用户系统 |
## Slot
| slot名 | 属性 | 说明 |
|--------|-----|------|
| default | - | 自定义标签，可以根据需要换成自己的按钮、图标、链接等 |
# 基本用法
~~~
<template>
    <fh-apple-login @afterAppleLogin="afterAppleLogin" :content="content"></fh-apple-login>
</template>
<script>
export default{
    data(){
        return {
		    content: 'Sign in with Apple'
		}
    },
	methods: {
		afterAppleLogin: function({ accessToken, openId }){
			console.info(accessToken)
			console.info(openId)
		}
	}
}
</script>
~~~