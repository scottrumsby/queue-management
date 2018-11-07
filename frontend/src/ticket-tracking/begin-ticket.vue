

<template>
  <b-modal
    v-if="1===2"
    :visible="ticketModal.selectVisible"
    :hide-header="true"
    class="btn-"
    header-bg-variant="light"
    header-border-variant="light"
    size="sm"
    :centered="true"
    body-class="mx-auto"
    @shown="atShown"
    :hide-footer="false">

    <template slot="modal-footer">
      <b-form-row>
        <b-col class="m-0 mr-1 p-0">
          <b-button class="btn-secondary" @click="clickCancel" size="sm">Cancel</b-button>
        </b-col>
        <b-col class="m-0 p-0">
          <b-button class="btn-primary" @click="clickOk" size="sm">Ok</b-button>
        </b-col>
      </b-form-row>
    </template>

    <h5>Please choose...</h5>
      <b-form :style="{display:'flex','flex-direction':'column','justify-content':'center'}" class="mx-auto w-100">
        <div :class="ticketModal.selected==='inPerson' ? highlight : normal" id="inPerson"
             @click="handleClick">
          In Person
        </div>
        <div :class="ticketModal.selected==='telephone' ? highlight : normal" id="telephone"
             @click="handleClick">
          Telephone
        </div>
        <div :class="ticketModal.selected==='backoffice' ? highlight : normal" id="backoffice" @click="handleClick">
          Backoffice
        </div>
        <div :class="ticketModal.selected==='none' ? highlight : normal" id="none" @click="handleClick">
          None
        </div>
      </b-form>
  </b-modal>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import ServeCitizenTable from './ticket-table'
import TicketContent from './ticket-content'

export default {
  name: 'BeginTicket',
  data() {
    return {
      highlight: 'btn btn-highlighted m-1',
      normal: 'btn btn-group-toggle m-1',
      options: [
        { text: 'I am serving a citizen', value: 'citizen' },
        { text: 'I am performing administrative tasks', value: 'admin' },
        { text: 'Do not begin a ticket', value: 'none' }
      ]
    }
  },
  computed: {
    ...mapState(['ticketModal']),
    radio: {
      get() {
        return this.ticketModal.selection
      },
      set(value) {
        this.updateTicketModal({selection:value})
      }
    },
  },
  methods: {
    ...mapMutations(['updateTicketModal']),
    handleClick(e) {
      console.log(e)
      this.buttonClasses = {
        inPerson: 'btn btn-outline-secondary',
        telephone: 'btn btn-outline-secondary',
        backoffice: 'btn btn-outline-secondary',
      }
      this.buttonClasses[e.target.id] = 'btn btn-outline-primary'
      this.updateTicketModal({selected:e.target.id})
    },
    atShown() {
      this.updateTicketModal({selection: 'citizen'})
    },
    if (condition) {

    },
    clickOk() {
      if (this.ticketModal.selection === 'none') {
        this.clickCancel()
        return
      }
      this.updateTicketModal({selectVisible: false})
      this.updateTicketModal({visible: true})
      this.updateTicketModal({minimized: true})
    },
    clickCancel() {
      this.updateTicketModal({selectVisible: false})
    }
  },
}

</script>

<style scoped>
.btn-highlighted {
  color: black;
  border: 1px solid darkgoldenrod;
  background-color: gold;
}
</style>
