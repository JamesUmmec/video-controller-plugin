<template>
  <div id="frame" class="center" ref="frame" @contextmenu="preventContextmenu">
    <video ref="video" :controls="false" v-bind:src="videoPath" muted @play="uiOnPlay" @pause="uiOnPause"/>
  </div>

  <div class="video-comment">
    This video player is designed to force you to watch the video carefully.<br>
    But you can use this <b>plugin</b> to free yourself.<br>
    这个视频会用有趣的方式让你认真观看，但可以用<b>插件</b>挣脱束缚
  </div>

  <div id="user-control">
    <div id="control-button" class="center" @click="controlClick">
      <img alt="" v-bind:src="iconPath"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {ASSETS_PATH, ICON_PATH, defineMediaPlayingJudgement} from "../common/public"

export default defineComponent({
  name: "VideoCheckPlayer",
  props: {
    /** Source file name of which video (place the resources in the assets folder) */
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      videoPath: ASSETS_PATH + this.src,
      iconPath: ICON_PATH.play
    }
  },
  mounted() {
    // Init judgement of whether the video is now playing.
    defineMediaPlayingJudgement()
  },
  methods: {
    /**
     * Prevent user from calling the contextmenu.
     * (There are options to control video speed in Firefox contextmenu)
     * @param event any event object for type check.
     */
    preventContextmenu(event: Event) {
      event.preventDefault()
      return false
    },

    /**
     * When playing the video, shift the icon for UI display.
     */
    uiOnPlay() {
      this.iconPath = ICON_PATH.pause
    },

    /**
     * When pausing the video, shift the icon for UI display.
     */
    uiOnPause() {
      this.iconPath = ICON_PATH.play
    },

    /**
     * When clicking the control button,
     * judge whether the video is playing
     * and then control, play or pause the video.
     */
    controlClick() {
      if (this.$refs["video"].isPlaying) {
        this.$refs["video"].pause()
      } else {
        this.$refs["video"].play()
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import "../common/public";
@import "../common/video";

// Fill the area where it located.
#frame {
  position: absolute;
  height: 100%;
  width: 100%;
}

// Non native control UI to prevent user free control over the video.
// Only allow user to play or pause.
#user-control {
  $height: 4.5rem;

  position: absolute;
  width: 100%;
  height: $height;
  bottom: 0;

  #control-button {
    position: absolute;
    width: $height;
    height: $height;

    filter: brightness(80%);
    transition: all 475ms;
    &:hover {
      filter: brightness(100%);
      transition: all 475ms;
    }

    > img {
      $rate: 50%;
      width: $rate;
      height: $rate;
      border-radius: 50%;
      transition: all 215ms;

      &:hover {
        $rater: 1.1 * $rate;
        width: $rater;
        height: $rater;
        transition: all 215ms;

        box-shadow: 0 0 12px #161616;
      }
    }
  }
}
</style>
