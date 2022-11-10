import { Entity, type IEntity } from '@/models/__Entity'
import type { DataTableProps } from '@/constants/types-interfaces'
import { Field } from '@/constants/core/data-enums'
import { defineAsyncComponent } from 'vue'

export interface IRecord extends IEntity {
  parentId: string
}

/**
 * Record Class
 * @param params IRecord
 */
export class Record extends Entity {
  parentId: string

  constructor(params: IRecord) {
    super({ id: params.id, createdDate: params.createdDate })
    this.parentId = params.parentId
  }

  static getFields(): Field[] {
    return [...Entity.getFields(), Field.PARENT_ID]
  }

  static getFieldComponents(): any {
    return [
      ...Entity.getFieldComponents(),
      defineAsyncComponent(
        () => import('@/components/shared/operation-dialog/inputs/ParentIdSelect.vue')
      ),
    ]
  }

  static getColumns(): DataTableProps[] {
    return [
      ...Entity.getColumns(),
      {
        name: Field.PARENT_ID,
        label: 'Parent',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.PARENT_ID],
        format: (val: string) => val,
      },
    ]
  }
}
