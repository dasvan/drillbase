// footer
function handleScroll() {
    let footer = document.querySelector(".footer");
    let positionFooter = footer.getBoundingClientRect();
    if (positionFooter.top <= window.innerHeight) {
        footer.classList.add("vision");
    } else {
        footer.classList.remove("vision");
    }
}

document.addEventListener('scroll', handleScroll);

let go = document.querySelector('.goPay');

// displayModal And blackMode
let donat = document.querySelector('.footer');
let modal = document.querySelector('.modal');
let modalOverlay = document.querySelector('.modal-overlay');

let backgroundCols = document.querySelectorAll('.backgroundCol-black');
let blackTheme = document.querySelectorAll('.black-theme');
let svgs = document.querySelectorAll('svg');

function displayModalAndBlackMode() {
    // blackMode
    if (body.classList.contains("body-black")) {
        modal.classList.add('modal-dark');
        backgroundCols.forEach(backgroundColsItem => backgroundColsItem.classList.add('modal-head'));
        blackTheme.forEach(blackThemeItem => blackThemeItem.classList.add('copy-black'));
        svgs.forEach(svg => svg.classList.add('svg-black'));
        go.setAttribute('fill', '#a1a1a1')
    } else {
        modal.classList.remove('modal-dark');
        backgroundCols.forEach(backgroundColsItem => backgroundColsItem.classList.remove('modal-head'));
        blackTheme.forEach(blackThemeItem => blackThemeItem.classList.remove('copy-black'));
        svgs.forEach(svg => svg.classList.remove('svg-black'));
        go.setAttribute('fill', 'black');
    }
    // displayModal
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
}

donat.onclick = displayModalAndBlackMode;


// closeModal from button
let btnClose = document.querySelector('.btn-close');

function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
}

btnClose.onclick = closeModal;

// closeModal from click on overlay
modalOverlay.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.classList.add('hidden');
        modalOverlay.classList.add('hidden');
    }
});

// copyTel
let siteLink = document.getElementById('siteLink');
let copy = "M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z";
let done = "M6 15L8 17L12.5 12.5M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z";

// copyLink
let link = document.querySelector('.link');
let linkPath = document.querySelector('.telLink');

function copyLink() {
    linkPath.setAttribute('d', done);
    navigator.clipboard.writeText(siteLink.textContent);
    setTimeout(() => {
        linkPath.setAttribute('d', copy)
    }, 1500)
}

link.onclick = copyLink;

// hidden and vision header on scroll
document.addEventListener('scroll', () => {
    if (window.innerWidth <= 467) {
        header.forEach(headerItem => {
            if (window.scrollY >= 80) {
                headerItem.classList.add('header-hidden');
                paragraph.forEach(paragraphItem => paragraphItem.classList.add('paragraph-vision'));
            } else {
                headerItem.classList.remove('header-hidden');
                paragraph.forEach(paragraphItem => paragraphItem.classList.remove('paragraph-vision'));
            }
        })
    }
});

// run text paragraph
// window.addEventListener('scroll', function () {
//     let currentHeight = window.scrollY;
//     let siteHeight = document.documentElement.scrollHeight;
//     let width = (currentHeight / (siteHeight - window.innerHeight) * 100).toFixed(1);
//     let textRun = document.querySelector('.par');
//     width = width + '%';
//     console.log(width);
//     textRun.style.setProperty("--width", width);
//     console.log(`currentHeight: ${currentHeight}///siteHeight: ${siteHeight}///width: ${width}`);
// });

window.addEventListener('scroll', function () {
    let currentHeight = window.scrollY;
    let siteHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;
    let width = (currentHeight / (siteHeight - windowHeight) * 100).toFixed(1);
    width = width + '%';
    runnerLine.forEach( runnerLineItem => {
        runnerLineItem.style.width = width
    });
});
