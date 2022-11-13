<script setup lang="ts">
import { QBtn } from 'quasar'
import { NotifyColor } from '@/constants/ui/color-enums'
import { useLogger } from '@/use/useLogger'

const { log } = useLogger()

/**
 * Generates example logs that can be examined on the Logs table and the console.
 */
function generateTestLogs(): void {
  log.debug('This is a Debug Log (not saved)', {
    name: 'generateTestLogs:Debug',
    message: 'Debug message',
    stack: 'Stack trace',
  })
  log.info('This is an Info Log', {
    name: 'generateTestLogs:Info',
    message: 'Info message',
    stack: 'Stack trace',
  })
  log.warn('This is a Warning Log', {
    name: 'generateTestLogs:Warning',
    message: 'Warning message',
    stack: 'Stack trace',
  })
  log.error('This is an Error Log', {
    name: 'generateTestLogs:Error',
    message: 'Error message',
    stack: 'Stack trace',
  })
  log.critical('This is a Critical Log', {
    name: 'generateTestLogs:Critical',
    message: 'Critical message',
    stack: 'Stack trace',
  })
}
</script>

<template>
  <QBtn label="Test Logs" :color="NotifyColor.INFO" @click="generateTestLogs()" />
</template>
