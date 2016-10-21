/**
 * Created by maofaming on 16/8/26.
 */
// var $selectColor = $("#select-color");
//
//
// $selectColor.select2();
//
// $selectColor.on('change', function (e) {
//     console.log($(this).val());
// });

var vm = new Vue({
    el: '#vm-expand',
    data: {
        show: false
    },
    methods: {
        showExpand: function () {
            this.show = true;
            console.log(this.show);
        },
        hideExpand: function () {
            this.show = false;
        }
    }
});

var vmTransition = new Vue({
    el: '#vm-transition',
    data: {
        show: true,
        transitionState: 'Idle'
    },
    transitions: {
        expand: {
            beforeEnter: function (el) {
                el.textContent = 'beforeEnter'
            },
            enter: function (el) {
                el.textContent = 'enter'
            },
            afterEnter: function (el) {
                el.textContent = 'afterEnter'
            },
            transitionend: function (el) {
                console.log(1)
            },
            beforeLeave: function (el) {
                el.textContent = 'beforeLeave'
            },
            leave: function (el) {
                el.textContent = 'leave'
            },
            afterLeave: function (el) {
                el.textContent = 'afterLeave'
            }
        }
    }
});

var vmAnimation = new Vue({
    el: '#vm-animation',
    data: {
        show: true
    }
});

var vmAnimationJs = new Vue({
    el: '#vm-animation-js',
    data: {
        show: true
    },
    transitions: {
        fade: {
            css: false,
            enter: function (el, done) {
                // 元素已被插入 DOM
                // 在动画结束后调用 done
                $(el)
                    .css('opacity', 0)
                    .animate({ opacity: 1 }, 1000, done)
            },
            enterCancelled: function (el) {
                $(el).stop()
            },
            leave: function (el, done) {
                // 与 enter 相同
                $(el).animate({ opacity: 0 }, 1000, done)
            },
            leaveCancelled: function (el) {
                $(el).stop()
            }
        }
    }
});

Vue.transition('fade', {
    css: false,
    enter: function (el, done) {
        // 元素已被插入 DOM
        // 在动画结束后调用 done
        $(el)
            .css('opacity', 0)
            .animate({ opacity: 1 }, 1000, done)
    },
    enterCancelled: function (el) {
        $(el).stop()
    },
    leave: function (el, done) {
        // 与 enter 相同
        $(el).animate({ opacity: 0 }, 1000, done)
    },
    leaveCancelled: function (el) {
        $(el).stop()
    }
});

var vmAnimationTest = new Vue({
    el: '#vm-animation-test',
    data: {
        show: true
    }
});

Vue.transition('stagger', {
    stagger: function (index) {
        // 每个过渡项目增加 50ms 延时
        // 但是最大延时限制为 300ms
        return Math.min(300, index * 50)
    }
});

var vmStagger = new Vue({
    el: '#vm-stagger',
    data: {
        query: '',
        list: [
            { msg: 'Bruce Lee' },
            { msg: 'Jackie Chan' },
            { msg: 'Chuck Norris' },
            { msg: 'Jet Li' },
            { msg: 'Kung Fury' }
        ]
    }
})

Vue.component('child', {
    // 声明 props
    props: ['myMessage'],
    // prop 可以用在模板内
    // 可以用 `this.msg` 设置
    template: '<span>{{ myMessage }}</span><br><input v-model="myMessage">'
})

// 定义
var MyComponent = Vue.extend({
    template: '<div>A custom component!</div>'
})

// 注册
Vue.component('my-component', MyComponent)

// 创建根实例
new Vue({
    el: '#example',
    data: {
        parentMsg: 'edit me'
    }
});

// 注册子组件
// 将当前消息派发出去
Vue.component('child', {
    template: '#child-template',
    data: function () {
        return { msg: 'hello' }
    },
    methods: {
        notify: function () {
            if (this.msg.trim()) {
                this.$dispatch('child-msg', this.msg)
                this.msg = ''
            }
        },
        handle: function () {
            if (this.msg.trim()) {
                this.$dispatch('child-click', this.msg)
                this.msg = ''
            }
        }
    }
})

