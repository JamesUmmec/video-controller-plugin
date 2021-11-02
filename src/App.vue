<template>
  <div id="pad" ref="pad">
    <!-- icon mode -->
    <div id="icon" class="center"
         @mousedown="iconMousedown"
         @mouseup="clearMousedown"
         @mouseleave="clearMousedown"
         @mouseout="clearMousedown"
    >
      <img alt="" src="/public/favicon.svg" v-bind:class="iconImageClass"/>
    </div>

    <!-- menu mode -->
    <div id="menu"><Menu/></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import Menu from "./components/Menu.vue"
import {MOUSEDOWN_DELAY} from "./common/config"

export default defineComponent({
  name: "App",
  components: {Menu},
  data() {
    return {
      menuShow: false,
      mousedown: false,
      iconImageClass: ""
    }
  },
  methods: {
    iconMousedown() {
      this.mousedown = true
      setTimeout(() => {
        if (this.mousedown) {
          // TODO drag
          this.iconImageClass = "dragging"
        } else {
          // TODO click and show menu
        }
      }, MOUSEDOWN_DELAY)
    },
    clearMousedown() {
      this.mousedown = false
      this.iconImageClass = ""
    }
  }
})
</script>

<style lang="scss">
@import "./common/common";

// Default icon size as a basic size unit.
$icon-size: 2.6rem;

// Display icon or menu in different mode.
#pad {
  position: fixed;
  z-index: 9999;

  // default position on page
  bottom: $icon-size;
  left: $icon-size;

  // default size same as the icon
  width: $icon-size;
  height: $icon-size;
}

// When the pad is being drag to change position
$dragging-min: 85%;
.dragging {
  transition: all 125ms;
  animation-name: begin-drag;
  animation-duration: 435ms;
}
@keyframes begin-drag {
  // for the <img> tag, which size relative to the outer #icon tag.
  0% { width: 100%; height: 100%; }
  65% { width: $dragging-min; height: $dragging-min; }
  100% { width: 100%; height: 100%; }
}

#icon {
  width: $icon-size;
  height: $icon-size;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 10px #161616;

    filter: brightness(80%);
    transition: all 475ms;
    &:hover {
      filter: brightness(100%);
      transition: all 475ms;
    }
  }
}

#menu {
  //
}
</style>
