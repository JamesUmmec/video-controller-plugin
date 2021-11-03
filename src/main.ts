import { createApp } from 'vue'
import App from './App.vue'

let mounted = false
// Check every second, if there are video in the dom, then launch the plugin.
setInterval(() => {
  if (document.getElementsByTagName("video").length > 0 && !mounted) {
    mounted = true

    // Create an element into the document and mount the root onto this element.
    let plugin = document.createElement("div")
    document.body.appendChild(plugin)
    createApp(App).mount(plugin)
  }
}, 1000)
