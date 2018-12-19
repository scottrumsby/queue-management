<template>
  <div>
    <div class="title inline-title">{{ title }}</div>
    <keep-alive>
      <full-calendar ref="qcalendar"
                     key="qcalendar"
                     class="calendar-margins"
                     @view-render="viewRender"
                     @event-render="eventRender"
                     :events="events"
                     :config="configuration"></full-calendar>
    </keep-alive>
  </div>

</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import 'fullcalendar/dist/fullcalendar.css'
  import 'fullcalendar-scheduler'

  export default {
    name: 'Calendar',
    created() {
      this.getExams()
      this.getBookings()
      this.getRooms()
    },
    mounted() {
      this.$root.$on('next', () => { this.next() })
      this.$root.$on('prev', () => { this.prev() })
      this.$root.$on('today', () => { this.today() })
      this.$root.$on('month', () => { this.month() })
      this.$root.$on('listWeek', () => { this.listWeek() })
      this.$root.$on('listDay', () => { this.listDay() })
    },
    data() {
      return {
        config: {
          schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
          showNonCurrentDates: false,
          fixedWeekCount: false,
          navLinks: true,
          defaultView: 'listWeek',
          views: {
            listDay: {
              allDaySlot: false,
            },
            listWeek: {
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
      ...mapState([
        'calendarScheduleMode',
          'eventsSource',
          'resources',
          'bookings',
          'rooms',
          'exams'
      ]),
      events() {
        return this.bookings.map(booking =>
          ({
            id: booking.booking_id,
            title: booking.booking_name,
            start: booking.start_time,
            end: booking.end_time,
            resourceId: booking.room_id,
            color: booking.room.color

          })
        )
      },
      resources() {
        return this.rooms.map(room =>
          ({
            id: room.room_id,
            title: room.room_name,
            eventColor: room.color
          })
        )
      },
      configuration() {
        let configuration = this.config
        configuration.resources = this.resources
        return configuration
      },
    },
    methods: {
      ...mapActions(['getBookings', 'getRooms', 'getExams']),
      ...mapMutations([
        'toggleBookRoomModal',
        'setCalendarView'
      ]),
      eventRender(event, element, view) {
        if (view.name === 'listWeek' || view.name === 'listDay') {
        let id = event.resourceId
          let eventTitle = event.title
          let resTitle = this.resources.find(res => res.id == id).title
          let examObj = this.exams.find(exam => exam.booking_id == id)
          let invigilator = 'none'
          if (examObj && examObj.invigilator&& examObj.invigilator.invigilator_name) {
            invigilator = examObj.invigilator.invigilator_name
          }
          element.find(".fc-list-item-marker").replaceWith(`<td>${resTitle} - ${eventTitle}</td>`)
          element.find(".fc-list-item-title").replaceWith(`
            <td style="text-align: right">Invigilator: ${invigilator} </td>`
          )
        }

      },
      viewRender(view, el) {
        this.title = view.title
      },
      next() {
        this.$refs.qcalendar.fireMethod('next')
      },
      prev() {
        this.$refs.qcalendar.fireMethod('prev')
      },
      today() {
        this.$refs.qcalendar.fireMethod('today')
      },
      listDay() {
        this.$refs.qcalendar.fireMethod('changeView', 'listDay')
      },
      listWeek() {
        this.$refs.qcalendar.fireMethod('changeView', 'listWeek')
      },
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