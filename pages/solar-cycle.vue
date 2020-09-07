<template>
  <section class="SolarCycle isActive">
    <div class="SolarCycle__graph">
      <div class="Panel__header">
        <div class="Panel__title">Solar Cycle</div>
      </div>
      <div class="Panel__content">
        <Loader :is-loading="isLoading" />
        <div class="Graph">
          <div ref="container" class="Graph__content">
            <!-- {this.renderGraph()} -->
            <svg
              class="Graph__image"
              width="100%"
              height="100%"
              :viewBox="viewBox"
            >
              <g :transform="transform">
                <path class="Graph__line Graph__smoothed" :d="smoothedPath" />
                <path class="Graph__line Graph__predicted" :d="predictedPath" />
                <path class="Graph__line Graph__observed" :d="observedPath" />
                <g class="Graph__axis" :transform="xTransform">
                  {{ xTicks }}
                </g>
                <g class="Graph__axis">
                  {{ yTicks }}
                  <text
                    class="Graph__text"
                    transform="rotate(-90)"
                    :style="yStyle"
                  >
                    MeV
                  </text>
                </g>
              </g>
            </svg>
          </div>
          <div class="Graph__legends">
            <a href="#" class="Graph__legend">
              <div class="Graph__legendColor--monthly"></div>
              <div class="Graph__legendLabel">Monthly Values</div>
            </a>
            <a href="#" class="Graph__legend">
              <div class="Graph__legendColor--smoothedMonthly"></div>
              <div class="Graph__legendLabel">Smoothed Monthly Values</div>
            </a>
            <a href="#" class="Graph__legend">
              <div class="Graph__legendColor--predictedMonthly"></div>
              <div class="Graph__legendLabel">Predicted Monthly Values</div>
            </a>
          </div>
        </div>
      </div>
      <div class="Panel__footer"></div>
    </div>
    <div class="SolarCycle__description">
      <div class="Panel__content--text">
        <div class="ScrolledContent">
          <div class="Text__header">The Solar Cycle</div>
          <div class="Text__body">
            <p>
              The 11-year sunspot or solar cycle is a rhythmic waxing and waning
              of the number of dark sunspots on the visible disk of the Sun. It
              comes from the "winding-up" of the solar magnetic field during
              which the magnetic field gradually decays and then finally
              undergoes a total magnetic reversal, which is when the magnetic
              poles flip. As the magnetic field becomes gradually more entwined
              towards solar maximum the surface fields of the Sun becomes more
              and more wrapped up. This increases the activity on the surface of
              the Sun, seen as sunspots (regions of highly complex and intense
              magnetic fields) and the more frequent occurrence of solar flares
              and coronal mass ejections.
            </p>
            <p>
              The Sun is brighter at EUV and X-ray wavelengths during solar
              maximum then at solar minimum. This global brightening has Space
              Weather consequences. Impulsive events, such as coronal mass
              ejections, solar flares, or high speed streams in the solar wind,
              occur on timescales of minutes to hours, or even days. Delayed
              sources of space weather, such as geomagnetic storms, start after
              the solar signal that triggers the storm has passed the Earth and
              can last for days to weeks. Galactic cosmic rays are reduced by
              solar activity and have more rapid variations caused by CMEs.
              Interplanetary dust particles are a continuous source of
              easily-ionized meteoric material to the Earth. Impacts of
              asteroids and comets are infrequent, catastrophic events.
            </p>
            <h3>Recent cycles</h3>
            <h4>Cycle 25</h4>
            <p>
              There are many, often mutually contradictory predictions, based on
              different methods, for the solar cycle 25, ranging from very weak
              to moderate magnitude. At present, no definite prediction can be
              made.
            </p>
            <h4>Cycle 24</h4>
            <p>
              The current solar cycle began on January 4, 2008, with minimal
              activity until early 2010. It is on track to have the lowest
              recorded sunspot activity since accurate records began in 1750.
              The cycle featured a "double-peaked" solar maximum. The first peak
              was reached 99 in 2011 and the second in early 2014 at 101.
            </p>
            <h4>Cycle 23</h4>
            <p>
              This cycle lasted 11.6 years, beginning in May 1996 and ending in
              January 2008. The maximum smoothed sunspot number (monthly number
              of sunspots averaged over a twelve-month period) observed during
              the solar cycle was 120.8 (March 2000), and the minimum was 1.7. A
              total of 805 days had no sunspots during this cycle.
            </p>
            <p>
              Sources: Source: WDC-SILSO, Royal Observatory of Belgium, Brussels
              <a
                href="http://sidc.be/silso/home"
                target="_blank"
                rel="noopener"
              >
                http://sidc.be/silso/home
              </a>
              and
              <a
                href="https://en.wikipedia.org/wiki/Solar_cycle"
                target="_blank"
                rel="noopener"
              >
                Wikipedia
              </a>
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
    const smoothed = await API.getSunspots({ sunspottype: 1 })
    const predicted = await API.getSunspots({ sunspottype: 2 })
    const observed = await API.getSunspots({ sunspottype: 3 })
    return {
      isLoading: false,
      smoothed: smoothed.data,
      predicted: predicted.data,
      observed: observed.data
    }
  },
  data() {
    return {
      isLoading: false,
      width: 0,
      height: 0,
      sWidth: 0,
      sHeight: 0,
      margin: {
        top: 0,
        right: 0,
        bottom: 24,
        left: 0
      },
      smoothed: null,
      predicted: null,
      observed: null
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    transform() {
      return `translate(${this.margin.left}, ${this.margin.top})`
    },
    xTransform() {
      return `translate(0,${this.mHeight})`
    },
    yStyle() {
      return {
        textAnchor: 'end'
      }
    },
    mWidth() {
      return this.width - (this.margin.left + this.margin.right)
    },
    mHeight() {
      return this.height - (this.margin.top + this.margin.bottom)
    },
    maxX() {
      return utils.maxOf([this.smoothed, this.predicted, this.observed], 'time')
    },
    minX() {
      return utils.minOf([this.smoothed, this.predicted, this.observed], 'time')
    },
    maxY() {
      return utils.maxOf(
        [this.smoothed, this.predicted, this.observed],
        'value'
      )
    },
    minY() {
      return utils.minOf(
        [this.smoothed, this.predicted, this.observed],
        'value'
      )
    },
    smoothedPath() {
      return utils.path(
        utils.points(
          this.smoothed,
          'time',
          'value',
          this.minX,
          this.maxX,
          this.minY,
          this.maxY
        ),
        this.mWidth,
        this.mHeight
      )
    },
    predictedPath() {
      return utils.path(
        utils.points(
          this.predicted,
          'time',
          'value',
          this.minX,
          this.maxX,
          this.minY,
          this.maxY
        ),
        this.mWidth,
        this.mHeight
      )
    },
    observedPath() {
      return utils.path(
        utils.points(
          this.observed,
          'time',
          'value',
          this.minX,
          this.maxX,
          this.minY,
          this.maxY
        ),
        this.mWidth,
        this.mHeight
      )
    }
  },
  mounted() {
    const { width, height } = this.$refs.container.getBoundingClientRect()
    const {
      left: marginLeft,
      top: marginTop,
      bottom: marginBottom,
      right: marginRight
    } = this.margin
    this.width = width
    this.height = height
    this.mWidth = width - (marginLeft + marginRight)
    this.mHeight = height - (marginTop + marginBottom)
    this.sWidth = width + marginLeft
    this.sHeight = height + marginTop
  }
}
</script>
