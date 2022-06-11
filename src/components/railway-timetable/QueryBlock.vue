<template>
  <div class="query-block">
    <div class="station-select-block">
      <span> 出發站 </span>
      <div style="width: 20px"></div>
      <q-select
        class="select region-select"
        bg-color="white"
        outlined
        v-model="orgSelectRegion"
        :options="regionNameList"
        label="地區"
        @update:model-value="updateOrgRegion(orgSelectRegion, 0)"
      />
      <div style="width: 20px"></div>
      <q-select
        class="select region-select"
        bg-color="white"
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
        class="select region-select"
        bg-color="white"
        outlined
        v-model="dstSelectRegion"
        :options="regionNameList"
        label="地區"
        @update:model-value="updateDstRegion(dstSelectRegion, 0)"
      />
      <div style="width: 20px"></div>
      <q-select
        class="select region-select"
        bg-color="white"
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
  width: 500px
  display: flex
  flex-direction: column
  align-items: center

.station-select-block
  display: flex
  flex-direction: row
  align-items: center

.region-select
  width: 150px

.select
  background-color: auto !important
</style>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { RegionMap, RegionInfo, StationInfo } from 'src/lib/struct/station';
import {
  UpdateSearchHistory,
  GetLastSearchHistory,
} from 'src/lib/store/station';
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
              updateSelector(data);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // 更新起訖站選擇器資訊
    function updateSelector(regionList: RegionInfo[]) {
      let lastSearchInfo = GetLastSearchHistory();
      if (lastSearchInfo != null) {
        orgSelectRegion.value = lastSearchInfo.StartRegion;
        dstSelectRegion.value = lastSearchInfo.DstRegion;
        updateOrgRegion(
          orgSelectRegion.value,
          lastSearchInfo.StartStation.Name.Zh_tw
        );
        updateDstRegion(
          dstSelectRegion.value,
          lastSearchInfo.DstStation.Name.Zh_tw
        );
        emitSearchInfo();
      } else {
        orgSelectRegion.value = regionList[0].Name;
        dstSelectRegion.value = regionList[1].Name;
        updateOrgRegion(orgSelectRegion.value, '');
        updateDstRegion(dstSelectRegion.value, '');
      }
    }

    // 更新起始站點選擇器 (selectStation 為空字串時，自動選擇區域中的第一個站點)
    function updateOrgRegion(selectRegion: string, selectStation: string) {
      // 初始化 Station List
      orgStationInfoList.value = regionMap.value[selectRegion];

      // 找尋指定站點的 index
      let stationIdx = 0;
      if (selectStation === '') {
        stationIdx = 0;
      } else {
        for (let i = 0; i < orgStationInfoList.value.length; i++) {
          let stationInfo = orgStationInfoList.value[i];
          if (
            stationInfo.Name.Zh_tw === selectStation ||
            stationInfo.Name.En === selectStation
          ) {
            stationIdx = i;
            break;
          }
        }
      }

      orgSelectStation.value = orgStationInfoList.value[stationIdx];
    }

    // 更新抵達站點選擇器 (selectStation 為空字串時，自動選擇區域中的第一個站點)
    function updateDstRegion(selectRegion: string, selectStation: string) {
      // 初始化 Station List
      dstStationInfoList.value = regionMap.value[selectRegion];

      // 找尋指定站點的 index
      let stationIdx = 0;
      if (selectStation === '') {
        stationIdx = 0;
      } else {
        for (let i = 0; i < orgStationInfoList.value.length; i++) {
          let stationInfo = orgStationInfoList.value[i];
          if (
            stationInfo.Name.Zh_tw === selectStation ||
            stationInfo.Name.En === selectStation
          ) {
            stationIdx = i;
            break;
          }
        }
      }
      dstSelectStation.value = dstStationInfoList.value[stationIdx];
    }

    // 發送查詢資訊
    function emitSearchInfo() {
      UpdateSearchHistory(
        orgSelectRegion.value,
        orgSelectStation.value,
        dstSelectRegion.value,
        dstSelectStation.value
      );

      target.emit(
        'searchBtnClicked',
        orgSelectStation.value.StationID,
        dstSelectStation.value.StationID
      );
    }

    void getRegionStation();

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
