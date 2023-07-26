const logoutField = document.getElementById('logout')
if (logoutField) {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = '/login'
}
var loginBtn = document.getElementById("login_btn");
loginBtn.addEventListener("click", function(e) {
    var form = document.getElementById("loginForm");
    if (form[0].checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add("was-validated");
        return;
    }
    form.submit();
})
