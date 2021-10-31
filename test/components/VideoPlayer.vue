<template>
  <div id="frame"><video v-bind:src="videoPath"></video></div>
  <div id="control"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

// Path from the root to the assets folder of the test page.
const ASSETS_PATH = "/test/assets/"

export default defineComponent({
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoPath: ASSETS_PATH + this.src
    }
  },
  mounted() {
  },
  methods: {}
})
</script>

<style scoped lang="scss">
#frame {
  position: absolute;
  height: 100%;
  width: 100%;
}
#control {
  position: absolute;
  width: 100%;
  height: 3.5rem;
  bottom: 1rem;
}
</style>