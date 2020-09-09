/* eslint-disable prettier/prettier */
<template>
  <section class="Sunspots isActive">
    <transition name="left" appear>
      <Panel class="Sunspots__image" title="Sunspots">
        <Loader :is-loading="isLoading" />
        <div class="Graph">
          <div ref="container" class="Graph__content">
            <svg
              class="Graph__image"
              width="100%"
              height="100%"
              :viewBox="viewBox"
            >
              <g>
                <image
                  v-if="image"
                  :width="width"
                  :height="height"
                  :xlinkHref="image.url"
                />
                <g v-else>
                  <circle
                    class="Image--notFound"
                    :cx="halfWidth"
                    :cy="halfHeight"
                  />
                  <line
                    class="Image--notFound"
                    x1="0"
                    y1="0"
                    :x2="width"
                    :y2="height"
                  />
                  <line
                    class="Image--notFound"
                    x1="0"
                    :y1="height"
                    :x2="width"
                    y2="0"
                  />
                </g>
                <circle
                  class="Graph__sun"
                  :cx="halfWidth"
                  :cy="halfHeight"
                  :r="radius"
                />
                <!-- Renderizamos los sunspots -->
                <g
                  v-for="sunspot in sunspots"
                  :key="sunspot.location"
                  class="Graph__sunspotInfo"
                  :transform="sunspot.transform"
                >
                  <circle class="Graph__sunspot" cx="0" cy="0" r="10" />
                  <text class="Graph__sunspotText">
                    <tspan class="Graph__sunspotInfoLabel" x="0" y="0">
                      Spot class:
                    </tspan>
                    <tspan class="Graph__sunspotInfoValue" x="132" y="0">
                      {{ sunspot.spotclass }}
                    </tspan>
                    <tspan class="Graph__sunspotInfoLabel" x="0" y="20">
                      Magnetic class:
                    </tspan>
                    <tspan class="Graph__sunspotInfoValue" x="132" y="20">
                      {{ sunspot.magneticclass }}
                    </tspan>
                    <tspan class="Graph__sunspotInfoLabel" x="0" y="40">
                      Location:
                    </tspan>
                    <tspan class="Graph__sunspotInfoValue" x="132" y="40">
                      {{ sunspot.location }}
                    </tspan>
                    <tspan class="Graph__sunspotInfoLabel" x="0" y="60">
                      Size:
                    </tspan>
                    <tspan class="Graph__sunspotInfoValue" x="132" y="60">
                      {{ sunspot.size }}
                    </tspan>
                    <tspan class="Graph__sunspotInfoLabel" x="0" y="80">
                      No. of sunspots:
                    </tspan>
                    <tspan class="Graph__sunspotInfoValue" x="132" y="80">
                      {{ sunspot.numberofsunspots }}
                    </tspan>
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </Panel>
    </transition>
    <transition name="right" appear>
      <PanelText class="Sunspots__description" title="Sunspots">
        <p>
          Sunspots are temporary phenomena on the photosphere of the Sun
          thatappear visibly as dark spots compared to surrounding regions. They
          correspond to concentrations of magnetic field flux that inhibit
          convection and result in reduced surface temperature compared to the
          surrounding photosphere. Sunspots usually appear in pairs, with pair
          members of opposite magnetic polarity. The number of sunspots
          variesaccording to the approximately 11-year solar cycle.
        </p>
        <p>
          Individual sunspots may endure anywhere from a few days to a few months,
          but eventually decay. Sunspots expand and contract as they move across
          the surface of the Sun with a size ranging from 16 kilometers to 160,000
          kilometers in diameter. The larger variety are visible from Earth
          without the aid of a telescope. They may travel at relative speeds
          ("proper motions") of a few hundred meters per second when they first
          emerge.
        </p>
        <p>
          Reflecting intense magnetic activity, sunspots accompany secondary
          phenomena such as coronal loops (prominences) and reconnection events.
          Most solar flares and coronal mass ejections originate in magnetically
          active regions around visible sunspot groupings. Similar phenomena
          indirectly observed on stars other than the sun are commonly called
          starspots and both light and dark spots have been measured.
        </p>
      </PanelText>
    </transition>
  </section>
</template>

<script>
import moment from 'moment'

import API from '@/api'

export default {
  async asyncData() {
    const dateMin = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
    const dateMax = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD')
    const images = await API.getImageChannels({
      channeltype: 5,
      date_min: dateMin,
      date_max: dateMax
    })
    const sunspots = await API.getSunspotRegions({
      date_min: dateMin,
      date_max: dateMax
    })
    return {
      isLoading: false,
      sunspots: sunspots.data,
      images: images.data,
      image: null
    }
  },
  data() {
    return {
      isLoading: true,
      sunspots: [],
      images: [],
      image: null,
      width: 0,
      height: 0,
      halfWidth: 0,
      halfHeight: 0,
      radius: 0
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    }
  },
  mounted() {
    const { min } = Math
    const { width, height } = this.$refs.container.getBoundingClientRect()
    this.width = width
    this.height = height
    this.halfWidth = width >> 1
    this.halfHeight = height >> 1
    this.radius = min(this.width, this.height) - 55
  }
}
</script>

<style lang="scss" scoped>

.Sunspots__description {
  flex: 0 1 40%;
  display: flex;
}

.Sunspots__image {
  flex: 0 0 60%;
  
  image {
    border-radius: 50%;
    overflow: hidden;
  }
}

</style>