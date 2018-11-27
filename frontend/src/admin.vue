<!--
  /*Copyright 2015 Province of British Columbia

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  limitations under the License.*/
  See the License for the specific language governing permissions and
  -->

<template>
    <iframe :src="url"
            ref="iframe1"
            width="100%"
            :style="frameStyle"
            frameborder="0"
            @click="hideNav"/>
</template>

<script>
  import Vue from 'vue'
  import { mapState, mapActions, mapMutations } from 'vuex'

  export default {
    name: "Admin",
    mounted() {
      Vue.prototype.$changeAdminView = this.changeAdminView
      let frame = this.$refs.iframe1

      let style = document.createElement('style')
        style.textContent =`
          div.navbar-header {
            display: none !important;
            background-color: green !important;
          }
        nav.navbar.navbar-default {
          display: none !important;
          background-color: green !important;
        }
        button.navbar-toggle {
          display: none !important;
          background-color: green !important;
        }`
        console.log(style)
      this.$nextTick(function() {
        frame.contentDocument.head.appendChild(style)
        console.log(frame)
      })

    },
    data() {
      return {
        navigation: '',
      }
    },
    computed: {
      ...mapState(['viewPortSizes']),
      frameHeight() {
        return this.viewPortSizes.h - 80
      },
      frameStyle() {
        return {
          height: this.frameHeight + 'px',
        }
      },
      url() {
        return process.env.SOCKET_URL + '/admin/' + this.navigation
      }
    },
    methods: {
      changeAdminView(view) {
        this.navigation = view
      },
      hideNav() {

      }
    }
  }
</script>

<style>
  div.navbar-header {
    display: none !important;
    background-color: green !important;
  }

  nav.navbar-default {
    display: none !important;
    background-color: green !important;
  }
  button.navbar-toggle {
    display: none !important;
    background-color: green !important;
  }
</style>
