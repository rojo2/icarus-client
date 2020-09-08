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
</template>

<script>
export default {
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
    handleMouseDown () {
      // console.log(e)
    },
    handleMouseDownRel () {
      // console.log(e)
    },
    handleClick () {
      // console.log(e)
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