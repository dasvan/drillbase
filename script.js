// change mode
let header = document.querySelectorAll(".header-line");
let body = document.querySelector("body");
let buttons = document.querySelectorAll(".buttonAll");
let iconMode = document.querySelectorAll(".icon-mode");
let modePar = document.querySelectorAll('.mode span');
let moon = 'M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z';
let sun = 'M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z';
let mode = document.querySelectorAll('.mode');
let grid = document.querySelectorAll(".grid");
let paragraph = document.querySelectorAll(".paragraph");
let footer = document.querySelectorAll(".footer");
let plays = document.querySelectorAll(".play");
let oneFoot = document.querySelectorAll(".one-foot");
let p = document.querySelectorAll(".amount-p");
let bodyItem = document.querySelectorAll(".body-items");
let input = document.querySelectorAll("input");
let twins = document.querySelectorAll(".twins");
let twinsParagraph = document.querySelectorAll(".twins-item");
let select = document.querySelectorAll("select");
let goUp = document.querySelectorAll(".toUp");
let logo = document.querySelector(".logo");
let mailAdd = document.querySelector(".mail");
let listHead = document.querySelectorAll('.termins-list-item-head');
let listDescription = document.querySelectorAll('.termins-list-item-description');
let runnerLine = document.querySelectorAll('.bottomLinePage');
let donats = document.querySelectorAll('.donat');

function changeTheme() {

    if (body.classList.contains("body-black")) {
        body.classList.remove("body-black");
        localStorage.setItem("theme", "light");
        header.forEach(headerItem => headerItem.classList.remove("header-black"));
        bodyItem.forEach(itemBody => itemBody.classList.remove("body-items-black"));
        buttons.forEach(buttonsItem => buttonsItem.classList.remove("button-black"));

        iconMode.forEach(iconModeItem => {
            iconModeItem.setAttribute("fill", "#666666");
            iconModeItem.setAttribute("d", moon);
            }
        );
        modePar.forEach(modeParItem => modeParItem.textContent = 'dark mode');

        grid.forEach(gridItem => gridItem.classList.remove("grid-black"));
        plays.forEach(playItem => playItem.classList.remove("play-dark"));
        paragraph.forEach(paragraphItem => paragraphItem.classList.remove("paragraph-black"));
        footer.forEach(footerItem => footerItem.classList.remove("footer-black"));
        donats.forEach(donatItem => donatItem.classList.remove("donat-black"));
        oneFoot.forEach(oneFootItem => oneFootItem.classList.remove("one-foot-black"));
        p.forEach(pItem => pItem.classList.remove("amount-p-black"));
        input.forEach(inputItem => inputItem.classList.remove("input-black"));
        twins.forEach(twinItem => twinItem.classList.remove("twins-black"));
        twinsParagraph.forEach(twinsParagraph => twinsParagraph.classList.remove("twins-black-item"));
        select.forEach(selectItem => selectItem.classList.remove("select-black"));
        goUp.forEach(toUPItem => toUPItem.classList.remove("toUp-black"));
        listHead.forEach(listHeadItem => listHeadItem.classList.remove("termins-list-item-head-black"));
        listDescription.forEach(listDescriptionItem => listDescriptionItem.classList.remove("termins-list-item-description-black"));
        runnerLine.forEach(runnerLineItem => runnerLineItem.classList.remove('bottomLinePageBlack'));
        logo.classList.remove('logo-black');
        mailAdd.classList.remove('mail-black');
        filterOutput.classList.remove('filter-output-black');
        filters.classList.remove('filters-open-black');
        terms.forEach(termItem => termItem.classList.remove('filters-item-black'));
    } else {
        body.classList.add("body-black");
        localStorage.setItem("theme", "black");
        header.forEach(headerItem => headerItem.classList.add("header-black"));
        bodyItem.forEach(itemBody => itemBody.classList.add("body-items-black"));
        buttons.forEach(buttonsItem => buttonsItem.classList.add("button-black"));

        iconMode.forEach(iconModeItem => {
                iconModeItem.setAttribute("fill", "#ffea00");
                iconModeItem.setAttribute("d", sun);
            }
        );

        modePar.forEach(modeParItem => modeParItem.textContent = 'light mode');

        grid.forEach(gridItem => gridItem.classList.add("grid-black"));
        paragraph.forEach(paragraphItem => paragraphItem.classList.add("paragraph-black"));
        donats.forEach(donatItem => donatItem.classList.add("donat-black"));
        footer.forEach(footerItem => footerItem.classList.add("footer-black"));
        plays.forEach(playItem => playItem.classList.add("play-dark"));
        oneFoot.forEach(oneFootItem => oneFootItem.classList.add("one-foot-black"));
        p.forEach(pItem => pItem.classList.add("amount-p-black"));
        input.forEach(inputItem => inputItem.classList.add("input-black"));
        twins.forEach(twinItem => twinItem.classList.add("twins-black"));
        twinsParagraph.forEach(twinsParagraph => twinsParagraph.classList.add("twins-black-item"));
        select.forEach(selectItem => selectItem.classList.add("select-black"));
        goUp.forEach(toUPItem => toUPItem.classList.add("toUp-black"));
        listHead.forEach(listHeadItem => listHeadItem.classList.add("termins-list-item-head-black"));
        runnerLine.forEach(runnerLineItem => runnerLineItem.classList.add('bottomLinePageBlack'));
        listDescription.forEach(listDescriptionItem => listDescriptionItem.classList.add("termins-list-item-description-black"));
        logo.classList.add('logo-black');
        mailAdd.classList.add('mail-black');
        filterOutput.classList.add('filter-output-black');
        filters.classList.add('filters-open-black');
        terms.forEach(termItem => termItem.classList.add('filters-item-black'));
    }
}

