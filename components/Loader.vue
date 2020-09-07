<template>
  <div :class="getClasses()">
    <svg viewBox="0 0 55 64" width="55" height="64" class="Loader__spinner">
      <rect x="0" y="0" width="1" height="64" class="Loader01"></rect>
      <rect x="6" y="0" width="1" height="64" class="Loader02"></rect>
      <rect x="12" y="0" width="1" height="64" class="Loader03"></rect>
      <rect x="18" y="0" width="1" height="64" class="Loader04"></rect>
      <rect x="24" y="0" width="1" height="64" class="Loader05"></rect>
      <rect x="30" y="0" width="1" height="64" class="Loader06"></rect>
      <rect x="36" y="0" width="1" height="64" class="Loader07"></rect>
      <rect x="42" y="0" width="1" height="64" class="Loader08"></rect>
      <rect x="48" y="0" width="1" height="64" class="Loader09"></rect>
      <rect x="54" y="0" width="1" height="64" class="Loader10"></rect>
    </svg>
  </div>
</template>

<style scoped>
.Loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.Loader__spinner {
  fill: #609f8e;
}
.Loader01,
.Loader02,
.Loader03,
.Loader04,
.Loader05,
.Loader06,
.Loader07,
.Loader08,
.Loader09,
.Loader10 {
  transform-origin: 50% 50%;
  transform: scaleY(0);
}
.Loader.isActive {
  opacity: 1;
}
.Loader.isActive .Loader01 {
  animation: animLoader 1s ease-in-out infinite alternate;
}
.Loader.isActive .Loader02 {
  animation: animLoader 1s ease-in-out infinite alternate 0.1s;
}
.Loader.isActive .Loader03 {
  animation: animLoader 1s ease-in-out infinite alternate 0.2s;
}
.Loader.isActive .Loader04 {
  animation: animLoader 1s ease-in-out infinite alternate 0.3s;
}
.Loader.isActive .Loader05 {
  animation: animLoader 1s ease-in-out infinite alternate 0.4s;
}
.Loader.isActive .Loader06 {
  animation: animLoader 1s ease-in-out infinite alternate 0.5s;
}
.Loader.isActive .Loader07 {
  animation: animLoader 1s ease-in-out infinite alternate 0.6s;
}
.Loader.isActive .Loader08 {
  animation: animLoader 1s ease-in-out infinite alternate 0.7s;
}
.Loader.isActive .Loader09 {
  animation: animLoader 1s ease-in-out infinite alternate 0.8s;
}
.Loader.isActive .Loader10 {
  animation: animLoader 1s ease-in-out infinite alternate 0.9s;
}
.Loader:not(.isActive) {
  opacity: 0;
  pointer-events: none;
}
</style>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getClasses() {
      const classes = ['Loader']
      if (this.isLoading) {
        classes.push('isActive')
      }
      return classes
    }
  }
}
</script>
