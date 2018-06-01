var scrolltotop = {
    setting: {startline: 100, scrollto: 0, scrollduration: 1e3, fadeduration: [500, 100]},
    controlHTML: "",
    controlattrs: {offsetx: 5, offsety: 5},
    anchorkeyword: "#top",
    state: {isvisible: !1, shouldvisible: !1},
    scrollup: function () {
        this.cssfixedsupport || this.$control.css({opacity: 0});
        var e = isNaN(this.setting.scrollto) ? this.setting.scrollto : parseInt(this.setting.scrollto);
        e = "string" == typeof e && 1 == jQuery("#" + e).length ? jQuery("#" + e).offset().top : 0, this.$body.animate({scrollTop: e}, this.setting.scrollduration)
    },
    keepfixed: function () {
        var e = jQuery(window), t = e.scrollLeft() + e.width() - this.$control.width() - this.controlattrs.offsetx,
            o = e.scrollTop() + e.height() - this.$control.height() - this.controlattrs.offsety;
        this.$control.css({left: t + "px", top: o + "px"})
    },
    togglecontrol: function () {
        var e = jQuery(window).scrollTop();
        this.cssfixedsupport || this.keepfixed(), this.state.shouldvisible = e >= this.setting.startline ? !0 : !1, this.state.shouldvisible && !this.state.isvisible ? (this.$control.stop().animate({opacity: 1}, this.setting.fadeduration[0]), this.state.isvisible = !0) : 0 == this.state.shouldvisible && this.state.isvisible && (this.$control.stop().animate({opacity: 0}, this.setting.fadeduration[1]), this.state.isvisible = !1)
    },
    init: function () {
        jQuery(document).ready(function (e) {
            var t = scrolltotop, o = document.all;
            t.cssfixedsupport = !o || o && "CSS1Compat" == document.compatMode && window.XMLHttpRequest, t.$body = e(window.opera ? "CSS1Compat" == document.compatMode ? "html" : "body" : "html,body"), t.$control = e('<div id="topcontrol">' + t.controlHTML + "</div>").css({
                position: t.cssfixedsupport ? "fixed" : "absolute",
                bottom: t.controlattrs.offsety,
                right: t.controlattrs.offsetx,
                opacity: 0,
                cursor: "pointer"
            }).attr({title: "Scroll Back to Top"}).click(function () {
                return t.scrollup(), !1
            }).appendTo("body"), document.all && !window.XMLHttpRequest && "" != t.$control.text() && t.$control.css({width: t.$control.width()}), t.togglecontrol(), e('a[href="' + t.anchorkeyword + '"]').click(function () {
                return t.scrollup(), !1
            }), e(window).bind("scroll resize", function (e) {
                t.togglecontrol()
            })
        })
    }
};
scrolltotop.init(), !function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e : e(jQuery)
}(function (e) {
    function t(t) {
        var r = t || window.event, l = s.call(arguments, 1), c = 0, u = 0, h = 0, f = 0, p = 0, m = 0;
        if (t = e.event.fix(r), t.type = "mousewheel", "detail" in r && (h = -1 * r.detail), "wheelDelta" in r && (h = r.wheelDelta), "wheelDeltaY" in r && (h = r.wheelDeltaY), "wheelDeltaX" in r && (u = -1 * r.wheelDeltaX), "axis" in r && r.axis === r.HORIZONTAL_AXIS && (u = -1 * h, h = 0), c = 0 === h ? u : h, "deltaY" in r && (h = -1 * r.deltaY, c = h), "deltaX" in r && (u = r.deltaX, 0 === h && (c = -1 * u)), 0 !== h || 0 !== u) {
            if (1 === r.deltaMode) {
                var g = e.data(this, "mousewheel-line-height");
                c *= g, h *= g, u *= g
            } else if (2 === r.deltaMode) {
                var v = e.data(this, "mousewheel-page-height");
                c *= v, h *= v, u *= v
            }
            if (f = Math.max(Math.abs(h), Math.abs(u)), (!i || i > f) && (i = f, a(r, f) && (i /= 40)), a(r, f) && (c /= 40, u /= 40, h /= 40), c = Math[c >= 1 ? "floor" : "ceil"](c / i), u = Math[u >= 1 ? "floor" : "ceil"](u / i), h = Math[h >= 1 ? "floor" : "ceil"](h / i), d.settings.normalizeOffset && this.getBoundingClientRect) {
                var x = this.getBoundingClientRect();
                p = t.clientX - x.left, m = t.clientY - x.top
            }
            return t.deltaX = u, t.deltaY = h, t.deltaFactor = i, t.offsetX = p, t.offsetY = m, t.deltaMode = 0, l.unshift(t, c, u, h), n && clearTimeout(n), n = setTimeout(o, 200), (e.event.dispatch || e.event.handle).apply(this, l)
        }
    }

    function o() {
        i = null
    }

    function a(e, t) {
        return d.settings.adjustOldDeltas && "mousewheel" === e.type && t % 120 === 0
    }

    var n, i, r = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        l = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        s = Array.prototype.slice;
    if (e.event.fixHooks)for (var c = r.length; c;)e.event.fixHooks[r[--c]] = e.event.mouseHooks;
    var d = e.event.special.mousewheel = {
        version: "3.1.12", setup: function () {
            if (this.addEventListener)for (var o = l.length; o;)this.addEventListener(l[--o], t, !1); else this.onmousewheel = t;
            e.data(this, "mousewheel-line-height", d.getLineHeight(this)), e.data(this, "mousewheel-page-height", d.getPageHeight(this))
        }, teardown: function () {
            if (this.removeEventListener)for (var o = l.length; o;)this.removeEventListener(l[--o], t, !1); else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        }, getLineHeight: function (t) {
            var o = e(t), a = o["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return a.length || (a = e("body")), parseInt(a.css("fontSize"), 10) || parseInt(o.css("fontSize"), 10) || 16
        }, getPageHeight: function (t) {
            return e(t).height()
        }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
    };
    e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        }, unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
}), !function (e, t, o) {
    !function (t) {
        var a = "function" == typeof define && define.amd, n = "https:" == o.location.protocol ? "https:" : "http:",
            i = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
        a || e.event.special.mousewheel || e("head").append(decodeURI("%3Cscript src=" + n + "//" + i + "%3E%3C/script%3E")), t()
    }(function () {
        var a = "mCustomScrollbar", n = "mCS", i = ".mCustomScrollbar", r = {
                setTop: 0,
                setLeft: 0,
                axis: "y",
                scrollbarPosition: "inside",
                scrollInertia: 950,
                autoDraggerLength: !0,
                alwaysShowScrollbar: 0,
                snapOffset: 0,
                mouseWheel: {
                    enable: !0,
                    scrollAmount: "auto",
                    axis: "y",
                    deltaFactor: "auto",
                    disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                },
                scrollButtons: {scrollType: "stepless", scrollAmount: "auto"},
                keyboard: {enable: !0, scrollType: "stepless", scrollAmount: "auto"},
                contentTouchScroll: 25,
                advanced: {
                    autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                    updateOnContentResize: !0,
                    updateOnImageLoad: !0
                },
                theme: "light",
                callbacks: {onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, alwaysTriggerOffsets: !0}
            }, l = 0, s = {}, c = t.attachEvent && !t.addEventListener ? 1 : 0, d = !1,
            u = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
            h = {
                init: function (t) {
                    var t = e.extend(!0, {}, r, t), o = f.call(this);
                    if (t.live) {
                        var a = t.liveSelector || this.selector || i, c = e(a);
                        if ("off" === t.live)return void m(a);
                        s[a] = setTimeout(function () {
                            c.mCustomScrollbar(t), "once" === t.live && c.length && m(a)
                        }, 500)
                    } else m(a);
                    return t.setWidth = t.set_width ? t.set_width : t.setWidth, t.setHeight = t.set_height ? t.set_height : t.setHeight, t.axis = t.horizontalScroll ? "x" : g(t.axis), t.scrollInertia = t.scrollInertia > 0 && t.scrollInertia < 17 ? 17 : t.scrollInertia, "object" != typeof t.mouseWheel && 1 == t.mouseWheel && (t.mouseWheel = {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        preventDefault: !1,
                        deltaFactor: "auto",
                        normalizeDelta: !1,
                        invert: !1
                    }), t.mouseWheel.scrollAmount = t.mouseWheelPixels ? t.mouseWheelPixels : t.mouseWheel.scrollAmount, t.mouseWheel.normalizeDelta = t.advanced.normalizeMouseWheelDelta ? t.advanced.normalizeMouseWheelDelta : t.mouseWheel.normalizeDelta, t.scrollButtons.scrollType = v(t.scrollButtons.scrollType), p(t), e(o).each(function () {
                        var o = e(this);
                        if (!o.data(n)) {
                            o.data(n, {
                                idx: ++l,
                                opt: t,
                                scrollRatio: {y: null, x: null},
                                overflowed: null,
                                contentReset: {y: null, x: null},
                                bindEvents: !1,
                                tweenRunning: !1,
                                sequential: {},
                                langDir: o.css("direction"),
                                cbOffsets: null,
                                trigger: null
                            });
                            var a = o.data(n), i = a.opt, r = o.data("mcs-axis"), s = o.data("mcs-scrollbar-position"),
                                c = o.data("mcs-theme");
                            r && (i.axis = r), s && (i.scrollbarPosition = s), c && (i.theme = c, p(i)), x.call(this), e("#mCSB_" + a.idx + "_container img:not(." + u[2] + ")").addClass(u[2]), h.update.call(null, o)
                        }
                    })
                }, update: function (t, o) {
                    var a = t || f.call(this);
                    return e(a).each(function () {
                        var t = e(this);
                        if (t.data(n)) {
                            var a = t.data(n), i = a.opt, r = e("#mCSB_" + a.idx + "_container"),
                                l = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")];
                            if (!r.length)return;
                            a.tweenRunning && F(t), t.hasClass(u[3]) && t.removeClass(u[3]), t.hasClass(u[4]) && t.removeClass(u[4]), S.call(this), _.call(this), "y" === i.axis || i.advanced.autoExpandHorizontalScroll || r.css("width", w(r.children())), a.overflowed = T.call(this), I.call(this), i.autoDraggerLength && b.call(this), C.call(this), k.call(this);
                            var s = [Math.abs(r[0].offsetTop), Math.abs(r[0].offsetLeft)];
                            "x" !== i.axis && (a.overflowed[0] ? l[0].height() > l[0].parent().height() ? M.call(this) : (N(t, s[0].toString(), {
                                dir: "y",
                                dur: 0,
                                overwrite: "none"
                            }), a.contentReset.y = null) : (M.call(this), "y" === i.axis ? O.call(this) : "yx" === i.axis && a.overflowed[1] && N(t, s[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }))), "y" !== i.axis && (a.overflowed[1] ? l[1].width() > l[1].parent().width() ? M.call(this) : (N(t, s[1].toString(), {
                                dir: "x",
                                dur: 0,
                                overwrite: "none"
                            }), a.contentReset.x = null) : (M.call(this), "x" === i.axis ? O.call(this) : "yx" === i.axis && a.overflowed[0] && N(t, s[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }))), o && a && (2 === o && i.callbacks.onImageLoad && "function" == typeof i.callbacks.onImageLoad ? i.callbacks.onImageLoad.call(this) : 3 === o && i.callbacks.onSelectorChange && "function" == typeof i.callbacks.onSelectorChange ? i.callbacks.onSelectorChange.call(this) : i.callbacks.onUpdate && "function" == typeof i.callbacks.onUpdate && i.callbacks.onUpdate.call(this)), $.call(this)
                        }
                    })
                }, scrollTo: function (t, o) {
                    if ("undefined" != typeof t && null != t) {
                        var a = f.call(this);
                        return e(a).each(function () {
                            var a = e(this);
                            if (a.data(n)) {
                                var i = a.data(n), r = i.opt, l = {
                                        trigger: "external",
                                        scrollInertia: r.scrollInertia,
                                        scrollEasing: "mcsEaseInOut",
                                        moveDragger: !1,
                                        timeout: 60,
                                        callbacks: !0,
                                        onStart: !0,
                                        onUpdate: !0,
                                        onComplete: !0
                                    }, s = e.extend(!0, {}, l, o), c = q.call(this, t),
                                    d = s.scrollInertia > 0 && s.scrollInertia < 17 ? 17 : s.scrollInertia;
                                c[0] = X.call(this, c[0], "y"), c[1] = X.call(this, c[1], "x"), s.moveDragger && (c[0] *= i.scrollRatio.y, c[1] *= i.scrollRatio.x), s.dur = d, setTimeout(function () {
                                    null !== c[0] && "undefined" != typeof c[0] && "x" !== r.axis && i.overflowed[0] && (s.dir = "y", s.overwrite = "all", N(a, c[0].toString(), s)), null !== c[1] && "undefined" != typeof c[1] && "y" !== r.axis && i.overflowed[1] && (s.dir = "x", s.overwrite = "none", N(a, c[1].toString(), s))
                                }, s.timeout)
                            }
                        })
                    }
                }, stop: function () {
                    var t = f.call(this);
                    return e(t).each(function () {
                        var t = e(this);
                        t.data(n) && F(t)
                    })
                }, disable: function (t) {
                    var o = f.call(this);
                    return e(o).each(function () {
                        var o = e(this);
                        o.data(n) && (o.data(n), $.call(this, "remove"), O.call(this), t && M.call(this), I.call(this, !0), o.addClass(u[3]))
                    })
                }, destroy: function () {
                    var t = f.call(this);
                    return e(t).each(function () {
                        var o = e(this);
                        if (o.data(n)) {
                            var i = o.data(n), r = i.opt, l = e("#mCSB_" + i.idx),
                                s = e("#mCSB_" + i.idx + "_container"), c = e(".mCSB_" + i.idx + "_scrollbar");
                            r.live && m(r.liveSelector || e(t).selector), $.call(this, "remove"), O.call(this), M.call(this), o.removeData(n), J(this, "mcs"), c.remove(), s.find("img." + u[2]).removeClass(u[2]), l.replaceWith(s.contents()), o.removeClass(a + " _" + n + "_" + i.idx + " " + u[6] + " " + u[7] + " " + u[5] + " " + u[3]).addClass(u[4])
                        }
                    })
                }
            }, f = function () {
                return "object" != typeof e(this) || e(this).length < 1 ? i : this
            }, p = function (t) {
                var o = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                    a = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                    n = ["minimal", "minimal-dark"], i = ["minimal", "minimal-dark"], r = ["minimal", "minimal-dark"];
                t.autoDraggerLength = e.inArray(t.theme, o) > -1 ? !1 : t.autoDraggerLength, t.autoExpandScrollbar = e.inArray(t.theme, a) > -1 ? !1 : t.autoExpandScrollbar, t.scrollButtons.enable = e.inArray(t.theme, n) > -1 ? !1 : t.scrollButtons.enable, t.autoHideScrollbar = e.inArray(t.theme, i) > -1 ? !0 : t.autoHideScrollbar, t.scrollbarPosition = e.inArray(t.theme, r) > -1 ? "outside" : t.scrollbarPosition
            }, m = function (e) {
                s[e] && (clearTimeout(s[e]), J(s, e))
            }, g = function (e) {
                return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
            }, v = function (e) {
                return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
            }, x = function () {
                var t = e(this), o = t.data(n), i = o.opt, r = i.autoExpandScrollbar ? " " + u[1] + "_expand" : "",
                    l = ["<div id='mCSB_" + o.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_vertical" + r + "'><div class='" + u[12] + "'><div id='mCSB_" + o.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + o.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + o.idx + "_scrollbar mCS-" + i.theme + " mCSB_scrollTools_horizontal" + r + "'><div class='" + u[12] + "'><div id='mCSB_" + o.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                    s = "yx" === i.axis ? "mCSB_vertical_horizontal" : "x" === i.axis ? "mCSB_horizontal" : "mCSB_vertical",
                    c = "yx" === i.axis ? l[0] + l[1] : "x" === i.axis ? l[1] : l[0],
                    d = "yx" === i.axis ? "<div id='mCSB_" + o.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                    h = i.autoHideScrollbar ? " " + u[6] : "", f = "x" !== i.axis && "rtl" === o.langDir ? " " + u[7] : "";
                i.setWidth && t.css("width", i.setWidth), i.setHeight && t.css("height", i.setHeight), i.setLeft = "y" !== i.axis && "rtl" === o.langDir ? "989999px" : i.setLeft, t.addClass(a + " _" + n + "_" + o.idx + h + f).wrapInner("<div id='mCSB_" + o.idx + "' class='mCustomScrollBox mCS-" + i.theme + " " + s + "'><div id='mCSB_" + o.idx + "_container' class='mCSB_container' style='position:relative; top:" + i.setTop + "; left:" + i.setLeft + ";' dir=" + o.langDir + " /></div>");
                var p = e("#mCSB_" + o.idx), m = e("#mCSB_" + o.idx + "_container");
                "y" === i.axis || i.advanced.autoExpandHorizontalScroll || m.css("width", w(m.children())), "outside" === i.scrollbarPosition ? ("static" === t.css("position") && t.css("position", "relative"), t.css("overflow", "visible"), p.addClass("mCSB_outside").after(c)) : (p.addClass("mCSB_inside").append(c), m.wrap(d)), y.call(this);
                var g = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                g[0].css("min-height", g[0].height()), g[1].css("min-width", g[1].width())
            }, w = function (t) {
                return Math.max.apply(Math, t.map(function () {
                    return e(this).outerWidth(!0)
                }).get())
            }, _ = function () {
                var t = e(this), o = t.data(n), a = o.opt, i = e("#mCSB_" + o.idx + "_container");
                a.advanced.autoExpandHorizontalScroll && "y" !== a.axis && i.css({
                    position: "absolute",
                    width: "auto"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: Math.ceil(i[0].getBoundingClientRect().right + .4) - Math.floor(i[0].getBoundingClientRect().left),
                    position: "relative"
                }).unwrap()
            }, y = function () {
                var t = e(this), o = t.data(n), a = o.opt, i = e(".mCSB_" + o.idx + "_scrollbar:first"),
                    r = te(a.scrollButtons.tabindex) ? "tabindex='" + a.scrollButtons.tabindex + "'" : "",
                    l = ["<a href='#' class='" + u[13] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + u[14] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + u[15] + "' oncontextmenu='return false;' " + r + " />", "<a href='#' class='" + u[16] + "' oncontextmenu='return false;' " + r + " />"],
                    s = ["x" === a.axis ? l[2] : l[0], "x" === a.axis ? l[3] : l[1], l[2], l[3]];
                a.scrollButtons.enable && i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])
            }, S = function () {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = t.css("max-height") || "none",
                    r = -1 !== i.indexOf("%"), l = t.css("box-sizing");
                if ("none" !== i) {
                    var s = r ? t.parent().height() * parseInt(i) / 100 : parseInt(i);
                    "border-box" === l && (s -= t.innerHeight() - t.height() + (t.outerHeight() - t.innerHeight())), a.css("max-height", Math.round(s))
                }
            }, b = function () {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [a.height() / i.outerHeight(!1), a.width() / i.outerWidth(!1)],
                    s = [parseInt(r[0].css("min-height")), Math.round(l[0] * r[0].parent().height()), parseInt(r[1].css("min-width")), Math.round(l[1] * r[1].parent().width())],
                    d = c && s[1] < s[0] ? s[0] : s[1], u = c && s[3] < s[2] ? s[2] : s[3];
                r[0].css({
                    height: d,
                    "max-height": r[0].parent().height() - 10
                }).find(".mCSB_dragger_bar").css({"line-height": s[0] + "px"}), r[1].css({
                    width: u,
                    "max-width": r[1].parent().width() - 10
                })
            }, C = function () {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"),
                    r = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")],
                    l = [i.outerHeight(!1) - a.height(), i.outerWidth(!1) - a.width()],
                    s = [l[0] / (r[0].parent().height() - r[0].height()), l[1] / (r[1].parent().width() - r[1].width())];
                o.scrollRatio = {y: s[0], x: s[1]}
            }, B = function (e, t, o) {
                var a = o ? u[0] + "_expanded" : "", n = e.closest(".mCSB_scrollTools");
                "active" === t ? (e.toggleClass(u[0] + " " + a), n.toggleClass(u[1]), e[0]._draggable = e[0]._draggable ? 0 : 1) : e[0]._draggable || ("hide" === t ? (e.removeClass(u[0]), n.removeClass(u[1])) : (e.addClass(u[0]), n.addClass(u[1])))
            }, T = function () {
                var t = e(this), o = t.data(n), a = e("#mCSB_" + o.idx), i = e("#mCSB_" + o.idx + "_container"),
                    r = null == o.overflowed ? i.height() : i.outerHeight(!1),
                    l = null == o.overflowed ? i.width() : i.outerWidth(!1);
                return [r > a.height(), l > a.width()]
            }, M = function () {
                var t = e(this), o = t.data(n), a = o.opt, i = e("#mCSB_" + o.idx), r = e("#mCSB_" + o.idx + "_container"),
                    l = [e("#mCSB_" + o.idx + "_dragger_vertical"), e("#mCSB_" + o.idx + "_dragger_horizontal")];
                if (F(t), ("x" !== a.axis && !o.overflowed[0] || "y" === a.axis && o.overflowed[0]) && (l[0].add(r).css("top", 0), N(t, "_resetY")), "y" !== a.axis && !o.overflowed[1] || "x" === a.axis && o.overflowed[1]) {
                    var s = dx = 0;
                    "rtl" === o.langDir && (s = i.width() - r.outerWidth(!1), dx = Math.abs(s / o.scrollRatio.x)), r.css("left", s), l[1].css("left", dx), N(t, "_resetX")
                }
            }, k = function () {
                function t() {
                    r = setTimeout(function () {
                        e.event.special.mousewheel ? (clearTimeout(r), E.call(o[0])) : t()
                    }, 100)
                }

                var o = e(this), a = o.data(n), i = a.opt;
                if (!a.bindEvents) {
                    if (D.call(this), i.contentTouchScroll && R.call(this), L.call(this), i.mouseWheel.enable) {
                        var r;
                        t()
                    }
                    P.call(this), A.call(this), i.advanced.autoScrollOnFocus && W.call(this), i.scrollButtons.enable && z.call(this), i.keyboard.enable && H.call(this), a.bindEvents = !0
                }
            }, O = function () {
                var t = e(this), a = t.data(n), i = a.opt, r = n + "_" + a.idx, l = ".mCSB_" + a.idx + "_scrollbar",
                    s = e("#mCSB_" + a.idx + ",#mCSB_" + a.idx + "_container,#mCSB_" + a.idx + "_container_wrapper," + l + " ." + u[12] + ",#mCSB_" + a.idx + "_dragger_vertical,#mCSB_" + a.idx + "_dragger_horizontal," + l + ">a"),
                    c = e("#mCSB_" + a.idx + "_container");
                i.advanced.releaseDraggableSelectors && s.add(e(i.advanced.releaseDraggableSelectors)), a.bindEvents && (e(o).unbind("." + r), s.each(function () {
                    e(this).unbind("." + r)
                }), clearTimeout(t[0]._focusTimeout), J(t[0], "_focusTimeout"), clearTimeout(a.sequential.step), J(a.sequential, "step"), clearTimeout(c[0].onCompleteTimeout), J(c[0], "onCompleteTimeout"), a.bindEvents = !1)
            }, I = function (t) {
                var o = e(this), a = o.data(n), i = a.opt, r = e("#mCSB_" + a.idx + "_container_wrapper"),
                    l = r.length ? r : e("#mCSB_" + a.idx + "_container"),
                    s = [e("#mCSB_" + a.idx + "_scrollbar_vertical"), e("#mCSB_" + a.idx + "_scrollbar_horizontal")],
                    c = [s[0].find(".mCSB_dragger"), s[1].find(".mCSB_dragger")];
                "x" !== i.axis && (a.overflowed[0] && !t ? (s[0].add(c[0]).add(s[0].children("a")).css("display", "block"), l.removeClass(u[8] + " " + u[10])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[0].add(s[0].children("a")).css("display", "none"), l.removeClass(u[10])) : (s[0].css("display", "none"), l.addClass(u[10])), l.addClass(u[8]))), "y" !== i.axis && (a.overflowed[1] && !t ? (s[1].add(c[1]).add(s[1].children("a")).css("display", "block"), l.removeClass(u[9] + " " + u[11])) : (i.alwaysShowScrollbar ? (2 !== i.alwaysShowScrollbar && c[1].add(s[1].children("a")).css("display", "none"), l.removeClass(u[11])) : (s[1].css("display", "none"), l.addClass(u[11])), l.addClass(u[9]))), a.overflowed[0] || a.overflowed[1] ? o.removeClass(u[5]) : o.addClass(u[5])
            }, j = function (e) {
                var t = e.type;
                switch (t) {
                    case"pointerdown":
                    case"MSPointerDown":
                    case"pointermove":
                    case"MSPointerMove":
                    case"pointerup":
                    case"MSPointerUp":
                        return [e.originalEvent.pageY, e.originalEvent.pageX, !1];
                    case"touchstart":
                    case"touchmove":
                    case"touchend":
                        var o = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                            a = e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
                        return [o.pageY, o.pageX, a > 1];
                    default:
                        return [e.pageY, e.pageX, !1]
                }
            }, D = function () {
                function t(e) {
                    var t = m.find("iframe");
                    if (t.length) {
                        var o = e ? "auto" : "none";
                        t.css("pointer-events", o)
                    }
                }

                function a(e, t, o, a) {
                    if (m[0].idleTimer = h.scrollInertia < 233 ? 250 : 0, i.attr("id") === p[1])var n = "x",
                        r = (i[0].offsetLeft - t + a) * u.scrollRatio.x; else var n = "y",
                        r = (i[0].offsetTop - e + o) * u.scrollRatio.y;
                    N(s, r.toString(), {dir: n, drag: !0})
                }

                var i, r, l, s = e(this), u = s.data(n), h = u.opt, f = n + "_" + u.idx,
                    p = ["mCSB_" + u.idx + "_dragger_vertical", "mCSB_" + u.idx + "_dragger_horizontal"],
                    m = e("#mCSB_" + u.idx + "_container"), g = e("#" + p[0] + ",#" + p[1]),
                    v = h.advanced.releaseDraggableSelectors ? g.add(e(h.advanced.releaseDraggableSelectors)) : g;
                g.bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f, function (a) {
                    if (a.stopImmediatePropagation(), a.preventDefault(), K(a)) {
                        d = !0, c && (o.onselectstart = function () {
                            return !1
                        }), t(!1), F(s), i = e(this);
                        var n = i.offset(), u = j(a)[0] - n.top, f = j(a)[1] - n.left, p = i.height() + n.top,
                            m = i.width() + n.left;
                        p > u && u > 0 && m > f && f > 0 && (r = u, l = f), B(i, "active", h.autoExpandScrollbar)
                    }
                }).bind("touchmove." + f, function (e) {
                    e.stopImmediatePropagation(), e.preventDefault();
                    var t = i.offset(), o = j(e)[0] - t.top, n = j(e)[1] - t.left;
                    a(r, l, o, n)
                }), e(o).bind("mousemove." + f + " pointermove." + f + " MSPointerMove." + f, function (e) {
                    if (i) {
                        var t = i.offset(), o = j(e)[0] - t.top, n = j(e)[1] - t.left;
                        if (r === o)return;
                        a(r, l, o, n)
                    }
                }).add(v).bind("mouseup." + f + " touchend." + f + " pointerup." + f + " MSPointerUp." + f, function () {
                    i && (B(i, "active", h.autoExpandScrollbar), i = null), d = !1, c && (o.onselectstart = null), t(!0)
                })
            }, R = function () {
                function t(e, t) {
                    var o = [1.5 * t, 2 * t, t / 1.5, t / 2];
                    return e > 90 ? t > 4 ? o[0] : o[3] : e > 60 ? t > 3 ? o[3] : o[2] : e > 30 ? t > 8 ? o[1] : t > 6 ? o[0] : t > 4 ? t : o[2] : t > 8 ? t : o[3]
                }

                function o(e, t, o, a, n, i) {
                    e && N(g, e.toString(), {dur: t, scrollEasing: o, dir: a, overwrite: n, drag: i})
                }

                var a, i, r, l, s, c, u, h, f, p, m, g = e(this), v = g.data(n), x = v.opt, w = n + "_" + v.idx,
                    _ = e("#mCSB_" + v.idx), y = e("#mCSB_" + v.idx + "_container"),
                    S = [e("#mCSB_" + v.idx + "_dragger_vertical"), e("#mCSB_" + v.idx + "_dragger_horizontal")], b = [],
                    C = [], B = 0, T = "yx" === x.axis ? "none" : "all", M = [];
                y.bind("touchstart." + w + " pointerdown." + w + " MSPointerDown." + w, function (e) {
                    if (ee(e) && !d && !j(e)[2]) {
                        var t = y.offset();
                        a = j(e)[0] - t.top, i = j(e)[1] - t.left, M = [j(e)[0], j(e)[1]]
                    }
                }).bind("touchmove." + w + " pointermove." + w + " MSPointerMove." + w, function (e) {
                    if (ee(e) && !d && !j(e)[2]) {
                        e.stopImmediatePropagation(), c = Z();
                        var t = _.offset(), n = j(e)[0] - t.top, r = j(e)[1] - t.left, l = "mcsLinearOut";
                        if (b.push(n), C.push(r), M[2] = Math.abs(j(e)[0] - M[0]), M[3] = Math.abs(j(e)[1] - M[1]), v.overflowed[0])var s = S[0].parent().height() - S[0].height(),
                            u = a - n > 0 && n - a > -(s * v.scrollRatio.y) && (2 * M[3] < M[2] || "yx" === x.axis);
                        if (v.overflowed[1])var h = S[1].parent().width() - S[1].width(),
                            f = i - r > 0 && r - i > -(h * v.scrollRatio.x) && (2 * M[2] < M[3] || "yx" === x.axis);
                        (u || f) && e.preventDefault(), p = "yx" === x.axis ? [a - n, i - r] : "x" === x.axis ? [null, i - r] : [a - n, null], y[0].idleTimer = 250, v.overflowed[0] && o(p[0], B, l, "y", "all", !0), v.overflowed[1] && o(p[1], B, l, "x", T, !0)
                    }
                }), _.bind("touchstart." + w + " pointerdown." + w + " MSPointerDown." + w, function (e) {
                    if (ee(e) && !d && !j(e)[2]) {
                        e.stopImmediatePropagation(), F(g), s = Z();
                        var t = _.offset();
                        r = j(e)[0] - t.top, l = j(e)[1] - t.left, b = [], C = []
                    }
                }).bind("touchend." + w + " pointerup." + w + " MSPointerUp." + w, function (e) {
                    if (ee(e) && !d && !j(e)[2]) {
                        e.stopImmediatePropagation(), u = Z();
                        var a = _.offset(), n = j(e)[0] - a.top, i = j(e)[1] - a.left;
                        if (!(u - c > 30)) {
                            f = 1e3 / (u - s);
                            var g = "mcsEaseOut", w = 2.5 > f, S = w ? [b[b.length - 2], C[C.length - 2]] : [0, 0];
                            h = w ? [n - S[0], i - S[1]] : [n - r, i - l];
                            var B = [Math.abs(h[0]), Math.abs(h[1])];
                            f = w ? [Math.abs(h[0] / 4), Math.abs(h[1] / 4)] : [f, f];
                            var M = [Math.abs(y[0].offsetTop) - h[0] * t(B[0] / f[0], f[0]), Math.abs(y[0].offsetLeft) - h[1] * t(B[1] / f[1], f[1])];
                            p = "yx" === x.axis ? [M[0], M[1]] : "x" === x.axis ? [null, M[1]] : [M[0], null], m = [4 * B[0] + x.scrollInertia, 4 * B[1] + x.scrollInertia];
                            var k = parseInt(x.contentTouchScroll) || 0;
                            p[0] = B[0] > k ? p[0] : 0, p[1] = B[1] > k ? p[1] : 0, v.overflowed[0] && o(p[0], m[0], g, "y", T, !1), v.overflowed[1] && o(p[1], m[1], g, "x", T, !1)
                        }
                    }
                })
            }, L = function () {
                function a() {
                    return t.getSelection ? t.getSelection().toString() : o.selection && "Control" != o.selection.type ? o.selection.createRange().text : 0
                }

                function i(e, t, o) {
                    u.type = o && r ? "stepped" : "stepless", u.scrollAmount = 10, U(l, e, t, "mcsLinearOut", o ? 60 : null)
                }

                var r, l = e(this), s = l.data(n), c = s.opt, u = s.sequential, h = n + "_" + s.idx,
                    f = e("#mCSB_" + s.idx + "_container"), p = f.parent();
                f.bind("mousedown." + h, function () {
                    r || (r = 1, d = !0)
                }).add(o).bind("mousemove." + h, function (e) {
                    if (r && a()) {
                        var t = f.offset(), o = j(e)[0] - t.top + f[0].offsetTop, n = j(e)[1] - t.left + f[0].offsetLeft;
                        o > 0 && o < p.height() && n > 0 && n < p.width() ? u.step && i("off", null, "stepped") : ("x" !== c.axis && s.overflowed[0] && (0 > o ? i("on", 38) : o > p.height() && i("on", 40)), "y" !== c.axis && s.overflowed[1] && (0 > n ? i("on", 37) : n > p.width() && i("on", 39)))
                    }
                }).bind("mouseup." + h, function () {
                    r && (r = 0, i("off", null)), d = !1
                })
            }, E = function () {
                function t(e) {
                    var t = null;
                    try {
                        var o = e.contentDocument || e.contentWindow.document;
                        t = o.body.innerHTML
                    } catch (a) {
                    }
                    return null !== t
                }

                var o = e(this), a = o.data(n);
                if (a) {
                    var i = a.opt, r = n + "_" + a.idx, l = e("#mCSB_" + a.idx),
                        s = [e("#mCSB_" + a.idx + "_dragger_vertical"), e("#mCSB_" + a.idx + "_dragger_horizontal")],
                        d = e("#mCSB_" + a.idx + "_container").find("iframe"), u = l;
                    d.length && d.each(function () {
                        var o = this;
                        t(o) && (u = u.add(e(o).contents().find("body")))
                    }), u.bind("mousewheel." + r, function (t, n) {
                        if (F(o), !Q(o, t.target)) {
                            var r = "auto" !== i.mouseWheel.deltaFactor ? parseInt(i.mouseWheel.deltaFactor) : c && t.deltaFactor < 100 ? 100 : t.deltaFactor || 100;
                            if ("x" === i.axis || "x" === i.mouseWheel.axis)var d = "x",
                                u = [Math.round(r * a.scrollRatio.x), parseInt(i.mouseWheel.scrollAmount)],
                                h = "auto" !== i.mouseWheel.scrollAmount ? u[1] : u[0] >= l.width() ? .9 * l.width() : u[0],
                                f = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetLeft), p = s[1][0].offsetLeft,
                                m = s[1].parent().width() - s[1].width(), g = t.deltaX || t.deltaY || n; else var d = "y",
                                u = [Math.round(r * a.scrollRatio.y), parseInt(i.mouseWheel.scrollAmount)],
                                h = "auto" !== i.mouseWheel.scrollAmount ? u[1] : u[0] >= l.height() ? .9 * l.height() : u[0],
                                f = Math.abs(e("#mCSB_" + a.idx + "_container")[0].offsetTop), p = s[0][0].offsetTop,
                                m = s[0].parent().height() - s[0].height(), g = t.deltaY || n;
                            "y" === d && !a.overflowed[0] || "x" === d && !a.overflowed[1] || (i.mouseWheel.invert && (g = -g), i.mouseWheel.normalizeDelta && (g = 0 > g ? -1 : 1), (g > 0 && 0 !== p || 0 > g && p !== m || i.mouseWheel.preventDefault) && (t.stopImmediatePropagation(), t.preventDefault()), N(o, (f - g * h).toString(), {dir: d}))
                        }
                    })
                }
            }, Q = function (t, o) {
                var a = o.nodeName.toLowerCase(), i = t.data(n).opt.mouseWheel.disableOver, r = ["select", "textarea"];
                return e.inArray(a, i) > -1 && !(e.inArray(a, r) > -1 && !e(o).is(":focus"))
            }, P = function () {
                var t = e(this), o = t.data(n), a = n + "_" + o.idx, i = e("#mCSB_" + o.idx + "_container"), r = i.parent(),
                    l = e(".mCSB_" + o.idx + "_scrollbar ." + u[12]);
                l.bind("touchstart." + a + " pointerdown." + a + " MSPointerDown." + a, function () {
                    d = !0
                }).bind("touchend." + a + " pointerup." + a + " MSPointerUp." + a, function () {
                    d = !1
                }).bind("click." + a, function (a) {
                    if (e(a.target).hasClass(u[12]) || e(a.target).hasClass("mCSB_draggerRail")) {
                        F(t);
                        var n = e(this), l = n.find(".mCSB_dragger");
                        if (n.parent(".mCSB_scrollTools_horizontal").length > 0) {
                            if (!o.overflowed[1])return;
                            var s = "x", c = a.pageX > l.offset().left ? -1 : 1,
                                d = Math.abs(i[0].offsetLeft) - .9 * c * r.width()
                        } else {
                            if (!o.overflowed[0])return;
                            var s = "y", c = a.pageY > l.offset().top ? -1 : 1,
                                d = Math.abs(i[0].offsetTop) - .9 * c * r.height()
                        }
                        N(t, d.toString(), {dir: s, scrollEasing: "mcsEaseInOut"})
                    }
                })
            }, W = function () {
                var t = e(this), a = t.data(n), i = a.opt, r = n + "_" + a.idx, l = e("#mCSB_" + a.idx + "_container"),
                    s = l.parent();
                l.bind("focusin." + r, function () {
                    var a = e(o.activeElement), n = l.find(".mCustomScrollBox").length, r = 0;
                    a.is(i.advanced.autoScrollOnFocus) && (F(t), clearTimeout(t[0]._focusTimeout), t[0]._focusTimer = n ? (r + 17) * n : 0, t[0]._focusTimeout = setTimeout(function () {
                        var e = [oe(a)[0], oe(a)[1]], o = [l[0].offsetTop, l[0].offsetLeft],
                            n = [o[0] + e[0] >= 0 && o[0] + e[0] < s.height() - a.outerHeight(!1), o[1] + e[1] >= 0 && o[0] + e[1] < s.width() - a.outerWidth(!1)],
                            c = "yx" !== i.axis || n[0] || n[1] ? "all" : "none";
                        "x" === i.axis || n[0] || N(t, e[0].toString(), {
                            dir: "y",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: r
                        }), "y" === i.axis || n[1] || N(t, e[1].toString(), {
                            dir: "x",
                            scrollEasing: "mcsEaseInOut",
                            overwrite: c,
                            dur: r
                        })
                    }, t[0]._focusTimer))
                })
            }, A = function () {
                var t = e(this), o = t.data(n), a = n + "_" + o.idx, i = e("#mCSB_" + o.idx + "_container").parent();
                i.bind("scroll." + a, function () {
                    (0 !== i.scrollTop() || 0 !== i.scrollLeft()) && e(".mCSB_" + o.idx + "_scrollbar").css("visibility", "hidden")
                })
            }, z = function () {
                var t = e(this), o = t.data(n), a = o.opt, i = o.sequential, r = n + "_" + o.idx,
                    l = ".mCSB_" + o.idx + "_scrollbar", s = e(l + ">a");
                s.bind("mousedown." + r + " touchstart." + r + " pointerdown." + r + " MSPointerDown." + r + " mouseup." + r + " touchend." + r + " pointerup." + r + " MSPointerUp." + r + " mouseout." + r + " pointerout." + r + " MSPointerOut." + r + " click." + r, function (n) {
                    function r(e, o) {
                        i.scrollAmount = a.snapAmount || a.scrollButtons.scrollAmount, U(t, e, o)
                    }

                    if (n.preventDefault(), K(n)) {
                        var l = e(this).attr("class");
                        switch (i.type = a.scrollButtons.scrollType, n.type) {
                            case"mousedown":
                            case"touchstart":
                            case"pointerdown":
                            case"MSPointerDown":
                                if ("stepped" === i.type)return;
                                d = !0, o.tweenRunning = !1, r("on", l);
                                break;
                            case"mouseup":
                            case"touchend":
                            case"pointerup":
                            case"MSPointerUp":
                            case"mouseout":
                            case"pointerout":
                            case"MSPointerOut":
                                if ("stepped" === i.type)return;
                                d = !1, i.dir && r("off", l);
                                break;
                            case"click":
                                if ("stepped" !== i.type || o.tweenRunning)return;
                                r("on", l)
                        }
                    }
                })
            }, H = function () {
                var t = e(this), a = t.data(n), i = a.opt, r = a.sequential, l = n + "_" + a.idx, s = e("#mCSB_" + a.idx),
                    c = e("#mCSB_" + a.idx + "_container"), d = c.parent(),
                    u = "input,textarea,select,datalist,keygen,[contenteditable='true']";
                s.attr("tabindex", "0").bind("blur." + l + " keydown." + l + " keyup." + l, function (n) {
                    function l(e, o) {
                        r.type = i.keyboard.scrollType, r.scrollAmount = i.snapAmount || i.keyboard.scrollAmount, "stepped" === r.type && a.tweenRunning || U(t, e, o)
                    }

                    switch (n.type) {
                        case"blur":
                            a.tweenRunning && r.dir && l("off", null);
                            break;
                        case"keydown":
                        case"keyup":
                            var s = n.keyCode ? n.keyCode : n.which, h = "on";
                            if ("x" !== i.axis && (38 === s || 40 === s) || "y" !== i.axis && (37 === s || 39 === s)) {
                                if ((38 === s || 40 === s) && !a.overflowed[0] || (37 === s || 39 === s) && !a.overflowed[1])return;
                                "keyup" === n.type && (h = "off"), e(o.activeElement).is(u) || (n.preventDefault(), n.stopImmediatePropagation(), l(h, s))
                            } else if (33 === s || 34 === s) {
                                if ((a.overflowed[0] || a.overflowed[1]) && (n.preventDefault(), n.stopImmediatePropagation()), "keyup" === n.type) {
                                    F(t);
                                    var f = 34 === s ? -1 : 1;
                                    if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0])var p = "x",
                                        m = Math.abs(c[0].offsetLeft) - .9 * f * d.width(); else var p = "y",
                                        m = Math.abs(c[0].offsetTop) - .9 * f * d.height();
                                    N(t, m.toString(), {dir: p, scrollEasing: "mcsEaseInOut"})
                                }
                            } else if ((35 === s || 36 === s) && !e(o.activeElement).is(u) && ((a.overflowed[0] || a.overflowed[1]) && (n.preventDefault(), n.stopImmediatePropagation()), "keyup" === n.type)) {
                                if ("x" === i.axis || "yx" === i.axis && a.overflowed[1] && !a.overflowed[0])var p = "x",
                                    m = 35 === s ? Math.abs(d.width() - c.outerWidth(!1)) : 0; else var p = "y",
                                    m = 35 === s ? Math.abs(d.height() - c.outerHeight(!1)) : 0;
                                N(t, m.toString(), {dir: p, scrollEasing: "mcsEaseInOut"})
                            }
                    }
                })
            }, U = function (t, o, a, i, r) {
                function l(e) {
                    var o = "stepped" !== h.type, a = r ? r : e ? o ? d.scrollInertia / 1.5 : d.scrollInertia : 1e3 / 60,
                        n = e ? o ? 7.5 : 40 : 2.5, s = [Math.abs(f[0].offsetTop), Math.abs(f[0].offsetLeft)],
                        u = [c.scrollRatio.y > 10 ? 10 : c.scrollRatio.y, c.scrollRatio.x > 10 ? 10 : c.scrollRatio.x],
                        p = "x" === h.dir[0] ? s[1] + h.dir[1] * u[1] * n : s[0] + h.dir[1] * u[0] * n,
                        m = "x" === h.dir[0] ? s[1] + h.dir[1] * parseInt(h.scrollAmount) : s[0] + h.dir[1] * parseInt(h.scrollAmount),
                        g = "auto" !== h.scrollAmount ? m : p,
                        v = i ? i : e ? o ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear", x = e ? !0 : !1;
                    return e && 17 > a && (g = "x" === h.dir[0] ? s[1] : s[0]), N(t, g.toString(), {
                        dir: h.dir[0],
                        scrollEasing: v,
                        dur: a,
                        onComplete: x
                    }), e ? void(h.dir = !1) : (clearTimeout(h.step), void(h.step = setTimeout(function () {
                        l()
                    }, a)))
                }

                function s() {
                    clearTimeout(h.step), J(h, "step"), F(t)
                }

                var c = t.data(n), d = c.opt, h = c.sequential, f = e("#mCSB_" + c.idx + "_container"),
                    p = "stepped" === h.type ? !0 : !1;
                switch (o) {
                    case"on":
                        if (h.dir = [a === u[16] || a === u[15] || 39 === a || 37 === a ? "x" : "y", a === u[13] || a === u[15] || 38 === a || 37 === a ? -1 : 1], F(t), te(a) && "stepped" === h.type)return;
                        l(p);
                        break;
                    case"off":
                        s(), (p || c.tweenRunning && h.dir) && l(!0)
                }
            }, q = function (t) {
                var o = e(this).data(n).opt, a = [];
                return "function" == typeof t && (t = t()), t instanceof Array ? a = t.length > 1 ? [t[0], t[1]] : "x" === o.axis ? [null, t[0]] : [t[0], null] : (a[0] = t.y ? t.y : t.x || "x" === o.axis ? null : t, a[1] = t.x ? t.x : t.y || "y" === o.axis ? null : t), "function" == typeof a[0] && (a[0] = a[0]()), "function" == typeof a[1] && (a[1] = a[1]()), a
            }, X = function (t, o) {
                if (null != t && "undefined" != typeof t) {
                    var a = e(this), i = a.data(n), r = i.opt, l = e("#mCSB_" + i.idx + "_container"), s = l.parent(),
                        c = typeof t;
                    o || (o = "x" === r.axis ? "x" : "y");
                    var d = "x" === o ? l.outerWidth(!1) : l.outerHeight(!1),
                        u = "x" === o ? l[0].offsetLeft : l[0].offsetTop, f = "x" === o ? "left" : "top";
                    switch (c) {
                        case"function":
                            return t();
                        case"object":
                            var p = t.jquery ? t : e(t);
                            if (!p.length)return;
                            return "x" === o ? oe(p)[1] : oe(p)[0];
                        case"string":
                        case"number":
                            if (te(t))return Math.abs(t);
                            if (-1 !== t.indexOf("%"))return Math.abs(d * parseInt(t) / 100);
                            if (-1 !== t.indexOf("-="))return Math.abs(u - parseInt(t.split("-=")[1]));
                            if (-1 !== t.indexOf("+=")) {
                                var m = u + parseInt(t.split("+=")[1]);
                                return m >= 0 ? 0 : Math.abs(m)
                            }
                            if (-1 !== t.indexOf("px") && te(t.split("px")[0]))return Math.abs(t.split("px")[0]);
                            if ("top" === t || "left" === t)return 0;
                            if ("bottom" === t)return Math.abs(s.height() - l.outerHeight(!1));
                            if ("right" === t)return Math.abs(s.width() - l.outerWidth(!1));
                            if ("first" === t || "last" === t) {
                                var p = l.find(":" + t);
                                return "x" === o ? oe(p)[1] : oe(p)[0]
                            }
                            return e(t).length ? "x" === o ? oe(e(t))[1] : oe(e(t))[0] : (l.css(f, t), void h.update.call(null, a[0]))
                    }
                }
            }, $ = function (t) {
                function o() {
                    clearTimeout(f[0].autoUpdate), f[0].autoUpdate = setTimeout(function () {
                        return d.advanced.updateOnSelectorChange && (p = r(), p !== _) ? (l(3), void(_ = p)) : (d.advanced.updateOnContentResize && (m = [f.outerHeight(!1), f.outerWidth(!1), v.height(), v.width(), w()[0], w()[1]], (m[0] !== y[0] || m[1] !== y[1] || m[2] !== y[2] || m[3] !== y[3] || m[4] !== y[4] || m[5] !== y[5]) && (l(m[0] !== y[0] || m[1] !== y[1]), y = m)), d.advanced.updateOnImageLoad && (g = a(), g !== S && (f.find("img").each(function () {
                            i(this)
                        }), S = g)), void((d.advanced.updateOnSelectorChange || d.advanced.updateOnContentResize || d.advanced.updateOnImageLoad) && o()))
                    }, 60)
                }

                function a() {
                    var e = 0;
                    return d.advanced.updateOnImageLoad && (e = f.find("img").length), e
                }

                function i(t) {
                    function o(e, t) {
                        return function () {
                            return t.apply(e, arguments)
                        }
                    }

                    function a() {
                        this.onload = null, e(t).addClass(u[2]), l(2)
                    }

                    if (e(t).hasClass(u[2]))return void l();
                    var n = new Image;
                    n.onload = o(n, a), n.src = t.src
                }

                function r() {
                    d.advanced.updateOnSelectorChange === !0 && (d.advanced.updateOnSelectorChange = "*");
                    var t = 0, o = f.find(d.advanced.updateOnSelectorChange);
                    return d.advanced.updateOnSelectorChange && o.length > 0 && o.each(function () {
                        t += e(this).height() + e(this).width()
                    }), t
                }

                function l(e) {
                    clearTimeout(f[0].autoUpdate), h.update.call(null, s[0], e)
                }

                var s = e(this), c = s.data(n), d = c.opt, f = e("#mCSB_" + c.idx + "_container");
                if (t)return clearTimeout(f[0].autoUpdate), void J(f[0], "autoUpdate");
                var p, m, g, v = f.parent(),
                    x = [e("#mCSB_" + c.idx + "_scrollbar_vertical"), e("#mCSB_" + c.idx + "_scrollbar_horizontal")],
                    w = function () {
                        return [x[0].is(":visible") ? x[0].outerHeight(!0) : 0, x[1].is(":visible") ? x[1].outerWidth(!0) : 0]
                    }, _ = r(), y = [f.outerHeight(!1), f.outerWidth(!1), v.height(), v.width(), w()[0], w()[1]], S = a();
                o()
            }, Y = function (e, t, o) {
                return Math.round(e / t) * t - o
            }, F = function (t) {
                var o = t.data(n),
                    a = e("#mCSB_" + o.idx + "_container,#mCSB_" + o.idx + "_container_wrapper,#mCSB_" + o.idx + "_dragger_vertical,#mCSB_" + o.idx + "_dragger_horizontal");
                a.each(function () {
                    G.call(this)
                })
            }, N = function (t, o, a) {
                function i(e) {
                    return s && c.callbacks[e] && "function" == typeof c.callbacks[e]
                }

                function r() {
                    return [c.callbacks.alwaysTriggerOffsets || w >= _[0] + S, c.callbacks.alwaysTriggerOffsets || -b >= w]
                }

                function l() {
                    var e = [f[0].offsetTop, f[0].offsetLeft], o = [v[0].offsetTop, v[0].offsetLeft],
                        n = [f.outerHeight(!1), f.outerWidth(!1)], i = [h.height(), h.width()];
                    t[0].mcs = {
                        content: f,
                        top: e[0],
                        left: e[1],
                        draggerTop: o[0],
                        draggerLeft: o[1],
                        topPct: Math.round(100 * Math.abs(e[0]) / (Math.abs(n[0]) - i[0])),
                        leftPct: Math.round(100 * Math.abs(e[1]) / (Math.abs(n[1]) - i[1])),
                        direction: a.dir
                    }
                }

                var s = t.data(n), c = s.opt, d = {
                        trigger: "internal",
                        dir: "y",
                        scrollEasing: "mcsEaseOut",
                        drag: !1,
                        dur: c.scrollInertia,
                        overwrite: "all",
                        callbacks: !0,
                        onStart: !0,
                        onUpdate: !0,
                        onComplete: !0
                    }, a = e.extend(d, a), u = [a.dur, a.drag ? 0 : a.dur], h = e("#mCSB_" + s.idx),
                    f = e("#mCSB_" + s.idx + "_container"), p = f.parent(),
                    m = c.callbacks.onTotalScrollOffset ? q.call(t, c.callbacks.onTotalScrollOffset) : [0, 0],
                    g = c.callbacks.onTotalScrollBackOffset ? q.call(t, c.callbacks.onTotalScrollBackOffset) : [0, 0];
                if (s.trigger = a.trigger, (0 !== p.scrollTop() || 0 !== p.scrollLeft()) && (e(".mCSB_" + s.idx + "_scrollbar").css("visibility", "visible"), p.scrollTop(0).scrollLeft(0)), "_resetY" !== o || s.contentReset.y || (i("onOverflowYNone") && c.callbacks.onOverflowYNone.call(t[0]), s.contentReset.y = 1), "_resetX" !== o || s.contentReset.x || (i("onOverflowXNone") && c.callbacks.onOverflowXNone.call(t[0]), s.contentReset.x = 1), "_resetY" !== o && "_resetX" !== o) {
                    switch (!s.contentReset.y && t[0].mcs || !s.overflowed[0] || (i("onOverflowY") && c.callbacks.onOverflowY.call(t[0]), s.contentReset.x = null), !s.contentReset.x && t[0].mcs || !s.overflowed[1] || (i("onOverflowX") && c.callbacks.onOverflowX.call(t[0]), s.contentReset.x = null), c.snapAmount && (o = Y(o, c.snapAmount, c.snapOffset)), a.dir) {
                        case"x":
                            var v = e("#mCSB_" + s.idx + "_dragger_horizontal"), x = "left", w = f[0].offsetLeft,
                                _ = [h.width() - f.outerWidth(!1), v.parent().width() - v.width()],
                                y = [o, 0 === o ? 0 : o / s.scrollRatio.x], S = m[1], b = g[1],
                                C = S > 0 ? S / s.scrollRatio.x : 0, T = b > 0 ? b / s.scrollRatio.x : 0;
                            break;
                        case"y":
                            var v = e("#mCSB_" + s.idx + "_dragger_vertical"), x = "top", w = f[0].offsetTop,
                                _ = [h.height() - f.outerHeight(!1), v.parent().height() - v.height()],
                                y = [o, 0 === o ? 0 : o / s.scrollRatio.y], S = m[0], b = g[0],
                                C = S > 0 ? S / s.scrollRatio.y : 0, T = b > 0 ? b / s.scrollRatio.y : 0
                    }
                    y[1] < 0 || 0 === y[0] && 0 === y[1] ? y = [0, 0] : y[1] >= _[1] ? y = [_[0], _[1]] : y[0] = -y[0], t[0].mcs || (l(), i("onInit") && c.callbacks.onInit.call(t[0])), clearTimeout(f[0].onCompleteTimeout), (s.tweenRunning || !(0 === w && y[0] >= 0 || w === _[0] && y[0] <= _[0])) && (V(v[0], x, Math.round(y[1]), u[1], a.scrollEasing), V(f[0], x, Math.round(y[0]), u[0], a.scrollEasing, a.overwrite, {
                        onStart: function () {
                            a.callbacks && a.onStart && !s.tweenRunning && (i("onScrollStart") && (l(), c.callbacks.onScrollStart.call(t[0])), s.tweenRunning = !0, B(v), s.cbOffsets = r())
                        }, onUpdate: function () {
                            a.callbacks && a.onUpdate && i("whileScrolling") && (l(), c.callbacks.whileScrolling.call(t[0]))
                        }, onComplete: function () {
                            if (a.callbacks && a.onComplete) {
                                "yx" === c.axis && clearTimeout(f[0].onCompleteTimeout);
                                var e = f[0].idleTimer || 0;
                                f[0].onCompleteTimeout = setTimeout(function () {
                                    i("onScroll") && (l(), c.callbacks.onScroll.call(t[0])), i("onTotalScroll") && y[1] >= _[1] - C && s.cbOffsets[0] && (l(), c.callbacks.onTotalScroll.call(t[0])), i("onTotalScrollBack") && y[1] <= T && s.cbOffsets[1] && (l(), c.callbacks.onTotalScrollBack.call(t[0])), s.tweenRunning = !1, f[0].idleTimer = 0, B(v, "hide")
                                }, e)
                            }
                        }
                    }))
                }
            }, V = function (e, o, a, n, i, r, l) {
                function s() {
                    S.stop || (w || m.call(), w = Z() - x, c(), w >= S.time && (S.time = w > S.time ? w + f - (w - S.time) : w + f - 1, S.time < w + 1 && (S.time = w + 1)), S.time < n ? S.id = p(s) : v.call())
                }

                function c() {
                    n > 0 ? (S.currVal = h(S.time, _, b, n, i), y[o] = Math.round(S.currVal) + "px") : y[o] = a + "px", g.call()
                }

                function d() {
                    f = 1e3 / 60, S.time = w + f, p = t.requestAnimationFrame ? t.requestAnimationFrame : function (e) {
                        return c(), setTimeout(e, .01)
                    }, S.id = p(s)
                }

                function u() {
                    null != S.id && (t.requestAnimationFrame ? t.cancelAnimationFrame(S.id) : clearTimeout(S.id), S.id = null)
                }

                function h(e, t, o, a, n) {
                    switch (n) {
                        case"linear":
                        case"mcsLinear":
                            return o * e / a + t;
                        case"mcsLinearOut":
                            return e /= a, e--, o * Math.sqrt(1 - e * e) + t;
                        case"easeInOutSmooth":
                            return e /= a / 2, 1 > e ? o / 2 * e * e + t : (e--, -o / 2 * (e * (e - 2) - 1) + t);
                        case"easeInOutStrong":
                            return e /= a / 2, 1 > e ? o / 2 * Math.pow(2, 10 * (e - 1)) + t : (e--, o / 2 * (-Math.pow(2, -10 * e) + 2) + t);
                        case"easeInOut":
                        case"mcsEaseInOut":
                            return e /= a / 2, 1 > e ? o / 2 * e * e * e + t : (e -= 2, o / 2 * (e * e * e + 2) + t);
                        case"easeOutSmooth":
                            return e /= a, e--, -o * (e * e * e * e - 1) + t;
                        case"easeOutStrong":
                            return o * (-Math.pow(2, -10 * e / a) + 1) + t;
                        case"easeOut":
                        case"mcsEaseOut":
                        default:
                            var i = (e /= a) * e, r = i * e;
                            return t + o * (.499999999999997 * r * i + -2.5 * i * i + 5.5 * r + -6.5 * i + 4 * e)
                    }
                }

                e._mTween || (e._mTween = {top: {}, left: {}});
                var f, p, l = l || {}, m = l.onStart || function () {
                    }, g = l.onUpdate || function () {
                    }, v = l.onComplete || function () {
                    }, x = Z(), w = 0, _ = e.offsetTop, y = e.style, S = e._mTween[o];
                "left" === o && (_ = e.offsetLeft);
                var b = a - _;
                S.stop = 0, "none" !== r && u(), d()
            }, Z = function () {
                return t.performance && t.performance.now ? t.performance.now() : t.performance && t.performance.webkitNow ? t.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            }, G = function () {
                var e = this;
                e._mTween || (e._mTween = {top: {}, left: {}});
                for (var o = ["top", "left"], a = 0; a < o.length; a++) {
                    var n = o[a];
                    e._mTween[n].id && (t.requestAnimationFrame ? t.cancelAnimationFrame(e._mTween[n].id) : clearTimeout(e._mTween[n].id), e._mTween[n].id = null, e._mTween[n].stop = 1)
                }
            }, J = function (e, t) {
                try {
                    delete e[t]
                } catch (o) {
                    e[t] = null
                }
            }, K = function (e) {
                return !(e.which && 1 !== e.which)
            }, ee = function (e) {
                var t = e.originalEvent.pointerType;
                return !(t && "touch" !== t && 2 !== t)
            }, te = function (e) {
                return !isNaN(parseFloat(e)) && isFinite(e)
            }, oe = function (e) {
                var t = e.parents(".mCSB_container");
                return [e.offset().top - t.offset().top, e.offset().left - t.offset().left]
            };
        e.fn[a] = function (t) {
            return h[t] ? h[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : h.init.apply(this, arguments)
        }, e[a] = function (t) {
            return h[t] ? h[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist") : h.init.apply(this, arguments)
        }, e[a].defaults = r, t[a] = !0, e(t).load(function () {
            e(i)[a](), e.extend(e.expr[":"], {
                mcsInView: e.expr[":"].mcsInView || function (t) {
                    var o, a, n = e(t), i = n.parents(".mCSB_container");
                    return i.length ? (o = i.parent(), a = [i[0].offsetTop, i[0].offsetLeft], a[0] + oe(n)[0] >= 0 && a[0] + oe(n)[0] < o.height() - n.outerHeight(!1) && a[1] + oe(n)[1] >= 0 && a[1] + oe(n)[1] < o.width() - n.outerWidth(!1)) : void 0
                }, mcsOverflow: e.expr[":"].mcsOverflow || function (t) {
                    var o = e(t).data(n);
                    return o ? o.overflowed[0] || o.overflowed[1] : void 0
                }
            })
        })
    })
}(jQuery, window, document);
var App = function () {
    function e() {
        jQuery(window).scroll(function () {
            jQuery(window).scrollTop() > 100 ? jQuery(".header-fixed .header-sticky").addClass("header-fixed-shrink") : jQuery(".header-fixed .header-sticky").removeClass("header-fixed-shrink")
        })
    }

    function t() {
        jQuery(document).on("click", ".mega-menu .dropdown-menu", function (e) {
            e.stopPropagation()
        })
    }

    function o() {
        jQuery(".search").click(function () {
            jQuery(".search-btn").hasClass("fa-search") ? (jQuery(".search-open").fadeIn(500), jQuery(".search-btn").removeClass("fa-search"), jQuery(".search-btn").addClass("fa-times")) : (jQuery(".search-open").fadeOut(500), jQuery(".search-btn").addClass("fa-search"), jQuery(".search-btn").removeClass("fa-times"))
        })
    }

    function a() {
        jQuery(".header-v5 .search-button").click(function () {
            jQuery(".header-v5 .search-open").slideDown()
        }), jQuery(".header-v5 .search-close").click(function () {
            jQuery(".header-v5 .search-open").slideUp()
        }), jQuery(window).scroll(function () {
            jQuery(this).scrollTop() > 1 && jQuery(".header-v5 .search-open").fadeOut("fast")
        })
    }

    function n() {
        jQuery(".list-toggle").on("click", function () {
            jQuery(this).toggleClass("active")
        })
    }

    function i() {
        var e = function () {
            $(".equal-height-columns").each(function () {
                heights = [], $(".equal-height-column", this).each(function () {
                    $(this).removeAttr("style"), heights.push($(this).height())
                }), $(".equal-height-column", this).height(Math.max.apply(Math, heights))
            })
        };
        e(), $(window).resize(function () {
            e()
        }), $(window).load(function () {
            e("img.equal-height-column")
        })
    }

    function r() {
        $(".hoverSelector").on("hover", function (e) {
            $(".hoverSelectorBlock", this).toggleClass("show"), e.stopPropagation()
        })
    }

    function l() {
        jQuery(".carousel").carousel({
            interval: 15e3,
            pause: "hover"
        }), jQuery(".tooltips").tooltip(), jQuery(".tooltips-show").tooltip("show"), jQuery(".tooltips-hide").tooltip("hide"), jQuery(".tooltips-toggle").tooltip("toggle"), jQuery(".tooltips-destroy").tooltip("destroy"), jQuery(".popovers").popover(), jQuery(".popovers-show").popover("show"), jQuery(".popovers-hide").popover("hide"), jQuery(".popovers-toggle").popover("toggle"), jQuery(".popovers-destroy").popover("destroy")
    }

    return {
        init: function () {
            l(), o(), a(), n(), e(), t(), r(), i()
        }, initScrollBar: function () {
            jQuery(".mCustomScrollbar").mCustomScrollbar({theme: "minimal", scrollInertia: 300, scrollEasing: "linear"})
        }, initCounter: function () {
            jQuery(".counter").counterUp({delay: 10, time: 1e3})
        }, initParallaxBg: function () {
            jQuery(window).load(function () {
                jQuery(".parallaxBg").parallax("50%", .2), jQuery(".parallaxBg1").parallax("50%", .4)
            })
        }, initAnimateDropdown: function () {
            function e() {
                jQuery(".dropdown").on("show.bs.dropdown", function (e) {
                    jQuery(this).find(".dropdown-menu").first().stop(!0, !0).slideDown()
                }), jQuery(".dropdown").on("hide.bs.dropdown", function (e) {
                    jQuery(this).find(".dropdown-menu").first().stop(!0, !0).slideUp()
                })
            }

            jQuery(window).resize(function () {
                jQuery(window).width() > 768 && e()
            }), jQuery(window).width() > 768 && e()
        }
    }
}();
!function (a) {
    "use strict";
    var b = function (a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {
        constructor: b, init: function (b, c, d) {
            var e, f, g, h, i;
            for (this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, g = this.options.trigger.split(" "), i = g.length; i--;)h = g[i], "click" == h ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : "manual" != h && (e = "hover" == h ? "mouseenter" : "focus", f = "hover" == h ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this)));
            this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        }, getOptions: function (b) {
            return b = a.extend({}, a.fn[this.type].defaults, this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b
        }, enter: function (b) {
            var e, c = a.fn[this.type].defaults, d = {};
            return this._options && a.each(this._options, function (a, b) {
                c[a] != b && (d[a] = b)
            }, this), e = a(b.currentTarget)[this.type](d).data(this.type), e.options.delay && e.options.delay.show ? (clearTimeout(this.timeout), e.hoverState = "in", void(this.timeout = setTimeout(function () {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show))) : e.show()
        }, leave: function (b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            return this.timeout && clearTimeout(this.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", void(this.timeout = setTimeout(function () {
                "out" == c.hoverState && c.hide()
            }, c.options.delay.hide))) : c.hide()
        }, show: function () {
            var b, c, d, e, f, g, h = a.Event("show");
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(h), h.isDefaultPrevented())return;
                switch (b = this.tip(), this.setContent(), this.options.animation && b.addClass("fade"), f = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, b.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }), this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f) {
                    case "bottom":
                        g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
                        break;
                    case "top":
                        g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
                        break;
                    case "left":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
                        break;
                    case "right":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width}
                }
                this.applyPlacement(g, f), this.$element.trigger("shown")
            }
        }, applyPlacement: function (a, b) {
            var f, g, h, i, c = this.tip(), d = c[0].offsetWidth, e = c[0].offsetHeight;
            c.offset(a).addClass(b).addClass("in"), f = c[0].offsetWidth, g = c[0].offsetHeight, "top" == b && g != e && (a.top = a.top + e - g, i = !0), "bottom" == b || "top" == b ? (h = 0, a.left < 0 && (h = a.left * -2, a.left = 0, c.offset(a), f = c[0].offsetWidth, g = c[0].offsetHeight), this.replaceArrow(h - d + f, f, "left")) : this.replaceArrow(g - e, g, "top"), i && c.offset(a)
        }, replaceArrow: function (a, b, c) {
            this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
        }, setContent: function () {
            var a = this.tip(), b = this.getTitle();
            a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        }, hide: function () {
            function e() {
                var b = setTimeout(function () {
                    c.off(a.support.transition.end).detach()
                }, 500);
                c.one(a.support.transition.end, function () {
                    clearTimeout(b), c.detach()
                })
            }

            var c = this.tip(), d = a.Event("hide");
            if (this.$element.trigger(d), !d.isDefaultPrevented())return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? e() : c.detach(), this.$element.trigger("hidden"), this
        }, fixTitle: function () {
            var a = this.$element;
            (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
        }, hasContent: function () {
            return this.getTitle()
        }, getPosition: function () {
            var b = this.$element[0];
            return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                width: b.offsetWidth,
                height: b.offsetHeight
            }, this.$element.offset())
        }, getTitle: function () {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
        }, tip: function () {
            return this.$tip = this.$tip || a(this.options.template)
        }, arrow: function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        }, validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function () {
            this.enabled = !0
        }, disable: function () {
            this.enabled = !1
        }, toggleEnabled: function () {
            this.enabled = !this.enabled
        }, toggle: function (b) {
            var c = b ? a(b.currentTarget)[this.type](this._options).data(this.type) : this;
            c.tip().hasClass("in") ? c.hide() : c.show()
        }, destroy: function () {
            this.hide().$element.off("." + this.type).removeData(this.type)
        }
    };
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("tooltip"), f = "object" == typeof c && c;
            e || d.data("tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(window.jQuery);

$(document).ready(function () {
    App.init(), App.initScrollBar(), $(".logout").click(function (a) {
        var b = $("#spinwheel");
        b.show(), setTimeout(function () {
            b.button("reset")
        }, 0)
    }), (function ($) {
            $.fn.customAutocomplete = function () {
                this.autocomplete(
                    {
                        source: function (request, response) {
                            var searchTerm = request.term;
                            $.ajax({
                                dataType: "json",
                                type: 'Get',
                                url: '/searchHandler',
                                data: {term: searchTerm},
                                success: function (data) {
                                    response($.map(data, function (item) {
                                        return {
                                            label: item.split('\t')[0],
                                            value: item.split('\t')[1],
                                            desc: item.split('\t')[2],
                                            typeval: item.split('\t')[3]
                                        }
                                    }));
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    console.log(textStatus);
                                }
                            });
                        }, autoFocus: true, delay: 100, minLength: 1,
                        select: function (event, ui) {
                            event.preventDefault();
                            var typeval = ui.item.typeval;
                            $(this).val('Searching ...');
                            if (typeval == 1) {
                                window.location.href = '/token/' + ui.item.label;
                            }
                            else if (typeval == 2) {
                                window.location.href = '/token/' + ui.item.value;
                            }
                            else if (typeval == 3) {
                                window.location.href = '/address/' + ui.item.value;
                            }
                            else if (typeval == 4) {
                                window.location.href = '/address/' + ui.item.label;
                            }
                        }
                    }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    return $("<li>").append("<div>" + item.label + "<br><font size='1'>" + item.desc + "</font></div>").appendTo(ul);
                };
                ;
                return this;
            };
        })(jQuery);
    $("#txtSearchInput").val('');
    $("#txtSearchInput").customAutocomplete();
    $("#txtSearchInputMobile").val('');
    $("#txtSearchInputMobile").customAutocomplete();
}),

    window.onpageshow = function (a) {
        a.persisted && $("#spinwheel").hide()
    };