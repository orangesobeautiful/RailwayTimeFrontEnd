<template>
  <div class="query-block-w query-block">
    <div class="query-block-w favorite">
      <q-icon
        :name="isFav ? 'favorite' : 'favorite_border'"
        color="red"
        size="32px"
        v-on:click="favChange"
      />
    </div>
    <div class="query-block">
      <span class="station-type-name"> 出發站 </span>
      <div class="station-select-block">
        <q-select
          class="select"
          bg-color="white"
          outlined
          v-model="orgSelectRegion"
          :options="regionNameList"
          label="地區"
          @update:model-value="
            updateOrgRegion(orgSelectRegion, ''), checkIsFav()
          "
        />
        <div style="width: 20px"></div>
        <q-select
          class="select"
          bg-color="white"
          outlined
          v-model="orgSelectStation"
          :options="orgStationInfoList"
          :option-label="(opt) => opt?.Name?.Zh_tw"
          option-value="StationID"
          label="車站"
          @update:model-value="checkIsFav()"
        />
      </div>
    </div>
    <div class="query-block-w query-block">
      <span class="station-type-name"> 抵達站 </span>
      <div class="station-select-block">
        <q-select
          class="select"
          bg-color="white"
          outlined
          v-model="dstSelectRegion"
          :options="regionNameList"
          label="地區"
          @update:model-value="
            updateDstRegion(dstSelectRegion, ''), checkIsFav()
          "
        />
        <div style="width: 20px"></div>
        <q-select
          class="select"
          bg-color="white"
          outlined
          v-model="dstSelectStation"
          :options="dstStationInfoList"
          :option-label="(opt) => opt?.Name?.Zh_tw"
          label="車站"
          @update:model-value="checkIsFav()"
        />
      </div>
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

.query-block-w
  width: 350px
.query-block
  display: flex
  flex-direction: column
  align-items: center

.favorite
  margin-top: 7px

.station-select-block
  display: flex
  flex-direction: row
  align-items: center

.station-type-name
  padding: 5px 0px

.select
  width: 150px
  background-color: auto !important
</style>

<script lang="ts">
import { ref, defineComponent, onBeforeMount } from 'vue';
import {
  RStationInfo,
  RegionMap,
  StationInfo,
  GetRegionData,
  FindRegionByStation,
} from 'src/lib/struct/station';
import {
  SearchInfo,
  DetailSearchInfo,
  UpdateSearchHistory,
  GetLastSearchHistory,
  FindFavIdx,
  DelFavSearchInfoByIdx,
  AddFavSearchInfo,
} from 'src/lib/store/stationHistory';

export default defineComponent({
  name: 'QueryBlock',
  emits: ['searchBtnClicked'],
  components: {},
  props: {
    initSsid: String,
    initDsid: String,
  },
  setup(props, target) {
    const regionMap = ref({} as RegionMap);
    const regionNameList = ref([] as string[]);
    const orgStationInfoList = ref([] as StationInfo[]);
    const dstStationInfoList = ref([] as StationInfo[]);

    const orgSelectRegion = ref('');
    const orgSelectStation = ref({} as StationInfo);
    const dstSelectRegion = ref('');
    const dstSelectStation = ref({} as StationInfo);

    const isFav = ref(false);

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

    // 初始化選擇的站點選項
    function initSelector() {
      let specifySInfo: DetailSearchInfo | null = null;
      let sRSInfo: RStationInfo | null = null;
      let dRSInfo: RStationInfo | null = null;
      if (
        props.initSsid != undefined &&
        props.initDsid != undefined &&
        props.initSsid != '' &&
        props.initDsid != ''
      ) {
        // 判斷是否有從 url 指派的搜尋站點
        sRSInfo = FindRegionByStation(regionMap.value, props.initSsid);
        dRSInfo = FindRegionByStation(regionMap.value, props.initDsid);
      } else {
        // 套用上次的搜尋歷史紀錄
        let lastSInfo = GetLastSearchHistory();
        if (lastSInfo != null) {
          sRSInfo = FindRegionByStation(regionMap.value, lastSInfo.SSID);
          dRSInfo = FindRegionByStation(regionMap.value, lastSInfo.DSID);
        }
      }

      if (sRSInfo != null && dRSInfo != null) {
        specifySInfo = {
          StartRegion: sRSInfo.RegionName,
          StartStation: sRSInfo,
          DstRegion: dRSInfo.RegionName,
          DstStation: dRSInfo,
        };
      }

      if (specifySInfo != null) {
        orgSelectRegion.value = specifySInfo.StartRegion;
        dstSelectRegion.value = specifySInfo.DstRegion;
        updateOrgRegion(
          orgSelectRegion.value,
          specifySInfo.StartStation.Name.Zh_tw
        );
        updateDstRegion(
          dstSelectRegion.value,
          specifySInfo.DstStation.Name.Zh_tw
        );
        emitSearchInfo();
      } else {
        if (regionNameList.value.length > 1) {
          orgSelectRegion.value = regionNameList.value[0];
          dstSelectRegion.value = regionNameList.value[1];
        }
        updateOrgRegion(orgSelectRegion.value, '');
        updateDstRegion(dstSelectRegion.value, '');
      }
    }

    // 發送查詢資訊
    function emitSearchInfo() {
      UpdateSearchHistory(
        orgSelectStation.value.StationID,
        dstSelectStation.value.StationID
      );

      target.emit(
        'searchBtnClicked',
        orgSelectStation.value.StationID,
        dstSelectStation.value.StationID
      );
    }

    function curSearchInfo(): SearchInfo {
      return {
        SSID: orgSelectStation.value.StationID,
        DSID: dstSelectStation.value.StationID,
      };
    }

    function checkIsFav() {
      if (FindFavIdx(curSearchInfo()) < 0) {
        isFav.value = false;
      } else {
        isFav.value = true;
      }
    }

    function favChange() {
      if (isFav.value) {
        // 刪除 favorite
        const findIdx = FindFavIdx(curSearchInfo());
        if (0 <= findIdx) {
          DelFavSearchInfoByIdx(findIdx);
        }
      } else {
        // 新增 favorite
        AddFavSearchInfo(curSearchInfo());
      }
      isFav.value = !isFav.value;
    }

    onBeforeMount(async () => {
      const regionData = await GetRegionData();
      regionNameList.value = regionData.NameList;
      regionMap.value = regionData.Map;
      void initSelector();
      void checkIsFav();
    });

    return {
      regionNameList,
      orgStationInfoList,
      dstStationInfoList,
      orgSelectRegion,
      orgSelectStation,
      dstSelectRegion,
      dstSelectStation,
      updateOrgRegion,
      checkIsFav,
      updateDstRegion,
      emitSearchInfo,
      isFav,
      favChange,
    };
  },
});
</script>
