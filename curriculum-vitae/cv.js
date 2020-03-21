function init() {
    getCVJason();


}


function getCVJason() {
    fetch('cv.json').then(
        function (response) {
            return response.json().then(
                function (json) {
                    populateSocialPersonal(json);
                })

        })
}

function populateSocialPersonal(json) {
    const socialTitle = document.getElementById("social-title");
    const social = document.getElementById("social");
    const personalTitle = document.getElementById("personal-title");
    const personal = document.getElementById("personal");

    const ulTitle = document.createElement("ul");
    for (const prop in json.social) {
        const li = document.createElement("li");
        li.innerHTML = prop;
        ulTitle.appendChild(li);
    }
    socialTitle.appendChild(ulTitle);

    const ulContent = document.createElement("ul");
    for (const prop in json.social) {
        const li = document.createElement("li");
        li.innerHTML = json.social[prop];
        ulContent.appendChild(li);
    }
    social.appendChild(ulContent);
}