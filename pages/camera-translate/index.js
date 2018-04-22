Page({
    data: {},
    onLoad() {
        this.__cameraContext = wx.createCameraContext();
    },
    startCollectPhoto: function (e) {
        this.__timeHandler = setInterval(() => {
            this.__cameraContext.takePhoto({
                success: function (res) {
                    console.log(res, 'startCollectPhoto');
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