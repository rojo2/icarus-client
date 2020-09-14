<template>
  <g>
    <!-- {xLines} -->
    <g v-for="line in xLines" :key="line.key" class="tick">
      <line :x1="line.x" :x2="line.x" :y1="line.y" :y2="height" />
    </g>

    <!-- {yLines} -->
    <g v-for="line in yLines" :key="line.key" class="tick">
      <line :x1="line.x" :x2="width" :y1="line.y" :y2="line.y" />
    </g>

    <path class="Graph__area Graph__color0" :d="a0" />
    <path class="Graph__line Graph__color0" :d="d0" />
    <path class="Graph__area Graph__color1" :d="a1" />
    <path class="Graph__line Graph__color1" :d="d1" />
    <g class="Graph__axis" :transform="`translate(0,${height})`">
      <!-- {{ xTicks }} -->
      <g
        v-for="tick in xTicks"
        :key="tick.key"
        class="tick"
        :transform="tick.transform"
      >
        <text x="0" y="0" style="text-anchor: middle">
          {{ tick.text }}
        </text>
      </g>
    </g>
    <g class="Graph__axis" transform="translate(0,0)">
      <!-- {{ yTicks }} -->
      <g
        v-for="tick in yTicks"
        :key="tick.key"
        class="tick"
        :transform="tick.transform"
      >
        <text x="0" y="0" style="text-anchor: end">
          {{ tick.value.toExponential(0) }}
        </text>
      </g>
      <text
        class="Graph__text"
        transform="rotate(-90)"
        style="text-anchor: end"
      >
        Protons/cm²-s-sr
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
    xMax() {
      return utils.maxOf(this.data, 'time', 2)
    },
    xMin() {
      return utils.minOf(this.data, 'time', 2)
    },
    yMin() {
      return 1
    },
    yMax() {
      return 1000000
    },
    d0() {
      return utils.path(
        utils.pointsLog(
          this.data[0],
          'time',
          'value',
          this.xMin,
          this.xMax,
          this.yMin,
          this.yMax
        ),
        this.width,
        this.height
      )
    },
    d1() {
      return utils.path(
        utils.pointsLog(
          this.data[1],
          'time',
          'value',
          this.xMin,
          this.xMax,
          this.yMin,
          this.yMax
        ),
        this.width,
        this.height
      )
    },
    a0() {
      return utils.areaPath(
        utils.pointsLog(
          this.data[0],
          'time',
          'value',
          this.xMin,
          this.xMax,
          this.yMin,
          this.yMax
        ),
        this.width,
        this.height
      )
    },
    a1() {
      return utils.areaPath(
        utils.pointsLog(
          this.data[1],
          'time',
          'value',
          this.xMin,
          this.xMax,
          this.yMin,
          this.yMax
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
    xAxis() {
      return utils.ticks(this.timeMin, this.timeMax)
    },
    yAxis() {
      return utils.ticksLog(this.yMin, this.yMax)
    },
    xTicks() {
      return utils
        .ticks(this.timeMin, this.timeMax)
        .map((value, index, list) => {
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
            text: utils.formatDate(new Date(value)),
            value,
            key
          }
          /*
        return (
          <g class="tick" transform={transform} key={value}>
            <text x="0" y="0" style="text-anchor: middle">
              {utils.formatDate(new Date(value))}
            </text>
          </g>
        )
        */
        })
    },
    yTicks() {
      return utils.ticks(this.yMin, this.yMax).map((value, index, list) => {
        const x = -16
        const y = utils.interpolate(index / list.length, this.height, 0)
        const transform = `translate(${x},${y})`
        const key = `${x}_${y}`
        return {
          x,
          y,
          transform,
          value,
          key
        }
        /*
        return (
          <g class="tick" transform={transform} key={key}>
            <text x="0" y="0" style="text-anchor: end">
              {value.toExponential(0)}
            </text>
          </g>
        )
        */
      })
    },
    xLines() {
      return this.xAxis.map((value, index, list) => {
        const x = utils.interpolate(index / list.length, 0, this.width)
        const y = 0
        const key = `x-line${x}_${y}`
        return {
          x,
          y,
          key,
          value
        }
        /*
        return (
          <g className="tick" key={key}>
            <line x1={x} x2={x} y1={y} y2={this.height} />
          </g>
        )
        */
      })
    },
    yLines() {
      return this.yAxis.map((value, index, list) => {
        const x = 0
        const y = utils.interpolate(index / list.length, 0, this.height)
        const key = `y-line${x}_${y}`
        return {
          x,
          y,
          key,
          value
        }
        /*
        return (
          <g className="tick" key={key}>
            <line x1={x} x2={this.width} y1={y} y2={y} />
          </g>
        )
        */
      })
    }
  }
}
</script>
