/* popup API */
const popup = {
    open: (content) => {
        document.getElementById("pop").hidden = false;
        document.getElementById("popval").innerHTML = content;
    },
    close: () => {
        document.getElementById("pop").hidden = true;
    }
}

const variable = {}

//<numfy> function changes string into number.
function numfy(val) {
    const numval = Number(val)
    if (isNaN(numval)) {return val;} //if string
    else {return numval}
}

// 브라우저 지원 여부 확인
if (!('webkitSpeechRecognition' in window)) {
    alert("VoiceCode is only supported in CHrome for Desktop and Android only.")
} else {
    const recognition = new window.webkitSpeechRecognition;

    const status = document.getElementById("status");

    function syntax(code) {
        words = code.split(" ");

        //변수
        if (words[0] == "변수") {
            if (words.length < 4) {
                return "변수 등록에 알맞지 않은 문법이 사용되었습니다.";
            } else {
                const key = String(words.slice(1, words.indexOf("정의")).join(""));
                const val = numfy(words.slice(words.indexOf("정의")+1, words.length).join(" "));

                variable[key] = val;
                return true;
            }
        }
    }

    // Start btn click event
    document.getElementById("start").addEventListener("click", () => {
        status.innerText = "Listening...";
        recognition.start()
    })

    // Stop btn click event
    document.getElementById("stop").addEventListener("click", () => {
        status.innerText = "Not Listening...";
        recognition.stop()
    });

    // Result event
    recognition.addEventListener("result", (event) => {
        const { results, resultIndex } = event;
        const { transcript, confidence } = results[resultIndex][0];

        console.log(syntax(transcript));
    });
}