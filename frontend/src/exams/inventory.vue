<template>
  <div>
    <span class="title margin-left">Exam Inventory</span><br>
    <span class="subheader margin-left">Click an exam in the table to review its details and fulfill the exam process</span>
    <InventoryTable />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import Nav from '@/layout/nav'
  import InventoryTable from './inventory-table'

  export default {
    name: 'Inventory',
    components: { InventoryTable },
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
