<template>
  <div class="Graph__legends">
    <a href="#" class="Graph__legend">
      <div :class="classes10"></div>
      <div class="Graph__legendLabel">{{ particle10 }}</div>
    </a>
    <a href="#" class="Graph__legend">
      <div :class="classes100"></div>
      <div class="Graph__legendLabel">{{ particle100 }}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: [Array],
      default() {
        return []
      }
    }
  },
  computed: {
    classes10() {
      return this.particle10 === 'temperature'
        ? 'Graph__legendColor--solarWind2'
        : 'Graph__legendColor--particle10'
    },
    classes100() {
      return this.particle10 === 'temperature'
        ? 'Graph__legendColor--solarWind1'
        : 'Graph__legendColor--particle100'
    },
    particle10() {
      return (this.data && 0 in this.data && this.data[0].name) || 'temperature'
    },
    particle100() {
      return (this.data && 1 in this.data && this.data[1].name) || 'density'
    }
  }
}
</script>
