<template>
  <div class="calendar-dimmer" v-if="schedulerModalVisible">
    <div class="calendar-content">
      <Calendar />
    </div>
    <div><b-button class="btn-danger" @click="closeModal">Close Scheduler</b-button></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar-scheduler'
import Calendar from './calendar'

var resourceView = true

export default {
  name: 'Scheduler',
  components: { Calendar },
  computed: {
    ...mapState(['schedulerModalVisible']),
  },
  methods: {
    ...mapMutations(['toggleSchedulerModal']),
    closeModal() {
      this.toggleSchedulerModal(false)
    }
  }
}
</script>

<style scoped>
  .calendar-dimmer {
    position: fixed;
    display: block;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .calendar-content {
    background-color: #fefefe;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding: 10px;
    width: 95%;
  }
</style>
