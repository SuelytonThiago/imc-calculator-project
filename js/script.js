const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25.0,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30.0,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40.0,
        max: 99.0,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
] 

const calculatorContainer = document.querySelector("#calculator-container");
const resultsContainer = document.querySelector("#results-container");

const calculateBtn = document.querySelector("#calculate-btn");
const backBtn = document.querySelector("#back-btn"); 
const heightInput = document.querySelector("#height-user");
const weightInput = document.querySelector("#weight-user");
const imc = document.querySelector("#imc");
const situation = document.querySelector("#situation");

const imcTable = document.querySelector("#imc-table");

function calculateIMC(height, weight){
    return weight/(height * height);
}
function createTable(data){
    data.forEach((item) =>{
        const div = document.createElement("div");
        div.classList.add("table-data")

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);


        imcTable.appendChild(div);
        
    })
}

function addIMCValue(total){
    const span = resultsContainer.querySelector("#imc span");
    const newSpan = document.createElement("span")
    newSpan.textContent = total
    imc.replaceChild(newSpan,span);
}

function addSituationDescription(total){
    const span = resultsContainer.querySelector("#situation span");
    const newSpan = document.createElement("span");

    if( total < 18.5){
        newSpan.textContent = "Magreza"
        situation.replaceChild(newSpan,span)
        newSpan.classList.toggle("good")
    }
    if(total > 18.5 && total < 24.9){
        newSpan.textContent = "Normal"
        situation.replaceChild(newSpan,span)
        newSpan.classList.toggle("low")
    }
    if(total > 25.0 && total < 29.9){
        newSpan.textContent = "Sobrepeso"
        situation.replaceChild(newSpan,span)
        newSpan.classList.toggle("medium")
    }
    if(total > 30.0 && total < 39.9){
        newSpan.textContent = "Obesidade"
        situation.replaceChild(newSpan,span)
        newSpan.classList.toggle("high")
    }
    if(total > 40.0){
        newSpan.textContent = "Obesidade grave"
        situation.replaceChild(newSpan,span)
        newSpan.classList.toggle("high")
    }
}

function validDigits(text){
    return text.replace(/[^0-9.]/g, "");
}

[heightInput,weightInput].forEach((element) =>{
    element.addEventListener("input",(e) =>{
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    })
})


createTable(data);

calculateBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    
    const height = heightInput.value;
    const weight = weightInput.value;

    if(!height || !weight) return;

    const total = calculateIMC(height,weight).toFixed(1);
    console.log(total);
    addIMCValue(total);
    addSituationDescription(total);

    resultsContainer.classList.remove("hide");
    calculatorContainer.classList.add("hide");
})

backBtn.addEventListener("click",() =>{
    calculatorContainer.classList.remove("hide");
    resultsContainer.classList.add("hide")
})