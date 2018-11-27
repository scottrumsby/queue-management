/*
 * Copyright 2015 Province of British Columbia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Dash from './serve-citizen/dash.vue'
import ButtonsDash from '@/serve-citizen/dash-buttons'
import Smartboard from './smartboard/'
import ButtonsCalendar from '@/room-booking/buttons-calendar'
import Calendar from '@/room-booking/calendar'
import Inventory from '@/exams/inventory'
import ButtonsInventory from '@/exams/buttons-inventory'
import ButtonsAdmin from './ButtonsAdmin'
import Admin from './Admin'

Vue.use(Router)

const AdminTitle = Vue.component('admin-title',{
  template: '<div><span style="font-weight: 500; font-size: 1.90rem">Administration</span></div>'
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      redirect: '/queue',
        children: [
          {
            path: 'queue',
            components: {
              default: Dash,
              buttons: ButtonsDash,
            },
          },
          {
            path: 'schedule',
            components: {
              default: Calendar,
              buttons: ButtonsCalendar,
            },
          },
          {
            path: 'exams',
            components: {
              default: Inventory,
              buttons: ButtonsInventory
            }
          },
          {
            path: 'admin',
            components: {
              default: Admin,
              buttons: ButtonsAdmin
            }
          },
        ]
    },
    {
      path:'/smartboard/:id',
      component: Smartboard,
      props: true,
    },
    {
      path:'/smartboard/',
      component: Smartboard,
    },
  ]
})
