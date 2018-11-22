<template>
  <b-modal
    v-model="modalVisible"
    modal-class="custom-base-modal"
    body-class="custom-base-modal-body"
    header-class="custom-base-modal-headermd"
    footer-class="custom-base-modal-footer"
    size="md">
    <template slot="modal-header">
      <h4 class="p-0 m-0">Booking for Office 2</h4>
    </template>

    <b-form>
      <b-form-row class="mb-2">
        <b-col>
          <label>Billing Option</label>
          <b-form-select :options="options"></b-form-select>
        </b-col>
      </b-form-row>

      <b-form-row class="mb-2">
        <b-col>
          <label>Requestor</label>
          <b-form-input value=""></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row class="mb-2">
        <b-col>
          <label>Time</label>
          <b-form-input value="2:00 pm"></b-form-input>
        </b-col>
        <b-col>
          <label>Until</label>
          <b-form-input value="5:00 pm"></b-form-input>
        </b-col>
        <b-col>
          <label>Duration</label>
          <b-form-input disabled value="3 HRS"></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row class="mb-2">
        <b-col>
          <label>Event Title</label>
          <b-form-input value=""></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row class="mb-2">
        <b-col>
          <label class="m-0">Notes</label>
          <b-form-textarea :rows="3" value="Reserve Room 3 for quarterly staff performance reviews."/>
        </b-col>
      </b-form-row>
    </b-form>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'BookRoom',
    data() {
      return {
        options: [
          {text: '$125 for 4 hrs (1/2 day)', value: 'half'},
          {text: '$250 for 8 hrs (1 day)', value: 'whole'},
          {text: 'no charge', value: 'free'},
        ],
        option: '',
      }
    },
    computed: {
      ...mapState(['bookRoomModalVisible']),
      modalVisible: {
        get() {
          return this.bookRoomModalVisible
        },
        set(v) {
          this.toggleBookRoomModal(v)
        }
      }
    },
    methods: {
      ...mapMutations(['toggleBookRoomModal'])
    }
  }
</script>

<style scoped>

</style>
