import { describe, test, expect } from 'vitest'
import { Entity } from '@/models/__Entity'

describe('Entity model', () => {
  const id = 'test-id'
  const createdDate = '2022-01-01T00:00:00.000Z'

  const params = {
    id,
    createdDate,
  }

  test('should have expected properties', () => {
    const model = new Entity(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(2)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
  })

  test('should create with params', () => {
    const model = new Entity(params)
    expect(model.id).toBe(id)
    expect(model.createdDate).toBe(createdDate)
  })

  test('should return fields with getFields static method', () => {
    expect(Entity.getFields()).toEqual(expect.arrayContaining(['id', 'createdDate']))
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = Entity.getFieldComponents()
    expect(components.length).toBe(2)
    for (let i = 0; i < components.length; i++) {
      expect(components[i]).toHaveProperty('name')
      expect(components[i]?.name).toBe('AsyncComponentWrapper')
    }
    expect.assertions(5) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = Entity.getColumns()
    for (let i = 0; i < dataTableProps.length; i++) {
      expect(dataTableProps[i]).toHaveProperty('name')
      expect(dataTableProps[i]).toHaveProperty('label')
      expect(dataTableProps[i]).toHaveProperty('align')
      expect(dataTableProps[i]).toHaveProperty('sortable')
      expect(dataTableProps[i]).toHaveProperty('required')
      expect(dataTableProps[i]).toHaveProperty('field')
      expect(dataTableProps[i]).toHaveProperty('format')
    }
    expect.assertions(14) // Number of "expects" that should have been called
  })
})
