<template>
  <div id="frame" class="center" ref="frame">
    <video :controls="false" v-bind:src="videoPath" muted/>
  </div>
  <div class="video-comment">
    This video player is designed to force you to watch the video carefully.<br>
    But you can use this <b>plugin</b> to free yourself.<br>
    这个视频会用有趣的方式让你认真观看，但可以用<b>插件</b>挣脱束缚
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
  },
  mounted() {
    // Prevent user from calling the contextmenu.
    // (There are options to control video speed in Firefox contextmenu)
    this.$refs["frame"].oncontextmenu = () => {
      return false
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
