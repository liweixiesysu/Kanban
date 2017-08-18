let events = require('events');
class WebSocketServer extends events.EventEmitter {
    /**
     * 构造WebSocketServer对象
     */
    constructor() {
        super();
        this.readyState = 'CLOSED';
        this.buffer = [];
        this.pingFrames = 0;
    }

    /**
     * 设置底层通信的socket
     * @param socket 底层通信的socket
     */
    setSocket(socket) {
        this.readyState = 'OPEN';
        this.socket = socket;

        this.socket.on('close', this.handleClose.bind(this));
        this.socket.on('data', this.handleData.bind(this));
        this.socket.on('end', this.handleClose.bind(this));
        this.socket.on('error', this.handleError.bind(this));

        this.sendPingFrame();
    }

    /**
     * 处理错误信息
     * @param error 错误信息
     */
    handleError(error) {
        this.emit('error', error);
    }

    /**
     * 处理接收到的数据
     * @param error 错误信息
     * @param data 接收到的数据
     */
    handleData(data) {
        let frameData = this.transformFrameToMessage(data);
        if (!frameData) {
            this.emit('error', {code: 800, reason: 'Invalid frame!'});
            return;
        }

        if (frameData.opcode === 10) {
            this.pingFrames = 0;
            return;
        }

        if (frameData.opcode === 9) {
            this.sendPongFrame(frameData.applicationData);
            return;
        }

        if (frameData.opcode === 8) {
            console.log('Recieve close message!');
            if (this.readyState === 'CLOSING') {
                this.handleClose();
                return;
            }

            this.sendCloseFrame(this.parseErrorInfo(frameData));
            return;
        }

        if (frameData.opcode !== 0) {
            this.opcode = frameData.opcode;
            this.buffer = [];
        }

        this.buffer.push(frameData.applicationData);

        if (frameData.fin === 1) {
            let totalBuffer = Buffer.concat(this.buffer);
            this.emit('message', (this.opcode === 1) ? totalBuffer.toString() : totalBuffer);

            this.buffer = [];
        }
    }

    /**
     * 发送close frame
     * @param errorInfo 错误信息
     */
    sendCloseFrame(errorInfo) {
        process.nextTick(() => {
            let closeFrame = this.createCloseFrame();
            this.socket.write(closeFrame, (error) => {
                this.handleClose(errorInfo);
                if (error) {
                    console.error('Failed to send close frame!');
                    console.error(error);
                    return;
                }

                console.log('Succeed to send close frame!');
            });
        });
    }

    /**
     * 解析close frame里面的错误码和错误原因
     * @param closeFrame close frame
     * @return 错误信息
     */
    parseErrorInfo(closeFrame) {
        if (!closeFrame.applicationData) {
            console.log('No detail information for close frame!');
            return;
        }

        let reason = Buffer.allocUnsafe(closeFrame.applicationData.length - 2);
        closeFrame.applicationData.copy(reason, 0, 2);

        return {
            code: closeFrame.applicationData.readUInt16BE(0),
            reason: reason.toString()
        }
    }

    /**
     * 发送Ping frame
     */
    sendPingFrame() {
        setTimeout(() => {
            if (this.readyState !== 'OPEN') {
                console.log('The state of websocket is not OPEN, so stop sending ping frames!');
                return;
            }

            if (this.pingFrames > 3) {
                this.close(1001, 'Peer may be down!');
                return;
            }

            let pingFrame = this.createHeartBeatFrame(true);
            this.socket.write(pingFrame, (error) => {
                if (error) {
                    console.error('Failed to send ping frame!');
                    console.error(error);

                    this.sendPingFrame();
                    return;
                }

                this.pingFrames += 1;
                this.sendPingFrame();
            });
        }, 60 * 1000);
    }

    /**
     * 发送Pong frame
     * @param message 用户数据
     */
    sendPongFrame(message) {
        process.nextTick(() => {
            let pongFrame = this.createHeartBeatFrame(false, message);
            this.socket.write(pongFrame, (error) => {
                if (error) {
                    console.error('Failed to send pong frame!');
                    console.error(error);
                    return;
                }

                console.log('Succeed to send pong frame!');
            });
        });
    }

    /**
     * 处理关闭事件
     * @param error 错误信息
     */
    handleClose(error) {
        this.socket.destroy();
        this.readyState = 'CLOSED';

        this.emit('close', error);
    }

    /**
     * 设置close事件的监听器
     * @param listener close事件的监听器
     */
    onclose(listener) {
        this.addListener('close', listener);
    }

    /**
     * 设置error事件的监听器
     * @param listener error事件的监听器
     */
    onerror(listener) {
        this.addListener('error', listener);
    }

