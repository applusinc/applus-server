import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1BDZFSdkCWfMMPP4FGYS35oMw-rnYauk",
    authDomain: "apay-tr.firebaseapp.com",
    projectId: "apay-tr",
    storageBucket: "apay-tr.appspot.com",
    messagingSenderId: "144147743709",
    appId: "1:144147743709:web:a50d886bb85aad9cb4ec34",
    measurementId: "G-9Z3T0J3YDN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'tr';

let recapSolved = false;
document.addEventListener("DOMContentLoaded", () => {

    let recapSolved = false;
    const searchParams = new URLSearchParams(window.location.search);
    const deniedElem = document.getElementById("denied");
    const recaptchaContainerElem = document.getElementById("recaptcha-container");
    const otpViewElem = document.getElementById("otpview");
    const detailElem = document.getElementById("detail");

    if (!searchParams.has('phone')) {
        if (deniedElem) deniedElem.style.display = 'block';
        if (recaptchaContainerElem) recaptchaContainerElem.style.display = 'none';
        if (otpViewElem) otpViewElem.style.display = 'none';
    } else {
        if (deniedElem) deniedElem.style.display = 'none';
        const raw = "+" + String(searchParams.get("phone")).replace(/\D/g, '');
        const formatted = formatPhoneNumber(raw);
        detailElem.innerHTML = formatted + " telefon numarasına 6 haneli kod gönderildi.";
    }

    if (otpViewElem) otpViewElem.style.display = 'none';

    const inputs = document.querySelectorAll("input");
    const button = document.querySelector("button");

    inputs.forEach((input, index1) => {
        input.addEventListener("keyup", (e) => {
            const currentInput = input;
            const nextInput = input.nextElementSibling;
            const prevInput = input.previousElementSibling;

            if (currentInput.value.length > 1) {
                currentInput.value = "";
                return;
            }

            if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
                nextInput.removeAttribute("disabled");
                nextInput.focus();
            }

            if (e.key === "Backspace") {
                inputs.forEach((input, index2) => {
                    if (index1 <= index2 && prevInput) {
                        input.setAttribute("disabled", true);
                        input.value = "";
                        prevInput.focus();
                    }
                });
            }

            if (!inputs[3].disabled && inputs[3].value !== "") {
                
                    button.classList.add("active");
                
                return;
            }
            button.classList.remove("active");
        });
    });

    window.addEventListener("load", () => inputs[0].focus());

    document.getElementById("verifyBtn").addEventListener("click", function (){
        if (button.classList.contains("active")) {
            let otpCode = "";
            inputs.forEach(input => {
                otpCode += input.value;
            });
            if(otpCode.length == 6){
                codeverify(otpCode);
            }
            
        }
    })
    render();
    function render() {
        window.recaptchaVerifier = new RecaptchaVerifier( 'recaptcha-container', {
            'callback': (response)=>{
                recapSolved = true;
                const phoneNumber = searchParams.get('phone');
                if (phoneNumber) {
                    sendOtp(phoneNumber);
                    if (otpViewElem) otpViewElem.style.display = 'block';
                }
            },
            'expired-callback': () => {
            recapSolved = false;
            if (otpViewElem) otpViewElem.style.display = 'none';
        }
        }, auth);
        recaptchaVerifier.render();
    }

    function sendOtp(phoneNumber) {
        const formattedPhoneNumber = "+" + String(phoneNumber).replace(/\D/g, '');
        console.log("Formatted Phone Number: ", formattedPhoneNumber);
        const appVerifier = window.recaptchaVerifier;
    
        signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                otpViewElem.style.display = 'block';
                recaptchaContainerElem.style.display = 'none';
            })
            .catch((error) => {
                console.error("Error during signInWithPhoneNumber", error);
            });
    }

    function codeverify(code) {
        window.confirmationResult.confirm(code).then(function () {
            console.log('OTP Verified');
            document.getElementById("successAlert").classList.remove("message");
            document.getElementById("errorAlert").classList.add("message");
        }).catch(function () {
            console.log('OTP Not correct');
            document.getElementById("successAlert").classList.add("message");
            document.getElementById("errorAlert").classList.remove("message");
        })
    }
});

function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return ['+', match[1], ' ', match[2], ' ', match[3], ' ', match[4]].join('');
    }
    return phoneNumber;
}
