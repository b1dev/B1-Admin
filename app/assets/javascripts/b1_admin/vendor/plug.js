(jQuery, window, document);
! function(n) {
    "use strict";
    window.nifty = {
        container: n("#container"),
        contentContainer: n("#content-container"),
        navbar: n("#navbar"),
        mainNav: n("#mainnav-container"),
        aside: n("#aside-container"),
        footer: n("#footer"),
        scrollTop: n("#scroll-top"),
        window: n(window),
        body: n("body"),
        bodyHtml: n("body, html"),
        document: n(document),
        screenSize: "",
        isMobile: function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }(),
        randomInt: function(n, t) {
            return Math.floor(Math.random() * (t - n + 1) + n)
        },
        transition: function() {
            var n = document.body || document.documentElement,
                t = n.style,
                i = void 0 !== t.transition || void 0 !== t.WebkitTransition;
            return i
        }()
    }, nifty.window.on("load", function() {
        var t = n(".add-tooltip");
        t.length && t.tooltip();
        var i = n(".add-popover");
        i.length && i.popover();
        var e = n(".nano");
        e.length && e.nanoScroller({
            preventPageScrolling: !0
        }), n("#navbar-container .navbar-top-links").on("shown.bs.dropdown", ".dropdown", function() {
            n(this).find(".nano").nanoScroller({
                preventPageScrolling: !0
            })
        }), nifty.body.addClass("nifty-ready")
    })
}





