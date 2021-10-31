<script setup lang="ts">
import VideoPlayer from "./components/VideoPlayer.vue"
import VideoCheckPlayer from "./components/VideoCheckPlayer.vue"
</script>

<template>
  <div id="left" class="side"><VideoPlayer src="cloudstream.mp4"></VideoPlayer></div>
  <div id="right" class="side"><VideoCheckPlayer src="windwave.mp4"/></div>
</template>

<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
  user-select: none;

  #app {
    width: 100%;
    height: 100%;

    #right {right: 0;}
    .side {
      position: absolute;
      height: 100%;
      width: 50%;
    }
  }
}

// Global and root font style
body {
  background-color: #232323;
  color: #9b9b9b;
  font-family:
      sans-serif,                // default sans serif font
      "HarmonyOS Sans SC",       // for HarmonyOS devices
      "PingFang SC",             // for Apple devices
      "Source Han Sans",         // which is commonly used on Linux
      "Microsoft YaHei UI",      // Windows default font for SC...
      "Helvetica",               // Latin sans font
      "Arial"                    // Latin sans font
  ;
}
</style>