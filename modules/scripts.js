export function greeting(name) {
    return `return ${name}`
}

export class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const config = {
    apiUrl: 'https://api.github.com/users/techorda3/repos?per_page=2&page=1'
};

export default config;

// export { User, greeting };