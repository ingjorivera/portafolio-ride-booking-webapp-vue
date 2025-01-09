<script setup lang="ts"></script>
<template>
  <div class="column services bg-secondary">
    <div class="services_top">
      <div class="title">{{ $t('texts.services') }}</div>
    </div>
    <div class="services_bottom row" style="gap: 20px">
      <div class="box1 col-4 boxes overlay column justify-end">
        <div class="text-white title_boxes">Private travel</div>
      </div>
      <div class="box2 col boxes overlay2 column justify-end" style="gap: 20px">
        <div class="text-white title_boxes">Corporate travel</div>

        <div class="text_boxes text-white">
          Whether you are embarking on a financial roadshow or the annual board
          meeting, Drivania corporate chauffeur services catered to C-level
          executives and global investors, guarantee the highest punctuality and
          readiness for unforeseen circumstances.
        </div>
        <div class="text_boxes text-white row items-center" style="gap: 10px">
          Read more <img src="../assets/svg/icons/arrow-right.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.services {
  height: 704px;
}
.services_top {
  padding: 50px 25px 0px 25px;
  height: 89px;
}
.services_bottom {
  padding: 40px 25px 40px 25px;
  height: 615px;
}
.boxes {
  border-radius: 4px;
  position: relative;
}
.boxes .title_boxes {
  position: relative;
}
.boxes .text_boxes {
  position: relative;
}
.box1 {
  background-image: url('../assets/images/box1.png');
  background-size: cover;
  background-position: right;
  padding: 0px 30px 20px 20px;
}
.box2 {
  background-image: url('../assets/images/box2.jpeg');
  background-size: cover;
  background-position: right;
  padding: 0px 180px 20px 20px;
}
.overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    25,
    25,
    25,
    0.2
  ); /* Change to desired color and opacity */
  pointer-events: none; /* Ensure the overlay doesn't interfere with any click events */
}
.overlay2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(
    25,
    25,
    25,
    0.4
  ); /* Change to desired color and opacity */
  pointer-events: none; /* Ensure the overlay doesn't interfere with any click events */
}
</style>
