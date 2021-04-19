# input输入框
> 关联组件<input\>

<fh-input\>是一个基于uniapp的input组件开发的输入框。继承了原组件的所有功能，并在此基础上增加清除输入框内容的功能，规避了原组件在iOS环境下使用软键盘的收起按钮收起键盘后点击非输入框部分会弹出软键盘的问题。
此处只列举新增属性，原有属性与事件可以查看官方文档[input](https://uniapp.dcloud.net.cn/component/input)
# 平台差异
兼容性与官方组件一致
# 安装方式
本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，通过**使用HBuilderX导入插件**或者**下载插件ZIP**，将解压出**fh-input**文件夹放到**components**目录下。
# API
## Props
| 属性名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| clearable | Boolean | true | false | 是否开启输入框清除功能 |
## Event
无新增事件
# 基本用法
~~~
<template>
    <fh-input v-model="value" :clearable="true"></fh-input>
</template>
<script>
export default{
    data(){
        return {
		    value: ''
		}
    }
}
</script>
~~~