(window.jQuery); /*! Bootstrap-select v1.6.2 (http://silviomoreto.github.io/bootstrap-select/) ** Copyright 2013-2014 bootstrap-select * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE) */
! function(a) {
    "use strict";

    function b(a, b) {
        return a.toUpperCase().indexOf(b.toUpperCase()) > -1
    }

    function c(b) {
        var c = [{
            re: /[\xC0-\xC6]/g,
            ch: "A"
        }, {
            re: /[\xE0-\xE6]/g,
            ch: "a"
        }, {
            re: /[\xC8-\xCB]/g,
            ch: "E"
        }, {
            re: /[\xE8-\xEB]/g,
            ch: "e"
        }, {
            re: /[\xCC-\xCF]/g,
            ch: "I"
        }, {
            re: /[\xEC-\xEF]/g,
            ch: "i"
        }, {
            re: /[\xD2-\xD6]/g,
            ch: "O"
        }, {
            re: /[\xF2-\xF6]/g,
            ch: "o"
        }, {
            re: /[\xD9-\xDC]/g,
            ch: "U"
        }, {
            re: /[\xF9-\xFC]/g,
            ch: "u"
        }, {
            re: /[\xC7-\xE7]/g,
            ch: "c"
        }, {
            re: /[\xD1]/g,
            ch: "N"
        }, {
            re: /[\xF1]/g,
            ch: "n"
        }];
        return a.each(c, function() {
            b = b.replace(this.re, this.ch)
        }), b
    }

    function d(b, c) {
        var d = arguments,
            f = b,
            b = d[0],
            c = d[1];
        [].shift.apply(d), "undefined" == typeof b && (b = f);
        var g, h = this.each(function() {
            var f = a(this);
            if (f.is("select")) {
                var h = f.data("selectpicker"),
                    i = "object" == typeof b && b;
                if (h) {
                    if (i)
                        for (var j in i) i.hasOwnProperty(j) && (h.options[j] = i[j])
                } else {
                    var k = a.extend({}, e.DEFAULTS, a.fn.selectpicker.defaults || {}, f.data(), i);
                    f.data("selectpicker", h = new e(this, k, c))
                }
                "string" == typeof b && (g = h[b] instanceof Function ? h[b].apply(h, d) : h.options[b])
            }
        });
        return "undefined" != typeof g ? g : h
    }
    a.expr[":"].icontains = function(c, d, e) {
        return b(a(c).text(), e[3])
    }, a.expr[":"].aicontains = function(c, d, e) {
        return b(a(c).data("normalizedText") || a(c).text(), e[3])
    };
    var e = function(b, c, d) {
        d && (d.stopPropagation(), d.preventDefault()), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title")), this.val = e.prototype.val, this.render = e.prototype.render, this.refresh = e.prototype.refresh, this.setStyle = e.prototype.setStyle, this.selectAll = e.prototype.selectAll, this.deselectAll = e.prototype.deselectAll, this.destroy = e.prototype.remove, this.remove = e.prototype.remove, this.show = e.prototype.show, this.hide = e.prototype.hide, this.init()
    };
    e.VERSION = "1.6.2", e.DEFAULTS = {
        noneSelectedText: "Nothing selected",
        noneResultsText: "No results match",
        countSelectedText: function(a) {
            return 1 == a ? "{0} item selected" : "{0} items selected"
        },
        maxOptionsText: function(a, b) {
            var c = [];
            return c[0] = 1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", c[1] = 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)", c
        },
        selectAllText: "Select All",
        deselectAllText: "Deselect All",
        multipleSeparator: ", ",
        style: "btn-default",
        size: "auto",
        title: null,
        selectedTextFormat: "values",
        width: !1,
        container: !1,
        hideDisabled: !1,
        showSubtext: !1,
        showIcon: !0,
        showContent: !0,
        dropupAuto: !0,
        header: !1,
        liveSearch: !1,
        actionsBox: !1,
        iconBase: "fa",
        tickIcon: "fa-check",
        maxOptions: !1,
        mobile: !1,
        selectOnTab: !1,
        dropdownAlignRight: !1,
        searchAccentInsensitive: !1
    }, e.prototype = {
        constructor: e,
        init: function() {
            var b = this,
                c = this.$element.attr("id");
            this.$element.hide(), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement), this.$menu = this.$newElement.find("> .dropdown-menu"), this.$button = this.$newElement.find("> button"), this.$searchbox = this.$newElement.find("input"), this.options.dropdownAlignRight && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function(a) {
                a.preventDefault(), b.$button.focus()
            })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.liHeight(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile()
        },
        createDropdown: function() {
            var b = this.multiple ? " show-tick" : "",
                c = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
                d = this.autofocus ? " autofocus" : "",
                e = this.$element.parents().hasClass("form-group-lg") ? " btn-lg" : this.$element.parents().hasClass("form-group-sm") ? " btn-sm" : "",
                f = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
                g = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : "",
                h = this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-block"><button class="actions-btn bs-select-all btn btn-sm btn-default">' + this.options.selectAllText + '</button><button class="actions-btn bs-deselect-all btn btn-sm btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
                i = '<div class="btn-group bootstrap-select' + b + c + '"><button type="button" class="btn dropdown-toggle selectpicker' + e + '" data-toggle="dropdown"' + d + '><span class="filter-option pull-left"></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open">' + f + g + h + '<ul class="dropdown-menu inner selectpicker" role="menu"></ul></div></div>';
            return a(i)
        },
        createView: function() {
            var a = this.createDropdown(),
                b = this.createLi();
            return a.find("ul").append(b), a
        },
        reloadLi: function() {
            this.destroyLi();
            var a = this.createLi();
            this.$menu.find("ul").append(a)
        },
        destroyLi: function() {
            this.$menu.find("li").remove()
        },
        createLi: function() {
            var b = this,
                d = [],
                e = 0,
                f = function(a, b, c) {
                    return "<li" + ("undefined" != typeof c ? ' class="' + c + '"' : "") + ("undefined" != typeof b | null === b ? ' data-original-index="' + b + '"' : "") + ">" + a + "</li>"
                },
                g = function(d, e, f, g) {
                    var h = c(a.trim(a("<div/>").html(d).text()).replace(/\s\s+/g, " "));
                    return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + ("undefined" != typeof f ? ' style="' + f + '"' : "") + ("undefined" != typeof g ? 'data-optgroup="' + g + '"' : "") + ' data-normalized-text="' + h + '">' + d + '<span class="' + b.options.iconBase + " " + b.options.tickIcon + ' check-mark"></span></a>'
                };
            return this.$element.find("option").each(function() {
                var c = a(this),
                    h = c.attr("class") || "",
                    i = c.attr("style"),
                    j = c.data("content") ? c.data("content") : c.html(),
                    k = "undefined" != typeof c.data("subtext") ? '<small class="muted text-muted">' + c.data("subtext") + "</small>" : "",
                    l = "undefined" != typeof c.data("icon") ? '<span class="' + b.options.iconBase + " " + c.data("icon") + '"></span> ' : "",
                    m = c.is(":disabled") || c.parent().is(":disabled"),
                    n = c[0].index;
                if ("" !== l && m && (l = "<span>" + l + "</span>"), c.data("content") || (j = l + '<span class="text">' + j + k + "</span>"), !b.options.hideDisabled || !m)
                    if (c.parent().is("optgroup") && c.data("divider") !== !0) {
                        if (0 === c.index()) {
                            e += 1;
                            var o = c.parent().attr("label"),
                                p = "undefined" != typeof c.parent().data("subtext") ? '<small class="muted text-muted">' + c.parent().data("subtext") + "</small>" : "",
                                q = c.parent().data("icon") ? '<span class="' + b.options.iconBase + " " + c.parent().data("icon") + '"></span> ' : "";
                            o = q + '<span class="text">' + o + p + "</span>", 0 !== n && d.length > 0 && d.push(f("", null, "divider")), d.push(f(o, null, "dropdown-header"))
                        }
                        d.push(f(g(j, "opt " + h, i, e), n))
                    } else d.push(c.data("divider") === !0 ? f("", n, "divider") : c.data("hidden") === !0 ? f(g(j, h, i), n, "hide is-hidden") : f(g(j, h, i), n))
            }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), a(d.join(""))
        },
        findLis: function() {
            return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
        },
        render: function(b) {
            var c = this;
            b !== !1 && this.$element.find("option").each(function(b) {
                c.setDisabled(b, a(this).is(":disabled") || a(this).parent().is(":disabled")), c.setSelected(b, a(this).is(":selected"))
            }), this.tabIndex();
            var d = this.options.hideDisabled ? ":not([disabled])" : "",
                e = this.$element.find("option:selected" + d).map(function() {
                    var b, d = a(this),
                        e = d.data("icon") && c.options.showIcon ? '<i class="' + c.options.iconBase + " " + d.data("icon") + '"></i> ' : "";
                    return b = c.options.showSubtext && d.attr("data-subtext") && !c.multiple ? ' <small class="muted text-muted">' + d.data("subtext") + "</small>" : "", d.data("content") && c.options.showContent ? d.data("content") : "undefined" != typeof d.attr("title") ? d.attr("title") : e + d.html() + b
                }).toArray(),
                f = this.multiple ? e.join(this.options.multipleSeparator) : e[0];
            if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
                var g = this.options.selectedTextFormat.split(">");
                if (g.length > 1 && e.length > g[1] || 1 == g.length && e.length >= 2) {
                    d = this.options.hideDisabled ? ", [disabled]" : "";
                    var h = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + d).length,
                        i = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, h) : this.options.countSelectedText;
                    f = i.replace("{0}", e.length.toString()).replace("{1}", h.toString())
                }
            }
            this.options.title = this.$element.attr("title"), "static" == this.options.selectedTextFormat && (f = this.options.title), f || (f = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", a.trim(a("<div/>").html(f).text()).replace(/\s\s+/g, " ")), this.$newElement.find(".filter-option").html(f)
        },
        setStyle: function(a, b) {
            this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|validate\[.*\]/gi, ""));
            var c = a ? a : this.options.style;
            "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
        },
        liHeight: function() {
            if (this.options.size !== !1) {
                var a = this.$menu.parent().clone().find("> .dropdown-toggle").prop("autofocus", !1).end().appendTo("body"),
                    b = a.addClass("open").find("> .dropdown-menu"),
                    c = b.find("li").not(".divider").not(".dropdown-header").filter(":visible").children("a").outerHeight(),
                    d = this.options.header ? b.find(".popover-title").outerHeight() : 0,
                    e = this.options.liveSearch ? b.find(".bs-searchbox").outerHeight() : 0,
                    f = this.options.actionsBox ? b.find(".bs-actionsbox").outerHeight() : 0;
                a.remove(), this.$newElement.data("liHeight", c).data("headerHeight", d).data("searchHeight", e).data("actionsHeight", f)
            }
        },
        setSize: function() {
            this.findLis();
            var b, c, d, e = this,
                f = this.$menu,
                g = f.find(".inner"),
                h = this.$newElement.outerHeight(),
                i = this.$newElement.data("liHeight"),
                j = this.$newElement.data("headerHeight"),
                k = this.$newElement.data("searchHeight"),
                l = this.$newElement.data("actionsHeight"),
                m = this.$lis.filter(".divider").outerHeight(!0),
                n = parseInt(f.css("padding-top")) + parseInt(f.css("padding-bottom")) + parseInt(f.css("border-top-width")) + parseInt(f.css("border-bottom-width")),
                o = this.options.hideDisabled ? ", .disabled" : "",
                p = a(window),
                q = n + parseInt(f.css("margin-top")) + parseInt(f.css("margin-bottom")) + 2,
                r = function() {
                    c = e.$newElement.offset().top - p.scrollTop(), d = p.height() - c - h
                };
            if (r(), this.options.header && f.css("padding-top", 0), "auto" == this.options.size) {
                var s = function() {
                    var a, h = e.$lis.not(".hide");
                    r(), b = d - q, e.options.dropupAuto && e.$newElement.toggleClass("dropup", c > d && b - q < f.height()), e.$newElement.hasClass("dropup") && (b = c - q), a = h.length + h.filter(".dropdown-header").length > 3 ? 3 * i + q - 2 : 0, f.css({
                        "max-height": b + "px",
                        overflow: "hidden",
                        "min-height": a + j + k + l + "px"
                    }), g.css({
                        "max-height": b - j - k - l - n + "px",
                        "overflow-y": "auto",
                        "min-height": Math.max(a - n, 0) + "px"
                    })
                };
                s(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", s), a(window).off("resize.getSize").on("resize.getSize", s), a(window).off("scroll.getSize").on("scroll.getSize", s)
            } else if (this.options.size && "auto" != this.options.size && f.find("li" + o).length > this.options.size) {
                var t = this.$lis.not(".divider" + o).find(" > *").slice(0, this.options.size).last().parent().index(),
                    u = this.$lis.slice(0, t + 1).filter(".divider").length;
                b = i * this.options.size + u * m + n, e.options.dropupAuto && this.$newElement.toggleClass("dropup", c > d && b < f.height()), f.css({
                    "max-height": b + j + k + l + "px",
                    overflow: "hidden"
                }), g.css({
                    "max-height": b - n + "px",
                    "overflow-y": "auto"
                })
            }
        },
        setWidth: function() {
            if ("auto" == this.options.width) {
                this.$menu.css("min-width", "0");
                var a = this.$newElement.clone().appendTo("body"),
                    b = a.find("> .dropdown-menu").css("width"),
                    c = a.css("width", "auto").find("> button").css("width");
                a.remove(), this.$newElement.css("width", Math.max(parseInt(b), parseInt(c)) + "px")
            } else "fit" == this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
            this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
        },
        selectPosition: function() {
            var b, c, d = this,
                e = "<div />",
                f = a(e),
                g = function(a) {
                    f.addClass(a.attr("class").replace(/form-control/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), c = a.hasClass("dropup") ? 0 : a[0].offsetHeight, f.css({
                        top: b.top + c,
                        left: b.left,
                        width: a[0].offsetWidth,
                        position: "absolute"
                    })
                };
            this.$newElement.on("click", function() {
                d.isDisabled() || (g(a(this)), f.appendTo(d.options.container), f.toggleClass("open", !a(this).hasClass("open")), f.append(d.$menu))
            }), a(window).resize(function() {
                g(d.$newElement)
            }), a(window).on("scroll", function() {
                g(d.$newElement)
            }), a("html").on("click", function(b) {
                a(b.target).closest(d.$newElement).length < 1 && f.removeClass("open")
            })
        },
        setSelected: function(a, b) {
            this.findLis(), this.$lis.filter('[data-original-index="' + a + '"]').toggleClass("selected", b)
        },
        setDisabled: function(a, b) {
            this.findLis(), b ? this.$lis.filter('[data-original-index="' + a + '"]').addClass("disabled").find("a").attr("href", "#").attr("tabindex", -1) : this.$lis.filter('[data-original-index="' + a + '"]').removeClass("disabled").find("a").removeAttr("href").attr("tabindex", 0)
        },
        isDisabled: function() {
            return this.$element.is(":disabled")
        },
        checkDisabled: function() {
            var a = this;
            this.isDisabled() ? this.$button.addClass("disabled").attr("tabindex", -1) : (this.$button.hasClass("disabled") && this.$button.removeClass("disabled"), -1 == this.$button.attr("tabindex") && (this.$element.data("tabindex") || this.$button.removeAttr("tabindex"))), this.$button.click(function() {
                return !a.isDisabled()
            })
        },
        tabIndex: function() {
            this.$element.is("[tabindex]") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex")))
        },
        clickListener: function() {
            var b = this;
            this.$newElement.on("touchstart.dropdown", ".dropdown-menu", function(a) {
                a.stopPropagation()
            }), this.$newElement.on("click", function() {
                b.setSize(), b.options.liveSearch || b.multiple || setTimeout(function() {
                    b.$menu.find(".selected a").focus()
                }, 10)
            }), this.$menu.on("click", "li a", function(c) {
                var d = a(this),
                    e = d.parent().data("originalIndex"),
                    f = b.$element.val(),
                    g = b.$element.prop("selectedIndex");
                if (b.multiple && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
                    var h = b.$element.find("option"),
                        i = h.eq(e),
                        j = i.prop("selected"),
                        k = i.parent("optgroup"),
                        l = b.options.maxOptions,
                        m = k.data("maxOptions") || !1;
                    if (b.multiple) {
                        if (i.prop("selected", !j), b.setSelected(e, !j), d.blur(), l !== !1 || m !== !1) {
                            var n = l < h.filter(":selected").length,
                                o = m < k.find("option:selected").length;
                            if (l && n || m && o)
                                if (l && 1 == l) h.prop("selected", !1), i.prop("selected", !0), b.$menu.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                                else if (m && 1 == m) {
                                k.find("option:selected").prop("selected", !1), i.prop("selected", !0);
                                var p = d.data("optgroup");
                                b.$menu.find(".selected").has('a[data-optgroup="' + p + '"]').removeClass("selected"), b.setSelected(e, !0)
                            } else {
                                var q = "function" == typeof b.options.maxOptionsText ? b.options.maxOptionsText(l, m) : b.options.maxOptionsText,
                                    r = q[0].replace("{n}", l),
                                    s = q[1].replace("{n}", m),
                                    t = a('<div class="notify"></div>');
                                q[2] && (r = r.replace("{var}", q[2][l > 1 ? 0 : 1]), s = s.replace("{var}", q[2][m > 1 ? 0 : 1])), i.prop("selected", !1), b.$menu.append(t), l && n && (t.append(a("<div>" + r + "</div>")), b.$element.trigger("maxReached.bs.select")), m && o && (t.append(a("<div>" + s + "</div>")), b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
                                    b.setSelected(e, !1)
                                }, 10), t.delay(750).fadeOut(300, function() {
                                    a(this).remove()
                                })
                            }
                        }
                    } else h.prop("selected", !1), i.prop("selected", !0), b.$menu.find(".selected").removeClass("selected"), b.setSelected(e, !0);
                    b.multiple ? b.options.liveSearch && b.$searchbox.focus() : b.$button.focus(), (f != b.$element.val() && b.multiple || g != b.$element.prop("selectedIndex") && !b.multiple) && b.$element.change()
                }
            }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(a) {
                a.target == this && (a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus())
            }), this.$menu.on("click", "li.divider, li.dropdown-header", function(a) {
                a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
            }), this.$menu.on("click", ".popover-title .close", function() {
                b.$button.focus()
            }), this.$searchbox.on("click", function(a) {
                a.stopPropagation()
            }), this.$menu.on("click", ".actions-btn", function(c) {
                b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).is(".bs-select-all") ? b.selectAll() : b.deselectAll(), b.$element.change()
            }), this.$element.change(function() {
                b.render(!1)
            })
        },
        liveSearchListener: function() {
            var b = this,
                d = a('<li class="no-results"></li>');
            this.$newElement.on("click.dropdown.data-api", function() {
                b.$menu.find(".active").removeClass("active"), b.$searchbox.val() && (b.$searchbox.val(""), b.$lis.not(".is-hidden").removeClass("hide"), d.parent().length && d.remove()), b.multiple || b.$menu.find(".selected").addClass("active"), setTimeout(function() {
                    b.$searchbox.focus()
                }, 10)
            }), this.$searchbox.on("input propertychange", function() {
                b.$searchbox.val() ? (b.options.searchAccentInsensitive ? b.$lis.not(".is-hidden").removeClass("hide").find("a").not(":aicontains(" + c(b.$searchbox.val()) + ")").parent().addClass("hide") : b.$lis.not(".is-hidden").removeClass("hide").find("a").not(":icontains(" + b.$searchbox.val() + ")").parent().addClass("hide"), b.$menu.find("li").filter(":visible:not(.no-results)").length ? d.parent().length && d.remove() : (d.parent().length && d.remove(), d.html(b.options.noneResultsText + ' "' + b.$searchbox.val() + '"').show(), b.$menu.find("li").last().after(d))) : (b.$lis.not(".is-hidden").removeClass("hide"), d.parent().length && d.remove()), b.$menu.find("li.active").removeClass("active"), b.$menu.find("li").filter(":visible:not(.divider)").eq(0).addClass("active").find("a").focus(), a(this).focus()
            })
        },
        val: function(a) {
            return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
        },
        selectAll: function() {
            this.findLis(), this.$lis.not(".divider").not(".disabled").not(".selected").filter(":visible").find("a").click()
        },
        deselectAll: function() {
            this.findLis(), this.$lis.not(".divider").not(".disabled").filter(".selected").filter(":visible").find("a").click()
        },
        keydown: function(b) {
            var d, e, f, g, h, i, j, k, l, m = a(this),
                n = m.is("input") ? m.parent().parent() : m.parent(),
                o = n.data("this"),
                p = {
                    32: " ",
                    48: "0",
                    49: "1",
                    50: "2",
                    51: "3",
                    52: "4",
                    53: "5",
                    54: "6",
                    55: "7",
                    56: "8",
                    57: "9",
                    59: ";",
                    65: "a",
                    66: "b",
                    67: "c",
                    68: "d",
                    69: "e",
                    70: "f",
                    71: "g",
                    72: "h",
                    73: "i",
                    74: "j",
                    75: "k",
                    76: "l",
                    77: "m",
                    78: "n",
                    79: "o",
                    80: "p",
                    81: "q",
                    82: "r",
                    83: "s",
                    84: "t",
                    85: "u",
                    86: "v",
                    87: "w",
                    88: "x",
                    89: "y",
                    90: "z",
                    96: "0",
                    97: "1",
                    98: "2",
                    99: "3",
                    100: "4",
                    101: "5",
                    102: "6",
                    103: "7",
                    104: "8",
                    105: "9"
                };
            if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a("[role=menu] li a", n), l = o.$menu.parent().hasClass("open"), !l && /([0-9]|[A-z])/.test(String.fromCharCode(b.keyCode)) && (o.options.container ? o.$newElement.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), o.$searchbox.focus()), o.options.liveSearch && (/(^9$|27)/.test(b.keyCode.toString(10)) && l && 0 === o.$menu.find(".active").length && (b.preventDefault(), o.$menu.parent().removeClass("open"), o.$button.focus()), d = a("[role=menu] li:not(.divider):not(.dropdown-header):visible", n), m.val() || /(38|40)/.test(b.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$newElement.find("li").filter(o.options.searchAccentInsensitive ? ":aicontains(" + c(p[b.keyCode]) + ")" : ":icontains(" + p[b.keyCode] + ")"))), d.length) {
                if (/(38|40)/.test(b.keyCode.toString(10))) e = d.index(d.filter(":focus")), g = d.parent(":not(.disabled):visible").first().index(), h = d.parent(":not(.disabled):visible").last().index(), f = d.eq(e).parent().nextAll(":not(.disabled):visible").eq(0).index(), i = d.eq(e).parent().prevAll(":not(.disabled):visible").eq(0).index(), j = d.eq(f).parent().prevAll(":not(.disabled):visible").eq(0).index(), o.options.liveSearch && (d.each(function(b) {
                    a(this).is(":not(.disabled)") && a(this).data("index", b)
                }), e = d.index(d.filter(".active")), g = d.filter(":not(.disabled):visible").first().data("index"), h = d.filter(":not(.disabled):visible").last().data("index"), f = d.eq(e).nextAll(":not(.disabled):visible").eq(0).data("index"), i = d.eq(e).prevAll(":not(.disabled):visible").eq(0).data("index"), j = d.eq(f).prevAll(":not(.disabled):visible").eq(0).data("index")), k = m.data("prevIndex"), 38 == b.keyCode && (o.options.liveSearch && (e -= 1), e != j && e > i && (e = i), g > e && (e = g), e == k && (e = h)), 40 == b.keyCode && (o.options.liveSearch && (e += 1), -1 == e && (e = 0), e != j && f > e && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (b.preventDefault(), m.is(".dropdown-toggle") || (d.removeClass("active"), d.eq(e).addClass("active").find("a").focus(), m.focus())) : d.eq(e).focus();
                else if (!m.is("input")) {
                    var q, r, s = [];
                    d.each(function() {
                        a(this).parent().is(":not(.disabled)") && a.trim(a(this).text().toLowerCase()).substring(0, 1) == p[b.keyCode] && s.push(a(this).parent().index())
                    }), q = a(document).data("keycount"), q++, a(document).data("keycount", q), r = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), r != p[b.keyCode] ? (q = 1, a(document).data("keycount", q)) : q >= s.length && (a(document).data("keycount", 0), q > s.length && (q = 1)), d.eq(s[q - 1]).focus()
                }(/(13|32)/.test(b.keyCode.toString(10)) || /(^9$)/.test(b.keyCode.toString(10)) && o.options.selectOnTab) && l && (/(32)/.test(b.keyCode.toString(10)) || b.preventDefault(), o.options.liveSearch ? /(32)/.test(b.keyCode.toString(10)) || (o.$menu.find(".active a").click(), m.focus()) : a(":focus").click(), a(document).data("keycount", 0)), (/(^9$|27)/.test(b.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(b.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.$button.focus())
            }
        },
        mobile: function() {
            this.$element.addClass("mobile-device").appendTo(this.$newElement), this.options.container && this.$menu.hide()
        },
        refresh: function() {
            this.$lis = null, this.reloadLi(), this.render(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
        },
        update: function() {
            this.reloadLi(), this.setWidth(), this.setStyle(), this.checkDisabled(), this.liHeight()
        },
        hide: function() {
            this.$newElement.hide()
        },
        show: function() {
            this.$newElement.show()
        },
        remove: function() {
            this.$newElement.remove(), this.$element.remove()
        }
    };
    var f = a.fn.selectpicker;
    a.fn.selectpicker = d, a.fn.selectpicker.Constructor = e, a.fn.selectpicker.noConflict = function() {
        return a.fn.selectpicker = f, this
    }, a(document).data("keycount", 0).on("keydown", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", e.prototype.keydown).on("focusin.modal", ".bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input", function(a) {
        a.stopPropagation()
    }), a(window).on("load.bs.select.data-api", function() {
        a(".selectpicker").each(function() {
            var b = a(this);
            d.call(b, b.data())
        })
        $( document ).ajaxStop(function() {
            console.log("wefwe")
            a(".selectpicker").each(function() {
                var b = a(this);
                d.call(b, b.data())
            })
        });
    })
}(jQuery);











