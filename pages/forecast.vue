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
              <!-- {this.getMonthAbbr(firstRadioBlackout.ts.getMonth())} {firstRadioBlackout.ts.getDate()} -->
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
                  <!-- {firstGeomagActivity.value} / 5 -->
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--solar">
                  Solar Radiation Activity
                </div>
                <div class="Forecast__statsValue--solar">
                  <!-- {firstSolarRadiation.value}% -->
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--blackout">
                  Radio Blackout Activity
                </div>
                <div class="Forecast__statsValue--blackout">
                  <!-- {firstRadioBlackout.value}% -->
                </div>
              </div>
            </div>
          </div>
          <div class="Forecast__day">
            <div class="Forecast__dayLabel">
              <!-- {this.getMonthAbbr(secondRadioBlackout.ts.getMonth())} {secondRadioBlackout.ts.getDate()} -->
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
                  <!-- {secondGeomagActivity.value} / 5 -->
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--solar">
                  Solar Radiation Activity
                </div>
                <div class="Forecast__statsValue--solar">
                  <!-- {secondSolarRadiation.value}% -->
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--blackout">
                  Radio Blackout Activity
                </div>
                <div class="Forecast__statsValue--blackout">
                  <!-- {secondRadioBlackout.value}% -->
                </div>
              </div>
            </div>
          </div>
          <div class="Forecast__day">
            <div class="Forecast__dayLabel">
              <!-- {this.getMonthAbbr(thirdRadioBlackout.ts.getMonth())} {thirdRadioBlackout.ts.getDate()} -->
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
                  <!-- {thirdGeomagActivity.value} / 5 -->
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--solar">
                  Solar Radiation Activity
                </div>
                <div class="Forecast__statsValue--solar">
                  <!-- {thirdSolarRadiation.value}% -->
                </div>
              </div>
              <div class="Forecast__stats">
                <div class="Forecast__statsLabel--blackout">
                  Radio Blackout Activity
                </div>
                <div class="Forecast__statsValue--blackout">
                  <!-- {thirdRadioBlackout.value}% -->
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
            active-class="isActive"
            class="Panel__menuItem"
          >
            Forecast</nuxt-link
          >:
          <nuxt-link
            :to="{
              path: '/forecast',
              query: {
                show: 'alerts'
              }
            }"
            active-class="isActive"
            class="Panel__menuItem"
          >
            Alerts</nuxt-link
          >:
        </div>
      </div>
      <!-- {this.renderRightPanel()} -->
      <div class="Panel__footer"></div>
    </div>
  </section>
</template>
