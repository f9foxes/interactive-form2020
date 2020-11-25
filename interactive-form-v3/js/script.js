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

// (5) "T-Shirt Info" section: 