function displayTheme() {


    if (localStorage.getItem("theme") === "black") {
        localStorage.setItem("theme", "black");
        header.forEach(headerItem => headerItem.classList.add("header-black"));
        body.classList.add("body-black");
        bodyItem.forEach(itemBody => itemBody.classList.add("body-items-black"));
        buttons.forEach(buttonsItem => buttonsItem.classList.add("button-black"));

        iconMode.forEach(iconModeItem => {
                iconModeItem.setAttribute("fill", "#ffea00");
                iconModeItem.setAttribute("d", sun);
            }
        );
        modePar.forEach(modeParItem => modeParItem.textContent = 'light mode');

        grid.forEach(gridItem => gridItem.classList.add("grid-black"));
        paragraph.forEach(paragraphItem => paragraphItem.classList.add("paragraph-black"));
        footer.forEach(footerItem => footerItem.classList.add("footer-black"));
        donats.forEach(donatItem => donatItem.classList.add("donat-black"));
        plays.forEach(playItem => playItem.classList.add("play-dark"));
        oneFoot.forEach(oneFootItem => oneFootItem.classList.add("one-foot-black"));
        p.forEach(pItem => pItem.classList.add("amount-p-black"));
        input.forEach(inputItem => inputItem.classList.add("input-black"));
        twins.forEach(twinItem => twinItem.classList.add("twins-black"));
        twinsParagraph.forEach(twinsParagraph => twinsParagraph.classList.add("twins-black-item"));
        select.forEach(selectItem => selectItem.classList.add("select-black"));
        goUp.forEach(toUPItem => toUPItem.classList.add("toUp-black"));
        listHead.forEach(listHeadItem => listHeadItem.classList.add("termins-list-item-head-black"));
        listDescription.forEach(listDescriptionItem => listDescriptionItem.classList.add("termins-list-item-description-black"));
        runnerLine.forEach(runnerLineItem => runnerLineItem.classList.add('bottomLinePageBlack'));
        logo.classList.add('logo-black');
        mailAdd.classList.add('mail-black');
        filterOutput.classList.add('filter-output-black');
        filters.classList.add('filters-open-black');
        terms.forEach(termItem => termItem.classList.add('filters-item-black'));
    } else {
        localStorage.setItem("theme", "light");
        header.forEach(headerItem => headerItem.classList.remove("header-black"));
        body.classList.remove("body-black");
        bodyItem.forEach(itemBody => itemBody.classList.remove("body-items-black"));
        buttons.forEach(buttonsItem => buttonsItem.classList.remove("button-black"));

        iconMode.forEach(iconModeItem => {
                iconModeItem.setAttribute("fill", "#666666");
                iconModeItem.setAttribute("d", moon);
            }
        );
        modePar.forEach(modeParItem => modeParItem.textContent = 'dark mode');

        grid.forEach(gridItem => gridItem.classList.remove("grid-black"));
        footer.forEach(footerItem => footerItem.classList.remove("footer-black"));
        donats.forEach(donatItem => donatItem.classList.remove("donat-black"));
        oneFoot.forEach(oneFootItem => oneFootItem.classList.remove("one-foot-black"));
        p.forEach(pItem => pItem.classList.remove("amount-p-black"));
        plays.forEach(playItem => playItem.classList.remove("play-dark"));
        input.forEach(inputItem => inputItem.classList.remove("input-black"));
        twins.forEach(twinItem => twinItem.classList.remove("twins-black"));
        twinsParagraph.forEach(twinsParagraph => twinsParagraph.classList.remove("twins-black-item"));
        select.forEach(selectItem => selectItem.classList.remove("select-black"));
        goUp.forEach(toUPItem => toUPItem.classList.remove("toUp-black"));
        listHead.forEach(listHeadItem => listHeadItem.classList.remove("termins-list-item-head-black"));
        listDescription.forEach(listDescriptionItem => listDescriptionItem.classList.remove("termins-list-item-description-black"));
        runnerLine.forEach(runnerLineItem => runnerLineItem.classList.remove('bottomLinePageBlack'));
        logo.classList.remove('logo-black');
        mailAdd.classList.remove('mail-black');
        filterOutput.classList.remove('filter-output-black');
        filters.classList.remove('filters-open-black');
        terms.forEach(termItem => termItem.classList.remove('filters-item-black'));
    }

}
document.addEventListener("DOMContentLoaded", displayTheme)

// visionUp

function addToUp() {
    let lineHeader = document.querySelectorAll('.header-line');
    let lineOne = document.querySelectorAll('.one');
    lineHeader.forEach((lineHeaderItem) => {
        let lineHeaderPosition = lineHeaderItem.getBoundingClientRect();
        lineOne.forEach((lineOneItem) => {
            let lineOnePosition = lineOneItem.getBoundingClientRect();

            if (lineHeaderPosition.bottom >= lineOnePosition.top) {
                let toUp = document.querySelectorAll('.toUp');
                toUp.forEach(toUpItem => toUpItem.classList.add('toUp-vision'));
            } else {
                let toUp = document.querySelectorAll('.toUp');
                toUp.forEach(toUpItem => toUpItem.classList.remove('toUp-vision'));
            }
        })
    });
}

document.addEventListener('scroll', addToUp);

// toUp
let up = document.querySelector('.toUp');
let toUp = () => {
    window.scrollTo(0, 0);
}
up.onclick = toUp;

paragraph.forEach(paragraphItem => {
    paragraphItem.onclick = toUp;
});

// close filter on touch details
// details.forEach(detail => detail.addEventListener('click', () => {
//     closeFilter();
// }));
