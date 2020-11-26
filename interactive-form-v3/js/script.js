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

// The "I'm going to pay with:" <select> element
// The <div> element with the id of "credit-card"
// The <div> element with the id of "paypal"
// The <div> element with the id of "bitcoin"
// Create variables to reference the above elements, and log them out to the console to confirm their identity.
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
console.log(payment, creditCard, paypal, bitcoin);

// Use the "paypal" and "bitcoin" variables above to hide these elements initially.
paypal.style.display = 'none';
bitcoin.style.display = 'none';
// Use the payment variable above to target the element’s second child element and give it the selected property. 
//The .children property and the setAttribute method will be helpful here.
payment.children[1].selected = true;
// Use the payment variable above to listen for the change event on this element. 
// When a change is detected, display the <div> element 
// with the id that matches the value of the event.target element. 
// And hide the other two <div> elements.
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
// Now save and refresh the page, and when the payment method option is updated in the drop-down menu, the payment sections in the form will update accordingly.


