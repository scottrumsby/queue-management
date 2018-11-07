import Vue from 'vue'
import Router from 'vue-router'
import Inventory from '@/exams/inventory'
import Scheduler from '@/room-booking/scheduler'
import Calendar from '@/room-booking/calendar'
import Confirm from '@/room-booking/confirm'
import Dash from '@/serve-citizen/dash'
import Nav from '@/layout/nav'
import InventoryModal from '@/exams/inventory-modal'

Vue.use(Router)


const MainContent = {
  template: `
    <div>
      I'm the not main content
      <router-link to="/path">Path</router-link>
    </div>
  `
}





export default new Router({
  routes: [
    {
      path:'/cal',
      component: Calendar,
    },
    {
      path:'/dash',
      component: Dash,
    },
    {
      path:'/exams',
      component: Inventory,
    },
    {
      path:'/',
      component: MainContent,
    },

  ]
})
