<template>
  <q-card bordered class="cursor-pointer search-info-card">
    <q-btn
      class="delete-btn q-pa-none text-red"
      icon="delete"
      size="13px"
      round
      @click="emitDelete"
      v-if="true"
    />
    <div @click="toSearchPage(ssidStr, dsidStr)">
      <q-card-section />
      <q-card-section align="center" class="q-py-sm station-section">
        <div>{{ startStationName }}</div>
        <div style="height: 15px"></div>
        <div>{{ dstStationName }}</div>
      </q-card-section>
      <q-card-section />
    </div>
  </q-card>
</template>

<style lang="sass" scoped>
.search-info-card
  width: 175px
.delete-btn
    position: absolute
    top: 3px
    right: 3px
    z-index: 1
.station-section
  font-size: 20px
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { GetStationNameByStationID } from 'src/lib/struct/station';

export default defineComponent({
  name: 'SearchCard',
  props: {
    ssid: String,
    dsid: String,
  },
  setup(props, target) {
    const router = useRouter();
    const $store = useStore();
    const ssidStr = props.ssid as string;
    const dsidStr = props.dsid as string;

    const startStationName = GetStationNameByStationID(
      $store.state.region.map,
      ssidStr
    );
    const dstStationName = GetStationNameByStationID(
      $store.state.region.map,
      dsidStr
    );

    async function toSearchPage(ssid: string, dsid: string) {
      await router.push('/search?ssid=' + ssid + '&dsid=' + dsid);
    }

    // 發送刪除訊號
    function emitDelete() {
      target.emit('deleteSearchInfo', ssidStr, dsidStr);
    }

    return {
      ssidStr,
      dsidStr,
      startStationName,
      dstStationName,
      toSearchPage,
      emitDelete,
    };
  },
});
</script>
