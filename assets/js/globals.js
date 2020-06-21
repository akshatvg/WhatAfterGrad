
BASE_URL = "https://whataftergrad.herokuapp.com/";
LOGIN_URL = BASE_URL + "api/auth/influencer/signin";

function ShowToast(message) {
    var toastHTML = `<span>${message}</span>`;
    M.toast({ html: toastHTML });
}