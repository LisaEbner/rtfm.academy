(function ($) {
    "use strict";

    /* ==============================================
        SCROLL -->
        =============================================== */
    //$(document).ready(function () {
    //    $('.sidebar').localScroll();
    //    $('.sidebar').find('a').click(selectNav);
    //    function selectNav() {
    //        $(this)
    //          .parents('ul:first')
    //            .find('a')
    //              .removeClass('active')
    //            .end()
    //          .end()
    //          .addClass('active');
    //    }
    //    function trigger(data) {
    //        var el = $('.sidebar').find('a[href$="' + data.id + '"]').get(0);
    //        selectNav.call(el);
    //    }
    //});

    var sections = $('section, .targedsection'),
        nav = $('.sidebar'),
        nav_height = nav.outerHeight(),
        nav_height0 = 0;

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop();

        sections.each(function () {
            var top = $(this).offset().top - nav_height0,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');
                nav.find('ul').removeClass('activeParents');
                nav.find('li ul').hide();
                $('a').removeClass('nav_link_highlight');

                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
                $('.sidebar > ul > li li').find('a[href="#' + $(this).attr('id') + '"]').parent().parent().addClass('activeParents');
                $('.sidebar > ul > li li').find('a[href="#' + $(this).attr('id') + '"]').parent().parent().show();
                $('.activeParents').siblings('a').addClass('nav_link_highlight');
            }

        });
    });



    // back to top
    setTimeout(function () {
        var $sideBar = $('.sidebar')

        $sideBar.affix({
            offset: {
                top: function () {
                    var offsetTop = $sideBar.offset().top
                    var sideBarMargin = parseInt($sideBar.children(0).css('margin-top'), 10)
                    var navOuterHeight = $('.header').height()

                    return (this.top = offsetTop - navOuterHeight - sideBarMargin)
                },
                bottom: function () {
                    return (this.bottom = $('.footer').outerHeight(true))
                }
            }
        })
    }, 100);





})(jQuery);
