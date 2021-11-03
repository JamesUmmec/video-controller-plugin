<template>
  <div id="full">
    <header>
      <div id="display" class="single-line" v-text="text" v-bind:class="textClass"/>

      <div id="pin" class="center">
        <div class="center" v-bind:class="pinClass" @click="pinClick">
          <img alt="" src="../assets/pin.svg"/>
        </div>
      </div>
    </header>

    <article ref="article" class="hide-scroll"></article>

    <footer class="center">
      <div v-bind:class="reloadClass" @click="reloadClick">刷新 Reload</div>
    </footer>
  </div>
</template>

<script lang="ts">
import {createApp, defineComponent} from "vue"
import VideoController from "./VideoController.vue"

export default defineComponent({
  name: "Menu",
  components: {VideoController},
  data() {
    return {
      pinClass: "unpin",
      textClass: "show",
      reloadClass: "show",
      text: "加载中 Loading...",
      controllers: [],

      /** Avoid calling id. */
      articleDom: undefined as unknown as HTMLDivElement
    }
  },
  mounted() {
    this.articleDom = this.$refs.article as HTMLDivElement
    this.refresh()
  },
  methods: {
    /** initialize is also a kind of refresh. */
    refresh() {
      // Clean before create new
      this.articleDom.innerHTML = ""

      let videos = document.getElementsByTagName("video")

      // UI display effect
      setTimeout(() => {
        this.textClass = "hide"
        setTimeout(() => {
          this.text = `${videos.length}个视频 / ${videos.length} videos`
          this.textClass = "show"
        }, 350)
      }, 350)

      for (let index = 0; index < videos.length; index++) {
        let controller = document.createElement("div")
        createApp(
          VideoController, {
            index: index,
            videoObject: videos[index]
          }
        ).mount(controller)
        this.articleDom.appendChild(controller)
      }
    },

    /** pin or unpin, and call parent variable to check state */
    pinClick() {
      // @ts-ignore
      if (this.$parent.menuPin) {
        // @ts-ignore
        this.$parent.menuPin = false
        this.pinClass = "unpin"
      } else {
        // @ts-ignore
        this.$parent.menuPin = true
        this.pinClass = "pin"
      }
    },

    reloadClick() {
      this.textClass = "hide"
      setTimeout(() => {
        // Speed here is not necessary, animation effect is more important. 233
        this.refresh()
        this.text = "加载中 Loading..."
        this.textClass = "show"
      }, 350)
    }
  }
})
</script>

<style scoped lang="scss">
@import "../common/common";

$header-height: 2.65rem;
$footer-height: 2.35rem;

#full {
  width: 100%;
  height: 100%;
  overflow: hidden;

  header, article, footer {
    width: 100%;
    position: absolute;
  }
  header { height: $header-height; }
  footer {
    height: $footer-height;
    bottom: 0;
  }
  article {
    top: $header-height;
    bottom: $footer-height;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}

header {
  $pin-rate: 0.45;
  border-bottom: solid 0.5px #cdcdcd;
  z-index: 100;

  > div {
    position: absolute;
    height: 100%;
  }

  #display {
    line-height: $header-height;
    left: $header-height*0.5;
    right: $header-height;
  }

  #pin {
    width: $header-height;
    right: 0;
    > div {
      width: $header-height*$pin-rate;
      height: $header-height*$pin-rate;
      border-radius: $header-height*$pin-rate*0.5;

      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .unpin {
    border: solid 0.5px $btn-highlight;
    transition: all 325ms;
    &:hover {
      background-color: $btn-highlight;
      transition: all 325ms;
      > img {
        filter: brightness(185%);
        transition: all 325ms;
      }
    }
  }

  .pin {
    background-color: $btn-bg;
    transition: all 325ms;
    > img {
      filter: brightness(185%);
      transition: all 325ms;
    }
  }
}

footer > div {
  padding: 0.2rem 0.8rem;
  border-radius: 100rem;
  border: solid 0.5px $btn-highlight;
  transition: all 235ms;
  &:hover {
    background-color: $btn-highlight;
    color: #dedede;
    transition: all 235ms;
  }
}

// animation on show or hide the items
.hide {
  opacity: 0;
  transition: opacity 325ms;
}
.show {
  opacity: 100%;
  transition: opacity 325ms;
}
</style>
