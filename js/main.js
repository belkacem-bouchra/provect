let hamburger = document.getElementById('humberger-menu');

let navLinks = document.querySelectorAll('#nav-list li a');

let mainList = document.getElementById('main-links');
let theList = document.getElementById('main-list');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    if (hamburger.classList.contains('active')) {
        mainList.style.visibility = 'visible';
        theList.style.transform = 'translate(0)';
    } else {
        mainList.style.visibility = 'hidden';
        theList.style.transform = 'translate(-100%,0)';
    }
})

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        this.classList.add('active');
        hamburger.classList.remove('active');
        mainList.style.visibility = 'hidden';
        theList.style.transform = 'translate(-100%,0)';
    })
})

/* ---------- Start typewrite function ---------- */

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const phrases = ['Graphic Designer ...', 'Frontend Developer ...'],
    el = document.getElementById('typewriter');
let sleepTime = 100,
    currPhraseIndex = 0;

const writeLoop = async () => {
    while (true) {
        let curWord = phrases[currPhraseIndex];
        for (let i = 0; i < curWord.length; i++) {
            el.innerHTML = curWord.substring(0, i + 1);
            await sleep(sleepTime);
        }
        await sleep(sleepTime * 10);
        for (let i = curWord.length; i > 0; i--) {
            el.innerHTML = curWord.substring(0, i - 1);
            await sleep(sleepTime);
        }
        if (currPhraseIndex === phrases.length - 1) {
            currPhraseIndex = 0;
        } else {
            currPhraseIndex++
        }
    }
}
writeLoop();

/* ---------- End typewrite function ---------- */
