import type { DataTableProps } from '@/constants/types-interfaces'
import { AppTable, Field, Operation } from '@/constants/core/data-enums'
import { Measurement } from '@/models/Measurement'
import { MeasurementRecord } from '@/models/MeasurementRecord'
import { Log } from '@/models/__Log'
import { Setting } from '@/models/__Setting'

export const TableHelper = {
  getFields(table: AppTable): Field[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getFields(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getFields(),
      [AppTable.LOGS]: Log.getFields(),
      [AppTable.SETTINGS]: Setting.getFields(),
    }[table]
  },

  getComponents(table: AppTable): any[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getFieldComponents(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getFieldComponents(),
      [AppTable.LOGS]: Log.getFieldComponents(),
      [AppTable.SETTINGS]: Setting.getFieldComponents(),
    }[table]
  },

  getColumns(table: AppTable): DataTableProps[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getColumns(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getColumns(),
      [AppTable.LOGS]: Log.getColumns(),
      [AppTable.SETTINGS]: Setting.getColumns(),
    }[table]
  },

  getVisibleColumns(table: AppTable): Field[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getVisibleColumns(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getVisibleColumns(),
      [AppTable.LOGS]: Log.getVisibleColumns(),
      [AppTable.SETTINGS]: Setting.getVisibleColumns(),
    }[table]
  },

  getOperations(table: AppTable): Operation[] {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getOperations(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getOperations(),
      [AppTable.LOGS]: Log.getOperations(),
      [AppTable.SETTINGS]: Setting.getOperations(),
    }[table]
  },

  getParentTable(table: AppTable): AppTable | null {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getParentTable(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getParentTable(),
      [AppTable.LOGS]: Log.getParentTable(),
      [AppTable.SETTINGS]: Setting.getParentTable(),
    }[table]
  },

  getLabelPlural(table: AppTable): string {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getLabelPlural(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getLabelPlural(),
      [AppTable.LOGS]: Log.getLabelPlural(),
      [AppTable.SETTINGS]: Setting.getLabelPlural(),
    }[table]
  },

  getLabelSingular(table: AppTable): string {
    return {
      [AppTable.MEASUREMENTS]: Measurement.getLabelSingular(),
      [AppTable.MEASUREMENT_RECORDS]: MeasurementRecord.getLabelSingular(),
      [AppTable.LOGS]: Log.getLabelSingular(),
      [AppTable.SETTINGS]: Setting.getLabelSingular(),
    }[table]
  },
}
