const Lib = require('../../app/lib')

const lib = new Lib()

test('asserts test works', () => {
  expect(lib.add(1, 2)).toBe(3)
})
