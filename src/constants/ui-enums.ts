/**
 * Colors for notifications and logs.
 */
export enum NotifyColor {
  LOG = 'blue-grey',
  DEBUG = 'deep-purple',
  INFO = 'primary',
  WARN = 'orange-9',
  ERROR = 'negative',
  CRITICAL = 'red-13',
}

/**
 * Material Design icons.
 */
export enum Icon {
  // Severity
  DEBUG = 'bug_report',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',
  CRITICAL = 'report',
  // Operations
  UNDO = 'undo',
  SAVE = 'save',
  CLOSE = 'close',
  EDIT = 'edit',
  DELETE = 'delete',
  ADD = 'add',
  REMOVE = 'remove',
  // Pages
  EXAMPLE = 'smart_toy',
  ACTIVE = 'play_arrow',
  ACTIVITIES = 'directions_run',
  RECORDS = 'web_stories',
  MEASUREMENTS = 'straighten',
  EXERCISES = 'fitness_center',
  WORKOUTS = 'assignment',
  LOGS = 'plagiarism',
  // Misc
  CALENDAR_DATE = 'event',
  CALENDAR_CHECK = 'event_available',
  TIME = 'access_time',
  RENEW = 'autorenew',
  DASHBOARD = 'dashboard',
  REPORT = 'timeline',
  MANAGEMENT = 'tune',
  WORKOUT = 'assignment',
  SETTINGS = 'settings',
  DETAILS = 'summarize',
  CODE = 'code',
  WEB = 'language',
  MENU = 'menu',
  HOME = 'home',
}

/**
 * App route name used by Vue router.
 */
export enum RouteName {
  DASHBOARD = 'Dashboard',
  MEASUREMENTS = 'Measurements',
  MEASUREMENTS_DATA = 'MeasurementsData',
  LOGS_AND_SETTINGS_DATA = 'LogsAndSettingsData',
  SETTINGS = 'Settings',
  ABOUT = 'About',
  NOT_FOUND = 'NotFound',
}

/**
 * Any links you might use throughout the app.
 */
export enum Links {
  GITHUB = 'https://github.com/michael-255',
  MYAPPS = 'https://www.example.com',
}

/**
 * Generic strings that could be used throughout the app.
 */
export enum Strings {
  APP_NAME = 'Vue 3 Boilerplate App',
  VERSION = '2',
}
