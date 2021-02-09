function getPayLoad(path, hostname, port) {
    const payLoadInstance = this;

    payLoadInstance.get = 'GET ' + path + ' HTTP/1.1\r\n'
        + 'Host: ' + hostname + '\r\n'
        + 'Connection: close\r\n'
        + '\r\n';

    payLoadInstance.connect = 'CONNECT ' + hostname + ':' + port + ' HTTP/1.1\r\n'
        + 'Host: ' + hostname + '\r\n'
        + '\r\n';

    return payLoadInstance;
}

module.exports = getPayLoad;