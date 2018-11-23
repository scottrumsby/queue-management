import Vue from 'vue'
import Router from 'vue-router'
import InventoryButtons from '../exams/inventory-buttons'
import Inventory from '../exams/inventory'
import App from '../App'
import Smartboard from '../smartboard/index'
import Calendar from '../room-booking/calendar'
import ButtonsCalendar from '../room-booking/buttons-calendar'
import Dash from '../serve-citizen/dash'
import DashButtons from '../serve-citizen/dash-buttons'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      redirect: '/dash',
      component: App,
        children: [
          {
            path: 'dash',
            components: {
              default: Dash,
              buttons: DashButtons
            }
          },
          {
            path: 'cal',
            components: {
              default: Calendar,
              buttons: ButtonsCalendar
            }
          },
          {
            path: 'exams',
            components: {
              default: Inventory,
              buttons: InventoryButtons
            }
          },
        ]
      },
    ]
})

   /*

    {
      path: '/smartboard',
      component: Smartboard
    }*/
