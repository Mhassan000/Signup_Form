//Retrieving HTML elements from the DOM
const form = document.getElementById('form');
const username= document.getElementById('username');
const email = document.getElementById('email');
const password= document.getElementById('password');
const password2 = document.getElementById('password2');

// Function to update the class and messages for error
function showError(input,message){
    //Get parent element of input(form-control)
    const formControl = input.parentElement;
    //Update the class name 
    formControl.className = 'form-control error';
    //get the small element 
    const small = formControl.querySelector('small');
    //Updating the message 
    small.innerText = message;
}
function showSucess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function CheckRequired(inputArray){
    inputArray.forEach(function(input){
        if (input.value === ''){
            showError(input,`${getFeildId(input)} is required`);
        }
        else{
            showSucess(input);
        }
    })
}

function getFeildId(input){
    return input.id.charAt('0').toUpperCase() + input.id.slice(1);
}

function CheckLength(input,min,max){
    if (input.value.length < min){
        showError (input,`${getFeildId(input)} needs to be atleast ${min} characters`);
    } else if (input.value.length > max) {
        showError (input, `${getFeildId(input)} needs to be less than ${max} characters`);
    } else {
        showSucess(input);
    }
}

function CheckEmail(input){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())){
        showSucess(input);
    } else {
        showError(input,`${getFeildId(input)} is not valid`);
    }
}

//Function To check passwords 
function CheckPasswordMatch(input1,input2){
    if ( input1.value !== input2.value) {
        showError (input2, "Passwords don't match");
    }
}
//Create event for submit button
form.addEventListener('submit', function(e){
    //Stop page from reloading on submit
    e.preventDefault();
    CheckRequired([username,email,password,password2]);
    CheckLength(username,3,10);
    CheckLength(password,6,30);
    CheckEmail(email);
    CheckPasswordMatch(password,password2);

});
