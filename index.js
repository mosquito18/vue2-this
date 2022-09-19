function noop(a, b, c) { }

function Person(optios) {

}

const vm = new Person({
    data: {
        name: '我是大蚊子',
    },
    methods: {
        sayName() {
            console.log(this.name);
        }
    },
});
console.log(vm.name);
console.log(vm.sayName());