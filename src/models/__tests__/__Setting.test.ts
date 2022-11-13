import { describe, test, expect } from 'vitest'
import { Setting } from '@/models/__Setting'

describe('Setting model', () => {
  const id = 'test-id'
  const createdDate = '2022-01-01T00:00:00.000Z'
  const settingValue = 12345

  const params = {
    id,
    createdDate,
    settingValue,
  }

  test('should have expected properties', () => {
    const model = new Setting(params)
    const keys = Object.keys(model)
    expect(keys.length).toBe(3)
    expect(keys.includes('id')).toBe(true)
    expect(keys.includes('createdDate')).toBe(true)
    expect(keys.includes('settingValue')).toBe(true)
  })

  test('should create with params', () => {
    const model = new Setting(params)
    expect(model.id).toBe(id)
    expect(model.createdDate).toBe(createdDate)
    expect(model.settingValue).toBe(settingValue)
  })

  test('should return string with getLabelSingular static method', () => {
    expect(Setting.getLabelSingular()).toBe('Setting')
  })

  test('should return string with getLabelPlural static method', () => {
    expect(Setting.getLabelPlural()).toBe('Settings')
  })

  test('should return nothing with getParentTable static method', () => {
    expect(Setting.getParentTable()).toBe(null)
  })

  test('should return operations with getOperations static method', () => {
    expect(Setting.getOperations()).toEqual(expect.arrayContaining(['Inspect']))
  })

  test('should return visible columns with getVisibleColumns static method', () => {
    expect(Setting.getVisibleColumns()).toEqual(expect.arrayContaining(['settingValue']))
  })

  test('should return fields with getFields static method', () => {
    expect(Setting.getFields()).toEqual(
      expect.arrayContaining(['id', 'createdDate', 'settingValue'])
    )
  })

  test('should return fields with getFieldComponents static method', () => {
    const components = Setting.getFieldComponents()
    expect(components.length).toBe(0)
    expect.assertions(1) // Number of "expects" that should have been called
  })

  test('should return fields with getColumns static method', () => {
    const dataTableProps = Setting.getColumns()
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
