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
    const tech = document.getElementById("tech");
    const soft = document.getElementById("soft");


    populateFromObject(json.social, socialTitle, social);
    populateFromObject(json.personal, personalTitle, personal);
    populateFromArrayOfObjects(json.experience, exp);
    populateFromArrayOfObjects(json.education, edu);
    populateFromArray(json.technical_skills, tech);
    populateFromArray(json.soft_skills,soft);

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
            } else if (prop === "company" || prop === "inst-name") {
                li = document.createElement("li");
                li.setAttribute("class", "strong");
            } else {
                li = document.createElement("li");
            }
            li.innerHTML += json[i][prop];
            ulRight.appendChild(li);
        }
        right.appendChild(ulRight);

    }
}

function populateFromArray(json, right) {
    console.log(json);
    let ul = undefined;
    let ulDiv = undefined;
    let counter = 3;
    for (const prop in json) {
        if (counter === 3) {
            ulDiv = document.createElement("div");
            ulDiv.setAttribute("class","ulDiv");
            ul = document.createElement("ul");
            ul.setAttribute("class", "bulleted");
            ulDiv.appendChild(ul);
        }

        const li = document.createElement("li");
        li.innerHTML = json[prop];
        ul.appendChild(li);
        counter--;
        if (counter === 0) {
            right.appendChild(ulDiv);
            counter = 3;
        }
    }
}

