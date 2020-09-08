<template>
  <svg class="Graph__image" width="100%" height="100%" :viewBox="viewBox">
    <g data-width="{dataWidth}" transform="{transform}">
      <g>
        <!-- {xLines} -->
        <g v-for="line in xLines" :key="line.key" class="tick">
          <line :x1="line.x" :x2="line.x" :y1="line.y" :y2="height" />
        </g>

        <g class="Graph__density">
          {{ density }}
        </g>
        <g class="Graph__temperature">
          {{ temperature }}
        </g>
        <g class="Graph__axis" transform="{`translate(0,${height})`}">
          {{ xTicks }}
        </g>
        <g class="Graph__axis" transform="translate(0,0)">
          <g
            v-for="tick in yDensityTicks"
            :key="tick.key"
            class="tick"
            :transform="tick.transform"
          >
            <text x="0" y="0" style="text-anchor: end">
              {{ tick.value.toExponential(1) }}
            </text>
          </g>

          <text
            class="Graph__text"
            transform="rotate(-90)"
            style="text-anchor: end"
          >
            Density (P/cm³)
          </text>
        </g>
        <g class="Graph__axis" transform="{`translate(${width},0)`}">
          {{ yTemperatureTicks }}
          <text
            class="Graph__text"
            transform="rotate(90)"
            style="text-anchor: start"
          >
            Temperature (K)
          </text>
        </g>
      </g>
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
import utils from '@/utils'

export default {
  computed: {
    width() {
      return 500
    },
    height() {
      return 500
    },
    mWidth() {
      return this.width
    },
    mHeight() {
      return this.height
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    xLines() {
      return this.xAxis.map((value, index, list) => {
        const x = utils.interpolate(
          (value - this.minX) / (this.maxX - this.minX),
          0,
          this.width
        )
        const y = 0
        const key = `x-line${x}_${y}`
        return {
          x,
          y,
          key
        }
      })
    },
    yTemperatureMax() {
      return utils.maxOf(this.data, 'temperature')
    },
    yTemperatureMin() {
      return utils.minOf(this.data, 'temperature')
    },
    yTemperatureTicks() {
      return utils
        .ticks(this.yTemperatureMin, this.yTemperatureMax)
        .map((value, index, list) => {
          const x = 16
          const y = utils.interpolate(
            (value - this.yTemperatureMin) / (this.yTemperatureMax - this.yTemperatureMin),
            this.height,
            0
          )
          const transform = `translate(${x},${y})`
          return (
            <g className="tick" transform={transform} key={value}>
              <text x="0" y="0" style={{ textAnchor: 'start' }}>
                {value.toExponential(1)}
              </text>
            </g>
          )
        })
    },
    yDensityMin() {
      return utils.minOf(this.data, 'density')
    },
    yDensityMax() {
      return utils.maxOf(this.data, 'density')
    },
    yDensityTicks() {
      return utils
        .ticks(this.yDensityMin, this.yDensityMax)
        .map((value, index, list) => {
          const x = -16
          const y = utils.interpolate(
            (value - this.yDensityMin) / (this.yDensityMax - this.yDensityMin),
            this.height,
            0
          )
          const transform = `translate(${x},${y})`
          const key = `${x}_${y}`
          return {
            x,
            y,
            transform,
            key
          }
        })
    }
  }
}
</script>
