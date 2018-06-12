/**
 * Created by yuxibing on 2018/6/8.
 */
window.onload = function () {
    document.querySelector('.jd_cate_left').addEventListener('touchmove', function (e) {
        e.preventDefault();

    });
    document.querySelector('.jd_cate_right').addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    new IScroll(document.querySelector('.jd_cate_left'), {
        scrollX: false,
        scrollY: true
    });
    new IScroll(document.querySelector('.jd_cate_right'), {
        scrollX: false,
        scrollY: true
    });
}
