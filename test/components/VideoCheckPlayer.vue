<template>
  <div id="frame">
    <video :controls="false" v-bind:src="videoPath"/>
  </div>
  <div id="user-control"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {ASSETS_PATH} from "../public"

export default defineComponent({
  name: "VideoCheckPlayer",
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