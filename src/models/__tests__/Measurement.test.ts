import { describe, test, expect } from 'vitest'
import { Measurement } from '@/models/Measurement'
import { MeasurementType } from '@/constants/core/data-enums'

describe('Measurement model', () => {
  const id = 'test-id'
  const createdDate = '2022-01-01T00:00:00.000Z'
  const name = 'test-name'
  const measurementType = MeasurementType.INCHES

  const params = {
    id,
    createdDate,
    name,
    measurementType,
  }

  test('should have expected properties', () => {
    const model = new Measurement(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(4)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('name')).toBe(true)
    expect(keys.includes('measurementType')).toBe(true)
  })

  test('should create with params', () => {
    const model = new Measurement(params)
    expect(model.id).toBe(id)
    expect(model.createdDate).toBe(createdDate)
    expect(model.name).toBe(name)
    expect(model.measurementType).toBe(measurementType)
  })

  test('should return string with getLabelSingular static method', () => {
    expect(Measurement.getLabelSingular()).toBe('Measurement')
  })

  test('should return string with getLabelPlural static method', () => {
    expect(Measurement.getLabelPlural()).toBe('Measurements')
  })

  test('should return nothing with getParentTable static method', () => {
    expect(Measurement.getParentTable()).toBe(null)
  })

  test('should return operations with getOperations static method', () => {
    expect(Measurement.getOperations()).toEqual(
      expect.arrayContaining(['Create', 'Update', 'Report', 'Delete', 'Clear', 'Inspect'])
    )
  })

  test('should return visible columns with getVisibleColumns static method', () => {
    expect(Measurement.getVisibleColumns()).toEqual(
      expect.arrayContaining(['name', 'measurementType'])
    )
  })

  test('should return fields with getFields static method', () => {
    expect(Measurement.getFields()).toEqual(
      expect.arrayContaining(['id', 'createdDate', 'name', 'measurementType'])
    )
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = Measurement.getFieldComponents()
    expect(components.length).toBe(4)
    for (let i = 0; i < components.length; i++) {
      expect(components[i]).toHaveProperty('name')
      expect(components[i]?.name).toBe('AsyncComponentWrapper')
    }
    expect.assertions(9) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = Measurement.getColumns()
    for (let i = 0; i < dataTableProps.length; i++) {
      expect(dataTableProps[i]).toHaveProperty('name')
      expect(dataTableProps[i]).toHaveProperty('label')
      expect(dataTableProps[i]).toHaveProperty('align')
      expect(dataTableProps[i]).toHaveProperty('sortable')
      expect(dataTableProps[i]).toHaveProperty('required')
      expect(dataTableProps[i]).toHaveProperty('field')
      expect(dataTableProps[i]).toHaveProperty('format')
    }
    expect.assertions(28) // Number of "expects" that should have been called
  })
})
