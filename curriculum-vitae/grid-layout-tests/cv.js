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
    const lan = document.getElementById("lan");


    populateFromObject(json.social, socialTitle, social);
    populateFromObject(json.personal, personalTitle, personal);
    populateFromArrayOfObjects(json.experience, exp);
    populateFromArrayOfObjects(json.education, edu);
    populateFromArray(json.technical_skills, tech);
    populateFromArray(json.soft_skills, soft);
    populateFromArray(json.languages, lan);

}

function populateFromObject(json, left, right) {

    for (const prop in json) {
        const p = document.createElement("p");
        p.innerHTML = prop;
        left.appendChild(p);
    }

    for (const prop in json) {
        const p = document.createElement("p");
        if (/.+\/+/.test(json[prop])) {
            let a = document.createElement("a");
            a.setAttribute("href", json[prop]);
            a.setAttribute("alt", json[prop]);
            a.innerHTML = json[prop];
            p.appendChild(a);
        } else {
            p.innerHTML = json[prop];
        }
        right.appendChild(p);
    }
}

function populateFromArrayOfObjects(json, right) {

    for (let i = 0; i < json.length; i++) { //job object

        let p = document.createElement("p");
        for (const prop in json[i]) {
            if (prop === "start-date") {
                p.innerHTML = json[i][prop];
                continue;
            } else if (prop === "end-date") {
                p.innerHTML += " - " + json[i][prop] + "<br>";
                continue;
            } else if (prop === "company" || prop === "inst-name") {
                let strong = document.createElement("strong");
                strong.innerHTML = json[i][prop] + "<br>";
                p.appendChild(strong);
                continue;
            }

            p.innerHTML += json[i][prop] + "<br>";
        }
        right.appendChild(p);

    }
}

function populateFromArray(json, right) {
    console.log(json);
    let ul = undefined;
    let ulDiv = undefined;
    let counter = 3;
    let i = 0;
    let length = Object.keys(json).length;

    for (const prop in json) {

        console.log("prop: " + prop + "value: " + json[prop]);
        if (counter === 3) {
            ulDiv = document.createElement("div");
            ulDiv.setAttribute("class", "ulDiv");
            ul = document.createElement("ul");
            ul.setAttribute("class", "bulleted");
            ulDiv.appendChild(ul);
        }

        const li = document.createElement("li");
        li.innerHTML = json[prop];
        ul.appendChild(li);
        counter--;
        i++;
        if (counter === 0 || i === length) {
            right.appendChild(ulDiv);
            counter = 3;
        }
    }
}

