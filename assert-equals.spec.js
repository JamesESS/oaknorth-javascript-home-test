const assertEquals = require('./assert-equals')

describe('assertEquals', () => {
  describe('when missing arguments', () => {
    it('throws an error', () => {
      expect(() => assertEquals()).toThrow()
      expect(() => assertEquals('abc')).toThrow()
    })
  })
  describe('when expected and actual are of different type', () => {
    it('returns without throwing an error', () => {
      expect(() => assertEquals(1, '1')).toThrow()
      expect(() => assertEquals(true, '1')).toThrow()
      expect(() => assertEquals([1], '1')).toThrow()
      expect(() => assertEquals({one: 1}, '1')).toThrow()
      expect(() => assertEquals([1,2,3],{one: 1, two: 2, three: 3})).toThrow()
      expect(() => assertEquals({one: 1, two: 2, three: 3},[1,2,3])).toThrow()
    })
  })
  describe('when expected and actual are the same primative type', () => {
    describe('when arguments are the same', () => {
      it('returns without throwing an error', () => {
        expect(() => assertEquals('abc', 'abc')).not.toThrow()
        expect(() => assertEquals(123, 123)).not.toThrow()
        expect(() => assertEquals(true, true)).not.toThrow()
        expect(() => assertEquals(undefined, undefined)).not.toThrow()
        // expect(() => assertEquals(null, null)).not.toThrow()
      })
    })
    describe('when arguments are different', () => {
      it('throws an error', () => {
        expect(() => assertEquals('abc', 'abcd')).toThrow()
        expect(() => assertEquals(123, 1234)).toThrow()
        expect(() => assertEquals(true, false)).toThrow()
        expect(() => assertEquals(undefined, null)).toThrow()
        expect(() => assertEquals(null, undefined)).toThrow()
      })
    })
  })
  describe('when expected and actual are arrays', () => {
    describe('when expected and actual are different lengths', () => {
      it('throws an error', () => {
        expect(() => assertEquals([1,2,3],[1])).toThrow()
      })
    })
    describe('when expected and actual are identical arrays', () => {
      it('returns without throwing an error', () => {
        expect(() => assertEquals([1,2,3], [1,2,3])).not.toThrow()
        expect(() => assertEquals([1,[2,3],4], [1,[2,3],4])).not.toThrow()
        expect(() => assertEquals([1,"two",3], [1,"two",3])).not.toThrow()
      })
    })
    describe('when expected and actual are different arrays', () => {
      it('throws an error', () => {
        expect(() => assertEquals([1,2,3], [1,2,3,4])).toThrow()
        expect(() => assertEquals([1,[2,3],4], [1,[2,3,4]])).toThrow()
        expect(() => assertEquals([1,"two",3], [1,"two","three"])).toThrow()
      })
    })
  })
  describe('when expected and actual are objects', () => {
    describe('when expected and actual are different lengths', () => {
      it('throws an error', () => {
        expect(() => assertEquals({one: 1, two: 2},{one: 1, two: 2, three: 3})).toThrow()
      })
    })
    describe('when expected and actual are identical objects', () => {
      it('returns without throwing an error', () => {
        expect(() => assertEquals({one: 1, two: 2}, {one: 1, two: 2})).not.toThrow()
        expect(() => assertEquals({one: "one", two: "two"}, {one: "one", two: "two"})).not.toThrow()
        expect(() => assertEquals({one: 1, two: {one: 1, two: 2}}, {one: 1, two: {one: 1, two: 2}})).not.toThrow()
        expect(() => assertEquals({one: 1, two: [{one: 1}, {two: 2}]}, {one: 1, two: [{one: 1}, {two: 2}]})).not.toThrow()
      })
    })
    describe('when expected and actual are different objects', () => {
      it('throws an error', () => {
        expect(() => assertEquals({one: 1, two: 2}, {one: 1, three: 2})).toThrow()
        expect(() => assertEquals({one: 1, two: 2}, {one: 1, two: 3})).toThrow()
        expect(() => assertEquals({one: 1, two: {one: 1, two: 2}}, {one: 1, two: [{one: 1}, {two: 2}]})).toThrow()
        expect(() => assertEquals({one: 1, two: 2}, {one: "one", two: "two"})).toThrow()
      })
    })
  })
  describe('Handling null, NaN and undefined edge cases', () => {
    describe('when expected and actual are null, NaN or undefined', () => {
      it('returns without throwing an error', () => {
        expect(() => assertEquals(null, null)).not.toThrow()
        expect(() => assertEquals(NaN, NaN)).not.toThrow()
        expect(() => assertEquals(undefined, undefined)).not.toThrow()
      })
    })
    describe('when one arg is null and other is object', () => {
      it('throws an error', () => {
        expect(() => assertEquals(null, {three: 3})).toThrow()
        expect(() => assertEquals({three: 3}, null)).toThrow()
      })
    })
  })
})