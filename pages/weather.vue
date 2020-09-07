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
        <div class="Panel__title">
          Fluxes
        </div>
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
            <!-- {this.renderGraph(flux)} -->
          </div>
          <!-- {this.renderGraphLegend(flux)} -->
        </div>
      </div>
      <div class="Panel__footer"></div>
    </div>
  </section>
</template>

<script>
import Loader from '@/components/Loader'
import EIT from '@/components/EIT'

export default {
  components: {
    Loader,
    EIT
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    handleTimelineChange(e) {
      // console.log(e)
    }
  }
}
</script>
