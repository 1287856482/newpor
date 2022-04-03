window.addEventListener('load', function() {

    var arrowl = this.document.querySelector('.arrow-l');
    var arrowr = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // console.log(focusWidth);

    // 鼠标经过显示切换按钮
    focus.addEventListener('mouseenter', function() {
            arrowl.style.display = 'block';
            arrowr.style.display = 'block';
            clearInterval(time);
            time = null
        })
        // 鼠标离开显示切换按钮
    focus.addEventListener('mouseleave', function() {
            arrowl.style.display = 'none'
            arrowr.style.display = 'none'
            time = setInterval(function() {
                // 手动调用事件
                arrowr.click();
            }, 1000);
        })
        // 小圆圈切换图片动态生产个数
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        var li1 = ol.querySelector('li')
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                var index = this.getAttribute('index')
            }
            // 当我们点击了某个小li 就要把这个li 的索引号给 num 和 circle  
            num = circle = index;
            this.className = 'current';
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;
    // 右按钮
    arrowr.addEventListener('click', function() {
        if (flag) {
            // 关闭节流阀
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                // 打开节流阀
                flag = true;
            });
            circle++;
            if (circle == 4) {
                circle = 0;
            }
            circlehhh();
        }
    });
    // 左按钮
    arrowl.addEventListener('click', function() {
        if (true) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circlehhh();
        }
    });

    function circlehhh() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    circlehhh();
    // 自动播放
    var time = setInterval(function() {
        // 手动调用事件
        arrowr.click();
    }, 4000);
});