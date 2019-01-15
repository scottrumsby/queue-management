<template>
    <div style="position: relative" ref="calcontainer">
      <keep-alive>
        <full-calendar ref="bookingcal"
                       key="bookingcal"
                       id="bookingcal"
                       class="q-calendar-margins"
                       @event-selected="eventSelected"
                       @view-render="viewRender"
                       @event-created="selectEvent"
                       :events="events"
                       :config="setup"></full-calendar>
      </keep-alive>
      <div class="w-50 mt-2 ml-3 pl-3" style="display: flex; justify-content: space-between;"
           v-if="calView === 'month'">
        <template v-for="col in roomLegendArray">
          <div>
            <b-badge :style="{backgroundColor: `${col.color}`}">
              <span :style="{color: `${col.color}`}">legend</span>
            </b-badge>
            <span>{{ col.title }}</span>
          </div>
        </template>
      </div>
    <BookingModal />
    <ExamInventoryModal v-if="showExamInventoryModal" />
    <OtherBookingModal />
    <EditBookingModal />
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState, } from 'vuex'
  import { FullCalendar } from 'vue-full-calendar'
  import BookingModal from './booking-modal'
  import DropdownCalendar from './dropdown-calendar'
  import OtherBookingModal from './other-booking-modal'
  import ExamInventoryModal from './exam-inventory-modal'
  import moment from 'moment'
  import 'fullcalendar/dist/fullcalendar.css'
  import 'fullcalendar-scheduler'
  import SchedulingIndicator from './scheduling-indicator'
  import EditBookingModal from './edit-booking-modal'

  export default {
    name: 'Calendar',
    components: {
      BookingModal,
      DropdownCalendar,
      EditBookingModal,
      ExamInventoryModal,
      FullCalendar,
      OtherBookingModal,
      SchedulingIndicator,
    },
    mounted() {
      this.initialize()
      this.$root.$on('next', () => { this.next() })
      this.$root.$on('prev', () => { this.prev() })
      this.$root.$on('today', () => { this.today() })
      this.$root.$on('month', () => { this.month() })
      this.$root.$on('unselect', () => { this.unselect() })
      this.$root.$on('agendaWeek', () => { this.agendaWeek() })
      this.$root.$on('agendaDay', () => { this.agendaDay() })
      this.$root.$on('options', (option) => { this.options(option) })
      this.$root.$on('initialize', () => { this.initialize() })
      this.$root.$on('cancel', () => { this.cancel() })
      this.$root.$on('updateEvent', (event, params) => {this.updateEvent(event, params) })
    },
    data() {
      return {
        tempEvent: null,
        setup: {
          selectable: false,
          unselectCancel: '.modal, .modal-content',
          editable: false,
          schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
          showNonCurrentDates: false,
          fixedWeekCount: false,
          navLinks: true,
          height: 'auto',
          timezone: 'local',
          defaultView: 'agendaWeek',
          views: {
            agendaDay: {
              allDaySlot: false,
              groupByResource: true,
              nowIndicator: true,
            },
            agendaWeek: {
              allDaySlot: false,
              groupByDateAndResource: true,
              nowIndicator: true,
            },
            month: {
              allDaySlot: false,
              groupByResource: false,
            },
          },
          resources: [],
          weekends: false,
          maxTime: '18:00:00',
          minTime: '07:00:00',
          header: {
            left: null,
            center: null,
            right: null
          },
        },
          }
    },
    computed: {
      ...mapGetters(['calendar_events', 'room_resources', 'view_port']),
      ...mapState([
        'calendarSetup',
        'exams',
        'exam_types',
        'scheduling',
        'editedBooking',
        'editedBookingOriginal',
        'schedulingOther',
        'selectedExam',
        'rescheduling',
        'showBookingModal',
        'showExamInventoryModal',
        'showSchedulingIndicator',
      ]),
      adjustment() {
        if (this.showSchedulingIndicator) {
          return 240
        }
        return 190
      },
      calView() {
        if (this.calendarSetup && this.calendarSetup.viewName) {
          return this.calendarSetup.viewName
        }
        return ''
      },
      roomLegendArray() {
        if (this.room_resources && this.room_resources.length > 0) {
          return this.room_resources.map(room =>
            ({color: room.eventColor, title: room.title})
          )
        }
        return []
      },
      events() {
        if (this.calendar_events.length > 0) {
          return this.calendar_events
        }
        return []
      },
    },
    destroyed() {
      this.setCalendarSetup(null)
    },
    methods: {
      ...mapActions(['getBookings', 'finishBooking', 'initializeAgenda', 'getExamTypes', 'resetRescheduling']),
      ...mapMutations([
        'setCalendarSetup',
        'setClickedDate',
        'setEditedBooking',
        'setEditedBookingOriginal',
        'setSelectedExam',
        'toggleBookingModal',
        'toggleEditBookingModal',
        'toggleOtherBookingModal',
        'toggleScheduling',
        'toggleSchedulingIndicator',
        'toggleSchedulingOther'
      ]),
      agendaDay() {
        this.$refs.bookingcal.fireMethod('changeView', 'agendaDay')
      },
      agendaWeek() {
        this.$refs.bookingcal.fireMethod('changeView', 'agendaWeek')
      },
      cancel() {
        if (this.editedBooking) {
          this.toggleEditBookingModal(true)
          this.toggleSchedulingIndicator(false)
          this.$refs.bookingcal.fireMethod('rerenderEvents')
          return
        }
        this.finishBooking()
        this.options({name: 'selectable', value: false})
      },
      removeEvent() {
        let event = this.editedBooking
        event.backgroundColor = 'white '
        this.$refs.bookingcal.fireMethod('updateEvent', event)
      },
      eventSelected(event, jsEvent, view) {
        this.setEditedBooking(event)
        if (Object.keys(event).includes('exam')) {
          this.setSelectedExam(event.exam)
        }
        this.setEditedBookingOriginal(event)
        this.toggleEditBookingModal(true)
      },
      updateEvent(event, params) {
        Object.keys(params).forEach(key => {
          event[key] = params[key]
        })
        this.$refs.bookingcal.fireMethod('updateEvent', event)
      },
      initialize() {
        this.getExamTypes()
        this.initializeAgenda().then( rooms => {
          rooms.forEach( room => {
            let roomObj = {
              id: room.room_id,
              title: room.room_name,
              eventColor: room.color
            }
            this.$refs.bookingcal.fireMethod('addResource', roomObj)
          })
          this.getBookings()
        })
      },
      month() {
        this.$refs.bookingcal.fireMethod('changeView', 'month')
      },
      goToDate(date) {
        this.$refs.bookingcal.fireMethod('gotoDate', date)
      },
      next() {
        this.$refs.bookingcal.fireMethod('next')
      },
      options(option) {
        this.$refs.bookingcal.fireMethod('option', option.name, option.value)
      },
      prev() {
        this.$refs.bookingcal.fireMethod('prev')
      },
      delete() {

      },
      selectEvent(event) {
        //overrides the default behavior (sets event=all day event on the day) to a view change instead
        if (this.calendarSetup.viewName === 'month') {
          this.goToDate(event.start.local())
          this.agendaDay()
          return
        }
        if (this.rescheduling) {
          let booking = this.editedBookingOriginal
          if (Object.keys(booking).includes('exam')) {
            this.unselect()
            let { number_of_hours } = this.selectedExam.exam_type
            let endTime = new moment(event.start).add(number_of_hours, 'h')
            event.end = endTime
            this.setClickedDate(event)
            let tempEvent = {
              start: new moment(event.start),
              end: new moment(event.end),
              title: '(NEW TIME) ' + booking.title,
              borderColor: booking.room.color,
              backgroundColor: 'white',
              resourceId: event.resource.id,
            }
            if (this.tempEvent) {
              this.$refs.bookingcal.fireMethod('removeEvents', [ this.tempEvent.id ])
              let id = this.tempEvent.id.split('-')
              tempEvent.id = id[0] + toString(( parseInt(id[1]) + 1 ))
            } else {
              tempEvent.id = 'temp-1'
            }
            this.tempEvent = tempEvent
            console.log(tempEvent)
            this.$refs.bookingcal.fireMethod('renderEvent', tempEvent, true)
            this.toggleEditBookingModal(true)
            return
          }
          this.toggleSchedulingIndicator(false)
          this.toggleEditBookingModal(true)
          this.setClickedDate(event)
          return
        }
        this.setClickedDate(event)
        this.toggleSchedulingIndicator(false)
        if (this.scheduling) {
          this.toggleBookingModal(true)
        }
        if (this.schedulingOther) {
          this.toggleOtherBookingModal(true)
        }
      },
      today() {
        this.$refs.bookingcal.fireMethod('today')
      },
      viewRender(view, el) {
        this.setCalendarSetup({ title: view.title, viewName: view.name })
        //overrides the default behaviour (basicDay view) when clicking on a date heading
        if (view.name === 'basicDay') {
          this.$refs.bookingcal.fireMethod('changeView', 'agendaDay')
        }
        //fullCalendar auto-height doesn't work well here, calculate the height for month view
        if (view.name === 'month') {
          this.options({ name: 'height', value: window.innerHeight - this.adjustment })
        }
        //return the height to 'auto' upon switching back to the other views
        if (view.name === 'agendaDay' || view.name === 'agendaWeek') {
          this.options({ name: 'height', value: 'auto' })
        }
      },
      unselect() {
        this.$refs.bookingcal.fireMethod('unselect')
      }
    }
  }


</script>