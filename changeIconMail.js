// mailIconChange
let icon = document.querySelector(".contacts-mail");
let mail = document.querySelector(".mailAdd");
let noChoose = "M3 8L8.44992 11.6333C9.73295 12.4886 10.3745 12.9163 11.0678 13.0825C11.6806 13.2293 12.3194 13.2293 12.9322 13.0825C13.6255 12.9163 14.2671 12.4886 15.5501 11.6333L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z";
let choose = "M16 17H21M18.5 14.5V19.5M12 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V11M20.6067 8.26229L15.5499 11.6335C14.2669 12.4888 13.6254 12.9165 12.932 13.0827C12.3192 13.2295 11.6804 13.2295 11.0677 13.0827C10.3743 12.9165 9.73279 12.4888 8.44975 11.6335L3.14746 8.09863";

function toChoose() {
    mail.setAttribute('d', choose);
}

function toNotChoose() {
    mail.setAttribute('d', noChoose);
}

icon.addEventListener('mouseenter', toChoose);
icon.addEventListener('mouseleave', toNotChoose);

// typeText
function random(min= 40, max= 100) {
    let randomNumber = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
}

// typeText
let out = document.querySelector('.out');
let typing = true;
let deleting = false;
let position = 0;
let texts = ["engineer digital toolbox", "make calculations", "convert units", "learn technical terms"];
let currentIndex = 0;
let currentText = texts[currentIndex];

function typeText() {
    if (typing && position < currentText.length) {
        out.textContent += currentText[position];
        position++;
    } else if (typing && position === currentText.length) {
        typing = false;
        deleting = true;
        setTimeout(typeText, 1000);
        return
    } else if (deleting && out.textContent.length > 0) {
        out.textContent = out.textContent.slice(0, -1)
    } else if (deleting && out.textContent.length === 0) {
        typing = true;
        deleting = false;
        position = 0;

        currentIndex = (currentIndex + 1) % texts.length;
        currentText = texts[currentIndex];

        setTimeout(typeText, 1000);
        return
    }
    setTimeout(typeText, random());
}

typeText();
