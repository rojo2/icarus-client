<template>
  <div id="Application">
    <div class="Icarus">
      <Background />
      <div class="Page">
        <header>
          <Logo />
          <div class="Nav">
            <nuxt-link to="/weather" active-class="isActive" class="Nav__item">
              <div class="Nav__itemLabel">Weather</div>
            </nuxt-link>
            <nuxt-link to="/sunspots" active-class="isActive" class="Nav__item">
              <div class="Nav__itemLabel">Sunspots</div>
            </nuxt-link>
            <nuxt-link
              to="/solar-cycle"
              active-class="isActive"
              class="Nav__item"
            >
              <div class="Nav__itemLabel">Solar cycle</div>
            </nuxt-link>
            <nuxt-link to="/forecast" active-class="isActive" class="Nav__item">
              <div class="Nav__itemLabel">Forecast</div>
              <div class="Nav__itemAlert"></div>
            </nuxt-link>
          </div>
        </header>
        <main>
          <nuxt />
        </main>
        <footer>
          <div class="AboutIcarus">
            <button
              type="button"
              class="AboutIcarus__button"
              @click="showAboutIcarus = true"  
            >
              About Icarus Project
            </button>
            <Modal v-if="showAboutIcarus" @close="showAboutIcarus = false">
              <div class="AboutIcarus__infoPanel">
                <h3>About Icarus Project</h3>
                <p>
                  The Icarus Project is a fun endeavour looking to make near
                  live space weather information available to the general public
                  as well as the scientific community. It consists of an ever
                  growing API and a gorgeous web client.
                </p>
                <p>
                  <a href="https://twitter.com/azazeln28" target="_blank">
                    Aitor Moreno Melcón</a
                  >,
                  <a href="https://twitter.com/mekanoide" target="_blank">
                    Omar Moreno Melcón</a
                  >
                  and
                  <a href="https://twitter.com/diacritica" target="_blank">
                    Pablo Ruiz Múzquiz</a
                  >
                  are its creators, with
                  <a href="https://twitter.com/ghilbrae" target="_blank">
                    Angela Rivera Campos</a
                  >
                  acting as our scientific advisor.
                </p>
                <p>
                  If you would like to know more about Icarus Project or its
                  public API, please contact us at
                  <a href="mailto:info@icarus.live" target="_blank">
                    info@icarus.live</a
                  >
                  or follow us for Icarus alerts on
                  <a href="https://twitter.com/icarusalerts" target="_blank">
                    Twitter
                  </a>
                </p>
                <p>
                  Also, please find all the source code available at github:
                  <a href="https://github.com/diacritica/spaceweather">
                    backend
                  </a>
                  and
                  <a href="https://github.com/rojo2/spaceweather-client">
                    frontend</a
                  >.
                </p>
                <p>
                  We would like to thank
                  <a href="http://kaleidos.net" target="_blank">Kaleidos</a> and
                  their
                  <a href="http://piweek.com" target="_blank">PIWEEK</a> that
                  greatly contributed to make this a reality.
                </p>
              </div>
            </Modal>
          </div>
          <div class="Controls">
            <a href="#" :class="getAudioClasses()" @click="handleAudioClick">
              <div class="Button__label">Audio {{ audioStateText }}</div>
              <svg
                viewBox="0 0 22 16"
                x="0"
                y="0"
                width="22"
                height="16"
                class="Icon--sound"
              >
                <rect
                  x="0"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--1"
                ></rect>
                <rect
                  x="3"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--2"
                ></rect>
                <rect
                  x="6"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--3"
                ></rect>
                <rect
                  x="9"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--1"
                ></rect>
                <rect
                  x="12"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--4"
                ></rect>
                <rect
                  x="15"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--2"
                ></rect>
                <rect
                  x="18"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--1"
                ></rect>
                <rect
                  x="21"
                  y="0"
                  width="1"
                  height="16"
                  class="Sound Sound--3"
                ></rect>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audioState: false,
      showAboutIcarus: false
    }
  },
  computed: {
    audioStateText() {
      return this.audioState ? 'On' : 'Off'
    }
  },
  methods: {
    getAudioClasses() {
      const classes = ['Button--sound']
      if (this.audioState) {
        classes.push('isOn')
      }
      return classes
    },
    handleAudioClick(e) {
      this.audioState = !this.audioState
    }
  }
}
</script>

<style lang="scss" scoped>

.Page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;

  header {
    flex: 0 0 3.5rem;
    display: flex;
    align-items: flex-end;
    position: relative;
    margin: 2rem 2rem 0;
    padding-bottom: 0rem;

    &:before,
    &:after {
      top: 0;
      position: absolute;
      content: '';
      width: 2rem;
      height: 1px;
      background-color: #ebfaf6;
      z-index: 101;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
  }

  main {
    flex: 1 1;
    display: flex;
    align-items: stretch;
  }

  footer {
    flex: 0 0 3rem;
    display: flex;
    align-items: flex-start;
    padding: 0 2rem;
  }
}


.Nav {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.Nav__item {
  position: relative;
  font-size: 1rem;
  display: flex;
  height: 2rem;
  align-items: center;
  text-transform: uppercase;
  margin-left: 0.5rem;
  padding: 0 2rem;
}
.Nav__itemAlert {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #eb8947;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5rem;
}

.Button--sound {
  text-transform: uppercase;
  color: #609f8e;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  
  .Icon--sound {
    fill: #609f8e;
  }
  .Sound {
    transform-origin: 50% 50%;
  }
  .Button__label {
    margin-right: 0.5rem;
  }
}

.Button--sound.isOn {
  color: #ebfaf6;

  .Icon--sound {
    fill: #ebfaf6;
  }

  .Sound--1 {
    animation: animSound 1s ease-in-out infinite;
  }
  .Sound--2 {
    animation: animSound 0.9s ease-in-out infinite;
  }
  .Sound--3 {
    animation: animSound 0.7s ease-in-out infinite;
  }
  .Sound--4 {
    animation: animSound 0.2s ease-in-out infinite;
  }
}

.Button--sound.isOff .Icon--sound .Sound {
  transform: scaleY(0.1);
}

@keyframes animSound {
  0% {
    transform: scaleY(0.1);
    fill: #609f8e;
  }
  20% {
    transform: scaleY(1);
  }
  40% {
    transform: scaleY(0.4);
  }
  60% {
    transform: scaleY(0.75);
  }
  80% {
    transform: scaleY(0.2);
    fill: #609f8e;
  }
  100% {
    transform: scaleY(0.1);
    fill: #609f8e;
  }
}

.AboutIcarus {
  flex: 1;
  button {
    appearance: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: $color-base;
    text-transform: uppercase;
    outline: none;
    transition: all 0.25s ease-in-out;
    &:hover {
      color: $color-highlight;
    }
  }
}

</style>