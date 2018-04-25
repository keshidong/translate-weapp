Page({
    data: {
        tempImgUrl: '',
    },
    onLoad() {
        this.__cameraContext = wx.createCameraContext();

        this.__cropperCanvasId = 'image-cropper';
        wx.createSelectorQuery().select('#viewport').boundingClientRect((rect) => {
            this.__viewportRect = rect;
        }).exec();
    },
    onReady() {
        this.__canvasContext = wx.createCanvasContext(this.__cropperCanvasId);
        // canvasContext.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
    },
    startCollectPhoto: function (e) {
        this.__timeHandler = setInterval(() => {
            this.__cameraContext.takePhoto({
                success: (res) => {
                    console.log(this.__viewportRect);
                    this.__canvasContext.drawImage(
                        res.tempImagePath,
                        this.__viewportRect.left, this.__viewportRect.top,
                        this.__viewportRect.width, this.__viewportRect.height,
                        0, 0,
                        this.__viewportRect.width, this.__viewportRect.height,
                        );
                    this.__canvasContext.draw(false, () => {
                        wx.canvasToTempFilePath({
                            canvasId: this.__cropperCanvasId,
                            x: 0,
                            y: 0,
                            width: this.__viewportRect.width,
                            height: this.__viewportRect.height,
                            success: (res) => {
                                // 上传到后端 todo
                                this.setData({
                                    tempImgUrl: res.tempFilePath,
                                });
                                console.log(res.tempFilePath) // 100 * 100 * 4
                            }
                        })
                    });
                    // console.log(res, 'startCollectPhoto');

                },
                fail: function (res) {
                    console.log(res, 'start collectPhoto failed');
                }
            })
        }, 100);
    },
    stopCollectPhoto: function (e) {
        clearInterval(this.__timeHandler);
    },
    startRecord: function (e) {
        this.__cameraContext.startRecord({
            success: function (res) {
                console.log(res, 'start');
            }
        })
    },
    stopRecord: function (e) {
        this.__cameraContext.stopRecord({
            success: function (res) {
                console.log(res, 'end');
            }
        })
    }
})