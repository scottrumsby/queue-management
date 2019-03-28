<template>
  <b-modal v-model="modalVisible"
           modal-class="q-modal"
           body-class="q-modal"
           no-close-on-backdrop
           @hide="hide"
           ok-only
           no-close-on-esc
           hide-header
           size="sm">
    <b-form>
      <b-form-row>
        <b-col>
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Citizen Has Arrived?</label><br>
            <b-button class="w-100 btn-success"
                      @click="checkIn">Check-In</b-button>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Edit/Cancel Appointment</label><br>
            <b-button class="w-100 btn-secondary">Edit Details</b-button>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
  import moment from 'moment'
  import { createNamespacedHelpers } from 'vuex'
  const { mapActions, mapGetters, mapMutations, mapState } = createNamespacedHelpers('appointmentsModule')

  export default {
    name: "CheckInModal",
    props: ['clickedAppt'],
    computed: {
      ...mapState(['showCheckInModal']),
      modalVisible: {
        get() { return this.showCheckInModal },
        set(e) { this.toggleCheckInModal(e) }
      }
    },
    methods: {
      ...mapActions(['getAppointments', 'postCheckIn']),
      ...mapMutations(['toggleCheckInModal']),
      checkIn() {
        this.postCheckIn(this.clickedAppt.appointment_id).then( () => {
          this.hide()
        })
      },
      hide() {
        this.getAppointments().then( () => {
          this.toggleCheckInModal(false)
        })
      }
    }
  }
</script>

<style scoped>

</style>