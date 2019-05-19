<<<<<<< HEAD
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
  * Includes Normalise.scss above all css
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
  
## Installation

1. Open **VS Code** and traverse to the folder you want to put your project in.
2. Right click the folder name and _open with terminal_
3. In the terminal window, type `git clone https://github.com/Showcase-Joz/barebones-v4.git`

**OR** Download the repo - [https://github.com/Showcase-Joz/barebones-v4.git](https://github.com/Showcase-Joz/barebones-v4.git) to a suitable folder on your system.

Move into the dir **cd barebones-v4** then type **npm install** to add the dependancies locally.

## Usage

You need to install the packages before you can use the repo. Go into the working directory using command **cd barebones-v4** then type **npm install** to add the packages to your local installation. Then you can use one of four commands out of the box:

For a list of gulp commands try typing **gulp --tasks** to see a tree listing of what each task does. Alternatively, here is a billy-basics breakdown...

### gulp init

Using _gulp init_ as your command will run the following sequence of tasks:
1. Clean the _dist_ directory (if ir exists).
2. Build an instance of the _dist_ directory, with the basic file structure.
3. Watch all the file/folder(s) for updates/additions within the _src_ folder.
4. Run BrowserSync, initiating the live server instance across your development devices. 

### gulp build

Using _gulp build_ as your command will run the following sequence of tasks:
1. Clean the _dist_ directory (if ir exists).
2. Build an instance of the _dist_ directory, with the basic file structure.

### gulp watch

Using _gulp watch_ as your command will run the following sequence of tasks:
1. Watch all the file/folder(s) for updates/additions within the _src_ folder.

### gulp clean

Using _gulp clean_ as your command will run the following sequence of tasks:
1. Clean the _dist_ directory (if it exists).

---
test
=======
# t4tf
tab4thefallen website
>>>>>>> a56561102f18407d7cb14d42fb773222d7d47a7e
