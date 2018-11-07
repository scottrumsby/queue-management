<template>
  <div>
    <b-modal
      v-model="modalState"
      ref="ticketmodalmain"
      :hide-header="true"
      size="lg"
      @shown="stopFlasher"
      :hide-footer="true">

      <div class="w-100">
        <b-alert v-if="1===2"
                 style="h-align: center"
                 variant="warning">{{serveModalAlert}}
        </b-alert>
        <div class="serve-citizen-modal-top p-2">
        <div style="display: flex; flex-direction: row; justify-content: space-between"
             class="modal_header">
          <div>
            <h4>Ticket Summary</h4>
          </div>
          <div>
            <b-button size="sm"
                      class="btn-primary"
                      @click="toggleFeedback">Feedback</b-button>
            <b-button size="sm"
                      class="btn-primary"
                      style="margin-left: 20px"
                      @click="toggleMinimize">Minimize</b-button>
          </div>
        </div>
        <b-container class="pb-3" id="tm-citizen-modal-top" fluid>
          <b-row no-gutters class="p-2">
            <b-col cols="4">
              <div class="m-0 p-0"><h6>Ticket #: <strong>12</strong></h6></div>
              <div class="m-0 p-0"><h6>Channel: <b-form-select :options="options"/></h6></div>
              <div class="m-0 p-0"><h6>Created At: <strong>12:01 pm</strong></h6></div>
            </b-col>
            <b-col cols="auto" class="ml-3 mr-2">
              <h6>Comments</h6>
            </b-col>
            <b-col col cols="*" style="text-align: left" class="pr-2">
              <div>
                <b-textarea id="tm_comment_textarea"
                            :rows="4"
                            size="sm" />
              </div>
            </b-col>
          </b-row>

        </b-container>
      </div>
        <b-container fluid
                     id="tm-light-inner-container"
                     class="pt-2 pb-2">
        <b-row>
          <b-col>
            content
          </b-col>
        </b-row>
          <b-row>
            <b-col>
              <TicketTable />
            </b-col>
          </b-row>
        </b-container>
          <b-container fluid
                       id="tm-modal-footer"
                       class="pt-3">
            <b-row no-gutters align-h="center">
              <b-col cols="1" />
              <b-col cols="4">
                <b-button class="w-100 btn-primary serve-btn"
                          id="tm-place-on-hold-button">
                  Add Another Service
                </b-button>
              </b-col>
              <b-col cols="2" />
              <b-col cols="4">
                <b-button class="w-100 btn-primary serve-btn"
                          id="tm-finish-button"
                          @click="finish">
                  Finish
                </b-button>
                <div class="px-3 pt-1"
                     style="padding-right: 0 !important; border-radius: 5px; text-align: center">
                  <b-form-checkbox value="0"
                                   unchecked-value="1">Inaccurate Time
                  </b-form-checkbox>
                </div>
              </b-col>
              <b-col cols="1" />
            </b-row>
          </b-container>

        </div>
    </b-modal>
    <div v-if="ticketModal.minimized" :class="buttonStyle" :style="{top:`${top}px`}">
      <b-button @click="clickMiniTicket" class="btn-outline-secondary" size="sm">
        <span class="m-3">Ticket
          <font-awesome-icon icon="external-link-alt"
                             class="m-0 p-0"
                             style="font-size: 0.85rem;" />
        </span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import TicketTable from './ticket-table'
import TicketContent from './ticket-content'
let $flashingButton

export default {
  name: 'TicketModal',
  buttonStyle: 'floating blinksecondary',
  components: { TicketTable, TicketContent },
  created() {
    this.getNewHeight()
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getNewHeight)
    })
    this.$nextTick(function() {
      window.addEventListener('scroll', this.getNewHeight)
    })
  },
  data() {
    return {
      options: [
        {text: 'In Person', value:'person'},
        {text: 'Backoffice', value:'back'},
      ],
      top: 0,
      intervalCont: '',
      buttonStyle: 'floating blinksecondary'
    }
  },
  computed: {
    ...mapState(['ticketModal']),
    modalState: {
      get() {
        return this.ticketModal.visible
      },
      set(v) {
        this.toggleTicketModal(v)
      }
    },
  },
  methods: {
    ...mapActions([
      'clickServiceFinish',
      'clickAddService',
      'setServeModalAlert'
    ]),
    ...mapMutations([
      'editServiceModalForm',
      'toggleFeedbackModal',
      'updateTicketModal',
      'toggleTicketModal',
      'toggleStartWorkButton'
    ]),
    toggleMinimize() {
      this.updateTicketModal({visible: false})
      this.updateTicketModal({minimized: true})
      this.flasher()
    },
    toggleFeedback() {
      this.toggleFeedbackModal(true)
    },
    flashButton() {
      console.log('flashbutton called')
      this.buttonStyle == 'floating blinksecondary' ?
        (this.buttonStyle = 'floating blinkhighlight') : (this.buttonStyle = 'floating blinksecondary')
    },
    getNewHeight() {
      this.top = window.innerHeight - 165
    },
    flasher() {
      console.log('flasher called')
      $flashingButton = setInterval( () => { this.flashButton() }, 800)
    },
    stopFlasher() {
      console.log('stopFlsher called')
      clearInterval($flashingButton)
      $flashingButton = null
    },
    clickMiniTicket() {
      this.updateTicketModal({visible: true})
      this.updateTicketModal({minimized: false})
    },
    finish() {
      this.updateTicketModal({visible: false})
      this.updateTicketModal({minimized: false})
      this.toggleStartWorkButton(true)
    }
  },
}

</script>

<style scoped>
  .display-none {
    display: none;
  }
  .floating {
    position: absolute;
    z-index: 1700;
    left: 30px;
  }
  .blinksecondary {
    background-color: white;
    border: 1px solid darkslategrey;
    border-radius: 3px;
  }
  .blinkhighlight {
    color: black;
    border: 1px solid darkgoldenrod;
    background-color: gold;
  }
.serve-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  transition: display 1s;
}
.tm-content {
    background-color: #fefefe;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1%;
    border-radius: 5px;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

}
.serve-citizen-modal-top {
  border: 1px solid grey;
  background-color: WhiteSmoke;
}
.black {
  color: black;
  padding: 0px !important;
  margin: 0px !important;
}
#serve-citizen-modal-footer {
  padding-bottom: 1rem;
  border: 1px solid grey;
  background-color: WhiteSmoke;
}

strong {
  color: blue;
  font-size: 1.35rem;
}
</style>
