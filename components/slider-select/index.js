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

        // touch
        _touchStartOffsetX: 0,
        _touchThreshold: 50,
    },
    methods: {
        touchStart: function (e) {
            this.setData({
                _touchStartOffsetX: e.changedTouches[0].clientX,
            });
        },
        touchEnd: function (e) {
            const { _touchStartOffsetX, _touchThreshold } = this.data;
            const _touchEndOffsetX = e.changedTouches[0].clientX;
            const { options } = this.data;

            if (_touchEndOffsetX - _touchStartOffsetX > _touchThreshold) {
                // 右滑
                const curIndex = this._getSelectActiveIndex();
                if (curIndex - 1 >= 0) {
                    // index 有效
                    this.setData({
                        value: options[curIndex - 1].value,
                    });
                }
                
            } else if (_touchEndOffsetX - _touchStartOffsetX < _touchThreshold) {
                // 左滑
                const curIndex = this._getSelectActiveIndex();
                // index 有效
                if (curIndex + 1 <= options.length) {
                    this.setData({
                        value: options[curIndex + 1].value,
                    });
                }
            }
        },
        switchSelect: function (e) {
            this.setData({
                value: e.target.dataset.value,
            });
        },
        _getSelectActiveIndex: function () {
            const { options, value } = this.data;
            return options.map(opt => (opt.value)).indexOf(value);
        },
        _setStateFromProps: function () {
            this.setData({
                value: this.defaultValue,
            });
        },
    }
});
