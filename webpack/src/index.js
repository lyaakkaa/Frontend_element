import {User} from './user';
import greeting from './greeting';
import { test } from './test';

import './styles/styles.css';


const user = new User("Leila", 19);
console.log(greeting(user.name));
test();

const obj = {
    ...user,
    id: crypto.randomUUID()
}

console.log(obj);