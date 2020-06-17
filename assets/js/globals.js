
BASE_URL = "https://whataftergrad.herokuapp.com/";
LOGIN_URL = BASE_URL + "api/auth/login";
REGISTER_URL = BASE_URL + "api/auth/signup";
LINKEDIN_URL = BASE_URL + "api/auth/linkedin";

function ShowToast(message) {
    var toastHTML = `<span>${message}</span>`;
    M.toast({ html: toastHTML });
}