import { describe, test, expect } from 'vitest'
import { Activity } from '@/models/__Activity'

describe('Activity model', () => {
  const id = 'test-id'
  const createdDate = '2022-01-01T00:00:00.000Z'
  const name = 'test-name'

  const params = {
    id,
    createdDate,
    name,
  }

  test('should have expected properties', () => {
    const model = new Activity(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(3)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('name')).toBe(true)
  })

  test('should create with params', () => {
    const model = new Activity(params)
    expect(model.id).toBe(id)
    expect(model.createdDate).toBe(createdDate)
    expect(model.name).toBe(name)
  })

  test('should return fields with getFields static method', () => {
    expect(Activity.getFields()).toEqual(expect.arrayContaining(['id', 'createdDate', 'name']))
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = Activity.getFieldComponents()
    expect(components.length).toBe(3)
    for (let i = 0; i < components.length; i++) {
      expect(components[i]).toHaveProperty('name')
      expect(components[i]?.name).toBe('AsyncComponentWrapper')
    }
    expect.assertions(7) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = Activity.getColumns()
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
