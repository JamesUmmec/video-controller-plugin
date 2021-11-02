<template>
  <div id="pad" ref="pad">
    <!-- icon mode -->
    <div id="icon" class="center"
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
      iconImageClass: "",

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
        } else {
          // TODO click and show menu
        }
      }, MOUSEDOWN_DELAY)
    },

    clearMousedown(event: MouseEvent) {
      this.mousedown = false
      this.iconImageClass = ""

      // Optimization for better quality.
      if (document.onmousemove) {
        document.onmousemove = null

        // Shift mode into bottom
        this.padDom.style.top = (event.clientY - this.referencePosition.top) + "px"
        this.padDom.style.position = "fixed"
      }
    },
    preventDefault(event: Event) { event.preventDefault() }
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
  user-select: none;

  // Use bottom rather than top for position style description:
  // not only because convenient for style sheet,
  // but also avoid condition that the control button get outside of the screen
  // when resizing the webpage.
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

// Menu default hide.
// When show, created by scripts.
#menu { display: none; }
</style>
