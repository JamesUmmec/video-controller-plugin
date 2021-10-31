<template>
  <div id="frame" class="center">
    <video :controls="false" v-bind:src="videoPath"/>
  </div>
  <div id="user-control"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {ASSETS_PATH} from "../common/public"

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
@import "../common/public";
@import "../common/video";

#frame {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
