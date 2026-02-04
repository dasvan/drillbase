let notHistory = 'history is empty';

let arrayDeviationFromVerticalHistory = [];
let arrayOffsetLheHistory = [];
let arrayOffsetAnyHistory = [];
let arrayInclinationAngleHistory = [];
let arrayMagneticAzimutHistory = [];
let arraySlideRotorHistory = [];
let arrayHistory = [arrayDeviationFromVerticalHistory, arrayOffsetLheHistory, arrayOffsetAnyHistory, arrayInclinationAngleHistory, arrayMagneticAzimutHistory, arraySlideRotorHistory];

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
        historyBodyItem = document.createElement('div');
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

//// directional drilling formulas

// deviationFromVertical
function deviationFromVertical() {
    let projectionNorthSouthInput = document.querySelector(".projectionNorthSouth");
    let projectionEastWestInput = document.querySelector(".projectionEastWest");
    let deviationFromVertical = document.querySelector(".deviationFromVertical");

    let projectionNorthSouth = +projectionNorthSouthInput.value;
    let projectionEastWest = +projectionEastWestInput.value;

    if (projectionNorthSouth === 0 || projectionEastWest === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        deviationFromVertical.innerText = "wrong";
    } else {
        projectionNorthSouthInput.value = '';
        projectionEastWestInput.value = '';
        let result = ((projectionNorthSouth ** 2 + projectionEastWest ** 2) ** 0.5).toFixed(2);
        arrayHistory[0].push(`${projectionNorthSouth}; ${projectionEastWest} → ${result}`);
        deviationFromVertical.innerText = result;
    }
}
let deviationFromVerticalHistory = document.querySelector('.deviationFromVerticalHistory');
deviationFromVerticalHistory.addEventListener('click', () => displayHistory(arrayHistory[0]));

// offsetLHE
function offsetLHE() {
    let telemetrySystemMarkInput = document.querySelector(".telemetrySystemMark");
    let downholeMotorCircumferenceInput = document.querySelector(".downholeMotorCircumference");
    let offsetLHE = document.querySelector(".offsetLHE");

    let telemetrySystemMark = +telemetrySystemMarkInput.value;
    let downholeMotorCircumference = +downholeMotorCircumferenceInput.value;

    if (telemetrySystemMark > 0 && downholeMotorCircumference > 0) {
        if (telemetrySystemMark < downholeMotorCircumference) {
            telemetrySystemMarkInput.value = '';
            downholeMotorCircumferenceInput.value = '';
            let result = (telemetrySystemMark / downholeMotorCircumference * 360).toFixed();
            arrayHistory[1].push(`${telemetrySystemMark}; ${downholeMotorCircumference} → ${result}`);
            offsetLHE.innerText = result;
        } else {
            let notification = "расстояние от метки на телесистеме до метки на двигателе не может быть больше диаметра двигателя";
            displayWrong(notification);
            document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
            offsetLHE.innerText = "wrong";
        }
    } else if (telemetrySystemMark === 0 && downholeMotorCircumference === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        offsetLHE.innerText = "wrong";
    }
}
let offsetLheHistory = document.querySelector('.offsetLHE-History');
offsetLheHistory.addEventListener('click', () => displayHistory(arrayHistory[1]));

// offsetAny
function offsetAny() {
    let markToMotorInput = document.querySelector(".markToMotor");
    let motorCircumferenceInput = document.querySelector(".motorCircumference");
    let offsetAny = document.querySelector(".offsetAny");

    let markToMotor = +markToMotorInput.value;
    let motorCircumference = +motorCircumferenceInput.value;

    if (markToMotor > 0 && motorCircumference > 0) {
        if (markToMotor < motorCircumference) {
            markToMotorInput.value = '';
            motorCircumferenceInput.value = '';
            let result = (markToMotor / motorCircumference * 360).toFixed();
            arrayHistory[2].push(`${markToMotor}; ${motorCircumference} → ${result}`);
            offsetAny.innerText = result;
        } else {
            let notification = "расстояние от метки на телесистеме до метки на двигателе не может быть больше диаметра двигателя";
            displayWrong(notification);
            document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
            offsetAny.innerText = "wrong";
        }
    } else if (markToMotor === 0 && motorCircumference === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        offsetAny.innerText = "wrong";
    }
}
let offsetAnyHistory = document.querySelector('.offsetAnyHistory');
offsetAnyHistory.addEventListener('click', () => displayHistory(arrayHistory[2]));

