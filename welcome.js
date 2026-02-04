function displayWelcome() {
    let modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modalOverlay");
    modalOverlay.classList.add("modalOverlay-hidden");

    let welcomeModal = document.createElement("div");
    welcomeModal.classList.add("welcomeModal");
    welcomeModal.classList.add('welcomeModal-hidden');

    let closeWelcomeDiv = document.createElement("div");
    closeWelcomeDiv.classList.add("closeWelcomeDiv");
    let closeWelcome = document.createElement("button");
    closeWelcome.textContent = '✕';
    closeWelcome.classList.add("closeWelcome");
    closeWelcomeDiv.appendChild(closeWelcome);
    welcomeModal.appendChild(closeWelcomeDiv);

    let enterName = document.createElement("div");
    enterName.textContent = "Введите ваше имя:"
    enterName.classList.add("enterNameDiv");
    welcomeModal.appendChild(enterName);

    let userNameDiv = document.createElement("div");
    userNameDiv.classList.add("userNameDiv");
    let userName = document.createElement("input");
    userName.setAttribute("type", "text");
    userName.setAttribute("lang", "ru");
    userName.classList.add("userName");
    userNameDiv.appendChild(userName);
    welcomeModal.appendChild(userNameDiv);

    let notification = document.createElement("p");
    notification.textContent = "Welcome!";
    notification.classList.add("notification-hidden");
    welcomeModal.appendChild(notification);

    let submitDiv = document.createElement("div");
    submitDiv.classList.add("submitDiv");
    let submit = document.createElement("button");
    submit.classList.add("submit");
    submit.textContent = "Подтвердить";
    submitDiv.appendChild(submit);
    welcomeModal.appendChild(submitDiv);
    document.body.append(welcomeModal, modalOverlay);

    if (localStorage.getItem('theme') === "black") {
        closeWelcome.classList.add("modalBtns-dark");
        submit.classList.add("modalBtns-dark");
        welcomeModal.classList.add("welcomeModal-dark");
        userName.classList.add("userName-black");
    } else {
        closeWelcome.classList.remove("modalBtns-dark");
        submit.classList.remove("modalBtns-dark");
        welcomeModal.classList.remove("welcomeModal-dark");
        userName.classList.remove("userName-black");
    }

    setTimeout(() => {
        welcomeModal.classList.remove('welcomeModal-hidden');
        modalOverlay.classList.remove("modalOverlay-hidden");
    }, 15)




    closeWelcome.addEventListener("click", function () {
        localStorage.setItem('userName', '');
        welcomeModal.remove();
        modalOverlay.remove();
    })

    submit.addEventListener('click', function () {
        if (userName.value === '' || userName.value.length < 3 || userName.value.match(/[^a-zA-Zа-яА-Я]/g)) {
            userName.value = '';
            notification.textContent = "* Некорректный ввод";
            notification.classList.add("notification-wrong");

            if (localStorage.getItem('theme') === "black") {
                notification.classList.add("notificationWrong-black");
            } else {
                notification.classList.remove("notificationWrong-black");
            }

        } else {
            closeWelcome.disabled = true;
            localStorage.setItem('userName', userName.value);
            let nameUser = localStorage.getItem('userName');
            userName.value = '';
            userName = nameUser[0].toUpperCase() + nameUser.slice(1).toLowerCase();
            notification.classList.add("notification-correct");

            if (localStorage.getItem('theme') === "black") {
                notification.classList.add("notification-correct-black");
            } else {
                notification.classList.remove("notification-correct-black");
            }

            notification.textContent = `Добро пожаловать, ${userName}`;
            setTimeout(() => {
                welcomeModal.remove();
                modalOverlay.remove();
            }, 2000)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(function () {
    if (sessionStorage.getItem('firstVisit') === null) {
        displayWelcome();
        sessionStorage.setItem('firstVisit', 'false')
    }
}, 1500)})