<template>
  <Nav class="mr-3 pr-1">
    <template slot="top-buttons">
      <b-form inline>
        <b-button class="btn-primary mr-1" @click="addITA">Add ITA Exam</b-button>
        <b-button class="btn-primary m-0 mr-3" @click="addNon">Add non-ITA Exam</b-button>
      </b-form>
    </template>
    <template slot="content">
      <div>
        <span class="title margin-left">Exam Inventory</span><br>
        <span class="subheader margin-left">Click an exam in the table to review its details and fulfill the exam process</span>
        <InventoryTable />
      </div>
    </template>
  </Nav>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Nav from '@/layout/nav'
  import InventoryTable from './inventory-table'

  export default {
    name: 'Inventory',
    components: { Nav, InventoryTable },
    data() {
      return {}
    },
    methods: {
      ...mapMutations([
        'toggleITAExamModal',
        'toggleNonExamModal'
      ]),
      addITA() {
        this.toggleITAExamModal(true)
      },
      addNon() {
        this.toggleNonExamModal(true)
      },
    }
  }
</script>

<style scoped>
  .subheader {
    font-size: 1.0rem !important;
  }
  .margin-left {
    margin-left: 20px;
  }
  .title {
    font-size: 2rem;
    font-weight: 600;
  }

</style>
