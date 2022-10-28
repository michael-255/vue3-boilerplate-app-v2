/**
 * These represent the available tables in Dexie for the app and provide the name they are
 * referenced by.
 */
export enum AppTable {
  MEASUREMENTS = 'measurements',
  MEASUREMENT_RECORDS = 'measurementRecords',
  LOGS = 'logs',
  SETTINGS = 'settings',
}

/**
 * These are the exact fields used internally by all models that are stored in the database. You
 * should have all the class fields in this enum.
 */
export enum Field {
  // Entity
  ID = 'id',
  CREATED_DATE = 'createdDate',
  // Activity
  NAME = 'name',
  // Record
  PARENT_ID = 'parentId',
  // Setting
  SETTING_VALUE = 'settingValue',
  // Log
  SEVERITY = 'severity',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // Measurement
  MEASUREMENT_TYPE = 'measurementType',
  // Measurement Record
  MEASUREMENT_VALUE = 'measurementValue',
}

/**
 * These are the operations that are supported within the app. Each table may only support a subset
 * of these operations.
 */
export enum Operation {
  NOOP = 'No Operation',
  CREATE = 'Create',
  UPDATE = 'Update',
  DELETE = 'Delete',
  CLEAR = 'Clear',
  INSPECT = 'Inspect',
  REPORT = 'Report',
}

/**
 * These are the keys for the supported settings within the app.
 */
export enum SettingKey {
  DEBUG = 'debug-logging',
  NOTIFY = 'all-alerts',
  INFO = 'save-info-logs',
  // new setting names
  DARK_MODE = 'dark-mode',
  SUPPRESS_CONSOLE_LOGS = 'suppress-console-logs',
  HIDE_DEBUG_MESSAGES = 'hide-debug-messages',
  SAVE_INFO_MESSAGES = 'save-info-messages',
}

/**
 * Log severity (also known as Log Level)
 */
export enum Severity {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}

/**
 * Unit type for the Measurement.
 */
export enum MeasurementType {
  LBS = 'Lbs',
  INCHES = 'Inches',
  PERCENT = '%',
}
