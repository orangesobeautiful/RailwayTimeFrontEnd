<template>
  <q-page>
    <div class="row wrap">
      <template
        v-for="favSInfo in historyList"
        :key="favSInfo.SSID + favSInfo.DSID"
      >
        <SearchCard
          dark
          :ssid="favSInfo.SSID"
          :dsid="favSInfo.DSID"
          class="search-card bg-blue-14"
          @deleteSearchInfo="deleteHistorySInfo"
        />
      </template>
    </div>
  </q-page>
</template>

<style lang="sass" scoped>
.search-card
  margin: 20px 0 0 20px
</style>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import { useStore } from 'src/store';
import { RegionMap } from 'src/lib/struct/station';
import SearchCard from 'components/railway-timetable/SearchCard.vue';
import {
  SearchInfo,
  ReadSearchHistory,
  DelHistorySearchInfoByInfo,
} from 'src/lib/store/stationHistory';

export default defineComponent({
  name: 'Favorite',
  components: { SearchCard },
  setup() {
    const $store = useStore();
    const historyList = ref([] as SearchInfo[]);
    const regionMap = ref({} as RegionMap);

    // 讀取歷史清單
    function readHistoryList() {
      historyList.value = ReadSearchHistory();
    }

    onMounted(() => {
      // 讀取 regionMap
      regionMap.value = $store.state.region.map;
      readHistoryList();
    });

    // 刪除指定 history search info
    function deleteHistorySInfo(ssid: string, dsid: string) {
      DelHistorySearchInfoByInfo({ SSID: ssid, DSID: dsid });
      readHistoryList();
    }

    return {
      historyList,
      regionMap,
      deleteHistorySInfo,
    };
  },
});
</script>
