import { configure, getConsoleSink, type LogRecord, type Sink } from '@logtape/logtape'

const getConsolePropertiesSink = (): Sink => (record: LogRecord) => {
  console.log(record.properties)
}

await configure({
  sinks: {
    console: getConsoleSink(),
    consoleProperties: getConsolePropertiesSink(),
  },
  filters: {
    debugAndAbove: 'debug',
    warningAndAbove: 'warning',
  },
  loggers: [
    {
      category: ['app'],
      filters: ['debugAndAbove'],
      sinks: ['console', 'consoleProperties'],
    },
    {
      category: ['logtape', 'meta'],
      filters: ['warningAndAbove'],
      sinks: ['console'],
    },
  ],
})
