<template>
  <q-page class="time-table-index">
    <QueryBlock @searchBtnClicked="searchTimeTable" />
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

export default defineComponent({
  name: 'PageIndex',
  components: { QueryBlock, Timetable },
  setup() {
    interface TimetalbeRef {
      getStationODTimetable: { (arg0: string, arg1: string): void };
    }
    const refTimetable = ref<TimetalbeRef>({} as TimetalbeRef);

    const searchTimeTable = (orgStationID: string, dstStationID: string) => {
      refTimetable.value?.getStationODTimetable(orgStationID, dstStationID);
    };
    return { refTimetable, searchTimeTable };
  },
});
</script>
