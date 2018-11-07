<template>
  <div :style="{margin:20+'px'}">
      <b-form inline class="pb-2 pl-3">
        <label>Filter/Search</label>
        <font-awesome-icon icon="filter"
                           class="ml-3 nr-1"
                           style="font-size: 1.0rem"/>
        <b-form-select>
          <option>Select a filter</option>
        </b-form-select>
        <font-awesome-icon icon="binoculars"
                           class="ml-3 nr-1"
                           style="font-size: 1.0rem"/>
        <b-form-input placeholder="type to search"/>
      </b-form>


      <b-table :items="examInventory"
               :fields="fields"
               head-variant="light"
               small
               outlined
               hover
               @row-clicked="examClicked">
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
        filter: 'all',
        filters: [
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
      ...mapState(['examInventory', 'inventoryModalVisible']),
      fields() {
        if (this.inventoryModalVisible) {
          return this.fieldsModal
        }
        return this.fieldsInventory
      }
    },
    methods: {
      ...mapMutations(['toggleEditExamModal', 'setEditedExam']),
      examClicked(row) {
        this.toggleEditExamModal(true)
        this.setEditedExam(row.item)
      }
    }
  }
</script>

<style scoped>

</style>
