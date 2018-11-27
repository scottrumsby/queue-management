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
  <div style="margin-left: 20px">
    <b-form inline class="pb-2 pl-3">
      <font-awesome-icon icon="filter"
                         class="mr-1"
                         style="font-size: 1.0rem"/>
      <b-form-select :options="filters"
                     @input.native="changeFilter"
                     :value="filter"/>
      <font-awesome-icon icon="binoculars"
                         class="ml-3 mr-1"
                         style="font-size: 1.0rem"/>
      <b-form-input placeholder="type to search"/>
    </b-form>


    <b-table :items="examInventory"
             :fields="fields"
             class="m-0 p-0"
             head-variant="light"
             small
             outlined
             hover>
      <template slot="roomloc" slot-scope="row">
        <div v-if="row.item.location">
          {{ row.item.location }}
        </div>
        <div v-if="row.item.room">
          {{ row.item.room }}
        </div>
      </template>
    </b-table>

  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'InventoryTable',
    data() {
      return {
        filter: null,
        filters: [
          {text: 'Select a Filter', value: null},
          {text:'Show All', value:'all'},
          {text:'Action Required', value:'act'},
          {text:'Needs Student', value:'std'},
          {text:'Needs Invigilator', value:'ivg'},
          {text:'Expired', value:'exp'},
        ],
        fieldsModal: [
          {key: 'id', label: 'Event ID', sortable: false, thStyle: {width: '6%'} },
          {key: 'title', label: 'Exam Title', sortable: true, thStyle: {width: '14%'} },
          {key: 'format', label: 'Format', sortable: false, thStyle: {width: '5%'} },
          {key: 'expires', label: 'Expires', sortable: true, thStyle: {width: '6%'} },
          {key: 'dateMaterials', label: `Rec'd Materials`, sortable: true, thStyle: {width: '7%'} },
          {key: 'student', label: 'Student Name', sortable: true, thStyle: {width: '15%'}},
          {key: 'duration', label: 'Duration', sortable: true, thStyle: {width: '15%'}},
          {key: 'notes', label: 'Notes', sortable: true, thStyle: {width: '15%'}},
        ],
        fieldsInventory: [
          {key: 'id', label: 'Event ID', sortable: false, thStyle: {width: '6%'} },
          {key: 'name', label: 'Exam', sortable: true, thStyle: {width: '12%'} },
          {key: 'format', label: 'Format', sortable: false, thStyle: {width: '4%'} },
          {key: 'expires', label: 'Expires', sortable: true, thStyle: {width: '6%'} },
          {key: 'dateMaterials', label: `Rec'd Materials`, sortable: true, thStyle: {width: '7%'} },
          {key: 'site', label: 'On/Off-site', sortable: true, thStyle: {width: '5%'} },
          {key: 'roomloc', label: 'Room or Location', sortable: true, thStyle: {width: '22%'}},
          {key: 'duration', label: 'Duration', sortable: true, thStyle: {width: '5%'}},
          {key: 'examDate', label: 'Exam Date', sortable: true, thStyle: {width: '6%'}},
          {key: 'examTime', label: 'Time', sortable: false, thStyle: {width: '4%'}},
          {key: 'invigilator', label: 'Invigilator', sortable: false, thStyle: {width: '8%'}},
          {key: 'student', label: 'Student', sortable: true, thStyle: {width: '15%'}},
        ],
      }
    },
    computed: {
      ...mapState(['examInventory']),
      fields() {
        return this.fieldsInventory
      }
    },
    methods: {
      changeFilter(e) {
        this.filter = e.target.value
      }
    },
  }
</script>

<style scoped>
</style>
