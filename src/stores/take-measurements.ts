import { defineStore, type StoreDefinition } from 'pinia'
import type { DatabaseObject } from '@/constants/types-interfaces'
import type { Measurement } from '@/models/Measurement'
import type { MeasurementRecord } from '@/models/MeasurementRecord'
import type { LocalDatabase } from '@/services/LocalDatabase'
import { AppTable, Field } from '@/constants/core/data-enums'

/**
 * Stores the measurements and the most recent measurement record data.
 */
const useTakeMeasurementsStore: StoreDefinition = defineStore({
  id: 'take-measurements',

  state: () => ({
    measurementCards: [] as DatabaseObject[],
  }),

  actions: {
    async updateMeasurementCards(database: LocalDatabase): Promise<void> {
      // Measurements
      const measurements = (await database.getAll(AppTable.MEASUREMENTS)).sort((a: any, b: any) => {
        return a.name.localeCompare(b.name)
      }) as Measurement[]

      // Measurement Card Objects
      this.measurementCards = await Promise.all(
        // Recent Measurement Records
        measurements.map(async (measurement: Measurement) => {
          // Get most recent Measurement Record (if any)
          const measurementRecord = (await database.getNewestByField(
            AppTable.MEASUREMENT_RECORDS,
            Field.PARENT_ID,
            measurement.id
          )) as MeasurementRecord

          return {
            id: measurement.id,
            name: measurement.name,
            measurementType: measurement.measurementType,
            previousCreatedDate: measurementRecord?.createdDate,
            previousMeasurementValue: measurementRecord?.measurementValue,
          }
        })
      )
    },
  },
})

export default useTakeMeasurementsStore
