Cvirio
======

An idea of how to make a CV a little less boring.

Setup
-----


1. Make sure you have Grunt-cli installed globally, if not, then run:
    ```bash
    $ npm install -g grunt-cli
    ```
1. Basically download repo by either `$ git clone` or simply as a ZIP archive and unpack it
1. Run in project's root directory:
    ```bash
    $ npm i
    ```
1. BOOM! you're done :)

Development
-----------

If you need to change anything, then you'll be interested in one of those dirs:

* `src/` which contains all game related scripts (so actually only `*.js` files)
* `public/` which contains all the other files without which webpage/game woudln't work


### Important
Don't modify anything in `dist/` directory because it's removed with all it's contents and generated again on almost all exposed `grunt` tasks, like below mentioned `grunt serve` or `grunt build`

Run with livereload
-------------------

In projects root directory, after **Setup**, run command:
```bash
$ grunt serve
```

or

```bash
$ npm run serve
```

Then go to your favourite browser and open http://localhost:8000/ which is default URL (you can change it in `Gruntfile.js` if you need)

Building
--------

In projects root directory, after **Setup**, run command:
```bash
$ grunt build
```

or

```bash
$ npm run build
```



