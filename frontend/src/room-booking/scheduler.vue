<template>
  <div class="calendar-dimmer" v-if="scheduleDisplay">
    <div class="calendar-content">
      <div><b-button-close @click="hideScheduler" class="mb-3 ml-3" /></div>
      <full-calendar :events="events" :config="config"></full-calendar>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar-scheduler'

var resourceView = true

export default {
  name: 'Scheduler',
  data() {
    return {
      events: [
        ...function makeEvents() {
          let list = [1,2,4,5,6,7]
          let output = list.map(i=>
            ({
              title: `Event ${i}`,
              start:`2018-11-${i+12}T${i+7}:00:00`,
              end: `2018-11-${i+12}T${i+10}:00:00`,
              resourceId: 1,
            })
          )
          return output
        },
        {
          title: 'Exam1',
          start: '2018-11-07T12:00:00',
          end: '2018-11-07T16:00:00',
          resourceId: 'room1'
        },
        {
          title: 'Exam6',
          start: '2018-11-13T12:00:00',
          end: '2018-11-13T16:00:00',
          resourceId: 'room2'
        },
        {
          title: 'Exam6',
          start: '2018-11-19T12:00:00',
          end: '2018-11-19T16:00:00',
          resourceId: 'room2'
        },
        {
          title: 'Exam1',
          start: '2018-11-09T12:00:00',
          end: '2018-11-09T16:00:00',
          resourceId: 'room1'
        },
        {
          title: 'Exam2',
          start: '2018-11-09T13:00:00',
          end: '2018-11-09T17:00:00',
          resourceId: 'room3'
        }
      ],
      config: {
        resources: [
          {id: 'room1', title: 'Boardroom 1', eventColor: '#5bc0de' },
          {id: 'room2', title: 'Boardroom 2', eventColor: '#5477d9' },
          {id: 'room3', title: 'Office 6', eventColor: '#d9534f' },
          {id: 'room4', title: 'Flex Room', eventColor: '#d9534f' },
        ],
        defaultView: 'agendaDay',
        views: {
          agendaDay: {
            allDaySlot: false,
            height: 'auto',
          },
          agendaWeek: {
            allDaySlot: false,
            height: 'auto',
          },
          month: {
            groupByDateAndResource: false,
          }
        },
        height() {
          return window.innerHeight * .75
        },
        weekends: false,
        maxTime: '19:00:00',
        minTime: '7:00:00',
        buttonText: {
          list: 'List',
          listDay: 'Daily List',
          listWeek: 'Weekly List'
        },
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listWeek,listDay',
        },
        groupByDateAndResource: true,
      },
    }
  },

  computed: {
    ...mapState(['scheduleDisplay']),
  },

  methods: {
    ...mapMutations(['hideScheduler'])
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
