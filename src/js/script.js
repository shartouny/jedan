(function($) {
    "use strict";



    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
            $('#topbar').addClass('topbar-scrolled ');
        } else {
            $('#header').removeClass('header-scrolled');
            $('#topbar').removeClass('topbar-scrolled ');
        }
    });



    // Smooth scroll for the navigation and links with .scrollto classes
    var scrolltoOffset = $('#header').outerHeight() - 1;
    $(document).on('click', '.main-nav a, .mobile-nav a, .scrollto', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                e.preventDefault();

                var scrollto = target.offset().top - scrolltoOffset;

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.main-nav, .mobile-nav').length) {
                    $('.main-nav .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('.mobile-nav-overly').fadeOut(3000);
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function() {
        if (window.location.hash) {
            var initial_nav = window.location.hash;
            if ($(initial_nav).length) {
                var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');
            }
        }
    });

    // Mobile Navigation
    if ($('.main-nav').length) {
        var $mobile_nav = $('.main-nav').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $(document).on('click', '.mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('.mobile-nav-overly').toggle();
        });

        $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
            e.preventDefault();
            $(this).next().slideToggle(300);
            $(this).parent().toggleClass('active');
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Navigation active state on scroll
    // var nav_sections = $('section');
    // var main_nav = $('.main-nav, .mobile-nav');
    // var main_nav_height = $('#header').outerHeight();

    // $(window).on('scroll', function() {
    //     var cur_pos = $(this).scrollTop() + 200;

    //     nav_sections.each(function() {
    //         var top = $(this).offset().top - main_nav_height,
    //             bottom = top + $(this).outerHeight();

    //         if (cur_pos >= top && cur_pos <= bottom) {
    //             main_nav.find('li').removeClass('active');
    //             main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
    //         }

    //         if (cur_pos < 300) {
    //             $(".nav-menu ul:first li:first").addClass('active');
    //         }

    //     });
    // });

    // jQuery counterUp (used in Whu Us section)
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Porfolio isotope and filter
    // $(window).on('load', function() {
    //     var portfolioIsotope = $('.portfolio-container').isotope({
    //         itemSelector: '.portfolio-item'
    //     });
    //     $('#portfolio-flters li').on('click', function() {
    //         $("#portfolio-flters li").removeClass('filter-active');
    //         $(this).addClass('filter-active');

    //         portfolioIsotope.isotope({
    //             filter: $(this).data('filter')
    //         });
    //         aos_init();
    //     });
    // });

    // Initiate venobox (lightbox feature used in portofilo)
    // $(document).ready(function() {
    //     $('.venobox').venobox({
    //         'share': false
    //     });
    // });

    // Testimonials carousel (uses the Owl Carousel library)
    // $(".testimonials-carousel").owlCarousel({
    //     autoplay: true,
    //     dots: true,
    //     loop: true,
    //     items: 1
    // });

    // Clients carousel (uses the Owl Carousel library)
    // $(".clients-carousel").owlCarousel({
    //     autoplay: true,
    //     dots: true,
    //     loop: true,
    //     responsive: {
    //         0: {
    //             items: 2
    //         },
    //         768: {
    //             items: 4
    //         },
    //         900: {
    //             items: 6
    //         }
    //     }
    // });

    // Portfolio details carousel
    // $(".portfolio-details-carousel").owlCarousel({
    //     autoplay: true,
    //     dots: true,
    //     loop: true,
    //     items: 1
    // });

    // Init AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            once: true
        });
    }
    $(window).on('load', function() {
        aos_init();
    });
    var $my_animation_elements = Array($('#footer'));
    var $window = $(window);
    $window.on('scroll', check_if_in_view);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($my_animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();

            var element_top_position = $element.offset().top();
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position > window_top_position) &&
                (element_top_position < window_bottom_position + (element_height / 2))) {
                console.log('active');
            } else {
                $element.removeClass('active');
            }
        });
    }


    $(function() {
        $('.fade-toggle-menu').children('.content').slideUp();
        $('.toggle-icon').on('click', function() {
            $(this).toggleClass('active');
            if ($(this).hasClass('active')) {
                $(this).parent().parent().next('.content').slideDown();
                $(this).parent().parent().parent().siblings().find('.content').slideUp();
                $(this).children('i').addClass('fa-chevron-up').removeClass('fa-chevron-down');
                $(this).parent().parent().parent().siblings().find('.toggle-icon').removeClass('active')
                $(this).parent().parent().parent().siblings().find('.toggle-icon').children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')

            } else {
                $(this).children('i').addClass('fa-chevron-down').removeClass('fa-chevron-up');
                $(this).parent().parent().next('.content').slideUp();
            }
        });

    });
    $(document).on("click", function(event) {
        var $trigger = $(".drop-down-download");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(".drop-down-menu").removeClass('show');
        }
    });
    $(function() {

        // Show hide popover
        $(".drop-down-download").on('click', function(e) {
            e.preventDefault();
            if ($(this).next('.drop-down-menu').hasClass('show')) {
                $(this).next('.drop-down-menu').removeClass('show')
            } else {
                $(this).next('.drop-down-menu').addClass('show')
            }
            // $(this).next(".drop-down-menu").slideToggle("fast");
        });




        // $('.drop-down-download').on('click', function(e) {
        //     e.preventDefault();
        //     if ($(this).next('.drop-down-menu').hasClass('show')) {
        //         $(this).next('.drop-down-menu').removeClass('show')
        //     } else {
        //         $(this).next('.drop-down-menu').addClass('show')
        //     }

        // });

    });
    $(function() {
        $('.point-details-ul li').on('click', function() {
            $(this).toggleClass('active').siblings().removeClass('active');
        });
    });
    $(function() {
        $('[data-toggle="popover"]').popover()
    })
})(jQuery);