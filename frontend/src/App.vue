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
  <div id="App">
    <Header />
    <div id="fixed-viewport-app" :style="{width:`${x}px`, height:`${y}px`}">
      <Alert />
      <Modals />
      <Nav v-if="isLoggedIn" />
      <Socket v-show="1===2" />
      <Feedback />
      <Response />
    </div>
    <Footer />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Alert from './alert'
  import Header from './layout/header'
  import Socket from './Socket'
  import Footer from './layout/footer'
  import Feedback from './feedback'
  import Response from './response'
  import Nav from './layout/nav'
  import Modals from './layout/modals'

  export default {
    name: 'App',
    components: { Modals, Nav, Alert, Header, Socket, Footer, Feedback, Response },
    created() {
      this.getSize()
    },
    mounted() {
      this.$nextTick(function() {
        window.addEventListener('resize', this.getSize)
      })
    },
    computed: {
      ...mapState(['isLoggedIn']),
    },
    data() {
      return {
        x: 0,
        y: 0,
      }
    },
    methods: {
      getSize() {
        this.x = window.innerWidth
        this.y = window.innerHeight - 78 - 40
      }
    }
  }
</script>

<style>
  .custom-base-modal {
    border: 1px solid rgb(73, 73, 73) !important;
    color: black !important;
    font-weight: 400;
  }
  .custom-base-modal-headerlg {
    background-color: #7590b9 !important;
    border-bottom: 1px solid rgb(191, 191, 191) !important;
    color: white !important;
    padding: 14px 12px 2px 12px !important;
    margin: 0px !important;
  }
  .custom-base-modal-headermd {
    background-color: #7590b9 !important;
    border-bottom: 1px solid rgb(191, 191, 191) !important;
    color: white !important;
    padding: 12px 12px 12px 12px !important;
    margin: 0px !important;
  }
  .custom-base-modal-footer {
    background-color: rgba(0,0,0,0.03) !important;
    border-top: 1px solid rgb(191, 191, 191) !important;
    color: black !important;
    padding: 8px !important;
    margin: 0px !important;
  }
  .custom-select-sm {
    font-size: .8rem !important;
  }
  .dash-flex-button-container {
    display: flex; justify-content: space-between; height: 100% !important;
  }

  #__BVID__13__BV_toggle_ {
    background-color: #ffffff;
    color: #1a5a96;
    border: 1px solid silver;
    width: 375px;
  }
  .txt-85 {
    font-size: 1rem;
  }
  .txt-14 {
    font-size: 1.4rem;
  }
  #fixed-viewport-app {
    position: absolute;
    display: block;
    top: 78px;
    left: 0px;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 0px;
    padding: 0px;
  }
  .view-screen-title {
    font-family: "Helvetica Neue",Arial,sans-serif;
    color: black;
    font-weight: 500;
    font-size:1.90rem;

  }
</style>
