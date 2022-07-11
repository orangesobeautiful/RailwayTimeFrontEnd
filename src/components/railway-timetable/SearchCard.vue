<template>
  <q-card
    dark
    bordered
    class="bg-grey-9 search-info-card"
    @click="toSearchPage('1234', '5678')"
  >
    <q-btn
      class="delete-btn q-pa-none text-red"
      icon="delete"
      size="13px"
      round
      v-if="false"
    />
    <q-card-section />
    <q-card-section align="center" class="q-py-sm station-section">
      <div>{{ startStationName }}</div>
      <div style="height: 15px"></div>
      <div>{{ dstStationName }}</div>
    </q-card-section>
    <q-card-section />
  </q-card>
</template>

<style lang="sass" scoped>
.search-info-card
  max-width: 150px
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

export default defineComponent({
  name: 'SearchCard',
  props: {
    startStationName: String,
    dstStationName: String,
  },
  setup() {
    const router = useRouter();

    async function toSearchPage(ssid: string, dsid: string) {
      await router.push('/search?ssid=' + ssid + '&dsid=' + dsid);
    }
    return { toSearchPage };
  },
});
</script>
