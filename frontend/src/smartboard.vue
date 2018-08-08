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



<template>
  <div class="smart-board">
    <b-container class="mt-3" style="font-size: 3em; width: 100%; text-align: center;">Welcome to Service BC</b-container>
    <p style="font-size: 20px; padding-left: 25px">Citizens waiting: {{ queueLength }}</p>
    <div style="display: flex;
  justify-content: space-around;">
      <div>
        <Video />
      </div>
      <div style="border: 9px solid steelblue; width: 25%;">
        <b-table :items="data.citizens"
                 :fields="fields"
                 size="lg"
                 striped
                 style="width: 100%"
                 thead-tr-class="table-head"
                 tbody-class="table-body-sb"
                 >
          <template slot="state" slot-scope="data">
            <div v-if="data.value==='Invited'" style="color: green">{{data.value}}</div>
          </template>
        </b-table>
      </div>
    </div>
    
  
  </div>
</template>

<script>
import Socket from './Socket'
import axios from 'axios'
import Video from './video'

export default {
  name: 'Smartboard',
  mounted() {
    setInterval( () => { this.now() }, 5000)
  },
  components: { Video },
  data() {
    return {
      time: '',
      fields: [
        {key: 'ticket_number', label: 'Ticket'},
        {key: 'state', label: 'Status', thClass: 'd-none', tdClass: 'd-none'},
        {label: 'Counter'}
      ],
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',  },
      timeOpts: {hour12: true, hour: 'numeric', minute: '2-digit'},
      data: {
        "office_type": "callbynumber",
        "citizens": [
          {
              "ticket_number": "F18",
              "state": "Invited"
          },
          {
              "ticket_number": "F19",
              "state": "Waiting"
          },
          {
              "ticket_number": "F20",
              "state": "Waiting"
          },
          {
              "ticket_number": "G10",
              "state": "Invited"
          },
          {
              "ticket_number": "G11",
              "state": "Waiting"
          }
        ]
      },
      Axios: axios.create({
        baseURL: process.env.API_URL,
        method: 'get',
        url: '/smartboard/',
        withCredentials: true,
        headers: {
          'Accept': 'application/json'
        }
      })
    }
  },
  
  computed: {
    queueLength() {
      return this.data.citizens.filter(d=>d.state === 'Waiting').length
      
    }
  },
  
  methods: {
    date() {
      let d = new Date()
      return d.toLocaleDateString('en-CA', this.options)
    },
    
    now() {
      console.log('this time');
      let d = new Date()
      this.time = d.toLocaleTimeString('en-CA', this.timeOpts)
    },
    getSomething() {
      this.Axios('').then( resp => {
        this.hello = resp.data.office_type
      })
    }
  }
}
</script>
<style>
  .smart-board {
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background: linear-gradient(LemonChiffon, white, LightSkyBlue);
  }
  
  .table-head {
    font-size: 1.8em;
  }
</style>


