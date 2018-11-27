<!--
  /*Copyright 2015 Province of British Columbia

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.*/
  -->

<template>
  <div class="w-100">
    <form inline>
      <b-dropdown variant="primary"
                  class="ml-0 mr-3"
                  text="Schedule an Event..."
                  v-if="!calendarScheduleMode">
        <b-dropdown-item @click="addExamEvent">
          Exam Event
        </b-dropdown-item>
        <b-dropdown-item @click="addOtherEvent">
          Other Event
        </b-dropdown-item>
      </b-dropdown>

      <b-button v-if="calendarScheduleMode"
                @click="cancel"
                class="btn-danger ml-0 mr-3">Cancel Scheduling</b-button>

      <b-btn-group style="height: 38px; margin-left: 30px">
        <b-button class="btn-outline-secondary corners" @click="prev" >
          <font-awesome-icon icon="angle-left"
                             class="m-0 pt-1"
                             style="font-size: 1.25rem;"/>
        </b-button>
        <b-button class="btn-outline-secondary corners" @click="next">
          <font-awesome-icon icon="angle-right"
                             class="m-0 pt-1"
                             style="font-size: 1.25rem;"/>
        </b-button>
      </b-btn-group>
      <b-button-group>
      <b-button class="btn-outline-secondary ml-1 mr-1" @click="today">Today</b-button></b-button-group>
      <b-select :options="calendarScheduleMode ? scheduleViews : views"
                @change="checkView"
                class="w-25"
                style="height: 38px; border: 1px solid grey"
                :value="view"></b-select>


    </form>

  </div>


</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'ButtonsCalendar',
    data() {
      return {
        view: 'listDay',
        scheduleViews: [
          {text: 'Daily Agenda', value: 'agendaDay'},
          {text: 'Weekly Agenda', value: 'agendaWeek'},
          {text: 'Month View', value: 'month'},
        ],
        views: [
          {text: 'Daily List', value: 'listDay'},
          {text: 'Weekly List', value: 'listWeek'},
        ]
      }
    },
    computed: {
      ...mapState([
        'calendarView',
        'calendarScheduleMode'
      ])
    },
    methods: {
      ...mapMutations([
        'toggleSchedulerModal',
        'toggleInventoryModal',
        'toggleBookRoomModal',
        'toggleCalendarScheduleMode',
        'toggleNavigation',
        'toggleCalendarScheduleMode',
      ]),
      checkView(e) {
        console.log(e)
        switch (e) {

          case 'agendaDay':
            this.agendaDay()
            break
          case 'listDay':
            this.listDay()
            break
          case 'agendaWeek':
            this.agendaWeek()
            break
          case 'listWeek':
            this.listWeek()
            break
          case 'month':
            this.month()
            break
          default:
            return null
        }
      },
      prev() {
        this.$calendar('prev')
      },
      next() {
        this.$calendar('next')
      },
      today() {
        this.$calendar('today')
      },
      listDay() {
        this.$calendar('changeView','listDay')
        this.view = 'listDay'
      },
      listWeek() {
        this.$calendar('changeView','listWeek')
        this.view = 'listWeek'
      },
      agendaDay() {
        this.$calendar('changeView','agendaDay')
        this.view = 'agendaDay'
      },
      agendaWeek() {
        this.$calendar('changeView','agendaWeek')
        this.view = 'agendaWeek'
      },
      month() {
        this.$calendar('changeView','month')
        this.view = 'month'
      },
      cancel() {
        this.toggleCalendarScheduleMode(false)
        this.listWeek()
      },
      addExamEvent() {

      },
      addOtherEvent() {
        this.toggleCalendarScheduleMode(true)
        this.month()

      },

    }
  }
</script>

<style scoped>
  .dont-flex-grow {
    flex-grow: 1;
    background-color: blue;
  }
  .corners {
    border-radius: 5px;
  }
</style>

