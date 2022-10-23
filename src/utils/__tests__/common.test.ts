import { describe, test, expect } from 'vitest'
import { truncateString } from '@/utils/common'

describe('truncateString', () => {
  test('should return a correctly truncated string', () => {
    const string = 'abcdefghijklmnopqrstuvwxyz'
    expect(truncateString(string)).toBe(string)
    expect(truncateString(string, 3, '...')).toBe('abc...')
    expect(truncateString(string, 5, '*')).toBe('abcde*')
    expect(truncateString(null)).toBe('-')
  })
})
