
BASE_URL = "https://whataftergrad.herokuapp.com/";
LOGIN_URL = BASE_URL + "api/auth/admin/sigin";
QUESTION_ADD = BASE_URL + "api/admin/questions/add";
ADD_BLOG = BASE_URL + "api/admin/blog/new";
ANSWERS_VIEW = BASE_URL + "api/admin/answers/view/"
BLOG_EDITOR = BASE_URL + "api/blog/root"

// Common Toast
function ShowToast(message) {
    var toastHTML = `<span>${message}</span>`;
    M.toast({ html: toastHTML });
}

console.clear();