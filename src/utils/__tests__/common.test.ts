import { describe, test, expect } from 'vitest'
import * as commonUtils from '@/utils/common'

describe('uuid util', () => {
  test('uuid should return a v4 uuid', () => {
    const id = commonUtils.uuid()
    expect(typeof id).toBe('string')
    expect(id.length).toBe(36)
  })
})

describe('customId util', () => {
  test('should throw error if segmentLengths param has less then 1 element', () => {
    expect(() => {
      commonUtils.customId({ segmentLengths: [] })
    }).toThrow()
  })

  test('should throw error if segmentLengths param has any non-positive numbers', () => {
    expect(() => {
      commonUtils.customId({ segmentLengths: [-9, 8] })
    }).toThrow()
    expect(() => {
      commonUtils.customId({ segmentLengths: [8, 0] })
    }).toThrow()
    expect(() => {
      commonUtils.customId({ segmentLengths: [8, 0.999, 8] })
    }).toThrow()
  })

  test('should throw error if delimiter param is not a string of length 1 or empty', () => {
    expect(() => {
      commonUtils.customId({ delimiter: 'invalid-delimiet' })
    }).toThrow()
  })

  test('should create a custom id based on the params ', () => {
    const defaultId = commonUtils.customId()
    const bigId = commonUtils.customId({
      segmentLengths: [2, 2, 2, 2, 2, 2],
      delimiter: ':',
    })
    const packedId = commonUtils.customId({
      segmentLengths: [8, 8, 8],
      delimiter: '',
    })
    const upcId = commonUtils.customId({
      segmentLengths: [2, 8, 8, 2],
      delimiter: '_',
    })

    expect(defaultId).toMatch(/[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}/)
    expect(bigId).toMatch(/[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}:[A-Z0-9]{2}/)
    expect(packedId).toMatch(/[A-Z0-9]{24}/)
    expect(upcId).toMatch(/[A-Z0-9]{2}_[A-Z0-9]{8}_[A-Z0-9]{8}_[A-Z0-9]{2}/)
  })
})

describe('truncateString util', () => {
  test('should return a correctly truncated string', () => {
    const string = 'abcdefghijklmnopqrstuvwxyz'
    expect(commonUtils.truncateString(string)).toBe(string)
    expect(commonUtils.truncateString(string, 3, '...')).toBe('abc...')
    expect(commonUtils.truncateString(string, 5, '*')).toBe('abcde*')
    expect(commonUtils.truncateString(null)).toBe('-')
  })
})

describe('isoToDisplayDate util', () => {
  test('should return a formatted display date', () => {
    expect(commonUtils.isoToDisplayDate(new Date('2022-01-01').toISOString())).toBe(
      'Fri Dec 31 2021 7:00:00 PM EST'
    )
  })

  test('should return "-" when input is invalid', () => {
    expect(commonUtils.isoToDisplayDate('')).toBe(undefined)
  })
})

describe('getDurationFromMilliseconds util', () => {
  test('should return a formatted time string based on the milliseconds', () => {
    expect(commonUtils.getDurationFromMilliseconds(59000)).toBe('59s')
    expect(commonUtils.getDurationFromMilliseconds(60000)).toBe('1m ')
    expect(commonUtils.getDurationFromMilliseconds(119000)).toBe('1m 59s')
    expect(commonUtils.getDurationFromMilliseconds(3600000)).toBe('1h ')
    expect(commonUtils.getDurationFromMilliseconds(200000000)).toBe('2d 7h 33m 20s')
  })

  test('should return "-" when input is invalid or less then 1000', () => {
    expect(commonUtils.getDurationFromMilliseconds(-1)).toBe('-')
    expect(commonUtils.getDurationFromMilliseconds(0)).toBe('-')
    expect(commonUtils.getDurationFromMilliseconds(1)).toBe('-')
    expect(commonUtils.getDurationFromMilliseconds(999)).toBe('-')
    expect(commonUtils.getDurationFromMilliseconds(1000)).toBe('1s')
  })
})
