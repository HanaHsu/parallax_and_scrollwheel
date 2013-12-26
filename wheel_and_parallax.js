$(function() {
    $.fn.parallax = function(options){
        var $$ = $(this);
        var parent = $$.parent("div");
        offset = $$.offset();
        var defaults = {
            "start": parent.offset().top,
            "stop": parent.offset().top + parent.height() - $$.height(),
            "top": $$.position().top,
            "stop_point": 0
        };
        var opts = $.extend(defaults, options);
        var move_diff = opts.stop_point - opts.top
        var scroll_diff = opts.stop - opts.start

        cal_top_position();

        return this.each(function(){
            $(window).bind('scroll', function() {
                cal_top_position();
            });
        });

        function cal_top_position(){
            windowTop = $(window).scrollTop();
            if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
                var newCoord = move_diff * (windowTop - opts.start) / scroll_diff;
                $$.stop().animate({top: String((opts.top || 0) + newCoord)
                },1000,'easeOutCubic');
            }
            else if(windowTop > opts.stop){
                $$.stop().animate({top: String((opts.stop_point || 0))
                },1000,'easeOutCubic');
            }
        }
    };

    $.fn.wheel = function (callback) {
        return this.each(function () {
            $(this).on('mousewheel DOMMouseScroll', function (e) {
                e.delta = null;
                if (e.originalEvent) {
                    if (e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta * -1;
                    if (e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY * -1 ;
                    if (e.originalEvent.detail) e.delta = e.originalEvent.detail * -20;
                }

                if (typeof callback == 'function') {
                    callback.call(this, e);
                }
            });
        });
    };

    //調整滾軸速度
    $('body').wheel(function (e) {
        e.preventDefault();

        window.scrollTo(window.pageXOffset, window.pageYOffset - e.delta/5);
    });
});

