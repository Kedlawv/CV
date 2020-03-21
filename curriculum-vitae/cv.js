function init() {
    getCVJason();
}

function getCVJason() {
    fetch('cv.json').then(
        function (response) {
            return response.json().then(
                function (json) {
                    populate(json);
                })

        })
}

function populate(json) {
    const socialTitle = document.getElementById("social-title");
    const social = document.getElementById("social");
    const personalTitle = document.getElementById("personal-title");
    const personal = document.getElementById("personal");
    const exp = document.getElementById("exp");
    const edu = document.getElementById("edu");

    //
    populateFromObject(json.social, socialTitle, social);
    populateFromObject(json.personal, personalTitle, personal);
    populateFromArrayOfObjects(json.experience, exp)
    populateFromArrayOfObjects(json.education, edu)

}

function populateFromObject(json, left, right) {
    const ulLeft = document.createElement("ul");
    for (const prop in json) {
        const li = document.createElement("li");
        li.innerHTML = prop;
        ulLeft.appendChild(li);
    }
    left.appendChild(ulLeft);

    const ulRight = document.createElement("ul");
    for (const prop in json) {
        const li = document.createElement("li");
        li.innerHTML = json[prop];
        ulRight.appendChild(li);
    }
    right.appendChild(ulRight);
}

function populateFromArrayOfObjects(json, right) {
    right.innerHTML += "<hr>";

    for (let i = 0; i < json.length; i++) { //job object
        const ulRight = document.createElement("ul");
        let li = undefined;
        for (const prop in json[i]) {

            if (prop === "start-date") {
                li = document.createElement("li");
                li.setAttribute("id", "date");
                li.innerHTML = json[i][prop];
                continue;
            } else if (prop === "end-date") {
                li.innerHTML += " - ";
            }else if(prop === "company" || prop === "inst-name"){
                li = document.createElement("li");
                li.setAttribute("class","strong");
            } else {
                li = document.createElement("li");
            }
            li.innerHTML += json[i][prop];
            ulRight.appendChild(li);
        }
        right.appendChild(ulRight);
        right.innerHTML += "<hr>";

    }
}

