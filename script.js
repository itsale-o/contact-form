const inputFirstName = document.querySelector(".first-name-input");
const inputLastName = document.querySelector(".last-name-input");
const inputEmail = document.querySelector(".email-input");
const inputMessage = document.getElementById("text-field");
const submitButon = document.getElementById("submit-button");
const successDiv = document.querySelector(".message-sent-div");

// ERRORS SPANS
const allSpans = document.querySelectorAll(".error-span");
const firstNameEmpty = document.querySelector(".error-first-name");
const lastNameEmpty = document.querySelector(".error-last-name");
const emailEmpty = document.querySelector(".error-email-empty-span");
const emailInvalid = document.querySelector(".error-email-invalid-span");
const messageEmpty = document.querySelector(".error-message-empty-span");

// RADIO VERIFICATIONS
const radios = document.querySelectorAll('input[name="query"]');

radios.forEach(radio => {
    radio.addEventListener("change", function() {
        const allParents = document.querySelectorAll(".radio-input-div");
        const parentDiv = this.parentElement;

        if(parentDiv.classList.contains("radio-input-div")) {
    
            allParents.forEach(div => {
                div.classList.remove("selected");
            });
            parentDiv.classList.add("selected");
        }
    });
});

allSpans.forEach(span => {
    span.style.display = "none";
});

inputFirstName.addEventListener("input", e => {
    firstNameEmpty.style.display = "none";   
    inputFirstName.style.border = "solid 1px rgb(135, 163, 166)";
});

inputLastName.addEventListener("input", e => {
    lastNameEmpty.style.display = "none";   
    inputLastName.style.border = "solid 1px rgb(135, 163, 166)";
});

inputEmail.addEventListener("input", e => {
    emailEmpty.style.display = "none";
    emailInvalid.style.display = "none";   
    inputEmail.style.border = "solid 1px rgb(135, 163, 166)";
});

inputMessage.addEventListener("input", e => {
    messageEmpty.style.display = "none"; 
    inputMessage.style.border = "solid 1px rgb(135, 163, 166)";
});

successDiv.classList.add("hidden");

submitButon.addEventListener("click", e => {
    e.preventDefault();

    // EMAIL VERIFICATION
    let email = inputEmail.value.trim();
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // RADIOS VERIFICATION
    let selected = false;
    let selectedRadio = null;
    const radios = document.querySelectorAll('input[name="query"]');
    const radioNotSelected = document.querySelector(".error-radio-not-selected-span");
    
    if(inputFirstName.value == ""){
        firstNameEmpty.style.display = "flex";
        inputFirstName.style.border = "solid 1px rgb(215, 60, 60)";
    }else{
        firstNameEmpty.style.display = "none";   
        inputFirstName.style.border = "solid 1px rgb(135, 163, 166)";          
    };

    if(inputLastName.value == ""){
        lastNameEmpty.style.display = "flex";
        inputLastName.style.border = "solid 1px rgb(215, 60, 60)";
    }else{
        lastNameEmpty.style.display = "none";   
        inputLastName.style.border = "solid 1px rgb(135, 163, 166)";          
    };

    if(inputEmail.value == "" || !emailRegex.test(email)){
        if(inputEmail.value == ""){
            emailEmpty.style.display = "flex";
            inputEmail.style.border = "solid 1px rgb(215, 60, 60)";
        } else if(!emailRegex.test(email)){
            emailInvalid.style.display = "flex";
            inputEmail.style.border = "solid 1px rgb(215, 60, 60)";    
        }
    }else{
        emailEmpty.style.display = "none";   
        emailInvalid.style.display = "none";
        inputEmail.style.border = "solid 1px rgb(135, 163, 166)";  
    }

    if(inputMessage.value == ""){
        messageEmpty.style.display = "flex";
        inputMessage.style.border = "solid 1px rgb(215, 60, 60)";   
    }

    radios.forEach(radio => {
        if (radio.checked) {
            selected = true;
            selectedRadio = radio;
        }
    });

    if (!selected) {
        radioNotSelected.style.display = "flex";
    } else {
        radioNotSelected.style.display = "none";
    }

    // CHECK VERIFICATION
    const checkButton = document.getElementById("consent-check");
    const notChecked = document.querySelector(".error-consent-not-checked-span");

    if(!checkButton.checked){
        notChecked.style.display = "flex";
    }else{
        notChecked.style.display = "none";
    }

    if(inputFirstName.value !== "" && inputLastName.value !== "" && inputEmail.value !== "" && emailRegex.test(email) && selected && inputMessage.value !== "" && checkButton.checked){
        successDiv.classList.remove("hidden");
        inputFirstName.value = "";
        inputLastName.value = "";
        inputEmail.value = "";
        inputMessage.value = "";

        radios.forEach(radio => {
            radio.checked = false;
            radio.parentElement.classList.remove("selected");
        });

        checkButton.checked = false;
    }
});

