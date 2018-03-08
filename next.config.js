module.exports = {
  webpack: (config) => {
    config.externals = {
          'marzipano': 'Marzipano'
      }
    return config
  },
  exportPathMap: function() {
  	return {
  		'/': { page: '/' },
  		'/about': { page: '/about' },
  		'/vista': { page: '/vista' }
  	}
  }
}
