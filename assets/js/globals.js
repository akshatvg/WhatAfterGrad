BASE_URL = "https://whataftergrad.herokuapp.com/";
LOGIN_URL = BASE_URL + "api/auth/login";
REGISTER_URL = BASE_URL + "api/auth/signup";
LINKEDIN_URL = BASE_URL + "api/auth/linkedin";
BLOG_URL = BASE_URL + "api/blog/view";
DASH_URL = BASE_URL + "api/blog/dash";



function ShowToast(message) {
    var toastHTML = `<span>${message}</span>`;
    M.toast({ html: toastHTML });
}