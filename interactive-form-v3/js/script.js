// (3) The "Name" field: Focus inside name input on page load. 
const inputName = document.getElementById('name');
inputName.focus();

// (4) "Job Role" section: Toggle other job role input display to block if other job role is selected
const jobRoleSelect = document.getElementById('title');
const otherJobRoleInput = document.getElementById('other-job-role');

otherJobRoleInput.style.display = 'none';

jobRoleSelect.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJobRoleInput.style.display = 'block';
    }
    else {
        otherJobRoleInput.style.display = 'none';
    }
});

// (5) "T-Shirt Info" section: Colors are disabled until a design is chosen then only colors available per design are enabled.
const designSelectElement = document.querySelector('#design');
const colorSelectElement = document.querySelector('#color');
const colorOptionElements = colorSelectElement.children;

colorSelectElement.disabled = true;

designSelectElement.addEventListener('change', e => {
    colorSelectElement.disabled = false;
    for (let i = 0; i < colorOptionElements.length; i++) {
        let designTheme = e.target.value;
        let colorTheme = colorOptionElements[i].getAttribute('data-theme');
        if(designTheme === colorTheme) {
            colorOptionElements[i].hidden = false;
            colorOptionElements[i].selected = true;
        } else {
            colorOptionElements[i].hidden = true;
            colorOptionElements[i].selected = false;
        }
    }
});

// (6) "Register for Activities" section: Update total cost as activities are checked or unchecked.
const registerForActivities = document.querySelector('#activities');
const activitiesCost = document.querySelector('#activities-cost');
let totalCost = 0;

registerForActivities.addEventListener('change', e => {
    let cost = e.target.getAttribute('data-cost');
    cost = +cost;
    if (e.target.checked) {
        totalCost = totalCost + cost;
    } else {
        totalCost = totalCost - cost;
    }
    activitiesCost.innerHTML = `Total: $${totalCost}`;
});

// (7) "Payment Info" section:
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
console.log(payment, creditCard, paypal, bitcoin);

paypal.style.display = 'none';
bitcoin.style.display = 'none';

payment.children[1].selected = true;

payment.addEventListener('change', e => {
    let paymentMethod = e.target.value;
    if (paymentMethod === 'credit-card'){
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } else if (paymentMethod === 'paypal') {
        creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else { 
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
});

// (8) Form Validation:
const emailAddress = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const formElement = document.querySelector('form');
console.log(emailAddress, cardNumber, zipCode, cvv, formElement);

formElement.addEventListener('submit', e => {
    let nameValue = inputName.value;
    let emailValue = emailAddress.value;
    let cardNumberValue = cardNumber.value;
    let zipCodeValue = zipCode.value;
    let cvvValue = cvv.value;

    let isName = /^[a-z]+$/i.test(nameValue);
    let isEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    let isCardNumber = /\b(?:\d[ -]*?){13,16}\b/.test(cardNumberValue);
    let isZipCode = /^\d{5}(?:[-\s]\d{4})?$/.test(zipCodeValue);
    let isCVV = /^[0-9]{3,4}$/.test(cvvValue);
    let testArr = [isName, isEmail, isCardNumber, isZipCode, isCVV];
    let inputArr = [inputName, emailAddress, cardNumber, zipCode, cvv];


    if (payment.children[1].selected){
        if (!isName | !isEmail | !isCardNumber | !isZipCode | !isCVV) {
            e.preventDefault();
            invalid(testArr, inputArr);
        } 
    } else if (!isName | !isEmail) {
        e.preventDefault();
        invalid(testArr, inputArr);
    }  
});

// (9) Accessibility:
// When the checkboxes in the "Register for Activities" section are in focus, 
// there’s little to no indication. So to improve accessibility, 
// the checkboxes’ parent label elements should receive additional styles 
// when their respective checkboxes are in focus.

const checkBox = document.querySelector('#activities-box').querySelectorAll('input');
console.log(checkBox);

for (i = 0; i < checkBox.length; i++) {
    let box = checkBox[i];
    box.addEventListener('focus', e => {
        let parentElFocus = e.target.parentElement;
        parentElFocus.classList.add('focus');
    });
    box.addEventListener('blur', e => {
        let parentElBlur = e.target.parentElement;
        parentElBlur.classList.remove('focus');
    });
}

// When an invalid form field or section prevents the form from submitting, 
// there’s little to no indication. So to improve accessibility, 
// add form input validation error indications that can be perceived by all users.

// When validating a required form field, like the "Name" filed, 
// and checking whether the field is valid or not, you’ll need to perform three tasks;
function invalid(test,input) {
    for (let i = 0; i < test.length; i++) {
        if (!test[i]) {
            let parent = input[i].parentElement;
            parent.classList.add('not-valid');
            parent.classList.remove('valid');
            parentLastChild = parent.lastElementChild;
            parentLastChild.style.display = 'block';
        } else {
            let parent = input[i].parentElement;
            parent.classList.add('valid');
            parent.classList.remove('not-valid');
            parentLastChild = parent.lastElementChild;
            parentLastChild.style.display = 'none';
        }
    }   
}
