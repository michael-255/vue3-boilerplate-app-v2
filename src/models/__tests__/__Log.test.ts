import { describe, test, expect } from 'vitest'
import { Log } from '@/models/__Log'
import { Severity } from '@/constants/core/data-enums'

describe('Log model', () => {
  const error = new Error('TEST')
  const severity = Severity.DEBUG
  const details = 'test-details'

  const params = {
    severity,
    details,
    error,
  }

  test('should have expected properties', () => {
    const model = new Log(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(7)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('name')).toBe(true)
    expect(keys.includes('severity')).toBe(true)
    expect(keys.includes('details')).toBe(true)
    expect(keys.includes('message')).toBe(true)
    expect(keys.includes('stack')).toBe(true)
  })

  test('should create with params', () => {
    const model = new Log(params)
    expect(typeof model.id).toBe('string')
    expect(typeof model.createdDate).toBe('string')
    expect(model.name).toBe('Error')
    expect(model.severity).toBe(severity)
    expect(model.details).toBe(details)
    expect(model.message).toBe('TEST')
    expect(typeof model.stack).toBe('string')
  })

  test('should return string with getLabelSingular static method', () => {
    expect(Log.getLabelSingular()).toBe('Log')
  })

  test('should return string with getLabelPlural static method', () => {
    expect(Log.getLabelPlural()).toBe('Logs')
  })

  test('should return nothing with getParentTable static method', () => {
    expect(Log.getParentTable()).toBe(null)
  })

  test('should return operations with getOperations static method', () => {
    expect(Log.getOperations()).toEqual(expect.arrayContaining(['Delete', 'Clear', 'Inspect']))
  })

  test('should return visible columns with getVisibleColumns static method', () => {
    expect(Log.getVisibleColumns()).toEqual(
      expect.arrayContaining(['createdDate', 'severity', 'name'])
    )
  })

  test('should return fields with getFields static method', () => {
    expect(Log.getFields()).toEqual(
      expect.arrayContaining([
        'id',
        'createdDate',
        'name',
        'severity',
        'details',
        'message',
        'stack',
      ])
    )
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = Log.getFieldComponents()
    expect(components.length).toBe(0)
    expect.assertions(1) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = Log.getColumns()
    for (let i = 0; i < dataTableProps.length; i++) {
      expect(dataTableProps[i]).toHaveProperty('name')
      expect(dataTableProps[i]).toHaveProperty('label')
      expect(dataTableProps[i]).toHaveProperty('align')
      expect(dataTableProps[i]).toHaveProperty('sortable')
      expect(dataTableProps[i]).toHaveProperty('required')
      expect(dataTableProps[i]).toHaveProperty('field')
      expect(dataTableProps[i]).toHaveProperty('format')
    }
    expect.assertions(49) // Number of "expects" that should have been called
  })
})
