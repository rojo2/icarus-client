<template>
  <svg class="Graph__image" width="100%" height="100%" :viewBox="viewBox">
    <g :transform="transform">
      <slot></slot>
      <line
        class="Graph__timeline"
        y1="0"
        :y2="height"
        :x1="value * mWidth"
        :x2="value * mWidth"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
      required: false
    },
    width: {
      type: Number,
      default: 0,
      required: false
    },
    height: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data() {
    return {
      margin: {
        top: 0,
        right: 64,
        bottom: 36,
        left: 64
      },
      resize: 0
    }
  },
  computed: {
    mWidth() {
      return this.width - (this.margin.left + this.margin.right)
    },
    mHeight() {
      return this.height - (this.margin.top + this.margin.bottom)
    },
    dataWidth() {
      return this.width - (this.margin.right + this.margin.left)
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    transform() {
      return `translate(${this.margin.left}, ${this.margin.top})`
    }
  }
}
</script>
