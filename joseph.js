
let passwords = [
    {pass: "123456", type: "weak"},
    {pass: "T!ger#92Moon", type: "strong"},
    {pass: "password", type: "weak"},
    {pass: "X9@mP!2qL#7z", type: "strong"},
    {pass: "qwerty123", type: "weak"}
];

let index = 0;
let score = 0;
let answered = false;

function check(answer) {
    if (answered) return;
    answered = true;

    if (answer === passwords[index].type) {
        score += 10;
        document.getElementById("feedback").innerText = "Correct! 🎉";
    } else {
        document.getElementById("feedback").innerText = "Wrong! Try again next time.";
    }

    document.getElementById("score").innerText = score;
}

function next() {
    if (!answered) return;

    index++;

    if (index >= passwords.length) {
        alert("Game Over! Your score: " + score + "/50");
        index = 0;
        score = 0;
        document.getElementById("score").innerText = score;
    }

    answered = false;
    document.getElementById("password").innerText = passwords[index].pass;
    document.getElementById("feedback").innerText = "";
}
