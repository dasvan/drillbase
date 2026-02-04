let notHistory = 'history is empty';

let arrayMudWeightingHistory = [];
let arrayAnnulusVelocityHistory = [];
let arrayDensityMixingMudsHistory = [];
let arrayVolumeOfPitHistory = [];
let arrayOWRHistory = [];
let arrayDensityWhenAddMudHistory = [];
let arrayHistory = [arrayMudWeightingHistory, arrayAnnulusVelocityHistory, arrayDensityMixingMudsHistory, arrayVolumeOfPitHistory, arrayOWRHistory, arrayDensityWhenAddMudHistory]

// displayHistory
let displayHistory = (arrayItem) => {
    let body = document.querySelector('body');
    let historyWindow = document.createElement('div');
    let historyModalOverlay = document.createElement('div');
    historyWindow.classList.add('historyWindow');
    historyModalOverlay.classList.add('historyModalOverlay');

    let historyWindowHeader = document.createElement('div');
    let historySvg = document.createElement('div');
    let historyWindowHeadTitle = document.createElement('div');
    let historyWindowClose = document.createElement('div');
    let clearHistoryButton = document.createElement('button');

    historyWindowHeader.classList.add('historyWindowHeader');
    historySvg.classList.add('historySvg');
    historyWindowHeadTitle.classList.add('historyWindowHeadTitle');
    historyWindowHeadTitle.textContent = 'history';
    historyWindowClose.classList.add('historyWindowClose');
    clearHistoryButton.classList.add('clearHistoryButton');

    historyWindowHeader.append(historySvg, historyWindowHeadTitle, historyWindowClose);

    let historyWindowBody = document.createElement('div');
    historyWindowBody.classList.add('historyWindowBody');


    if (arrayItem.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayItem.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayItem[i]}`;
            historyWindowBody.append(historyBodyItem);
        }
    } else {
        let historyBodyItem = document.createElement('div');
        historyBodyItem.textContent = notHistory;
        historyBodyItem.classList.add('noHistoryBodyItem');

        if (body.classList.contains('body-black')) {
            historyBodyItem.classList.add('noHistoryBodyItem-black');
        } else {
            historyBodyItem.classList.remove('noHistoryBodyItem-black');
        }

        historyWindowBody.appendChild(historyBodyItem);
    }

    if (body.classList.contains('body-black')) {
        historyWindow.classList.add('modal-dark');
        historyWindowHeader.classList.add('historyWindowHeader-black');
    } else {
        historyWindow.classList.remove('modal-dark');
        historyWindowHeader.classList.remove('historyWindowHeader-black');
    }

    historyWindow.append(historyWindowHeader, historyWindowBody);

    setTimeout(() => {
        historyModalOverlay.classList.add('historyModalOverlay-vision');
        historyWindow.classList.add('historyWindow-vision');
    }, 50)

    document.body.append(historyWindow, historyModalOverlay);

    clearHistoryButton.addEventListener('click', () => {
        arrayItem.length = 0;
        let historyBodyItems = document.querySelectorAll('.historyBodyItem');
        for (let historyBodyItem of historyBodyItems) {
            historyBodyItem.classList.add('historyBodyItem-noVisiable');
            setTimeout(() => {
                historyBodyItem.remove();
            }, 300);
        }

        setTimeout(() => {
            historyBodyItem = document.createElement('div');
            historyBodyItem.textContent = notHistory;
            historyBodyItem.classList.add('noHistoryBodyItem');
            historyBodyItem.classList.add('noHistoryBodyItem-hidden');
            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('noHistoryBodyItem-black');
            } else {
                historyBodyItem.classList.remove('noHistoryBodyItem-black');
            }
            historyWindowBody.appendChild(historyBodyItem);
            setTimeout(() => historyBodyItem.classList.remove('noHistoryBodyItem-hidden'), 50);
        }, 300)

        clearHistoryButton.remove();
    })

    historyWindowClose.addEventListener('click', () => {
        historyWindow.remove();
        historyModalOverlay.remove();
    })

    historyModalOverlay.addEventListener('click', () => {
        historyWindow.remove();
        historyModalOverlay.remove();
    });
}

//// drilling fluids formulas

// mudWeighting
function mudWeighting() {
    let finalMudDensityInput = document.querySelector(".finalMudDensity");
    let startMudVolumeInput = document.querySelector(".startMudVolume");
    let startMudDensityInput = document.querySelector(".startMudDensity");
    let weightingDensityInput = document.querySelector(".weightingDensity");
    let mudWeightingOut = document.querySelector(".mudWeighting");

    let finalMudDensity = +finalMudDensityInput.value;
    let startMudVolume = +startMudVolumeInput.value;
    let startMudDensity = +startMudDensityInput.value;
    let weightingDensity = +weightingDensityInput.value;

    if (finalMudDensity === 0 || startMudVolume === 0 || startMudDensity === 0 || weightingDensity === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        mudWeightingOut.innerText = "wrong";
    } else if (finalMudDensity > startMudDensity) {
        let result = (weightingDensity * 1000 * (finalMudDensity - startMudDensity) / (weightingDensity - finalMudDensity) * startMudVolume).toFixed();
        if (result === "Infinity") {
            let notification = "финальная плотность раствора не может быть равна плотности утяжелителя";
            displayWrong(notification);
            document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
            mudWeightingOut.innerText = "wrong";
        } else if (weightingDensity < finalMudDensity) {
            let notification = "финальная плотность раствора не может быть больше плотности утяжелителя";
            displayWrong(notification);
            document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
            mudWeightingOut.innerText = "wrong";
        } else {
            finalMudDensityInput.value = '';
            startMudVolumeInput.value = '';
            startMudDensityInput.value = '';
            weightingDensityInput.value = '';
            arrayHistory[0].push(`${finalMudDensity}; ${startMudVolume}; ${startMudDensity}; ${weightingDensity} → ${result}`)
            mudWeightingOut.innerText = result;
        }
    } else {
        let notification = "финальная плотность раствора должна быть больше его начальной плотности";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        mudWeighting.innerText = "wrong";
    }
}
let historyMudWeighting = document.querySelector('.mudWeightingHistory');
historyMudWeighting.addEventListener('click', () => displayHistory(arrayHistory[0]));

// annulusVelocity
function annulusVelocity() {
    let drillBitDiameterInput = document.querySelector(".drillBitDiameter");
    let drillStringDiameterInput = document.querySelector(".drillStringDiameter");
    let pumpPerformanceInput = document.querySelector(".pumpPerformance");
    let annulusVelocity = document.querySelector(".annulusVelocity");

    let drillBitDiameter = +drillBitDiameterInput.value;
    let drillStringDiameter = +drillStringDiameterInput.value;
    let pumpPerformance = +pumpPerformanceInput.value;

    if (drillBitDiameter === 0 || drillStringDiameter === 0 || pumpPerformance === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        annulusVelocity.innerText = "wrong";
    } else if (drillBitDiameter > drillStringDiameter) {
        drillBitDiameterInput.value = '';
        drillStringDiameterInput.value = '';
        pumpPerformanceInput.value = '';
        let result = ((pumpPerformance / 1000) / (0.785 * ((drillBitDiameter / 1000) ** 2 - (drillStringDiameter / 1000) ** 2))).toFixed(2);
        arrayHistory[1].push(`${drillBitDiameter}; ${drillStringDiameter}; ${pumpPerformance} → ${result}`)
        annulusVelocity.innerText = result;
    } else {
        let notification = "диаметр долота должен быть больше диаметра бурильной трубы";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        annulusVelocity.innerText = "wrong";
    }
}
let annulusVelocityHistory = document.querySelector('.annulusVelocityHistory');
annulusVelocityHistory.addEventListener('click', () => displayHistory(arrayHistory[1]));

// densityMixingMuds
function densityMixingMuds() {
    let mixingDensityInput = document.querySelector(".mixingDensity");
    let startMudVolumeInput = document.querySelector(".startMudVolume-2");
    let startMudDensityInput = document.querySelector(".startMudDensity-2");
    let densityAddMudInput = document.querySelector(".densityAddMud");
    let densityMixingMuds = document.querySelector(".densityMixingMuds");

    let mixingDensity = +mixingDensityInput.value;
    let startMudVolume = +startMudVolumeInput.value;
    let startMudDensity = +startMudDensityInput.value;
    let densityAddMud = +densityAddMudInput.value;

    if (startMudDensity > mixingDensity && densityAddMud < mixingDensity) {
        mixingDensityInput.value = '';
        startMudVolumeInput.value = '';
        startMudDensityInput.value = '';
        densityAddMudInput.value = '';
        let result = (startMudVolume * (startMudDensity - mixingDensity) / (mixingDensity - densityAddMud)).toFixed(1);
        arrayHistory[2].push(`${mixingDensity}; ${startMudVolume}; ${startMudDensity}; ${densityAddMud} → ${result}`)
        densityMixingMuds.innerText = result;
    } else if (mixingDensity === 0 || startMudVolume === 0 || startMudDensity === 0 || densityAddMud === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        densityMixingMuds.innerText = "wrong";
    } else {
        let notification = "начальная плотность раствора должна быть больше итоговой плотности, а плотность добавляемого раствора – меньше итоговой плотности";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        densityMixingMuds.innerText = "wrong";
    }
}
let densityMixingMudsHistory = document.querySelector('.densityMixingMudsHistory');
densityMixingMudsHistory.addEventListener('click', () => displayHistory(arrayHistory[2]));

// volumeOfPit
function volumeOfPit() {
    let lengthInput = document.querySelector(".length");
    let widthInput = document.querySelector(".width");
    let heightInput = document.querySelector(".height");
    let volumeOfPit = document.querySelector(".volumeOfPit");

    let length = +lengthInput.value;
    let width = +widthInput.value;
    let height = +heightInput.value;

    if (length > 0 && width > 0 && height > 0) {
        lengthInput.value = '';
        widthInput.value = '';
        heightInput.value = '';
        let result = length * width * height;
        arrayHistory[3].push(`${length}; ${width}; ${height} → ${result}`)
        volumeOfPit.innerText = result;
    } else if (length === 0 || height === 0 || width === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        volumeOfPit.innerText = "wrong";
    } else {
        let notification = "значение(я) не могут быть равны 0";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        volumeOfPit.innerText = "wrong";
    }
}
let volumeOfPitHistory = document.querySelector('.volumeOfPitHistory');
volumeOfPitHistory.addEventListener('click', () => displayHistory(arrayHistory[3]));

// OWR
function OWR() {
    let waterInput = document.querySelector(".water");
    let oilInput = document.querySelector(".oil");
    let OWR = document.querySelector(".OWR-result");

    let water = +waterInput.value;
    let oil = +oilInput.value;

    if (water === 0 || oil === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        OWR.innerText = "wrong";
    } else if (oil > water && ((water + oil) <= 50)) {
        waterInput.value = '';
        oilInput.value = '';
        let oilVolume = (oil - water) * 2;
        let waterVolume = water * 2;
        let oilPerCent = (oilVolume * 100 / (oilVolume + waterVolume)).toFixed();
        let waterPerCent = (waterVolume * 100 / (oilVolume + waterVolume)).toFixed();
        let result = `${oilPerCent}/${waterPerCent}`;
        arrayHistory[4].push(`${oil}; ${water} → ${result}`)
        OWR.innerText = result;
    } else if (water + oil > 50) {
        let notification = "суммарный объем воды и масла не может превышать 50мл";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        OWR.innerText = "wrong";
    } else {
        let notification = "объем воды не может превышать объем масла";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        OWR.innerText = "wrong";
    }
}
let OWRHistory = document.querySelector('.OWRHistory');
OWRHistory.addEventListener('click', () => displayHistory(arrayHistory[4]));

// densityWhenAddMud
function densityWhenAddMud() {
    let volumeAddingMudInput = document.querySelector(".volumeAddingMud");
    let densityAddingMudInput = document.querySelector(".densityAddingMud");
    let volumeStartMudInput = document.querySelector(".volumeStartMud");
    let densityStartMudInput = document.querySelector(".densityStartMud");
    let densityWhenAddMud = document.querySelector(".densityWhenAddMud");

    let volumeAddingMud = +volumeAddingMudInput.value;
    let densityAddingMud = +densityAddingMudInput.value;
    let volumeStartMud = +volumeStartMudInput.value;
    let densityStartMud = +densityStartMudInput.value;

    if (volumeAddingMud === 0 || densityAddingMud === 0 || volumeStartMud === 0 || densityStartMud === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        densityWhenAddMud.innerText = "wrong";
    } else {
        volumeAddingMudInput.value = '';
        densityAddingMudInput.value = '';
        volumeStartMudInput.value = '';
        densityStartMudInput.value = '';
        let result = ((volumeStartMud * densityStartMud + volumeAddingMud * densityAddingMud) / (volumeStartMud + volumeAddingMud)).toFixed(3);
        arrayHistory[5].push(`${volumeAddingMud}; ${densityAddingMud}; ${volumeStartMud}; ${densityStartMud} → ${result}`)
        densityWhenAddMud.innerText = result;
    }
}
let densityWhenAddMudHistory = document.querySelector('.densityWhenAddMudHistory');
densityWhenAddMudHistory.addEventListener('click', () => displayHistory(arrayHistory[5]));

// displayWrongModal
function displayWrong (element) {
    wrongModalOverlay = document.createElement("div");
    wrongModalOverlay.classList.add("wrongModalOverlay");
    wrongModalOverlay.classList.add("wrongModalOverlay-hidden");
    wrongModal = document.createElement("div");
    wrongModal.classList.add("wrongModal");
    let userName = localStorage.getItem("userName");

    if (sessionStorage.getItem("theme") === "black") {
        wrongModal.classList.add("modal-dark");
    } else {
        wrongModal.classList.remove("modal-dark");
    }

    let CloseWrongModal = document.createElement("div");
    CloseWrongModal.classList.add("CloseWrongModal");
    let btnCloseWrongModal = document.createElement("div");
    btnCloseWrongModal.classList.add("btnCloseWrongModal");
    btnCloseWrongModal.textContent = "+";
    CloseWrongModal.appendChild(btnCloseWrongModal);
    wrongModal.appendChild(CloseWrongModal);
    let wrongInfo = document.createElement("div");
    wrongInfo.classList.add("wrongInfo");

    if (userName === '') {
        wrongInfo.textContent = element;
    } else {
        userName = userName[0].toUpperCase() + userName.slice(1).toLowerCase();
        wrongInfo.textContent = `${userName}, ${element}`;
    }

    if (body.classList.contains("body-black")) {
        wrongModal.classList.add("modal-dark");
    } else {
        wrongModal.classList.remove("modal-dark");
    }

    wrongModal.appendChild(wrongInfo);
    document.body.append(wrongModal, wrongModalOverlay);
    setTimeout(() => {
        wrongModalOverlay.classList.remove('wrongModalOverlay-hidden');
    })
}

// closeWrongModal
function closeWrongModal () {
    wrongModal.remove();
    wrongModalOverlay.remove()
}
