<template>
  <div id="frame"><video src="{{src}}"></video></div>
  <div id="control"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
  },
  methods: {}
})
</script>

<style scoped lang="scss">

</style>