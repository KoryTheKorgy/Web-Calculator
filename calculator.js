const display = document.querySelector("#display");
const button = document.querySelectorAll("button");
const operatorChar = ["+","-","*","/",".","^","√"];
const numberChar = ["00","0","1","2","3","4","5","6","7","8","9"];
const evalChar = ["%","=","±"];

let output = "";
let hasChar = false;

const calculate = (btnValue) => {
    if (btnValue == "0" && output == "0"){
        break;
    }
    if (numberChar.includes(btnValue)) {
        output += btnValue;
    }
    if (operatorChar.includes(btnValue) && output !== "") {
        if (operatorChar.includes(output[output.length - 1])) {
            output = output.slice(0,-1);
        }
        if (btnValue == "." && output.includes(".")) 
            return;
        output+=btnValue;
    }

    switch (btnValue) {            
        case "%":
            output = output + "/100";
            output = eval(output);
            (+output).toFixed(2);
            break;

        case "±":
            output = output + "*-1";
            output = eval(output);
            break;

        case "C":
            output = "";
            break;

        case "DEL":
            output = output.slice(0,-1);
            break;
        
        case "1/":
            output = "1/" + output;
            output = eval(output).toFixed(2);
            break;

        case "=":
            if (output.includes("^")) {
                number = output.split("^")[0];
                exponent = output.split("^")[1];
                output = Math.pow(number,exponent);
                break;
            }
            if (output.includes("√")) {
                root = output.split("√")[0];
                root = "1/" + root;
                root = eval(root).toFixed(2);
                number = output.split("√")[1];
                console.log(number);
                output = Math.pow(number,root);
                break;
            }
            if (operatorChar.includes(output[output.length - 1])) {
                break;
            }
            output = eval(output).toString(); 
            break;

    }

    display.value = output;
}

button.forEach((button) => {
    button.addEventListener("click", (event) => {
        calculate(event.target.dataset.value);
    })
})
