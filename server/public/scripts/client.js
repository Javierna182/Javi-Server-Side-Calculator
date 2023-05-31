console.log('script sourced');

let contentDiv = document.querySelector('#contentDiv');
let totalOutput = document.querySelector('#output');
let valueToAdd = {}

const btns = document.querySelectorAll('.btn');

btns.forEach(btn => {
    btn.addEventListener('click', function handleClick(event){
        console.log(btn)
        valueToAdd.symbol = btn.innerHTML 
    })
})// this function of functions allows Add event listener to all Elements with Class in JavaScript
// it is used on each of the buttons on the html

function clear(event) {
    event.preventDefault();
    document.querySelector("#output").value = '';
    document.querySelector("#value1").value = '';
    document.querySelector("#value2").value = '';

    fetch('/delete')
    .then((response) => {
        console.log('All clear', response);
    })
}//Clears value 1, value 2 and total


function getValues() {
    fetch('/values')
    .then((response) => {
         // This code runs on a successful response from server
         console.log('Response received:', response);
         return response.json();
    })
    .then((values) => {
        for(let value of values){
            console.log(value);
            contentDiv.innerHTML += `
            <tr>
            <td>${value.value1}</td>
            <td>${value.symbol}</td>
            <td>${value.value2}</td>
            <td>${value.total}</td>
            </tr>
            `;
        }
        document.getElementById('output').innerHTML = values[values.length-1].total;
    })
    .catch((error) => {
      // ALWAYS add .catch
      console.log("Error with request:", error);
      alert("Something went wrong.");
    })
}//end of getValues

function submitValues(event) {
    event.preventDefault();

    valueToAdd.value1 = Number(document.getElementById('value1').value);// for input value1
    valueToAdd.value2 = Number(document.getElementById('value2').value);// for input value1
    
    fetch('/values', {
       method: "POST",
       body: JSON.stringify(valueToAdd),//here is where we define the body
       headers: { "Content-Type": "application/json" }, 
    })
    .then(() => {
      value1 = "";
      symbol = "";
      value2 = "";
      contentDiv.innerHTML = "";
      getValues();
    })
    .catch((error) => {
        // ALWAYS add .catch
        console.log("Error with request:", error);
        alert("Something went wrong.");
      });
    
    fetch('')  
}//end of submitValues

