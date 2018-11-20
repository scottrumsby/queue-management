/*Copyright 2015 Province of British Columbia

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.*/



import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import { Axios } from './helpers'
var flashInt

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    calendarScheduleMode: false,
    resources: [
      { id: 'room1', title: 'Boardroom 1', eventColor: '#b2cdea' },
      { id: 'room2', title: 'Boardroom 2', eventColor: '#c7ebc5' },
      { id: 'room3', title: 'Office 6', eventColor: '#f0c0b5' }
    ],
    eventsSource: {
      events: [
        {
          title: 'Level 1 Electrical',
          start: '2018-11-19T09:00:00',
          end: '2018-11-19T12:00:00',
          resourceId: 'room1'
        },
        {
          title: 'Level 1 Foodsafe',
          start: '2018-11-19T09:00:00',
          end: '2018-11-19T12:00:00',
          resourceId: 'room3'
        },
        {
          title: 'Session Exam 2',
          start: '2018-11-19T13:00:00',
          end: '2018-11-19T16:00:00',
          resourceId: 'room2'
        },
        {
          title: 'Session Exam 3',
          start: '2018-11-19T13:00:00',
          end: '2018-11-19T17:00:00',
          resourceId: 'room3'
        },
        {
          title: 'Level 3 Electrical',
          start: '2018-11-20T09:00:00',
          end: '2018-11-20T12:00:00',
          resourceId: 'room2'
        },
        {
          title: 'Level 2 Foodsafe',
          start: '2018-11-20T09:00:00',
          end: '2018-11-20T12:00:00',
          resourceId: 'room3'
        },
        {
          title: 'Level 6 Foodsafe',
          start: '2018-11-20T09:00:00',
          end: '2018-11-20T12:00:00',
          resourceId: 'room1'
        },
        {
          title: 'Session Exam 4',
          start: '2018-11-20T13:00:00',
          end: '2018-11-20T17:00:00',
          resourceId: 'room2'
        },
        {
          title: 'Session Exam 5',
          start: '2018-11-21T13:00:00',
          end: '2018-11-21T17:00:00',
          resourceId: 'room2'
        },
      ]
    },
    calendarView: 'listWeek',
    startWorkButtonVisible: true,
    navigationVisible: true,
    bookRoomModalVisible: false,
    inventoryModalVisible: false,
    examCaptureVisible: false,
    invigilatorsModalVisible: false,
    ticketModal: {
      visible: false,
      minimized: false,
      selection: 'citizen',
      selectVisible: false,
    },
    ticketModalForm: {
      id: '',
      catagory: '',
      service: '',
      quantity: '',
    },
    addITAExamModalVisible: false,
    addNonExamModalVisible: false,
    editedExam: {
      type: 'ELEC LVL 1-3HR+1HR-READER OWN',
      title: 'Level 1 Electrical',
      id: 100232433,
      expires: '2019-01-30',
      format: 'paper',
      recdMaterials: true,
      dateMaterials: '2018-11-02',
      site: 'on',
      student: 'Group/Session Exam',
      location: '',
      room: 'Board Room 2',
      examDate:'',
      examTime:'',
      duration:'',
      invigilator:'',
      notes:'',
      duration: '3 hr'
    },
    editExamModalVisible: false,
    showExamCaptureModal: false,
    examInventory: [
      {
        type: 'ELEC LVL 1-3HR+1HR-READER OWN',
        title: 'Level 1 Electrical',
        id: 100232433,
        expires: '2019-01-30',
        format: 'paper',
        recdMaterials: true,
        dateMaterials: '2018-11-02',
        site: 'on',
        student: 'Group/Session Exam',
        location: '',
        room: 'Board Room 2',
        examDate:'',
        examTime:'',
        duration:'',
        invigilator:'',
        notes:'',
        duration: '3 hr'
      },
      {
        type: 'ELEC LVL 1-3HR+1HR-READER OWN',
        title: 'Level 9 Foodsafe',
        id: 100232103,
        expires: '2019-02-07',
        format: 'paper',
        recdMaterials: true,
        dateMaterials: '2018-11-11',
        site: 'off',
        student: 'Group/Session Exam',
        location: 'Comfort Suites, 2656 Hwy 97 Nth, Kelowna--Main Conference Rm',
        room: '',
        examDate:'2019-12-17',
        examTime:'10:00 am',
        duration:'',
        invigilator:'Candice Bergen',
        notes:'',
        duration: '4 hr',
      },
      {
        type: 'ELEC LVL 1-3HR+1HR-READER OWN',
        title: 'Introductory Pesticides',
        id: 100232433,
        expires: '2019-01-30',
        format: 'paper',
        recdMaterials: true,
        dateMaterials: '2018-11-02',
        site: 'on',
        student: 'Dolly Parton',
        location: '',
        room: 'Board Room 1',
        examDate:'',
        examTime:'',
        duration:'',
        invigilator:'Gillian Anderson',
        notes:'',
        duration: '3 hr',
      },
      {
        type: 'ELEC LVL 1-3HR+1HR-READER OWN',
        title: 'Criminology 321a',
        id: 100232103,
        expires: '2019-02-07',
        format: 'paper',
        recdMaterials: true,
        dateMaterials: '2018-11-11',
        site: 'on',
        student: 'Howard Johnson',
        location: 'FlexRoom 2',
        room: '',
        examDate:'',
        examTime:'',
        duration:'',
        invigilator:'Dana Scully',
        notes:'',
        duration: '3 hr',
      },
      {
        type: 'ELEC LVL 1-3HR+1HR-READER OWN',
        title: 'Welding Theory',
        id: 100232433,
        expires: '2019-01-30',
        format: 'paper',
        recdMaterials: true,
        dateMaterials: '2018-11-02',
        site: 'on',
        student: 'Group/Session Exam',
        location: '',
        room: 'Room 3',
        examDate:'2018-12-14',
        examTime:'9:00am',
        duration:'4hrs',
        invigilator:'',
        notes:'',
      },
      {
        type: 'ELEC LVL 1-3HR+1HR-READER OWN',
        title: 'WorkSafeBC Safety Tech',
        id: 100232103,
        expires: '2019-02-07',
        format: 'online',
        recdMaterials: false,
        dateMaterials: '2018-11-11',
        site: 'off',
        student: 'Condoleeza Rice',
        location: 'Best Western, 2402 Hwy 97 North, Kelowna--Conference Room 2',
        room: '',
        examDate:'2019-12-03',
        examTime:'1:00 pm',
        duration:'',
        invigilator:'Dana Scully',
        notes:'',
        duration: '2 hr'
      },
    ],
    invigilators: [
      { name: 'Truman Capote', phone: '778-146-2308', notes: 'none' },
      { name: 'John Smith', phone: '778-146-4444', notes: `Don't book Fridays`, events:true, },
      { name: 'Dorris Day', phone: '778-146-2462', notes: 'Does not drive', events: true },
      { name: 'Candice Bergen',
        contract: 3848304,
        email: 'c_bergen@hotmail.com',
        exp: '2019/01/31',
        phone: '778-432-1223',
        notes: 'none'
      },
      { name: 'Joe Clark', phone: '778-432-1223', notes: 'none' },
    ],
    addModalForm: {
      citizen:'',
      comments: '',
      channel: '',
      search: '',
      category: '',
      service:'',
      quick: 0,
      suspendFilter: false,
      selectedItem: '',
      priority: 2
    },
    addModalSetup: null,
    alertMessage: '',
    allCitizens: [],
    bearer: '',
    categories: [],
    channels: [],
    citizens: [],
    citizenInvited: false,
    countDown: 0,
    showBookingConfirmModal: false,

    feedbackMessage: '',
    isLoggedIn: false,
    nowServing: false,
    officeType: null,
    schedulerModalVisible: false,
    serveNowAltAction: false,
    serveNowStyle: 'btn-primary',
    serviceBegun: false,
    serviceModalForm: {
      citizen_id: null,
      service_citizen: null,
      citizen_comments: '',
      activeQuantity: 1,
      accurate_time_ind: 1,
      quick: 0,
      priority: 2
    },
    services: [],
    showAddModal: false,
    showFeedbackModal: false,
    showResponseModal: false,
    showServiceModal: false,
    user: {
      username: null,
      office: {
        office_id: null,
        office_name: null,
        sb: {
          sb_type: null,
        },
      },
      office_id: null,
      qt_xn_csr_ind: true,
      receptionist_ind: null,
      checkComplete: false,
      userLoadingFail: false,
    },
  },

  getters: {
    reception(state) {
      if (state.user.office && state.user.office.sb)
        if (state.user.office.sb.sb_type === "callbyname" || state.user.office.sb.sb_type === "callbyticket") {
          return true
        }
        return false
    },

    active_index(state, getters) {
      let { service_citizen } = state.serviceModalForm

      if (!service_citizen || !service_citizen.service_reqs || service_citizen.service_reqs.length === 0) {
        return 0
      }
      return service_citizen.service_reqs.findIndex(sr => sr.periods.some(p => p.time_end == null))
    },

    active_service: (state, getters) => {
      let { service_citizen } = state.serviceModalForm
      if (!service_citizen || !service_citizen.service_reqs || service_citizen.service_reqs.length === 0) {
        return null
      }
      return service_citizen.service_reqs.filter(sr => sr.periods.some(p => p.time_end == null))[0]
    },

    active_service_id: (state) => (citizen_id) => {
      let { citizens } = state
      let citizen = citizens.find(c => c.citizen_id === citizen_id)

      return citizen.service_reqs.find(sr=>sr.periods.some(p=>p.time_end === null))
    },

    invited_service_reqs: (state, getters) => {
      let { service_citizen } = state.serviceModalForm

      if (!service_citizen || !service_citizen.service_reqs || service_citizen.service_reqs.length === 0) {
        return []
      }

      return service_citizen.service_reqs.sort((a,b) => { return b.sr_id - a.sr_id })
    },

    invited_citizen: (state) => {
      let { service_citizen } = state.serviceModalForm
      return service_citizen
    },

    on_hold_queue(state) {
      let { citizens } = state
      if (!citizens || citizens.length===0) {
        return []
      }

      let isCitizenOnHold = function(c) {
        let test = c.service_reqs.filter(sr=>sr.periods.some(p=>p.time_end == null && p.ps.ps_name === 'On hold'))
        if (test.length > 0) {
          return true
        } else {
          return false
        }
      }
      let filtered = citizens.filter(c=>c.service_reqs.length > 0)
      let list = filtered.filter(isCitizenOnHold)
      return list
    },

    citizens_queue(state) {
      let { citizens } = state
      if (!citizens || citizens.length===0) {
        return []
      }

      let isCitizenQueued = function(c) {
        let test = c.service_reqs.filter(sr=>sr.periods.some(p=>p.time_end == null && p.ps.ps_name === 'Waiting'))
        if (test.length > 0) {
          return true
        } else {
          return false
        }
      }
      let filtered = citizens.filter(c=>c.service_reqs.length > 0)
      let list = filtered.filter(isCitizenQueued)
      return list
    },

    form_data: state => {
      return state.addModalForm
    },

    channel_options: state => {
      return state.channels.map(ch=>({value: ch.channel_id, text: ch.channel_name}))
    },

    categories_options: (state, getters) => {
      let opts = state.categories
      let mappedOpts = opts.map(opt =>
          ({value: opt.service_id, text: opt.service_name})
        )
      let blankOpt = [{value:'', text:'Categories'}]
      return blankOpt.concat(mappedOpts)
    },

    filtered_services: (state, getters) => {
      let services = state.services

      if (getters.form_data.category) {
        return services.filter(service=>service.parent.service_id === getters.form_data.category)
      } else {
        return services
      }
    },

    quick_trans_status(state) {
      if (state.user.qt_xn_csr_ind == 1) {
        return true
      } else if (state.user.qt_xn_csr_ind == 0) {
        return false
      } else {
        console.error('quick trans status: ', state.user.qt_xn_csr_ind)
      }
    },

    receptionist_status(state) {
      if (state.user.receptionist_ind == 1) {
        return true
      } else if (state.user.receptionist_ind == 0) {
        return false
      } else {
        console.error('receptionist status: ', state.user.qt_xn_csr_ind)
      }
    }
  },

  actions: {
    flashServeNow(context, payload) {
      let flash = () => {
        if ( context.state.serveNowStyle === 'btn-primary' ) {
          context.commit('flashServeNow', 'btn-highlighted')
        } else if ( context.state.serveNowStyle === 'btn-highlighted' ) {
          context.commit('flashServeNow', 'btn-primary')
        }
      }
      if (payload === 'start') {
        flashInt = setInterval( ()=>{ flash() }, 800)
        return
      }
      if (payload === 'stop') {
        clearInterval(flashInt)
        context.commit('flashServeNow', 'btn-primary')
      }
    },

    logIn(context, payload) {
      context.commit('setBearer', payload)
      context.commit('logIn')
      context.dispatch('getUser')
    },

    getAllCitizens(context) {
      let url = '/citizens/'
      Axios(context).get(url).then( resp => {
        if (!resp.data.citizens) {
          context.commit('updateQueue', [])
          return
        }
        context.commit('updateQueue', resp.data.citizens)
        if (!context.state.checkComplete) {
          context.dispatch('checkForUnfinishedService', resp.data.citizens).then(()=>{
            context.commit('logCheckComplete', true)
          })

        }
      })
    },

    getCategories(context) {
      Axios(context).get('/categories/')
        .then( resp => {
          context.commit('setCategories', resp.data.categories)
        })
        .catch(error => {
          console.log('error @ store.actions.getCategories')
          console.log(error.response)
          console.log(error.message)
        })
    },

    getChannels(context) {
      return new Promise((resolve, reject) => {
        let url = `/channels/`
        Axios(context).get(url).then(resp=>{
          context.commit('setChannels', resp.data.channels)
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    getCitizen(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/`
        Axios(context).get(url).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    getServices(context) {
      let office_id = context.state.user.office.office_id
      Axios(context).get(`/services/?office_id=${office_id}`)
        .then( resp => {
          let services = resp.data.services.filter(service => service.actual_service_ind === 1)
          context.commit('setServices', services)
        })
        .catch(error => {
          console.log('error @ store.actions.getServices')
          console.log(error.response)
          console.log(error.message)
        })
    },

    getUser(context) {
      return new Promise((resolve, reject) => {
        let url = '/csrs/me/'
        Axios(context).get(url).then(resp=>{
          context.commit('setUser', resp.data.csr)
          let officeType = resp.data.csr.office.sb.sb_type
          context.commit('setOffice', officeType)
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    cancelAddCitizensModal(context) {
      let { citizen_id } = context.getters.form_data.citizen

      context.dispatch('postCitizenLeft', citizen_id)
        .then( () => {
          context.commit('toggleAddModal', false)
          context.commit('resetAddModalForm')
        })
    },

    clickAddCitizen(context) {
      context.dispatch('toggleModalBack')
      Axios(context).post('/citizens/', {})
        .then(resp => {
          let value = resp.data.citizen
          context.commit('updateAddModalForm', {type:'citizen',value})
          context.commit('toggleAddModal', true)
          context.commit('resetServiceModal')
        })
      if (context.state.categories.length === 0) {
        context.dispatch('getCategories')
      }
      if (context.state.channels.length === 0) {
        context.dispatch('getChannels').then( () => {
          context.commit('setDefaultChannel')
        })
      }
      if (context.state.channels.length > 0) {
        context.commit('setDefaultChannel')
      }
      if (context.state.services.length === 0) {
        context.dispatch('getServices')
      }
    },

    clickAddService(context) {
      if (context.state.channels.length === 0) {
        context.dispatch('getCategories')
        context.dispatch('getChannels')
        context.dispatch('getServices')
      }

      context.dispatch('putServiceRequest').then(() => {
        context.dispatch('putCitizen').then(() => {
          context.commit('switchAddModalMode', 'add_mode')
          context.commit('updateAddModalForm', {
            type: 'citizen',
            value: context.getters.invited_citizen
          })
          context.commit('updateAddModalForm', {
            type: 'channel',
            value: context.getters.active_service.channel_id
          })
          context.commit('updateAddModalForm', {
            type: 'quick',
            value: context.getters.invited_citizen.qt_xn_citizen_ind
          })
          context.commit('updateAddModalForm', {
            type: 'priority',
            value: context.getters.invited_citizen.priority
          })
          context.commit('toggleAddModal', true)
          context.commit('toggleServiceModal', false)
        })
      })
  },

    clickAddServiceApply(context) {
      context.dispatch('postServiceReq').then(() => {
        context.dispatch('putCitizen').then(() => {
          context.commit('toggleAddModal', false)
          context.commit('toggleServiceModal', true)
          context.dispatch('toggleModalBack')
          context.commit('resetAddModalForm')
        })
      })
  },

    clickAddToQueue(context) {
      let { citizen_id } = context.getters.form_data.citizen

      context.dispatch('putCitizen').then( () => {
        context.dispatch('postServiceReq').then( () => {
          context.dispatch('postAddToQueue', citizen_id).then( resp => {
            context.dispatch('resetAddCitizenModal')
            context.commit('toggleBegunStatus', false)
            context.commit('toggleInvitedStatus', false)

          })
        })
      })
    },

    clickBeginService(context) {
      let {citizen_id} = context.getters.form_data.citizen

      context.dispatch('putCitizen').then( () => {
        context.dispatch('postServiceReq').then( () => {
          context.dispatch('postBeginService', citizen_id).then( () => {
            context.commit('toggleAddModal', false)
            context.commit('toggleBegunStatus', true)
            context.commit('toggleInvitedStatus', false)
            context.commit('toggleServiceModal', true)
            context.commit('resetAddModalForm')
          })
        })
      })
    },

    clickBackOffice(context) {
      context.dispatch('toggleModalBack')
      Axios(context).post('/citizens/', {})
        .then(resp => {
          let value = resp.data.citizen
          context.commit('updateAddModalForm', {type:'citizen',value})
          let chanopts = context.getters.channel_options
          let index = chanopts.findIndex(co=>co.text === 'back office')
          context.commit('updateAddModalForm', {type:'channel', value:chanopts[index].value})
          context.commit('toggleAddModal', true)
        })
      if (context.state.categories.length == 0) {
        context.dispatch('getCategories')
      }
      if (context.state.channels.length == 0) {
        context.dispatch('getChannels')
      }
      if (context.state.services.length == 0) {
        context.dispatch('getServices')
      }
    },

    clickCitizenLeft(context) {
      let {citizen_id} = context.getters.invited_citizen
      context.dispatch('postCitizenLeft', citizen_id)
      context.commit('toggleServiceModal', false)
      context.commit('toggleBegunStatus', false)
      context.commit('toggleInvitedStatus', false)
      context.commit('resetServiceModal')

    },

    clickDashTableRow(context, citizen_id) {
      context.dispatch('postInvite', citizen_id).then( () => {
        context.commit('toggleBegunStatus', false)
        context.commit('toggleInvitedStatus', true)
        context.commit('toggleServiceModal', true)
      })
    },

    clickEdit(context) {
      if (context.state.channels.length === 0) {
        context.dispatch('getCategories')
        context.dispatch('getChannels')
        context.dispatch('getServices')
      }
      context.dispatch('putServiceRequest').then(() => {
        context.commit('switchAddModalMode', 'edit_mode')
        context.dispatch('setAddModalData')
        context.commit('toggleAddModal', true)
        context.commit('toggleServiceModal', false)
        context.commit('setPerformingAction', false)
      }).catch(() => {
        context.commit('setPerformingAction', false)
      })
    },

    clickEditApply(context) {
      context.dispatch('putServiceRequest').then( () => {
        context.dispatch('putCitizen').then(() => {
          context.commit( 'toggleAddModal', false )
          context.dispatch( 'toggleModalBack' )
          context.commit( 'resetAddModalForm' )
          context.commit( 'toggleServiceModal', true )
        })
      })
    },

    clickEditCancel(context) {
      context.commit('toggleAddModal', false)
      context.dispatch('toggleModalBack')
      context.commit('resetAddModalForm')
      context.commit('toggleServiceModal', true)
    },

    clickHold(context) {
      let { citizen_id } = context.state.serviceModalForm
      context.dispatch('putCitizen').then(() => {
        context.dispatch('putServiceRequest').then(() => {
          context.dispatch('postHold', citizen_id).then(() => {
            context.commit('toggleBegunStatus', false)
            context.commit('toggleInvitedStatus', false)
            context.commit('toggleServiceModal', false)
          })
        })
      })
    },

    clickInvite(context) {
      context.dispatch('postInvite', 'next').then(() => {
        context.commit('toggleInvitedStatus', true)
        context.commit('toggleServiceModal', true)
      }).catch(() => {
        context.commit('setMainAlert', 'There are no citizens waiting.')
      })
    },

    checkForUnfinishedService(context, citizens) {

      if (context.state.serviceBegun || context.state.citizenInvited) {
        clearInterval(flashInt)
        context.commit('flashServeNow', 'btn-primary')
        return
      }
      if ( !( context.state.serviceBegun && context.state.citizenInvited ) ) {
        let citizenFound = false
        citizens.forEach(citizen => {
          if ( citizen.service_reqs.length > 0 ) {
            let activeService = citizen.service_reqs.filter(sr => sr.periods.some(p => p.time_end === null))
            if ( activeService[0].periods.length > 0 ) {
              let activePeriod = activeService[0].periods[activeService[0].periods.length - 1]
              if ( ( ['Invited', 'Being Served'].indexOf(activePeriod.ps.ps_name) > -1 )
                && activePeriod.csr.username === this.state.user.username ) {
                citizenFound = true

                if ( activePeriod.ps.ps_name === 'Invited' ) {
                  context.commit('setServiceModalForm', citizen)
                  context.commit('toggleInvitedStatus', true)
                  context.commit('toggleBegunStatus', false)
                  context.dispatch('flashServeNow', 'start')
                  context.commit('resetAddModalForm')
                } else if ( activePeriod.ps.ps_name === 'Being Served' ) {
                  context.commit('setServiceModalForm', citizen)
                  context.commit('toggleInvitedStatus', true)
                  context.commit('setServeNowAction', true)
                  context.dispatch('flashServeNow', 'start')
                  context.commit('resetAddModalForm')
                } else {
                  context.commit('toggleServiceModal', false)
                  context.commit('toggleBegunStatus', false)
                  context.commit('toggleInvitedStatus', false)
                  context.commit('resetAddModalForm')
                }
              }
            }
          }
        })

        if ( !citizenFound ) {
          context.commit('resetServiceModal')
          context.commit('toggleServiceModal', false)
          context.commit('toggleBegunStatus', false)
          context.commit('toggleInvitedStatus', false)
        }
      }
    },

    clickMakeActive(context, sr_id) {
      context.dispatch('putServiceRequest').then(() => {
        context.dispatch('putCitizen').then(() => {
          context.dispatch('postActivateServiceReq', sr_id)
        })
      })
    },
    clickReturnToQueue(context) {
     let {citizen_id} = context.getters.invited_citizen
     context.dispatch('putCitizen').then( () => {
       context.dispatch('putServiceRequest').then( () => {
         context.dispatch('postAddToQueue', citizen_id).then( () => {
           context.commit('toggleInvitedStatus', false)
           context.commit('toggleServiceModal', false)
           context.commit('resetServiceModal')

         })
       })
     })
    },

    clickRowHoldQueue(context, citizen_id) {
      context.dispatch('postBeginService', citizen_id).then( () => {
        context.commit('toggleBegunStatus', true)
        context.commit('toggleInvitedStatus', false)
        context.commit('toggleServiceModal', true)
      })
    },

    toggleBegunStatus(context, payload) {
      context.commit('toggleBegunStatus', payload)
    },

    toggleInvitedStatus(context, payload) {
      context.commit('toggleInvitedStatus', payload)
    },

    clickServeNow(context) {
      if (context.state.serveNowAltAction) {
        context.commit('toggleBegunStatus', true)
        context.commit('toggleInvitedStatus', false)
      }
      context.commit('toggleServiceModal', true)
      context.dispatch('flashServeNow', 'stop')
    },

    clickServiceBeginService(context) {
      let { citizen_id } = context.state.serviceModalForm

      context.dispatch('putCitizen').then( () => {
        context.dispatch('putServiceRequest').then( () => {
          context.dispatch('postBeginService', citizen_id)
          context.commit('toggleBegunStatus', true)
        })
      })
    },

    clickServiceFinish(context) {
      let { citizen_id } = context.state.serviceModalForm

      context.dispatch('putCitizen').then( (resp) => {
        context.dispatch('putServiceRequest').then( () => {
          context.dispatch('postFinishService', citizen_id).then( () => {
            context.commit('toggleServiceModal', false)
            context.commit('toggleBegunStatus', false)
            context.commit('toggleInvitedStatus', false)

          })
        })
      })
    },

    clickServiceModalClose(context) {
      context.commit('toggleServiceModal', false)
      context.commit('toggleInvitedStatus', true)
    },

    closeGAScreenModal(context) {
      context.commit('toggleGAScreenModal', false)
    },

      messageFeedback(context) {
      let messageParts = []
      messageParts.push(`Username: ${context.state.user.username}`)
      messageParts.push(`Office: ${context.state.user.office.office_name}`)

      let activeCitizen = context.state.serviceModalForm.service_citizen

      if (activeCitizen) {
        let activeService = activeCitizen.service_reqs.filter(sr => sr.periods.some(p => p.time_end === null))[0]
        let activePeriod = activeService.periods.filter(p => p.time_end === null)[0]

        messageParts.push(`Ticket Number: ${activeCitizen.ticket_number}`)
        messageParts.push(`Citizen ID: ${activeCitizen.citizen_id}`)
        messageParts.push(`Active SR ID: ${activeService.sr_id}`)
        messageParts.push(`Active Period ID: ${activePeriod.period_id}`)
      } else {
        messageParts.push(`Ticket Number: not available`)
      }
      messageParts.push("")
      messageParts.push(`Message: ${context.state.feedbackMessage}`)

      let feedbackObject = {
        feedback_message: messageParts.join("\n")
      }

      let url = "/feedback/"
      Axios(context).post(url, feedbackObject).then(()=> {
        context.commit('setFeedbackMessage', '')
      })
    },

    postActivateServiceReq(context, sr_id) {
      return new Promise((resolve, reject) => {
        let url = `/service_requests/${sr_id}/activate/`
        Axios(context).post(url).then(resp=>{
            resolve(resp)
          }, error => {
            reject(error)
          })
        })
    },

    postAddToQueue(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/add_to_queue/`
        Axios(context).post(url,{}).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    postBeginService(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/begin_service/`
        Axios(context).post(url,{}).then(resp=>{
          resolve(resp)
        }, error => {
          if (error.response.status === 400) {
              context.commit('setMainAlert', error.response.data.message)
          } else {
            reject(error)
          }
        })
      })
    },

    postCitizenLeft(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/citizen_left/`
        Axios(context).post(url).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    postFinishService(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/finish_service/`
        Axios(context).post(url).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    postHold(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/place_on_hold/`
        Axios(context).post(url).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    postInvite(context, payload) {
      let { qt_xn_csr_ind } = context.state.user
      let data = { qt_xn_csr_ind }
      if (payload==='next') {
        return new Promise((resolve, reject) => {
          let url = `/citizens/invite/`
          Axios(context).post(url, data).then(resp=>{
            resolve(resp)
          }, error => {
            reject(error)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          let url = `/citizens/${payload}/invite/`
          Axios(context).post(url, data).then(resp=>{
            resolve(resp)
          }, error => {
            if (error.response.status === 400) {
              context.commit('setMainAlert', error.response.data.message)
            } else {
              reject(error)
            }
          })
        })
      }
    },

    postServiceReq(context) {
      let { form_data } = context.getters
      let { citizen_id } = form_data.citizen
      let { priority } = form_data.priority
      let service_request = {
        service_id: form_data.service,
        citizen_id: citizen_id,
        quantity: 1,
        channel_id: form_data.channel,
        priority: priority
      }

      return new Promise((resolve, reject) => {
        let url = `/service_requests/`
        Axios(context).post(url, {service_request}).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    putCitizen(context) {
      let data = {}
      let citizen_id
      let quick
      let priority

      if (context.state.serviceModalForm.citizen_id) {
        let { accurate_time_ind, citizen_comments } = context.state.serviceModalForm
        quick = context.state.serviceModalForm.quick
        priority = context.state.serviceModalForm.priority
        citizen_id = context.state.serviceModalForm.citizen_id
        let prevCitizen = context.getters.invited_citizen

        if (context.state.showAddModal) {
          quick = context.getters.form_data.quick
          if (prevCitizen.qt_xn_citizen_ind !== quick) {
            data.qt_xn_citizen_ind = quick
          }
        }
        if (!context.state.showAddModal) {
          if ( citizen_comments !== prevCitizen.citizen_comments ) {
            data.citizen_comments = citizen_comments
          }
          if ( quick !== prevCitizen.qt_xn_citizen_ind ) {
            data.qt_xn_citizen_ind = quick
          }
          if ( priority !== prevCitizen.priority ) {
            data.priority = priority
          }
          if ( accurate_time_ind != null && accurate_time_ind !== prevCitizen.accurate_time_ind ) {
            data.accurate_time_ind = accurate_time_ind
          }
        }
      } else {
        let { form_data } = context.getters
        citizen_id = form_data.citizen.citizen_id
        data.qt_xn_citizen_ind = form_data.quick
        if (!form_data.quick) {
          data.qt_xn_citizen_ind = 0
        }
        data.priority = form_data.priority
        data.citizen_comments = form_data.comments
      }

      if (Object.keys(data).length === 0) {
        return new Promise((resolve, reject) => { resolve(' ') })
      }


      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/`

        Axios(context).put(url, data).then(resp => { resolve(resp) },
          error => { reject(error) })
      })
    },

    putInaccurateIndicator(context) {
      let { citizen_id } = context.getters.invited_citizen
      let { sr_id } = context.getters.active_service

      return new Promise((resolve, reject) => {
        let url = `/service_requests/${sr_id}/`

        Axios(context).put(url, {accurate_time_ind: 0}).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    putServiceRequest(context) {
      let { citizen_id, activeQuantity } = context.state.serviceModalForm
      let compareService = context.getters.active_service
      let { sr_id } = compareService
      let index = context.getters.active_index

      let data = {}
      if (activeQuantity != compareService.quantity) {
        data.quantity = activeQuantity
      }

      let setup = context.state.addModalSetup
      let { form_data } = context.getters
      if ( setup === 'add_mode' || setup === 'edit_mode') {
        if (form_data.channel != compareService.channel_id) {
          data.channel_id = form_data.channel
        }
        if (form_data.service != compareService.service_id) {
          data.service_id = form_data.service
        }
      }
      if (Object.keys(data).length === 0) {
        return new Promise((resolve, reject) => { resolve(' ') })
      }

      return new Promise((resolve, reject) => {
        let url = `/service_requests/${sr_id}/`
        Axios(context).put(url,data).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    resetAddCitizenModal(context) {
      context.commit('toggleAddModal', false)
      context.dispatch('toggleModalBack')
      context.commit('resetAddModalForm')
    },

    screenIncomingCitizen(context, citizen) {
      console.log(citizen)
      let { csr_id } = context.state.user
      if (citizen.service_reqs.length > 0) {
        if ( citizen.service_reqs[0].periods) {
          let filteredService = citizen.service_reqs.filter(sr => sr.periods.some(p => p.time_end === null))
          if (filteredService.length > 0) {
            let activeService = filteredService[0]
            if ( activeService.periods.length > 0 ) {
              let l = activeService.periods.length - 1
              let activePeriod = activeService.periods[l]
              if ( activePeriod.csr_id === csr_id ) {
                if (activePeriod.ps.ps_name === 'Invited') {
                  context.commit('setServiceModalForm', citizen)
                  context.commit('toggleServiceModal', true)
                  context.commit('toggleInvitedStatus', true)
                  context.commit('setServeNowAction', true)
                  context.dispatch('flashServeNow', 'start')
                  context.commit('resetAddModalForm')
                } else if (activePeriod.ps.ps_name === 'Being Served') {
                  context.commit('setServiceModalForm', citizen)
                  context.commit('toggleServiceModal', true)
                  context.commit('toggleBegunStatus', true)
                  context.commit('toggleInvitedStatus', false)
                  context.commit('setServeNowAction', false)
                  context.dispatch('flashServeNow', 'stop')
                  context.commit('resetAddModalForm')
                } else {
                  context.commit('resetServiceModal')
                  context.commit('toggleServiceModal', false)
                  context.commit('toggleInvitedStatus', false)
                  context.commit('toggleBegunStatus', false)
                  context.dispatch('flashServeNow', 'stop')
                  context.commit('resetAddModalForm')
                }
              }
            }
            //Citizen is completed or left
          } else {

            //Ensure that we only close serve citizen if it's the citizen _we're_ editing that was finished
            let mostRecentActivePeriod = citizen.service_reqs[0].periods[0]
            citizen.service_reqs.forEach((request) => {
              request.periods.forEach((period) => {
                if (period.time_end > mostRecentActivePeriod.time_end) {
                  mostRecentActivePeriod = period
                }
              })
            })

            if (mostRecentActivePeriod.csr_id === csr_id) {
              context.commit('resetServiceModal')
              context.commit('toggleServiceModal', false)
              context.commit('toggleInvitedStatus', false)
              context.commit('toggleBegunStatus', false)
              context.dispatch('flashServeNow', 'stop')
            }
          }
        }
      }
    },

    setAddModalData(context) {
      let data = {
        citizen: context.getters.invited_citizen,
        active_service: context.getters.active_service
      }
      context.commit('setAddModalData', data)
    },

    toggleModalBack(context) {
      if (context.state.user.office.sb.sb_type === "nocallonsmartboard") {
        context.commit('switchAddModalMode', 'non_reception')
      } else {
        context.commit('switchAddModalMode', 'reception')
      }
    },

    //Updates the counter's type from the state after selecting from the dropdown (regular counter, quick transaction, or receptionist)
      updateCSRState(context) {
      let csr_id = context.state.user.csr_id
      Axios(context).put(`/csrs/${csr_id}/`, {
        qt_xn_csr_ind: context.state.user.qt_xn_csr_ind,
        receptionist_ind: context.state.user.receptionist_ind
      })
      .then( resp => {
      })
    }
  },

  mutations: {
    logIn: state => state.isLoggedIn = true,
    logOut: state => state.isLoggedIn = false,
    setBearer: (state, payload) => state.bearer = payload,
    setUser: (state, payload) => state.user = payload,
    updateQueue(state, payload) {
      state.citizens = []
      state.citizens = payload
    },
    setServices(state, payload) {
      state.services = {}
      state.services = payload
    },
    setChannels(state, payload) {
      state.channels = []
      state.channels = payload
    },
    setCategories(state, payload) {
      state.categories = []
      state.categories = payload
    },

    toggleAddModal: (state, payload) => state.showAddModal = payload,

    updateAddModalForm(state, payload) {
      Vue.set(
        state.addModalForm,
        payload.type,
        payload.value
      )
    },

    setAddModalSelectedItem(state, payload) {
      state.addModalForm.suspendFilter = true
      state.addModalForm.selectedItem = payload
    },

    resetAddModalForm(state) {
      let keys = Object.keys(state.addModalForm)

      keys.forEach(key => {
        if ( key !== 'quick' && key !== 'suspendFilter' ) Vue.set(
          state.addModalForm,
          key,
          ''
        )
        if ( key === 'quick' ) Vue.set(
          state.addModalForm,
          key,
          0
        )
        if ( key === 'priority' ) Vue.set(
          state.addModalForm,
          key,
          2
        )
        if ( key === 'suspendFilter' ) Vue.set(
          state.addModalForm,
          key,
          false
        )
      })
    },

    switchAddModalMode(state, payload) {
      state.addModalSetup = payload
    },

    setAddModalData(state, data) {
      let { citizen, active_service } = data

      let formData = {
        comments: citizen.citizen_comments,
        quick: citizen.qt_xn_citizen_ind,
        priority: citizen.priority,
        citizen: citizen,
        channel: active_service.channel_id,
        service: active_service.service_id
      }
      let keys = Object.keys(formData)
      keys.forEach(key => {
        Vue.set(
          state.addModalForm,
          key,
          formData[ key ]
        )
      })
    },

    setServiceModalForm(state, citizen) {
      let citizen_comments = citizen.citizen_comments
      let activeService = citizen.service_reqs.filter(sr => sr.periods.some(p => p.time_end === null))
      let activeQuantity = activeService[0].quantity
      let { citizen_id } = citizen
      let service_citizen = citizen
      let quick = citizen.qt_xn_citizen_ind
      let priority = citizen.priority

      let obj = { citizen_comments, activeQuantity, citizen_id, service_citizen, quick, priority }
      let keys = Object.keys(obj)

      keys.forEach(key => {
        Vue.set(
          state.serviceModalForm,
          key,
          obj[ key ]
        )
      })
    },

    resetServiceModal(state) {
      let { serviceModalForm } = state
      let keys = Object.keys(serviceModalForm)

      keys.forEach(key => {
        if ( key === 'activeQuantity' ) {
          Vue.set(
            state.serviceModalForm,
            key,
            1
          )
        } else {
          Vue.set(
            state.serviceModalForm,
            key,
            null
          )
        }
      })
    },

    editServiceModalForm(state, payload) {
      Vue.set(
        state.serviceModalForm,
        payload.type,
        payload.value
      )
    },

    setDefaultChannel(state) {
      let channel = state.channels.filter(ch => ch.channel_name === 'In Person')
      state.addModalForm.channel = channel[ 0 ].channel_id
    },

    setMainAlert(state, payload) {
      state.alertMessage = payload
      state.dismissCountDown = 5
    },

    setModalAlert(state, payload) {
      state.alertMessage = payload
    },

    dismissCountDown(state, payload) {
      state.dismissCountDown = payload
    },

    toggleInvitedStatus: (state, payload) => state.citizenInvited = payload,

    toggleBegunStatus: (state, payload) => state.serviceBegun = payload,

    showSchedule: (state) => state.displaySchedule = 'block',

    hideSchedule: (state) => state.displaySchedule = 'none',

    setQuickTransactionState(state, payload) {
      Vue.set(
        state.user,
        qt_xn_csr_ind,
        payload
      )
    },

    setReceptionistState: (state, payload) => state.user.receptionist_ind = payload,

    setOffice: (state, officeType) => state.officeType = officeType,

    flashServeNow: (state, payload) => state.serveNowStyle = payload,

    setServeNowAction: (state, payload) => state.serveNowAltAction = payload,

    logCheckComplete: (state, payload) => state.checkComplete = payload,

    setFeedbackMessage: (state, payload) => state.feedbackMessage = payload,

    showHideResponseModal(state) {
      state.showResponseModal = true
      setTimeout( ()=> {state.showResponseModal = false}, 3000)
    },

    toggleSchedulerModal: (state, payload) => state.schedulerModalVisible = payload,

    hideResponseModal(state) {
      state.showResponseModal = false
    },

    updateEditedExam(state, payload) {
      if (payload.isArray) {
        payload.forEach(obj => {
          Vue.set(
            state.editedExam,
            Object.keys(obj)[0],
            obj[0]
          )
        })
      } else {
        Vue.set(
          state.editedExam,
          Object.keys(payload)[0],
          payload[0]
        )
      }
    },

    setEditedExam: (state, payload) => state.editedExam = payload,

    toggleFeedbackModal: (state, payload) => state.showFeedbackModal = payload,

    toggleNavigation: (state, payload) => state.navigationVisible = payload,

    toggleEditExamModal: (state, payload) => state.editExamModalVisible = payload,

    toggleServiceModal: (state, payload) => state.showServiceModal = payload,

    toggleBookRoomModal: (state, payload) => state.bookRoomModalVisible = payload,

    toggleBookingConfirm: (state, payload) => state.showBookingConfirmModal = payload,

    toggleITAExamModal: (state, payload) => state.addITAExamModalVisible = payload,

    toggleNonExamModal: (state, payload) => state.addNonExamModalVisible = payload,

    toggleInventoryModal: (state, payload) => state.inventoryModalVisible = payload,

    toggleInvigilatorModal: (state, payload) => state.invigilatorsModalVisible = payload,

    updateTicketModal(state, payload) {
      let key = Object.keys(payload)[0]
      Vue.set(
        state.ticketModal,
        key,
        payload[key]
      )
    },

    toggleTicketModal: (state, payload) => Vue.set(state.ticketModal, 'visible', payload),

    toggleStartWorkButton: (state, payload) => state.startWorkButtonVisible = payload,

    setCalendarView: (state, payload) => state.calendarView = payload,

    toggleCalendarScheduleMode: (state, payload) => state.calendarScheduleMode = payload,

  }
})
