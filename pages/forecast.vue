<template>
  <section class="Forecast isActive">
    <div class="Forecast__graphs">
      <div class="Panel__header">
        <div class="Panel__title">3-day Forecast</div>
      </div>
      <div class="Panel__content">
        <div class="Forecast__days">
          <div class="Forecast__day">
            <div class="Forecast__dayLabel">
              {{ getMonthAbbr(firstRadioBlackout.ts.getMonth()) }}
              {{ firstRadioBlackout.ts.getDate() }}
            </div>
            <div class="Forecast__dayData">
              <div class="GraphDanger">
                <div class="GraphDanger__geomagnetic">
                  <div
                    class="GraphDanger__geomagneticFill"
                    :style="firstTransformGeomagActivity"
                  ></div>
                </div>
                <div class="GraphDanger__solar">
                  <div
                    class="GraphDanger__solarFill"
                    :style="firstTransformSolarRadiation"
                  ></div>
                </div>
                <div class="GraphDanger__blackout">
                  <div
                    class="GraphDanger__blackoutFill"
                    :style="firstTransformBlackout"
                  ></div>
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--geomagnetic">
                  Geomagnetic Activity
                </div>
                <div class="Forecast__statsValue--geomagnetic">
                  {{ firstGeomagActivity.value }} / 5
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--solar">
                  Solar Radiation Activity
                </div>
                <div class="Forecast__statsValue--solar">
                  {{ firstSolarRadiation.value }}%
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--blackout">
                  Radio Blackout Activity
                </div>
                <div class="Forecast__statsValue--blackout">
                  {{ firstRadioBlackout.value }}%
                </div>
              </div>
            </div>
          </div>
          <div class="Forecast__day">
            <div class="Forecast__dayLabel">
              {{ getMonthAbbr(secondRadioBlackout.ts.getMonth()) }}
              {{ secondRadioBlackout.ts.getDate() }}
            </div>
            <div class="Forecast__dayData">
              <div class="GraphDanger">
                <div class="GraphDanger__geomagnetic">
                  <div
                    class="GraphDanger__geomagneticFill"
                    :style="secondTransformGeomagActivity"
                  ></div>
                </div>
                <div class="GraphDanger__solar">
                  <div
                    class="GraphDanger__solarFill"
                    :style="secondTransformSolarRadiation"
                  ></div>
                </div>
                <div class="GraphDanger__blackout">
                  <div
                    class="GraphDanger__blackoutFill"
                    :style="secondTransformBlackout"
                  ></div>
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--geomagnetic">
                  Geomagnetic Activity
                </div>
                <div class="Forecast__statsValue--geomagnetic">
                  {{ secondGeomagActivity.value }} / 5
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--solar">
                  Solar Radiation Activity
                </div>
                <div class="Forecast__statsValue--solar">
                  {{ secondSolarRadiation.value }}%
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--blackout">
                  Radio Blackout Activity
                </div>
                <div class="Forecast__statsValue--blackout">
                  {{ secondRadioBlackout.value }}%
                </div>
              </div>
            </div>
          </div>
          <div class="Forecast__day">
            <div class="Forecast__dayLabel">
              {{ getMonthAbbr(thirdRadioBlackout.ts.getMonth()) }}
              {{ thirdRadioBlackout.ts.getDate() }}
            </div>
            <div class="Forecast__dayData">
              <div class="GraphDanger">
                <div class="GraphDanger__geomagnetic">
                  <div
                    class="GraphDanger__geomagneticFill"
                    :style="thirdTransformGeomagActivity"
                  ></div>
                </div>
                <div class="GraphDanger__solar">
                  <div
                    class="GraphDanger__solarFill"
                    :style="thirdTransformSolarRadiation"
                  ></div>
                </div>
                <div class="GraphDanger__blackout">
                  <div
                    class="GraphDanger__blackoutFill"
                    :style="thirdTransformBlackout"
                  ></div>
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--geomagnetic">
                  Geomagnetic Activity
                </div>
                <div class="Forecast__statsValue--geomagnetic">
                  {{ thirdGeomagActivity.value }} / 5
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--solar">
                  Solar Radiation Activity
                </div>
                <div class="Forecast__statsValue--solar">
                  {{ thirdSolarRadiation.value }}%
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--blackout">
                  Radio Blackout Activity
                </div>
                <div class="Forecast__statsValue--blackout">
                  {{ thirdRadioBlackout.value }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Panel__footer"></div>
    </div>
    <div class="Forecast__alerts">
      <div class="Panel__header">
        <div class="Panel__title">Alerts</div>
        <div class="Panel__menu">
          <nuxt-link
            :to="{
              path: '/forecast',
              query: {
                show: 'forecast'
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            Forecast
          </nuxt-link>
          <nuxt-link
            :to="{
              path: '/forecast',
              query: {
                show: 'alerts'
              }
            }"
            exact-active-class="isActive"
            class="Panel__menuItem"
          >
            Alerts
          </nuxt-link>
        </div>
      </div>

      <div class="Panel__content">
        <div
          v-if="$route.query.show === 'forecast'"
          class="Forecast__rationale"
        >
          <div v-if="solarRadiation">
            <h3>Solar Radiation Storms</h3>
            <p>{{ solarRadiation }}</p>
          </div>
          <div v-if="geomagActivity">
            <h3>Geomagnetic Activity</h3>
            <p>{{ geomagActivity }}</p>
          </div>
          <div v-if="radioBlackout">
            <h3>Radio Blackout (>=R3)</h3>
            <p>{{ radioBlackout }}</p>
          </div>
        </div>
        <div v-else-if="$route.query.show === 'alerts'" class="Alerts">
          <div
            v-for="alert in alerts"
            :key="alert.id"
            :class="getAlertClasses(alert)"
          >
            <input :id="alert.id" type="checkbox" class="Alert__input" />
            <label :for="alert.id" class="Alert__basicInfo">
              <div class="Alert__metadata">
                <div class="Alert__issueTime">{{ alert.issuetime }}</div>
                <div class="Alert__SWMC">{{ alert.SWMC }}</div>
              </div>
              <div class="Alert__message">{{ alert.message }}</div>
            </label>
            <div class="Alert__extendedInfo">
              <div class="Alert__payload">{{ alert.payload }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- {{ renderRightPanel() }} -->

      <div class="Panel__footer"></div>
    </div>
  </section>
</template>

<script>
import API from '@/api'
import utils from '@/utils'

export default {
  name: 'Forecast',
  async asyncData() {
    const asyncData = {
      alerts: [],
      geomagActivityItems: null,
      solarRadiationItems: null,
      radioBlackoutItems: null,
      solarRadiation: null,
      geomagActivity: null,
      radioBlackout: null
    }

    {
      const { data } = await API.getAlerts({
        ordering: '-issuetime',
        date_min: utils.daysFrom(-3)
      })
      asyncData.alerts = data
    }

    {
      const { data } = await API.getGeomagneticActivity({
        date_min: utils.daysFrom(-3),
        ordering: '-date'
      })
      asyncData.geomagActivityItems = utils.radio(data)
    }

    {
      const { data } = await API.getSolarRadiation({
        date_min: utils.daysFrom(-3),
        ordering: '-date'
      })
      asyncData.solarRadiationItems = utils.ts(data, 'date')
    }

    {
      const { data } = await API.getRadioBlackout({
        date_min: utils.daysFrom(-3),
        ordering: '-date'
      })
      asyncData.radioBlackoutItems = utils.ts(data, 'date')
    }

    {
      const { data } = await API.getForecast()
      const rationale = data.pop()
      asyncData.solarRadiation = rationale.solarradiation
      asyncData.geomagActivity = rationale.geomagactivity
      asyncData.radioBlackout = rationale.radioblackout
    }

    return asyncData
  },
  data() {
    return {
      show: 'alerts',
      alerts: [],
      geomagActivityItems: null,
      solarRadiationItems: null,
      radioBlackoutItems: null,
      geomagActivity: null,
      solarRadiation: null,
      radioBlackout: null
    }
  },
  computed: {
    firstRadioBlackout() {
      return this.radioBlackoutItems[0]
    },
    secondRadioBlackout() {
      return this.radioBlackoutItems[1]
    },
    thirdRadioBlackout() {
      return this.radioBlackoutItems[2]
    },
    firstSolarRadiation() {
      return this.solarRadiationItems[0]
    },
    secondSolarRadiation() {
      return this.solarRadiationItems[1]
    },
    thirdSolarRadiation() {
      return this.solarRadiationItems[2]
    },
    firstGeomagActivity() {
      return this.geomagActivityItems[0]
    },
    secondGeomagActivity() {
      return this.geomagActivityItems[1]
    },
    thirdGeomagActivity() {
      return this.geomagActivityItems[2]
    },
    firstGeo() {
      return this.firstGeomagActivity.value / 5.0
    },
    firstTransformGeomagActivity() {
      return {
        transform: `scaleY(${this.firstGeo})`
      }
    },
    firstTransformSolarRadiation() {
      return {
        transform: `scaleY(${this.firstSolarRadiation.value * 0.01})`
      }
    },
    firstTransformBlackout() {
      return {
        transform: `scaleY(${this.firstRadioBlackout.value * 0.01})`
      }
    },
    secondGeo() {
      return this.secondGeomagActivity.value / 5.0
    },
    secondTransformGeomagActivity() {
      return {
        transform: `scaleY(${this.secondGeo})`
      }
    },
    secondTransformSolarRadiation() {
      return {
        transform: `scaleY(${this.secondSolarRadiation.value * 0.01})`
      }
    },
    secondTransformBlackout() {
      return {
        transform: `scaleY(${this.secondRadioBlackout.value * 0.01})`
      }
    },

    thirdGeo() {
      return this.thirdGeomagActivity.value / 5.0
    },
    thirdTransformGeomagActivity() {
      return {
        transform: `scaleY(${this.thirdGeo})`
      }
    },
    thirdTransformSolarRadiation() {
      return {
        transform: `scaleY(${this.thirdSolarRadiation.value * 0.01})`
      }
    },
    thirdTransformBlackout() {
      return {
        transform: `scaleY(${this.thirdRadioBlackout.value * 0.01})`
      }
    }
  },
  methods: {
    getAlertClasses(alert) {
      const { alerttype } = alert
      return [
        'Alert',
        {
          'Alert--summary': alerttype === 1,
          'Alert--warning': alerttype === 2,
          'Alert--extendedWarning': alerttype === 3,
          'Alert--cancelWarning': alerttype === 4
        }
      ]
    },
    getMonthAbbr(index) {
      const abbrs = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      return abbrs[index]
    }
  }
}
</script>