// inclinationAngle
function inclinationAngle() {
    let gXInput = document.querySelector(".Gx");
    let gYInput = document.querySelector(".Gy");
    let gZInput = document.querySelector(".Gz");
    let inclinationAngle = document.querySelector(".inclinationAngle");

    let gX = +gXInput.value;
    let gY = +gYInput.value;
    let gZ = +gZInput.value;

    if (gX === 0 || gY === 0 || gZ === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        inclinationAngle.innerText = "wrong";
    } else {
        gXInput.value = '';
        gYInput.value = '';
        gZInput.value = '';
        let result = (Math.atan((gX ** 2 + gY ** 2) ** 0.5 / gZ) * 180 / Math.PI).toFixed(2);
        arrayHistory[3].push(`${gX}; ${gY}; ${gZ} → ${result}`)
        inclinationAngle.innerText = result;
    }
}
let inclinationAngleHistory = document.querySelector('.inclinationAngleHistory');
inclinationAngleHistory.addEventListener('click', () => displayHistory(arrayHistory[3]));

// magneticAzimut
function magneticAzimut() {
    let gXInput = document.querySelector(".Gx-azimut");
    let gYInput = document.querySelector(".Gy-azimut");
    let gZInput = document.querySelector(".Gz-azimut");
    let bXInput = document.querySelector(".Bx-azimut");
    let bYInput = document.querySelector(".By-azimut");
    let bZInput = document.querySelector(".Bz-azimut");
    let magneticAzimut = document.querySelector(".magneticAzimut");

    let gX = +gXInput.value;
    let gY = +gYInput.value;
    let gZ = +gZInput.value;
    let bX = +bXInput.value;
    let bY = +bYInput.value;
    let bZ = +bZInput.value;

    if (gX === 0 || gY === 0 || gZ === 0 || bX === 0 || bY === 0 || bZ === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        magneticAzimut.innerText = "wrong";
    } else if (gX > 1 || gY > 1 || gZ > 1) {
        let notification = "Gi не может быть больше 1";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        magneticAzimut.innerText = "wrong";
    } else {
        gXInput.value = '';
        gYInput.value = '';
        gZInput.value = '';
        bXInput.value = '';
        bYInput.value = '';
        bZInput.value = '';
        let numerator = - bX * gY + bY * gX;
        let denominator = bZ * (gX * gX + gY * gY) - gZ * (bX * gX + bY * gY);
        let resultRad = Math.atan2(numerator, denominator);
        let resultDeg = resultRad * 180 / Math.PI;
        if (resultDeg < 0) resultDeg += 360;
        let result = resultDeg.toFixed(2);
        arrayHistory[4].push(`${gX}; ${gY}; ${gZ}; ${bX}; ${bY}; ${bZ} → ${result}`);
        magneticAzimut.innerText = result;
    }
}
let magneticAzimutHistory = document.querySelector(".magneticAzimutHistory");
magneticAzimutHistory.addEventListener('click', () => displayHistory(arrayHistory[4]));

// slideRotor
function slideRotor() {
    let metersInRotorInput = document.querySelector(".metersInRotor");
    let metersInSlideInput = document.querySelector(".metersInSlide");
    let slideRotor = document.querySelector(".slideRotor");

    let metersInRotor = +metersInRotorInput.value;
    let metersInSlide = +metersInSlideInput.value;

    if (metersInRotor === 0 || metersInSlide === 0) {
        slideRotor.innerText = "wrong";
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else {
        let totalMeters = metersInRotor + metersInSlide;
        metersInRotorInput.value = '';
        metersInSlideInput.value = '';
        let slide = (metersInSlide / totalMeters * 100).toFixed(1);
        let rotor = (metersInRotor / totalMeters * 100).toFixed(1);
        let result = `${slide}/${rotor}`;
        arrayHistory[5].push(`${metersInRotor}; ${metersInSlide} → ${result}`);
        slideRotor.innerText = result;
    }
}
let slideRotorHistory = document.querySelector('.slideRotorHistory');
slideRotorHistory.addEventListener('click', () => displayHistory(arrayHistory[5]));

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
