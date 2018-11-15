# barebones-v4
_gulp v4, babel es6, scss, optimised images_


> This repo is a boilerplate for your next web project. Allowing you to get up and coding out the views/pages sooner with live updating.

Having finally worked out what and why **Gulp** is awesome; sometime last year. I had the recent horror of realising that _Gulp **v4**_ was out and re-written, meaning that all my tasks would break when I tried to use them with the new version (4) of Gulp.

So I finally found a day to go through the documentation and try to upgrade my Gulp workflow into the new **v4** methods. I actually relied on @jeromecoupe for a lot of the groundwork and tweaked the end result to something that worked for barebones.

---

## What's in the box?

This **Barebones** project template will give you the following functionality right out of the box:

* **Images**
  * Watch and treat each image type _[gif | jgp | png | svg]_
* **CSS**
  * Watches all SCSS files under the source SCSS folder
  * Prefixes the last 2 versions
  * Add's **CSS Grid** support for -ms-
  * Compresses all _SCSS_ partials
  * Renames with .min.css
  * Writes source map
* **Scripts**
  * Watches all JS files under the source JS folder
  * Transpiles ES6 to ES5
  * Creates output file _main.min.js_ adding all JS files to this one
  * Minifies the output file
  * Writes source map
  
  ---
  
