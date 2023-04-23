class A {
  constructor() {
    this.x = 1;
  }
  static print() {
    console.log(this.x);
  }

  print() {
    console.log('x', this.x)
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

B.x = 3;
const b = new B()

b.m()