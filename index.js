function noop(a, b, c) { }
var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};
function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initData(vm) {
    // 给vm._data赋值，以备后用
    const data = vm._data = vm.$options.data;
    const keys = Object.keys(data);
    var i = keys.length;

    while (i--) {
        var key = keys[i];
        // 用处是：this.xxx 则是访问的 this._data.xxx。
        proxy(vm, '_data', key);
    }
}

function initMethods(vm, methods) {
    for (var key in methods) {
        // 可以通过this直接访问到methods里面的函数的原因
        vm[key] = typeof methods[key] !== 'function' ? noop : methods[key].bind(vm)
    }
}

function Person(options) {
    let vm = this;
    vm.$options = options;

    var opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }

    if (opts.methods) {
        initMethods(vm, opts.methods)
    }
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