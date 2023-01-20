// variables

const adviceNumber = document.getElementById('advice-number');
const adviceText = document.getElementById('advice-text');
const btn = document.getElementById('bkc-icon');


function slip() {
    let randomNumber = Math.floor(Math.random() * 219) + 1;
    fetch(`https://api.adviceslip.com/advice/${randomNumber}`)
        .then(res => res.json())
        .then(data => {
            let randomAdvice = data.slip.advice
            adviceNumber.innerHTML = `#${randomNumber}`;
            adviceText.innerHTML = `“${randomAdvice}”`;
        })
}

// EVent listeners

window.addEventListener('load', () => {
    slip();
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    slip();
});

