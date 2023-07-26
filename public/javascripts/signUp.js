function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function removeCookie(cname) {
    document.cookie = cname +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setCookie(cname, cvalue, exdays) {
    var expires = "expires=" + exdays.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confrimpassword = document.getElementById("confrimpassword");
var signup_continue = document.getElementById("signup_continue");
var continue_grp = document.querySelector(".continue_grp");
var submit_grp = document.querySelector(".submit_grp");
var user_information = document.querySelector(".user_information");
var user_password = document.querySelector(".user_password");
var matchpass = document.getElementById("matchpass");
var signup_btn = document.getElementById("signup_btn");
var signup_back_btn = document.getElementById("signup_back_btn");

if (getCookie('firstname')) {
    firstname.value = getCookie('firstname');
}
if (getCookie('lastname')) {
    lastname.value = getCookie('lastname');
}
if (getCookie('email')) {
    email.value = getCookie('email');
}

firstname.addEventListener("keyup", function(e) {
    if (firstname.value.length >= 3 && firstname.value.length < 32 ) {
        firstname.classList.remove('invalidate');
        firstname.classList.add('validate');
    } else {
        firstname.classList.add('invalidate');
        firstname.classList.remove('validate');
    }
});


lastname.addEventListener("keyup", function(e) {
    if (lastname.value.length >= 3 && lastname.value.length < 32) {
        lastname.classList.remove('invalidate');
        lastname.classList.add('validate');
    } else {
        lastname.classList.add('invalidate');
        lastname.classList.remove('validate');
    }
});
email.addEventListener("keyup", function(e) {
    var validRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (validRegex.test(email.value)) {
        email.classList.remove('invalidate');
        email.classList.add('validate');
    } else {
        email.classList.add('invalidate');
        email.classList.remove('validate');
    }
});

signup_continue.addEventListener('click', function (e) {
    var validRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (firstname.value == "") {
        firstname.classList.add('invalidate');
    }
    if (lastname.value == "") {
        lastname.classList.add('invalidate');
    }
    if (email.value == "") {
        email.classList.add('invalidate');
    }
    if (firstname.value !== "" && lastname.value !== "" && email.value !== "" && validRegex.test(email.value) && (firstname.value.length >= 3 && firstname.value.length < 32) && (lastname.value.length >= 3 && lastname.value.length < 32)) {
        var elem = document.getElementById('Timer');
        elem.style.display = "block";
        continue_grp.style.display = "none";
        submit_grp.style.display = "block";
        user_information.style.display = "none";
        user_password.style.display = "block";

        var date = new Date();
        date.setTime(date.getTime() + (30 * 1000));
        setCookie('firstname', firstname.value, date);
        setCookie('lastname', lastname.value, date);
        setCookie('email', email.value, date);

        var timeLeft = 30;


        var timerId = setInterval(countdown, 1000);

        function countdown() {
            if (timeLeft == 0) {
                clearTimeout(timerId);
                cookieRefresh()
                elem.style.display = "none";
            } else {
                elem.innerHTML = timeLeft + ' seconds remaining';
                timeLeft--;
            }
        }
    }
})

function cookieRefresh() {
    firstname.value = "";
    lastname.value = "";
    email.value = "";
    password.value = "";
    confrimpassword.value = "";
    firstname.classList.remove("invalidate");
    firstname.classList.remove("validate");
    lastname.classList.remove("invalidate");
    lastname.classList.remove("validate");
    email.classList.remove("invalidate");
    email.classList.remove("validate");
    password.classList.remove("invalidate");
    password.classList.remove("validate");
    confrimpassword.classList.remove("invalidate");
    confrimpassword.classList.remove("validate");
    continue_grp.style.display = "block";
    submit_grp.style.display = "none";
    user_information.style.display = "block";
    user_password.style.display = "none";
}
confrimpassword.addEventListener("keyup", function () {
    if (password.value !== confrimpassword.value) {
        matchpass.style.display = "block";
        signup_btn.disabled = true
    } else {
        matchpass.style.display = "none";
        signup_btn.disabled = false
    }

});
signup_btn.addEventListener("click", (e) => {
    var form = document.getElementById("signupForm");
    if (password.value == "") {
        password.classList.add('invalidate');
        return;
    }
    if (confrimpassword.value == "") {
        confrimpassword.classList.add('invalidate');
        return;
    }
    removeCookie("firstname");
    removeCookie("lastname");
    removeCookie("email");
    form.submit();
});
setTimeout(redirectLogin, 3000)

function redirectLogin() {
    var checkStatus = '<%= status %>';
    if (checkStatus == "success") {
        window.location.href = "login";
    }
}

signup_back_btn.addEventListener("click", function (e) {
    user_password.style.display = "none";
    user_information.style.display = "block";
    continue_grp.style.display = "block";
    submit_grp.style.display = "none";
});