(function() {
    function require(name) {
        var module = require.modules[name];
        if (!module) throw new Error('failed to require "' + name + '"');
        if (!("exports" in module) && typeof module.definition === "function") {
            module.client = module.component = true;
            module.definition.call(this, module.exports = {}, module);
            delete module.definition
        }
        return module.exports
    }
    require.loader = "component";
    require.helper = {};
    require.helper.semVerSort = function(a, b) {
        var aArray = a.version.split(".");
        var bArray = b.version.split(".");
        for (var i = 0; i < aArray.length; ++i) {
            var aInt = parseInt(aArray[i], 10);
            var bInt = parseInt(bArray[i], 10);
            if (aInt === bInt) {
                var aLex = aArray[i].substr(("" + aInt).length);
                var bLex = bArray[i].substr(("" + bInt).length);
                if (aLex === "" && bLex !== "") return 1;
                if (aLex !== "" && bLex === "") return -1;
                if (aLex !== "" && bLex !== "") return aLex > bLex ? 1 : -1;
                continue
            } else if (aInt > bInt) {
                return 1
            } else {
                return -1
            }
        }
        return 0
    };
    require.latest = function(name, returnPath) {
        function showError(name) {
            throw new Error('failed to find latest module of "' + name + '"')
        }
        var versionRegexp = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
        var remoteRegexp = /(.*)~(.*)/;
        if (!remoteRegexp.test(name)) showError(name);
        var moduleNames = Object.keys(require.modules);
        var semVerCandidates = [];
        var otherCandidates = [];
        for (var i = 0; i < moduleNames.length; i++) {
            var moduleName = moduleNames[i];
            if (new RegExp(name + "@").test(moduleName)) {
                var version = moduleName.substr(name.length + 1);
                var semVerMatch = versionRegexp.exec(moduleName);
                if (semVerMatch != null) {
                    semVerCandidates.push({
                        version: version,
                        name: moduleName
                    })
                } else {
                    otherCandidates.push({
                        version: version,
                        name: moduleName
                    })
                }
            }
        }
        if (semVerCandidates.concat(otherCandidates).length === 0) {
            showError(name)
        }
        if (semVerCandidates.length > 0) {
            var module = semVerCandidates.sort(require.helper.semVerSort).pop().name;
            if (returnPath === true) {
                return module
            }
            return require(module)
        }
        var module = otherCandidates.pop().name;
        if (returnPath === true) {
            return module
        }
        return require(module)
    };
    require.modules = {};
    require.register = function(name, definition) {
        require.modules[name] = {
            definition: definition
        }
    };
    require.define = function(name, exports) {
        require.modules[name] = {
            exports: exports
        }
    };
    require.register("abpetkov~transitionize@0.0.3", function(exports, module) {
        module.exports = Transitionize;

        function Transitionize(element, props) {
            if (!(this instanceof Transitionize)) return new Transitionize(element, props);
            this.element = element;
            this.props = props || {};
            this.init()
        }
        Transitionize.prototype.isSafari = function() {
            return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
        };
        Transitionize.prototype.init = function() {
            var transitions = [];
            for (var key in this.props) {
                transitions.push(key + " " + this.props[key])
            }
            this.element.style.transition = transitions.join(", ");
            if (this.isSafari()) this.element.style.webkitTransition = transitions.join(", ")
        }
    });
    require.register("ftlabs~fastclick@v0.6.11", function(exports, module) {
        function FastClick(layer) {
            "use strict";
            var oldOnClick, self = this;
            this.trackingClick = false;
            this.trackingClickStart = 0;
            this.targetElement = null;
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.lastTouchIdentifier = 0;
            this.touchBoundary = 10;
            this.layer = layer;
            if (!layer || !layer.nodeType) {
                throw new TypeError("Layer must be a document node")
            }
            this.onClick = function() {
                return FastClick.prototype.onClick.apply(self, arguments)
            };
            this.onMouse = function() {
                return FastClick.prototype.onMouse.apply(self, arguments)
            };
            this.onTouchStart = function() {
                return FastClick.prototype.onTouchStart.apply(self, arguments)
            };
            this.onTouchMove = function() {
                return FastClick.prototype.onTouchMove.apply(self, arguments)
            };
            this.onTouchEnd = function() {
                return FastClick.prototype.onTouchEnd.apply(self, arguments)
            };
            this.onTouchCancel = function() {
                return FastClick.prototype.onTouchCancel.apply(self, arguments)
            };
            if (FastClick.notNeeded(layer)) {
                return
            }
            if (this.deviceIsAndroid) {
                layer.addEventListener("mouseover", this.onMouse, true);
                layer.addEventListener("mousedown", this.onMouse, true);
                layer.addEventListener("mouseup", this.onMouse, true)
            }
            layer.addEventListener("click", this.onClick, true);
            layer.addEventListener("touchstart", this.onTouchStart, false);
            layer.addEventListener("touchmove", this.onTouchMove, false);
            layer.addEventListener("touchend", this.onTouchEnd, false);
            layer.addEventListener("touchcancel", this.onTouchCancel, false);
            if (!Event.prototype.stopImmediatePropagation) {
                layer.removeEventListener = function(type, callback, capture) {
                    var rmv = Node.prototype.removeEventListener;
                    if (type === "click") {
                        rmv.call(layer, type, callback.hijacked || callback, capture)
                    } else {
                        rmv.call(layer, type, callback, capture)
                    }
                };
                layer.addEventListener = function(type, callback, capture) {
                    var adv = Node.prototype.addEventListener;
                    if (type === "click") {
                        adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                            if (!event.propagationStopped) {
                                callback(event)
                            }
                        }), capture)
                    } else {
                        adv.call(layer, type, callback, capture)
                    }
                }
            }
            if (typeof layer.onclick === "function") {
                oldOnClick = layer.onclick;
                layer.addEventListener("click", function(event) {
                    oldOnClick(event)
                }, false);
                layer.onclick = null
            }
        }
        FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0;
        FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
        FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);
        FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
        FastClick.prototype.needsClick = function(target) {
            "use strict";
            switch (target.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (target.disabled) {
                        return true
                    }
                    break;
                case "input":
                    if (this.deviceIsIOS && target.type === "file" || target.disabled) {
                        return true
                    }
                    break;
                case "label":
                case "video":
                    return true
            }
            return /\bneedsclick\b/.test(target.className)
        };
        FastClick.prototype.needsFocus = function(target) {
            "use strict";
            switch (target.nodeName.toLowerCase()) {
                case "textarea":
                    return true;
                case "select":
                    return !this.deviceIsAndroid;
                case "input":
                    switch (target.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return false
                    }
                    return !target.disabled && !target.readOnly;
                default:
                    return /\bneedsfocus\b/.test(target.className)
            }
        };
        FastClick.prototype.sendClick = function(targetElement, event) {
            "use strict";
            var clickEvent, touch;
            if (document.activeElement && document.activeElement !== targetElement) {
                document.activeElement.blur()
            }
            touch = event.changedTouches[0];
            clickEvent = document.createEvent("MouseEvents");
            clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
            clickEvent.forwardedTouchEvent = true;
            targetElement.dispatchEvent(clickEvent)
        };
        FastClick.prototype.determineEventType = function(targetElement) {
            "use strict";
            if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === "select") {
                return "mousedown"
            }
            return "click"
        };
        FastClick.prototype.focus = function(targetElement) {
            "use strict";
            var length;
            if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf("date") !== 0 && targetElement.type !== "time") {
                length = targetElement.value.length;
                targetElement.setSelectionRange(length, length)
            } else {
                targetElement.focus()
            }
        };
        FastClick.prototype.updateScrollParent = function(targetElement) {
            "use strict";
            var scrollParent, parentElement;
            scrollParent = targetElement.fastClickScrollParent;
            if (!scrollParent || !scrollParent.contains(targetElement)) {
                parentElement = targetElement;
                do {
                    if (parentElement.scrollHeight > parentElement.offsetHeight) {
                        scrollParent = parentElement;
                        targetElement.fastClickScrollParent = parentElement;
                        break
                    }
                    parentElement = parentElement.parentElement
                } while (parentElement)
            }
            if (scrollParent) {
                scrollParent.fastClickLastScrollTop = scrollParent.scrollTop
            }
        };
        FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
            "use strict";
            if (eventTarget.nodeType === Node.TEXT_NODE) {
                return eventTarget.parentNode
            }
            return eventTarget
        };
        FastClick.prototype.onTouchStart = function(event) {
            "use strict";
            var targetElement, touch, selection;
            if (event.targetTouches.length > 1) {
                return true
            }
            targetElement = this.getTargetElementFromEventTarget(event.target);
            touch = event.targetTouches[0];
            if (this.deviceIsIOS) {
                selection = window.getSelection();
                if (selection.rangeCount && !selection.isCollapsed) {
                    return true
                }
                if (!this.deviceIsIOS4) {
                    if (touch.identifier === this.lastTouchIdentifier) {
                        event.preventDefault();
                        return false
                    }
                    this.lastTouchIdentifier = touch.identifier;
                    this.updateScrollParent(targetElement)
                }
            }
            this.trackingClick = true;
            this.trackingClickStart = event.timeStamp;
            this.targetElement = targetElement;
            this.touchStartX = touch.pageX;
            this.touchStartY = touch.pageY;
            if (event.timeStamp - this.lastClickTime < 200) {
                event.preventDefault()
            }
            return true
        };
        FastClick.prototype.touchHasMoved = function(event) {
            "use strict";
            var touch = event.changedTouches[0],
                boundary = this.touchBoundary;
            if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
                return true
            }
            return false
        };
        FastClick.prototype.onTouchMove = function(event) {
            "use strict";
            if (!this.trackingClick) {
                return true
            }
            if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
                this.trackingClick = false;
                this.targetElement = null
            }
            return true
        };
        FastClick.prototype.findControl = function(labelElement) {
            "use strict";
            if (labelElement.control !== undefined) {
                return labelElement.control
            }
            if (labelElement.htmlFor) {
                return document.getElementById(labelElement.htmlFor)
            }
            return labelElement.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        };
        FastClick.prototype.onTouchEnd = function(event) {
            "use strict";
            var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
            if (!this.trackingClick) {
                return true
            }
            if (event.timeStamp - this.lastClickTime < 200) {
                this.cancelNextClick = true;
                return true
            }
            this.cancelNextClick = false;
            this.lastClickTime = event.timeStamp;
            trackingClickStart = this.trackingClickStart;
            this.trackingClick = false;
            this.trackingClickStart = 0;
            if (this.deviceIsIOSWithBadTarget) {
                touch = event.changedTouches[0];
                targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
                targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent
            }
            targetTagName = targetElement.tagName.toLowerCase();
            if (targetTagName === "label") {
                forElement = this.findControl(targetElement);
                if (forElement) {
                    this.focus(targetElement);
                    if (this.deviceIsAndroid) {
                        return false
                    }
                    targetElement = forElement
                }
            } else if (this.needsFocus(targetElement)) {
                if (event.timeStamp - trackingClickStart > 100 || this.deviceIsIOS && window.top !== window && targetTagName === "input") {
                    this.targetElement = null;
                    return false
                }
                this.focus(targetElement);
                if (!this.deviceIsIOS4 || targetTagName !== "select") {
                    this.targetElement = null;
                    event.preventDefault()
                }
                return false
            }
            if (this.deviceIsIOS && !this.deviceIsIOS4) {
                scrollParent = targetElement.fastClickScrollParent;
                if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                    return true
                }
            }
            if (!this.needsClick(targetElement)) {
                event.preventDefault();
                this.sendClick(targetElement, event)
            }
            return false
        };
        FastClick.prototype.onTouchCancel = function() {
            "use strict";
            this.trackingClick = false;
            this.targetElement = null
        };
        FastClick.prototype.onMouse = function(event) {
            "use strict";
            if (!this.targetElement) {
                return true
            }
            if (event.forwardedTouchEvent) {
                return true
            }
            if (!event.cancelable) {
                return true
            }
            if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
                if (event.stopImmediatePropagation) {
                    event.stopImmediatePropagation()
                } else {
                    event.propagationStopped = true
                }
                event.stopPropagation();
                event.preventDefault();
                return false
            }
            return true
        };
        FastClick.prototype.onClick = function(event) {
            "use strict";
            var permitted;
            if (this.trackingClick) {
                this.targetElement = null;
                this.trackingClick = false;
                return true
            }
            if (event.target.type === "submit" && event.detail === 0) {
                return true
            }
            permitted = this.onMouse(event);
            if (!permitted) {
                this.targetElement = null
            }
            return permitted
        };
        FastClick.prototype.destroy = function() {
            "use strict";
            var layer = this.layer;
            if (this.deviceIsAndroid) {
                layer.removeEventListener("mouseover", this.onMouse, true);
                layer.removeEventListener("mousedown", this.onMouse, true);
                layer.removeEventListener("mouseup", this.onMouse, true)
            }
            layer.removeEventListener("click", this.onClick, true);
            layer.removeEventListener("touchstart", this.onTouchStart, false);
            layer.removeEventListener("touchmove", this.onTouchMove, false);
            layer.removeEventListener("touchend", this.onTouchEnd, false);
            layer.removeEventListener("touchcancel", this.onTouchCancel, false)
        };
        FastClick.notNeeded = function(layer) {
            "use strict";
            var metaViewport;
            var chromeVersion;
            if (typeof window.ontouchstart === "undefined") {
                return true
            }
            chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
            if (chromeVersion) {
                if (FastClick.prototype.deviceIsAndroid) {
                    metaViewport = document.querySelector("meta[name=viewport]");
                    if (metaViewport) {
                        if (metaViewport.content.indexOf("user-scalable=no") !== -1) {
                            return true
                        }
                        if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
                            return true
                        }
                    }
                } else {
                    return true
                }
            }
            if (layer.style.msTouchAction === "none") {
                return true
            }
            return false
        };
        FastClick.attach = function(layer) {
            "use strict";
            return new FastClick(layer)
        };
        if (typeof define !== "undefined" && define.amd) {
            define(function() {
                "use strict";
                return FastClick
            })
        } else if (typeof module !== "undefined" && module.exports) {
            module.exports = FastClick.attach;
            module.exports.FastClick = FastClick
        } else {
            window.FastClick = FastClick
        }
    });
    require.register("component~indexof@0.0.3", function(exports, module) {
        module.exports = function(arr, obj) {
            if (arr.indexOf) return arr.indexOf(obj);
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i] === obj) return i
            }
            return -1
        }
    });
    require.register("component~classes@1.2.1", function(exports, module) {
        var index = require("component~indexof@0.0.3");
        var re = /\s+/;
        var toString = Object.prototype.toString;
        module.exports = function(el) {
            return new ClassList(el)
        };

        function ClassList(el) {
            if (!el) throw new Error("A DOM element reference is required");
            this.el = el;
            this.list = el.classList
        }
        ClassList.prototype.add = function(name) {
            if (this.list) {
                this.list.add(name);
                return this
            }
            var arr = this.array();
            var i = index(arr, name);
            if (!~i) arr.push(name);
            this.el.className = arr.join(" ");
            return this
        };
        ClassList.prototype.remove = function(name) {
            if ("[object RegExp]" == toString.call(name)) {
                return this.removeMatching(name)
            }
            if (this.list) {
                this.list.remove(name);
                return this
            }
            var arr = this.array();
            var i = index(arr, name);
            if (~i) arr.splice(i, 1);
            this.el.className = arr.join(" ");
            return this
        };
        ClassList.prototype.removeMatching = function(re) {
            var arr = this.array();
            for (var i = 0; i < arr.length; i++) {
                if (re.test(arr[i])) {
                    this.remove(arr[i])
                }
            }
            return this
        };
        ClassList.prototype.toggle = function(name, force) {
            if (this.list) {
                if ("undefined" !== typeof force) {
                    if (force !== this.list.toggle(name, force)) {
                        this.list.toggle(name)
                    }
                } else {
                    this.list.toggle(name)
                }
                return this
            }
            if ("undefined" !== typeof force) {
                if (!force) {
                    this.remove(name)
                } else {
                    this.add(name)
                }
            } else {
                if (this.has(name)) {
                    this.remove(name)
                } else {
                    this.add(name)
                }
            }
            return this
        };
        ClassList.prototype.array = function() {
            var str = this.el.className.replace(/^\s+|\s+$/g, "");
            var arr = str.split(re);
            if ("" === arr[0]) arr.shift();
            return arr
        };
        ClassList.prototype.has = ClassList.prototype.contains = function(name) {
            return this.list ? this.list.contains(name) : !!~index(this.array(), name)
        }
    });
    require.register("switchery", function(exports, module) {
        var transitionize = require("abpetkov~transitionize@0.0.3"),
            fastclick = require("ftlabs~fastclick@v0.6.11"),
            classes = require("component~classes@1.2.1");
        module.exports = Switchery;
        var defaults = {
            color: "#64bd63",
            secondaryColor: "#dfdfdf",
            jackColor: "#fff",
            className: "switchery",
            disabled: false,
            disabledOpacity: .5,
            speed: "0.4s",
            size: "default"
        };

        function Switchery(element, options) {
            if (!(this instanceof Switchery)) return new Switchery(element, options);
            this.element = element;
            this.options = options || {};
            for (var i in defaults) {
                if (this.options[i] == null) {
                    this.options[i] = defaults[i]
                }
            }
            if (this.element != null && this.element.type == "checkbox") this.init()
        }
        Switchery.prototype.hide = function() {
            this.element.style.display = "none"
        };
        Switchery.prototype.show = function() {
            var switcher = this.create();
            this.insertAfter(this.element, switcher)
        };
        Switchery.prototype.create = function() {
            this.switcher = document.createElement("span");
            this.jack = document.createElement("small");
            this.switcher.appendChild(this.jack);
            this.switcher.className = this.options.className;
            return this.switcher
        };
        Switchery.prototype.insertAfter = function(reference, target) {
            reference.parentNode.insertBefore(target, reference.nextSibling)
        };
        Switchery.prototype.isChecked = function() {
            return this.element.checked
        };
        Switchery.prototype.isDisabled = function() {
            return this.options.disabled || this.element.disabled || this.element.readOnly
        };
        Switchery.prototype.setPosition = function(clicked) {
            var checked = this.isChecked(),
                switcher = this.switcher,
                jack = this.jack;
            if (clicked && checked) checked = false;
            else if (clicked && !checked) checked = true;
            if (checked === true) {
                this.element.checked = true;
                if (window.getComputedStyle) jack.style.left = parseInt(window.getComputedStyle(switcher).width) - parseInt(window.getComputedStyle(jack).width) + "px";
                else jack.style.left = parseInt(switcher.currentStyle["width"]) - parseInt(jack.currentStyle["width"]) + "px"; if (this.options.color) this.colorize();
                this.setSpeed()
            } else {
                jack.style.left = 0;
                this.element.checked = false;
                this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor;
                this.switcher.style.borderColor = this.options.secondaryColor;
                this.switcher.style.backgroundColor = this.options.secondaryColor !== defaults.secondaryColor ? this.options.secondaryColor : "#fff";
                this.jack.style.backgroundColor = this.options.jackColor;
                this.setSpeed()
            }
        };
        Switchery.prototype.setSpeed = function() {
            var switcherProp = {},
                jackProp = {
                    left: this.options.speed.replace(/[a-z]/, "") / 2 + "s"
                };
            if (this.isChecked()) {
                switcherProp = {
                    border: this.options.speed,
                    "box-shadow": this.options.speed,
                    "background-color": this.options.speed.replace(/[a-z]/, "") * 3 + "s"
                }
            } else {
                switcherProp = {
                    border: this.options.speed,
                    "box-shadow": this.options.speed
                }
            }
            transitionize(this.switcher, switcherProp);
            transitionize(this.jack, jackProp)
        };
        Switchery.prototype.setSize = function() {
            var small = "switchery-small",
                normal = "switchery-default",
                large = "switchery-large";
            switch (this.options.size) {
                case "small":
                    classes(this.switcher).add(small);
                    break;
                case "large":
                    classes(this.switcher).add(large);
                    break;
                default:
                    classes(this.switcher).add(normal);
                    break
            }
        };
        Switchery.prototype.colorize = function() {
            var switcherHeight = this.switcher.offsetHeight / 2;
            this.switcher.style.backgroundColor = this.options.color;
            this.switcher.style.borderColor = this.options.color;
            this.switcher.style.boxShadow = "inset 0 0 0 " + switcherHeight + "px " + this.options.color;
            this.jack.style.backgroundColor = this.options.jackColor
        };
        Switchery.prototype.handleOnchange = function(state) {
            if (document.dispatchEvent) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent("change", true, true);
                this.element.dispatchEvent(event)
            } else {
                this.element.fireEvent("onchange")
            }
        };
        Switchery.prototype.handleChange = function() {
            var self = this,
                el = this.element;
            if (el.addEventListener) {
                el.addEventListener("change", function() {
                    self.setPosition()
                })
            } else {
                el.attachEvent("onchange", function() {
                    self.setPosition()
                })
            }
        };
        Switchery.prototype.handleClick = function() {
            var self = this,
                switcher = this.switcher,
                parent = self.element.parentNode.tagName.toLowerCase(),
                labelParent = parent === "label" ? false : true;
            if (this.isDisabled() === false) {
                fastclick(switcher);
                if (switcher.addEventListener) {
                    switcher.addEventListener("click", function(e) {
                        self.setPosition(labelParent);
                        self.handleOnchange(self.element.checked)
                    })
                } else {
                    switcher.attachEvent("onclick", function() {
                        self.setPosition(labelParent);
                        self.handleOnchange(self.element.checked)
                    })
                }
            } else {
                this.element.disabled = true;
                this.switcher.style.opacity = this.options.disabledOpacity
            }
        };
        Switchery.prototype.markAsSwitched = function() {
            this.element.setAttribute("data-switchery", true)
        };
        Switchery.prototype.markedAsSwitched = function() {
            return this.element.getAttribute("data-switchery")
        };
        Switchery.prototype.init = function() {
            this.hide();
            this.show();
            this.setSize();
            this.setPosition();
            this.markAsSwitched();
            this.handleChange();
            this.handleClick()
        }
    });
    if (typeof exports == "object") {
        module.exports = require("switchery")
    } else if (typeof define == "function" && define.amd) {
        define("Switchery", [], function() {
            return require("switchery")
        })
    } else {
        (this || window)["Switchery"] = require("switchery")
    }
})(); /*! nanoScrollerJS - v0.8.4 - (c) 2014 James Florentino; Licensed MIT */


