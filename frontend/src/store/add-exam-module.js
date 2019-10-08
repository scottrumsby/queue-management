import Vue from 'vue'

export const addExamModule = {
  state: {
    pesticideExamTypes: [
      `Industrial Vegetation - 3 hours`,
      `Landscape - 3 hours`,
      `Structural - General - 3 hours`,
      `Dispenser - Commercial - 3 hours`,
      `Dispenser - Domestic - 3 hours`,
      `Agriculture - Greenhouse - 3 hours`,
      `Agriculture - Field Crop & Orchard - 3 hours`,
      `Forestry - General - 3 hours`,
      `Forestry - Seed Orchard - 3 hours`,
      `Forestry - Seedling Nursery - 3 hours`,
      `Forestry - Non-broadcast - 3 hours`,
      `Act and Regulation - Forestry/Mosquito 1 hour`,
      `Act and Regulation - Landscape/Structu al - 1 hour`,
      `Act and Regulation - Industrial VegJNox ous Weed - 1 hour`,
      `Mosquito and Biting Fly - 3 hours`,
      `Mosquito - Aerial - Granular - 1.5 hours`,
      `Mosquito - Ground Application - 1.5 hours`,
      `Structural - Wood Preservation - 3 hours`,
      `Fumigation - C02 - 3 hours`,
      `Dispenser - C02 - Fumigant - 3 hours`,
      `Aquaculture - Marine, Hydrogen Peroxide - 3 hours`,
      `Fumigation - Ship & Structure - 3 hours`,
      `Fumigation - Container - 3 hours`,
      `Aircraft - Disinsection - 2 hours`
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
          text: 'Will the Exam be handled by SBC',
          minLength: 1,
          digit: false,
          kind: 'offsiteSelect',
          options: [
            { text: 'The Exam will be handled by SBC', value: true, },
            { text: 'The Exam will not be handled by SBC', value: false, }
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
          minLength: 1,
          kind: 'group_exam_types',
          digit: false
        },
        //default value of capture_names set in watcher of InputQuestion in add-exam-form-components.js

      ]
    },
    pesticideGroupStep3: {
      step: 3,
      title: 'Exam Types',
      questions: [

      ]
    },
    pesticideOffsiteStep3: [
      {
        step: 1,
        title: 'Exam Type',
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
        ]
      }
    ],
    challengerBooking: {},
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
            return state.addExamModule.addOtherSteps
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
          if (capturedExam.capture_names === 'true') {
            let namesQuestion = [{
              key: 'group_names',
              text: 'Input candidates one at a time',
              minLength: 0,
              kind: 'group_name_input',
              digit: false
            }]
            step2.questions = [ ...step2.questions, ...namesQuestion]
            return [ step2 ]
          }
        }
        return [ step2 ]
      }
      return [state.pesticideIndividualStep2]
    },
    pesticideStep3(state, getters, rootState) {
      let { capturedExam } = rootState
      if (capturedExam.ind_or_group === 'group') return [state.pesticideGroupStep3]
      return [state.pesticideGroupStep3]
    },
    addPesticideSteps(state, getters) {
      return [ ...getters.pesticideStep1, ...getters.pesticideStep2, ...getters.pesticideStep3 ]
    }
  },
  actions: {
    clearChallengerBooking({commit}) {
      commit('clearChallengerBooking')
      commit('clearAddExamModalFromCalendarStatus')
    },
  },
  mutations: {
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
