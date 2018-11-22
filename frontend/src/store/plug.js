export const exams = [
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
    invigilator:'Dana Scully',
    notes:'',
    duration: '2 hr'
  }
]

export const invigilators = [
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
]

export const events = [
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

export const examTypes = [
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
]

export const resources = [
  { id: 'room1', title: 'Boardroom 1', eventColor: '#b2cdea' },
  { id: 'room2', title: 'Boardroom 2', eventColor: '#c7ebc5' },
  { id: 'room3', title: 'Office 6', eventColor: '#f0c0b5' }
]
