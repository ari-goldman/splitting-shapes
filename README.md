# [https://splitting-shapes.ari-goldman.xyz/](https://splitting-shapes.ari-goldman.xyz/)

A first experience with HTML, CSS, and JavaScript

For some reason, it now shifts up in the DOM after a few seconds on Chrome... won't get around to fixing it though :(

Learned many things, like:
1. don't use .innerHTML on elements
2. Object.assign() to change properties and such
3. Try to avoid changing/creating inline css via javascript, instead change the element's class or data!
4. use `await new Promise(r => setTimeout(r, ms))` to delay actions by an amount
    * set ms to 0 to delay by a tick so animating of an element is shown
