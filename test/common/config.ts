// Configuration file about data such as text displayed on popups
// and configurations about random pause.

/**
 * Texts used in popup windows here for convenient edit.
 * All paragraphs in the text should be wrapped by <p> tag !!!
 *
 * 1. beginning: popup when loading the page.
 * 2. paused: when random paused, let user to click to play.
 * 3. success: mention user you have finished the video already.
 */
export const POPUP_TEXTS = {
  beginning:
      "<p>为了确保观看的足够“认真”，本视频将限制拖动进度条以及倍速，" +
      "并且每隔大约3秒就会自动暂停一次。</p>" +
      "<p>You cannot drag the process bar or speed up. " +
      "And the video will automatically pause every about 3 seconds, " +
      "in order to make sure you are watching the whole video carefully.</p>",
  paused: "<p>视频已经暂停，如需继续观看请先点击按钮。</p>" +
      "<p>The video is paused, please click the button before continue watching.</p>",
  success: "<p>恭喜你，视频已经完成播放，点击按钮即可刷新网页重新尝试一次。</p>" +
      "<p>Congradulations! You've already finished watching that video." +
      "You can click the button to reload the page to test again.</p>"
}

/**
 * Every how long time will it stop for asking user click button.
 * Attention that the unit is milliseconds !!!
 */
export const RANDOM_PAUSE = {
  minDuration: 2500,
  maxDuration: 3500
}

/**
 * Texts displayed on the header router area.
 */
export const HEADER_ROUTER_TEXT = {
  raw: "此页面未嵌入插件，点击按钮转到嵌入插件的页面。" +
      "This page did not embedded the plugin. Click the button to view which with the plugin.",
  plugin: "此页面已经内置插件，点击按钮转到不含插件的页面。" +
      "This page embedded the plugin already. Click the button to view raw page which did not."
}
