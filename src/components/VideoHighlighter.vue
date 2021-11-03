<template>
  <div ref="highlighter" class="highlighter"></div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "VideoHighlighter",
  props: {
    videoObject: {
      type: HTMLVideoElement,
      required: true
    }
  },
  data() {
    return {
      highlighterDom: undefined as unknown as HTMLDivElement
    }
  },
  mounted() {
    this.highlighterDom = this.$refs.highlighter as HTMLDivElement

    this.highlighterDom.style.top = this.videoObject.offsetTop + "px"
    this.highlighterDom.style.left = this.videoObject.offsetLeft + "px"
    this.highlighterDom.style.height = this.videoObject.offsetHeight + "px"
    this.highlighterDom.style.width = this.videoObject.offsetWidth + "px"
  }
})
</script>

<style scoped lang="scss">
.highlighter {
  position: absolute;
  animation-name: video-blink;
  animation-duration: 300ms;
  animation-delay: 50ms;
  animation-iteration-count: 3;
  opacity: 0;
  background-color: #f1d481;
}

@keyframes video-blink {
  0% { opacity: 0 }
  50% { opacity: 65% }
  100% { opacity: 0 }
}
</style>