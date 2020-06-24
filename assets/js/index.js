
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

function addBlogRequest() {
        if (!Validateemail()) { } else {
            document.getElementById("allotQuestionsNow").disabled = true
            let fetchData = {
                method: 'POST',
                body: JSON.stringify({
                    "email": document.getElementById("email").value,
                    "full_name": document.getElementById("name").value,
                    "phone": document.getElementById("phone").value,
                    "description": document.getElementById("description").value,
                }),
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('TOKEN')
                },
            }
            fetch(ADD_BLOG, fetchData)
                .then(function (res) {
                    if (res.status == 401) {
                        ShowToast("Can you login again?")
                        window.location.replace("/signin")
                    } else if (res.status == 201) {
                        ShowToast("Added User Succefully")
                        document.getElementById("email").value=''
                        document.getElementById("name").value =''
                        document.getElementById("phone").value=''
                        document.getElementById("description").value=''
                        document.getElementById("allotQuestionsNow").disabled = false
                    }else if (res.status == 403) {
                        ShowToast("Something went wrong. Our team has been informed")
                    } else {
                        ShowToast("Server error. Our team has been informed. Working on it.");
                    }
                    document.getElementById("allotQuestionsNow").disabled = false
                    return;
                })
                .catch((error) => { })
        }
    }



function gup(name) {
    url = location.href;
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}


function addQuestions(){
    textfields = document.getElementsByClassName("questionstext")
    var questions = []
    for(var i=0;i<textfields.length;i++){
        questions.push(textfields[i].value)
    }
    data = {
        "id":gup("id"),
        "questions":questions
    }
    console.log(data)
    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('TOKEN')
        },
    }
    fetch(QUESTION_ADD, fetchData)
        .then(function (res) {
            if (res.status == 400) {
                ShowToast("Looks like you messed up something with url!")
            }else if (res.status == 404) {
                ShowToast("Looks like you messed up something with url!")
            }else if (res.status == 401) {
                ShowToast("Not Authorised")
                window.location.replace("signin/")
            } else if (res.status == 201) {
                res.json().then(function (data) {
                    if (data == null) { } else {
                        ShowToast("Add Success!")
                        window.location.replace("/approvedRequests")
                    }
                })
            } else {
                ShowToast("Server error. Our team has been informed. Working on it.");   
            }
            return;
        })
        .catch((error) => { })
}


function savedata(saveData){
    id = gup("id");
    let fetchData = {
        method: 'POST',
        body: JSON.stringify({
            "blog_root": id,
            "blog_content":saveData
        }),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('TOKEN')
        },
    }
    fetch(BLOG_EDITOR, fetchData)
        .then(function (res) {
            if (res.status == 401) {
                ShowToast("Please Login Again!")
                // swindow.location.replace("/signin")
            } else if (res.status == 201) {
                res.json().then(function (data) {
                    if (data == null) { } else {
                        ShowToast("Data Saved!");
                        console.log(data)
                    }
                })
            }  else if (res.status == 400) {
                res.json().then(function (data) {
                    if (data == null) { } else {
                        console.log(data)
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
// console.clear();