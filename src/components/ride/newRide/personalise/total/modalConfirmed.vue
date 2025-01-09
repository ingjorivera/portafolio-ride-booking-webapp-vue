<script setup lang="ts"></script>
<template>
  <div class="bg-white column" style="min-width: calc(480px * 2)">
    <div class="row">
      <div
        class="column"
        style="padding: 32px; min-width: 480px; gap: 40px; border-right: 1px solid #e2e2e2"
      >
        <div class="row items-center" style="gap: 10px">
          <i class="drv-check-square-broken" style="font-size: 32px; color: #0e855b"></i>
          <div style="font-size: 35px; color: #2e2e33">Booking confirmed</div>
        </div>
        <div class="column" style="gap: 32px">
          <div class="column" style="gap: 4px">
            <div class="subtitle">BOOKING ID</div>
            <div class="text">2YRM1Z</div>
          </div>

          <div class="column" style="gap: 4px">
            <div class="subtitle">VEHICLES</div>
            <div class="column" style="gap: 4px">
              <div class="column">
                <div class="text">1 Premium Sedan, 150€</div>
                <div class="sub_subtitle">Travelers: 2</div>
              </div>

              <div class="text">1 Luggage van 150€</div>
            </div>
          </div>
          <div class="column" style="gap: 4px">
            <div class="subtitle">MY SETTINGS</div>
            <div class="text">Reference:XXXXXXXX</div>
            <div class="text">Comission: +150€</div>
          </div>
        </div>
      </div>
      <div div class="column" style="padding: 32px; min-width: 480px; gap: 40px">
        <div style="font-size: 35px; color: #2e2e33">Itinerary</div>
        <div class="column" style="gap: 16px">
          <div class="row justify-between">
            <div class="subtitle">RIDE DETAILS</div>
            <div class="row items-center" style="gap: 5px; color: #58585c" @click="view_map = true">
              <div class="map">View Map</div>
              <i class="drv-map-01" style="font-size: 16px"></i>
            </div>
          </div>

          <div class="row justify-between">
            <div class="row items-center" style="gap: 5px">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7.50008H12.6667M12.6667 7.50008L6.83333 1.66675M12.6667 7.50008L6.83333 13.3334"
                  stroke="#2E2E33"
                  stroke-linecap="square"
                  stroke-linejoin="bevel"
                />
              </svg>
              One Way
            </div>
          </div>
          <div class="row justify-between items-center">
            <div class="subtitle">OUTBOUND</div>
            <div>16 de Abril</div>
          </div>
          <div class="column" style="gap: 16px; position: relative; padding-left: 16px">
            <div class="column">
              <div class="point subtitle">PICK UP</div>
              <div class="row justify-between">
                <div>Aeroport del Prat</div>
                <div>09:00 AM</div>
              </div>
            </div>
            <div class="column">
              <div class="point subtitle">DROP OFF</div>
              <div class="row justify-between">
                <div>Hotel Mandarín Oriental</div>
                <div>02:30 PM</div>
              </div>
            </div>
            <div class="bar_"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row items-center"
      style="border-top: 1px solid #e2e2e2; height: 82px; padding: 16px 32px; gap: 40px"
    >
      <div class="col row justify-between">
        <div class="total row items-center">
          Total &nbsp;
          <div class="subtext">(incl. tax)</div>
        </div>
        <div class="total">421.50€</div>
      </div>
      <div class="col row" style="gap: 16px">
        <q-btn
          color="accent"
          text-color="black"
          label="Add ride to this booking"
          no-caps
          unelevated
          class="col"
          style="background-color: #e6e2dc !important"
        ></q-btn>
        <q-btn
          color="accent"
          text-color="white"
          label="Start new booking"
          no-caps
          unelevated
          class="col"
        ></q-btn>
      </div>
    </div>
    <div class="row items-center justify-center" style="height: 74px; gap: 10px">
      <div>View booking</div>
      <i class="fa drv-arrow-narrow-right" style="font-size: 20px"></i>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  font-size: 12px;
  color: #58585c;
}
.sub_subtitle {
  font-size: 12px;
  color: #58585c;
}
.subtext {
  font-size: 15px;
  /* (incl. tax) */
}
.total {
  font-size: 20px;
  /* Total (incl. tax) */
}

.point {
  position: relative;
}
.point::before {
  content: '';
  position: absolute;
  top: 8px;
  left: -10px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgba(16, 16, 16, 0.8); /* Change to desired color and opacity */
  pointer-events: none; /* Ensure the overlay doesn't interfere with any click events */
}
.bar_ {
  position: absolute;
  left: 8px;
  top: 8px;
  width: 1px;
  height: calc(100% - 36px);

  background-color: #121212;
}
</style>
