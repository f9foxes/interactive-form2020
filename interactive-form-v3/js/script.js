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

console.log(designSelectElement);
console.log(colorSelectElement);
console.log(colorOptionElements);

colorSelectElement.disabled = true;

designSelectElement.addEventListener('change', e => {
    colorSelectElement.disabled = false;
    for (let i = 0; i < colorOptionElements.length; i++) {
        const designTheme = e.target.value;
        console.log(designTheme);
        let colorTheme = colorOptionElements[i].getAttribute('data-theme');
        console.log(colorTheme);
        if(designTheme === colorTheme) {
            console.log('equal');
            colorOptionElements[i].hidden = false;
            colorOptionElements[i].selected = true;
        } else {
            console.log('false');
            colorOptionElements[i].hidden = true;
            colorOptionElements[i].selected = false;
        }
    }
});