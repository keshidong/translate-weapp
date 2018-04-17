Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        options: {
            type: Array,
            value: [],
        },
        style: {
            type: String,
        },
        defaultValue: Number,
    },
    data: {
        value: 1,
    },
    methods: {
        touchStart: function (e) {
            console.log(e);
        },
        touchEnd: function (e) {
            console.log(e);
        },
        switchSelect: function (e) {
            console.log(e);
            this.setData({
                value: e.target.dataset.value,
            });
        },
        _setStateFromProps: function () {
            this.setData({
                value: this.defaultValue,
            });
        },
    }
});
