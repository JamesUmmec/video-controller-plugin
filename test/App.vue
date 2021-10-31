<script setup lang="ts">
import VideoPlayer from "./components/VideoPlayer.vue"
</script>

<template>
  <div id="left" class="side"><VideoPlayer src="cloudstream.mp4"></VideoPlayer></div>
  <div id="right" class="side"><VideoPlayer src="windwave.mp4"></VideoPlayer></div>
</template>

<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;

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
</style>