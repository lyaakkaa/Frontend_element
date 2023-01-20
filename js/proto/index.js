
/*
    Array, NUmber, Boolean, String, Object
    typeof myDate
    myDate instanceof Date
 */

/*
    Prototypes are the mechanism by which JavaScript objects inherit features from one another
 */

    const age = 12;
    const age2 = new Number(10);
    // console.dir(age2);
    
    const myObject = {
        city: "Madrid",
        greet() {
            console.log(`Greetings from ${this.city}`);
        },
    };
    
    // console.log(myObject)
    
    // console.log(myObject.__proto.object.toString().__prot)
    
    // console.log(Object)
    /*
    __defineGetter__
    __defineSetter__
    __lookupGetter__
    __lookupSetter__
    __proto__
    city
    constructor
    greet
    hasOwnProperty
    isPrototypeOf
    propertyIsEnumerable
    toLocaleString
    toString
    valueOf
    
    Every object in JavaScript has a built-in property,
    which is called its prototype. The prototype is itself an object,
    so the prototype will have its own prototype, making what's called a prototype chain.
    
    Prototypes are a powerful and very flexible feature of JavaScript, making it possible to reuse code and combine objects.
    
    
     */
    
    const myDate = new Date(1995, 11, 17);
    
    // console.dir(myDate);
    
    // console.log(myDate.getYear()); // 95
    
    myDate.getYear = function () {
        // console.log("something else!");
    };
    
    /*
        __proto__
        prototype
     */
    
    function Point(x, y) {
        this.x = x;
        this.y = y;
    
        this.rectangle = function () {}
    }
    
    class Human {
        legs;
        age;
    
        constructor(legs, age) {
            this.legs = legs;
            this.age = age
        }
    }
    
    class User extends Human {
        age;
        _name;
    
        #password;
    
        constructor(age, name, password) {
            super(2, 32);
    
            this.age = age;
            this._name = name;
            this.#password = password
        }
    
        printAge() {
            this.#printSecret();
            console.log(this.age)
            console.log(`User's age is ${this.age}`)
        }
    
        #printSecret() {
            console.log(`the secret is ${this.#password}`)
        }
    
        static ask() {
            prompt('Are u sure??');
        }
    
        set name(val) {
            if (val < 18) {
                throw new Error('Error')
            } else {
                this._name = val;
            }
        }
    
        get name() {
            return this._name
        }
    }
    
    const myPoint = new Point(12, 43);
    const user = new User(12, 'TechOrda', crypto.randomUUID());
    user.name = 112;
    
    console.log(user.name);
    
    // User.ask()
    
    // console.log(user)
    // console.log(user.printAge())
    // user.printAge()
    
    // console.log(myPoint);
    
    // the following are all true
    // console.log(myPoint.__proto__ == Point.prototype)
    // console.log(myPoint.__proto__.__proto__ == Object.prototype)
    // myPoint instanceof Point;
    // myPoint instanceof Object;
    
    // bind, call, apply
    // myDate.getYear(); // 'something else!'
    
    const person = {
        name: 'Wes Bos',
        sayHi: function() {
            console.log(this)
            return `hey ${this.name}`;
        },
    };
    
    // this = person
    // console.log(person.sayHi())
    
    // const sayHi = person.sayHi;
    
    // console.log(sayHi());
    // this = person
    const sayHi = person.sayHi.bind({name: 'Nico'});
    // console.log(sayHi())
    
    
    
    
    // $ doc
    //
    
    const $ = document.querySelector.bind(document);
    
    // console.log($('p'));
    
    const bill = {
        total: 1000,
        calculate (taxRate) {
            // console.log(this);
            const self = this
            return self.total + (self.total * taxRate);
        }
    }
    // const total = bill.calculate(0.13);
    // console.log(total);
    
    const anotherBill = {
        total: 100
    }
    
    const calc = bill.calculate.call(anotherBill, 0.13, 2);
    // console.log(calc)
    
    const anotherSecondBill = {
        total: 10
    }
    
    const calc2 = bill.calculate.apply(anotherSecondBill, [0.13, 12]);
    
    // console.log(calc2)
    
    // $('button').addEventListener('click', e => {
    //     // console.log(this);
    // })
    
    // $('button').addEventListener('click', function () {
    //     console.log(this)
    // })