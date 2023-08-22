/* ---------- Start Variables ---------- */

let filterBtns = document.querySelectorAll('.portfolio-nav button'),
    images = Array.from(document.querySelectorAll('.portfolio-content .portfolio-item'));

let zoomIcons = document.querySelectorAll('.portfolio-item .item-text .icons .zoom-icon');

let lightboxContainer = document.getElementById('lightbox-container');

let lightBox = document.getElementById('lightbox'),
    closeBtn = document.getElementById('close-lightbox'),
    mainPrev = document.getElementById('main-prev'),
    mainNext = document.getElementById('main-next');

let mainImageDiv = document.getElementById('main-div'),
    mainImage = document.createElement('img'),
    mainVideo = document.createElement('video'),
    icons = document.createElement('div'),
    prevIcon = document.createElement('div'),
    nextIcon = document.createElement('div'),
    smallPrev = document.createElement('img'),
    smallNext = document.createElement('img');

let currentPort = 1, currentImage = 0, sideImages = [];

mainImage.setAttribute('id', 'main-image');
mainVideo.setAttribute('id', 'main-video');
mainVideo.loop = true;
icons.setAttribute('class', 'icons');
prevIcon.setAttribute('class', 'prev');
nextIcon.setAttribute('class', 'next');

Object.assign(smallPrev, {
    src: 'images/prev.svg',
    className: 'item-img',
    id: 'small-prev'
})

Object.assign(smallNext, {
    src: 'images/next.svg',
    className: 'item-img',
    id: 'small-next'
})

prevIcon.appendChild(smallPrev);
nextIcon.appendChild(smallNext);

icons.append(prevIcon, nextIcon)

/* ---------- End Variables ---------- */

filterBtns[0].classList.add('btn-clicked')

for (i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', filterImg)
}

for (i = 0; i < images.length; i++) {
    images[i].setAttribute('port-image', i + 1);
}

/* ---------- */

for (i = 0; i < zoomIcons.length; i++) {
    zoomIcons[i].setAttribute('port-index', i + 1);
    zoomIcons[i].addEventListener('click', openLightbox);
}

closeBtn.addEventListener('click', closeLightbox);
mainPrev.addEventListener('click', prevImage);
mainNext.addEventListener('click', nextImage);

/* ---------- Create side images list ----------*/

let listImages = document.createElement('div');
listImages.setAttribute('class', 'list-images');
listImages.setAttribute('id', 'list-images');

for (i = 0; i < 6; i++) {
    let sideImage = document.createElement('img');
    sideImage.setAttribute('class', 'item-img');
    sideImage.setAttribute('src', '');
    sideImages.push(sideImage)
    listImages.appendChild(sideImage)
}

smallPrev.addEventListener('click', goToPrev);
smallNext.addEventListener('click', goToNext);

sideImages.forEach(function (sideImg) {
    sideImg.addEventListener('click', function () {
        mainImage.src = `${sideImg.getAttribute('src')}`
    })
})

/* ---------- Start Functions ---------- */

function activeButton(el) {
    filterBtns.forEach(function (btn) {
        btn.classList.remove('btn-clicked');
    })
    el.target.classList.add('btn-clicked')
}

function filterImg(el) {
    activeButton(el);
    images.forEach(function (img) {
        img.classList.remove('img-shrink');
        img.classList.add('img-expand');
        //     // Get data from data buttons and images
        const btnData = el.target.dataset.btn,
            imgData = img.getAttribute('data-category');
        //     // If image data and clicked button data are NOT the same
        if (imgData !== btnData) {
            // Hide image
            img.classList.add('img-shrink');
            img.classList.remove('img-expand');
            img.classList.remove('filter-img');
        }
        if (imgData === btnData || btnData === 'all') {
            img.classList.remove('img-shrink');
            img.classList.add('img-expand');
            img.classList.add('filter-img');
        }
    })
}

/* ---------- */

let x, y, myIndex;

let imgSrc = `images/${myIndex}/0.jpg`;

function changeImg() {
    x = images[parseInt(currentPort) - 1].children[0].getAttribute('src'),
        y = x.split('/')[1],
        myIndex = y.substring(0, y.length - 4);
    if (myIndex.substring(0, myIndex.length - 2) === 'animation') {
        mainImage.remove();
        mainImageDiv.appendChild(mainVideo)
        mainVideo.setAttribute('src', `images/${myIndex}/animation.mp4`);
        mainVideo.play()
    } else {
        mainImageDiv.appendChild(mainImage);
        mainVideo.remove();
        mainImage.setAttribute('src', `images/${myIndex}/0.jpg`)
    }
    if (images[parseInt(currentPort) - 1].getAttribute('data-category') !== 'animation') {
        lightboxContainer.appendChild(listImages);
    } else {
        listImages.remove();
    }
}

