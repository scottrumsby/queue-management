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
                   :events="eventSource"
                   :config="configuration"></full-calendar>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import 'fullcalendar/dist/fullcalendar.css'
  import 'fullcalendar-scheduler'

  export default {
    name: 'Calendar',
    mounted() {
      Vue.prototype.$calendar = this.fireMethod
      console.log('prototype updated')
      console.log(this.$calendar)
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
          groupByResource: true
        },
        title: '',
      }
    },
    computed: {
      ...mapState(['calendarScheduleMode', 'eventSource', 'calendarResources']),
      configuration() {
        let configuration = this.config
        configuration.resources = this.calendarResources
        return configuration
      },
    },
    methods: {
      ...mapMutations([
        'toggleBookRoomModal',
        'setCalendarView'
      ]),
      fireMethod(name, param) {
        console.log('fireMethod called')
        this.$refs.calendar.fireMethod(name, param)
      },
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
