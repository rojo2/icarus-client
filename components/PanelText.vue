<template>
  <transition name="panel">
    <div class="Panel">
      <div class="Panel__content">
        <div class="ScrolledContent">
          <h2>{{ title }}</h2>
          <div class="Text__body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.Panel {
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

h2 {
  position: relative;
  font-size: 2rem;
  margin: 0;
  padding: 0.5rem 0 1.5rem;
  color: $color-accent;
}

.Panel__content:before,
.Panel__content:after {
  position: absolute;
  content: '';
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
  background-color: $color-highlight;
  z-index: 101;
  right: -2px;
}

.Panel__content {
  flex: 1 0;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.Panel__content:before {
  top: -0.125rem;
}
.Panel__content:after {
  bottom: -0.125rem;
}

.Text__body {
  position: relative;
  color: $color-base;
  padding-bottom: 1rem;
}

.ScrolledContent {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-right: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.panel-enter-active, .panel-leave-active {
  transition: all 0.5s ease-in-out;
}
.panel-enter, .panel-leave-to {
  opacity: 0;
  transform: perspective(1200px) rotateX(-45deg);
}

</style>
