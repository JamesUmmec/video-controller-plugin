<template>
  <div id="tag">
    <div id="index" class="center">
      <div class="center" v-text="index" />
    </div>

    <div id="speed-rate">
      <div ref="speed"
           contenteditable="true"
           class="single-line"
           @keydown="speedKeys"
           @blur="setSpeedRate"
      >
        1.00x
      </div>
    </div>

    <div id="force-play" class="center" v-bind:class="forceClass">
      <img alt="" src="../assets/play.svg"/>
    </div>

    <div id="force-pause" class="center" v-bind:class="forceClass">
      <img alt="" src="../assets/pause.svg"/>
    </div>

    <div id="highlight" class="center">
      <img alt="" src="../assets/highlight.svg"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "VideoController",
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
      require: false
    }
  },
  data() {
    return {
      forceClass: "disable-force",

      /** Avoid call id for there are more than one video controllers here. */
      speedDom: undefined as unknown as HTMLDivElement
    }
  },
  mounted() {
    this.speedDom = this.$refs.speed as HTMLDivElement
  },
  methods: {
    // TODO default select all for convenient edit
    speedFocus() {},

    speedKeys(event: KeyboardEvent) {
      // TODO key judgement in more details
      if (event.key === "enter") {
        event.preventDefault()
        this.setSpeedRate()
      } else if (event.key === "esc") {
        event.preventDefault()
        this.speedDom.blur()
      }
    },

    // TODO mention that there might be invalid value string
    setSpeedRate() {}
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
#highlight > img { filter: brightness(145%); }
.enable-force { filter: none; }
.disable-force { filter: contrast(0); }

#speed-rate {
  left: $height + 2*$padding-side;
  right: 3*$height*$rate + 1.5*$padding-side;
  > div {
    line-height: $height;
    width: 100%;
    text-align: right;
    font-size: 0.88rem;

    transition: color $hover-duration;
    &:focus {
      color: #232323;
      transition: color $hover-duration;
    }
  }
}
</style>
