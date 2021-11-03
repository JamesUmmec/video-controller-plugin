<template>
  <div id="full">
    <header>
      <!-- TODO: when change content, transparent and recover -->
      <div id="display" v-text="text"/>

      <div id="pin" class="center">
        <div class="center" v-bind:class="pinClass" @click="pinClick">
          <img alt="" src="../assets/pin.svg"/>
        </div>
      </div>
    </header>

    <article></article>

    <footer class="center">
      <div>刷新 Reload</div>
    </footer>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "Menu",
  data() {
    return {
      pinClass: "unpin",
      text: "加载中 loading...",
      controllers: []
    }
  },
  mounted() {
    this.refresh()
  },
  methods: {
    /** initialize is also a kind of refresh. */
    refresh() {
      let videos = document.getElementsByTagName("video")
    },
    pinClick() {
      // TODO call outer component pin variable, get and set.
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
    background-color: antiquewhite;
    overflow-y: scroll;
  }
}

header {
  $pin-rate: 0.45;
  > div {
    position: absolute;
    height: 100%;
  }

  #display {
    line-height: $header-height;
    left: $header-height*0.5;
    right: $header-height;
    /* TODO text in single line and ellipse */
  }

  #pin {
    width: $header-height;
    right: 0;
    > div {
      width: $header-height*$pin-rate;
      height: $header-height*$pin-rate;
      border-radius: $header-height*$pin-rate/2;

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
</style>
