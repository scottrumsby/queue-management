import Vue from 'vue'
import { Axios } from './helpers'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    appointments: [],
    calendarSetup: {
      title: null,
      name: null
    },
    showApptBookingModal: false,
    showCheckInModal: false,
  },
  getters: {
    appointment_events(state) {
      if (state.appointments.length > 0) {
        return state.appointments.map(apt =>
          ({
            start: apt.start_time,
            end: apt.end_time,
            appointment_id: apt.appointment_id,
            title: 'Jane Carmichael',
            color: '#B5E0B8',
          })
        )
      }
      return []
    },
    added_service(state, getters, rootState) {
      if ((rootState.addModalForm || {} ).selectedItem) {
        return rootState.addModalForm.selectedItem
      }
      return ''
    },
    calendar_setup(state) {
      if ((state.calendarSetup || {}).name) {
        let { title, name } = state.calendarSetup
        return {
          name,
          title
        }
      }
      return {
        name: 'agendaWeek',
        title: 'Appointments'
      }
    },
  },
  actions: {
    toggleAddModal({commit}, payload) {
      commit('toggleAddModal', payload, {root: true})
      if (payload) {
        commit('switchAddModalMode', 'add_mode', {root: true})
      }
    },
    getServices({dispatch}) {
      dispatch('getUser', null, {root: true}).then( () => {
        dispatch('getServices', null, {root: true})
        dispatch('getCategories', null, {root: true})
        dispatch('getChannels', null, {root: true})
      })
    },
    clearAddModal({commit}) {
      commit('updateAddModalForm', { type: 'search', value: null}, {root: true})
    },
    getAppointments({commit, rootState}) {
      let state = rootState
      let output = []
      return new Promise((resolve, reject) => {
        Axios({state}).get('/appointments/').then( resp => {
          let appts = resp.data.appointments
          if (appts.length > 0) {
            output = appts.filter(ap => !ap.checked_in_time)
          }
          commit('setAppointments', output)
          resolve()
        })
      })
    },
    postAppointment({rootState}, payload) {
      let state = rootState
      payload.office_id = rootState.user.office_id
      return new Promise((resolve, reject) => {
        Axios({state}).post('/appointments/', payload).then( resp => {
          resolve(resp)
        })
      })
    },
    beginAppointment({context}) {
    
    },
    postCheckIn({rootState}, payload) {
      let state = rootState
      let data = {
        checked_in_time: moment.utc().format()
      }
      return new Promise((resolve, reject) => {
        Axios({state}).put(`/appointments/${payload}/`, data).then( resp => {
          resolve(resp)
        })
      })
  
    }
  },
  mutations: {
    setAppointments: (state, payload) => state.appointments = payload,
    setCalendarSetup: (state, payload) => {
      let { title, name } = payload
      state.calendarSetup = { title, name }
    },
    toggleApptBookingModal: (state, payload) => state.showApptBookingModal = payload,
    toggleCheckInModal: (state, payload) => state.showCheckInModal = payload,
  },
}