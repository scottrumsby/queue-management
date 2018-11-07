<template>
  <div>
    <b-modal
      v-model="modalVisible"
      size="lg"
      :hide-ok="true"
      :hide-cancel="true"
      modal-class="custom-base-modal"
      body-class="custom-base-modal-body"
      header-class="custom-base-modal-headerlg"
      footer-class="custom-base-modal-footer">
        <template slot="modal-header">
          <h4>Add an ITA Exam</h4>
        </template>
        <b-form>
          <b-form-row>
            <b-col cols="6">
              <label>Exam Type and Colour Code</label><br>
              <b-dropdown class="m-0 p-0" :text="selected.text" v-show="examType !== null">
                <template v-for="i in examTypes">
                  <b-dd-header v-if="i.class==='header'" :class="`${i.class2}`" >{{ i.text }}</b-dd-header>
                  <b-dd-item v-else @click="selected=i" :class="`${i.class}`" >{{ i.text }}</b-dd-item>
                </template>
              </b-dropdown>
            </b-col>
          </b-form-row>

        <template v-if="selected.cat">
          <b-form-row >
            <b-col>
              <label class="mb-1">Exam Name</label>
              <b-form-input value="Some Exam Name 1" />
            </b-col>
            <b-col cols="2" v-if="selected.cat==='group'">
              <label class="mb-1">Format</label>
              <b-form-select>
                <option>Paper</option>
                <option>Online</option>
              </b-form-select>
            </b-col >
            <b-col cols="4" v-if="selected.cat==='single'">
              <label class="mb-1">Event ID</label>
              <b-form-input value="100294332" />
            </b-col>
          </b-form-row>
          <b-form-row v-if="selected.cat==='group'">
            <b-col>
              <label class="mb-1">Office</label>
              <b-form-input disabled value="Langley 2 - #71"/>
            </b-col>
            <b-col>
              <label class="mb-1">Lookup Office</label><br>
              <b-button>Launch List</b-button>
            </b-col>
            <b-col>
              <label class="mb-1">Event ID</label>
              <b-form-input value="100294332" />
            </b-col>
            <b-col cols="2">
              <label># of Students</label>
              <b-form-input />
            </b-col>
          </b-form-row>
          <b-form-row v-if="selected.cat==='single'">
            <b-col cols="2">
              <label class="mb-1">Received Today</label>
              <b-form-select v-model="recdToday" :options="todayChoices"/>
            </b-col>
            <b-col v-if="recdToday===false">
              <label class="mb-1">Date Received</label>
              <b-form-input />
            </b-col>
            <b-col>
              <label class="mb-1">Expires</label>
              <b-form-input />
            </b-col >
            <b-col cols="2">
              <label class="mb-1">Format</label>
              <b-form-select>
                <option>Paper</option>
                <option>Online</option>
              </b-form-select>
            </b-col >
          </b-form-row>
          <b-form-row v-if="selected.cat==='single'">
            <b-col>
              <label>Student Name</label>
              <b-form-input />
            </b-col>
          </b-form-row>
          <b-form-row v-if="selected.cat==='group'">
            <b-col >
              <label>Date</label>
              <b-form-input />
            </b-col>
            <b-col>
              <label>Time</label>
              <b-form-input/>
            </b-col>
          </b-form-row>
          <b-form-row v-if="selected.cat==='group'">
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
          <b-form-row>
            <b-col>
              <label >Notes</label>
              <b-form-textarea :rows="3" />
            </b-col>
          </b-form-row>
        </template>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

  import '@fortawesome/fontawesome-free/css/fontawesome.css'
  import '@fortawesome/fontawesome-free/css/regular.css'
  import '@fortawesome/fontawesome-free/css/solid.css'

  export default {
    name: 'AddITAExam',
    components: { datePicker },

    data() {
      return {
        selected: {
          cat: null,
        },
        examTypes: [
          {text: 'Heading Yellow', class:'header', class2:'p-0 pt-2 pl-1 yellow'},
          {text: 'ODSC 1 SINGLE-3HR+1HR-READER OWN', class:'yellow txt-85', cat:'single'},
          {text: 'ODSC 2 SINGLE-3HR NONE', class:'pt-0 yellow'},
          {text: 'ODSC 3 SINGLE-3HR+1HR-READER SBC', class:'pt-0 yellow'},
          {text: 'ODSC 4 GROUP-3HR+1HR-READER SBC ', class:'pt-0 yellow', cat:'group'},

          {text: 'Heading Green', class:'header', class2:'p-0 mt-1 pt-1 pl-1 green txt-85'},
          {text: 'CWERC 1 SINGLE-3HR+1HR-READER SBC', class:'pt-0 green'},
          {text: 'CWERC 2 SINGLE-3HR NONE', class:'pt-0 green'},

          {text: 'Heading Pink', class:'header', class2:'p-0 mt-1 pt-1 pl-1 purple txt-85'},
          {text: 'CWERC 3 SINGLE-3HR+1HR-READER SBC', class:'pt-0 purple'},
          {text: 'GTI 1 GROUP-3HR+1HR-TRANS', class:'pt-0 purple'},
          {text: 'GTI 2 GROUP-3HR+2HR-SBC IVN', class:'pt-0 purple'},
        ],
        recdToday: true,
        todayChoices: [
          {text: 'Yes', value: true},
          {text: 'No', value: false}
        ]

      }
    },
    computed: {
      ...mapState(['displaySchedule', 'addITAExamModalVisible']),
      formVisible() {
        if (this.type === 'Please select') return false
        return true
      },
      modalVisible: {
        get() {
          return this.addITAExamModalVisible
        },
        set(v) {
          this.toggleITAExamModal(v)
        }
      }
    },
    methods: {
      ...mapMutations(['toggleITAExamModal']),
    },
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
