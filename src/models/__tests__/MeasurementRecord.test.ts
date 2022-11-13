import { describe, test, expect } from 'vitest'
import { MeasurementRecord } from '@/models/MeasurementRecord'

describe('MeasurementRecord model', () => {
  const id = 'test-id'
  const createdDate = '2022-01-01T00:00:00.000Z'
  const parentId = 'test-parent-id'
  const measurementValue = 12345

  const params = {
    id,
    createdDate,
    parentId,
    measurementValue,
  }

  test('should have expected properties', () => {
    const model = new MeasurementRecord(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(4)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('parentId')).toBe(true)
    expect(keys.includes('measurementValue')).toBe(true)
  })

  test('should create with params', () => {
    const model = new MeasurementRecord(params)
    expect(model.id).toBe(id)
    expect(model.createdDate).toBe(createdDate)
    expect(model.parentId).toBe(parentId)
    expect(model.measurementValue).toBe(measurementValue)
  })

  test('should return string with getLabelSingular static method', () => {
    expect(MeasurementRecord.getLabelSingular()).toBe('Measurement Record')
  })

  test('should return string with getLabelPlural static method', () => {
    expect(MeasurementRecord.getLabelPlural()).toBe('Measurement Records')
  })

  test('should return nothing with getParentTable static method', () => {
    expect(MeasurementRecord.getParentTable()).toBe('measurements')
  })

  test('should return operations with getOperations static method', () => {
    expect(MeasurementRecord.getOperations()).toEqual(
      expect.arrayContaining(['Create', 'Update', 'Delete', 'Clear', 'Inspect'])
    )
  })

  test('should return visible columns with getVisibleColumns static method', () => {
    expect(MeasurementRecord.getVisibleColumns()).toEqual(
      expect.arrayContaining(['measurementValue'])
    )
  })

  test('should return fields with getFields static method', () => {
    expect(MeasurementRecord.getFields()).toEqual(
      expect.arrayContaining(['id', 'createdDate', 'parentId', 'measurementValue'])
    )
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = MeasurementRecord.getFieldComponents()
    expect(components.length).toBe(4)
    for (let i = 0; i < components.length; i++) {
      expect(components[i]).toHaveProperty('name')
      expect(components[i]?.name).toBe('AsyncComponentWrapper')
    }
    expect.assertions(9) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = MeasurementRecord.getColumns()
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
