let notHistory = 'history is empty';

let arrayConvertLengthHistory = [];
let arrayConvertMassHistory = [];
let arrayConvertPressureHistory = [];
let arrayConvertTemperatureHistory = [];
let arrayHistory = [arrayConvertLengthHistory, arrayConvertMassHistory, arrayConvertPressureHistory, arrayConvertTemperatureHistory];

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

//// converter
// converter_length
function convertLengthFromTo() {
    let lengthInput = document.querySelector(".length");
    let lengthResult = document.querySelector(".lengthResult");
    let firstLengthUnitInput = document.querySelector(".firstLengthUnit");
    let secondLengthUnitInput = document.querySelector(".secondLengthUnit");

    let length = +lengthInput.value;
    let firstLengthUnit = firstLengthUnitInput.value;
    let secondLengthUnit = secondLengthUnitInput.value;


    if (length === 0) {
        let notification = "необходимо ввести значение";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstLengthUnit === "choose unit" || secondLengthUnit === "choose unit") {
        let notification = "необходимо выбрать параметры";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstLengthUnit === "inch, (in)" && secondLengthUnit === "meters, (m)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length * 0.0254).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (in) 🗘 ${result} (m)`);
    } else if (firstLengthUnit === "inch, (in)" && secondLengthUnit === "centimeters, (cm)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length * 2.54).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (in) 🗘 ${result} (cm)`);
    } else if (firstLengthUnit === "inch, (in)" && secondLengthUnit === "millimeters, (mm)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length * 25.4).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (in) 🗘 ${result} (mm)`);
    } else if (firstLengthUnit === "foot, (ft)" && secondLengthUnit === "meters, (m)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length * 0.3048).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (ft) 🗘 ${result} (m)`);
    } else if (firstLengthUnit === "foot, (ft)" && secondLengthUnit === "centimeters, (cm)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length * 30.48).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (ft) 🗘 ${result} (cm)`);
    } else if (firstLengthUnit === "foot, (ft)" && secondLengthUnit === "millimeters, (mm)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length * 304.8).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (ft) 🗘 ${result} (mm)`);
    } else if (firstLengthUnit === "meters, (m)" && secondLengthUnit === "inch, (in)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length / 0.0254).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (m) 🗘 ${result} (in)`);
    } else if (firstLengthUnit === "centimeters, (cm)" && secondLengthUnit === "inch, (in)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length / 2.54).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (cm) 🗘 ${result} (in)`);
    } else if (firstLengthUnit === "millimeters, (mm)" && secondLengthUnit === "inch, (in)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length / 25.4).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (mm) 🗘 ${result} (in)`);
    } else if (firstLengthUnit === "meters, (m)" && secondLengthUnit === "foot, (ft)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length / 0.3048).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (m) 🗘 ${result} (ft)`);
    } else if (firstLengthUnit === "centimeters, (cm)" && secondLengthUnit === "foot, (ft)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length / 30.48).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (cm) 🗘 ${result} (ft)`);
    } else if (firstLengthUnit === "millimeters, (mm)" && secondLengthUnit === "foot, (ft)") {
        lengthInput.value = '';
        firstLengthUnitInput.value = 'choose unit';
        secondLengthUnitInput.value = 'choose unit';
        let result = (length / 304.8).toFixed(2);
        lengthResult.innerText = `result: ${result}`;
        arrayHistory[0].push(`${length} (mm) 🗘 ${result} (ft)`);
    } else {
        let notification = "конвертация возможна из системы СИ в API или же наоборот";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    }
}
let convertLength = document.querySelector(".convertLength");
convertLength.addEventListener("click", convertLengthFromTo);
let convertLengthHistory = document.querySelector(".convertLengthHistory");
convertLengthHistory.addEventListener('click', () => displayHistory(arrayHistory[0]))

//convert_mass
function convertMassFromTo() {
    let massInput = document.querySelector(".mass");
    let massResult = document.querySelector(".massResult");
    let firstMassUnitInput = document.querySelector(".firstMassUnit");
    let secondMassUnitInput = document.querySelector(".secondMassUnit");

    let mass = +massInput.value;
    let firstMassUnit = firstMassUnitInput.value;
    let secondMassUnit = secondMassUnitInput.value;

    if (mass === 0) {
        let notification = "необходимо ввести значение";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstMassUnit === "choose unit" || secondMassUnit === "choose unit") {
        let notification = "необходимо выбрать параметры";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstMassUnit === "pound-mass, (lbm)" && secondMassUnit === "kilogram, (kg)") {
        massInput.value = '';
        firstMassUnitInput.value = 'choose unit';
        secondMassUnitInput.value = 'choose unit';
        let result = (mass * 0.4536).toFixed(2);
        massResult.innerText = `result: ${result}`;
        arrayHistory[1].push(`${mass} (lbm) 🗘 ${result} (kg)`);
    } else if (firstMassUnit === "kilogram, (kg)" && secondMassUnit === "pound-mass, (lbm)") {
        massInput.value = '';
        firstMassUnitInput.value = 'choose unit';
        secondMassUnitInput.value = 'choose unit';
        let result = (mass * 2.205).toFixed(2);
        massResult.innerText = `result: ${result}`;
        arrayHistory[1].push(`${mass} (kg) 🗘 ${result} (lbm)`);
    } else {
        let notification = "конвертация возможна из системы СИ в API или же наоборот";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    }
}
let convertMass = document.querySelector(".convertMass");
convertMass.addEventListener("click", convertMassFromTo);
let convertMassHistory = document.querySelector(".convertMassHistory");
convertMassHistory.addEventListener('click', () => displayHistory(arrayHistory[1]));