    /**
     * 设置message事件的监听器
     * @param listener message事件的监听器
     */
    onmessage(listener) {
        this.addListener('message', listener);
    }

    /**
     * 将信息转换成帧数据
     * @param message 给定的信息
     * @return 帧数据
     */
    transformMessageToFrame(message) {
        if (!message) {
            console.error('No message found!');
            return;
        }

        let frameData = [];

        // 写入Fin、RSV1-3和opcode
        let fin = 1;
        let rsv1 = 0;
        let rsv2 = 0;
        let rsv3 = 0;
        let opcode = (message instanceof Buffer) ? 2 : 1;

        frameData.push((fin << 7) + (rsv1 << 6) + (rsv2 << 5) + (rsv3 << 4) + opcode);

        // 获取Payload length
        let length = Buffer.byteLength(message);
        if (length < 126) {
            frameData.push(length);
        }
        else if (length < (Math.pow(2, 16) - 1)) {
            frameData.push(126);

            let buffer = Buffer.allocUnsafe(2);
            buffer.writeUInt16BE(length);

            let binaryDatas = buffer.values();
            for (let data of binaryDatas) {
                frameData.push(data);
            }
        }
        else {
            frameData.push(127);
            let buffer = Buffer.allocUnsafe(2);
            buffer.writeUInt16BE(length);

            let binaryDatas = buffer.values();
            for (let data of binaryDatas) {
                frameData.push(data);
            }
        }

        // 写入用户数据
        let binaryDatas = Buffer.from(message).values();
        for (let data of binaryDatas) {
            frameData.push(data);
        }

        return Buffer.from(frameData);
    }

    /**
     * 创建Ping或者Pong数据帧
     * @param isPing 是否为ping帧
     * @param message 用户数据
     * @return 帧数据
     */
    createHeartBeatFrame(isPing, message) {
        let frameData = [];

        // 写入Fin、RSV1-3和opcode
        let fin = 1;
        let rsv1 = 0;
        let rsv2 = 0;
        let rsv3 = 0;
        let opcode = isPing ? 9 : 10;

        frameData.push((fin << 7) + (rsv1 << 6) + (rsv2 << 5) + (rsv3 << 4) + opcode);

        // 写入Payload length
        frameData.push(Buffer.byteLength(message || 'Hello'));

        // 写入用户数据
        let binaryDatas = Buffer.from(message || 'Hello').values();
        for (let data of binaryDatas) {
            frameData.push(data);
        }

        return Buffer.from(frameData);
    }

    /**
     * 创建close frame
     * @param code 错误码
     * @param reason 错误原因
     * @return 帧数据
     */
    createCloseFrame(code, reason) {
        let frameData = [];

        // 写入Fin、RSV1-3和opcode
        let fin = 1;
        let rsv1 = 0;
        let rsv2 = 0;
        let rsv3 = 0;
        let opcode = 8;

        frameData.push((fin << 7) + (rsv1 << 6) + (rsv2 << 5) + (rsv3 << 4) + opcode);

        // 写入Payload length
        let length = 2 + Buffer.byteLength(reason || 'Close connection');
        if (length < 126) {
            frameData.push(length);
        }
        else if (length < (Math.pow(2, 16) - 1)) {
            frameData.push(126);

            let buffer = Buffer.allocUnsafe(2);
            buffer.writeUInt16BE(length);

            let binaryDatas = buffer.values();
            for (let data of binaryDatas) {
                frameData.push(data);
            }
        }
        else {
            frameData.push(127);

            let buffer = Buffer.allocUnsafe(2);
            buffer.writeUInt64BE(length);

            let binaryDatas = buffer.values();
            for (let data of binaryDatas) {
                frameData.push(data);
            }
        }

        // 写入用户数据
        let buffer = Buffer.allocUnsafe(2);
        buffer.writeUInt16BE(code || 1000);
        let binaryDatas = buffer.values();
        for (let data of binaryDatas) {
            frameData.push(data);
        }

        binaryDatas = Buffer.from(reason || 'Close connection').values();
        for (let data of binaryDatas) {
            frameData.push(data);
        }

        return Buffer.from(frameData);
    }

