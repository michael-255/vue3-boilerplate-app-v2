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
     * DEBUG logs never get saved to the database. Controlled by DEBUG and NOTIFY settings.
     */
    debug: (details: string, error?: Error | any) => {
      if (settingsStore.DEBUG) {
        const severity = Severity.DEBUG
        logger.debug(`[${severity}]`, details, error)
        // No DB call on DEBUG
        if (settingsStore.NOTIFY) {
          notify(`${severity} - ${details}`, Icon.DEBUG, NotifyColor.DEBUG)
        }
      }
    },
    /**
     * INFO logs can be suppressed if desired. Controlled by DEBUG, NOTIFY, and INFO settings.
     */
    info: (details: string, error?: Error | any) => {
      const severity = Severity.INFO
      if (settingsStore.DEBUG) {
        logger.info(`[${severity}]`, details, error)
      }
      if (settingsStore.INFO) {
        DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      }
      if (settingsStore.NOTIFY) {
        notify(`${severity} - ${details}`, Icon.INFO, NotifyColor.INFO)
      }
    },
    /**
     * WARN logs cannot be suppressed. Can hide the console output with DEBUG setting.
     */
    warn: (details: string, error?: Error | any) => {
      const severity = Severity.WARN
      if (settingsStore.DEBUG) {
        logger.warn(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.WARN, NotifyColor.WARN)
    },
    /**
     * ERROR logs cannot be suppressed. Can hide the console output with DEBUG setting.
     */
    error: (details: string, error?: Error | any) => {
      const severity = Severity.ERROR
      if (settingsStore.DEBUG) {
        logger.error(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.ERROR, NotifyColor.ERROR)
    },
    /**
     * CRITICAL logs cannot be suppressed. Can hide the console output with DEBUG setting.
     */
    critical: (details: string, error?: Error | any) => {
      const severity = Severity.CRITICAL
      if (settingsStore.DEBUG) {
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
