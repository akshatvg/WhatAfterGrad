
(function ($) {
    "use strict";

    // Loader
    $(function () {
        var loader = function () {
            setTimeout(function () {
                if ($('#loader').length > 0) {
                    $('#loader').removeClass('show');
                }
            }, 1);
        };
        loader();
    });

    // Auto Init 
    M.AutoInit();

})(jQuery);


function Validateemail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value)) {
        return true;
    }
    ShowToast("Please enter a valid email address.");
    return false;
}

function ValidatePass() {
    if (document.getElementById("password").value.length > 5)
        return true;
    else
        ShowToast("Wrong password");
    return false;

}

function ValidatePassSignup() {
    if (document.getElementById("password").value.length > 5)
        return true;
    else
        ShowToast("Enter minimum 6 Characters");
    return false;

}


function Login() {
    if (!Validateemail()) { } else {
        if (!ValidatePass()) { } else {
            document.getElementById("signin").disabled = true
            let fetchData = {
                method: 'POST',
                body: JSON.stringify({
                    "username": document.getElementById("email").value,
                    "password": document.getElementById("password").value
                }),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            fetch(LOGIN_URL, fetchData)
                .then(function (res) {
                    if (res.status == 401) {
                        ShowToast("Wrong credentials!")
                        document.getElementById("password").value = ''
                        document.getElementById("signin").disabled = false
                    } else if (res.status == 200) {
                        res.json().then(function (data) {
                            if (data == null) { } else {
                                ShowToast("Login Success")
                                localStorage.setItem("TOKEN", "Token " + data.user.token)
                                localStorage.setItem("FULL_NAME", data.user.full_name)
                                document.getElementById("signin").disabled = false
                                return window.location.replace("/");
                            }
                        })
                    } else {
                        ShowToast("Server error. Our team has been informed. Working on it.");
                        document.getElementById("email").value = '';
                        document.getElementById("password").value = '';
                        document.getElementById("signin").disabled = false
                    }
                    return;
                })
                .catch((error) => { })
        }
    }
}

function SignUp() {
    if (!Validateemail()) { } else {
        if (!ValidatePassSignup()) { } else {
            document.getElementById("signup").disabled = true
            let fetchData = {
                method: 'POST',
                body: JSON.stringify({
                    "username": document.getElementById("email").value,
                    "password": document.getElementById("password").value,
                    "phone":document.getElementById("phone").value,
                    "full_name":document.getElementById("name").value,
                }),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            fetch(REGISTER_URL, fetchData)
                .then(function (res) {
                    console.log(res.status);
                    console.log(res.json)
                    if (res.status == 400) {
                        ShowToast("User Already exists!")
                        document.getElementById("password").value = ''
                        document.getElementById("signup").disabled = false
                    } else if (res.status == 200) {
                        res.json().then(function (data) {
                            if (data == null) { } else {
                                ShowToast("Login Success")
                                localStorage.setItem("TOKEN", "Token " + data.user.token)
                                localStorage.setItem("FULL_NAME", data.user.full_name)
                                document.getElementById("signup").disabled = false
                                return window.location.replace("/signin/");
                            }
                        })
                    } else {
                        ShowToast("Server error. Our team has been informed. Working on it.");
                        document.getElementById("email").value = '';
                        document.getElementById("password").value = '';
                        document.getElementById("signup").disabled = false
                    }
                    return;
                })
                .catch((error) => { })


        }
    }


}

function gup(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}



function Linkedin() {
    let fetchData = {
        method: 'POST',
        body: JSON.stringify({
            "code":gup('code', window.location.href)
        }),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(LINKEDIN_URL, fetchData)
        .then(function (res) {
            if (res.status == 400) {
                ShowToast("Authentication Failed! Redirecting to login...")
                setTimeout(function() {
                    return window.location.replace("/signin/");
                  }, 2000);
            } else if (res.status == 403) {
                ShowToast("Authentication code missing! Redirecting to login...")
                setTimeout(function() {
                    return window.location.replace("/signin/");
                  }, 2000);
            } else if (res.status == 206) {
                ShowToast("Account not authorised. You can authroise account in settings after logging in! Redirecting to login...")
                setTimeout(function() {
                    return window.location.replace("/signin/");
                  }, 2000);
            } else if (res.status == 200) {
                res.json().then(function (data) {
                    if (data == null) { } else {
                        ShowToast("Login Success")
                        localStorage.setItem("TOKEN", "Token " + data.user.token)
                        localStorage.setItem("FULL_NAME", data.user.full_name)
                        document.getElementById("signin").disabled = false
                        return window.location.replace("/");
                    }
                })
            }else {
                ShowToast("Server error. Our team has been informed. Working on it.");
                document.getElementById("email").value = '';
                document.getElementById("password").value = '';
                document.getElementById("signin").disabled = false
            }
            return;
        })
        .catch((error) => { })
}

// console.clear();