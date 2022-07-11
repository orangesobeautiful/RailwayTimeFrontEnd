<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { api } from 'boot/axios';
import { useStore } from 'src/store';
import { RegionInfo, RegionMap } from 'src/lib/struct/station';

export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore();

    async function getRegionStation() {
      const urlPath = '/railway/region';
      await api
        .get(urlPath)
        .then((res) => {
          const data = res.data as RegionInfo[];
          if (data) {
            if (data.length > 0) {
              let nameList = [] as string[];
              let regionMap = {} as RegionMap;
              data.forEach((regionInfo) => {
                nameList.push(regionInfo.Name);
                regionMap[regionInfo.Name] = regionInfo.StationList;
              });
              $store.commit('region/setNameList', nameList);
              $store.commit('region/setMap', regionMap);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onBeforeMount(async () => {
      await getRegionStation();
    });

    return {};
  },
});
</script>
