<template>
  <b-modal v-model="modal"
           :no-close-on-backdrop="true"
           :ok-only="okButton.title === 'Cancel'"
           :ok-title="okButton.title"
           :ok-variant="okButton.title === 'Cancel' ? 'secondary' : 'primary'"
           :ok-disabled="okButton.disabled"
           hide-header
           :size="returned ? 'md' : 'sm' "
           @shown="show"
           @hidden="hide"
           @cancel="cancel"
           @ok.prevent="submit">
    <FailureExamAlert />
    <b-form>
      <b-form-row>
        <b-col class="q-modal-header">Return Exam</b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group>
            <label>Exam Returned</label><br>
            <b-select id="exam-returned-select"
                      v-model="returned"
                      @input="handleReturnedStatus"
                      :options="returnOptions" />
          </b-form-group>
        </b-col>
        <b-col v-if="returned">
          <b-form-group>
            <label>Date of Return</label><br>
            <DatePicker v-model="exam_returned_date"
                        class="w-100"
                        input-class="form-control"
                        lang="en" />
          </b-form-group>
        </b-col>
      </b-form-row>
      <template v-if="returned">
        <b-form-row>
          <b-col>
            <b-form-group>
              <label>Action Taken</label><br>
              <b-form-input v-model="exam_returned_tracking_number"
                            ref="returnactiontaken"/>
            </b-form-group>
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col>
            <b-form-group>
              <label>Notes</label><br>
              <b-textarea v-model="notes"
                          :rows="2"/>
            </b-form-group>
          </b-col>
        </b-form-row>
      </template>
    </b-form>
  </b-modal>
</template>

<script>
  import { mapActions, mapMutations, mapState } from 'vuex'
  import DatePicker from 'vue2-datepicker'
  import moment from 'moment'
  import FailureExamAlert from './failure-exam-alert'

  export default {
    name: "ReturnExamModal",
    props: ['actionedExam', 'resetExam'],
    components: { FailureExamAlert, DatePicker },
    data() {
      return {
        exam: null,
        returned: false,
        exam_returned_date: null,
        notes: null,
        exam_returned_tracking_number: null,
        returnOptions: [
          { value: false, text: 'No' },
          { value: true, text: 'Yes' },
        ],
      }
    },
    computed: {
      ...mapState({
        showModal: 'showReturnExamModal',
        editExamSuccess: 'editExamSuccess',
        editExamFailure: 'editExamFailure',
      }),
      okButton() {
        if (!this.returned && this.exam_returned_date) {
          return {title: 'Restore Exam', disabled: false}
        }
        if (this.returned) {
          if (this.exam_returned_date && this.exam_returned_tracking_number) {
            return {title: 'Submit', disabled: false}
          }
          return {title: 'Submit', disabled: true}
        }
        return {title: 'Cancel', disabled: false}
      },
      modal: {
        get() {
          return this.showModal
        },
        set(e) {
          this.toggleReturnExamModal(e)
        },
      },
    },
    methods: {
      ...mapActions(['putExamInfo', ]),
      ...mapMutations(['toggleReturnExamModal', 'setEditExamSuccess', 'setEditExamFailure', ]),
      handleReturnedStatus(value) {
        if (value) {
          if (!this.exam_returned_date) {
            this.exam_returned_date = moment()
          }
          this.$nextTick( () => {
            this.$refs.returnactiontaken.focus()
          })
        }
      },
      show() {
        let exam = Object.assign({}, this.actionedExam)
        if (exam.exam_returned_date) {
          this.returned = true
          this.exam_returned_date = exam.exam_returned_date
        }
        this.exam_returned_tracking_number = exam.exam_returned_tracking_number
        this.notes = exam.notes
        this.exam = this.actionedExam
      },
      hide() {
        this.resetModal()
      },
      cancel() {
        this.resetModal()
      },
      resetModal() {
        this.toggleReturnExamModal(false)
        this.exam = null
        this.returned = false
        this.exam_returned_date = null
        this.exam_returned_tracking_number = null
        this.notes  = null
        this.resetExam()
      },
      submit() {
        if (this.okButton.title === 'Cancel') {
          this.resetModal()
          return
        }
        let putData = {
          exam_id: this.exam.exam_id,
          exam_returned_date: this.exam_returned_date,
          exam_returned_tracking_number: this.exam_returned_tracking_number,
          notes: this.notes,
        }
        if (!this.returned && this.exam.exam_returned_date) {
          putData = {
            exam_returned_date: null,
            exam_returned_tracking_number: null,
            notes: this.notes,
          }
        }
        this.putExamInfo(putData).then( () => {
          this.resetModal()
        }).catch( () => {
          this.setExamEditFailureMessage(10)
        })
      }
    },
  }
</script>
