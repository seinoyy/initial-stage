<template>
	<view>
		<input
			class="my-input-class"
			:class="{ 'my-input-width': clearable }"
			:type="currentType"
			:value="currentValue"
			:placeholder="placeholderShow ? placeholder : ''"
			:password="password"
			:maxlength="maxlength"
			:disabled="finalDisabled"
			:focus="finalFocus"
			:placeholder-style="placeholderStyle"
			:placeholder-class="placeholderClass"
			:cursor-spacing="cursorSpacing"
			:confirm-type="confirmType"
			:confirm-hold="confirmHold"
			:cursor="cursor"
			:selection-start="selectionStart"
			:selection-end="selectionEnd"
			:auto-blur="autoBlur"
			@input="input"
			@click="inputClick($event)"
			@focus="inputFocus"
			@blur="inputBlur"
			@confirm="inputConfirm"
		/>
		<view v-if="clearable" class="clear-icon-view">
			<icon
				v-show="showClear"
				type="clear"
				:size="iconSize"
				color="#999999"
				@click="$emit('input', '')"
			/>
		</view>
	</view>
</template>

<script>
export default {
	name: 'MyInput',
	props: {
		type: {
			type: String,
			default: 'text'
		},
		value: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ''
		},
		maxlength: {
			type: Number,
			default: 140
		},
		password: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		focus: {
			type: Boolean,
			default: false
		},
		placeholderStyle: {
			type: String,
			default: ''
		},
		placeholderClass: {
			type: String,
			default: 'input-placeholder'
		},
		cursorSpacing: {
			type: Number,
			default: 0
		},
		confirmType: {
			type: String,
			default: 'done'
		},
		confirmHold: {
			type: Boolean,
			default: false
		},
		cursor: {
			type: Number,
			default: undefined
		},
		selectionStart: {
			type: Number,
			default: -1
		},
		selectionEnd: {
			type: Number,
			default: -1
		},
		autoBlur: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		inputModel: {
			type: Number,
			default: 0
		}
	},
	computed: {
		finalDisabled() {
			return this.disabled || this.innerDisabled
		},
		finalFocus() {
			return this.focus || this.innerFocus
		},
		showClear() {
			return this.clearable && !!this.value
		},
		currentType() {
			return this.type == 'number' ? 'text' : this.type
		}
	},
	watch: {
		value: {
			handler: function(newVal, oldVal) {
				this.currentValue = newVal
			},
			immediate: true
		}
	},
	data() {
		return {
			innerDisabled: false,
			innerFocus: false,
			currentValue: '',
			placeholderShow: true,
			iconSize: uni.upx2px(11.72)
		}
	},
	methods: {
		input: function({ detail: { value } }) {
			if (this.type == 'number' && value && !/^\d*$/.test(value)) {
				this.currentValue = value
				const currentValue = value.replace(/\D/g, '')
				this.$nextTick(() => {
					this.currentValue = currentValue
					this.$emit('input', currentValue)
				})
			} else {
				this.$emit('input', value)
			}
		},
		inputClick: function(e) {
			if (this.innerDisabled == true) {
				this.innerDisabled = false
				this.innerFocus = false
				this.$nextTick(() => {
					this.innerFocus = true
				})
			}
			if (this.inputModel) {
				this.placeholderShow = false
			}
			this.$emit('click')
		},
		inputFocus: function({ detail: { value, height } }) {
			this.$emit('focus', { value, height })
		},
		inputBlur: function({ detail: { value } }) {
			this.value == value
			this.$nextTick(() => {
				const keyboardHeight = uni.getStorageSync('keyboardHeight')
				if (!keyboardHeight || keyboardHeight == '0') {
					this.innerDisabled = true
				}
			})
			this.placeholderShow = true
			this.$emit('blur', value)
		},
		inputConfirm: function({ detail: { value } }) {
			this.$emit('confirm', value)
		}
	}
}
</script>

<style lang="scss" scoped>
.my-input-class {
	height: calc(100% - 0.74rpx);
	float: left;
	width: 100%;
	font: inherit;
}
.my-input-width {
	width: calc(100% - 11.72rpx);
}
.clear-icon-view {
	float: left;
	width: 11.72rpx;
	& > uni-icon {
		vertical-align: middle;
	}
}
/deep/ .uni-icon-clear::before {
	content: '\EA0F';
}
</style>
