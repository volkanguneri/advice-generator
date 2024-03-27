// variables

const adviceNumber = document.getElementById('advice-number') as HTMLSpanElement;
const adviceText = document.getElementById('advice-text') as HTMLParagraphElement;
const btn = document.getElementById('bkc-icon') as HTMLDivElement;

class ResponseError extends Error {
    constructor(message: string, public response: Response) {
       super(message);
    }
}

async function myFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
 const res = await fetch(input, init);
 if (!res.ok) {
    throw new ResponseError('Bad fetch response', res);
 }
 return res;
}

async function slip(): Promise<void> {
    let randomNumber: number = Math.floor(Math.random() * 219) + 1;
    try {
       const res = await myFetch(`https://api.adviceslip.com/advice/${randomNumber}`);
       const data = await res.json();
       let randomAdvice: string = data.slip.advice;
       adviceNumber.innerHTML = `#${randomNumber}`;
       adviceText.innerHTML = `“${randomAdvice}”`;
    } catch (err) {
       if (err instanceof ResponseError) {
         console.error('Erreur lors de la récupération du conseil:', err.response.statusText);
       } else {
         console.error('Erreur inattendue:', err);
       }
    }
}

window.addEventListener('load', () => {
    slip();
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    slip();
});


   