<template>
  <b-modal :visible="true"
           size="lg"
           :hide-ok="true"
           :hide-cancel="true"
           modal-class="custom-base-modal"
           body-class="custom-base-modal-body"
           header-class="custom-base-modal-headerlg"
           footer-class="custom-base-modal-footer"
           @hidden="close">

    <template slot="modal-header">
      <h4>Add a non-ITA Exam</h4>
    </template>

    <template slot="modal-footer">
      <div class="d-flex flex-row-reverse">
        <b-button class="btn-secondary mr-2">Cancel</b-button>
        <b-button class="btn-primary">Submit</b-button>
      </div>
    </template>

    <b-form>
      <b-form-row>
        <b-col>
          <label>Exam Type</label>
          <b-form-select :options="exams" v-model="exam"  />
        </b-col>
        <b-col v-if="exam==='custom'" cols="7">
          <label>Custom Exam Type</label>
          <b-form-input value="Some Exam Type 1"/>
        </b-col>
      </b-form-row>

      <b-form-row >
        <b-col>
          <label class="mb-1">Exam Name</label>
          <b-form-input value="Some Exam Name 1" />
        </b-col>
        <b-col :cols="2">
          <label >Duration</label>
          <b-form-input value="2.5 HRS" />
        </b-col>
      </b-form-row>

      <b-form-row >
        <b-col>
          <label>Type of Exam</label>
          <b-form-select :options="types" v-model="type" />
        </b-col>
        <b-col>
          <label>Date/Time/Location Known?</label>
          <b-form-select v-model="known">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </b-form-select>
        </b-col>
        <b-col v-if="type==='session'" cols="3">
          <label>Number of Students</label>
          <b-form-input />
        </b-col>
      </b-form-row>
      <b-form-row v-if="known">
        <b-col >
          <label>Date</label>
          <b-form-input />
        </b-col>
        <b-col>
          <label>Time</label>
          <b-form-input/>
        </b-col>
      </b-form-row>
      <b-form-row  v-if="known">
        <b-col >
          <label>Location</label>
          <b-form-input/>
        </b-col>
      </b-form-row>
      <b-form-row  v-if="type==='individual'">
        <b-col >
          <label>Student Name</label>
          <b-form-input/>
        </b-col>
      </b-form-row>
      <b-form-row >
        <b-col>
          <label >Notes</label>
          <b-form-textarea :rows="3" />
        </b-col>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
  import { mapMutations } from 'vuex'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

  import '@fortawesome/fontawesome-free/css/fontawesome.css'
  import '@fortawesome/fontawesome-free/css/regular.css'
  import '@fortawesome/fontawesome-free/css/solid.css'

  export default {
    name: 'AddNonExam',
    components: { datePicker },

    data() {
      return {
        exams: [
          {text:'Pesticide Aoplication', value:'pest'},
          {text:'Dairy Inspection Tech', value:'milk'},
          {text: 'Custom', value: 'custom'}
        ],
        exam: '',
        types: [
          {text: 'Individual', value:'individual'},
          {text: 'Session', value:'session'},
          {text: 'Please select', value: null},
        ],
        type: '',
        known: '',
      }
    },
    methods: {
      ...mapMutations(['toggleNonExamModal']),
      close() {
        this.toggleNonExamModal(false)
      }
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
