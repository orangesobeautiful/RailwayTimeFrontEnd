<template>
  <q-page class="column justify-center items-center bg-grey">
    <q-card class="my-card bg-white text-balck">
      <q-card-section>
        <div class="text-body1">
          此為方便查詢台鐵即時誤點狀態而建立的網站，由於諸多因素影響，本站無法保證資料的即時正確性，請勿將此資訊作為列車真實動態的依據。
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-body1">
          此為開源專案，若有相關問題或建議歡迎到
          <a
            href="https://github.com/orangesobeautiful/RailwayTimeFrontEnd"
            class="text-link"
            >GitHub</a
          >
          上提出。
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="">
        <div class="text">
          本站資料來源來自 ptx 和 TDX 平台，在此提供各平台的授權條款連結
        </div>
        <div class="column">
          <a href="https://ptx.transportdata.tw/PTX/APIS/Terms" target="_blank">
            <q-img
              src="https://ptx.transportdata.tw/PTX/Content/Images/logo.png"
              width="100px"
            />
          </a>
          <a href="https://tdx.transportdata.tw/term" target="_blank">
            <q-img
              src="https://tdx.transportdata.tw/img/logo.8a74dc01.png"
              width="100px"
            />
          </a>
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style lang="sass" scoped>
.text-link
  text-decoration: none
.my-card
  width: 100%
  max-width: 630px
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutPage',
  components: {},
  setup() {
    return {};
  },
});
</script>