// 初始化父组件
// 将收到消息时将事件推入一个数组
var parent = new Vue({
    el: '#events-example',
    data: {
        messages: []
    },
    // 在创建实例时 `events` 选项简单地调用 `$on`
    events: {
        'child-msg': function (msg) {
            // 事件回调内的 `this` 自动绑定到注册它的实例上
            this.messages.push(msg)
        },
        'child-click': function (msg) {
            this.messages.push(msg)
        }
    }
});


Vue.directive('select', {
    twoWay: true,
    priority: 1000,

    params: ['options'],

    bind: function () {
        var self = this;
        // console.log('bind');
        $(this.el)
            .select2({
                tags: true
            })
            .on('change', function () {
                // self.vm.selected = $(this).val();
                // console.log(self, $(self.el).val(), self.vm === vmSelectColor);
                self.set($(self.el).val());
                // self.set(this.value)
            })
    },
    update: function (newValue, oldValue) {
        // console.log(newValue, oldValue);
        $(this.el).val(newValue).trigger('change')
    },
    unbind: function () {
        $(this.el).off().select2('destroy')
    }
})

var vmSelectColor = new Vue({
    el: '#select-color',
    data: {
        selected: [1,2],
        options: [
            {
                id: 1,
                text: 'orange'
            }, {
                id: 2,
                text: 'white'
            }, {
                id: 3,
                text: 'purple'
            }
        ]
    }
});


// 注册子组件
// 将当前消息派发出去
Vue.component('multiple-select', {
    template: '#multiple-select',
    props: ['list', 'all'],
    data: function () {
        return {
            showList: []
        }
    },
    computed: {
        showList: function () {
            var array = [];
            for(var i = 0, len = this.all.length; i < len; i++) {
                for (var j = 0, lenJ = this.list.length; j < lenJ; j++) {
                    if (this.list[j] === this.all[i]) {
                        break;
                    }
                }
                array.push({
                    name: this.all[i],
                    selected: j === lenJ ? false : true
                });
            }
            return array;
        }
    },
    methods: {
        check: function (index) {
            var item = this.showList[index];
            if (item) {
                item.selected = !item.selected;
            }
            var selectArray = [];
            for (var i = 0, len = this.showList.length; i < len; i++) {
                if (this.showList[i].selected) {
                    selectArray.push(this.showList[i].name);
                }
            }
            this.list = selectArray;
        }
    }
});


// 注册子组件
// 将当前消息派发出去
Vue.component('sort-select', {
    template: '#sort-select',
    props: ['list'],
    data: function () {
        return {
            startIndex: 0
        }
    },

    methods: {
        drag: function (index) {
            this.startIndex = index;
        },
        dragenter: function (e) {
            var node = e.target;
            this.setEnter(node, true);
        },
        dragover: function (e) {
            e.preventDefault();
            // console.log('voer', e);
        },
        dragleave: function (e) {
            var node = e.target;
            // node.style.backgroundColor = '#fff';
            this.setEnter(node, false);
            // e.preventDefault();
        },
        drop: function (index, e) {
            var node = e.target;
            this.setEnter(node, false);
            var array = [];
            for (var i = 0, len = this.list.length; i < len; i++) {
                if (i === this.startIndex) {
                    array.push(this.list[index])
                } else if (i === index) {
                    array.push(this.list[this.startIndex])
                } else {
                    array.push(this.list[i]);
                }
            }
            this.list = array;
            e.preventDefault();
        },
        setEnter: function (node, bool) {
            node.style.backgroundColor = bool ? 'rgba(0, 0, 0, .2)' : '#fff';
        }
    }
});

// 初始化父组件
// 将收到消息时将事件推入一个数组
var multiple = new Vue({
    el: '#multiple-list',
    data: {
        multipleList: ['搞笑', '篮球', '喵星人'],
        allList: ['搞笑', '篮球', '喵星人', '喵星人1', '喵星人2', '喵星人3']
    }
});

