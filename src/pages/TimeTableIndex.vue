<template>
  <q-page class="time-table-index">
    <QueryBlock
      @searchBtnClicked="searchTimeTable"
      :initSsid="ssid"
      :initDsid="dsid"
    />
    <Timetable ref="refTimetable" />
  </q-page>
</template>

<style lang="sass" scoped>
.time-table-index
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  background: grey
</style>

<script lang="ts">
import QueryBlock from 'components/railway-timetable/QueryBlock.vue';
import Timetable from 'components/railway-timetable/Timetable.vue';
import { ref, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PageIndex',
  components: { QueryBlock, Timetable },
  setup() {
    // 取得 Timetalbe components 的 getStationODTimetable function
    interface TimetalbeRef {
      getStationODTimetable: { (arg0: string, arg1: string): void };
    }
    const refTimetable = ref<TimetalbeRef>({} as TimetalbeRef);

    const searchTimeTable = (orgStationID: string, dstStationID: string) => {
      refTimetable.value?.getStationODTimetable(orgStationID, dstStationID);
    };

    // 檢測 url 中的參數, 如果有指定 ssid 和 dsid 則以指定參數初始化查詢頁面
    const route = useRoute();
    const ssid = route.query?.ssid?.toString();
    const dsid = route.query?.dsid?.toString();
    if (ssid && dsid && ssid != '' && dsid != '') {
      // searchTimeTable(ssid, dsid);
    }

    return { refTimetable, searchTimeTable, ssid, dsid };
  },
});
</script>
