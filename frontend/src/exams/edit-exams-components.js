import Vue from 'vue'
import moment from 'moment'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export const DataSummaryTable = Vue.component('data-summary-table', {
  props: ['data'],
  computed: {
    mappedData() {
      let n = this.data.length
      let chunk1 = this.data.slice(0, n / 2)
      let chunk2 = this.data.slice(n / 2, n)
      return [ chunk1, chunk2 ]
    },
  },
  template: `
    <div class="q-sum-td-outer-flex p-0 m-0 w-100">
      <div v-for="chunk, i in mappedData"
           :key="i"
           :class="i==1 ? 'p-0 ml-2 mr-0 w-100' : 'p-0 mr-2 ml-0 w-100'">
        <b-list-group flush >
          <b-list-group-item v-for="item in chunk"
                             :key="item.key+'sum-td'"
                             class="q-sum-td-inner-flex mx-0 px-0 w-100">
            <div class="q-sum-td-head mx-0 px-0">{{ item.key }}</div>
            <div class="q-sum-td-item mx-0 px-0">{{ item.value }}</div>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  `
})