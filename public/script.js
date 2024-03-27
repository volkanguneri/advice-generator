"use strict";
// variables
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const adviceNumber = document.getElementById('advice-number');
const adviceText = document.getElementById('advice-text');
const btn = document.getElementById('bkc-icon');
class ResponseError extends Error {
    constructor(message, response) {
        super(message);
        this.response = response;
    }
}
function myFetch(input, init) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(input, init);
        if (!res.ok) {
            throw new ResponseError('Bad fetch response', res);
        }
        return res;
    });
}
function slip() {
    return __awaiter(this, void 0, void 0, function* () {
        let randomNumber = Math.floor(Math.random() * 219) + 1;
        try {
            const res = yield myFetch(`https://api.adviceslip.com/advice/${randomNumber}`);
            const data = yield res.json();
            let randomAdvice = data.slip.advice;
            adviceNumber.innerHTML = `#${randomNumber}`;
            adviceText.innerHTML = `“${randomAdvice}”`;
        }
        catch (err) {
            if (err instanceof ResponseError) {
                console.error('Erreur lors de la récupération du conseil:', err.response.statusText);
            }
            else {
                console.error('Erreur inattendue:', err);
            }
        }
    });
}
window.addEventListener('load', () => {
    slip();
});
btn.addEventListener('click', (e) => {
    e.preventDefault();
    slip();
});
