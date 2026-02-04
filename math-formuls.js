let notHistory = 'history is empty'
let arrayMudWeightingHistory = [];
let arrayAnnulusVelocityHistory = [];
let arrayDensityMixingMudsHistory = [];
let arrayVolumeOfPitHistory = [];
let arrayOWRHistory = [];
let arrayDensityWhenAddMudHistory = [];
let arrayDeviationFromVerticalHistory = [];

// // drilling fluids formulas

// mudWeighting
function mudWeighting() {
    finalMudDensity = +document.querySelector(".finalMudDensity").value;
    startMudVolume = +document.querySelector(".startMudVolume").value;
    startMudDensity = +document.querySelector(".startMudDensity").value;
    weightingDensity = +document.querySelector(".weightingDensity").value;
    mudWeightingOut = document.querySelector(".mudWeighting");

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
            arrayMudWeightingHistory.push(`${finalMudDensity}; ${startMudVolume}; ${startMudDensity}; ${weightingDensity} → ${result}`)
            mudWeightingOut.innerText = result;
        }
    } else {
        let notification = "финальная плотность раствора должна быть больше его начальной плотности";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        mudWeighting.innerText = "wrong";
    }
}
// history mudWeighting
let displayHistoryMudWeighting = () => {
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


    if (arrayMudWeightingHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
    for (let i = 0; i < arrayMudWeightingHistory.length; i++) {
        let historyBodyItem = document.createElement('div');
        historyBodyItem.classList.add('historyBodyItem');

        if (body.classList.contains('body-black')) {
            historyBodyItem.classList.add('historyBodyItem-black');
        } else {
            historyBodyItem.classList.remove('historyBodyItem-black');
        }

        historyBodyItem.textContent = `${i + 1}) ${arrayMudWeightingHistory[i]}`;
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
        arrayMudWeightingHistory = [];
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
let historyMudWeighting = document.querySelector('.mudWeightingHistory');
historyMudWeighting.addEventListener('click', displayHistoryMudWeighting);

// annulusVelocity
function annulusVelocity() {
    let drillBitDiameter = +document.querySelector(".drillBitDiameter").value;
    let drillStringDiameter = +document.querySelector(".drillStringDiameter").value;
    let pumpPerformance = +document.querySelector(".pumpPerformance").value;
    let annulusVelocity = document.querySelector(".annulusVelocity");

    if (drillBitDiameter === 0 || drillStringDiameter === 0 || pumpPerformance === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        annulusVelocity.innerText = "wrong";
    } else if (drillBitDiameter > drillStringDiameter) {
        let result = ((pumpPerformance / 1000) / (0.785 * ((drillBitDiameter / 1000) ** 2 - (drillStringDiameter / 1000) ** 2))).toFixed(2);
        arrayAnnulusVelocityHistory.push(`${drillBitDiameter}; ${drillStringDiameter}; ${pumpPerformance} → ${result}`)
        annulusVelocity.innerText = result;
    } else {
        let notification = "диаметр долота должен быть больше диаметра бурильной трубы";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        annulusVelocity.innerText = "wrong";
    }
}
// history annulusVelocity
let displayHistoryAnnulusVelocity = () => {
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


    if (arrayAnnulusVelocityHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayAnnulusVelocityHistory.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayAnnulusVelocityHistory[i]}`;
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
        arrayAnnulusVelocityHistory = [];
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
let annulusVelocityHistory = document.querySelector('.annulusVelocityHistory');
annulusVelocityHistory.addEventListener('click', displayHistoryAnnulusVelocity);

// densityMixingMuds
function densityMixingMuds() {
    let mixingDensity = +document.querySelector(".mixingDensity").value;
    let startMudVolume = +document.querySelector(".startMudVolume-2").value;
    let startMudDensity = +document.querySelector(".startMudDensity-2").value;
    let densityAddMud = +document.querySelector(".densityAddMud").value;
    let densityMixingMuds = document.querySelector(".densityMixingMuds");

    if (startMudDensity > mixingDensity && densityAddMud < mixingDensity) {
        let result = (startMudVolume * (startMudDensity - mixingDensity) / (mixingDensity - densityAddMud)).toFixed(1);
        arrayDensityMixingMudsHistory.push(`${mixingDensity}; ${startMudVolume}; ${startMudDensity}; ${densityAddMud} → ${result}`)
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
// history densityMixingMuds
let displayHistoryDensityMixingMuds = () => {
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


    if (arrayDensityMixingMudsHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayDensityMixingMudsHistory.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayDensityMixingMudsHistory[i]}`;
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
        arrayDensityMixingMudsHistory = [];
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
let densityMixingMudsHistory = document.querySelector('.densityMixingMudsHistory');
densityMixingMudsHistory.addEventListener('click', displayHistoryDensityMixingMuds);

// volumeOfPit
function volumeOfPit() {
    let length = +document.querySelector(".length").value;
    let width = +document.querySelector(".width").value;
    let height = +document.querySelector(".height").value;
    let volumeOfPit = document.querySelector(".volumeOfPit");

    if (length > 0 && width > 0 && height > 0) {
        let result = length * width * height;
        arrayVolumeOfPitHistory.push(`${length}; ${width}; ${height} → ${result}`)
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
// history volumeOfPit
let displayHistoryVolumeOfPit = () => {
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


    if (arrayVolumeOfPitHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayVolumeOfPitHistory.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayVolumeOfPitHistory[i]}`;
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
        arrayVolumeOfPitHistory = [];
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
let volumeOfPitHistory = document.querySelector('.volumeOfPitHistory');
volumeOfPitHistory.addEventListener('click', displayHistoryVolumeOfPit);

// OWR
function OWR() {
    let water = +document.querySelector(".water").value;
    let oil = +document.querySelector(".oil").value;
    let OWR = document.querySelector(".OWR-result");

    if (water === 0 || oil === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        OWR.innerText = "wrong";
    } else if (oil > water && ((water + oil) <= 50)) {
        let oilVolume = (oil - water) * 2;
        let waterVolume = water * 2;
        let oilPerCent = (oilVolume * 100 / (oilVolume + waterVolume)).toFixed();
        let waterPerCent = (waterVolume * 100 / (oilVolume + waterVolume)).toFixed();
        let result = `${oilPerCent}/${waterPerCent}`;
        arrayOWRHistory.push(`${water}; ${oil} → ${result}`)
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
// history OWR
let displayHistoryOWR = () => {
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


    if (arrayOWRHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayOWRHistory.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayOWRHistory[i]}`;
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
        arrayOWRHistory = [];
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
let OWRHistory = document.querySelector('.OWRHistory');
OWRHistory.addEventListener('click', displayHistoryOWR);

// densityWhenAddMud
function densityWhenAddMud() {
    let volumeAddingMud = +document.querySelector(".volumeAddingMud").value;
    let densityAddingMud = +document.querySelector(".densityAddingMud").value;
    let volumeStartMud = +document.querySelector(".volumeStartMud").value;
    let densityStartMud = +document.querySelector(".densityStartMud").value;
    let densityWhenAddMud = document.querySelector(".densityWhenAddMud");

    if (volumeAddingMud === 0 || densityAddingMud === 0 || volumeStartMud === 0 || densityStartMud === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        densityWhenAddMud.innerText = "wrong";
    } else {
        let result = ((volumeStartMud * densityStartMud + volumeAddingMud * densityAddingMud) / (volumeStartMud + volumeAddingMud)).toFixed(3);
        arrayDensityWhenAddMudHistory.push(`${volumeAddingMud}; ${densityAddingMud}; ${volumeStartMud}; ${densityStartMud} → ${result}`)
        densityWhenAddMud.innerText = result;
    }
}
// history densityWhenAddMud
let displayHistoryDensityWhenAddMud = () => {
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


    if (arrayDensityWhenAddMudHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayDensityWhenAddMudHistory.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayDensityWhenAddMudHistory[i]}`;
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
        arrayDensityWhenAddMudHistory = [];
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
let densityWhenAddMudHistory = document.querySelector('.densityWhenAddMudHistory');
densityWhenAddMudHistory.addEventListener('click', displayHistoryDensityWhenAddMud);

// // directional drilling formulas

// deviationFromVertical
function deviationFromVertical() {
    let projectionNorthSouth = +document.querySelector(".projectionNorthSouth").value;
    let projectionEastWest = +document.querySelector(".projectionEastWest").value;
    let deviationFromVertical = document.querySelector(".deviationFromVertical");

    if (projectionNorthSouth === 0 || projectionEastWest === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        deviationFromVertical.innerText = "wrong";
    } else {
        let result = ((projectionNorthSouth ** 2 + projectionEastWest ** 2) ** 0.5).toFixed(2);
        arrayDeviationFromVerticalHistory.push(`${projectionNorthSouth}; ${projectionEastWest} → ${result}`);
        deviationFromVertical.innerText = result;
    }
}
// history deviationFromVertical
let displayHistoryDeviationFromVertical = () => {
    console.log('displayHistoryDeviationFromVertical');
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


    if (arrayDeviationFromVerticalHistory.length >= 1) {
        historyWindowHeader.append(clearHistoryButton);
        for (let i = 0; i < arrayDeviationFromVerticalHistory.length; i++) {
            let historyBodyItem = document.createElement('div');
            historyBodyItem.classList.add('historyBodyItem');

            if (body.classList.contains('body-black')) {
                historyBodyItem.classList.add('historyBodyItem-black');
            } else {
                historyBodyItem.classList.remove('historyBodyItem-black');
            }

            historyBodyItem.textContent = `${i + 1}) ${arrayDeviationFromVerticalHistory[i]}`;
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
        arrayDeviationFromVerticalHistory = [];
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
let deviationFromVerticalHistory = document.querySelector('.deviationFromVerticalHistory');
console.log(deviationFromVerticalHistory);
deviationFromVerticalHistory.addEventListener('click', displayHistoryDeviationFromVertical);

function offsetLHE() {
    let telemetrySystemMark = +document.querySelector(".telemetrySystemMark").value;
    let downholeMotorCircumference = +document.querySelector(".downholeMotorCircumference").value;
    let offsetLHE = document.querySelector(".offsetLHE");

    if (telemetrySystemMark > 0 && downholeMotorCircumference > 0) {
        if (telemetrySystemMark < downholeMotorCircumference) {
            let result = (telemetrySystemMark / downholeMotorCircumference * 360).toFixed();
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

function offsetAny() {
    let markToMotor = +document.querySelector(".markToMotor").value;
    let motorCircumference = +document.querySelector(".motorCircumference").value;
    let offsetAny = document.querySelector(".offsetAny");

    if (markToMotor > 0 && motorCircumference > 0) {
        if (markToMotor < motorCircumference) {
            let result = (markToMotor / motorCircumference * 360).toFixed();
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

function inclinationAngle() {
    let gX = +document.querySelector(".Gx").value;
    let gY = +document.querySelector(".Gy").value;
    let gZ = +document.querySelector(".Gz").value;
    let inclinationAngle = document.querySelector(".inclinationAngle");

    if (gX === 0 || gY === 0 || gZ === 0) {
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
        inclinationAngle.innerText = "wrong";
    } else {
        let result = (Math.atan((gX ** 2 + gY ** 2) ** 0.5 / gZ) * 180 / Math.PI).toFixed(2);
        inclinationAngle.innerText = result;
    }
}

function magneticAzimut() {
    let gX = +document.querySelector(".Gx-azimut").value;
    let gY = +document.querySelector(".Gy-azimut").value;
    let gZ = +document.querySelector(".Gz-azimut").value;
    let bX = +document.querySelector(".Bx-azimut").value;
    let bY = +document.querySelector(".By-azimut").value;
    let bZ = +document.querySelector(".Bz-azimut").value;
    let magneticAzimut = document.querySelector(".magneticAzimut");

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
        let numerator = - bX * gY + bY * gX;
        let denominator = bZ * (gX * gX + gY * gY) - gZ * (bX * gX + bY * gY);
        let resultRad = Math.atan2(numerator, denominator);
        let resultDeg = resultRad * 180 / Math.PI;
        if (resultDeg < 0) resultDeg += 360;
        let result = resultDeg.toFixed(2);
        magneticAzimut.innerText = result;
    }
}

function slideRotor() {
    let metersInRotor = +document.querySelector(".metersInRotor").value;
    let metersInSlide = +document.querySelector(".metersInSlide").value;
    let slideRotor = document.querySelector(".slideRotor");

    if (metersInRotor === 0 || metersInSlide === 0) {
        // alert("enter values");
        slideRotor.innerText = "wrong";
        let notification = "необходимо ввести значения";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else {
        let totalMeters = metersInRotor + metersInSlide;
        let slide = (metersInSlide / totalMeters * 100).toFixed(1);
        let rotor = (metersInRotor / totalMeters * 100).toFixed(1);
        let result = `${slide}/${rotor}`;
        slideRotor.innerText = result;
    }
}


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



