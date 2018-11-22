<template>
  <div>
    <div class="dash-button-flex-button-container w-100">


        <!-- SLOT FOR EACH VIEW'S BUTTON CONTROLS-->
      <router-view name="buttons"/>


      <div class="add-flex-grow ml-3" v-if="navigationVisible">
        <b-button v-if="startWorkButtonVisible" class="btn-warning" @click="openTicket">Begin Tracking Ticket</b-button>
      </div>
      <div v-if="navigationVisible">
        <b-dropdown variant="outline-primary"
                    class="pl-0 ml-0"
                    id="nav-dropdown">
          <template slot="button-content">
            <font-awesome-icon icon="bars"
                               style="font-size: 1.5rem;"/>
          </template>
          <div :style="{width:200+'px'}">
            <b-dropdown-item to="/dash">The Q</b-dropdown-item>
            <b-dropdown-item to="/exams">Manage Exams</b-dropdown-item>
            <b-dropdown-item to="/cal">Room Booking</b-dropdown-item>
            <b-dropdown-item>Reporting</b-dropdown-item>
            <b-dropdown-item>GA Panel</b-dropdown-item>
            <b-dropdown-item>Admin Console</b-dropdown-item>
            <b-dropdown-item>My Settings</b-dropdown-item>
            <b-dropdown-item>
              <b-button block class="btn-primary">
                Feedback
              </b-button>
            </b-dropdown-item>
          </div>
        </b-dropdown>
      </div>
    </div>

    <!--SLOT FOR EACH VIEW'S MAIN CONTENT-->
    <router-view />

  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import DashButtons from '@/serve-citizen/dash-buttons'
import BeginTicket from '@/ticket-tracking/begin-ticket'
import TicketModal from '@/ticket-tracking/ticket-modal'

  export default {
    name: 'Nav',
    components: { BeginTicket, TicketModal, DashButtons },
    data() {
      return {
        ticketStarted: false,
      }
    },
    mounted() {
      this.setMainAlert('This is my message on mount')
    },
    computed: {
      ...mapState([
        'ticketModal',
        'navigationVisible',
        'startWorkButtonVisible'
      ]),
    },
    methods: {
      ...mapMutations([
        'setIntendedRoute',
        'updateTicketModal',
        'setMainAlert',
        'toggleStartWorkButton'
      ]),
      openTicket() {
        this.updateTicketModal({visible:true})
        this.updateTicketModal({minimized:false})
        this.toggleStartWorkButton(false)
      }
    }
  }
</script>

<style scoped>
.no-border {
  border: none !important;
}
.dash-button-flex-button-container {
  display: flex;
  justify-content: flex-start;
  margin: 10px;
  padding: 10px;
  width: 99%;
}

.add-flex-grow {
  flex-grow: 1;
}

</style>
