<template>
  <div class="query-block">
    <div class="station-select-block">
      <span> 出發站 </span>
      <div style="width: 20px"></div>
      <q-select
        class="region-select"
        outlined
        v-model="orgSelectRegion"
        :options="regionNameList"
        label="地區"
        @update:model-value="updateOrgRegion"
      />
      <div style="width: 20px"></div>
      <q-select
        class="region-select"
        outlined
        v-model="orgSelectStation"
        :options="orgStationInfoList"
        :option-label="(opt) => opt?.Name?.Zh_tw"
        option-value="StationID"
        label="車站"
      />
    </div>
    <div class="station-select-block">
      <span> 抵達站 </span>
      <div style="width: 20px"></div>
      <q-select
        class="region-select"
        outlined
        v-model="dstSelectRegion"
        :options="regionNameList"
        label="地區"
        @update:model-value="updateDstRegion"
      />
      <div style="width: 20px"></div>
      <q-select
        class="region-select"
        outlined
        v-model="dstSelectStation"
        :options="dstStationInfoList"
        :option-label="(opt) => opt?.Name?.Zh_tw"
        label="車站"
      />
    </div>
    <q-btn
      color="deep-orange"
      glossy
      label="Search"
      style="margin: 5px"
      @click="emitSearchInfo"
    />
  </div>
</template>

<style lang="sass" scoped>
.query-block
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
.station-select-block
  display: flex
  flex-direction: row
  align-items: center
.region-select
  width: 150px
</style>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { RegionMap, RegionInfo, StationInfo } from 'src/lib/struct/station';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'QueryBlock',
  emits: ['searchBtnClicked'],
  components: {},

  setup(props, target) {
    const regionMap = ref({} as RegionMap);
    const regionNameList = ref([] as string[]);
    const orgStationInfoList = ref([] as StationInfo[]);
    const dstStationInfoList = ref([] as StationInfo[]);

    const orgSelectRegion = ref('');
    const orgSelectStation = ref({} as StationInfo);
    const dstSelectRegion = ref('');
    const dstSelectStation = ref({} as StationInfo);

    async function getRegionStation() {
      const urlPath = '/railway/region';
      await api
        .get(urlPath)
        .then((res) => {
          let data = res.data as RegionInfo[];
          if (data) {
            if (data.length > 0) {
              data.forEach((regionInfo) => {
                regionNameList.value.push(regionInfo.Name);
                regionMap.value[regionInfo.Name] = regionInfo.StationList;
              });
              orgSelectRegion.value = data[0].Name;
              dstSelectRegion.value = data[1].Name;
              updateOrgRegion();
              updateDstRegion();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // 更新站點選擇器
    function updateOrgRegion() {
      orgStationInfoList.value = regionMap.value[orgSelectRegion.value];
      orgSelectStation.value = orgStationInfoList.value[0];
    }

    function updateDstRegion() {
      dstStationInfoList.value = regionMap.value[dstSelectRegion.value];
      dstSelectStation.value = dstStationInfoList.value[0];
    }

    // 發送查詢資訊
    function emitSearchInfo() {
      target.emit(
        'searchBtnClicked',
        orgSelectStation.value.StationID,
        dstSelectStation.value.StationID
      );
    }

    void getRegionStation();

    console.log(regionNameList);
    return {
      regionNameList,
      orgStationInfoList,
      dstStationInfoList,
      orgSelectRegion,
      orgSelectStation,
      dstSelectRegion,
      dstSelectStation,
      updateOrgRegion,
      updateDstRegion,
      emitSearchInfo,
    };
  },
});
</script>
