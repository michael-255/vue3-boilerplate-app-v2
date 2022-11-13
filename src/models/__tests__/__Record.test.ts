import { describe, test, expect } from 'vitest'
import { Record } from '@/models/__Record'

describe('Record model', () => {
  const id = 'test-id'
  const createdDate = '2022-01-01T00:00:00.000Z'
  const parentId = 'test-parent-id'

  const params = {
    id,
    createdDate,
    parentId,
  }

  test('should have expected properties', () => {
    const model = new Record(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(3)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('parentId')).toBe(true)
  })

  test('should create with params', () => {
    const model = new Record(params)
    expect(model.id).toBe(id)
    expect(model.createdDate).toBe(createdDate)
    expect(model.parentId).toBe(parentId)
  })

  test('should return fields with getFields static method', () => {
    expect(Record.getFields()).toEqual(expect.arrayContaining(['id', 'createdDate', 'parentId']))
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = Record.getFieldComponents()
    expect(components.length).toBe(3)
    for (let i = 0; i < components.length; i++) {
      expect(components[i]).toHaveProperty('name')
      expect(components[i]?.name).toBe('AsyncComponentWrapper')
    }
    expect.assertions(7) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = Record.getColumns()
    for (let i = 0; i < dataTableProps.length; i++) {
      expect(dataTableProps[i]).toHaveProperty('name')
      expect(dataTableProps[i]).toHaveProperty('label')
      expect(dataTableProps[i]).toHaveProperty('align')
      expect(dataTableProps[i]).toHaveProperty('sortable')
      expect(dataTableProps[i]).toHaveProperty('required')
      expect(dataTableProps[i]).toHaveProperty('field')
      expect(dataTableProps[i]).toHaveProperty('format')
    }
    expect.assertions(21) // Number of "expects" that should have been called
  })
})
