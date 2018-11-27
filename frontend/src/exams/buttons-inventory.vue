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
    <AddNonExam />
    <b-form inline>
      <b-button class="btn-primary mr-1" @click="addITA">Add ITA Exam</b-button>
      <b-button class="btn-primary m-0 mr-3" @click="addNon">Add non-ITA Exam</b-button>
    </b-form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import AddNonExam from './add-non-exam'
  export default {
    name: "InventoryButtons",
    components: { AddNonExam },
    methods: {
      ...mapMutations([
        'toggleITAExamModal',
        'toggleNonExamModal'
      ]),
      addITA() {
        this.toggleITAExamModal(true)
      },
      addNon() {
        this.toggleNonExamModal(true)
      },
    }
  }
</script>

<style scoped>
</style>
