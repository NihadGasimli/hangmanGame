var hangmanWords = [
    "Elephant",
    "Computer",
    "Sunshine",
    "Butterfly",
    "Adventure",
    "Chocolate",
    "Rainbow",
    "Symphony",
    "Mountain",
    "Universe"
];

var word = "";

var u = [];

var rand;

var incorrects = false;

var counter = 0;

const spanDivs = document.querySelectorAll(".span")

var array = [];


function start() {
    clear()
    counter = 0;
    rand = Math.floor(Math.random() * 10);
    word = hangmanWords[rand];
    for (let i in word) {
        const h1Word = document.createElement("h1");
        const h1Lines = document.createElement("h1");
        h1Word.classList.add("h1Word")
        h1Lines.classList.add("h1Lines")
        h1Word.innerHTML = `${word[i]}`
        console.log(word)
        h1Lines.innerHTML = "_"
        u.push(h1Word);
        h1Lines.append(h1Word)
        document.querySelector(".altXett").append(h1Lines);
    }
}

window.onload = function () {
    start();
}

function click(e) {
    for (let i in word) {
        if (e == word[i].toLowerCase()) {
            u[i].style.display = "flex";
            for (let j in spanDivs) {
                if (u[i].innerHTML.toUpperCase() === spanDivs[j].innerHTML) {
                    spanDivs[j].style.backgroundColor = "green";
                    spanDivs[j].disabled = "true";
                    array.push(spanDivs[j].innerHTML.toLowerCase());
                }
            }
            incorrects = true;
        }

    }

    if (!incorrects) {
        document.querySelector(".image").src = `./assets/images/${counter + 1}.jpg`;
        counter++;
        document.querySelector(".counterText").innerHTML = `Changes left: ${9 - counter}`;
        for (let y = 0; y < spanDivs.length; y++) {
            var lowerCased = spanDivs[y].innerHTML.toLowerCase()
            if (lowerCased === e) {
                spanDivs[y].style.backgroundColor = "red"
                spanDivs[y].disabled = "true";
            }
        }

        if (counter === 10) {
            document.querySelector(".popUp2").style.display = "flex";
            clear();
            document.querySelector(".restart2").onclick = function () {
                document.querySelector(".popUp2").style.display = "none";
                start();
            }
            document.querySelector(".exit2").onclick = function () {
                window.close();
            }
        }
    }
    else {
        document.querySelector(".image").src = `./assets/images/${counter}.jpg`;
        incorrects = false;
        if (array.length === word.length) {
            document.querySelector(".popUp").style.display = "flex";
            clear();
            document.querySelector(".restart").addEventListener("click", function () {
                document.querySelector(".popUp").style.display = "none";
                start();
            })
            document.querySelector(".exit").addEventListener("click", function () {
                window.close();
            })
        }
    }

}

for (let i in spanDivs) {
    spanDivs[i].onclick = function () {
        var z = spanDivs[i].innerHTML.toLowerCase();
        click(z)
    }
}

function clear() {
    array = [];
    u = [];
    document.querySelector(".counterText").innerHTML = `Changes left: 9`;
    document.querySelector(".image").src = `./assets/images/${0}.jpg`;
    document.querySelector(".altXett").innerHTML = ""
    for (let i in spanDivs) {
        try {
            spanDivs[i].disabled = false;
            spanDivs[i].style.backgroundColor = "transparent";
        }
        catch { }
    }
}