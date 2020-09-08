<template>
  <transition name="panel" appear>
    <div class="Panel">
      <header>
        <h3 class="Panel__title">{{ title }}</h3>
        <slot name="menu" />
      </header>
      <div class="Panel__content">
        <slot />
      </div>
      <footer />
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

header:before,
header:after {
  top: -3px;
}
header:before {
  left: -2px;
}
header:after {
  right: -2px;
}

header {
  flex: 0 0 auto;
  position: relative;
  height: 3rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(96,159,142,0.2);
  background-color: rgba(96,159,142,0.06);
  border-top: 1px solid rgba(96,159,142,0.2);
}

header:before,
header:after,
footer:before,
footer:after {
  position: absolute;
  content: '';
  width: 5px;
  height: 5px;
  transform: rotate(45deg);
  background-color: #ebfaf6;
  z-index: 101;
}

h3 {
  flex: 1 0 auto;
  text-transform: uppercase;
  color: $color-accent;
  font-size: 1rem;
  padding: 0.5rem 0;
  margin: 0;
}

.Panel__content,
.Panel__content--text,
.Panel__content--noPadding {
  flex: 1 0;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}
.Panel__content--noPadding {
  padding: 0;
}
footer {
  flex: 0 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(96,159,142,0.2);
}

footer:before,
footer:after {
  bottom: -3px;
}
footer:before {
  left: -2px;
}
footer:after {
  right: -2px;
}

.panel-enter-active, .panel-leave-active {
  transition: all 0.5s ease-in-out;
}
.panel-enter, .panel-leave-to {
  opacity: 0;
  transform: perspective(1200px) rotateX(-45deg);
}

</style>