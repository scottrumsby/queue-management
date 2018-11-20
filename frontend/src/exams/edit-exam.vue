<template>
  <b-modal
    :visible="true"
    size="lg"
    :hide-cancel="true"
    :hide-ok="true"
    modal-class="custom-base-modal"
    body-class="custom-base-modal-body"
    header-class="custom-base-modal-headerlg"
    footer-class="custom-base-modal-footer">
      <template slot="modal-header">
        <h4>Update Exam Record</h4>
      </template>
      <template slot="modal-footer">
        <div class="d-flex flex-row-reverse">
          <b-form inline>
            <b-button class="btn-secondary mr-2">Cancel</b-button>
            <b-button class="btn-primary">Submit</b-button>
          </b-form>
        </div>
      </template>
      <b-form>


        <b-form-row class="mb-2 mt-0 pt-0"><!-- 2. Type / Event ID -->
          <b-col>
            <label class="m-0">Exam Type</label>
            <b-form-input id="type"
                          class="green"
                          @input.native="handleInput"
                          :value="editedExam.type"></b-form-input>
          </b-col>
          <b-col :cols="4">
            <label class="m-0">Event ID</label>
            <b-form-input id="id" :value="editedExam.id" @input.native="handleInput" />
          </b-col>
        </b-form-row>

        <b-form-row class="mt-2"> <!-- 3. Exam Name / Return Date -->
          <b-col>
            <label class="m-0">Exam Name</label>
            <b-form-input id="name" @input.native="handleInput" :value="editedExam.name" />
          </b-col>
          <b-col cols="5">
            <label class="m-0">Return Date</label>
            <b-form-input id="return"
                          @input.native="handleInput"
                          :value="editedExam.return" />
          </b-col>
        </b-form-row>

        <b-form-row class="mt-2"><!-- 5. Student Name / On off site -->
          <b-col>
            <label class="m-0">Student Name</label>
            <b-form-input id="examinee"
                          value="Camila Parker-Bowles"
                          @input.native="handleInput"/>
          </b-col>

        </b-form-row>

        <b-form-row class="mt-2"> <!-- 4. Format / Materials Received -->
          <b-col>
            <label class="m-0">Format</label>
            <b-form-select id="format"
                           :options="format"
                           :value="editedExam.format"
                           @change.native="handleInput" />
          </b-col>
          <b-col>
            <label class="m-0">{{editedExam.format==='paper' ? 'Materials Recd?' : 'Codes Recd?'}}</label>
            <b-form-select id="recdMaterials"
                           :options="materials"
                           @change.native="handleInput"
                           :value="editedExam.recdMaterials" />
          </b-col>
          <b-col cols="5" v-if="editedExam.recdMaterials==='true'">
            <label class="m-0">Date of Receipt</label>
            <b-form-input id="date-materials"
                          :value="editedExam.dateMaterials"
                          @input.native="handleInput" />
          </b-col>
        </b-form-row>

        <b-form-row v-if="editedExam.site!==null" class="mt-2"> <!-- 6. Room/Location / Booking -->
          <template v-if="editedExam.site==='off'">
            <b-col>
              <label class="m-0">Location Details</label>
              <b-form-input></b-form-input>
            </b-col>
          </template>
          <template v-else>
            <b-col :cols="3">
              <label class="m-0">Select the Date & Time</label>
              <b-button @click="showCal" class="btn-primary w-100">Select a different time</b-button>
            </b-col>
            <b-col cols="2">
              <label class="m-0">On/OffSite</label>
              <b-form-select id="site"
                             :options="siteOptions"
                             @change.native="handleInput"
                             :value="editedExam.site" />
            </b-col>

            <b-col :cols="2">
              <label class="m-0">Duration</label>
              <b-form-input value="4 HRS" disabled />
            </b-col>
          </template>
        </b-form-row>
        <!-- 5) Bookimg -->
        <b-form-row v-if="editedExam.site==='on' " class="mt-2">
          <b-col>
            <label class="m-0">Room</label>
            <b-form-input disabled value="Room1"></b-form-input>
          </b-col>
          <b-col>
            <label class="m-0">Date</label>
            <b-form-input disabled value="Tues Nov 13, 2018"></b-form-input>
          </b-col>
          <b-col>
            <label class="m-0">Time</label>
            <b-form-input disabled value="9:00 am"></b-form-input>
          </b-col>

        </b-form-row>
        <!-- 6) Comments -->
        <b-form-row class="mt-2">
          <b-col>
            <label class="m-0">Notes</label>
            <b-form-textarea :rows="3" />
          </b-col>
        </b-form-row>
        <!-- 7) Delete/Return -->
        <b-form-row class="mt-2">
          <b-col>
            <label class="m-0">Invigilator</label>
            <b-form-input></b-form-input>
          </b-col>
          <b-col cols="3">
            <label class="m-0">Return</label><br>
            <b-button class="btn-danger w-100">Delete Exam Record</b-button>
          </b-col>
          <b-col cols="3">
            <label class="m-0">Delete</label><br>
            <b-button class="btn-warning w-100">Return Exam to ITA</b-button>
          </b-col>
        </b-form-row>
      </b-form>
  </b-modal>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import Scheduler from './../room-booking/scheduler'
  import Invigilators from '@/room-booking/invigilators'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

  import '@fortawesome/fontawesome-free/css/fontawesome.css'
  import '@fortawesome/fontawesome-free/css/regular.css'
  import '@fortawesome/fontawesome-free/css/solid.css'

  export default {
    name: 'EditExam',
    components: { datePicker, Scheduler, Invigilators },

    data() {
      return {
        format: [
          {value: 'online', text: 'online'},
          {value: 'paper', text: 'paper'}
        ],
        materials: [
          {text: 'yes', value: 'true'},
          {text: 'no', value: 'false'}
        ],
        siteOptions: [
          {value:'off', text:'off-site'},
          {value:'on',text: 'on-site'}
        ],
        configDate: {
          format: 'MMM-DD-YYYY'
        },
        configTime: {
          format: 'LT',
          stepping: 15,
        },
        catagories: [
          {text: 'Yes', value: 'true'},
          {text: 'No', value: 'false'},
        ],
      }
    },

    computed: {
      ...mapState(['scheduleDisplay', 'editedExam', 'showExamEditModal']),
      formVisible() {
        if (this.type === 'Please select') return false
        return true
      },
    },

    methods: {
      ...mapMutations(['updateEditedExam', 'toggleEditExamModal']),
      handleInput(e) {
        this.updateEditedExam({[e.target.id]: e.target.value})
      },
      showCal() {
        this.visible = false
        this.showScheduler()
      },
      expandForm() {
        this.typeCaptured = true
      },
    }
  }
</script>

<style scoped>

  .yellow {
    background-color: #f7e1b5;
  }
  .green {
    background-color: #b6e1b6;
  }
  .purple {
    background-color: #e4b9c0;
  }
</style>
