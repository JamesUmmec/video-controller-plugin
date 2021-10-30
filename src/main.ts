import { createApp } from 'vue'
import App from './App.vue'

// Create an element into the document and mount the root onto this element.
let app = document.createElement("div")
document.body.appendChild(app)
createApp(App).mount(app)
