<script setup lang="ts">
import VideoPlayer from "components/VideoPlayer.vue"
</script>

<template>
  <div id="left" class="side"><VideoPlayer src="./assets/cloudstream.mp4"></VideoPlayer></div>
  <div id="right" class="side"><VideoPlayer src="./assets/windwave.mp4"></VideoPlayer></div>
</template>

<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
  #app {
    width: 100%;
    height: 100%;
  }
}
</style>