<template>
  <div class="EIT">
    <div class="Panel__content">
      <Loader :is-loading="isLoading" />
      <div ref="sun" class="Sun">
        <div class="Sun__container" @mousedown="handleMouseDownRel">
          <canvas ref="canvas" class="Sun__image"></canvas>
        </div>
      </div>
    </div>
    <div class="Panel__footer">
      <div class="Timeline">
        <div ref="container" class="Timeline__progress" @click="handleClick">
          <div class="Timeline__bar">
            <div
              :style="{ transform: `scaleX(${value})` }"
              class="Timeline__fill"
            ></div>
          </div>
          <div
            :style="{ left: `${value * 100}%` }"
            class="Timeline__mark"
            @mousedown="handleMouseDown"
          >
            <div class="Timeline__markTop"></div>
            <div class="Timeline__markBottom"></div>
          </div>
        </div>
        <div class="Timeline__dates">
          <div class="Timeline__dateStart">{{ startDate }}</div>
          <div class="Timeline__dateCurrent">{{ currentDate }}</div>
          <div class="Timeline__dateEnd">{{ endDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  components: {
    Loader
  },
  data() {
    return {
      startDate: new Date(),
      endDate: new Date(),
      currentDate: new Date(),
      isLoading: false,
      value: 0
    }
  },
  methods: {
    handleMouseDown(e) {
      // console.log(e)
    },
    handleMouseDownRel(e) {
      // console.log(e)
    },
    handleClick(e) {
      // console.log(e)
    }
  }
}
</script>
