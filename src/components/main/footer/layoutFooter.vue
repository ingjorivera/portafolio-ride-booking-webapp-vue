<script setup lang="ts">
import footerTopLeft from './footerTop/footerTopLeft.vue'
import footerTopRight from './footerTop/footerTopRight.vue'
import footerTopCenter from './footerTop/footerTopCenter.vue'
import footerBottomLeft from './footerBottom/footerBottomLeft.vue'
import footerBottomRight from './footerBottom/footerBottomRight.vue'
import footerBottomCenter from './footerBottom/footerBottomCenter.vue'
</script>
<template>
  <div class="column footer_layout">
    <div class="row border_top footer_top justify-between items-center">
      <footerTopLeft style="width: 215px"></footerTopLeft>
      <footerTopCenter></footerTopCenter>
      <footerTopRight style="width: 215px"></footerTopRight>
    </div>

    <div
      class="row tam_bottom border_top footer_bottom justify-between"
      style="font-size: 12px"
    >
      <footerBottomLeft style="width: 280px"></footerBottomLeft>
      <footerBottomCenter></footerBottomCenter>
      <footerBottomRight style="width: 280px"></footerBottomRight>
    </div>
  </div>
</template>

<style scoped>
.footer_layout {
  width: 100%;
  background-color: #2e2e33;
}
.border_top {
  border-top: 1px solid #58585c;
}
.tam_bottom {
  height: 79px;
}

.footer_top {
  padding: 50px 25px 50px 25px;
}
.footer_bottom {
  padding: 30px 25px 30px 25px;
}
</style>
