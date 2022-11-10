import { Entity, type IEntity } from '@/models/__Entity'
import type { DataTableProps } from '@/constants/types-interfaces'
import { defineAsyncComponent } from 'vue'
import { Field } from '@/constants/core/data-enums'
import { truncateString } from '@/utils/common'

export interface IActivity extends IEntity {
  name: string
}

/**
 * Activity Class
 * @param params IActivity
 */
export class Activity extends Entity {
  name: string

  constructor(params: IActivity) {
    super({ id: params.id, createdDate: params.createdDate })
    this.name = params.name
  }

  static getFields(): Field[] {
    return [...Entity.getFields(), Field.NAME]
  }

  static getFieldComponents(): any {
    return [
      ...Entity.getFieldComponents(),
      defineAsyncComponent(
        () => import('@/components/shared/operation-dialog/inputs/NameInput.vue')
      ),
    ]
  }

  static getColumns(): DataTableProps[] {
    return [
      ...Entity.getColumns(),
      {
        name: Field.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.NAME],
        format: (val: string) => truncateString(val),
      },
    ]
  }
}
