<template>
  <div>
    <b-button class="btn-primary" @click="clickAddIndividual">Add Individual ITA Exam</b-button>
    <AddIndividualItaExam />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import AddIndividualItaExam from './add-individual-ita-exam'
  import CaptureIndITABase from './capture-ind-ita-base'

  export default {
    name: "ButtonsExams",
    components: { CaptureIndITABase, AddIndividualItaExam },
    methods: {
      ...mapMutations(['toggleAddIndividualITAExam']),
      clickAddIndividual() {
        this.toggleAddIndividualITAExam(true)
      }
    }
  }
</script>

<style scoped>

</style>
