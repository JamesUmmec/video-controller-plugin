# Video Controller Plugin
A plugin to get more control over videos in the webpages,
with the following functions:

1. Force playing the video.
2. Force stopping the video.
3. Stepless speed regulation.
4. Show you where the video is.
5. Control all videos in the page in a single pad.

## How to use
Download the releases.
Chrome version for Chrome and Edge,
Firefox version for Firefox.
Once install the plugin,
when there are videos in your page,
the control button will appear.

It's not convenient for the author to upload this plugin onto
platforms such as plugin store of chrome or firefox,
so before the author done that,
just install the plugin in development mode of your browser.

## Project structure
This project uses `vite2` as dev and build tool, and use `components` of `vue3` as basic framework.
As for the languages, this project uses `ts` and `scss`.
- `public` as vite default structure, only an icon image here.
- `scripts` source of `manifest.json` file for different platforms.
- `src` where the plugin locates.
- `test` a test page for testing the plugin.

### Output folder
The output folder is not `dist` like `vite` default.
The plugin will be output into the `plugin` folder
(which had been ignored by git).
Process of copying into zip files and rename
will still be done manually.
