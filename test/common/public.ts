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
    get: function() {
      return (this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2)
    }
  })
}

/**
 * Format time from seconds (even float type) into "HH:mm:ss" or "mm:ss" display format.
 * @param rawSeconds
 */
export function formatTime(rawSeconds: number): string {
  let hours = Math.floor(rawSeconds/3600)
  let minutes = Math.floor(rawSeconds/60%60)
  let seconds = Math.floor(rawSeconds%60)

  let formatSeconds = seconds<10 ? "0"+seconds : seconds

  if(hours>0) {
    let formatMinutes = minutes<10 ? "0"+minutes : minutes
    return `${hours}:${formatMinutes}:${formatSeconds}`
  } else {
    return `${minutes}:${formatSeconds}`
  }
}
