const clickmeOne = document.querySelector('#one');
const clickmeTwo = document.querySelector('#two');

// clickmeOne.addEventListener('click', () => {});
// clickmeTwo.addEventListener('click', () => {});

// console.log('Starting');
//
// setTimeout(() => {
//     console.log('SetTimeout 1');
// }, 0);
//
// setTimeout(() => {
//     console.log('SetTimeout 2');
// }, 0);
//
// setTimeout(() => {
//     console.log('SetTimeout 3');
// }, 0);
//
// setTimeout(() => {
//     console.log('SetTimeout 4');
// }, 0);
//
// for (let i = 0; i < 100; i++) {
//     console.log(i);
// }
//
// console.log('Ending');

const go = document.querySelector('.go');

const wait = (timeout = 1000) => new Promise((resolve) => setTimeout(resolve, timeout))

go.addEventListener('click', async function () {
    // Callback
    // setTimeout(() => {
    //     this.classList.add('rounded');
    //     setTimeout(() => {
    //         this.classList.add('red');
    //         setTimeout(() => {
    //             this.classList.add('bold');
    //             setTimeout(() => {
    //                 this.classList.add('remove');
    //                 setTimeout(() => {
    //                     this.classList.add('add');
    //                 }, 1000);
    //             }, 1000);
    //         }, 1000)
    //     }, 1000);
    // }, 1000);

    // wait()
    //     .then(() => this.classList.add('rounded'))
    //     .then(() => wait())
    //     .then(() => this.classList.add('red'))
    //     .then(() => wait())
    //     .then(() => this.classList.add('bold'))
    //     .then(() => wait())
    //     .then(() => this.classList.add('remove'))
    //     .then(() => wait())
    //     .then(() => this.classList.add('add'))
    //     .then(() => wait());

    await wait();
    this.classList.add('rounded')

    await wait();
    this.classList.add('red')

    await wait();
    this.classList.add('bold')

    await wait();
    this.classList.add('remove')

    await wait();
    this.classList.add('add');
});

function makePizza(type) {
    const promise = new Promise(((resolve, reject) => {

        if (type === 'onion') {
            reject('I dont want pizza');
        }

        resolve('value is resolved');
    }));

    return promise;
}

const pizzaOne = makePizza('onion');
const pizzaTwo = makePizza('onion');
const pizzaThree = makePizza();

Promise.any([pizzaOne, pizzaTwo, pizzaThree])
    .then(console.log)
    .catch(console.error)

// Promise.all([pizzaOne, pizzaTwo, pizzaThree])
//     .then(console.log)
//     .catch(console.error);

// Promise.allSettled([pizzaOne, pizzaTwo, pizzaThree])
//     .then(console.log)
//     .catch(console.error);

// Promise.race([pizzaOne, pizzaTwo, pizzaThree])
//     .then(console.log)
//     .catch(console.error);

async function init() {
    try {
        const pizza =  await makePizza();
        await makePizza();
        await makePizza();
        await makePizza();
        await makePizza('onion');
        await makePizza();
        await makePizza();
    } catch (e) {
        console.error(e);
    } finally {
        console.log('FInally')
    }
}

// init();

// makePizza('onion')
//     .then(pizza => {
//         console.info(pizza);
//     })
//     .catch(err => {
//         console.error(err);
//         return makePizza()
//     })
//     .then(pizza => {
//         console.log(pizza);
//     })
//     .finally(() => {
//         console.log('Finally');
//     });