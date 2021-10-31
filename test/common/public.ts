// This file contains const variables that will be used in various vue components.

/**
 * Path of the assets folder from the root.
 */
export const ASSETS_PATH = "/test/assets/"

/**
 * Play and pause icon path
 */
export const ICON_PATH = {
  play: ASSETS_PATH + "play.svg",
  pause: ASSETS_PATH + "pause.svg"
}

/**
 * Init a prototype of HTMLMediaElement of whether it is playing.
 */
export function defineMediaPlayingJudgement() {
  Object.defineProperty(HTMLMediaElement.prototype, 'isPlaying', {
    get: function(){
      return (this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2)
    }
  })
}
