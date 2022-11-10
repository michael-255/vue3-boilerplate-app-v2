import type { DataTableProps } from '@/constants/types-interfaces'
import { defineAsyncComponent } from 'vue'
import { Field } from '@/constants/core/data-enums'
import { isoToDisplayDate } from '@/utils/common'

export interface IEntity {
  id: string
  createdDate: string
}

/**
 * Entity Class
 * @param params IEntity
 */
export class Entity {
  id: string
  createdDate: string

  constructor(params: IEntity) {
    this.id = params.id
    this.createdDate = params.createdDate
  }

  static getFields(): Field[] {
    return [Field.ID, Field.CREATED_DATE]
  }

  static getFieldComponents(): any {
    return [
      defineAsyncComponent(() => import('@/components/shared/operation-dialog/inputs/IdInput.vue')),
      defineAsyncComponent(
        () => import('@/components/shared/operation-dialog/inputs/CreatedDateInput.vue')
      ),
    ]
  }

  static getColumns(): DataTableProps[] {
    return [
      {
        name: Field.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true, // So operations can use it
        field: (row: any) => row[Field.ID],
        format: (val: string) => val,
      },
      {
        name: Field.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row[Field.CREATED_DATE],
        format: (val: string) => isoToDisplayDate(val) || '-',
      },
    ]
  }
}
