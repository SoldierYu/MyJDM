/**
 * Created by yuxibing on 2018/5/31.
 */
window.onload = function () {
    search();
    banner();
    downTime();
};
var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    var bannerBox = document.querySelector('.jd_banner');
    var height = bannerBox.offsetHeight;
    window.onscroll = function () {
        // console.log(document.body.scrollTop);
        // console.log(document.documentElement.scrollTop);
        // console.log(window.pageYOffset);
        var scroolTop = document.documentElement.scrollTop;
        var opacity = 0;
        if (scroolTop < height) {
            opacity = scroolTop / height * 0.85;
        } else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201, 21, 35,' + opacity + ')';
    }

};
var banner = function () {
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imgBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    var addTransition = function () {
        imgBox.style.transition = 'all 0.5s';
        imgBox.webkitTransition = 'all 0.5s';
    };

    var removeTransition = function removeTransition() {
        imgBox.style.transition = 'none';
        imgBox.webkitTransition = 'none';
    };

    var setTranslateX = function (totalWidth) {
        imgBox.style.transform = 'translateX(' + totalWidth + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + totalWidth + 'px)';
    };

    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * width);
    }, 1000);

    var setPoint = function () {
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        }
        points[index - 1].classList.add('now');

    };

    imgBox.addEventListener('transitionend', function () {
        if (index >= 9) {
            index = 1;
        } else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        setTranslateX(-index * width);
        setPoint();
    });
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });

    imgBox.addEventListener('touchmove', function (e) {
        isMove = true;
        distanceX = e.touches[0].clientX - startX;
        removeTransition();
        setTranslateX(-index * width + distanceX);

    });

    imgBox.addEventListener('touchend', function (e) {
        if (isMove) {
            if (Math.abs(distanceX) > width / 3) {
                if (distanceX > 0) {
                    index--;
                } else if (distanceX < 0) {
                    index++;
                }
            }
            addTransition();
            setTranslateX(-index * width);
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * width);
        }, 1000);
    });
};
var downTime = function () {
    var spans = document.querySelector('.time').querySelectorAll('span');
    var time = 2 * 60 * 60;
    var timer = setInterval(function () {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        if (time<=0) {
            clearInterval(timer);
        }
    }, 1000)
};