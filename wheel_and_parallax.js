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
        var get_scroll_postion = getScrollOffsets();
        window.scrollTo(get_scroll_postion.x, get_scroll_postion.y - e.delta/5);
    });

    // Return the current scrollbar offsets as the x and y properties of an object
    function getScrollOffsets(w) {
        // Use the specified window or the current window if no argument
        w = w || window;

        // This works for all browsers except IE versions 8 and before
        if (w.pageXOffset != null) return {
            x: w.pageXOffset,
            y:w.pageYOffset
        };

        // For IE (or any browser) in Standards mode
        var d = w.document;
        if (document.compatMode == "CSS1Compat") {
            return {
                x:d.documentElement.scrollLeft,
                y:d.documentElement.scrollTop
            };
        }

        // For browsers in Quirks mode
        return { 
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        }; 
    }
});

