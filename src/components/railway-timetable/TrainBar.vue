<template>
  <div class="train-bar">
    <q-separator v-if="itemIndex != 0" class="split-line" />
    <div class="train-info">
      <span class="train-info-text">{{ trainNo }}</span>
      <span class="train-info-text"> {{ trainTypeName }}</span>
    </div>

    <div class="text-vertical-center delay-time-text">
      <div v-if="delayMinute > 0">
        <span>延遲</span>
        <span> {{ delayMinute }}</span>
        <span>分鐘</span>
      </div>
    </div>
    <div class="time-info text-vertical-center">
      <span class="text-vertical-center time-attr-text">出發</span>
      <span class="time-info-text">{{ orgDepartureTime }}</span>
      <div style="width: 20px" />
      <span class="text-vertical-center time-attr-text">抵達</span>
      <span class="time-info-text">{{ desArrivalTime }}</span>
      <div style="width: 20px" />
    </div>
  </div>
</template>

<style lang="sass" scoped>

.split-line
  margin: 15px 0px
  width: 95%
  background: $orange

.train-bar
  display: flex
  flex-direction: column
  align-items: center
  padding-bottom: 15px
  width: 100%
  max-width: 800px
  background: white

.train-info
  padding: 5px

.train-info-text
  text-align: center
  font-size: 20px
  padding-right: 10px

.time-info
  display: flex
  flex-wrap:  wrap
  padding-bottom: 0px

.text-vertical-center
  display: flex
  align-items: center

.time-attr-text
  margin-right: 15px
  font-size: 17px

.time-info-text
  width: 80px
  font-size: 30px

.delay-time-text
  height: 23px
  color: red
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrainBar',
  components: {},
  props: {
    itemIndex: Number,
    trainNo: String,
    trainTypeName: String,
    orgDepartureTime: String,
    desArrivalTime: String,
    delayMinute: Number,
  },

  setup() {
    return {};
  },
});
</script>
