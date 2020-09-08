<template>
  <section class="Forecast isActive">
    <Panel class="Forecast__graphs" title="3-day Forecast">
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
    </Panel>
    <Panel class="Forecast__alerts" title="Alerts">
      <template v-slot:menu>
        <nav class="Panel__menu">
          <nuxt-link
            :to="{
              path: '/forecast',
              query: {
                show: 'forecast'
              }
            }"
            active-class="isActive"
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
            active-class="isActive"
          >
            Alerts
          </nuxt-link>
        </nav>
      </template>
    </Panel>
  </section>
</template>


<style lang="scss" scoped>

.Forecast__alerts {
  flex: 0 1 40%;
  display: flex;
}

.Forecast__graphs {
  flex: 0 0 60%;
}

.Alert__metadata {
  display: flex;
  font-size: 0.75rem;
  color: $color-base;
}
.Alert {
  position: relative;
  padding: 0.5rem 1rem;
  flex: 0 0 auto;
}
.Alert__basicInfo:before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  height: 1px;
  width: 2rem;
  background-color: $color-accent;
  transition: width 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.Forecast__days {
  flex: 1;
  display: flex;
  align-items: stretch;
  margin: 0 -1rem;
}
.Forecast__day {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem 1rem 0;
}
.Forecast__dayLabel {
  text-transform: uppercase;
  font-size: 1rem;
  flex: 0 0 auto;
  text-align: left;
  color: #ebfaf6;
}
.Forecast__dayData {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.RadialDanger {
  width: 100%;
  fill: transparent;
  margin-bottom: 1rem;
}
.RadialDanger__base,
.RadialDanger__base--initial,
.RadialDanger__geomagnetic,
.RadialDanger__solar,
.RadialDanger__blackout {
  stroke-width: 1px;
  /* vector-effect: non-scaling-stroke; */
}
.RadialDanger__base,
.RadialDanger__base--initial {
  stroke: rgba(96,159,142,0.2);
}
.RadialDanger__base--initial {
  fill: #000;
}
.RadialDanger__geomagnetic {
  stroke: #eb8947;
  fill: rgba(235,137,71,0.05);
}
.RadialDanger__solar {
  stroke: #e0eb47;
  fill: rgba(224,235,71,0.05);
}
.RadialDanger__blackout {
  stroke: #47ebbf;
  fill: rgba(71,235,191,0.05);
}
.RadialDanger__divider {
  /* vector-effect: non-scaling-stroke; */
  stroke-width: 1px;
  stroke: #000;
}
.Forecast__stats {
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background-color: rgba(96,159,142,0.1);
  border-radius: 0.125rem;
}
.Forecast__statsLabel,
.Forecast__statsLabel--geomagnetic,
.Forecast__statsLabel--solar,
.Forecast__statsLabel--blackout {
  flex: 1;
  margin-right: 1rem;
  text-transform: uppercase;
  font-size: 0.75rem;
}
.Forecast__statsValue,
.Forecast__statsValue--geomagnetic,
.Forecast__statsValue--solar,
.Forecast__statsValue--blackout {
  flex: 0 0 40%;
  font-size: 1.25rem;
  text-align: right;
}
.Forecast__statsValue--solar {
  font-size: 1rem;
}
.Forecast__statsLabel--geomagnetic,
.Forecast__statsValue--geomagnetic {
  color: #eb8947;
}
.Forecast__statsLabel--solar,
.Forecast__statsValue--solar {
  color: #e0eb47;
}
.Forecast__statsLabel--blackout,
.Forecast__statsValue--blackout {
  color: #47ebbf;
}
.GraphDanger__geomagnetic,
.GraphDanger__solar,
.GraphDanger__blackout {
  border: 1px solid;
  width: 2rem;
  margin: 0 0.5rem;
  position: relative;
}
.GraphDanger__geomagneticFill,
.GraphDanger__solarFill,
.GraphDanger__blackoutFill {
  position: absolute;
  bottom: 3px;
  left: 3px;
  right: 3px;
  top: 3px;
  transform-origin: 0% 100%;
  transform: scaleY(0.3);
}
.GraphDanger {
  height: 30vh;
  display: flex;
  padding: 1rem 0 2rem;
  justify-content: center;
  align-items: stretch;
}
.GraphDanger__geomagneticFill {
  background-color: #eb8947;
}
.GraphDanger__solarFill {
  background-color: #e0eb47;
}
.GraphDanger__blackoutFill {
  background-color: #47ebbf;
}

.Forecast__rationale,
.Alerts {
  position: absolute;
  top: 1rem;
  left: 0;
  width: 100%;
  bottom: 1rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
.Alert--summary .Alert__basicInfo:before {
  background-color: #b39e4d;
}
.Alert--warning .Alert__basicInfo:before {
  background-color: #f24a0d;
}
.Alert--watch .Alert__basicInfo:before {
  background-color: #cc7033;
}
.Alert--extendedWarning .Alert__basicInfo:before {
  background-color: #f24a0d;
}
.Alert--cancelWarning .Alert__basicInfo:before {
  background-color: #7e9966;
}
.Alert:hover .Alert__message {
  color: #ebfaf6;
}
.Alert:hover .Alert__basicInfo {
  transition: background-color 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  background-color: rgba(96,159,142,0.1);
}
.Alert:hover .Alert__basicInfo:before,
.Alert__input:checked ~ .Alert__basicInfo:before {
  width: 6rem;
  transition: width 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.Alert__basicInfo {
  display: block;
  padding-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.Alert__issueTime {
  margin-right: 1rem;
}
.Alert__message {
  color: #adebda;
  text-transform: uppercase;
}
.Alert__extendedInfo {
  max-height: 0;
  overflow: hidden;
  margin-bottom: 1rem;
  white-space: pre-wrap;
  transform: translate3d(0, 0, 0);
  transition: max-height 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.Alert__input:checked ~ .Alert__extendedInfo {
  max-height: 20rem;
  transform: translate3d(0, 0, 0);
  transition: max-height 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

</style>
