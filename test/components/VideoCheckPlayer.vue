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

    <!-- TODO: bind judgement function -->
    <div id="time-display" v-bind:class="timeDisplayClass">{{timeDisplay}}</div>
  </div>

  <!-- TODO: build text and btn in popup window -->
  <div id="monitor" class="center" v-bind:class="monitorDisplayClass">
    <div id="popup"></div>
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
      iconPath: ICON_PATH.play,
      timeDisplay: "loading...",
      timeDisplayClass: "loading",
      monitorDisplayClass: "show",
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

// Color control area
$shadow-color: #161616;
// the blinking animation when loading the video.
$loading-blink-dark: #787878;
$loading-blink-light: #dedede;
// the blocking lines as background for teh monitor,
// which block user from clicking the play button.
$blocking-bg: #ababab25;
$blocking-ln: #dedede25;

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

        box-shadow: 0 0 12px $shadow-color;
      }
    }
  }

  #time-display {
    position: absolute;
    height: $height;
    line-height: $height;
    padding: 0 0.5 * $height;
    bottom: 0;
    right: 0;
  }

  // time display when loading
  .loading {
    font-weight: bold;
    animation-name: loading-blink;
    animation-duration: 1250ms;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    @keyframes loading-blink {
      0% { color: $loading-blink-dark; }
      100% { color: $loading-blink-light; }
    }
  }

  // time display at normal state
  .normal {
    color: $loading-blink-light;
    font-weight: normal;
  }
}

// Monitor that force user to watch carefully...
#monitor {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: $blocking-bg;
  background-image: repeating-linear-gradient(
    45deg,
    $blocking-ln,
    $blocking-ln 5px,
    transparent 0,
    transparent 10px
  );

  // style class control show or hide
  .show { display: block; }
  .hide { display: none; }

  // popup window for user interface
  #popup {
    width: 23rem;
    height: 22rem;
    background-color: #dedede;
    border-radius: 0.8rem;
    box-shadow: 0 0 5px $shadow-color;
  }
}
</style>
