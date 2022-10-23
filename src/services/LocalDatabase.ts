import { DexieWrapper } from './__DexieWrapper'
import type { DatabaseObject, SettingValue } from '@/constants/types-interfaces'
import type { Setting } from '@/models/__Setting'
import { AppTable, Field, SettingKey } from '@/constants/data-enums'
import { Strings } from '@/constants/ui-enums'
import type { Log } from '@/models/__Log'

export class LocalDatabase {
  dexieWrapper: DexieWrapper

  constructor(dexieWrapper: DexieWrapper) {
    this.dexieWrapper = dexieWrapper
  }

  /**
   * Initializes setting keys in the settings table with default values.
   */
  async initDatabaseSettings(): Promise<void> {
    const settings = (await this.dexieWrapper.getAll(AppTable.SETTINGS)) as Setting[]

    const DEBUG = settings.find((s: DatabaseObject) => s[Field.ID] === SettingKey.DEBUG)
    const NOTIFY = settings.find((s: DatabaseObject) => s[Field.ID] === SettingKey.NOTIFY)
    const INFO = settings.find((s: DatabaseObject) => s[Field.ID] === SettingKey.INFO)

    if (!DEBUG) {
      await this.dexieWrapper.add(AppTable.SETTINGS, {
        id: SettingKey.DEBUG,
        createdDate: new Date().toISOString(),
        settingValue: false,
      })
    }
    if (!NOTIFY) {
      await this.dexieWrapper.add(AppTable.SETTINGS, {
        id: SettingKey.NOTIFY,
        createdDate: new Date().toISOString(),
        settingValue: false,
      })
    }
    if (!INFO) {
      await this.dexieWrapper.add(AppTable.SETTINGS, {
        id: SettingKey.INFO,
        createdDate: new Date().toISOString(),
        settingValue: false,
      })
    }
  }

  //   /**
  //    * Retrieve setting item from database by setting key.
  //    * @param key
  //    * @returns Setting item
  //    */
  //   async getSetting(key: SettingKey): Promise<Setting> {
  //     return await this.table(AppTable.SETTINGS).where(Field.KEY).equalsIgnoreCase(key).first()
  //   }

  //   /**
  //    * Update setting key with a new value.
  //    * @param key
  //    * @param value
  //    * @returns 1 on a successful update
  //    */
  //   async updateSetting(key: SettingKey, value: SettingValue): Promise<IndexableType> {
  //     return await this.table(AppTable.SETTINGS).update(key, { value })
  //   }
}

/**
 * Preconfigured LocalDatabase
 */
export const DB = new LocalDatabase(new DexieWrapper(`${Strings.APP_NAME} v${Strings.VERSION}`))
