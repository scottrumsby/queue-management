<template>
  <div class="inv-dimmer" v-if="inventoryModalVisible">
    <div class="inv-content">
      <div class="header">
        <h5>Click on a row to select an Exam</h5>
      </div>
      <div>
        <InventoryTable />
      </div>
      <div class="footer">
        <div class="d-flex flex-row-reverse">
          <b-button class="btn-secondary" @click="clickCancel">Cancel</b-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import InventoryTable from './inventory-table'
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'InventoryModal',
    components: { InventoryTable },
    computed: {
      ...mapState(['inventoryModalVisible']),
    },
    methods: {
      ...mapMutations(['toggleInventoryModal']),
      clickCancel() {
        this.toggleInventoryModal(false)
      }
    }
  }
</script>

<style scoped>
  .inv-dimmer {
    position: fixed;
    display: block;
    z-index: 1700;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .inv-content {
    background-color: #fefefe;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    padding: 0px;
    width: 95%;
    border-radius: 7px;
  }
  .header {
    width: 100%;
    height: 50px;
    background-color: #7590b9 !important;
    border-bottom: 1px solid rgb(191, 191, 191) !important;
    color: white !important;
    padding: 14px 12px 2px 12px !important;
    margin: 0px 0px 30px 0px !important;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
  .footer {
    background-color: rgba(0,0,0,0.03) !important;
    border-top: 1px solid rgb(191, 191, 191) !important;
    color: black !important;
    padding: 8px !important;
    margin: 40px 0px 0px 0px !important;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
</style>