function openLightbox() {
    currentPort = parseInt(this.getAttribute('port-index'));
    lightBox.style.transform = 'scale(1)';

    x = images[parseInt(currentPort) - 1].children[0].getAttribute('src'),
        y = x.split('/')[1],
        myIndex = y.substring(0, y.length - 4);

    if (myIndex.substring(0, myIndex.length - 2) === 'animation') {
        mainImage.remove();
        mainImageDiv.appendChild(mainVideo);
        mainVideo.setAttribute('src', `images/${myIndex}/animation.mp4`);
        mainVideo.play();
        icons.remove();
    } else {
        mainImageDiv.appendChild(mainImage);
        mainVideo.remove();
        mainImage.setAttribute('src', `images/${myIndex}/0.jpg`);
        mainImageDiv.appendChild(icons);
    }

    if (images[parseInt(currentPort) - 1].getAttribute('data-category') !== 'animation') {
        lightboxContainer.appendChild(listImages);
    } else {
        listImages.remove();
    }

    for (i = 0; i < 6; i++) {
        sideImages[i].src = mainImage.getAttribute('src').split('/')[0] + '/' + mainImage.getAttribute('src').split('/')[1] + '/' + `${i}.jpg`
    }
}
function closeLightbox() {
    lightBox.style.transform = 'scale(0)';
    mainVideo.pause();
}

function prevImage() {
    currentPort -= 1;
    if (currentPort < 1) {
        currentPort = images.length;
    }
    if (images[parseInt(currentPort) - 1].getAttribute('data-category') !== 'animation') {
        lightboxContainer.appendChild(listImages);
    } else {
        listImages.remove();
    }
    x = images[parseInt(currentPort) - 1].children[0].getAttribute('src'),
        y = x.split('/')[1],
        myIndex = y.substring(0, y.length - 4);
    if (myIndex.substring(0, myIndex.length - 2) === 'animation') {
        mainImage.remove();
        mainImageDiv.appendChild(mainVideo)
        mainVideo.setAttribute('src', `images/${myIndex}/animation.mp4`);
        mainVideo.play();
        icons.remove();
    } else {
        mainImageDiv.appendChild(mainImage);
        mainVideo.remove();
        mainImage.setAttribute('src', `images/${myIndex}/0.jpg`)
        mainImageDiv.appendChild(icons);
    }
    if (images[parseInt(currentPort) - 1].getAttribute('data-category') !== 'animation') {
        lightboxContainer.appendChild(listImages);
    } else {
        listImages.remove();
    }
    for (i = 0; i < 6; i++) {
        sideImages[i].src = mainImage.getAttribute('src').split('/')[0] + '/' + mainImage.getAttribute('src').split('/')[1] + '/' + `${i}.jpg`
    }
}
function nextImage() {
    currentPort += 1;
    if (currentPort > images.length) {
        currentPort = 1;
    }
    x = images[parseInt(currentPort) - 1].children[0].getAttribute('src'),
        y = x.split('/')[1],
        myIndex = y.substring(0, y.length - 4);
    if (myIndex.substring(0, myIndex.length - 2) === 'animation') {
        mainImage.remove();
        mainImageDiv.appendChild(mainVideo)
        mainVideo.setAttribute('src', `images/${myIndex}/animation.mp4`);
        mainVideo.play();
        icons.remove();
    } else {
        mainImageDiv.appendChild(mainImage);
        mainVideo.remove();
        mainImage.setAttribute('src', `images/${myIndex}/0.jpg`)
        mainImageDiv.appendChild(icons);
    }
    if (images[parseInt(currentPort) - 1].getAttribute('data-category') !== 'animation') {
        lightboxContainer.appendChild(listImages);
    } else {
        listImages.remove();
    }
    for (i = 0; i < 6; i++) {
        sideImages[i].src = mainImage.getAttribute('src').split('/')[0] + '/' + mainImage.getAttribute('src').split('/')[1] + '/' + `${i}.jpg`
    }
}

/* ---------- */

let imageIndex;

function goToPrev() {
    currentImage -= 1;
    if (currentImage < 0) {
        currentImage = 5;
    }
    imageIndex = mainImage.getAttribute('src').split('/')[2];
    imageIndex = `${currentImage}.jpg`;
    mainImage.src = mainImage.getAttribute('src').split('/')[0] + '/' + mainImage.getAttribute('src').split('/')[1] + '/' + imageIndex;

}
function goToNext() {
    currentImage += 1;
    if (currentImage > 5) {
        currentImage = 0;
    }
    imageIndex = `${currentImage}.jpg`;
    mainImage.src = mainImage.getAttribute('src').split('/')[0] + '/' + mainImage.getAttribute('src').split('/')[1] + '/' + imageIndex
}

/* ---------- End Functions ---------- */