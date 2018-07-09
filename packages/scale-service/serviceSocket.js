let axios = require('axios')
let serviceSocketHook = require('./serviceSocketHelper').serviceSocketHook

const serviceSocket = (service, endpoint) => {
  const buildedUrl = `http://${service}:3000/${endpoint}`
  const axiosInstance = axios.create({
    url: buildedUrl,
  })

  return (config) => {
    try{
      const { method, url } = config

      const finalUrl = url || buildedUrl

      return axiosInstance[method.toLowerCase()](finalUrl, config)

    }catch(e) {
      return e
    }
  }
}

module.exports = {
  serviceSocket
}