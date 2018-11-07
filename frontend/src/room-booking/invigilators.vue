<template>
  <b-modal :visible="true"
           @hidden="close"
           size="lg"
           :hide-ok="true"
           :hide-cancel="true"
           modal-class="custom-base-modal"
           body-class="custom-base-modal-body"
           header-class="custom-base-modal-headerlg"
           footer-class="custom-base-modal-footer">
    <template slot="modal-header">
      <h4>List of Local Invigilators</h4>
    </template>
    <template slot="modal-footer">
      <div class="d-flex flex-row-reverse">
        <b-button class="btn-primary" @click="close">Close List</b-button>
      </div>
    </template>
      <b-table :items="invigilators"
               :outlined="true"
               :inverse="true"
               hover
               small
               tbody-class="table-padding"
               :fields="fields"
               :striped="true"
               class="mb-0">
        <template slot="events" slot-scope="data">
           <b-button v-if="data.item.events" size="sm" class="btn-sm btn-secondary">View</b-button>
        </template>
        <template slot="phone" slot-scope="row">
          {{ row.item.phone }}<br>
          {{ row.item.email }}
        </template>
      </b-table>

  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Invigilators',
    data() {
      return {
        fields: [
          'name',
          {key:'phone', label:'contact'},
          {key:'contract', label:'Contract #'},
          {key:'exp', label:'Expiry' },
          {key:'events',label:'Upcoming Events'},
          'notes',
        ]
      }
    },
    computed: {
      ...mapState(['invigilators']),
    },
    methods: {
      ...mapMutations(['toggleInvigilatorModal']),
      close() {
        this.toggleInvigilatorModal(false)
      },
      clickRow(row) {
        console.log(row)
      },
    }
  }
</script>

<style scoped>
.table-padding {

}
</style>