Vue.component('page-select', {
    template: '#page-select',
    props: ['current', 'size'],
    data: function () {
        return {
            inputPage: this.current
        }
    },
    computed: {
        pageData: function () {
            var that = this;
            var page = {
                prev: that.current === 1,
                next: that.current === that.size,
                pageList: []
            };

            function addItem(index) {
                // console.log(index ,that.current);
                page.pageList.push({
                    num: index,
                    type: 'item',
                    active: index === that.current
                })
            }
            
            function addJump() {
                page.pageList.push({
                    type: 'jump'
                })
            }

            if (that.size <= 7) {
                for (var i = 1; i <= Math.min(that.size, 7); i++) {
                    addItem(i);
                }
            } else {
                if (that.current <= 4) {// 1 2 3 4 5 6 ... 8
                    for(var i = 1; i <=6; i++) {
                        addItem(i);
                    }
                    addJump();
                    addItem(that.size);
                } else {// 1 ... 3 4 5 6 7 ***
                    addItem(1);
                    addJump();


                    var start =Math.min(Math.max(that.current - 2, 1), that.size - 5) ;
                    var end = Math.min(that.size, that.current + 2);

                    while (start <= end) {
                        addItem(start);
                        start++;
                    }

                    if (end < that.size) {//  1 ... 3 4 5 6 7... 9
                        if (end < that.size -1) {
                            addJump();
                        }
                        addItem(that.size);
                    }
                }
            }
            // console.log(page);
            return page;
        }
    },
    methods: {
        select: function (index) {
            if (index > 0 && index <= this.size) {
                this.current = index;
            }
        },
        next: function () {
            if (this.current < this.size) {
                this.current = this.current + 1;
            }
        },
        prev: function () {
            if (this.current > 1) {
                this.current = this.current - 1;
            }
        },
        jump: function () {
            var jumpNum = parseInt(this.inputPage);
            if (jumpNum) {
                this.select(jumpNum);
            }
        }
    }
});

var pageListDemo = new Vue({
    el: '#page-list-demo',
    data: {
        current: 2,
        size: 10
    }
});


Vue.component('upload-file', {
    template: '#upload-file',
    props: ['list', 'preview'],
    data: function () {
        return {
            isLoading: false,
            progress: ''
        }
    },
    methods: {
        change: function (fileType, event) {
            var file = event.target.files[0];
            if (file) {
                var name = file.name;
                var size = file.size;
                var type = file.type;
                console.log(name, size, type);
                this.uploadFile(fileType, file);
            }
        },
        remove: function (index) {
            if (this.preview && this.preview.length > 0) {
                this.preview.splice(index, 1);
            }
        },
        uploadFile: function (fileType, file) {
            var that = this;
            var formData = new FormData();
            formData.append('file', file);
            formData.append('upload_type', fileType);
            formData.append('ofmt', 'json');
            $.ajax({
                url: 'http://teacms.baidu.com:8666' + '/gc/page/upload',  //Server script to process data
                type: 'POST',
                xhr: function() {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // Check if upload property exists
                        myXhr.upload.addEventListener('progress',function(e){
                            if(e.lengthComputable){
                                that.isLoading = true;
                                that.progress = ((e.loaded / e.total) * 100)+ '%';
                                console.log(that.progress);
                            }
                        }, false); // For handling the progress of the upload
                    }
                    return myXhr;
                },
                //Ajax events
                success: function (data) {
                    that.isLoading = false;
                    if (data && data.code === 0) {
                        var item = data.result.data.file;

                    }
                    that.preview.push({
                        type: item.upload_type,
                        url: item.url
                    });
                    console.log('success',data)
                },
                error: function () {
                    that.isLoading = false;
                    console.log('error')
                },
                // Form data
                data: formData,
                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            });
        }
    }
});

var uploadFileDemo = new Vue({
    el: '#upload-file-demo',
    data: {
        preview: [
            {
                type: 'image',
                url: 'http://scloud-dlsw.br.baidu.com/guocha/static/image/f3/0c3f8cc8f6d854b813f5f87b11c54e.jpg',
            }
        ],
        list: [
            {
                accept: 'image/*',
                title: '上传图片',
                type: 'image'
            },{
                accept: '.gif',
                title: '上传GIF',
                type: 'gif'
            },{
                accept: '.mp4',
                title: '上传视频',
                type: 'video'
            }
        ]
    }
});

