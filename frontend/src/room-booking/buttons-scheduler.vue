<template>
  <div>

  </div>





</template>

<script>
import { mapMutations} from 'vuex'

export default {
  name: 'ButtonsScheduler',
  methods: {
    ...mapMutations([
      'toggleCalendarScheduleMode',
      'toggleNavigation'
    ]),
    cancel() {
      this.toggleCalendarScheduleMode(false)
      this.toggleNavigation(true)
      this.listWeek()
    },
  }
}
</script>

<style scoped>

</style>
