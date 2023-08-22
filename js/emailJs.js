/* Email JS */

const contactForm = document.getElementById('contact_form'),
    inputName = document.getElementById('user_name'),
    labelName = document.getElementById('label_name'),
    inputMail = document.getElementById('user_mail'),
    labelMail = document.getElementById('label_mail'),
    inputPhone = document.getElementById('user_phone'),
    labelPhone = document.getElementById('label_phone'),
    inputMesage = document.getElementById('user_message'),
    labelMessage = document.getElementById('label_message'),
    sentMessage = document.getElementById('sent');

let inputs = [inputName, inputMail, inputPhone, inputMesage];

inputName.onblur = function () {
    if (inputName.value !== '') {
        labelName.classList.add('fixed-tag');
        inputName.classList.add('fill-input');
    } else {
        inputName.classList.remove('fill-input');
        labelName.classList.remove('fixed-tag');
    }
}
inputMail.onblur = function () {
    if (inputMail.value !== '') {
        inputMail.classList.add('fill-input');
        labelMail.classList.add('fixed-tag');
    } else {
        inputMail.classList.remove('fill-input');
        labelMail.classList.remove('fixed-tag');
    }
}
inputPhone.onblur = function () {
    if (inputPhone.value !== '') {
        inputPhone.classList.add('fill-input');
        labelPhone.classList.add('fixed-tag');
    } else {
        labelPhone.classList.remove('fixed-tag');
        inputPhone.classList.remove('fill-input');
    }
}
inputMesage.onblur = function () {
    if (inputMesage.value !== '') {
        inputMesage.classList.add('fill-input');
        labelMessage.classList.add('fixed-tag');
    } else {
        labelMessage.classList.remove('fixed-tag');
        inputMesage.classList.remove('fill-input');
    }
}

const sendEmail = (e) => {
    e.preventDefault()

    // Check if the field has a value
    if (inputName.value === '' || inputMail.value === '' || inputPhone.value === '' || inputMesage.value === '') {
        // 
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                inputs[i].classList.add('empty-input')
                inputs[i].classList.remove('fill-input')
            } else {
                inputs[i].classList.add('fill-input')
                inputs[i].classList.remove('empty-input')
            }
        }
        sentMessage.textContent = 'Fill all fields';
        sentMessage.style.animation = 'bounce 2s ease infinite normal forwards';

    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_wtw2knb', 'template_3rtvkxq', '#contact_form', 'HPx1SgRWxlyE3IWeE').then(() => {
            // Show Message
            sentMessage.textContent = 'Message sent';
            // Remove message after 5 sec
            setTimeout(() => {
                sentMessage.textContent = '';
            }, 3000)
        }, (error) => {
            alert('Ooops! Some thing has failed...', error)
        })
        // Clear All fields
        for (i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }
}

contactForm.addEventListener('submit', sendEmail);

let numbers = [];

for (i = 0; i < 10; i++) {
    numbers.push(i);
}

let phoneMessage = document.getElementById('warning');

inputPhone.onkeyup = function () {
    var phoneValue = inputPhone.value;
    var phoneLength = inputPhone.value.length;
    var lastChar = phoneValue.charAt(phoneLength - 1);
    var editValue = phoneValue.substring(0, phoneValue.length - 1);

    if (isNaN(lastChar) == true) {
        inputPhone.value = inputPhone.value.substring(0, inputPhone.value.length - 1)
        phoneMessage.textContent = 'Please Enter a number';
        phoneMessage.style.animation = 'bounce 2s ease infinite normal forwards'

    } else {
        phoneMessage.textContent = '';
    }
}