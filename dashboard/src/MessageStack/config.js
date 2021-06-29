export default {
    // MQTT servers websocket connection
    port: 9001,
    host: '192.168.1.32',
    username: 'dashboard',
    password: 'bledemo',
    clientId: 'bledemo_' + Math.random().toString(16).substr(2, 8),
    channel: '/beacons/office'
};
