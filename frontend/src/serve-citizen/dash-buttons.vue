<template>
  <div class="dash-buttons-flex-button-container">
    <div>
      <b-button class="btn-primary"
                @click="invite"
                :disabled="citizenInvited===true || performingAction || showAdmin"
                id="invite-citizen-button">Invite</b-button>
                <!--
                v-if="reception"
                -->

      <b-button v-bind:class="serveNowStyle"
                @click="clickServeNow"
                :disabled="citizenInvited===false"
                id="serve-citizen-button">Serve Now</b-button>
    </div>
    <div>
      <b-button class="btn-primary"
                @click="clickAddCitizen"
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
                <!--
                v-if="user.role && (['ANALYTICS', 'GA', 'HELPDESK', 'SUPPORT'].indexOf(user.role.role_code) >= 0)"
                -->


      <b-button class="btn-primary"
                style="margin-right: 20px"
                :disabled="showAdmin"
                @click="clickGAScreen">Toggle GA Panel</b-button>
                <!--
                v-if="user.role && user.role.role_code=='GA'"
                -->

    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'DashButtons',
    computed: {
      ...mapGetters(['citizens_queue','reception']),
      ...mapState([
        'citizenInvited',
        'performingAction',
        'serveNowStyle',
        'showAdmin',
        'user',
      ]),
      queueLength() {
        return this.citizens_queue.length
      },
    },
    methods: {
      ...mapMutations(['setMainAlert']),
      ...mapActions([
        'clickInvite',
        'clickAddCitizen',
        'clickAdmin',
        'clickGAScreen',
        'clickServeNow',
        'clickBackOffice'
      ]),
      invite() {
        if (this.queueLength === 0) {
          this.setMainAlert('The are currently no citizens to invite.')
        } else {
          this.clickInvite()
        }
      },
    }

  }
</script>

<style scoped>
  .dash-buttons-flex-button-container {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  .btn-highlighted {
    color: black;
    border: 1px solid darkgoldenrod;
    background-color: gold;
  }
</style>
