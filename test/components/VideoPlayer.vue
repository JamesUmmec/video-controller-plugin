<template>
  <div id="frame" class="center">
    <video :controls="true" v-bind:src="videoPath"/>
  </div>

  <div class="video-comment">
    This is a common video player with default controller of your browser<br>
    which is under your control.<br>
    这个视频可以用浏览器默认界面自由控制
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
@import "../common/public";
@import "../common/video";

#frame {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>