//convert_pressure
function convertPressureFromTo() {
    let pressureInput = document.querySelector(".pressure");
    let pressureResult = document.querySelector(".pressureResult");
    let firstPressureUnitInput = document.querySelector(".firstPressureUnit");
    let secondPressureUnitInput = document.querySelector(".secondPressureUnit");

    let pressure = +pressureInput.value;
    let firstPressureUnit = firstPressureUnitInput.value;
    let secondPressureUnit = secondPressureUnitInput.value;

    if (pressure === 0) {
        let notification = "необходимо ввести значение";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstPressureUnit === "choose unit" || secondPressureUnit === "choose unit") {
        let notification = "необходимо выбрать параметры";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstPressureUnit === "psi" && secondPressureUnit === "atm") {
        pressureInput.value = '';
        firstPressureUnitInput.value = 'choose unit';
        secondPressureUnitInput.value = 'choose unit';
        let result = (pressure * 0.068046).toFixed(3);
        pressureResult.innerText = `result: ${result}`;
        arrayHistory[2].push(`${pressure} (psi) 🗘 ${result} (atm)`);
    } else if (firstPressureUnit === "atm" && secondPressureUnit === "psi") {
        pressureInput.value = '';
        firstPressureUnitInput.value = 'choose unit';
        secondPressureUnitInput.value = 'choose unit';
        let result = (pressure / 0.068046).toFixed(3);
        pressureResult.innerText = `result: ${result}`;
        arrayHistory[2].push(`${pressure} (atm) 🗘 ${result} (psi)`);
    } else {
        let notification = "конвертация возможна из системы СИ в API или же наоборот";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    }
}
let convertPressure = document.querySelector(".convertPressure");
convertPressure.addEventListener("click", convertPressureFromTo);
let convertPressureHistory = document.querySelector(".convertPressureHistory");
convertPressureHistory.addEventListener('click', () => displayHistory(arrayHistory[2]));

//convert_temperature
function convertTemperatureFromTo() {
    let temperatureInput = document.querySelector(".temperature");
    let temperatureResult = document.querySelector(".temperatureResult");
    let firstTemperatureUnitInput = document.querySelector(".firstTemperatureUnit");
    let secondTemperatureUnitInput = document.querySelector(".secondTemperatureUnit");

    let temperature = +temperatureInput.value;
    let firstTemperatureUnit = firstTemperatureUnitInput.value;
    let secondTemperatureUnit = secondTemperatureUnitInput.value;

    if (temperature === 0) {
        let notification = "необходимо ввести значение";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstTemperatureUnit === "choose unit" || secondTemperatureUnit === "choose unit") {
        let notification = "необходимо выбрать параметры";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    } else if (firstTemperatureUnit === "°F" && secondTemperatureUnit === "°C") {
        temperatureInput.value = '';
        firstTemperatureUnitInput.value = 'choose unit';
        secondTemperatureUnitInput.value = 'choose unit';
        let result = ((temperature - 32) / 1.8).toFixed(1);
        temperatureResult.innerText = `result: ${result}`;
        arrayHistory[3].push(`${temperature}°F 🗘 ${result}°C`);
    } else if (firstTemperatureUnit === "°C" && secondTemperatureUnit === "°F") {
        temperatureInput.value = '';
        firstTemperatureUnitInput.value = 'choose unit';
        secondTemperatureUnitInput.value = 'choose unit';
        let result = ((temperature * 1.8) + 32 ).toFixed(1);
        temperatureResult.innerText = `result: ${result}`;
        arrayHistory[3].push(`${temperature}°C 🗘 ${result}°F`);
    } else {
        let notification = "конвертация возможна из системы СИ в API или же наоборот";
        displayWrong(notification);
        document.querySelector(".btnCloseWrongModal").onclick = closeWrongModal;
    }
}

let convertTemperature = document.querySelector(".convertTemperature");
convertTemperature.addEventListener("click", convertTemperatureFromTo);
let convertTemperatureHistory = document.querySelector(".convertTemperatureHistory");
convertTemperatureHistory.addEventListener('click', () => displayHistory(arrayHistory[3]));


// displayWrongModal
function displayWrong (element) {
    wrongModalOverlay = document.createElement("div");
    wrongModalOverlay.classList.add("wrongModalOverlay");
    wrongModalOverlay.classList.add("wrongModalOverlay-hidden");
    wrongModal = document.createElement("div");
    wrongModal.classList.add("wrongModal");
    let userName = localStorage.getItem("userName");

    if (localStorage.getItem("theme") === "black") {
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