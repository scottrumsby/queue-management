<template>
  <b-modal
    v-model="modalVisible"
    size="lg"
    :hide-header="true"
    :hide-footer="true">
      <template slot="modal-title">
        Manage Invigilators
      </template>
    <b-form-row class="mb-2"><!-- 2. Type / Event ID -->
      <b-col>
        <label class="m-0">Exam Type</label>
        <b-form-input id="type"
                      class="green"
                      disabled
                      @input.native="handleInput"
                      :value="editedExam.type"></b-form-input>
      </b-col>
      <b-col :cols="4">
        <label class="m-0">Event ID</label>
        <b-form-input disabled id="id" :value="editedExam.id" @input.native="handleInput" />
      </b-col>
    </b-form-row>

    <b-form-row class="mt-2"> <!-- 3. Exam Name / Return Date -->
      <b-col>
        <label class="m-0">Exam Name</label>
        <b-form-input disabled id="name" @input.native="handleInput" :value="editedExam.name" />
      </b-col>
      <b-col cols="5">
        <label class="m-0">Return Date</label>
        <b-form-input disabled id="return"
                      @input.native="handleInput"
                      :value="editedExam.return" />
      </b-col>
    </b-form-row>

    <b-form-row class="mt-2"> <!-- 4. Format / Materials Received -->
      <b-col>
        <label class="m-0">Format</label>
        <b-form-select id="format"
                       :options="format"
                       disabled
                       :value="editedExam.format"
                       @change.native="handleInput" />
      </b-col>
      <b-col>
        <label class="m-0">Materials Received?</label>
        <b-form-select id="recdMaterials"
                       :options="materials"
                       disabled
                       @change.native="handleInput"
                       :value="editedExam.recdMaterials" />
      </b-col>
      <b-col cols="5" v-if="editedExam.recdMaterials==='true'">
        <label class="m-0">Date of Receipt</label>
        <b-form-input id="date-materials"
                      disabled
                      :value="editedExam.dateMaterials"
                      @input.native="handleInput" />
      </b-col>
    </b-form-row>

    <b-form-row class="mt-2"><!-- 5. Student Name / On off site -->
      <b-col>
        <label class="m-0">Student Name</label>
        <b-form-input id="examinee"
                      disabled
                      value="Camila Parker-Bowles"
                      @input.native="handleInput"/>
      </b-col>

      <b-col cols="2">
        <label class="m-0">On/OffSite</label>
        <b-form-select id="site"
                       disabled
                       :options="siteOptions"
                       />
      </b-col>
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
        <b-form-textarea disabled :rows="3" />
      </b-col>
    </b-form-row>
    <!-- 7) Delete/Return -->
    <b-form-row class="mt-2">
      <b-col>
        <label disabled class="m-0" >Invigilator</label>
        <b-form-input disabled value="I am Bender Insert Girder"></b-form-input>
      </b-col>

    </b-form-row>
    <b-form-row class="mt-2">
      <b-col cols="5" />
      <b-col cols="4">
        <b-button variant="warning" class="w-100">Edit Exam Event</b-button>
      </b-col>
      <b-col cols="3">
        <b-button variant="secondary" class="w-100">Close</b-button>
      </b-col>
    </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'Confirm',
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
      ...mapState(['confirmModalVisible','editedExam']),
      modalVisible: {
        get() {
          return this.confirmModalVisible
        },
        set(v) {
          this.toggleConfirmModal(v)
        }
      }
    },
    methods: {
      ...mapMutations(['toggleConfirmModal'])
    }
  }
</script>

<style scoped>

</style>
