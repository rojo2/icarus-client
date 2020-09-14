<template>
  <g>
    <g v-for="line in xLines" :key="line.key" class="tick">
      <line :x1="line.x" :x2="line.x" :y1="line.y" :y2="height" />
    </g>

    <g class="Graph__density">
      <rect
        v-for="dot in density"
        :key="dot.key"
        class="Graph__dot"
        :x="dot.x"
        :y="dot.y"
        :width="dot.w"
        :height="dot.h"
      ></rect>
    </g>

    <g class="Graph__temperature">
      <rect
        v-for="dot in temperature"
        :key="dot.key"
        class="Graph__dot"
        :x="dot.x"
        :y="dot.y"
        :width="dot.w"
        :height="dot.h"
      ></rect>
    </g>

    <g class="Graph__axis" :transform="`translate(0,${height})`">
      <g
        v-for="tick in xTicks"
        :key="tick.key"
        :transform="tick.transform"
        class="tick"
      >
        <text x="0" y="0" style="text-anchor: middle">
          {{ tick.text }}
        </text>
      </g>
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

    <g class="Graph__axis" :transform="`translate(${width},0)`">
      <g
        v-for="tick in yTemperatureTicks"
        :key="tick.key"
        :transform="tick.transform"
        class="tick"
      >
        <text x="0" y="0" style="text-anchor: start">
          {{ tick.value.toExponential(1) }}
        </text>
      </g>

      <text
        class="Graph__text"
        transform="rotate(90)"
        style="text-anchor: start"
      >
        Temperature (K)
      </text>
    </g>
  </g>
</template>

<script>
import utils from '@/utils'

export default {
  props: {
    data: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    width: {
      type: Number,
      default: 1044 - 128
    },
    height: {
      type: Number,
      default: 618 - 36
    }
  },
  computed: {
    temperature() {
      if (!this.data || !this.data.length) {
        return []
      }
      return utils.dots(
        utils.points(
          this.data[0],
          'time',
          'temperature',
          this.xMin,
          this.xMax,
          this.yTemperatureMin,
          this.yTemperatureMax
        ),
        this.width,
        this.height
      )
    },
    density() {
      if (!this.data || !this.data.length) {
        return []
      }
      return utils.dots(
        utils.points(
          this.data[0],
          'time',
          'density',
          this.xMin,
          this.xMax,
          this.yDensityMin,
          this.yDensityMax
        ),
        this.width,
        this.height
      )
    },
    timeMin() {
      return new Date(this.xMin).getTime()
    },
    timeMax() {
      return new Date(this.xMax).getTime()
    },
    xMin() {
      return utils.minOf(this.data, 'time')
    },
    xMax() {
      return utils.maxOf(this.data, 'time')
    },
    xAxis() {
      return utils.ticks(this.timeMin, this.timeMax)
    },
    xTicks() {
      return this.xAxis.map((value, index, list) => {
        const x = utils.interpolate(
          (value - this.xMin) / (this.xMax - this.xMin),
          0,
          this.width
        )
        const y = 24
        const transform = `translate(${x},${y})`
        const key = `${x}_${y}_${value}`
        return {
          x,
          y,
          transform,
          value,
          text: utils.formatDate(new Date(value)),
          key
        }
      })
    },
    xLines() {
      return this.xAxis.map((value, index, list) => {
        const x = utils.interpolate(
          (value - this.xMin) / (this.xMax - this.xMin),
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
            (value - this.yTemperatureMin) /
              (this.yTemperatureMax - this.yTemperatureMin),
            this.height,
            0
          )
          const transform = `translate(${x},${y})`
          const key = `${x}_${y}${(
            Math.random() * Number.MAX_SAFE_INTEGER
          ).toString(16)}`
          return {
            x,
            y,
            value,
            transform,
            key
          }
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
          const key = `${x}_${y}${(
            Math.random() * Number.MAX_SAFE_INTEGER
          ).toString(16)}`
          return {
            x,
            y,
            value,
            transform,
            key
          }
        })
    }
  }
}
</script>
