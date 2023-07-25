const firstInput = document.getElementById('firstInput') as HTMLInputElement;
const secondInput = <HTMLInputElement>document.getElementById('secondInput');
const submitBtn = document.getElementById('submitBtn');


type PayloadState = {res: number, header: string};
type ModeType = 'success' | 'error';

const enum HttpMethod  { GET, POST, PUT, PATCH, DELETE, OPTIONS }

function add(num1:number, num2:number, operation: '+' | '-' | '*' | '/' = '+') :number{
    switch (operation) {
        case '+':
            return num1 + num2;
        default:
            throw new Error('Operation Not Found')
    }
}

function printResult(result:number, mode: ModeType) :void{
    if(mode === 'success'){
        console.log(`Result is ${result}`);
    }
    
}

function isEven(result: number): boolean {
    return result % 2 === 0 ? false : true;
}

function send(payload : PayloadState, httpMethod: HttpMethod){
    console.log({payload});
}



const resultState : number[] = [];
const payloadState : PayloadState[] = [];


submitBtn!.addEventListener('click', ()=>{
    const num1 = +firstInput.value;
    const num2 = secondInput.valueAsNumber;

    const res:number= add(num1, num2);

    resultState.push(res);

    console.log(resultState);

    const payload: PayloadState = {
        res: res,
        header: "Bearer"
    };
    send(payload, HttpMethod.GET);

    payloadState.push(payload);

    printResult(res, 'error');
})


