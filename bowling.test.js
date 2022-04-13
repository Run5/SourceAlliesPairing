import { assert, expect, test } from 'vitest'
import { bowlingScore } from "bowling.js";

test('throws on invalid rolls', () => {

  //not enough rolls
  expect(() => bowlingScore([3, 5, 6, 7])).toThrowError('invalid')
  //too many rolls
  expect(() => bowlingScore([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])).toThrowError('invalid')
  //frame that adds to more than 10
  expect(() => bowlingScore([1, 1,
                             6, 7,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1, 1])).toThrowError('impossible')
  //frame thats less than 0
  expect(() => bowlingScore([1, 1,
                             -1, 0,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1, 1])).toThrowError('impossible')
  //frame with roll thats greater than 10
  expect(() => bowlingScore([1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 11, 1])).toThrowError('impossible')
  //frame with roll thats less than 10
  expect(() => bowlingScore([1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1, -1])).toThrowError('impossible')
  //check if 10th frame throws error on invalid rolls
  expect(() => bowlingScore([1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1,
                             1, 1, 1])).toThrowError('impossible')
})

test('final score is correct', () => {

  //check final score with no strikes
  expect(bowlingScore([1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1, 0])).toBe(20)
  //check final score with some strikes
  expect(bowlingScore([10, 0,
                       10, 0,
                       10, 0,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 1, 0])).toBe(77)
  //check finall score with all strikes
  expect(bowlingScore([10, 0,
                       10, 0,
                       10, 0,
                       10, 0,
                       10, 0,
                       10, 0,
                       10, 0,
                       10, 0,
                       10, 0,
                       10, 10, 10])).toBe(300)
  //check final score with some spares
  expect(bowlingScore([1, 1,
                       1, 9,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 9,
                       1, 1,
                       1, 1,
                       1, 1,
                       1, 9, 5])).toBe(51)
  //check finall score with all spares
  expect(bowlingScore([5, 5,
                       5, 5,
                       5, 5,
                       5, 5,
                       5, 5,
                       5, 5,
                       5, 5,
                       5, 5,
                       5, 5,
                       5, 5, 5])).toBe(150)
  //check spares, and strikes
  expect(bowlingScore([5, 5,
                       10, 0,
                       5, 5,
                       4, 5,
                       8, 0,
                       5, 5,
                       5, 5,
                       1, 5,
                       10, 0,
                       4, 5, 0])).toBe(131)

})