! function(a, b, c) {
    "use strict";
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    z = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function() {
        var a, b, c, d, e, f;
        for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)
            if (c = d[a], b = d[a] + "ransform", b in F) return d[a].substr(0, d[a].length - 1);
        return !1
    }(), G = function(a) {
        return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
    }, E = G("transform"), B = E !== !1, A = function() {
        var a, b, d;
        return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
    }, C = function() {
        var a, c, d;
        return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
    }, q = function() {
        function j(d, f) {
            this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + f.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }
        return j.prototype.preventScrolling = function(a, b) {
            if (this.isActive)
                if (a.type === f)(b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault();
                else if (a.type === p) {
                if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
                (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
            }
        }, j.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }), this.iOSNativeScrolling = !0, this.isActive = !0
        }, j.prototype.updateScrollValues = function() {
            var a, b;
            a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: b
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, j.prototype.setOnScrollStyles = function() {
            var a;
            B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {
                top: this.sliderTop
            }, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function(b) {
                return function() {
                    return b.scrollRAF = null, b.slider.css(a)
                }
            }(this))) : this.slider.css(a)
        }, j.prototype.createEvents = function() {
            this.events = {
                down: function(a) {
                    return function(b) {
                        return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
                    }
                }(this),
                drag: function(a) {
                    return function(b) {
                        return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                    }
                }(this),
                up: function(a) {
                    return function() {
                        return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
                    }
                }(this),
                resize: function(a) {
                    return function() {
                        a.reset()
                    }
                }(this),
                panedown: function(a) {
                    return function(b) {
                        return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                    }
                }(this),
                scroll: function(a) {
                    return function(b) {
                        a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                    }
                }(this),
                wheel: function(a) {
                    return function(b) {
                        var c;
                        if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                    }
                }(this),
                enter: function(a) {
                    return function(b) {
                        var c;
                        if (a.isBeingDragged) return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
                    }
                }(this)
            }
        }, j.prototype.addEvents = function() {
            var a;
            this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.removeEvents = function() {
            var a;
            a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.generate = function() {
            var a, c, d, f, g, h, i;
            return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
                right: -14,
                paddingRight: +d + 14
            }) : e && (c = {
                right: -e
            }, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
        }, j.prototype.restore = function() {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, j.prototype.reset = function() {
            var a, b, c, f, g, h, i, j, k, l, m, n;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({
                height: this.$content.height()
            }), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * j), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                right: "",
                marginRight: m
            })), this)
        }, j.prototype.scroll = function() {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        }, j.prototype.scrollBottom = function(a) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTop = function(a) {
            return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTo = function(a) {
            return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
        }, j.prototype.stop = function() {
            return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, j.prototype.destroy = function() {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                right: ""
            })), this
        }, j.prototype.flash = function() {
            return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(a) {
                return function() {
                    a.pane.removeClass("flashed")
                }
            }(this), this.options.flashDelay), this) : void 0
        }, j
    }(), a.fn.nanoScroller = function(b) {
        return this.each(function() {
            var c, d;
            if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
                if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
                if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
                if (b.scrollTo) return d.scrollTo(b.scrollTo);
                if ("bottom" === b.scroll) return d.scrollBottom(0);
                if ("top" === b.scroll) return d.scrollTop(0);
                if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
                if (b.stop) return d.stop();
                if (b.destroy) return d.destroy();
                if (b.flash) return d.flash()
            }
            return d.reset()
        })
    }, a.fn.nanoScroller.Constructor = q
}(jQuery, window, document);










