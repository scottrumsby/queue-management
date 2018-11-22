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
  <ButtonsCalendar
    <Dash />
  <DashButtons />
</template>

<script>
  import AddITAExam from '../exams/add-ita-exam'
  import AddNonExam from '../exams/add-non-exam'
  import EditExam from '../exams/edit-exam'
  import InventoryButtons from '../exams/inventory-buttons'
  import Inventory from '../exams/inventory'
  import Smartboard from '../smartboard/index'
  import App from '../App'
  import Calendar from '../room-booking/calendar'
  import ButtonsCalendar from '../room-booking/buttons-calendar'
  import Dash from '../serve-citizen/dash'
  import DashButtons from '../serve-citizen/dash-buttons'


  export default {
    name: "hhh",
    components: { DashButtons, Dash, ButtonsCalendar, Calendar, App, Smartboard, Inventory, InventoryButtons, EditExam, AddNonExam, AddITAExam }
  }
</script>

<style scoped>

</style>
