// (1) The "Name" field: Focus inside name input on page load. 
const inputName = document.getElementById('name');
inputName.focus();

// (2) "Job Role" section: Toggle other job role input display to block if other job role is selected
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

// (3) "T-Shirt Info" section: Colors are disabled until a design is chosen then only colors available per design are enabled.
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

// (4) "Register for Activities" section: Update total cost as activities are checked or unchecked.
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

// (5) "Payment Info" section:
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
console.log(payment, creditCard, paypal, bitcoin);

paypal.style.display = 'none';
bitcoin.style.display = 'none';
// Selects credit card as default form of payment.
payment.children[1].selected = true;
// if the form of payment is changed, styles are updated on the page.
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

// (6) Form Validation:
// Get elements to validate.
const emailAddress = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const formElement = document.querySelector('form');
console.log(emailAddress, cardNumber, zipCode, cvv, formElement);

// Listen for a submit event and check to see if inputs are valid.
formElement.addEventListener('submit', e => {
    // Store element values to variables.
    let nameValue = inputName.value;
    let emailValue = emailAddress.value;
    let cardNumberValue = cardNumber.value;
    let zipCodeValue = zipCode.value;
    let cvvValue = cvv.value;
    // Check if values are valid inputs.
    let isTotalCost = /^[1-9]\d*$/.test(totalCost);
    let isName = /^[a-z]+$/i.test(nameValue);
    let isEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    let isCardNumber = /^[1-9][0-9]{12,15}$/.test(cardNumberValue);
    let isZipCode = /^[0-9]{5}$/.test(zipCodeValue);
    let isCVV = /^[0-9]{3}$/.test(cvvValue);
    // Store array of test inputs in variable 
        // Passed in as first argument into invalid function if submit is prevented.
    let testArr = [isName, isEmail, isCardNumber, isZipCode, isCVV, isTotalCost];
    // Store array of inputs in variable 
        // Passed in as second argument into invalid function if submit is prevented.
    let inputArr = [inputName, emailAddress, cardNumber, zipCode, cvv, activitiesCost];

    // Prevent default and call invalid function if submit default is prevented.
        // Submit default is prevented if any one test does not pass.
    if (payment.children[1].selected){
        if (!isName | !isEmail | !isTotalCost | !isCardNumber | !isZipCode | !isCVV) {
            e.preventDefault();
            invalid(testArr, inputArr);
        } 
    } else if (!isName | !isEmail | !isTotalCost) {
        e.preventDefault();
        invalid(testArr, inputArr);
    }  
});

// (7) Accessibility: 
    // a) When a checkbox is in focus, parent element gets the class of focus.   
    // b) The class is removed when blur event happens on checkbox.

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

//This function is called when the submit default is prevented.
// If an invalid form field is detected on submit:
    // a) The input element receives a class of 'not-valid'.
    // b) The parents last child is displayed.
// If the input is valid on submit: 
    // a) The 'not-valid' class is removed 
    // b) The 'valid' class is added.
    // c) The parent's last child is not displayed.
function invalid(test, input) {
    for (let i = 0; i < test.length; i++) {
        let parent = input[i].parentElement;
        if (!test[i]) {
            parent.classList.add('not-valid');
            parent.classList.remove('valid');
            parentLastChild = parent.lastElementChild;
            parentLastChild.style.display = 'block';
        } else {
            parent.classList.add('valid');
            parent.classList.remove('not-valid');
            parentLastChild = parent.lastElementChild;
            parentLastChild.style.display = 'none';
        }
    }   
}
