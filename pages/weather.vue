<template>
  <section class="Weather isActive">
    <div class="Weather__EITFilters">
      <div class="Panel__header">
        <div class="Panel__title">EIT Filters</div>
        <div class="Panel__menu">
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                filter: 1
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            <div class="Value">171</div>
            <div class="Unit">Å</div>
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                filter: 2
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            <div class="Value">193</div>
            <div class="Unit">Å</div>
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                filter: 3
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            <div class="Value">211</div>
            <div class="Unit">Å</div>
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                filter: 4
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            <div class="Value">304</div>
            <div class="Unit">Å</div>
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                filter: 5
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            <div class="Value">HMI</div>
          </nuxt-link>
        </div>
      </div>
      <EIT :filter="$route.query.filter" @change="handleTimelineChange" />
    </div>
    <div class="Weather__fluxes">
      <div class="Panel__header">
        <div class="Panel__title">Fluxes</div>
        <div class="Panel__menu">
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                flux: 'solar-wind'
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            Solar Wind
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                flux: 'particle'
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            Particle Flux
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                flux: 'electron'
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            Electron Flux
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                flux: 'xray'
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            X-Ray Flux
          </nuxt-link>
        </div>
      </div>
      <div class="Panel__content">
        <Loader :is-loading="isLoading" />
        <div class="Graph">
          <div ref="container" class="Graph__content">
            <Graph :value="value">
              <SolarWind
                v-if="$route.query.flux === 'solar-wind' && flux"
                :data="flux"
              />
              <ProtonFlux
                v-else-if="$route.query.flux === 'particle' && flux"
                :data="flux"
              />
              <ElectronFlux
                v-else-if="$route.query.flux === 'electron' && flux"
                :data="flux"
              />
              <XrayFlux
                v-else-if="$route.query.flux === 'xray' && flux"
                :data="flux"
              />
            </Graph>
          </div>
          <GraphLegend :data="flux[2]" />
        </div>
      </div>
      <div class="Panel__footer"></div>
    </div>
  </section>
</template>

<script>
import API from '@/api'
import utils from '@/utils'

import Loader from '@/components/Loader'
import EIT from '@/components/EIT'
import GraphLegend from '@/components/GraphLegend'
import Graph from '@/components/Graph'
import SolarWind from '@/components/graphs/SolarWind'
import ProtonFlux from '@/components/graphs/ProtonFlux'
import ElectronFlux from '@/components/graphs/ElectronFlux'
import XrayFlux from '@/components/graphs/XrayFlux'

async function getSolarWind() {
  const minDateFormatted = utils.daysFrom(-7)
  const res = await Promise.all([
    API.getSolarWind({
      date_min: minDateFormatted
    })
  ])
  return res.map((res) => {
    return utils.time(res.data)
  })
}

async function getProtonFlux() {
  const minDateFormatted = utils.daysFrom(-7)
  const res = await Promise.all([
    API.getProtonFlux({
      ptype: 1,
      date_min: minDateFormatted
    }),
    API.getProtonFlux({
      ptype: 3,
      date_min: minDateFormatted
    }),
    API.getProtonFluxTypes()
  ])
  return res.map((res) => {
    return utils.time(res.data)
  })
}

async function getElectronFlux() {
  const minDateFormatted = utils.daysFrom(-7)
  const res = await Promise.all([
    API.getElectronFlux({
      etype: 2,
      date_min: minDateFormatted
    }),
    API.getElectronFlux({
      etype: 1,
      date_min: minDateFormatted
    }),
    API.getElectronFluxTypes()
  ])
  return res.map((res) => {
    return utils.time(res.data)
  })
}

async function getXrayFlux() {
  const minDateFormatted = utils.daysFrom(-7)
  const res = await Promise.all([
    API.getXrayFlux({
      xtype: 1,
      date_min: minDateFormatted
    }),
    API.getXrayFlux({
      xtype: 2,
      date_min: minDateFormatted
    }),
    API.getXrayFluxTypes()
  ])
  return res.map((res) => {
    return utils.time(res.data)
  })
}

export default {
  components: {
    SolarWind,
    ProtonFlux,
    ElectronFlux,
    XrayFlux,
    Graph,
    GraphLegend,
    Loader,
    EIT
  },
  async asyncData() {
    return {
      solarWind: await getSolarWind(),
      protonFlux: await getProtonFlux(),
      electronFlux: await getElectronFlux(),
      xrayFlux: await getXrayFlux()
    }
  },
  data() {
    return {
      isLoading: false,
      value: 0
    }
  },
  computed: {
    flux() {
      const { flux } = this.$route.query
      switch (flux) {
        default:
        case 'solar-wind':
          return this.solarWind
        case 'particle':
          return this.protonFlux
        case 'electron':
          return this.electronFlux
        case 'xray':
          return this.xrayFlux
      }
    }
  },
  methods: {
    async loadSolarWind() {
      this.solarWind = await getSolarWind()
    },
    async loadProtonFlux() {
      this.protonFlux = await getProtonFlux()
    },
    async loadElectronFlux() {
      this.electronFlux = await getElectronFlux()
    },
    async loadXrayFlux() {
      this.xrayFlux = await getXrayFlux()
    },
    loadFlux(flux) {
      switch (flux) {
        default:
        case 'solar-wind':
          this.loadSolarWind()
          break
        case 'particle':
          this.loadProtonFlux()
          break
        case 'electron':
          this.loadElectronFlux()
          break
        case 'xray':
          this.loadXrayFlux()
          break
      }
    },
    handleTimelineChange(value) {
      this.value = value
    }
  }
}
</script>
