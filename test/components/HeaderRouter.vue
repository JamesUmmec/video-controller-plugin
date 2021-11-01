<template>
  <div id="top-banner" ref="banner-root" v-bind:class="bannerHideClass">
    <div id="text" v-text="text"/>

    <div id="shift" class="center">
      <a id="shift-btn" v-bind:href="anotherHref">切换 Shift</a>
    </div>

    <div id="close" class="center" @click="hide">
      <img alt="" src="../assets/close.svg"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import {HEADER_ROUTER_TEXT} from "../common/config"

export default defineComponent({
  name: "HeaderRouter",
  data() {
    return {
      containsPlugin: false,
      text: "loading...",
      anotherHref: "",
      bannerHideClass: ""
    }
  },
  mounted() {
    this.containsPlugin = location.pathname.endsWith("plugin.html")
    this.text = this.containsPlugin ? HEADER_ROUTER_TEXT.plugin : HEADER_ROUTER_TEXT.raw
    this.anotherHref = this.containsPlugin ? "./raw.html" : "./plugin.html"
  },
  methods: {
    hide() {
      this.bannerHideClass = "banner-hide"
    }
  }
})
</script>

<style scoped lang="scss">
@import "../common/public";

$height: 2rem;
$rate: 0.4;

$bg-color: #d3c396;
$text-color: #454545;
$btn-border: #676767;
$btn-bg: #dedede;

#top-banner {
  position: absolute;
  height: $height;
  width: 100%;
  z-index: 9999;

  background-color: $bg-color;
  color: $text-color;
  font-size: $height * $rate;

  > div {
    height: $height;
    position: absolute;
  }
}

// hide the banner
.banner-hide {
  top: -$height;
  animation-name: hide-banner;
  animation-duration: 475ms;
}
@keyframes hide-banner {
  0% { top: 0; }
  100% { top: -$height; }
}

#text {
  height: $height;
  line-height: $height;
  padding: 0 $height*$rate;
}

#close {
  width: $height;
  right: 0;

  > img {
    $rater: 1.2;
    width: $height*$rate*$rater;
    height: $height*$rate*$rater;

    filter: brightness(120%);
    transition: all 475ms;
    &:hover {
      filter: brightness(80%);
      transition: all 325ms;
    }
  }
}

#shift {
  right: $height;
  width: $height*2.85;

  > a {
    text-decoration: none;
    outline: none;
    color: $text-color;

    $rater: 0.75;
    height: $height*$rater;
    line-height: $height*$rater;
    padding: 0 $height*$rater/2;

    border-radius: $height*$rater*0.5;
    border-width: 0.5px;
    border-style: solid;
    border-color: $btn-border;
    background-color: $btn-bg;

    transition: all 475ms;

    &:hover {
      background-color: $btn-border;
      color: $btn-bg;
      transition: all 475ms;
    }
  }
}
</style>