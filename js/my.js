 
 (function ($) {
	            server_ip='http://127.0.0.1:8080'
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
				
				
        })(jQuery);