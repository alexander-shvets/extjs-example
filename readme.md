Alphabet ExtJS ES6 application
------------------------------

### Demo

https://alexander-shvets.github.io/extjs-example/dist/

### Task

We would like to ask you to create SPA (Single Page Application) using ExtJS framework version 4.2.x.

Page layout contains 2 parts: left and right. By default the left part should take 35% of horizontal viewport size. Page layout should be adaptive and grow/shrink when a viewport size changes. The left part should contain a tree and the right should contain a grid (Ext.grid.Panel).

The tree should contain a root node named "English alphabet" and 10 children each named after the first 10 English alphabet letters (A, B, C, D, E, F, G, H, I, J) sorted ascending.

The grid should contain the rest of the letters (16 rows). Each row should have exactly one english letter in an "English letter" column starting from letter "K" and to the end of the alphabet sorted descending.

Make the tree and the grid support drag'n'drop of letters from the grid to the tree and back from the tree to the grid.

Application must provide an ability to add/delete missing letters into the tree/grid.

The grid would have two columns:

1. Checkbox selection column, with multiselect allowed.
2. "English letter" column, presenting an English alphabet letter.

The grid footer should contain a toolbar with two buttons: “Add” and “Delete”.
“Add” button click should open a dialog window proposing to select/enter a letter to be added. The dialog window should contain validation. The letter would be inserted into the grid preserving grid sort order. “Add” button should be disabled if another letter addition is not possible. “Delete” button deletes selected letters from the grid.

The tree should have context menu with two items: “Add”, “Delete”, doing the same actions as the grid corresponding buttons.

### Release notes

#### UI/UX

__Review__

1. Adding many (about 10) letters to list isn't usable. User need to do a lot of repetitive actions.
2. Moving letters from grid into a tree and back realized only through the drag'n'drop, it is desirable to duplicate this functionality more obvious way, for example through the toolbar and context menu.
3. There is no way to delete / add letters into the Tree directly (only through the grid and drag'n'drop).
4. Modal windows is not in the trend now :)

__Updates__

In order to fix some usability issues, I've updated UI:

1. Add Letter form moved to toolbar, instead of creating modal dialog with this form each time. Now users can add many letters, just by pressing Add button again and again.
2. Added "Move to Grid/Tree ->" tooltips when start dragging a letter.

#### Technical note

Wrote in ES6 version of JavaScript (used object notation, arrows and const/let), [supported by all major browsers](http://caniuse.com/#search=es6), tested in Chrome.

Can be easily transpiled to ES5 by babel:

    npm install
    npm run build
