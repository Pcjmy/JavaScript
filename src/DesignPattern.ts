class SingleTon {
  private constructor() {}
  public static getInstance(): SingleTon {
    return new SingleTon()
  }
  fn1() {}
  fn2() {}
}

const s = SingleTon.getInstance()
s.fn1()
s.fn2()

const s1 = SingleTon.getInstance()

s===s1 // true