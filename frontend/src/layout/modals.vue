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
    <AddITAExam />
    <AddNonExam />
    <BookRoom />
    <Confirm />
    <EditExam />
    <InventoryModal />
    <Invigilators />
    <Scheduler/>
    <TicketModal />
  </div>
</template>

<script>
  import AddITAExam from '../exams/add-ita-exam'
  import AddNonExam from '../exams/add-non-exam'
  import BookRoom from '../room-booking/book-room'
  import EditExam from '../exams/edit-exam'
  import InventoryModal from '../exams/inventory-modal'
  import Invigilators from '../room-booking/invigilators'
  import TicketModal from '../ticket-tracking/ticket-modal'
  import Scheduler from '../room-booking/scheduler'
  import Confirm from '../room-booking/confirm'
  export default {
    name: "Modals",
    components: {
      Confirm,
      Scheduler,
      TicketModal,
      Invigilators,
      InventoryModal,
      EditExam,
      BookRoom,
      AddNonExam,
      AddITAExam
    }
  }
</script>

<style scoped>

</style>
