<template>
  <div id="dash-flex-button-container">
    <div>
      <b-button class="btn-primary"
                @click="invite"
                :disabled="citizenInvited===true || performingAction || showAdmin"
                id="invite-citizen-button">Invite</b-button>
      <b-button v-bind:class="serveNowStyle"
                @click="clickServeNow"
                :disabled="citizenInvited===false"
                id="serve-citizen-button">Serve Now</b-button>
    </div>
    <div>
      <b-button class="btn-primary"
                @click="addCitizen"
                :disabled="citizenInvited===true || performingAction || showAdmin"
                id="add-citizen-button">Add Citizen</b-button>
      <b-button class="btn-primary"
                @click="clickBackOffice"
                :disabled="citizenInvited===true || performingAction || showAdmin"
                id="add-citizen-button">Back Office</b-button>
    </div>
    <div>
      <b-button class="btn-primary"
                style="margin-right: 20px"
                @click="clickAdmin"
                id="click-feedback-button">Toggle Admin</b-button>
      <b-button class="btn-primary"
                style="margin-right: 20px"
                :disabled="showAdmin"
                @click="clickGAScreen" v-if="user.role && user.role.role_code=='GA'">Toggle GA Panel</b-button>
      <b-button class="btn-primary"
                @click="clickFeedback"
                id="click-feedback-button">Feedback</b-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

  export default {
    name: "DashButtons",
    computed: {
      ...mapGetters(['reception']),
      ...mapState([
        'isLoggedIn',
        'showAddModal',
        'citizenInvited',
        'performingAction',
        'showAdmin',
        'showGAScreenModal',
        'showServiceModal',
        'serveNowStyle',
        'user',
      ]),
      queueLength() {
        return this.citizens_queue.length
      },
    },
    methods: {
      ...mapMutations([
        'setMainAlert',
        'toggleFeedbackModal'
        ]),
      ...mapActions([
        'clickInvite',
        'clickAddCitizen',
        'clickAdmin',
        'clickGAScreen',
        'clickServeNow',
        'clickBackOffice'
      ]),
      addCitizen() {
        this.clickAddCitizen()
      },
      invite() {
        if (this.queueLength === 0) {
          this.setMainAlert('The are currently no citizens to invite.')
        } else {
          this.clickInvite()
        }
      },
      clickFeedback() {
        this.toggleFeedbackModal(true)
      },
    }

  }
</script>

<style scoped>
  #dash-flex-button-container {
    display: flex; justify-content: space-between; height: 100% !important;
  }
</style>
