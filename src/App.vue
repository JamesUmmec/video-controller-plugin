<template>
  <div id="pad" ref="pad" v-bind:class="padClass" class="default-font">
    <!-- icon mode -->
    <div id="icon" class="center" v-bind:class="iconClass"
         @mousedown="iconMousedown"
         @mouseup="clearMousedown"
         @drag="preventDefault"
         @dragend="preventDefault"
         @dragenter="preventDefault"
         @dragleave="preventDefault"
         @dragover="preventDefault"
         @dragstart="preventDefault"
    >
      <img alt="" src="/public/favicon.svg" v-bind:class="iconImageClass"/>
    </div>

    <!-- menu mode -->
    <div id="menu" v-bind:class="menuClass"><Menu/></div>
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
      menuPin: false,
      iconClass: "",
      menuClass: "hide-menu",
      iconImageClass: "",
      padClass: "pad-raw-size",

      /**
       * Reason of using "top" here but "bottom" for the style sheet:
       * "top" for better quality when reposition the pad,
       * while "bottom" to describe the static position fixed to the screen,
       * which avoid get out of the screen when resizing the webpage.
       * Don't forget to shift mode !!!
       */
      referencePosition: {
        left: 0,
        top: 0
      },
      /**
       * Get specified dom in this vue component.
       * Don't use getElementById() for this id might be polluted by the raw frame.
       */
      padDom: undefined as unknown as HTMLDivElement,
    }
  },
  mounted() {
    this.padDom = this.$refs.pad as HTMLDivElement
  },
  methods: {
    /**
     * Long click means drag,
     * Short click means open menu window.
     */
    iconMousedown(event: MouseEvent) {
      // Get necessary data.
      this.mousedown = true
      this.referencePosition = {
        left: event.offsetX,
        top: event.offsetY
      }

      // Judge drag or click, and execute different processes.
      setTimeout(() => {
        if (this.mousedown) {
          this.iconImageClass = "dragging"

          // Shift mode
          this.padDom.style.position = "absolute"
          document.onmousemove = (event) => {
            this.padDom.style.top = event.pageY - this.referencePosition.top + "px"
            this.padDom.style.left = event.pageX - this.referencePosition.left + "px"
          }
        } else { this.showMenu() }
      }, MOUSEDOWN_DELAY)
    },
    preventDefault(event: Event) { event.preventDefault() },
    clearMousedown(event: MouseEvent) {
      this.mousedown = false
      this.iconImageClass = ""

      // Optimization for better quality.
      if (document.onmousemove) {
        document.onmousemove = null

        // Shift mode into bottom
        this.padDom.style.bottom = (
          document.documentElement.clientHeight -
          event.clientY +
          this.referencePosition.top -
          this.padDom.clientHeight
        ) + "px"
        this.padDom.style.top = ""
        this.padDom.style.position = "fixed"
      }
    },

    showMenu() {
      this.menuShow = true
      this.iconImageClass = "transparent"
      this.padClass = "menu-bg"
      this.padDom.style.width = "15rem"
      this.padDom.style.height = "15rem"
      this.padDom.style.borderRadius = "0.8rem"
      setTimeout(() => {
        this.iconClass = "icon-hide"
        this.menuClass = "show-menu"
      }, 325)

      document.onclick = (event) => {
        //@ts-ignore
        if (event.target && !this.padDom.contains(event.target)) {
          this.hideMenu()
        }
      }
    },

    hideMenu() { if(this.menuShow && !this.menuPin) {
      this.menuShow = false
      this.menuClass = "hide-menu"
      this.iconImageClass = "icon-image-show"
      this.padDom.style.width = ""
      this.padDom.style.height = ""
      this.padDom.style.borderRadius = ""
      this.padClass = "pad-raw-size"
      setTimeout(() => {
        this.iconClass = ""
      }, 325)

      // Optimization for better quality.
      document.onclick = null
    }}
  }
})
</script>

<style lang="scss">
@import "./common/common";

// Default icon size as a basic size unit.
$icon-size: 2.6rem;

// default bg color for the pad
$pad-bg: #dedede;
$pad-border-color: #787878;

$menu-show-duration: 350ms;

// Display icon or menu in different mode.
#pad {
  position: fixed;
  z-index: 9999;
  user-select: none;

  // Use bottom rather than top for position style description:
  // not only because convenient for style sheet,
  // but also avoid condition that the control button get outside of the screen
  // when resizing the webpage.
  bottom: $icon-size;
  left: $icon-size;

  transition:
    width $menu-show-duration,
    height $menu-show-duration,
    border-spacing $menu-show-duration,
    background-color $menu-show-duration
  ;
}

// default size same as the icon
.pad-raw-size {
  width: $icon-size;
  height: $icon-size;
  border-radius: $icon-size*0.5;
}

// Attention: add this to the #pad when menu display, pad bg is the menu bg.
.menu-bg {
  background-color: $pad-bg;
  transition: background-color $menu-show-duration;

  border: solid 0.5px $pad-border-color;
  border-radius: $icon-size*0.5;
}

// When the pad is being drag to change position
$dragging-min: 85%;
.dragging {
  transition: all 125ms;
  animation-name: begin-drag;
  animation-duration: 350ms;
}
@keyframes begin-drag {
  // for the <img> tag, which size relative to the outer #icon tag.
  0% { width: 100%; height: 100%; }
  65% { width: $dragging-min; height: $dragging-min; }
  100% { width: 100%; height: 100%; }
}

.icon-hide { display: none; }
#icon {
  width: 100%;
  height: 100%;
  position: absolute;

  > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: 0 0 10px #161616;

    filter: brightness(80%);
    transition: filter 375ms;
    &:hover {
      filter: brightness(100%);
      transition: all 475ms;
    }
  }
}

.transparent { opacity: 0; }
.icon-image-show {
  animation-name: show-icon;
  animation-duration: 375ms;
}
@keyframes show-icon {
  0% { opacity: 0 }
  100% { opacity: 100% }
}

// Menu default hide.
// When show, created by scripts.
.hide-menu { display: none; }
.show-menu {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;

  animation-name: show-menu;
  animation-duration: 100ms;
}
@keyframes show-menu {
  0% { opacity: 0; }
  100% { opacity: 100%; }
}
</style>
