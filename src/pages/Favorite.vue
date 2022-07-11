<template>
  <q-page>
    <template v-for="(favSInfo, index) in favList" :key="index">
      <SearchCard
        :startStationName="favSInfo.StartStation.Name.Zh_tw"
        :dstStationName="favSInfo.DstStation.Name.Zh_tw"
      />
    </template>
  </q-page>
</template>

<style lang="sass" scoped></style>

<script lang="ts">
import SearchCard from 'components/railway-timetable/SearchCard.vue';
import { ref, defineComponent } from 'vue';
import { SearchInfo, GetFavList } from 'src/lib/store/stationHistory';

export default defineComponent({
  name: 'Favorite',
  components: { SearchCard },
  setup() {
    const favList = ref([] as SearchInfo[]);

    favList.value = GetFavList();

    return {
      favList,
    };
  },
});
</script>
