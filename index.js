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

const variable = {
    list: {},
    replace: (val) => {
        if (variable.list.hasOwnProperty(val)) {
            return variable.list[val];
        } else {
            return val;
        }
    }
}

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
    const recognition = new window.webkitSpeechRecognition();

    const status = document.getElementById("status");

    function syntax(code) {
        words = code.split(" ");

        //변수
        if (words[0] === "변수") {
            const key = String(words.slice(1, words.indexOf("정의")).join(""));
            const val = numfy(words.slice(words.indexOf("정의")+1, words.length).join(" "));

            variable.list[key] = val;
            return true;
        } else if (`${words[0]} ${words[1]}` === "팝업 열기") {
            popup.open(variable.replace(words[2]))
            return true;
        }
    }

    // Start btn click event
    document.getElementById("start").addEventListener("click", () => {
        status.innerText = "Listening...";
        recognition.start()

        document.getElementById("start").hidden = true;
        document.getElementById("stop").hidden = false;
    })

    // Stop btn click event
    document.getElementById("stop").addEventListener("click", () => {
        status.innerText = "Not Listening...";
        recognition.stop();

        document.getElementById("start").hidden = false;
        document.getElementById("stop").hidden = true;
    });

    // Result event
    recognition.addEventListener("result", (event) => {
        const { results, resultIndex } = event;
        const { transcript } = results[resultIndex][0];

        console.log(syntax(transcript));
    });
}