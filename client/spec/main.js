require.config({
	baseUrl: "client/scripts",
	paths: {
		Kinetic: '../../lib/kinetic/kinetic-v4.5.3.min',
		uuid: '../../lib/uuid/uuid'
	},
	urlArgs: "bust=" + Math.random(),
	shim: {
		'uuid': {
			exports: 'UUID',
		}
	}
});