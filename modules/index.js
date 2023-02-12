import {greeting, User as MyUser, default as config } from "./scripts.js";

// import * as scripts from './scripts.js'
// import { User } from 'some-library.js';

const name = 'Nico';

/**
 * Named
 * Default
 */

const user = new MyUser('TechOrda', 1);
console.log(user)
console.log(greeting(name));

console.log(config)

// console.log(scripts.default)

document.querySelector('button').addEventListener('click', () => {
    import('./pi.js')
        .then(module => console.log(module.PI))
        .catch(console.error)
})