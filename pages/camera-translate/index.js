Page({
    data: {},
    onLoad() {
        this.__cameraContext = wx.createCameraContext()
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