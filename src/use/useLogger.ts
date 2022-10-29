import { PrettyLogger } from '@/services/__PrettyLogger'
import { AppTable, Severity } from '@/constants/core/data-enums'
import { Icon } from '@/constants/ui/icon-enums'
import { NotifyColor } from '@/constants/ui/color-enums'
import { AppString } from '@/constants/ui/string-enums'
import { DB } from '@/services/LocalDatabase'
import { Log } from '@/models/__Log'
import { useNotifications } from '@/use/useNotifications'
import useSettingsStore from '@/stores/settings'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 * Never awaiting for any logging calls. Don't want to slow down the UI.
 */
export function useLogger(): { [x: string]: any } {
  const logger = new PrettyLogger(AppString.APP_NAME)
  const settingsStore = useSettingsStore()
  const { notify } = useNotifications()

  /**
   * Log object with common logger functions. Output can be controled by DEBUG and NOTIFY refs.
   * - debug
   * - info
   * - warn
   * - error
   * - critical
   */
  const log = {
    /**
     * DEBUG
     * - Suppressable console logs
     * - Never saved in DB
     * - Suppressable notifications
     */
    debug: (details: string, error?: Error | any) => {
      const severity = Severity.DEBUG
      if (settingsStore.showConsoleLogs) {
        logger.debug(`[${severity}]`, details, error)
      }
      if (settingsStore.showDebugMessages) {
        notify(`${severity} - ${details}`, Icon.DEBUG, NotifyColor.DEBUG)
      }
    },
    /**
     * INFO
     * - Suppressable console logs
     * - Can turn off DB saving
     * - Cannot suppress notifications
     */
    info: (details: string, error?: Error | any) => {
      const severity = Severity.INFO
      if (settingsStore.showConsoleLogs) {
        logger.info(`[${severity}]`, details, error)
      }
      if (settingsStore.saveInfoMessages) {
        DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      }
      notify(`${severity} - ${details}`, Icon.INFO, NotifyColor.INFO)
    },
    /**
     * WARN
     * - Suppressable console logs
     * - Cannot turn off DB saving
     * - Cannot suppress notifications
     */
    warn: (details: string, error?: Error | any) => {
      const severity = Severity.WARN
      if (settingsStore.showConsoleLogs) {
        logger.warn(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.WARN, NotifyColor.WARN)
    },
    /**
     * ERROR
     * - Suppressable console logs
     * - Cannot turn off DB saving
     * - Cannot suppress notifications
     */
    error: (details: string, error?: Error | any) => {
      const severity = Severity.ERROR
      if (settingsStore.showConsoleLogs) {
        logger.error(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.ERROR, NotifyColor.ERROR)
    },
    /**
     * CRITICAL
     * - Suppressable console logs
     * - Cannot turn off DB saving
     * - Cannot suppress notifications
     */
    critical: (details: string, error?: Error | any) => {
      const severity = Severity.CRITICAL
      if (settingsStore.showConsoleLogs) {
        logger.critical(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.CRITICAL, NotifyColor.CRITICAL)
    },
  }

  /**
   * Simple console log for testing.
   * @param value
   */
  function consoleDebug(value: any): void {
    if (settingsStore.DEBUG) {
      logger.log(value)
    }
  }

  return {
    consoleDebug,
    log,
  }
}
