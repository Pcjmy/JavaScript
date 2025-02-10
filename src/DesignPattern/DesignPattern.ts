class SingleTon {
  private static instance: SingleTon | null = null
  private constructor() {}
  public static getInstance(): SingleTon {
    if (this.instance == null) {
      this.instance = new SingleTon()
    }
    return this.instance
  }
  fn1() {}
  fn2() {}
}

const s = SingleTon.getInstance()
s.fn1()
s.fn2()

const s1 = SingleTon.getInstance()

s === s1 // true
