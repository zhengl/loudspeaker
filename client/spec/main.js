require.config({
	baseUrl: "client/scripts",
	paths: {
		Kinetic: '../../lib/kinetic/kinetic-v4.5.3.min'
	},
	urlArgs: "bust=" + Math.random()
});