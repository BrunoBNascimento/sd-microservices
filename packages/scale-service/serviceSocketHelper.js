const serviceSocketHook = {
  db1service: {
    port: 3000,
    endpoints: ['accounts']
  },
  db2service: {
    port: 3000,
    endpoints: ['accounts']
  },
  [undefined]: {
    port: 3000,
    endpoints: ['accounts']
  },
  [null]: {
    port: 3000,
    endpoints: ['accounts']
  }
}

module.exports = {
  serviceSocketHook
}