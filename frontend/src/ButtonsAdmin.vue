<!--
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
  -->

<template>
  <div>
    <b-form-select :options="options" @input="handleInput" :value="option" />
  </div>
</template>

<script>
  export default {
    name: "ButtonsAdmin",
    mounted() {
      this.view = null
    },
    data() {
      return {
        option: null,
        options: [
          {value: null, text: 'Please select a catagoy of item to update...'},
          {value: 'csr', text: 'CSRs'},
          {value: 'office', text: 'ServiceBC Offices'},
          {value: 'channel', text: 'Delivery Channels'},
          {value: 'role', text: 'User roles'},
          {value: 'service', text: 'Provided Services'},
          {value: 'smartboard', text: 'Smartboard Content'},
        ]
      }
    },
    methods: {
      handleInput(e) {
        this.view = e
        this.$changeAdminView(e)
      }
    }
  }
</script>

<style scoped>

</style>
