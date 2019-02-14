<template>
  <b-modal v-model="modalVisible"
           modal-class="q-modal"
           body-class="q-modal"
           no-close-on-backdrop
           no-close-on-esc
           hide-ok
           lazy
           @cancel="cancel"
           @ok="postEvent"
           @shown="setupModal"
           hide-header
           size="md">
    <div v-if="showModal">
      <span style="font-weight: 600; font-size: 1.3rem;">Confirm Booking</span>
      <DataSummaryTable :data="summaryDisplay" />
      <b-form class="w-100 mt-3">
        <b-form-row class="w-100">
          <b-col>
            <b-form-group>
              <label>Notes</label><br>
              <b-textarea :rows="2" class="w-100 mx-0 px-0" />
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row class="w-100">
          <b-col cols="12" align-h="end">
            <b-form-group>
              <label>Invigilator</label><br>
              <b-select :options="invigilatorDropdown" :value="selectedInvigilator" @input="selectInvigilator" />
            </b-form-group>
          </b-col>
        </b-form-row>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'
  import moment from 'moment'
  import { DataSummaryTable } from '../exams/edit-exams-components'

  export default {
    name: "BookingModal",
    components: { DataSummaryTable },
    mounted(){
      this.getInvigilators()
    },
    data() {
      return {
        selectedInvigilator: '',
        sbcStaff: true,
      }
    },
    computed: {
      ...mapState({
        exam: state => state.selectedExam,
        date: state => state.clickedDate,
        showModal: state => state.showBookingModal,
        invigilators: state => state.invigilators
      }),
      summaryDisplay() {
        return [
          {key: 'Exam Date', value: this.date.start.local().format('dddd MMM D, YYYY')},
          {key: 'Writer', value: this.exam.examinee_name},
          {key: 'Exam', value: this.exam.exam_name},
          {key: 'Exam Expiry', value: this.formatExpiry(this.exam.expiry_date)},
          {key: 'Type', value: this.exam.exam_type.exam_type_name},
          {key: 'Exam Time', value: this.date.start.local().format('h:mm a')},
          {key: 'Room', value: this.date.resource.title},
          {key: 'Length of Exam', value: this.exam.exam_type.number_of_hours+' hrs'},
          {key: 'Format of Exam', value: this.exam.exam_method},
          {key: 'ServiceBC to Provide Reader', value: this.invigilatorRequired ? 'Yes' : 'No'},
        ]
      },
      invigilatorRequired() {
        if (this.exam && this.exam.exam_type) {
          if (this.exam.exam_type.exam_type_name.includes('SBC Reader')) {
            return true
          }
        }
        return false
      },
      invigilatorDropdown() {
        this.selectedInvigilator = ''
        let invigilators = this.invigilators
        invigilators.push({value: '', text: 'Please select'})
        return invigilators.map(i =>
          ( { value: i.invigilator_id, text: i.invigilator_name } )
        )
      },
      modalVisible: {
        get() {
          return this.showModal
        },
        set(e) {
          this.toggleBookingModal(e)
        }
      },
      endTime() {
        if (this.date && this.exam) {
          let l = parseInt(this.exam.exam_type.number_of_hours)
          return new moment(this.date.start).add(l, 'hours')
        }
      },
    },
    methods: {
      ...mapActions(['scheduleExam', 'getInvigilators']),
      ...mapMutations([
        'toggleBookingModal',
        'toggleSchedulingIndicator',
        'setClickedDate',
      ]),
      formatExpiry(d) {
        return new moment(d).local().format('MMM D, YYYY')
      },
      cancel() {
        this.$root.$emit('toggleOffsite', true)
        this.toggleBookingModal(false)
        this.toggleSchedulingIndicator(true)
        this.setClickedDate(null)
      },
      setupModal() {
        this.selectedInvigilator = null
        console.log(this.invigilators)
        if (this.exam.exam_type.exam_type_name.includes('SBC Reader')) {
          this.sbcStaff = false
          this.selectedInvigilator = this.invigilators.find(i=>i.invigilator_name=='unset').invigilator_id
          return
        }
        this.selectedInvigilator = this.invigilators.find(i=>i.invigilator_name=='SBC Staff').invigilator_id
      },
      selectInvigilator(e) {
        this.selectedInvigilator = e
      },
      postEvent(e) {
        e.preventDefault()
        this.$root.$emit('toggleOffsite', true)
        let start = new moment(this.date.start).utc()
        let end = new moment(this.endTime).utc()
        let booking = {
          room_id: this.date.resource.id,
          start_time: start.format('DD-MMM-YYYY[T]HH:mm:ssZ'),
          end_time: end.format('DD-MMM-YYYY[T]HH:mm:ssZ'),
          fees: 'false',
          booking_name: this.exam.exam_name,
          invigilator_id: this.selectedInvigilator
        }
        this.scheduleExam(booking)
        this.$root.$emit('unselect')
        this.$root.$emit('options', {name: 'selectable', value: false})
      }
    },
  }
</script>

<style scoped>
  .id-grid-outer {
    display: grid;
    grid-template-columns: 2fr 1fr 4fr 3fr;
  }
  .sum-td-l-col {
    margin-top: auto;
    margin-left: auto;
    grid-column: 1 / span 2;
    font-size: 1rem;
    font-weight: bold;
  }
  .sum-td-r-col {
    margin-top: auto;
    margin-left: 20%;
    margin-right: auto;
    grid-column: 3 / span 2;
    font-size: 0.925rem;
    font-weight: normal;
  }
</style>
