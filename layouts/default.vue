<template>
  <div id="Application">
    <div class="Icarus">
      <Background />
      <div class="Page">
        <div class="Page__top">
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
        </div>
        <div class="Page__content">
          <nuxt />
        </div>
        <div class="Page__bottom">
          <div class="AboutIcarus">
            <input
              id="about-trigger"
              type="checkbox"
              class="AboutIcarus__input"
            />
            <label for="about-trigger" class="AboutIcarus__button">
              <div class="AboutIcarus__buttonText">About Icarus Project</div>
              <div class="AboutIcarus__buttonClose">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 30 30"
                  class="AboutIcarus__closeIcon"
                >
                  <line x1="2" y1="2" x2="30" y2="30"></line>
                  <line x1="2" y1="30" x2="30" y2="2"></line>
                </svg>
              </div>
            </label>
            <div class="AboutIcarus__content">
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
                    Aitor Moreno-Melcón</a
                  >,
                  <a href="https://twitter.com/mekanoide" target="_blank">
                    Omar Moreno-Melcón</a
                  >
                  and
                  <a href="https://twitter.com/diacritica" target="_blank">
                    Pablo Ruiz-Múzquiz</a
                  >
                  are its creators, with
                  <a href="https://twitter.com/ghilbrae" target="_blank">
                    Angela Rivera-Campos</a
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
            </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Background from '@/components/Background'
import Logo from '@/components/Logo'

export default {
  components: {
    Background,
    Logo
  },
  data() {
    return {
      audioState: false
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
