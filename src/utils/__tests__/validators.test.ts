import { describe, test, expect } from 'vitest'
import * as validators from '@/utils/validators'

describe('ValidationRegex util', () => {
  test('should return correct boolean result', () => {
    expect(validators.ValidationRegex.Date.test(new Date().toISOString())).toBe(true)
    expect(validators.ValidationRegex.ShortText.test('test')).toBe(true)
    expect(validators.ValidationRegex.LongText.test('test')).toBe(true)
  })
})

describe('isObject util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isObject({})).toBe(true)
    expect(validators.isObject('')).toBe(false)
    expect(validators.isObject(1)).toBe(false)
    expect(validators.isObject([])).toBe(false)
  })
})

describe('isBoolean util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isBoolean(true)).toBe(true)
    expect(validators.isBoolean(false)).toBe(true)
    expect(validators.isBoolean('')).toBe(false)
    expect(validators.isBoolean(1)).toBe(false)
    expect(validators.isBoolean([])).toBe(false)
    expect(validators.isBoolean({})).toBe(false)
  })
})

describe('isUndefined util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isUndefined(null)).toBe(true)
    expect(validators.isUndefined(undefined)).toBe(true)
    expect(validators.isUndefined('')).toBe(true)
    expect(validators.isUndefined({})).toBe(false)
    expect(validators.isUndefined([])).toBe(false)
    expect(validators.isUndefined(1)).toBe(false)
  })
})

describe('isDefined util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isDefined(null)).toBe(false)
    expect(validators.isDefined(undefined)).toBe(false)
    expect(validators.isDefined('')).toBe(false)
    expect(validators.isDefined({})).toBe(true)
    expect(validators.isDefined([])).toBe(true)
    expect(validators.isDefined(1)).toBe(true)
  })
})

describe('isDataInArray util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isDataInArray([])).toBe(false)
    expect(validators.isDataInArray([1])).toBe(true)
    expect(validators.isDataInArray(['test'])).toBe(true)
  })
})

describe('isPercentNumber util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isPercentNumber(0)).toBe(true)
    expect(validators.isPercentNumber(100)).toBe(true)
    expect(validators.isPercentNumber(-1)).toBe(false)
    expect(validators.isPercentNumber(101)).toBe(false)
  })
})

describe('isPositiveNumber util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isPositiveNumber(0)).toBe(false)
    expect(validators.isPositiveNumber(-1)).toBe(false)
    expect(validators.isPositiveNumber(999999999)).toBe(true)
  })
})

describe('isNonNegitiveNumber util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isNonNegitiveNumber(0)).toBe(true)
    expect(validators.isNonNegitiveNumber(-1)).toBe(false)
    expect(validators.isNonNegitiveNumber(999999999)).toBe(true)
  })
})

describe('isOptionalNonNegitiveNumber util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isOptionalNonNegitiveNumber(undefined)).toBe(true)
    expect(validators.isOptionalNonNegitiveNumber(0)).toBe(true)
    expect(validators.isOptionalNonNegitiveNumber(-1)).toBe(false)
    expect(validators.isOptionalNonNegitiveNumber(999999999)).toBe(true)
  })
})

describe('isId util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isId('')).toBe(false)
    expect(validators.isId('X')).toBe(true)
    expect(validators.isId('abcdefghijklmnopqrstuvwxyz0123456789TEST')).toBe(true)
    expect(validators.isId('abcdefghijklmnopqrstuvwxyz0123456789TESTX')).toBe(false)
  })
})

describe('isDate util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isDate('')).toBe(false)
    expect(validators.isDate(new Date().toISOString())).toBe(true)
  })
})

describe('isOptionalDate util', () => {
  test('should return correct boolean result', () => {
    expect(validators.isOptionalDate('')).toBe(true)
    expect(validators.isOptionalDate(new Date().toISOString())).toBe(true)
  })
})

describe('isShortText util', () => {
  test('should return correct boolean result', () => {
    const str40 = Array(20).fill('X').toString() + 'X'
    const str41 = Array(21).fill('X').toString()
    expect(validators.isShortText('')).toBe(false)
    expect(validators.isShortText('X')).toBe(true)
    expect(validators.isShortText(str40)).toBe(true)
    expect(validators.isShortText(str41)).toBe(false)
  })
})

describe('isOptionalLongText util', () => {
  test('should return correct boolean result', () => {
    const str500 = Array(250).fill('X').toString() + 'X'
    const str501 = Array(251).fill('X').toString()
    expect(validators.isOptionalLongText('')).toBe(true)
    expect(validators.isOptionalLongText('X')).toBe(true)
    expect(validators.isOptionalLongText(str500)).toBe(true)
    expect(validators.isOptionalLongText(str501)).toBe(false)
  })
})
