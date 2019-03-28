<template>
  <b-modal v-model="modalVisible"
           @shown="show"
           @cancel="resetModal"
           @ok="submit"
           ok-title="Submit"
           :ok-disabled="submitDisabled"
           size="md"
           modal-class="q-modal"
           body-class="q-modal"
           no-close-on-backdrop
           no-close-on-esc
           hide-header>
    <span class="q-inline-title">Citizen Booking</span><br>
    <b-form>
      <b-form-row>
        <b-col cols="7">
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Name</label><br>
            <b-form-input v-model="citizenName"/>
          </b-form-group>
        </b-col>
        <b-col cols="5">
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Contact Number</label><br>
            <b-form-input v-model="citizenNumber"/>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col cols="9">
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Date</label><br>
            <b-form-input :value="displayDate"
                          disabled />
          </b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Time</label><br>
            <b-form-input :value="displayStart"
                          disabled />
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Change Date/Time</label><br>
            <b-button @click="reschedule"
                      class="btn-secondary w-100">Reschedule</b-button>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Service Required by Citizen</label><br>
            <div style="width: 100%; display: flex;">
              <b-button class="btn-secondary w-25 mr-2"
                        @click="addService">Set</b-button>
              <b-form-input disabled :value="added_service" />
            </div>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group class="mb-0 mt-2">
            <label class="mb-0">Notes</label><br>
            <b-textarea v-model="notes"
                        rows="2" />
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
  import Vue from 'vue'
  import moment from 'moment'
  import { createNamespacedHelpers } from 'vuex'
  const { mapActions, mapGetters, mapMutations, mapState } = createNamespacedHelpers('appointmentsModule')

  export default {
    name: 'ApptBookingModal',
    props: ['clickedTime'],
    data() {
      return {
        booking: false,
        start: null,
        end: null,
        notes: null,
        citizenName: null,
        citizenNumber: null,
      }
    },
    computed: {
      ...mapGetters(['added_service']),
      ...mapState(['showApptBookingModal', ]),
      displayDate() {
        if (this.start) {
          return new moment(this.start).clone().format('dddd MMMM Do, YYYY')
        }
        return ''
      },
      displayEnd() {
        if (this.end) {
          return new moment(this.end).clone().format('h:mm a')
        }
        return ''
      },
      displayStart() {
        if (this.start) {
          return new moment(this.start).clone().format('h:mm a')
        }
        return ''
      },
      modalVisible: {
        get() { return this.showApptBookingModal },
        set(e) { this.toggleApptBookingModal(e) }
      },
      submitDisabled() {
        if (this.citizenName && this.added_service) {
          return false
        }
        return true
      }
    },
    methods: {
      ...mapActions(['getAppointments', 'postAppointment', 'toggleAddModal', 'clearAddModal']),
      ...mapMutations(['toggleApptBookingModal']),
      addService() {
        this.toggleAddModal(true)
      },
      reschedule() {
        this.$root.$emit('removeTempEvent')
        this.toggleApptBookingModal(false)
      },
      resetModal() {
        this.booking = false
        this.$root.$emit('removeTempEvent')
        this.toggleApptBookingModal(false)
      },
      show() {
        this.start = this.clickedTime.start.clone()
        this.end = this.clickedTime.end.clone()
        if (!this.booking) {
          this.clearAddModal()
          this.notes = null
          this.citizenName = null
          this.citizenNumber = null
        }
      },
      submit() {
        let start = moment(this.start).clone()
        let end = moment(this.end).clone()
        let e = {
          start_time: moment.utc(start).format(),
          end_time: moment.utc(end).format(),
          service_id: this.selectedCategory,
        }
        console.log(e)
        this.postAppointment(e).then( () => {
          this.getAppointments().then( () => {
            this.resetModal()
          })
        })
      }
    },
  }
</script>