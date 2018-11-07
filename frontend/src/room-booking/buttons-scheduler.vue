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
        <b-dropdown-item-button  @click="agendaDay">
          Agenda Day
        </b-dropdown-item-button>
        <b-dropdown-item-button @click="agendaWeek">
          Agenda Week
        </b-dropdown-item-button>
        <b-dropdown-item @click="month">
          Agenda Month
        </b-dropdown-item>
      </b-dropdown>
      <b-button class="btn-danger ml-3" @click="cancel">
        <font-awesome-icon icon="times"
                           class="m-0 p-0"
                           style="font-size: 1.25rem;"/>
        Cancel Scheduling Exam
      </b-button>
    </form>
  </div>





</template>

<script>
import { mapMutations} from 'vuex'

export default {
  name: 'ButtonsScheduler',
  props: ['agendaWeek', 'listWeek', 'agendaDay', 'month', 'today', 'next', 'prev'],
  methods: {
    ...mapMutations([
      'toggleCalendarScheduleMode',
      'toggleNavigation'
    ]),
    cancel() {
      this.toggleCalendarScheduleMode(false)
      this.toggleNavigation(true)
      this.listWeek()
    },
  }
}
</script>

<style scoped>

</style>
