import Vue from 'vue'
import { Axios } from './helpers'

export const addExamModule = {
  state: {
    showAllPesticideExams: false,
    allPesticideExams: null,
    uploadPesticideModalVisible: false,
    pesticideExamTypes: [
      {examName: `Industrial Vegetation`, examTypeId:1, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Landscape`, examTypeId:2, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Structural - General`, examTypeId:3, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Dispenser - Commercial`, examTypeId:4, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Dispenser - Domestic`, examTypeId:5, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Agriculture - Greenhouse`, examTypeId:6, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Agriculture - Field Crop & Orchard`, examTypeId:7, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Forestry - General`, examTypeId:8, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Forestry - Seed Orchard`, examTypeId:9, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Forestry - Seedling Nursery`, examTypeId:10, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Forestry - Non-broadcast`, examTypeId:11, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Act and Regulation - Forestry/Mosquito`, examTypeId:12, numberOfHours: 1, numberOfMinutes: 0},
      {examName: `Act and Regulation - Landscape/Structural`, examTypeId:13, numberOfHours: 1, numberOfMinutes: 0},
      {examName: `Act and Regulation - Industrial VegJNox ous Weed`, examTypeId:14, numberOfHours: 1},
      {examName: `Mosquito and Biting Fly`, examTypeId:15, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Mosquito - Aerial - Granular`, examTypeId:16, numberOfHours: 1, numberOfMinutes: 30},
      {examName: `Mosquito - Ground Application`, examTypeId:17, numberOfHours: 1, numberOfMinutes: 30},
      {examName: `Structural - Wood Preservation`, examTypeId:18, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Fumigation - C02`, examTypeId:19, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Dispenser - C02 - Fumigant`, examTypeId:20, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Aquaculture - Marine, Hydrogen Peroxide`, examTypeId:21, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Fumigation - Ship & Structure`, examTypeId:22, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Fumigation - Container`, examTypeId:23, numberOfHours: 3, numberOfMinutes: 0},
      {examName: `Aircraft - Disinsection`, examTypeId:24, numberOfHours: 2, numberOfMinutes: 0},
    ],
    addChallengerSteps: [
      {
        step: 1,
        title:'Exam Details',
        questions: [
          {
            key: 'exam_name',
            text: 'Exam Name',
            kind: 'input',
            minLength: 2,
            digit: false,
          },
          {
            key: 'on_or_off',
            text: 'Exam Location',
            minLength: 1,
            digit: false,
            kind: 'offsiteSelect',
            options: [
              { text: 'Offsite: Exam will be held at an external location', value: 'off', },
              { text: 'Onsite: Exam will be held at SBC Office', value: 'on', }
            ]
          },
          {
            key: 'event_id',
            text:'Event ID (not required)' ,
            kind: 'input',
            minLength: 0,
            digit: false,
          },
          {
            key: 'number_of_students',
            text: 'Number of Students (not required)',
            minLength: 0,
            kind: 'input',
            digit: false
          },
        ]
      },
      {
        step: 2,
        title: 'Exam Dates',
        questions: [
          {
            kind: 'date',
            key: 'expiry_date',
            text: 'Date and Time',
            minLength: 1,
            digit: false,
          },
          {
            kind: 'time',
            key: 'exam_time',
            text: 'Exam Time',
            minLength: 1,
            digit: false,
          },
          {
            kind: 'locationInput',
            key: 'offsite_location',
            text: 'Location',
            type: 'input',
            minLength: 2,
            digit: false,
          },
          {
            kind: 'notes',
            key: 'notes',
            text: 'Additional Notes (optional)',
            minLength: 0,
            digit: false,
          },
        ]
      },
      {
        step: 3,
        title:'Summary',
        questions:
          [
            {
              kind: null,
              key: null,
              text1:null,
              text2: null,
              minLength: 0,
              digit: false,
            },
          ]
      },
    ],
    addGroupSteps: [
      {
        step: 1,
        title:'Exam Type',
        questions: [
          {
            key: 'exam_type_id',
            text: 'Exam Type ID / Colour',
            kind:'dropdown',
            minLength: 1,
            digit: false,
          }
        ]
      },
      {
        step: 2,
        title: 'Basic Info',
        questions: [
          {
            key: 'office_id',
            text: 'Office',
            kind: 'office',
            minLength: 1,
            digit: true,
          },
          {
            key: 'event_id',
            text: 'Event ID',
            kind: 'input',
            minLength: 4,
            digit: true
          },
          {
            key: 'exam_name',
            text: 'Exam Name',
            kind: 'input',
            minLength: 2,
            digit: false,
          },
          {
            key: 'number_of_students',
            text: 'Number of Students',
            minLength: 1,
            kind: 'input',
            digit: true
          },
        ]
      },
      {
        step: 3,
        title: 'Date, Time & Format',
        questions: [
          {
            kind: 'date',
            key: 'expiry_date',
            text: 'Date and Time',
            minLength: 1,
            digit: false,
          },
          {
            kind: 'time',
            key: 'exam_time',
            text: 'Exam Time',
            minLength: 1,
            digit: false,
          },
          {
            key: 'exam_method',
            text: 'Exam Method',
            minLength: 1,
            digit: false,
            kind: 'select',
            options: [
              { text: 'paper', value: 'paper', id: 'exam_method' },
              { text: 'online', value: 'online', id: 'exam_method' }
            ]
          },
          {
            kind: 'input',
            key: 'offsite_location',
            text: 'Location',
            type: 'input',
            minLength: 2,
            digit: false,
          },
          {
            kind: 'notes',
            key: 'notes',
            text: 'Additional Notes (optional)',
            minLength: 0,
            digit: false,
          },
        ]
      },
      {
        step: 4,
        title:'Summary',
        questions:
          [
            {
              kind: null,
              key: null,
              text1:null,
              text2: null,
              minLength: 0,
              digit: false,
            },
          ]
      },
    ],
    addIndividualSteps: [
      {
        step: 1,
        title:'Exam Type',
        questions: [
          {
            key: 'exam_type_id',
            text: 'Exam Type ID / Colour',
            kind:'dropdown',
            minLength: 1,
            digit: false,
          }
        ]
      },
      {
        step: 2,
        title:'Exam Info',
        questions: [
          {
            key: 'event_id',
            text:'Event ID' ,
            kind: 'input',
            minLength: 4,
            digit: true,
          },
          {
            key: 'exam_name',
            text: 'Exam Name',
            kind: 'input',
            minLength: 2,
            digit: false
          },
          {
            key: 'examinee_name',
            text: `Candidate's Name`,
            minLength: 2,
            kind:'input',
            digit: false
          },
          {
            key: 'exam_method',
            text: 'Exam Method',
            minLength: 1,
            digit: false,
            kind:'select',
            options: [
              {text: 'paper', value: 'paper', id: 'exam_method'},
              {text: 'online', value: 'online', id: 'exam_method'}
            ]
          },
        ]
      },
      {
        step: 3,
        title: 'Exam Dates',
        questions: [
          {
            kind: 'exam_received',
            key: 'exam_received_date',
            text1:'Was the Exam Package Receieved Today?',
            text2: 'Date of Receipt of Exam Package',
            minLength: 1,
            digit: false,
          },
          {
            kind: 'date',
            key: 'expiry_date',
            text: 'Exam Expiry Date',
            minLength: 1,
            digit: false,
          },
          {
            kind: 'notes',
            key: 'notes',
            text: 'Additional Notes (optional)',
            minLength: 0,
            digit: false,
          },
        ]
      },
      {
        step: 4,
        title:'Summary',
        questions:
          [
            {
              kind: null,
              key: null,
              text1:null,
              text2: null,
              minLength: 0,
              digit: false,
            },
          ]
      },
    ],
    addOtherSteps: [
      {
        step: 1,
        title:'Exam Type',
        questions: [
          {
            key: 'exam_type_id',
            text: 'Exam Type ID / Colour',
            kind:'dropdown',
            minLength: 1,
            digit: false,
          }
        ]
      },
      {
        step: 2,
        title:'Exam Info',
        questions: [
          {
            key: 'event_id',
            text:'Event ID (not required)' ,
            kind: 'input',
            minLength: 0,
            digit: false,
          },
          {
            key: 'exam_name',
            text: 'Exam Name',
            kind: 'input',
            minLength: 2,
            digit: false
          },
          {
            key: 'examinee_name',
            text: `Candidate's Name`,
            minLength: 2,
            kind:'input',
            digit: false
          },
          {
            key: 'exam_method',
            text: 'Exam Method',
            minLength: 1,
            digit: false,
            kind:'select',
            options: [
              {text: 'paper', value: 'paper', id: 'exam_method'},
              {text: 'online', value: 'online', id: 'exam_method'}
            ]
          },
        ]
      },
      {
        step: 3,
        title: 'Exam Dates',
        questions: [
          {
            kind: 'exam_received',
            key: 'exam_received_date',
            text1:'Have you received the exam package yet?',
            text2: 'Date of Receipt of Exam Package',
            minLength: 0,
            digit: false,
          },
          {
            kind: 'date',
            key: 'expiry_date',
            text: 'Exam Expiry Date',
            minLength: 1,
            digit: false,
          },
          {
            key: 'on_or_off',
            text: 'Exam Location',
            minLength: 1,
            digit: false,
            kind: 'offsiteSelect',
            options: [
              { text: 'Offsite: Exam will be held at an external location', value: 'off', },
              { text: 'Onsite: Exam will be held at SBC Office', value: 'on', }
            ]
          },
          {
            kind: 'notes',
            key: 'notes',
            text: 'Additional Notes (optional)',
            minLength: 0,
            digit: false,
          },
        ]
      },
      {
        step: 4,
        title:'Summary',
        questions:
          [
            {
              kind: null,
              key: null,
              text1:null,
              text2: null,
              minLength: 0,
              digit: false,
            },
          ]
      },
    ],
    pesticideStep1: {
      step: 1,
      title:'Exam Type',
      questions: [
        {
          key: 'ind_or_group',
          text: 'Individual or Group Exam?',
          minLength: 1,
          digit: false,
          kind: 'select',
          options: [
            { text: 'Individual', value: 'individual', id: 'exam_method' },
            { text: 'Group', value: 'group', id: 'exam_method' }
          ]
        },
        {
          key: 'sbc_managed',
          text: 'SBC or Invigilator Managed?',
          minLength: 1,
          digit: false,
          kind: 'offsiteSelect',
          options: [
            { text: 'Non-SBC (Invigilator) Managed Exam', value: false, },
            { text: 'SBC Managed Exam', value: true, }
          ]
        },
      ]
    },
    pesticideIndividualStep2: {
      step: 2,
      title: 'Exam Type',
      questions: [
        {
          key: 'group_exam_types',
          text: 'Number of Students (not required)',
          minLength: 0,
          kind: 'group_exam_types',
          digit: false
        },
        {
          key: 'group_names',
          text: 'Number of Students (not required)',
          minLength: 0,
          kind: 'group_names',
          digit: false
        }
      ]
    },
    pesticideGroupStep2: {
      step: 2,
      title: 'Candidates',
      questions: [
        {
          key: 'number_of_students',
          text: 'Number of Candidates',
          minLength: 1,
          kind: 'number_of_candidates',
          digit: true
        },
        {
          key: 'group_exam_types',
          text: 'Number of Candidates',
          minLength: 0,
          kind: 'group_exam_types',
          digit: false
        },
        {
          key: 'add_exam_counter',
          kind: 'add_exam_counter',
          minLength: 1,
          digit: false
        }
        //default value of capture_names set in watcher of InputQuestion in add-exam-form-components.js

      ]
    },
    pesticideGroupStep3: {
      step: 3,
      title: 'Notes',
      questions: [
        {
          kind: 'notes',
          key: 'notes',
          text: 'Additional Notes (optional)',
          minLength: 0,
          digit: false,
        }
      ]
    },
    challengerBooking: {},
    candidates: [],
  },
  getters: {
    add_modal_steps(state, getters, rootState) {
      if ( rootState.addExamModal && rootState.addExamModal.setup ) {
        let { capturedExam } = rootState
        switch ( rootState.addExamModal.setup ) {
          case 'challenger':
            return state.addChallengerSteps
          case 'group':
            return state.addGroupSteps
          case 'individual':
            return state.addIndividualSteps
          case 'pesticide':
            return getters.addPesticideSteps
          case 'other':
            return state.addOtherSteps
          default:
            return []
        }
      }
    },
    pesticideStep1(state, getters, rootState) {
      let { capturedExam } = rootState
      let ExamType = [
        {
          key: 'pesticide_type',
          text: 'Type of Pesticide Exam',
          kind: 'select',
          options: [
            { text: 'Individual', value: 'individual', id: 'exam_method' },
            { text: 'Group', value: 'group', id: 'exam_method' }
          ],
          minLength: 1,
          digit: false,
        }
      ]
      let step1 = { ...state.pesticideStep1 }

      if ( capturedExam.ind_or_group === 'individual' ) {
        if ( step1.questions.findIndex( step => step.key === 'pesticide_type' ) === -1 ) {
          step1.questions = [ ...step1.questions, ...ExamType ]
          return [ step1 ]
        }
      }
      return [ step1 ]
    },
    pesticideStep2(state, getters, rootState) {
      let { capturedExam } = rootState

      if (capturedExam.ind_or_group) {
        let step2
        if ( capturedExam.ind_or_group === 'inidividual' ) {
          step2 = { ...state.pesticideIndividualStep2 }
        }
        if ( capturedExam.ind_or_group === 'group' ) {
          step2 = { ...state.pesticideGroupStep2 }
        }
        return [ step2 ]
      }
    },
    pesticideStep3(state, getters, rootState) {
      let { capturedExam } = rootState
      let step

      if (capturedExam.ind_or_group === 'group') {
        step = state.pesticideGroupStep3
      }
      return [ step ]
    },
    addPesticideSteps(state, getters) {
      return [ ...getters.pesticideStep1, ...getters.pesticideStep2, ...getters.pesticideStep3 ]
    }
  },
  actions: {
    getAllPesticideExams({commit, rootState}) {
      return new Promise((resolve, reject) => {
        let url = "/exams/"

        Axios(rootState.bearer).get(url)
          .then(resp => {
            console.log(resp.data.exams)
            let pesticideExams = resp.data.exams.filter(exam => exam.exam_type.pesticide_exam_ind)
            commit('setAllPesticideExams', pesticideExams)
            commit('toggleShowAllPesticideExams', true)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    clearChallengerBooking({commit}) {
      commit('clearChallengerBooking')
      commit('clearAddExamModalFromCalendarStatus')
    },
    getBCMPlusID({commit, dispatch}) {
      Axios.get().then(resp => {

      })
    },
    submitExam() {

    }
  },
  mutations: {
    toggleShowAllPesticideExams: (state, payload) => state.showAllPesticideExams = payload,
    setAllPesticideExams: (state, payload) => state.allPesticideExams = payload,
    toggleUploadExamModal: (state, payload) => state.uploadPesticideModalVisible = payload,
    setSelectedExams: (state, payload) => state.candidates = payload,
    saveChallengerBooking(state, payload) {
      Object.keys(payload).forEach( key => {
        if (payload[key]) {
          Vue.set(
            state.challengerBooking,
            key,
            payload[key]
          )
        }
      })
    },
    clearChallengerBooking(state) {
      Vue.delete(
        state,
        'challengerBooking'
      )
    }
  }
}
