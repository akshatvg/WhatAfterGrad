
BASE_URL = "https://whataftergrad.herokuapp.com/";
LOGIN_URL = BASE_URL + "api/auth/admin/sigin/";
QUESTION_ADD = BASE_URL + "api/admin/questions/add";
ADD_BLOG = BASE_URL + "api/admin/blog/new";


function ShowToast(message) {
    var toastHTML = `<span>${message}</span>`;
    M.toast({ html: toastHTML });
}