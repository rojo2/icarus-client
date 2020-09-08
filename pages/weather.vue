<template>
  <section class="Weather isActive">
    <Panel class="Weather__EITFilters" title="EIT Filters">
      <template v-slot:menu>
        <nav class="Panel__menu">
          <nuxt-link
            :to="{
              path: '/weather',
              query: {
                ...$route.query,
                filter: 1
              }
            }"
            exact-active-class="isActive"
          >
            <span class="Value">171</span>
            <span class="Unit">Å</span>
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
          >
            <span class="Value">193</span>
            <span class="Unit">Å</span>
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
          >
            <span class="Value">211</span>
            <span class="Unit">Å</span>
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
          >
            <span class="Value">304</span>
            <span class="Unit">Å</span>
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
          >
            <div class="Value">HMI</div>
          </nuxt-link>
        </nav>
      </template>
      <EIT :filter="$route.query.filter" @change="handleTimelineChange" />
    </Panel>
    <Panel class="Weather__fluxes" title="Fluxes">
      <template v-slot:menu>
        <nav class="Panel__menu">
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
        </nav>
      </template>
      <Loader :is-loading="isLoading" />
      <div class="Graph">
        <div ref="container" class="Graph__content">
          <!-- {this.renderGraph(flux)} -->
        </div>
        <!-- {this.renderGraphLegend(flux)} -->
      </div>
    </Panel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    handleTimelineChange () {
      // console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>

.Weather {
  flex: 0 0 100%;
  display: flex;
  overflow: hidden;
}

.Weather__EITFilters {
  flex: 0 1 40%;
  display: flex;
}

.Weather__fluxes {
  flex: 0 0 60%;
}

</style>
