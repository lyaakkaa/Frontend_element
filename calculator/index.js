const calculator = document.querySelector('.calculator');
let history = [];
let tempNumber = '';
let operation = '';

calculator.addEventListener('click', (event)=>{
    const target = event.target;
    if(target.classList.contains('calc_col')){
        // alert(event.target.innerHTML)
        // console.log(target.dataset.type);
        const data = target.dataset.type;
        checkOperation(data);
      
        renderTotal(tempNumber);
        // console.log(tempNumber);
        renderHistory(history);
        // tempNumber += data;
        // history.push(data);
    }
    // console.log(history);
})

function checkOperation(data){
    if(data >= 0){
        operation = 'number';
        if(tempNumber > 0){
            tempNumber += data;
        }
        else tempNumber = data;
    }
    else if(data === 'float'){
        operation = data;
        if(!/\./.test(tempNumber)){   // Если точка уже есть
            if(tempNumber){
                tempNumber += '.';
            }
            else{
                tempNumber += '0.';
            }     
        }
    }
    else if(data === 'delete' && operation === 'number'){
        tempNumber = tempNumber.substring(0, tempNumber.length - 1);
    }
    else if(['+', '-', '*', '/'].includes(data) && tempNumber){
        operation = data;
        history.push(tempNumber, operation);
        tempNumber = '';
    }
    else if(data === '='){
        history.push(tempNumber);
        tempNumber = calculate(history);
        history = [];
    }
    else if(data === 'clear'){
        history = [];
        tempNumber = '0';
    }
    
}

function renderTotal(value){
    const totalBlock = calculator.querySelector('.calc-total');
    totalBlock.innerHTML = value;
}

function renderHistory(historyArray){
    const historyBlock = calculator.querySelector('.calc-history');
    let htmlElements = '';
    
    historyArray.forEach((value) => {
        if(value >= 0){
            htmlElements += `&nbsp<span>${value}</span>`;
        }
        else if(['+', '-', '*', '/'].includes(value)){
            htmlElements += `&nbsp<strong>${value}</strong>`;
        }
    
    })
    historyBlock.innerHTML = htmlElements;
}

function calculate(historyArray){
    let total = 0;
    historyArray.forEach((item, index) => {
        if(index === 0) total = parseFloat(item);
        else if(index - 2 >= 0){
            if(item >= 0){
                if(historyArray[index - 1] === '+'){
                    total += parseFloat(item);
                }
                else if(historyArray[index - 1] === '-'){
                    total -= parseFloat(item);
                }
                else if(historyArray[index - 1] === '*'){
                    total *= parseFloat(item);
                }
                else if(historyArray[index - 1] === '/'){

                    total /= notZero(parseFloat(item));
                }
            }
        }
    })
    return total;
}

function notZero(n) {
    n = +n;  // Coerce to number.
    if (!n) {  // Matches +0, -0, NaN
      throw new Error('Invalid dividend ' + n);
    }
    return n;
  }