/*! dropzone.js */
! function() {
    function a(b) {
        var c = a.modules[b];
        if (!c) throw new Error('failed to require "' + b + '"');
        return "exports" in c || "function" != typeof c.definition || (c.client = c.component = !0, c.definition.call(this, c.exports = {}, c), delete c.definition), c.exports
    }
    a.modules = {}, a.register = function(b, c) {
        a.modules[b] = {
            definition: c
        }
    }, a.define = function(b, c) {
        a.modules[b] = {
            exports: c
        }
    }, a.register("component~emitter@1.1.2", function(a, b) {
        function c(a) {
            return a ? d(a) : void 0
        }

        function d(a) {
            for (var b in c.prototype) a[b] = c.prototype[b];
            return a
        }
        b.exports = c, c.prototype.on = c.prototype.addEventListener = function(a, b) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[a] = this._callbacks[a] || []).push(b), this
        }, c.prototype.once = function(a, b) {
            function c() {
                d.off(a, c), b.apply(this, arguments)
            }
            var d = this;
            return this._callbacks = this._callbacks || {}, c.fn = b, this.on(a, c), this
        }, c.prototype.off = c.prototype.removeListener = c.prototype.removeAllListeners = c.prototype.removeEventListener = function(a, b) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var c = this._callbacks[a];
            if (!c) return this;
            if (1 == arguments.length) return delete this._callbacks[a], this;
            for (var d, e = 0; e < c.length; e++)
                if (d = c[e], d === b || d.fn === b) {
                    c.splice(e, 1);
                    break
                }
            return this
        }, c.prototype.emit = function(a) {
            this._callbacks = this._callbacks || {};
            var b = [].slice.call(arguments, 1),
                c = this._callbacks[a];
            if (c) {
                c = c.slice(0);
                for (var d = 0, e = c.length; e > d; ++d) c[d].apply(this, b)
            }
            return this
        }, c.prototype.listeners = function(a) {
            return this._callbacks = this._callbacks || {}, this._callbacks[a] || []
        }, c.prototype.hasListeners = function(a) {
            return !!this.listeners(a).length
        }
    }), a.register("dropzone", function(b, c) {
        c.exports = a("dropzone/lib/dropzone.js")
    }), a.register("dropzone/lib/dropzone.js", function(b, c) {
        (function() {
            var b, d, e, f, g, h, i, j, k = {}.hasOwnProperty,
                l = function(a, b) {
                    function c() {
                        this.constructor = a
                    }
                    for (var d in b) k.call(b, d) && (a[d] = b[d]);
                    return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                },
                m = [].slice;
            d = "undefined" != typeof Emitter && null !== Emitter ? Emitter : a("component~emitter@1.1.2"), i = function() {}, b = function(a) {
                function b(a, d) {
                    var e, f, g;
                    if (this.element = a, this.version = b.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), !this.element || null == this.element.nodeType) throw new Error("Invalid dropzone element.");
                    if (this.element.dropzone) throw new Error("Dropzone already attached.");
                    if (b.instances.push(this), this.element.dropzone = this, e = null != (g = b.optionsForElement(this.element)) ? g : {}, this.options = c({}, this.defaultOptions, e, null != d ? d : {}), this.options.forceFallback || !b.isBrowserSupported()) return this.options.fallback.call(this);
                    if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), !this.options.url) throw new Error("No URL provided.");
                    if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
                    this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes), this.options.method = this.options.method.toUpperCase(), (f = this.getExistingFallback()) && f.parentNode && f.parentNode.removeChild(f), this.options.previewsContainer !== !1 && (this.previewsContainer = this.options.previewsContainer ? b.getElement(this.options.previewsContainer, "previewsContainer") : this.element), this.options.clickable && (this.clickableElements = this.options.clickable === !0 ? [this.element] : b.getElements(this.options.clickable, "clickable")), this.init()
                }
                var c;
                return l(b, a), b.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached"], b.prototype.defaultOptions = {
                    url: null,
                    method: "post",
                    withCredentials: !1,
                    parallelUploads: 2,
                    uploadMultiple: !1,
                    maxFilesize: 256,
                    paramName: "file",
                    createImageThumbnails: !0,
                    maxThumbnailFilesize: 10,
                    thumbnailWidth: 100,
                    thumbnailHeight: 100,
                    maxFiles: null,
                    params: {},
                    clickable: ".fileinput",
                    ignoreHiddenFiles: !0,
                    acceptedFiles: null,
                    acceptedMimeTypes: null,
                    autoProcessQueue: !0,
                    autoQueue: !0,
                    addRemoveLinks: !1,
                    previewsContainer: null,
                    dictDefaultMessage: "Drop files here to upload",
                    dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
                    dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                    dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
                    dictInvalidFileType: "You can't upload files of this type.",
                    dictResponseError: "Server responded with {{statusCode}} code.",
                    dictCancelUpload: "Cancel upload",
                    dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
                    dictRemoveFile: "Remove file",
                    dictRemoveFileConfirmation: null,
                    dictMaxFilesExceeded: "You can not upload any more files.",
                    accept: function(a, b) {
                        return b()
                    },
                    init: function() {
                        return i
                    },
                    forceFallback: !1,
                    fallback: function() {
                        var a, c, d, e, f, g;
                        for (this.element.className = "" + this.element.className + " dz-browser-not-supported", g = this.element.getElementsByTagName("div"), e = 0, f = g.length; f > e; e++) a = g[e], /(^| )dz-message($| )/.test(a.className) && (c = a, a.className = "dz-message");
                        return c || (c = b.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(c)), d = c.getElementsByTagName("span")[0], d && (d.textContent = this.options.dictFallbackMessage), this.element.appendChild(this.getFallbackForm())
                    },
                    resize: function(a) {
                        var b, c, d;
                        return b = {
                            srcX: 0,
                            srcY: 0,
                            srcWidth: a.width,
                            srcHeight: a.height
                        }, c = a.width / a.height, b.optWidth = this.options.thumbnailWidth, b.optHeight = this.options.thumbnailHeight, null == b.optWidth && null == b.optHeight ? (b.optWidth = b.srcWidth, b.optHeight = b.srcHeight) : null == b.optWidth ? b.optWidth = c * b.optHeight : null == b.optHeight && (b.optHeight = 1 / c * b.optWidth), d = b.optWidth / b.optHeight, a.height < b.optHeight || a.width < b.optWidth ? (b.trgHeight = b.srcHeight, b.trgWidth = b.srcWidth) : c > d ? (b.srcHeight = a.height, b.srcWidth = b.srcHeight * d) : (b.srcWidth = a.width, b.srcHeight = b.srcWidth / d), b.srcX = (a.width - b.srcWidth) / 2, b.srcY = (a.height - b.srcHeight) / 2, b
                    },
                    drop: function() {
                        return this.element.classList.remove("dz-drag-hover")
                    },
                    dragstart: i,
                    dragend: function() {
                        return this.element.classList.remove("dz-drag-hover")
                    },
                    dragenter: function() {
                        return this.element.classList.add("dz-drag-hover")
                    },
                    dragover: function() {
                        return this.element.classList.add("dz-drag-hover")
                    },
                    dragleave: function() {
                        return this.element.classList.remove("dz-drag-hover")
                    },
                    paste: i,
                    reset: function() {
                        return this.element.classList.remove("dz-started")
                    },
                    addedfile: function(a) {
                        var c, d, e, f, g, h, i, j, k, l, m, n, o;
                        if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                            for (a.previewElement = b.createElement(this.options.previewTemplate.trim()), a.previewTemplate = a.previewElement, this.previewsContainer.appendChild(a.previewElement), l = a.previewElement.querySelectorAll("[data-dz-name]"), f = 0, i = l.length; i > f; f++) c = l[f], c.textContent = a.name;
                            for (m = a.previewElement.querySelectorAll("[data-dz-size]"), g = 0, j = m.length; j > g; g++) c = m[g], c.innerHTML = this.filesize(a.size);
                            for (this.options.addRemoveLinks && (a._removeLink = b.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), a.previewElement.appendChild(a._removeLink)), d = function(c) {
                                return function(d) {
                                    return d.preventDefault(), d.stopPropagation(), a.status === b.UPLOADING ? b.confirm(c.options.dictCancelUploadConfirmation, function() {
                                        return c.removeFile(a)
                                    }) : c.options.dictRemoveFileConfirmation ? b.confirm(c.options.dictRemoveFileConfirmation, function() {
                                        return c.removeFile(a)
                                    }) : c.removeFile(a)
                                }
                            }(this), n = a.previewElement.querySelectorAll("[data-dz-remove]"), o = [], h = 0, k = n.length; k > h; h++) e = n[h], o.push(e.addEventListener("click", d));
                            return o
                        }
                    },
                    removedfile: function(a) {
                        var b;
                        return a.previewElement && null != (b = a.previewElement) && b.parentNode.removeChild(a.previewElement), this._updateMaxFilesReachedClass()
                    },
                    thumbnail: function(a, b) {
                        var c, d, e, f, g;
                        if (a.previewElement) {
                            for (a.previewElement.classList.remove("dz-file-preview"), a.previewElement.classList.add("dz-image-preview"), f = a.previewElement.querySelectorAll("[data-dz-thumbnail]"), g = [], d = 0, e = f.length; e > d; d++) c = f[d], c.alt = a.name, g.push(c.src = b);
                            return g
                        }
                    },
                    error: function(a, b) {
                        var c, d, e, f, g;
                        if (a.previewElement) {
                            for (a.previewElement.classList.add("dz-error"), "String" != typeof b && b.error && (b = b.error), f = a.previewElement.querySelectorAll("[data-dz-errormessage]"), g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.textContent = b);
                            return g
                        }
                    },
                    errormultiple: i,
                    processing: function(a) {
                        return a.previewElement && (a.previewElement.classList.add("dz-processing"), a._removeLink) ? a._removeLink.textContent = this.options.dictCancelUpload : void 0
                    },
                    processingmultiple: i,
                    uploadprogress: function(a, b) {
                        var c, d, e, f, g;
                        if (a.previewElement) {
                            for (f = a.previewElement.querySelectorAll("[data-dz-uploadprogress]"), g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.style.width = "" + b + "%");
                            return g
                        }
                    },
                    totaluploadprogress: i,
                    sending: i,
                    sendingmultiple: i,
                    success: function(a) {
                        return a.previewElement ? a.previewElement.classList.add("dz-success") : void 0
                    },
                    successmultiple: i,
                    canceled: function(a) {
                        return this.emit("error", a, "Upload canceled.")
                    },
                    canceledmultiple: i,
                    complete: function(a) {
                        return a._removeLink ? a._removeLink.textContent = this.options.dictRemoveFile : void 0
                    },
                    completemultiple: i,
                    maxfilesexceeded: i,
                    maxfilesreached: i,
                    previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-details">\n    <div class="dz-filename"><span data-dz-name></span></div>\n    <div class="dz-size" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-success-mark"><span>✔</span></div>\n  <div class="dz-error-mark"><span>✘</span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n</div>'
                }, c = function() {
                    var a, b, c, d, e, f, g;
                    for (d = arguments[0], c = 2 <= arguments.length ? m.call(arguments, 1) : [], f = 0, g = c.length; g > f; f++) {
                        b = c[f];
                        for (a in b) e = b[a], d[a] = e
                    }
                    return d
                }, b.prototype.getAcceptedFiles = function() {
                    var a, b, c, d, e;
                    for (d = this.files, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a.accepted && e.push(a);
                    return e
                }, b.prototype.getRejectedFiles = function() {
                    var a, b, c, d, e;
                    for (d = this.files, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a.accepted || e.push(a);
                    return e
                }, b.prototype.getFilesWithStatus = function(a) {
                    var b, c, d, e, f;
                    for (e = this.files, f = [], c = 0, d = e.length; d > c; c++) b = e[c], b.status === a && f.push(b);
                    return f
                }, b.prototype.getQueuedFiles = function() {
                    return this.getFilesWithStatus(b.QUEUED)
                }, b.prototype.getUploadingFiles = function() {
                    return this.getFilesWithStatus(b.UPLOADING)
                }, b.prototype.getActiveFiles = function() {
                    var a, c, d, e, f;
                    for (e = this.files, f = [], c = 0, d = e.length; d > c; c++) a = e[c], (a.status === b.UPLOADING || a.status === b.QUEUED) && f.push(a);
                    return f
                }, b.prototype.init = function() {
                    var a, c, d, e, f, g, h;
                    for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(b.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length && (d = function(a) {
                        return function() {
                            return a.hiddenFileInput && document.body.removeChild(a.hiddenFileInput), a.hiddenFileInput = document.createElement("input"), a.hiddenFileInput.setAttribute("type", "file"), (null == a.options.maxFiles || a.options.maxFiles > 1) && a.hiddenFileInput.setAttribute("multiple", "multiple"), a.hiddenFileInput.className = "dz-hidden-input", null != a.options.acceptedFiles && a.hiddenFileInput.setAttribute("accept", a.options.acceptedFiles), a.hiddenFileInput.style.visibility = "hidden", a.hiddenFileInput.style.position = "absolute", a.hiddenFileInput.style.top = "0", a.hiddenFileInput.style.left = "0", a.hiddenFileInput.style.height = "0", a.hiddenFileInput.style.width = "0", document.body.appendChild(a.hiddenFileInput), a.hiddenFileInput.addEventListener("change", function() {
                                var b, c, e, f;
                                if (c = a.hiddenFileInput.files, c.length)
                                    for (e = 0, f = c.length; f > e; e++) b = c[e], a.addFile(b);
                                return d()
                            })
                        }
                    }(this))(), this.URL = null != (g = window.URL) ? g : window.webkitURL, h = this.events, e = 0, f = h.length; f > e; e++) a = h[e], this.on(a, this.options[a]);
                    return this.on("uploadprogress", function(a) {
                        return function() {
                            return a.updateTotalUploadProgress()
                        }
                    }(this)), this.on("removedfile", function(a) {
                        return function() {
                            return a.updateTotalUploadProgress()
                        }
                    }(this)), this.on("canceled", function(a) {
                        return function(b) {
                            return a.emit("complete", b)
                        }
                    }(this)), this.on("complete", function(a) {
                        return function() {
                            return 0 === a.getUploadingFiles().length && 0 === a.getQueuedFiles().length ? setTimeout(function() {
                                return a.emit("queuecomplete")
                            }, 0) : void 0
                        }
                    }(this)), c = function(a) {
                        return a.stopPropagation(), a.preventDefault ? a.preventDefault() : a.returnValue = !1
                    }, this.listeners = [{
                        element: this.element,
                        events: {
                            dragstart: function(a) {
                                return function(b) {
                                    return a.emit("dragstart", b)
                                }
                            }(this),
                            dragenter: function(a) {
                                return function(b) {
                                    return c(b), a.emit("dragenter", b)
                                }
                            }(this),
                            dragover: function(a) {
                                return function(b) {
                                    var d;
                                    try {
                                        d = b.dataTransfer.effectAllowed
                                    } catch (e) {}
                                    return b.dataTransfer.dropEffect = "move" === d || "linkMove" === d ? "move" : "copy", c(b), a.emit("dragover", b)
                                }
                            }(this),
                            dragleave: function(a) {
                                return function(b) {
                                    return a.emit("dragleave", b)
                                }
                            }(this),
                            drop: function(a) {
                                return function(b) {
                                    return c(b), a.drop(b)
                                }
                            }(this),
                            dragend: function(a) {
                                return function(b) {
                                    return a.emit("dragend", b)
                                }
                            }(this)
                        }
                    }], this.clickableElements.forEach(function(a) {
                        return function(c) {
                            return a.listeners.push({
                                element: c,
                                events: {
                                    click: function(d) {
                                        return c !== a.element || d.target === a.element || b.elementInside(d.target, a.element.querySelector(".dz-message")) ? a.hiddenFileInput.click() : void 0
                                    }
                                }
                            })
                        }
                    }(this)), this.enable(), this.options.init.call(this)
                }, b.prototype.destroy = function() {
                    var a;
                    return this.disable(), this.removeAllFiles(!0), (null != (a = this.hiddenFileInput) ? a.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, b.instances.splice(b.instances.indexOf(this), 1)
                }, b.prototype.updateTotalUploadProgress = function() {
                    var a, b, c, d, e, f, g, h;
                    if (d = 0, c = 0, a = this.getActiveFiles(), a.length) {
                        for (h = this.getActiveFiles(), f = 0, g = h.length; g > f; f++) b = h[f], d += b.upload.bytesSent, c += b.upload.total;
                        e = 100 * d / c
                    } else e = 100;
                    return this.emit("totaluploadprogress", e, c, d)
                }, b.prototype._getParamName = function(a) {
                    return "function" == typeof this.options.paramName ? this.options.paramName(a) : "" + this.options.paramName + (this.options.uploadMultiple ? "[" + a + "]" : "")
                }, b.prototype.getFallbackForm = function() {
                    var a, c, d, e;
                    return (a = this.getExistingFallback()) ? a : (d = '<div class="dz-fallback">', this.options.dictFallbackText && (d += "<p>" + this.options.dictFallbackText + "</p>"), d += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>', c = b.createElement(d), "FORM" !== this.element.tagName ? (e = b.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'), e.appendChild(c)) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != e ? e : c)
                }, b.prototype.getExistingFallback = function() {
                    var a, b, c, d, e, f;
                    for (b = function(a) {
                        var b, c, d;
                        for (c = 0, d = a.length; d > c; c++)
                            if (b = a[c], /(^| )fallback($| )/.test(b.className)) return b
                    }, f = ["div", "form"], d = 0, e = f.length; e > d; d++)
                        if (c = f[d], a = b(this.element.getElementsByTagName(c))) return a
                }, b.prototype.setupEventListeners = function() {
                    var a, b, c, d, e, f, g;
                    for (f = this.listeners, g = [], d = 0, e = f.length; e > d; d++) a = f[d], g.push(function() {
                        var d, e;
                        d = a.events, e = [];
                        for (b in d) c = d[b], e.push(a.element.addEventListener(b, c, !1));
                        return e
                    }());
                    return g
                }, b.prototype.removeEventListeners = function() {
                    var a, b, c, d, e, f, g;
                    for (f = this.listeners, g = [], d = 0, e = f.length; e > d; d++) a = f[d], g.push(function() {
                        var d, e;
                        d = a.events, e = [];
                        for (b in d) c = d[b], e.push(a.element.removeEventListener(b, c, !1));
                        return e
                    }());
                    return g
                }, b.prototype.disable = function() {
                    var a, b, c, d, e;
                    for (this.clickableElements.forEach(function(a) {
                        return a.classList.remove("dz-clickable")
                    }), this.removeEventListeners(), d = this.files, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(this.cancelUpload(a));
                    return e
                }, b.prototype.enable = function() {
                    return this.clickableElements.forEach(function(a) {
                        return a.classList.add("dz-clickable")
                    }), this.setupEventListeners()
                }, b.prototype.filesize = function(a) {
                    var b;
                    return a >= 109951162777.6 ? (a /= 109951162777.6, b = "TiB") : a >= 107374182.4 ? (a /= 107374182.4, b = "GiB") : a >= 104857.6 ? (a /= 104857.6, b = "MiB") : a >= 102.4 ? (a /= 102.4, b = "KiB") : (a = 10 * a, b = "b"), "<strong>" + Math.round(a) / 10 + "</strong> " + b
                }, b.prototype._updateMaxFilesReachedClass = function() {
                    return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
                }, b.prototype.drop = function(a) {
                    var b, c;
                    a.dataTransfer && (this.emit("drop", a), b = a.dataTransfer.files, b.length && (c = a.dataTransfer.items, c && c.length && null != c[0].webkitGetAsEntry ? this._addFilesFromItems(c) : this.handleFiles(b)))
                }, b.prototype.paste = function(a) {
                    var b, c;
                    if (null != (null != a && null != (c = a.clipboardData) ? c.items : void 0)) return this.emit("paste", a), b = a.clipboardData.items, b.length ? this._addFilesFromItems(b) : void 0
                }, b.prototype.handleFiles = function(a) {
                    var b, c, d, e;
                    for (e = [], c = 0, d = a.length; d > c; c++) b = a[c], e.push(this.addFile(b));
                    return e
                }, b.prototype._addFilesFromItems = function(a) {
                    var b, c, d, e, f;
                    for (f = [], d = 0, e = a.length; e > d; d++) c = a[d], f.push(null != c.webkitGetAsEntry && (b = c.webkitGetAsEntry()) ? b.isFile ? this.addFile(c.getAsFile()) : b.isDirectory ? this._addFilesFromDirectory(b, b.name) : void 0 : null != c.getAsFile ? null == c.kind || "file" === c.kind ? this.addFile(c.getAsFile()) : void 0 : void 0);
                    return f
                }, b.prototype._addFilesFromDirectory = function(a, b) {
                    var c, d;
                    return c = a.createReader(), d = function(a) {
                        return function(c) {
                            var d, e, f;
                            for (e = 0, f = c.length; f > e; e++) d = c[e], d.isFile ? d.file(function(c) {
                                return a.options.ignoreHiddenFiles && "." === c.name.substring(0, 1) ? void 0 : (c.fullPath = "" + b + "/" + c.name, a.addFile(c))
                            }) : d.isDirectory && a._addFilesFromDirectory(d, "" + b + "/" + d.name)
                        }
                    }(this), c.readEntries(d, function(a) {
                        return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(a) : void 0
                    })
                }, b.prototype.accept = function(a, c) {
                    return a.size > 1024 * this.options.maxFilesize * 1024 ? c(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(a.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : b.isValidFile(a, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (c(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", a)) : this.options.accept.call(this, a, c) : c(this.options.dictInvalidFileType)
                }, b.prototype.addFile = function(a) {
                    return a.upload = {
                        progress: 0,
                        total: a.size,
                        bytesSent: 0
                    }, this.files.push(a), a.status = b.ADDED, this.emit("addedfile", a), this._enqueueThumbnail(a), this.accept(a, function(b) {
                        return function(c) {
                            return c ? (a.accepted = !1, b._errorProcessing([a], c)) : (a.accepted = !0, b.options.autoQueue && b.enqueueFile(a)), b._updateMaxFilesReachedClass()
                        }
                    }(this))
                }, b.prototype.enqueueFiles = function(a) {
                    var b, c, d;
                    for (c = 0, d = a.length; d > c; c++) b = a[c], this.enqueueFile(b);
                    return null
                }, b.prototype.enqueueFile = function(a) {
                    if (a.status !== b.ADDED || a.accepted !== !0) throw new Error("This file can't be queued because it has already been processed or was rejected.");
                    return a.status = b.QUEUED, this.options.autoProcessQueue ? setTimeout(function(a) {
                        return function() {
                            return a.processQueue()
                        }
                    }(this), 0) : void 0
                }, b.prototype._thumbnailQueue = [], b.prototype._processingThumbnail = !1, b.prototype._enqueueThumbnail = function(a) {
                    return this.options.createImageThumbnails && a.type.match(/image.*/) && a.size <= 1024 * this.options.maxThumbnailFilesize * 1024 ? (this._thumbnailQueue.push(a), setTimeout(function(a) {
                        return function() {
                            return a._processThumbnailQueue()
                        }
                    }(this), 0)) : void 0
                }, b.prototype._processThumbnailQueue = function() {
                    return this._processingThumbnail || 0 === this._thumbnailQueue.length ? void 0 : (this._processingThumbnail = !0, this.createThumbnail(this._thumbnailQueue.shift(), function(a) {
                        return function() {
                            return a._processingThumbnail = !1, a._processThumbnailQueue()
                        }
                    }(this)))
                }, b.prototype.removeFile = function(a) {
                    return a.status === b.UPLOADING && this.cancelUpload(a), this.files = j(this.files, a), this.emit("removedfile", a), 0 === this.files.length ? this.emit("reset") : void 0
                }, b.prototype.removeAllFiles = function(a) {
                    var c, d, e, f;
                    for (null == a && (a = !1), f = this.files.slice(), d = 0, e = f.length; e > d; d++) c = f[d], (c.status !== b.UPLOADING || a) && this.removeFile(c);
                    return null
                }, b.prototype.createThumbnail = function(a, b) {
                    var c;
                    return c = new FileReader, c.onload = function(d) {
                        return function() {
                            var e;
                            return e = document.createElement("img"), e.onload = function() {
                                var c, f, g, i, j, k, l, m;
                                return a.width = e.width, a.height = e.height, g = d.options.resize.call(d, a), null == g.trgWidth && (g.trgWidth = g.optWidth), null == g.trgHeight && (g.trgHeight = g.optHeight), c = document.createElement("canvas"), f = c.getContext("2d"), c.width = g.trgWidth, c.height = g.trgHeight, h(f, e, null != (j = g.srcX) ? j : 0, null != (k = g.srcY) ? k : 0, g.srcWidth, g.srcHeight, null != (l = g.trgX) ? l : 0, null != (m = g.trgY) ? m : 0, g.trgWidth, g.trgHeight), i = c.toDataURL("image/png"), d.emit("thumbnail", a, i), null != b ? b() : void 0
                            }, e.src = c.result
                        }
                    }(this), c.readAsDataURL(a)
                }, b.prototype.processQueue = function() {
                    var a, b, c, d;
                    if (b = this.options.parallelUploads, c = this.getUploadingFiles().length, a = c, !(c >= b) && (d = this.getQueuedFiles(), d.length > 0)) {
                        if (this.options.uploadMultiple) return this.processFiles(d.slice(0, b - c));
                        for (; b > a;) {
                            if (!d.length) return;
                            this.processFile(d.shift()), a++
                        }
                    }
                }, b.prototype.processFile = function(a) {
                    return this.processFiles([a])
                }, b.prototype.processFiles = function(a) {
                    var c, d, e;
                    for (d = 0, e = a.length; e > d; d++) c = a[d], c.processing = !0, c.status = b.UPLOADING, this.emit("processing", c);
                    return this.options.uploadMultiple && this.emit("processingmultiple", a), this.uploadFiles(a)
                }, b.prototype._getFilesWithXhr = function(a) {
                    var b, c;
                    return c = function() {
                        var c, d, e, f;
                        for (e = this.files, f = [], c = 0, d = e.length; d > c; c++) b = e[c], b.xhr === a && f.push(b);
                        return f
                    }.call(this)
                }, b.prototype.cancelUpload = function(a) {
                    var c, d, e, f, g, h, i;
                    if (a.status === b.UPLOADING) {
                        for (d = this._getFilesWithXhr(a.xhr), e = 0, g = d.length; g > e; e++) c = d[e], c.status = b.CANCELED;
                        for (a.xhr.abort(), f = 0, h = d.length; h > f; f++) c = d[f], this.emit("canceled", c);
                        this.options.uploadMultiple && this.emit("canceledmultiple", d)
                    } else((i = a.status) === b.ADDED || i === b.QUEUED) && (a.status = b.CANCELED, this.emit("canceled", a), this.options.uploadMultiple && this.emit("canceledmultiple", [a]));
                    return this.options.autoProcessQueue ? this.processQueue() : void 0
                }, b.prototype.uploadFile = function(a) {
                    return this.uploadFiles([a])
                }, b.prototype.uploadFiles = function(a) {
                    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I;
                    for (t = new XMLHttpRequest, u = 0, y = a.length; y > u; u++) d = a[u], d.xhr = t;
                    t.open(this.options.method, this.options.url, !0), t.withCredentials = !!this.options.withCredentials, q = null, f = function(b) {
                        return function() {
                            var c, e, f;
                            for (f = [], c = 0, e = a.length; e > c; c++) d = a[c], f.push(b._errorProcessing(a, q || b.options.dictResponseError.replace("{{statusCode}}", t.status), t));
                            return f
                        }
                    }(this), r = function(b) {
                        return function(c) {
                            var e, f, g, h, i, j, k, l, m;
                            if (null != c)
                                for (f = 100 * c.loaded / c.total, g = 0, j = a.length; j > g; g++) d = a[g], d.upload = {
                                    progress: f,
                                    total: c.total,
                                    bytesSent: c.loaded
                                };
                            else {
                                for (e = !0, f = 100, h = 0, k = a.length; k > h; h++) d = a[h], (100 !== d.upload.progress || d.upload.bytesSent !== d.upload.total) && (e = !1), d.upload.progress = f, d.upload.bytesSent = d.upload.total;
                                if (e) return
                            }
                            for (m = [], i = 0, l = a.length; l > i; i++) d = a[i], m.push(b.emit("uploadprogress", d, f, d.upload.bytesSent));
                            return m
                        }
                    }(this), t.onload = function(c) {
                        return function(d) {
                            var e;
                            if (a[0].status !== b.CANCELED && 4 === t.readyState) {
                                if (q = t.responseText, t.getResponseHeader("content-type") && ~t.getResponseHeader("content-type").indexOf("application/json")) try {
                                    q = JSON.parse(q)
                                } catch (g) {
                                    d = g, q = "Invalid JSON response from server."
                                }
                                return r(), 200 <= (e = t.status) && 300 > e ? c._finished(a, q, d) : f()
                            }
                        }
                    }(this), t.onerror = function() {
                        return function() {
                            return a[0].status !== b.CANCELED ? f() : void 0
                        }
                    }(this), p = null != (D = t.upload) ? D : t, p.onprogress = r, i = {
                        Accept: "application/json",
                        "Cache-Control": "no-cache",
                        "X-Requested-With": "XMLHttpRequest"
                    }, this.options.headers && c(i, this.options.headers);
                    for (g in i) h = i[g], t.setRequestHeader(g, h);
                    if (e = new FormData, this.options.params) {
                        E = this.options.params;
                        for (n in E) s = E[n], e.append(n, s)
                    }
                    for (v = 0, z = a.length; z > v; v++) d = a[v], this.emit("sending", d, t, e);
                    if (this.options.uploadMultiple && this.emit("sendingmultiple", a, t, e), "FORM" === this.element.tagName)
                        for (F = this.element.querySelectorAll("input, textarea, select, button"), w = 0, A = F.length; A > w; w++)
                            if (k = F[w], l = k.getAttribute("name"), m = k.getAttribute("type"), "SELECT" === k.tagName && k.hasAttribute("multiple"))
                                for (G = k.options, x = 0, B = G.length; B > x; x++) o = G[x], o.selected && e.append(l, o.value);
                            else(!m || "checkbox" !== (H = m.toLowerCase()) && "radio" !== H || k.checked) && e.append(l, k.value);
                    for (j = C = 0, I = a.length - 1; I >= 0 ? I >= C : C >= I; j = I >= 0 ? ++C : --C) e.append(this._getParamName(j), a[j], a[j].name);
                    return t.send(e)
                }, b.prototype._finished = function(a, c, d) {
                    var e, f, g;
                    for (f = 0, g = a.length; g > f; f++) e = a[f], e.status = b.SUCCESS, this.emit("success", e, c, d), this.emit("complete", e);
                    return this.options.uploadMultiple && (this.emit("successmultiple", a, c, d), this.emit("completemultiple", a)), this.options.autoProcessQueue ? this.processQueue() : void 0
                }, b.prototype._errorProcessing = function(a, c, d) {
                    var e, f, g;
                    for (f = 0, g = a.length; g > f; f++) e = a[f], e.status = b.ERROR, this.emit("error", e, c, d), this.emit("complete", e);
                    return this.options.uploadMultiple && (this.emit("errormultiple", a, c, d), this.emit("completemultiple", a)), this.options.autoProcessQueue ? this.processQueue() : void 0
                }, b
            }(d), b.version = "3.10.2", b.options = {}, b.optionsForElement = function(a) {
                return a.getAttribute("id") ? b.options[e(a.getAttribute("id"))] : void 0
            }, b.instances = [], b.forElement = function(a) {
                if ("string" == typeof a && (a = document.querySelector(a)), null == (null != a ? a.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
                return a.dropzone
            }, b.autoDiscover = !0, b.discover = function() {
                var a, c, d, e, f, g;
                for (document.querySelectorAll ? d = document.querySelectorAll(".dropzone") : (d = [], a = function(a) {
                    var b, c, e, f;
                    for (f = [], c = 0, e = a.length; e > c; c++) b = a[c], f.push(/(^| )dropzone($| )/.test(b.className) ? d.push(b) : void 0);
                    return f
                }, a(document.getElementsByTagName("div")), a(document.getElementsByTagName("form"))), g = [], e = 0, f = d.length; f > e; e++) c = d[e], g.push(b.optionsForElement(c) !== !1 ? new b(c) : void 0);
                return g
            }, b.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i], b.isBrowserSupported = function() {
                var a, c, d, e, f;
                if (a = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)
                    if ("classList" in document.createElement("a"))
                        for (f = b.blacklistedBrowsers, d = 0, e = f.length; e > d; d++) c = f[d], c.test(navigator.userAgent) && (a = !1);
                    else a = !1;
                else a = !1;
                return a
            }, j = function(a, b) {
                var c, d, e, f;
                for (f = [], d = 0, e = a.length; e > d; d++) c = a[d], c !== b && f.push(c);
                return f
            }, e = function(a) {
                return a.replace(/[\-_](\w)/g, function(a) {
                    return a.charAt(1).toUpperCase()
                })
            }, b.createElement = function(a) {
                var b;
                return b = document.createElement("div"), b.innerHTML = a, b.childNodes[0]
            }, b.elementInside = function(a, b) {
                if (a === b) return !0;
                for (; a = a.parentNode;)
                    if (a === b) return !0;
                return !1
            }, b.getElement = function(a, b) {
                var c;
                if ("string" == typeof a ? c = document.querySelector(a) : null != a.nodeType && (c = a), null == c) throw new Error("Invalid `" + b + "` option provided. Please provide a CSS selector or a plain HTML element.");
                return c
            }, b.getElements = function(a, b) {
                var c, d, e, f, g, h, i, j;
                if (a instanceof Array) {
                    e = [];
                    try {
                        for (f = 0, h = a.length; h > f; f++) d = a[f], e.push(this.getElement(d, b))
                    } catch (k) {
                        c = k, e = null
                    }
                } else if ("string" == typeof a)
                    for (e = [], j = document.querySelectorAll(a), g = 0, i = j.length; i > g; g++) d = j[g], e.push(d);
                else null != a.nodeType && (e = [a]); if (null == e || !e.length) throw new Error("Invalid `" + b + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
                return e
            }, b.confirm = function(a, b, c) {
                return window.confirm(a) ? b() : null != c ? c() : void 0
            }, b.isValidFile = function(a, b) {
                var c, d, e, f, g;
                if (!b) return !0;
                for (b = b.split(","), d = a.type, c = d.replace(/\/.*$/, ""), f = 0, g = b.length; g > f; f++)
                    if (e = b[f], e = e.trim(), "." === e.charAt(0)) {
                        if (-1 !== a.name.toLowerCase().indexOf(e.toLowerCase(), a.name.length - e.length)) return !0
                    } else if (/\/\*$/.test(e)) {
                    if (c === e.replace(/\/.*$/, "")) return !0
                } else if (d === e) return !0;
                return !1
            }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function(a) {
                return this.each(function() {
                    return new b(this, a)
                })
            }), "undefined" != typeof c && null !== c ? c.exports = b : window.Dropzone = b, b.ADDED = "added", b.QUEUED = "queued", b.ACCEPTED = b.QUEUED, b.UPLOADING = "uploading", b.PROCESSING = b.UPLOADING, b.CANCELED = "canceled", b.ERROR = "error", b.SUCCESS = "success", g = function(a) {
                var b, c, d, e, f, g, h, i, j, k;
                for (h = a.naturalWidth, g = a.naturalHeight, c = document.createElement("canvas"), c.width = 1, c.height = g, d = c.getContext("2d"), d.drawImage(a, 0, 0), e = d.getImageData(0, 0, 1, g).data, k = 0, f = g, i = g; i > k;) b = e[4 * (i - 1) + 3], 0 === b ? f = i : k = i, i = f + k >> 1;
                return j = i / g, 0 === j ? 1 : j
            }, h = function(a, b, c, d, e, f, h, i, j, k) {
                var l;
                return l = g(b), a.drawImage(b, c, d, e, f, h, i, j, k / l)
            }, f = function(a, b) {
                var c, d, e, f, g, h, i, j, k;
                if (e = !1, k = !0, d = a.document, j = d.documentElement, c = d.addEventListener ? "addEventListener" : "attachEvent", i = d.addEventListener ? "removeEventListener" : "detachEvent", h = d.addEventListener ? "" : "on", f = function(c) {
                    return "readystatechange" !== c.type || "complete" === d.readyState ? (("load" === c.type ? a : d)[i](h + c.type, f, !1), !e && (e = !0) ? b.call(a, c.type || c) : void 0) : void 0
                }, g = function() {
                    var a;
                    try {
                        j.doScroll("left")
                    } catch (b) {
                        return a = b, void setTimeout(g, 50)
                    }
                    return f("poll")
                }, "complete" !== d.readyState) {
                    if (d.createEventObject && j.doScroll) {
                        try {
                            k = !a.frameElement
                        } catch (l) {}
                        k && g()
                    }
                    return d[c](h + "DOMContentLoaded", f, !1), d[c](h + "readystatechange", f, !1), a[c](h + "load", f, !1)
                }
            }, b._autoDiscoverFunction = function() {
                return b.autoDiscover ? b.discover() : void 0
            }, f(window, b._autoDiscoverFunction)
        }).call(this)
    }), "object" == typeof exports ? module.exports = a("dropzone") : "function" == typeof define && define.amd ? define([], function() {
        return a("dropzone")
    }) : this.Dropzone = a("dropzone")
}();