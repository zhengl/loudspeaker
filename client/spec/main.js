require.config({
	baseUrl: "client/scripts",
	paths: {
		Kinetic: '../../lib/kinetic/kinetic-v4.6.0',
		uuid: '../../lib/uuid/uuid',
		jquery: '../../lib/jquery/jquery-1.9.1'
	},
	urlArgs: "bust=" + Math.random(),
	shim: {
		'uuid': {
			exports: 'UUID',
		}
	}
});