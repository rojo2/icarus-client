<template>
  <transition name="modal" appear>
    <div class="Modal">
      <button type="button" class="Button--close" @click="$emit('close')">
        <svg
          width="32"
          height="32"
          viewBox="0 0 30 30"
          class="AboutIcarus__closeIcon"
        >
          <line x1="2" y1="2" x2="30" y2="30"></line>
          <line x1="2" y1="30" x2="30" y2="2"></line>
        </svg>
      </button>
      <div class="Modal__content">
        <slot />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>

.Modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: $color-bg;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Modal__content {
  max-width: 640px;
}

.Button--close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  appearance: none;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  outline: none;
  svg {
    stroke: $color-base;
    stroke-width: 2px;
  }
  &:hover {
    svg {
      stroke: $color-highlight;
    }
  }
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.25s ease-in-out;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
  transform: perspective(400px) rotateX(-45deg);
}

</style>