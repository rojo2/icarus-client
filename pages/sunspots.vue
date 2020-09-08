<template>
  <section class="Sunspots isActive">
    <div class="Sunspots__image">
      <div class="Panel__header">
        <div class="Panel__title">Sunspots</div>
      </div>
      <div class="Panel__content">
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
                  :xlink:href="image"
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
      </div>
      <div class="Panel__footer"></div>
    </div>
    <div class="Sunspots__description">
      <div class="Panel__content--text">
        <div class="ScrolledContent">
          <div class="Text__header">Sunspots</div>
          <div class="Text__body">
            <p>
              Sunspots are temporary phenomena on the photosphere of the Sun
              that appear visibly as dark spots compared to surrounding regions.
              They correspond to concentrations of magnetic field flux that
              inhibit convection and result in reduced surface temperature
              compared to the surrounding photosphere. Sunspots usually appear
              in pairs, with pair members of opposite magnetic polarity. The
              number of sunspots varies according to the approximately 11-year
              solar cycle.
            </p>
            <p>
              Individual sunspots may endure anywhere from a few days to a few
              months, but eventually decay. Sunspots expand and contract as they
              move across the surface of the Sun with a size ranging from 16
              kilometers to 160,000 kilometers in diameter. The larger variety
              are visible from Earth without the aid of a telescope. They may
              travel at relative speeds ("proper motions") of a few hundred
              meters per second when they first emerge.
            </p>
            <p>
              Reflecting intense magnetic activity, sunspots accompany secondary
              phenomena such as coronal loops (prominences) and reconnection
              events. Most solar flares and coronal mass ejections originate in
              magnetically active regions around visible sunspot groupings.
              Similar phenomena indirectly observed on stars other than the sun
              are commonly called starspots and both light and dark spots have
              been measured.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import API from '@/api'
import Loader from '@/components/Loader'
import utils from '@/utils'

export default {
  components: {
    Loader
  },
  async asyncData() {
    const minDateFormatted = utils.daysFrom(-1)
    const maxDateFormatted = utils.daysFrom(1)
    const minDateFormattedImage = utils.daysFrom(-1)
    const maxDateFormattedImage = utils.daysFrom(1)
    const images = await API.getImageChannels({
      channeltype: 5,
      date_min: minDateFormattedImage,
      date_max: maxDateFormattedImage
    })
    const sunspots = await API.getSunspotRegions({
      date_min: minDateFormatted,
      date_max: maxDateFormatted
    })
    return {
      isLoading: false,
      images: images.data,
      sunspots: sunspots.data
    }
  },
  data() {
    return {
      isLoading: true,
      sunspots: [],
      images: []
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    width() {
      if (!this.$refs.container) {
        return 1000
      }
      const { width } = this.$refs.container.getBoundingClientRect()
      return width
    },
    height() {
      if (!this.$refs.container) {
        return 700
      }
      const { height } = this.$refs.container.getBoundingClientRect()
      return height
    },
    halfWidth() {
      return this.width * 0.5
    },
    halfHeight() {
      return this.height * 0.5
    },
    radius() {
      return Math.min(this.halfWidth, this.halfHeight) - 55
    },
    image() {
      const [image] = this.images
      return image.image
    }
  }
}
</script>
