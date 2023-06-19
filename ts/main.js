var firstInput = document.getElementById('firstInput');
var secondInput = document.getElementById('secondInput');
var submitBtn = document.getElementById('submitBtn');
function add(num1, num2, operation) {
    if (operation === void 0) { operation = '+'; }
    switch (operation) {
        case '+':
            return num1 + num2;
        default:
            throw new Error('Operation Not Found');
    }
}
function printResult(result, mode) {
    if (mode === 'success') {
        console.log("Result is ".concat(result));
    }
}
function isEven(result) {
    return result % 2 === 0 ? false : true;
}
function send(payload, httpMethod) {
    console.log({ payload: payload });
}
var resultState = [];
var payloadState = [];
submitBtn.addEventListener('click', function () {
    var num1 = +firstInput.value;
    var num2 = secondInput.valueAsNumber;
    var res = add(num1, num2);
    resultState.push(res);
    console.log(resultState);
    var payload = {
        res: res,
        header: "Bearer"
    };
    send(payload, 0 /* HttpMethod.GET */);
    payloadState.push(payload);
    printResult(res);
});
