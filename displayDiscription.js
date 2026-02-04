// let filter = document.querySelector("select");
// let listLi = document.querySelectorAll("li");
//
// function displayLi() {
//     listLi.forEach(li => li.classList.add("hidden-li"));
//     for (let liItem of listLi) {
//         let liData = liItem.dataset.section;
//         if (filter.value === liData) {
//             liItem.classList.remove("hidden-li");
//         } else if (filter.value === "allTerms") {
//             liItem.classList.remove("hidden-li");
//         }
//     }
// }
//
// filter.onchange = displayLi;


// dropdown
let filterOutput = document.querySelector('.filter-output');
let filterOutputChevron = document.querySelector('.filter-output-chevron');
let filters = document.querySelector('.filters-close');
let filterMain = document.querySelector('.filter-main');
let conditionMode = [true, false];
let indexCond = 0;
let currentCond =  conditionMode[indexCond];

filterMain.addEventListener('click', () => {
    mode.forEach(modeItem => {
        modeItem.disabled = currentCond;
        indexCond++;
        currentCond = conditionMode[indexCond % conditionMode.length];
    });
})

// filter output
filterOutput.addEventListener('click', function() {

    if (body.classList.contains("body-black")) {
        filterOutput.classList.toggle('filter-output-open-black');
    }
    filterOutput.classList.toggle('filter-output-open');
    filterOutputChevron.classList.toggle('filter-output-rotate');
    filters.classList.toggle('filters-open');
})

// filter of dropdown
let filterOutputText = document.querySelector('.filter-output-text');
let terms = document.querySelectorAll('.filters-item');
let liItems = document.querySelectorAll('.termins-column li');
let details = document.querySelectorAll('details');

for (let term of terms) {
    term.addEventListener('mousedown', () => {
        filterOutputText.textContent = term.textContent;
        liItems.forEach(liItem => {
            liItem.classList.add("hidden-li");
            if (term.dataset.section === liItem.dataset.section) {
                liItem.classList.remove("hidden-li");
            } else if (term.dataset.section === "allTerms") {
                liItem.classList.remove("hidden-li");
            }
        });
        closeFilter();
        details.forEach(detail => detail.open = false);
    })
}

function closeFilter() {
    filterOutput.classList.remove('filter-output-open');
    filterOutputChevron.classList.remove('filter-output-rotate');
    filters.classList.remove('filters-open');
    if (body.classList.contains("body-black")) {
        filterOutput.classList.remove('filter-output-open-black');
    }
}

// close dropdown on Esc
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'Escape' && filters.classList.contains('filters-open')) {
//         filterOutput.classList.remove('filter-output-open');
//         filterOutputChevron.classList.remove('filter-output-rotate');
//         filters.classList.remove('filters-open');
//     }
// });

// black mode
document.addEventListener('DOMContentLoaded', () => {

    if (body.classList.contains("body-black")) {
        filterOutput.classList.add('filter-output-black', 'filter-output-open-black');
        filters.classList.add('filters-open-black');
        terms.forEach(termItem => termItem.classList.add('filters-item-black'));
    } else {
        filterOutput.classList.remove('filter-output-black', 'filter-output-open-black');
        filters.classList.remove('filters-open-black');
        terms.forEach(termItem => termItem.classList.remove('filters-item-black'));
    }
})
