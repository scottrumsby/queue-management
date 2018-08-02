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
import { Axios, formData, invitedCitizen } from './helpers'


Vue.use(Vuex)

export const store = new Vuex.Store({

  state: {
    isLoggedIn: false,
    bearer: '',
    user: {
      username: null,
      office: {
        office_name: null
      },
      receptionist_ind: null
    },
    invitedCitizen: {
      citizen_comments: null,
      ticket_number: null,
      citizen_id: null,
      qt_xn_citizen_ind: null,
      start_time: null,
      service_reqs: [
        {
          start_time: null,
          service: {
            parrent: {}
          },
          service_id: null,
          quantity: 1,
          sr_id: null,
          channel: {
            channel_name: null,
            channel_id: null
          }
        }
      ]
    },
    addModalSetup: 'reception', 
    addCitizenModal: {
      visible: false,
      formData: {
        citizen:'',
        comments: '',
        channel: '',
        search: '',
        category: '',
        service:'',
        quick: false,
        setup: ''
      },
    },
    showAddModal: false,
    showServiceModal: false,
    citizens: [],
    hold: [],
    services: [],
    categories: [],
    channels: [],
    serveNowDisabled: true,
    alertMessage: '',
    dismissCountDown: 0,
    citizenInvited: false,
    serviceBegun: false,
    req: 0,
    currentQuantity: 1
    
  },

  getters: {
    current_service_channel(state) {
      let { req } = state 
      
      if (
        !state.invitedCitizen ||
        !state.invitedCitizen.service_reqs ||
        !state.invitedCitizen.service_reqs.length === 0
      ) {
        return []
      }
      return state.invitedCitizen.service_reqs[req].channel
    },
    
    service_reqs(state) {
      if (
        !state.invitedCitizen ||
        !state.invitedCitizen.citizen_id ||
        !state.invitedCitizen.service_reqs
      ) {
        return []
      }
      return state.invitedCitizen.service_reqs
    },
    
    on_hold(state) {
      let { citizens } = state
      
      if (citizens.length === 0) {
        return []
      }
      let filter0 = citizens.filter(c=>c.service_reqs.length >= 1)
      return filter0.filter(c=>c.service_reqs[0].periods.some(p=>p.time_end == null && p.ps.ps_name === 'On hold'))
    },
    
    filtered_citizens(state) {
      let { citizens } = state
      
      if (citizens.length === 0) {
        return []
      }
      let filter0 = citizens.filter(c=>c.service_reqs.length >= 1)
      return filter0.filter(c=>c.service_reqs[0].periods.some(p=>p.time_end == null && p.ps.ps_name === 'Waiting'))
    },
    
    form_data: state => {
      return state.addCitizenModal.formData
    },
    
    channel_options: state => {
      return(
        state.channels.map(ch=>
          ({value: ch.channel_id, text: ch.channel_name})
        )
      )
    },
    
    categories_options: (state, getters) => {
      let opts = state.categories 
      let qry = getters.form_data.search.toUpperCase()
      let filteredOpts
      
      if (getters.form_data.search.length > 1) {
        filteredOpts = opts.filter(opt => 
          opt.service_name.toUpperCase().search(qry) != -1)
      } else {
        filteredOpts = opts
      }
      console.log(filteredOpts)
      let mappedOpts = filteredOpts.map(opt =>
          ({value: opt.service_id, text: opt.service_name})
        )
      let blankOpt = [{value:'', text:''}]
      let finalOpts = blankOpt.concat(mappedOpts)
      return finalOpts
    },
    
    quick_trans_status(state) {
      if (state.user.qt_xn_csr_ind == 1) {
        return true 
      } else if (state.user.qt_xn_csr_ind == 0) {
        return false
      }
    }
  },
  
  actions: {
    
    logIn(context, payload) {
      context.commit('setBearer', payload)
      context.commit('logIn')
      context.dispatch('getUser')
      context.dispatch('getAllCitizens')
    },
    
    getAllCitizens(context) {
      let url = "/citizens/"
      Axios(context).get(url)
        .then( response => {
          context.commit('updateQueue', response.data.citizens)
        })
        .catch(error => {
          console.log('error @ store.actions.getAllCitizens')
          console.log(error.response)
          console.log(error.message)
        })
    },
  
    getCategories(context) {
      Axios(context).get('/categories/')
        .then( resp => {
          context.commit('setCategories', resp.data.categories)
          console.log('categories set')          
        })
        .catch(error => {
          console.log('error @ store.actions.getCategories')
          console.log(error.response)
          console.log(error.message)
        })
    },
    
    getChannels(context) {
      Axios(context).get('/channels/')
        .then( resp => {
          context.commit('setChannels', resp.data.channels)
          console.log('channels set')          
        })
        .catch(error => {
          console.log('error @ store.actions.getChannels')
          console.log(error.response)
          console.log(error.message)
        })
    },
    
    getServices(context) {
      Axios(context).get('/services/')
        .then( resp => {
          context.commit('setServices', resp.data.services)
        })
        .catch(error => {
          console.log('error @ store.actions.getServices')
          console.log(error.response)
          console.log(error.message)
        })
    },
    
    getUser(context) {
      Axios(context).get('/csrs/me/')
        .then( resp => {
          context.commit('setUser', resp.data.csr)
        })
    },
    
    clickAddToQueue(context) {
      let { citizen_id } = context.getters.form_data.citizen
      
      context.dispatch('putCitizen').then( resp => {
        context.dispatch('postServiceReq').then( resp => {
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
      
      context.dispatch('putCitizen').then( resp => {
        context.dispatch('postServiceReq').then( resp => {
          context.dispatch('postBeginService', citizen_id).then( resp => {
            context.commit('setInvitedCitizen', resp.data.citizen)
            context.commit('toggleAddModal', false)
            context.commit('toggleServiceModal', true)
            context.commit('toggleBegunStatus', true)
            context.commit('toggleInvitedStatus', false)
            context.commit('resetAddModalForm')
          })
        })
      })
    },
    
    clickCitizenLeft(context) {
      let {citizen_id} = context.state.invitedCitizen
      context.dispatch('postCitizenLeft', citizen_id)
      context.commit('toggleServiceModal', false)
      context.commit('toggleBegunStatus', false)
      context.commit('toggleInvitedStatus', false)
    },

    clickDashTableRow(context, citizen_id) {
      context.dispatch('postInvite', citizen_id).then( resp => {
        context.commit('setInvitedCitizen', resp.data.citizen)
        context.commit('toggleServiceModal', true)
        context.commit('toggleBegunStatus', false)
        context.commit('toggleInvitedStatus', true)
      })
    },
    
    clickEdit(context) {
      if (context.state.channels.length === 0) {
        context.dispatch('getCategories')
        context.dispatch('getChannels')
        context.dispatch('getServices')
      }
      context.commit('setAddModalData')
      context.commit('switchAddModalMode', 'edit_mode')
      context.commit('toggleAddModal', true)
      context.commit('toggleServiceModal', false)
    },
    
    clickEditApply(context) {
      context.dispatch('putCitizen').then( () => {
        context.dispatch('putServiceReq').then( resp => {
          context.commit('editInvitedCitizen', {type: 'service_reqs', value: [resp.data.service_request]})
          context.commit('toggleAddModal', false)
          context.dispatch('toggleModalBack')
          context.commit('resetAddModalForm')
          context.commit('toggleServiceModal', true)
        })
      })
    },
    
    clickEditCancel(context) {
      context.commit('toggleAddModal', false)
      context.dispatch('toggleModalBack')
      context.commit('resetAddModalForm')
      context.commit('toggleServiceModal', true)
    },
    
    toggleModalBack(context) {
      if (context.state.user.receptionist_ind === 0) {
        context.commit('switchAddModalMode', 'non-reception')
      }
      if (context.state.user.receptionist_ind === 1) {
        context.commit('switchAddModalMode', 'reception')
      }
    },
    
    clickAddService(context) {
      if (context.state.channels.length === 0) {
        context.dispatch('getCategories')
        context.dispatch('getChannels')
        context.dispatch('getServices')
      }
      context.commit('updateAddModalForm', {type:'citizen', value:context.state.invitedCitizen})
      context.commit('updateAddModalForm', {type:'channel', value:context.getters.current_service_channel.channel_id})
      context.commit('switchAddModalMode', 'add_mode')
      context.commit('toggleAddModal', true)
      context.commit('toggleServiceModal', false)
    },
    
    clickAddServiceApply(context) {
      context.dispatch('postServiceReq').then( resp => {
        console.log(resp.data.service_request)
        context.commit('editInvitedCitizenServices', resp.data.service_request)
        context.commit('toggleAddModal', false)
        context.commit('toggleServiceModal', true)
        context.dispatch('toggleModalBack')
        context.commit('resetAddModalForm')
      })
    },
    
    clickServiceFinish(context) {
      let { citizen_id } = context.state.invitedCitizen
      
      context.dispatch('postFinishService', citizen_id).then( () => {
        context.commit('toggleServiceModal', false)
        context.commit('toggleBegunStatus', false)
        context.commit('toggleInvitedStatus', false)
      })
    },
    
    clickHold(context) {
      let { citizen_id } = context.state.invitedCitizen
      context.dispatch('putCitizenFromService').then( resp => {
        context.dispatch('postHold', citizen_id).then( resp=> {
          context.commit('toggleServiceModal', false)
          context.commit('toggleBegunStatus', false)
          context.commit('toggleInvitedStatus', false)
        })
      })
    },
    
    clickRowHoldQueue(context, citizen_id) {
      context.dispatch('postBeginService', citizen_id).then( resp => {
        context.commit('setInvitedCitizen', resp.data.citizen)
        context.commit('toggleServiceModal', true)
        context.commit('toggleBegunStatus', true)
      })
    },
    
    clickInvite(context) {
      context.dispatch('postInvite', 'next').then( resp => {
        context.commit('setInvitedCitizen', resp.data.citizen)
        context.commit('toggleServiceModal', true)
        context.commit('toggleInvitedStatus', true)
      })
      .catch(error=> {
        context.commit('setMainAlert', 'There are currently not citizens to invite.')
      })  
    },
    
    clickReturnToQueue(context) {
     let {citizen_id} = context.state.invitedCitizen
     context.dispatch('putCitizenFromService').then( resp=>{
       context.dispatch('postAddToQueue', citizen_id).then( () => {
         context.commit('toggleInvitedStatus', false)
         context.commit('toggleServiceModal', false)
         context.commit('resetInvitedCitizen')
       })
     })
    },
    
    clickServeNow(context) {
      context.commit('toggleServiceModal', true)
    },
    
    clickServiceBeginService(context) {
      let {citizen_id} = context.state.invitedCitizen
      
      context.dispatch('putCitizenFromService').then( () => {
        context.dispatch('postBeginService', citizen_id)
        context.commit('toggleBegunStatus', true)
      })
    },

    clickServiceModalClose(context) {
      context.commit('toggleServiceModal', false)
      context.commit('toggleInvitedStatus', true)
    },
    
    putCitizenFromService(context) {
      let { citizen_comments } = context.state.invitedCitizen
      let { citizen_id } = context.state.invitedCitizen

      let citizen = {
        citizen_comments,
        citizen_id
      }
      context.dispatch('putServiceQuantity').then( () => {
        return new Promise((resolve, reject) => {
          let url = `/citizens/${citizen_id}/`
          Axios(context).put(url,citizen).then(resp=>{
            resolve(resp)
          }, error => {
            reject(error)
          })
        })
      })
    },

    putCitizen(context) {
      let { formData } = context.state.addCitizenModal
      let { citizen_id } = formData.citizen

      let qt_xn_citizen_ind
      formData.quick ? qt_xn_citizen_ind=1 : qt_xn_citizen_ind = 0

      let citizen = {
        citizen_comments: formData.comments,
        qt_xn_citizen_ind
      }

      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/`
        Axios(context).put(url,citizen).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    putServiceQuantity(context) {
      let { req } = context.state
      let citizen = context.state.invitedCitizen
      let { citizen_id } = citizen
      let { sr_id } = citizen.service_reqs[req]

      let service_request = {
        quantity: citizen.service_reqs[req].quantity
      }

      return new Promise((resolve, reject) => {
        let url = `/service_requests/${sr_id}/`
        Axios(context).put(url,service_request).then(resp=>{
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

    postServiceReq(context) {
      let { formData } = context.state.addCitizenModal
      let { citizen_id } = formData.citizen
      let service_request = {
        service_id: formData.service,
        citizen_id: citizen_id,
        quantity: 1,
        channel_id: formData.channel
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

    putServiceReq(context) {
      let { req } = context.state
      let { formData } = context.state.addCitizenModal
      let { citizen_id } = formData.citizen
      let { sr_id } = formData.citizen.service_reqs[req]

      let service_request = {
        service_id: formData.service,
        channel_id: formData.channel
      }

      return new Promise((resolve, reject) => {
        let url = `/service_requests/${sr_id}/`
        Axios(context).put(url,service_request).then(resp=>{
          resolve(resp)
        }, error => {
          reject(error)
        })
      })
    },

    postInvite(context, payload) {
      if (payload==='next') {
        return new Promise((resolve, reject) => {
          let url = `/citizens/invite/`
          Axios(context).post(url).then(resp=>{
            resolve(resp)
          }, error => {
            reject(error)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          let url = `/citizens/${payload}/invite/`
          Axios(context).post(url).then(resp=>{
            resolve(resp)
          }, error => {
            reject(error)
          })
        })
      }
    },

    postBeginService(context, citizen_id) {
      return new Promise((resolve, reject) => {
        let url = `/citizens/${citizen_id}/begin_service/`
        Axios(context).post(url,{}).then(resp=>{
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

    addCitizen(context) {
      context.dispatch('toggleModalBack')
      Axios(context).post('/citizens/', {})
        .then(resp => {
          let value = resp.data.citizen
          context.commit('updateAddModalForm', {type:'citizen',value})
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

    dashTableRow(context, payload) {
      let { citizen_id } = payload.citizen
      Axios(context).get(`/citizens/${citizen_id}/`)
    },

    resetAddCitizenModal(context) {
      context.commit('toggleAddModal', false)
      context.dispatch('toggleModalBack')
      context.commit('resetAddModalForm')
    },

    cancelAddCitizensModal(context) {
      let { citizen_id } = context.getters.form_data.citizen

      context.dispatch('postCitizenLeft', citizen_id)
        .then( () => {
          context.commit('toggleAddModal', false)
          context.commit('resetAddModalForm')
        })
    },

    messageSlack(context, payload) {
      let slackObject = {
        slack_message: payload.slack_message
      }
      let url = "/slack/"
      Axios.post(url, slackObject)
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
        state.addCitizenModal.formData,
        payload.type,
        payload.value
      )
    },

    resetAddModalForm(state) {
      let { formData } = state.addCitizenModal

      let keys = Object.keys(formData)
      keys.forEach( key => {
        Vue.set(
          state.addCitizenModal.formData,
          key,
          ''
        )
      })
    },

    switchAddModalMode(state, payload) {
      state.addModalSetup = payload
    },

    setAddModalData(state) {
      let citizen = state.invitedCitizen
      let quick
      citizen.qt_xn_citizen_ind==0 ? quick=false : quick=true

      let formData = {
        comments: citizen.citizen_comments,
        quick,
        citizen,
        channel: citizen.service_reqs[0].channel_id,
        service: citizen.service_reqs[0].service_id
      }
      let keys = Object.keys(formData)
      keys.forEach(key=>{
        Vue.set(
          state.addCitizenModal.formData,
          key,
          formData[key]
        )
      })
    },

    toggleServiceModal: (state,payload)=>state.showServiceModal=payload,

    editInvitedCitizen(state,payload) {
      Vue.set(
        state.invitedCitizen,
        payload.type,
        payload.value
      )
    },

    setInvitedCitizen(state, payload) {
      Vue.set(
        state,
        'invitedCitizen',
        payload
      )
    },

    resetInvitedCitizen(state) {
      let { invitedCitizen } = state
      Vue.set(
        state,
        'invitedCitizen',
        invitedCitizen
      )
    },

    editInvitedQuantity(state,payload) {
      let { req } = state
      Vue.set(
        state.invitedCitizen.service_reqs[req],
        payload.type,
        payload.value
      )
    },

    editInvitedCitizenServices(state, payload) {
      let n = state.invitedCitizen.service_reqs.length
      Vue.set(
        state.invitedCitizen.service_reqs,
        n,
        payload
      )
    },

    setMainAlert(state, payload) {
      state.alertMessage = payload
      state.dismissCountDown = 5
    },
    
    setModalAlert(state, payload) {
      state.alertMessage = payload
    },
    
    dismissCountDown(state,payload) {
      state.dismissCountDown = payload
    },

    switchReqs: (state, payload) => state.req = payload,

    setCurrentQuantity: (state, payload) => state.currentQuantity = payload,
    
    toggleInvitedStatus: (state, payload) => state.citizenInvited = payload,
    
    toggleBegunStatus: (state, payload) => state.serviceBegun = payload

  }
})

