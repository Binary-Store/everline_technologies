! function(o, l) {
    var r, a, s = "createElement",
        g = "getElementsByTagName",
        b = "length",
        E = "style",
        d = "title",
        y = "undefined",
        k = "setAttribute",
        w = "getAttribute",
        x = null,
        A = "__svgInject",
        C = "--inject-",
        S = new RegExp(C + "\\d+", "g"),
        I = "LOAD_FAIL",
        t = "SVG_NOT_SUPPORTED",
        L = "SVG_INVALID",
        v = ["src", "alt", "onload", "onerror"],
        j = l[s]("a"),
        G = typeof SVGRect != y,
        f = {
            useCache: !0,
            copyAttributes: !0,
            makeIdsUnique: !0
        },
        N = {
            clipPath: ["clip-path"],
            "color-profile": x,
            cursor: x,
            filter: x,
            linearGradient: ["fill", "stroke"],
            marker: ["marker",
                "marker-end", "marker-mid", "marker-start"
            ],
            mask: x,
            pattern: ["fill", "stroke"],
            radialGradient: ["fill", "stroke"]
        },
        u = 1,
        c = 2,
        O = 1;

    function T(e) {
        return (r = r || new XMLSerializer).serializeToString(e)
    }

    function P(e, r) {
        var t, n, i, o, a = C + O++,
            f = /url\("?#([a-zA-Z][\w:.-]*)"?\)/g,
            u = e.querySelectorAll("[id]"),
            c = r ? [] : x,
            l = {},
            s = [],
            d = !1;
        if (u[b]) {
            for (i = 0; i < u[b]; i++)(n = u[i].localName) in N && (l[n] = 1);
            for (n in l)(N[n] || [n]).forEach(function(e) {
                s.indexOf(e) < 0 && s.push(e)
            });
            s[b] && s.push(E);
            var v, p, m, h = e[g]("*"),
                y = e;
            for (i = -1; y != x;) {
                if (y.localName == E)(m = (p = y.textContent) && p.replace(f, function(e, r) {
                    return c && (c[r] = 1), "url(#" + r + a + ")"
                })) !== p && (y.textContent = m);
                else if (y.hasAttributes()) {
                    for (o = 0; o < s[b]; o++) v = s[o], (m = (p = y[w](v)) && p.replace(f, function(e, r) {
                        return c && (c[r] = 1), "url(#" + r + a + ")"
                    })) !== p && y[k](v, m);
                    ["xlink:href", "href"].forEach(function(e) {
                        var r = y[w](e);
                        /^\s*#/.test(r) && (r = r.trim(), y[k](e, r + a), c && (c[r.substring(1)] = 1))
                    })
                }
                y = h[++i]
            }
            for (i = 0; i < u[b]; i++) t = u[i], c && !c[t.id] || (t.id += a, d = !0)
        }
        return d
    }

    function V(e, r, t, n) {
        if (r) {
            r[k]("data-inject-url", t);
            var i = e.parentNode;
            if (i) {
                n.copyAttributes && function c(e, r) {
                    for (var t, n, i, o = e.attributes, a = 0; a < o[b]; a++)
                        if (n = (t = o[a]).name, -1 == v.indexOf(n))
                            if (i = t.value, n == d) {
                                var f, u = r.firstElementChild;
                                u && u.localName.toLowerCase() == d ? f = u : (f = l[s + "NS"]("http://www.w3.org/2000/svg", d), r.insertBefore(f, u)), f.textContent = i
                            } else r[k](n, i)
                }(e, r);
                var o = n.beforeInject,
                    a = o && o(e, r) || r;
                i.replaceChild(a, e), e[A] = u, m(e);
                var f = n.afterInject;
                f && f(e, a)
            }
        } else D(e, n)
    }

    function p() {
        for (var e = {}, r = arguments,
                t = 0; t < r[b]; t++) {
            var n = r[t];
            for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i])
        }
        return e
    }

    function _(e, r) {
        if (r) {
            var t;
            try {
                t = function i(e) {
                    return (a = a || new DOMParser).parseFromString(e, "text/xml")
                }(e)
            } catch (o) {
                return x
            }
            return t[g]("parsererror")[b] ? x : t.documentElement
        }
        var n = l.createElement("div");
        return n.innerHTML = e, n.firstElementChild
    }

    function m(e) {
        e.removeAttribute("onload")
    }

    function n(e) {
        console.error("SVGInject: " + e)
    }

    function i(e, r, t) {
        e[A] = c, t.onFail ? t.onFail(e, r) : n(r)
    }

    function D(e, r) {
        m(e), i(e, L, r)
    }

    function F(e, r) {
        m(e), i(e, t, r)
    }

    function M(e, r) {
        i(e, I, r)
    }

    function q(e) {
        e.onload = x, e.onerror = x
    }

    function R(e) {
        n("no img element")
    }
    var e = function z(e, r) {
        var t = p(f, r),
            h = {};

        function n(a, f) {
            f = p(t, f);
            var e = function(r) {
                var e = function() {
                    var e = f.onAllFinish;
                    e && e(), r && r()
                };
                if (a && typeof a[b] != y) {
                    var t = 0,
                        n = a[b];
                    if (0 == n) e();
                    else
                        for (var i = function() {
                                ++t == n && e()
                            }, o = 0; o < n; o++) u(a[o], f, i)
                } else u(a, f, e)
            };
            return typeof Promise == y ? e() : new Promise(e)
        }

        function u(u, c, e) {
            if (u) {
                var r = u[A];
                if (r) Array.isArray(r) ? r.push(e) : e();
                else {
                    if (q(u), !G) return F(u, c), void e();
                    var t = c.beforeLoad,
                        n = t && t(u) || u[w]("src");
                    if (!n) return "" === n && M(u, c), void e();
                    var i = [];
                    u[A] = i;
                    var l = function() {
                            e(), i.forEach(function(e) {
                                e()
                            })
                        },
                        s = function f(e) {
                            return j.href = e, j.href
                        }(n),
                        d = c.useCache,
                        v = c.makeIdsUnique,
                        p = function(r) {
                            d && (h[s].forEach(function(e) {
                                e(r)
                            }), h[s] = r)
                        };
                    if (d) {
                        var o, a = function(e) {
                            if (e === I) M(u, c);
                            else if (e === L) D(u, c);
                            else {
                                var r, t = e[0],
                                    n = e[1],
                                    i = e[2];
                                v && (t === x ? (t = P(r = _(n, !1), !1), e[0] = t, e[2] = t && T(r)) : t && (n = function o(e) {
                                    return e.replace(S, C + O++)
                                }(i))), r = r || _(n, !1), V(u, r, s, c)
                            }
                            l()
                        };
                        if (typeof(o = h[s]) != y) return void(o.isCallbackQueue ? o.push(a) : a(o));
                        (o = []).isCallbackQueue = !0, h[s] = o
                    }! function m(e, r, t) {
                        if (e) {
                            var n = new XMLHttpRequest;
                            n.onreadystatechange = function() {
                                if (4 == n.readyState) {
                                    var e = n.status;
                                    200 == e ? r(n.responseXML, n.responseText.trim()) : 400 <= e ? t() : 0 == e && t()
                                }
                            }, n.open("GET", e, !0), n.send()
                        }
                    }(s, function(e, r) {
                        var t = e instanceof Document ? e.documentElement : _(r, !0),
                            n = c.afterLoad;
                        if (n) {
                            var i = n(t, r) || t;
                            if (i) {
                                var o = "string" == typeof i;
                                r = o ? i : T(t), t = o ? _(i, !0) : i
                            }
                        }
                        if (t instanceof SVGElement) {
                            var a = x;
                            if (v && (a = P(t, !1)), d) {
                                var f = a && T(t);
                                p([a, r, f])
                            }
                            V(u, t, s, c)
                        } else D(u, c), p(L);
                        l()
                    }, function() {
                        M(u, c), p(I), l()
                    })
                }
            } else R()
        }
        return G && function i(e) {
            var r = l[g]("head")[0];
            if (r) {
                var t = l[s](E);
                t.type = "text/css", t.appendChild(l.createTextNode(e)), r.appendChild(t)
            }
        }('img[onload^="' + e + '("]{visibility:hidden;}'), n.setOptions = function(e) {
            t = p(t, e)
        }, n.create = z, n.err = function(e, r) {
            e ? e[A] != c && (q(e), G ? (m(e), M(e, t)) : F(e, t), r && (m(
                e), e.src = r)) : R()
        }, o[e] = n
    }("SVGInject");
    "object" == typeof module && "object" == typeof module.exports && (module.exports = e)
}(window, document);