    /**
     * 将WebSocket帧数据转换成信息
     * @param frameData 帧数据，类型为Buffer
     * @return 帧数据对应的信息
     */
    transformFrameToMessage(frameData) {
        if (!frameData) {
            console.error('No frame data found!');
            return;
        }

        if (!(frameData instanceof Buffer)) {
            console.error('Input parameter must be Buffer!');
            return;
        }

        // 解析Fin、RSV1-3和opcode
        let rawByte = frameData.readUInt8(0);
        let fin = (rawByte & 0x80) >> 7;
        console.log(`fin = ${fin}`);

        let rsv1 = (rawByte & 0x40) >> 6;
        console.log(`rsv1 = ${rsv1}`);

        let rsv2 = (rawByte & 0x20) >> 5;
        console.log(`rsv2 = ${rsv2}`);

        let rsv3 = (rawByte & 0x10) >> 4;
        console.log(`rsv3 = ${rsv3}`);

        let opcode = rawByte & 0x0f;
        console.log(`opcode = ${opcode}`);

        if (!this.checkRsvFlags(rsv1, rsv2, rsv3)) {
            console.error('RSV flags must be zero!');
            return;
        }

        if (!this.checkOpcode(opcode)) {
            console.error('Opcode must be between 0, 1, 2, 8, 9 and 10!');
            return;
        }

        // 解析mask和payload length
        rawByte = frameData.readUInt8(1);
        let mask = (rawByte & 0x80) >> 7;
        console.log(`mask = ${mask}`);

        let length = rawByte & 0x7f;
        console.log(`payload length = ${length}`);

        if (length === 126) {
            length = frameData.readUInt16BE(2);
            console.log(`payload length = ${length}`);
        }
        else if (length === 127) {
            length = frameData.readUInt64BE(2);
            console.log(`payload length = ${length}`);
        }

        // 解析masking-key
        let maskingKeys;
        let applicationDataStart = this.findMaskOffset(length);
        if (mask === 1) {
            let start = applicationDataStart;
            maskingKeys = Buffer.from([frameData.readUInt8(start),
                frameData.readUInt8(start + 1), frameData.readUInt8(start + 2), frameData.readUInt8(start + 3)]);
            console.log(`masking keys = ${maskingKeys.toString('hex')}`);

            applicationDataStart += 4;
        }

        // 解析用户数据
        let decodedData;
        if (length !== 0) {
            let applicationData = Buffer.allocUnsafe(length);
            frameData.copy(applicationData, 0, applicationDataStart);
            decodedData = applicationData;
            if (mask === 1) {
                decodedData = Buffer.allocUnsafe(length);
                for (let idx = 0; idx < length; ++idx) {
                    decodedData.writeUInt8(applicationData[idx] ^ maskingKeys[idx % 4], idx);
                }
            }
        }

        return {
            fin: fin,
            rsv1: rsv1,
            rsv2: rsv2,
            rsv3: rsv3,
            opcode: opcode,
            mask: mask,
            length: length,
            maskingKeys: maskingKeys,
            applicationData: decodedData
        };
    }

    /**
     * 根据负载长度，返回掩码的偏移量
     * @param length 负载长度
     * @return 掩码的偏移量
     */
    findMaskOffset(length) {
        if (length < 126) {
            return 2;
        }

        if (length <= (Math.pow(2, 16) - 1)) {
            return 4;
        }

        return 10;
    }

    /**
     * 校验opcode
     * @param opcode 给定的操作码
     * @return 通过，返回true，否则返回false
     */
    checkOpcode(opcode) {
        if ((opcode >= 0) && (opcode <= 2)) {
            return true;
        }

        if ((opcode >= 8) && (opcode <= 10)) {
            return true;
        }

        console.error('Invalid opcode!');
        return false;
    }

    /**
     * 校验RSV标志
     * @param rsvs RSV标志
     * @return 通过，返回true，否则返回false
     */
    checkRsvFlags(...rsvs) {
        if (rsvs[0]) {
            console.error('Invalid rsv flag!');
            return false;
        }

        if (rsvs[1]) {
            console.error('Invalid rsv flag!');
            return false;
        }

        if (rsvs[2]) {
            console.error('Invalid rsv flag!');
            return false;
        }

        return true;
    }

    /**
     * 关闭WebSocketServer
     * @param code 错误码
     * @param reason 错误信息
     */
    close(code, reason) {
        if (!this.socket) {
            return;
        }

        this.readyState = 'CLOSING';
        this.sendCloseFrame({ code: code || 1000, reason: reason || 'Close connection' });
    }

    /**
     * 发送数据
     * @param data 给定的数据
     * @param callback 回调函数
     */
    send(data, callback) {
        if (this.readyState !== 'OPEN') {
            console.error('The state of websocket is not OPEN!');
            if (callback) {
                callback({code: 1000, message: 'The state of websocket is not OPEN'});
                return;
            }

            this.emit("error", { code: 1000, message: 'The state of websocket is not OPEN'});
            return;
        }

        let frameData = this.transformMessageToFrame(data);
        this.socket.write(frameData, callback);
    }
}

export default WebSocketServer;
