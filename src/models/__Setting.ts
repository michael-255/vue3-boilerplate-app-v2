import { Entity, type IEntity } from '@/models/__Entity'
import type { DataTableProps, SettingValue } from '@/constants/types-interfaces'
import { Field } from '@/constants/core/data-enums'
import { AppTable, Operation } from '@/constants/core/data-enums'

export interface ISetting extends IEntity {
  settingValue: SettingValue
}

/**
 * Setting Class
 * @param params ISetting
 */
export class Setting extends Entity {
  settingValue: SettingValue

  constructor(params: ISetting) {
    super({ id: params.id, createdDate: params.createdDate })
    this.settingValue = params.settingValue
  }

  static async report(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static async update(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static async create(...params: any): Promise<void> {
    console.error('params:', params)
    throw new Error('Not Supported')
  }

  static getLabelSingular(): string {
    return 'Setting'
  }

  static getLabelPlural(): string {
    return 'Settings'
  }

  static getParentTable(): AppTable | null {
    return null
  }

  static getOperations(): Operation[] {
    return [Operation.INSPECT]
  }

  static getVisibleColumns(): Field[] {
    return [Field.SETTING_VALUE]
  }

  static getFields(): Field[] {
    return [...Entity.getFields(), Field.SETTING_VALUE]
  }

  static getFieldComponents(): any {
    return []
  }

  static getColumns(): DataTableProps[] {
    return [
      ...Entity.getColumns(),
      {
        name: Field.SETTING_VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.SETTING_VALUE],
        format: (val: SettingValue) => val,
      },
    ]
  }
}
