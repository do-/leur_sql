module.exports = {

	publicPath: "/",
	
	devServer: {

		proxy: {

			'^/_back': {
		        target: 'http://127.0.0.1:8002',
		        changeOrigin: true
			},
			
		}

	}

};
