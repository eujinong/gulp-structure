/*menu active*/
let url = window.location.href.split('/');
let page_name = url[url.length - 1].split('.')[0];
$(window).on('load resize orientationchange', function () {

    page_name = page_name == "" ? "index" : (page_name == "blog-inner" ? "blogs" : page_name);

    if ($(window).width() > 991) {
        let menus = $('.navbar-nav').children();
        for (let i = 0; i < menus.length; i++)
            menus[i].classList.remove('active');
        $('#' + page_name).addClass('active');
    } else {
        let menus = $('.nav-mobile').children();
        for (let i = 0; i < menus.length; i++)
            menus[i].classList.remove('active');
        $('#' + page_name + '-m').addClass('active');
    }
});

/*Go to top*/
const scrollToTopButton = document.getElementById('js-top');
const scrollFunc = () => {
    let y = window.scrollY;

    if (y > 0) {
        scrollToTopButton.className = "top-link show";
    } else {
        scrollToTopButton.className = "top-link hide";
    }
};
window.addEventListener("scroll", scrollFunc);
const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 10);
    }
};

scrollToTopButton.onclick = function (e) {
    e.preventDefault();
    scrollToTop();
};

/*effects init*/
wow = new WOW(
    {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    }
);
wow.init();

/*Stick social share*/
function sticktothetop() {
    let window_top = $(window).scrollTop();
    let top = $('#stick-here').offset().top;
    let stop = $('#stop').offset().top;

    if ((window_top - top) >= top && (window_top - stop) <= 20) {
        $('#blog-social').addClass('stick');
        $('#stick-here').height($('#blog-social').outerHeight());
    } else {
        $('#blog-social').removeClass('stick');
        $('#stick-here').height(0);
    }
}

$(function () {
    if (page_name == "blog-inner") {
        $(window).scroll(sticktothetop);
        sticktothetop();
    }
});
