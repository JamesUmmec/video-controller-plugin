<template>
  <div id="tag">
    <div id="index" class="center">
      <div class="center" v-text="index+1" />
    </div>

    <div id="speed-rate" class="single-line">
      <span ref="speed"
            title="修改视频倍速 Edit video speed rate"
            contenteditable="true"
            @keydown.enter="speedEnter"
            @keydown.esc="setSpeedRate"
            @blur="setSpeedRate"
      >
        1.00
      </span>x
    </div>

    <div id="force-play" class="center" v-bind:class="forcePlayClass">
      <img alt="" src="../assets/play.svg" title="强制播放 Force play" @click="forcePlayClick"/>
    </div>

    <div id="force-pause" class="center" v-bind:class="forcePauseClass">
      <img alt="" src="../assets/pause.svg" title="强制暂停 Force pause" @click="forcePauseClick"/>
    </div>

    <div id="highlight" class="center" @click="highlightVideo">
      <img alt="" src="../assets/highlight.svg" title="高亮此视频 Highlight this video"/>
    </div>
  </div>
</template>

<script lang="ts">
import {createApp, defineComponent} from "vue"
import VideoHighlighter from "./VideoHighlighter.vue"

export default defineComponent({
  name: "VideoController",
  components: {VideoHighlighter},
  props: {
    /**
     * The index number of the video.
     * Count from zero !!! (same as the index in the array)
     * Displayed from one.
     */
    index: {
      type: Number,
      required: true
    },

    /** HTML video element object for direct call. */
    videoObject: {
      type: HTMLVideoElement,
      require: true
    }
  },
  data() {
    return {
      speedRate: 1.0,
      forcePlay: false,
      forcePlayClass: "disable-force",
      forcePause: false,
      forcePauseClass: "disable-force",
      speedDom: undefined as unknown as HTMLDivElement
    }
  },
  mounted() {
    this.speedDom = this.$refs.speed as HTMLDivElement

    // Enable force pause
    this.videoObject?.addEventListener("play", () => {
      if(this.forcePause) {
        this.videoObject?.pause()
      }
    })

    // Enable force play
    this.videoObject?.addEventListener("pause", () => {
      if(this.forcePlay) {
        this.videoObject?.play()
      }
    })
  },
  methods: {
    speedEnter(event: KeyboardEvent) {
      event.preventDefault()
      this.setSpeedRate()
    },

    setSpeedRate() {
      this.speedDom.blur()

      try {
        this.speedRate = parseFloat(this.speedDom.innerText)
      } catch (error) {
        this.speedRate = 1.0
      }

      if(isNaN(this.speedRate)) { this.speedRate = 1.0 }
      if(this.speedRate <= 0.01) { this.speedRate = 1.0 }
      this.speedDom.innerText = this.speedRate.toFixed(2)

      // Don't forget to ensure it is not undefined first !!!
      if(this.videoObject) {
        this.videoObject.playbackRate = this.speedRate
      }
    },

    forcePlayClick() {
      this.forcePlay = !this.forcePlay
      this.videoObject?.play() // don't forget to launch first

      if(this.forcePlay) {
        this.forcePause = false
        this.forcePauseClass = "disable-force"
        this.forcePlayClass = "enable-force"
      } else {
        this.forcePlayClass = "disable-force"
      }
    },

    forcePauseClick() {
      this.forcePause = !this.forcePause
      this.videoObject?.pause() // don't forget to launch first

      if(this.forcePause) {
        this.forcePlay = false
        this.forcePlayClass = "disable-force"
        this.forcePauseClass = "enable-force"
      } else {
        this.forcePauseClass = "disable-force"
      }
    },

    highlightVideo() {
      let highlighter = document.createElement("div")
      this.videoObject?.offsetParent?.appendChild(highlighter)
      createApp(VideoHighlighter, {videoObject: this.videoObject}).mount(highlighter)
      setTimeout(() => {
        // save memory (although not necessary)
        highlighter.remove()
      }, 900) // when edit time, view VideoHighlighter.vue style keyframes.
    }
  }
})
</script>

<style scoped lang="scss">
@import "../common/common";

$height: 2.4rem;
$padding-side: 0.8rem;
$rate: 0.62;
$rater: 0.80;

$gray-line: #bcbcbc;
$light-line: #cecece;
$focus-bg: #eaddca;

$hover-duration: 235ms;

#tag {
  height: $height;
  width: 100%;
  border-bottom: solid 0.5px $light-line;
  > div {
    position: absolute;
    height: $height;
  }

  > #index {
    width: $height;
    left: $padding-side;
    > div {
      width: $height*$rate;
      height: $height*$rate;
      border-radius: $height*$rate*0.5;
      border: solid 0.5px $gray-line;
    }
  }

  transition: background-color $hover-duration;
  &:hover {
    background-color: $focus-bg;
    transition: background-color $hover-duration;
    > #index > div {
      background-color: $btn-bg;
      color: $focus-bg;
      border: none;
      transition: background-color $hover-duration, color $hover-duration;
    }
  }
}

#highlight { right: $padding-side; }
#force-pause { right: $height*$rate + $padding-side; }
#force-play { right: 2*$height*$rate + $padding-side; }
#force-play, #force-pause, #highlight {
  width: $height*$rate;
  > img {
    width: $height*$rate*$rater;
    height: $height*$rate*$rater;
  }
}
#highlight > img {
  filter: brightness(145%);
  transition: filter $hover-duration;
  &:hover {
    filter: none;
    transition: filter $hover-duration;
  }
}

.enable-force {
  filter: none;
  > img {
    filter: none;
    transition: filter $hover-duration;
    &:hover {
      filter: brightness(65%);
      transition: filter $hover-duration;
    }
  }
}

.disable-force {
  filter: contrast(0);
  > img {
    opacity: 50%;
    transition: opacity $hover-duration;
    &:hover {
      opacity: 100%;
      transition: opacity $hover-duration;
    }
  }
}

#speed-rate {
  left: $height + 2*$padding-side;
  right: 3*$height*$rate + 1.5*$padding-side;

  text-align: right;
  font-size: 0.88rem;
  > span {
    line-height: $height;

    padding: 0.1rem 0.2rem;
    margin-right: 0.2rem;
    border-radius: 0.2rem;
    border: none;
    outline: none;

    transition: color $hover-duration;
    &:focus {
      color: #232323;
      background-color: #c4d3e5;
      transition: color $hover-duration;
    }
    &::selection {
      background-color: #91b2d5;
    }
  }
}

// Same position as which video,
// Which dom is created by script for temp use.
@keyframes video-blink {
  0% { opacity: 0 }
  50% { opacity: 35% }
  100% { opacity: 0 }
}
</style>
