<template>
  <div class="train-bar-container">
    <train-bar
      v-for="(trainTimeInfo, index) in trainTimeInfoList"
      :key="trainTimeInfo.TrainInfo.TrainNo"
      :itemIndex="index"
      :trainNo="trainTimeInfo.TrainInfo.TrainNo"
      :trainNote="trainTimeInfo.TrainInfo.Note"
      :trainTypeName="trainTimeInfo.TrainInfo.TrainTypeName.Zh_tw"
      :orgDepartureTime="trainTimeInfo.OriginStationStopTime.DepartureTime"
      :desArrivalTime="trainTimeInfo.DestinationStationStopTime.ArrivalTime"
      :delayMinute="trainTimeInfo.DelayMinute"
    />
  </div>
</template>

<style lang="sass" scoped>
.train-bar-container
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
</style>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import TrainBar from './TrainBar.vue';
import { TrainTimeInfo } from 'src/lib/struct/train';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'Timetable',
  components: { 'train-bar': TrainBar },
  setup() {
    // 渲染
    const trainTimeInfoList = ref([] as TrainTimeInfo[]);
    async function getStationODTimetable(
      orgStationID: string,
      dstStationID: string
    ) {
      const urlPath =
        '/railway/timetable/OD/' + orgStationID + '/to/' + dstStationID;
      await api
        .get(urlPath)
        .then((res) => {
          let data = res.data as TrainTimeInfo[];
          trainTimeInfoList.value = [];
          if (data) {
            const nowTime = new Date();
            for (let i = 0; i < data.length; i++) {
              // 設定表定的最晚抵達時間
              let departureTime = new Date();
              let timeSplit =
                data[i].OriginStationStopTime.DepartureTime.split(':');
              departureTime.setHours(
                Number(timeSplit[0]),
                Number(timeSplit[1]),
                59,
                999
              );

              // 決定要不要顯示該時刻表資訊
              let showThisTimeInfo = false;
              if (departureTime >= nowTime) {
                // 抵達時間比現在晚
                showThisTimeInfo = true;
              } else {
                if (
                  data[i].DelayMinute != 0 &&
                  departureTime.getTime() +
                    (data[i].DelayMinute + 1) * 60 * 1000 >
                    nowTime.getTime()
                ) {
                  // 抵達時間 + 延誤時間+1 > 現在時間
                  showThisTimeInfo = true;
                }
              }

              if (showThisTimeInfo) {
                trainTimeInfoList.value.push(data[i]);
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return { trainTimeInfoList, getStationODTimetable };
  },
});
</script>
