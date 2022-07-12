<template>
  <q-page>
    <div class="row wrap">
      <template
        v-for="favSInfo in favList"
        :key="favSInfo.SSID + favSInfo.DSID"
      >
        <SearchCard
          dark
          :ssid="favSInfo.SSID"
          :dsid="favSInfo.DSID"
          class="search-card bg-grey-9"
          @deleteSearchInfo="deleteFavSInfo"
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
  GetFavList,
  DelFavSearchInfoByInfo,
} from 'src/lib/store/stationHistory';

export default defineComponent({
  name: 'FavoritePage',
  components: { SearchCard },
  setup() {
    const $store = useStore();
    const favList = ref([] as SearchInfo[]);
    const regionMap = ref({} as RegionMap);

    // 讀取最愛清單
    function readFavList() {
      favList.value = GetFavList();
    }

    onMounted(() => {
      // 讀取 regionMap
      regionMap.value = $store.state.region.map;
      readFavList();
    });

    // 刪除指定 favorite search info
    function deleteFavSInfo(ssid: string, dsid: string) {
      DelFavSearchInfoByInfo({ SSID: ssid, DSID: dsid });
      readFavList();
    }

    return {
      favList,
      regionMap,
      deleteFavSInfo,
    };
  },
});
</script>
