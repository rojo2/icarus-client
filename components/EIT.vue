<template>
  <div class="EIT">
    <Loader :is-loading="isLoading" />
    <div ref="sun" class="Sun">
      <div class="Sun__container" @mousedown="handleMouseDownRel">
        <canvas ref="canvas" class="Sun__image"></canvas>
      </div>
    </div>
    <div class="Timeline">
      <div ref="container" class="Timeline__progress" @click="handleClick">
        <div class="Timeline__bar">
          <div
            :style="{ transform: `scaleX(${value})` }"
            class="Timeline__fill"
          ></div>
        </div>
        <div class="Timeline__dates">
          <div class="Timeline__dateStart">{{ formattedStartDate }}</div>
          <div class="Timeline__dateCurrent">{{ formattedCurrentDate }}</div>
          <div class="Timeline__dateEnd">{{ formattedEndDate }}</div>
        </div>
      </div>
      <div class="Timeline__dates">
        <div class="Timeline__dateStart">{{ startDate }}</div>
        <div class="Timeline__dateCurrent">{{ currentDate }}</div>
        <div class="Timeline__dateEnd">{{ endDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api'
import utils from '@/utils'

export default {
  name: 'EIT',
  props: {
    filter: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),

      filters: {},
      isLoading: false,

      value: 0,
      index: 0,

      loaded: 0,
      total: 0,
      errored: 0
    }
  },
  computed: {
    formattedStartDate() {
      return utils.formatDate(this.startDate)
    },
    formattedEndDate() {
      return utils.formatDate(this.endDate)
    },
    formattedCurrentDate() {
      const start = this.startDate.getTime()
      const end = this.endDate.getTime()
      const current = this.value * (end - start) + start
      return utils.formatDateTime(new Date(current))
    }
  },
  watch: {
    filter(value) {
      this.loadImages(value)
    },
    isLoading(value) {
      if (!value) {
        this.requestTimeout()
      } else {
        this.cancelTimeout()
      }
    },
    index(value) {
      const filter = this.filter
      if (this.filters[filter] && this.filters[filter].length > 0) {
        const { canvas, sun: container } = this.$refs
        const { width, height } = container.getBoundingClientRect()
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')
        const filter = this.filter
        const image = this.filters[filter][this.index]
        if (image) {
          const size = Math.min(width, height)
          context.save()
          context.translate(canvas.width * 0.5, canvas.height * 0.5)
          context.drawImage(image, -size * 0.5, -size * 0.5, size, size)
          context.restore()
        }
      }
    }
  },
  mounted() {
    this.loadImages(this.filter)
  },
  beforeDestroy() {
    this.cancelTimeout()
  },
  methods: {
    updateValue(newValue) {
      const clampedNewValue = Math.max(0, Math.min(1, newValue))
      const filter = this.filter
      if (this.filters[filter] && this.filters[filter].length > 0) {
        this.value = clampedNewValue
        this.index = Math.round(
          clampedNewValue * (this.filters[filter].length - 1)
        )
      }
      this.$emit('change', clampedNewValue)
    },
    updateValueFromEvent(e) {
      const { left, width } = this.$refs.container.getBoundingClientRect()
      const newValue = (e.clientX - left) / width
      this.updateValue(newValue)
    },
    handleMouseDownRel(e) {
      if (e.button === 0 && !this.isLoading) {
        this.cancelTimeout()
        document.addEventListener('mouseup', this.handleMouseUpRel)
        document.addEventListener('mousemove', this.handleMouseMoveRel)
        this.startX = e.clientX
        this.currentX = e.clientX
      }
    },
    handleMouseMoveRel(e) {
      const { width } = this.$refs.sun.getBoundingClientRect()
      const newValue = this.value + (e.clientX - this.currentX) / width
      this.startX = this.currentX
      this.currentX = e.clientX
      this.updateValue(newValue)
    },
    handleMouseUpRel(e) {
      if (e.button === 0) {
        document.removeEventListener('mouseup', this.handleMouseUpRel)
        document.removeEventListener('mousemove', this.handleMouseMoveRel)
        this.requestTimeout(5000)
      }
    },
    handleMouseDown(e) {
      if (e.button === 0 && !this.isLoading) {
        this.cancelTimeout()
        document.addEventListener('mouseup', this.handleMouseUp)
        document.addEventListener('mousemove', this.handleMouseMove)
      }
    },
    handleMouseMove(e) {
      this.updateValueFromEvent(e)
    },
    handleMouseUp(e) {
      if (e.button === 0) {
        document.removeEventListener('mouseup', this.handleMouseUp)
        document.removeEventListener('mousemove', this.handleMouseMove)
        this.requestTimeout(5000)
      }
    },
    handleClick(e) {
      this.cancelTimeout()
      this.updateValueFromEvent(e)
    },
    handleTimeout() {
      const filter = this.filter
      const length =
        (filter in this.filters && this.filters[filter].length - 1) || 0
      const value =
        this.value >= 1.0 && length > 0 ? 0.0 : this.value + 1 / length

      this.value = value
      this.index = Math.round(value * length)

      this.$emit('change', value)

      this.requestTimeout()
    },
    cancelTimeout() {
      if (this.timeoutID !== null) {
        clearTimeout(this.timeoutID)
        this.timeoutID = null
      }
    },
    requestTimeout(timeout = 96) {
      if (this.timeoutID !== null) {
        this.cancelTimeout()
      }
      this.timeoutID = setTimeout(this.handleTimeout, timeout)
    },
    loadImages(filter) {
      if (this.filters[filter] && this.filters[filter].length > 0) {
        return Promise.resolve(this.filters[filter])
      }

      if (!this.isLoading) {
        this.isLoading = true
      }

      this.loaded = this.errored = this.total = 0

      const minDate = utils.daysFrom(-7)
      return API.getImageChannels({
        channeltype: filter,
        date_min: minDate
      })
        .then((res) => {
          const images = res.data
          this.total = images.length
          utils.time(images)
          const startDate = new Date(utils.min(images, 'time'))
          const endDate = new Date(utils.max(images, 'time'))
          this.data = images
          this.startDate = startDate
          this.endDate = endDate
          return Promise.all(
            images.map((image) => {
              return new Promise((resolve, reject) => {
                function handler(e) {
                  if (e.type === 'load') {
                    this.loaded++
                    return resolve(e.target)
                  }
                  this.errored++
                  return reject(e)
                }

                // TODO: Esto molaría pasarlo a un helper
                const img = new Image()
                img.addEventListener('load', handler)
                img.addEventListener('error', handler)
                img.addEventListener('abort', handler)
                img.crossOrigin = 'anonymous'
                img.src = image.image
              })
            })
          )
        })
        .then((images) => {
          this.filters[filter] = images
          this.isLoading = false
          return images
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.Controls {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  bottom: 2rem;
  right: 2rem;
}

.Unit {
  color: #609f8e;
}

.EIT {
  flex: 1 0;
  display: flex;
  position: relative;
  flex-direction: column;
}
.Sun {
  position: absolute;
  top: 1rem;
  left: 0;
  bottom: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Sun__container {
  display: inline-block;
  margin: auto;
  position: relative;
  background-color: #000;
  border-radius: 50%;
}
.Sun__date {
  position: absolute;
  right: 0;
  font-size: 1.25rem;
  bottom: 1rem;
  color: #609f8e;
}
.Sun__vignette {
  display: inline-block;
  position: relative;
  margin: auto;
}
.Sun__image {
  position: relative;
  display: block;
  margin: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  border: 4px solid #000;
}
.Sun__container:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: inset 0 0 4rem 2.5rem #000;
  z-index: 10;
}
.Timeline {
  margin: 1rem 0 1rem;
  flex: 1 0 auto;
}
.Timeline__progress {
  height: 1rem;
  position: relative;
}
.Timeline__progress:before,
.Timeline__progress:after {
  position: absolute;
  content: '';
  top: 0;
  height: 2px;
  width: 2px;
  background-color: #ebfaf6;
  z-index: 100;
}
.Timeline__progress:before {
  left: 0;
}
.Timeline__progress:after {
  right: 0;
}
.Timeline__bar {
  position: absolute;
  width: 100%;
  top: 0;
  height: 2px;
  background-color: rgba(96,159,142,0.2);
}
.Timeline__fill {
  position: absolute;
  height: 2px;
  top: 0;
  left: 0;
  width: 100%;
  transform-origin: 0 0;
  background-color: #609f8e;
}
.Timeline__mark {
  cursor: pointer;
  height: 1.5rem;
  position: absolute;
  top: -0.75rem;
  margin-top: 1px;
  margin-left: -0.4rem;
  background-color: #ebfaf6;
}
.Timeline__mark:hover .Timeline__markTop {
  border-top-color: #ebfaf6;
}
.Timeline__mark:hover .Timeline__markBottom {
  border-bottom-color: #ebfaf6;
}
.Timeline__markTop,
.Timeline__markBottom {
  position: absolute;
  width: 0;
  height: 0;
  border: 0.4rem solid transparent;
}
.Timeline__markTop {
  border-top-color: #eb8947;
  top: 0;
}
.Timeline__markBottom {
  border-bottom-color: #eb8947;
  bottom: 0;
}
.Timeline__dates {
  display: flex;
  font-size: 0.875rem;
  height: 1rem;
}
.Timeline__dateCurrent {
  flex: 1 0 50%;
  text-align: center;
  color: #ebfaf6;
}
.Timeline__dateStart {
  flex: 0 0 25%;
}
.Timeline__dateEnd {
  flex: 0 0 25%;
  text-align: right;
}
</style>