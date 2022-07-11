<template>
  <q-page>
    <template v-for="(favSInfo, index) in favList" :key="index">
      <SearchCard
        :startStationName="gsn(regionMap, favSInfo.SSID)"
        :dstStationName="gsn(regionMap, favSInfo.DSID)"
      />
    </template>
  </q-page>
</template>

<style lang="sass" scoped></style>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { useStore } from 'src/store';
import { RegionMap, GetStationNameByStationID } from 'src/lib/struct/station';
import SearchCard from 'components/railway-timetable/SearchCard.vue';
import { SearchInfo, GetFavList } from 'src/lib/store/stationHistory';

export default defineComponent({
  name: 'Favorite',
  components: { SearchCard },
  setup() {
    const $store = useStore();
    const favList = ref([] as SearchInfo[]);
    const regionMap = ref({} as RegionMap);
    const gsn = GetStationNameByStationID;

    // 讀取最愛清單
    favList.value = GetFavList();

    onMounted(() => {
      regionMap.value = $store.state.region.map;
    });

    return {
      favList,
      regionMap,
      gsn,
    };
  },
});
</script>
