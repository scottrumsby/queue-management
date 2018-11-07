<template>
  <div>
    <form inline>
      <b-btn-group class="btn-primary">
        <b-button class="btn-primary" @click="prev" >
          <font-awesome-icon icon="angle-left"
                             class="m-0 p-0"
                             style="font-size: 1.25rem;"/>
        </b-button>
        <b-button class="btn-primary" @click="next">
          <font-awesome-icon icon="angle-right"
                             class="m-0 p-0"
                             style="font-size: 1.25rem;"/>
        </b-button>
      </b-btn-group>
      <b-button class="btn-primary" @click="today">Today</b-button>
      <b-dropdown variant="primary" class="mr-3" text="Calendar View">
        <b-dropdown-item-button @click="listDay">
          List Day
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="listWeek">
          List Week
        </b-dropdown-item-button>
      </b-dropdown>
      <b-dropdown variant="primary" class="ml-3 mr-3" text="Schedule an Event...">
        <b-dropdown-item @click="addExamEvent">
          Exam Event
        </b-dropdown-item>
        <b-dropdown-item @click="addOtherEvent">
          Other Event
        </b-dropdown-item>
      </b-dropdown>
    </form>
  </div>


</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ButtonsCalendar',
  props: ['listWeek', 'listDay', 'month', 'today', 'next', 'prev'],
  computed: {
    ...mapState(['calendarView'])
  },
  methods: {
    ...mapMutations([
      'toggleSchedulerModal',
      'toggleInventoryModal',
      'toggleBookRoomModal',
      'toggleCalendarScheduleMode',
      'toggleNavigation'
    ]),
    addExamEvent() {
      this.toggleInventoryModal(true)
      this.toggleCalendarScheduleMode(true)
      this.toggleNavigation(false)
      this.month()
    },
    addOtherEvent() {
      this.toggleNavigation(false)
      this.toggleCalendarScheduleMode(true)
      this.$root.$emit('month')
    },
  }
}
</script>

<style scoped>
  .dont-flex-grow {
    flex-grow: 1;
    background-color: yellow;
  }
</style>
