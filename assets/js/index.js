
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

// Validate Email
function Validateemail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value)) {
        return true;
    }
    ShowToast("Please Enter a Valid Email Address");
    return false;
}

// Validate Password
function ValidatePass() {
    if (document.getElementById("password").value.length > 5)
        return true;
    else
        ShowToast("Invalid Password");
    return false;

}

// Login
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
                    if (res.status == 400) {
                        ShowToast("Invalid Credentials")
                        document.getElementById("password").value = ''
                        document.getElementById("signin").disabled = false
                    } else if (res.status == 403) {
                        ShowToast("You don't have any active blog requests")
                        document.getElementById("password").value = ''
                        document.getElementById("signin").disabled = false
                    } else if (res.status == 200) {
                        res.json().then(function (data) {
                            if (data == null) { } else {
                                ShowToast("Successfully Logged In")
                                localStorage.setItem("TOKEN", "Token " + data.user.token)
                                localStorage.setItem("FULL_NAME", data.user.full_name)
                                document.getElementById("signin").disabled = false
                                return window.location.replace("/");
                            }
                        })
                    } else {
                        ShowToast("Server error. Our team has been informed. We are working on it.");
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

// Questions
function questions() {
    let fetchData = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Authorization': localStorage.getItem("TOKEN")
        },
    }
    fetch(QUESTIONS_URL + gup("id"), fetchData).then(function (response) {
        if (response.status == 200) {
            response.json().then(function (data) {
                for (var i = 0; i < data.payload.length; i++) {
                    addQuestion(data.payload[i].id, data.payload[i].question)
                }
            })
        } else if (response.status == 401) {
            window.location.replace('/login/');
            return ShowToast("Please login to continue")
        } else {
            ShowToast("There was some error. Our team has been informed. We are working on it.")
        }

    });
}

// Submit Answers
function submitAnswers() {
    textfields = document.getElementsByClassName("questionsanswer")
    var questions = []
    for (var i = 0; i < textfields.length; i++) {
        questions.push({ "question": textfields[i].id, "answer": textfields[i].value })
    }

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(questions),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('TOKEN')
        },
    }
    fetch(ANSWERS_ADD, fetchData)
        .then(function (res) {
            if (res.status == 400) {
                ShowToast("Looks like you tried doing something fishy.")
            } else if (res.status == 401) {
                ShowToast("Not Authorised. Please login again.")
                window.location.replace("signin/")
            } else if (res.status == 204) {
                ShowToast("Successfully submitted your answers. Wait till we redirect you.")
                setTimeout(function () {
                    return window.location.replace("/");
                }, 5000);
            } else {
                ShowToast("Server error. Our team has been informed. We are working on it.");
            }
            return;
        })
        .catch((error) => { })
}

// Add Questions
function addQuestion(id, question) {
    // console.log(id, question)
    html_text = `
    <div class="bordered p-3 my-3" id="questionContainer-${id}">
        <div class="row p-3">
            <p class="heading d-inline">Question :  <span id="questionID-${id}">${question}</span></p>
        </div>
        <form class="col s12 mt-n1">
            <div class="input-field col s12">
                <textarea class="questionsanswer" id="${id}" class="browser-default bordered"
                    placeholder="Type your answer here"></textarea>
            </div>
        </form>
    </div>
    `
    document.getElementById("questionHandler").insertAdjacentHTML('beforeend', html_text);
}

console.clear();