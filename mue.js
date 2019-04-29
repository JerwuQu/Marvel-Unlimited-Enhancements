// ==UserScript==
// @name         Marvel Unlimited Enhancements
// @namespace    https://ramse.se/
// @version      0.5
// @description  Better UX
// @author       Marcus Ramse
// @match        https://read.marvel.com/
// @grant        GM_addStyle
// @downloadURL  https://raw.githubusercontent.com/JerwuQu/Marvel-Unlimited-Enhancements/master/mue.js
// ==/UserScript==
/* eslint no-multi-spaces: 0 */

// Style
GM_addStyle(`
.mue-hidden {
    display: none !important;
}

.mue-nocursor {
    cursor: none !important;
}

.mue-help {
    position: fixed;
    z-index: 999;
    top: calc(50% - 10em);
    left: calc(50% - 20em);
    width: 40em;
    background-color: #ffffffcc;
    padding: 2em;
    border: 1px solid #333;
    pointer-events: none;
}
`);

// Hotkeys
var MU_KEYS = {
    left:       37,   // left arrow
    right:      39,   // right arrow
    smart:      83,   // s
    zoom:       90,   // z
    fullscreen: 122,  // f11
};

var MUE_KEYS = {
    advance:    32,   // space
    cursor:     67,   // c
    help:       72,   // h
    library:    76,   // l
    nextIssue:  78,   // n
    toggleUI:   84,   // t
};

// Create help window
var mueHelp = document.createElement('div');
mueHelp.innerHTML = `
<div class="mue-help mue-hidden">
    <h2>Default hotkeys</h2>
    <div><strong>Left</strong> - Previous page</div>
    <div><strong>Right</strong> - Next page</div>
    <div><strong>S</strong> - Smart mode (toggle)</div>
    <div><strong>Z</strong> - Zoom (toggle)</div>
    <div><strong>F11</strong> - Fullscreen (toggle)</div>
    <br />
    <h2>MUE hotkeys</h2>
    <div><strong>Space</strong> - Next page</div>
    <div><strong>C</strong> - Hide the cursor (toggle)</div>
    <div><strong>H</strong> - Show this help (toggle)</div>
    <div><strong>L</strong> - Return to My Library</div>
    <div><strong>N</strong> - Next issue</div>
    <div><strong>T</strong> - Disable default UI (toggle)</div>
</div>
`;
document.body.appendChild(mueHelp);

// Help functions
function simulateKey(keyCode) {
    document.body.dispatchEvent(new KeyboardEvent('keydown', {
        which: keyCode,
        keyCode: keyCode,
        bubbles: true
    }));
}

// Bind MUE hotkeys
document.body.addEventListener('keydown', function(e) {
    switch (e.which) {
        case MUE_KEYS.advance:
            simulateKey(MU_KEYS.right);
            break;
        case MUE_KEYS.cursor:
            document.body.classList.toggle('mue-nocursor');
            break;
        case MUE_KEYS.help:
            document.querySelector('.mue-help').classList.toggle('mue-hidden');
            break;
        case MUE_KEYS.library:
            window.location.href = 'https://www.marvel.com/my_account/my_must_reads';
            break;
        case MUE_KEYS.nextIssue:
            // todo: keep toggles
            window.location.href = 'https://read.marvel.com/#book/' +
                document.querySelector('[data-nextid]').getAttribute('data-nextid');
            location.reload();
            break;
        case MUE_KEYS.toggleUI:
            document.querySelector('section#header').classList.toggle('mue-hidden');
            document.querySelector('section#footer').classList.toggle('mue-hidden');
            break;
        default:
            return;
    }

    e.preventDefault();
    e.stopPropagation();
});
