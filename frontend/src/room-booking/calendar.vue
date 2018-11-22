<template>
  <div>
      <div class="title inline-title">{{ title }}</div>
      <div class="inline-title">Legend:</div>
      <div class="inline-title legend"
           v-for="res in resources"
           :style="{backgroundColor: res.eventColor}">
        {{ res.title }}
      </div>
        <full-calendar ref="calendar"
                       key="calendar"
                       class="calendar-margins"
                       @view-render="viewRender"
                       :events="eventsSource"
                       :config="configuration"></full-calendar>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import 'fullcalendar/dist/fullcalendar.css'
import 'fullcalendar-scheduler'
import Nav from '@/layout/nav'
import ButtonsCalendar from './buttons-calendar'
import ButtonsScheduler from './buttons-scheduler'

export default {
  name: 'Calendar',
  components: { ButtonsScheduler, ButtonsCalendar, Nav },
  mounted() {
    this.$root.$on('next', () => { this.next() })
    this.$root.$on('prev', () => { this.prev() })
    this.$root.$on('today', () => { this.today() })
    this.$root.$on('month', () => { this.month() })
    this.$root.$on('listWeek', () => { this.listWeek() })
    this.$root.$on('listDay', () => { this.listDay() })
    this.$root.$on('agendaWeek', () => { this.agendaWeek() })
    this.$root.$on('agendaDay', () => { this.agendaDay() })

  },
  data() {
    return {
      config: {
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        showNonCurrentDates: false,
        fixedWeekCount: false,
        navLinks: true,
        defaultView: 'listDay',
        views: {
          agendaDay: {
            allDaySlot: false,
          },
          agendaWeek: {
            allDaySlot: false,
          },
        },
        height() {
          return window.innerHeight - 230
        },
        weekends: false,
        maxTime: '18:00:00',
        minTime: '8:00:00',
        header: {
          left: null,
          center: null,
          right: null
        },
        groupByDateAndResource: true
      },
      title: '',
    }
  },

  computed: {
    ...mapState(['calendarScheduleMode', 'eventsSource', 'resources']),
    configuration() {
      let configuration = this.config
      configuration.resources = this.resources
      return configuration
    },
  },

  methods: {
    ...mapMutations([
      'toggleBookRoomModal',
      'setCalendarView'
    ]),
    addOtherEvent() {
      this.$refs.calendar.fireMethod('changeView', 'month')
    },
    eventRender(event) {
      console.log(event)
    },
    viewRender(view, el) {
      this.title = view.title
    },
    eventSelected(a,b,c) {
      console.log(a)
    },
    invigilators() {
      this.toggleInvigilatorModal(true)
    },
    next() {
      console.log('calendar method next')
      this.$refs.calendar.fireMethod('next')
    },
    prev() {
      console.log('calendar method prev')
      this.$refs.calendar.fireMethod('prev')
    },
    today() {
      this.$refs.calendar.fireMethod('today')
    },
    month() {
      this.$refs.calendar.fireMethod('changeView', 'month')
      this.setCalendarView('month')
    },
    listDay() {
      this.$refs.calendar.fireMethod('changeView', 'listDay')
      console.log('it goes this far')
      this.setCalendarView('listDay')
    },
    listWeek() {
      this.$refs.calendar.fireMethod('changeView', 'listWeek')
      this.setCalendarView('listWeek')
    },
    agendaWeek() {
      this.$refs.calendar.fireMethod('changeView', 'agendaWeek')
      this.setCalendarView('agendaWeek')
    },
    agendaDay() {
      this.$refs.calendar.fireMethod('changeView', 'agendaDay')
      this.setCalendarView('agendaDay')
    }
  }
}
</script>

<style scoped>
.flex-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: start;
}
.calendar-dimmer {
  position: fixed;
  display: block;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.calendar-content {
  background-color: #fefefe;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  padding: 10px;
  width: 95%;
}
.title {
  font-size: 2rem;
  font-weight: 600;
}
.inline-title {
  display: inline;
  margin: 0px 0px -30px 20px;
}
.legend {
  height: 25px;
  padding: 3px;
  color: black;
}
.calendar-margins {
  margin-top: -35px;
  margin-left: 20px;
  padding: 0px;
}


</style>
