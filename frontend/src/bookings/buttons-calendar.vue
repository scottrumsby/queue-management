<template>
  <div>
    <form inline>
      <b-button class="btn-primary" @click="prev">
        <font-awesome-icon icon="angle-left"
                           class="m-0 p-0"
                           style="font-size: 1rem;"/>
      </b-button>
      <b-button class="btn-primary" @click="next">
        <font-awesome-icon icon="angle-right"
                           class="m-0 p-0"
                           style="font-size: 1rem;"/>
      </b-button>
      <b-button class="btn-primary mx-2" @click="today">Today</b-button>
      <b-dropdown variant="primary" class="mr-3" text="Calendar View">
        <b-dropdown-item @click="listDay">
          List Day
        </b-dropdown-item>
        <b-dropdown-item @click="listWeek">
          List Week
        </b-dropdown-item>
      </b-dropdown>
    </form>
  </div>


</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'ButtonsCalendar',
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
      next() {
        this.$root.$emit('next')
      },
      prev() {
        this.$root.$emit('prev')
      },
      today() {
        this.$root.$emit('today')
      },
      listDay() {
        this.$root.$emit('listDay')
      },
      listWeek() {
        this.$root.$emit('listWeek')
      },
    }
  }
</script>

<style scoped>
</style>