<template>
  <div id="frame">
    <video :controls="true" v-bind:src="videoPath"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {ASSETS_PATH} from "../common/public"

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
  }
})
</script>

<style scoped lang="scss">
#frame {
  position: absolute;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  video {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>