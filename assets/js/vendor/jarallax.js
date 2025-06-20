/*!
 * Jarallax v2.2.1 (https://github.com/nk-o/jarallax)
 * Copyright 2024 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jarallax = t()
}(this, (function() {
    "use strict";

    function e(e) {
        "complete" === document.readyState || "interactive" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, {
            capture: !0,
            once: !0,
            passive: !0
        })
    }
    let t;
    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var i = t,
        o = {
            type: "scroll",
            speed: .5,
            containerClass: "jarallax-container",
            imgSrc: null,
            imgElement: ".jarallax-img",
            imgSize: "cover",
            imgPosition: "50% 50%",
            imgRepeat: "no-repeat",
            keepImg: !1,
            elementInViewport: null,
            zIndex: -100,
            disableParallax: !1,
            onScroll: null,
            onInit: null,
            onDestroy: null,
            onCoverImage: null,
            videoClass: "jarallax-video",
            videoSrc: null,
            videoStartTime: 0,
            videoEndTime: 0,
            videoVolume: 0,
            videoLoop: !0,
            videoPlayOnlyVisible: !0,
            videoLazyLoading: !0,
            disableVideo: !1,
            onVideoInsert: null,
            onVideoWorkerInit: null
        };
    const {
        navigator: n
    } = i, a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(n.userAgent);
    let s, l, r;

    function c() {
        s = i.innerWidth || document.documentElement.clientWidth, a ? (!r && document.body && (r = document.createElement("div"), r.style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;", document.body.appendChild(r)), l = (r ? r.clientHeight : 0) || i.innerHeight || document.documentElement.clientHeight) : l = i.innerHeight || document.documentElement.clientHeight
    }

    function p() {
        return {
            width: s,
            height: l
        }
    }
    c(), i.addEventListener("resize", c), i.addEventListener("orientationchange", c), i.addEventListener("load", c), e((() => {
        c()
    }));
    const m = [];

    function d() {
        if (!m.length) return;
        const {
            width: e,
            height: t
        } = p();
        m.forEach(((i, o) => {
            const {
                instance: n,
                oldData: a
            } = i;
            if (!n.isVisible()) return;
            const s = n.$item.getBoundingClientRect(),
                l = {
                    width: s.width,
                    height: s.height,
                    top: s.top,
                    bottom: s.bottom,
                    wndW: e,
                    wndH: t
                },
                r = !a || a.wndW !== l.wndW || a.wndH !== l.wndH || a.width !== l.width || a.height !== l.height,
                c = r || !a || a.top !== l.top || a.bottom !== l.bottom;
            m[o].oldData = l, r && n.onResize(), c && n.onScroll()
        })), i.requestAnimationFrame(d)
    }
    const g = new i.IntersectionObserver((e => {
        e.forEach((e => {
            e.target.jarallax.isElementInViewport = e.isIntersecting
        }))
    }), {
        rootMargin: "50px"
    });
    const {
        navigator: u
    } = i;
    let f = 0;
    class h {
        constructor(e, t) {
            const i = this;
            i.instanceID = f, f += 1, i.$item = e, i.defaults = { ...o
            };
            const n = i.$item.dataset || {},
                a = {};
            if (Object.keys(n).forEach((e => {
                    const t = e.substr(0, 1).toLowerCase() + e.substr(1);
                    t && void 0 !== i.defaults[t] && (a[t] = n[e])
                })), i.options = i.extend({}, i.defaults, a, t), i.pureOptions = i.extend({}, i.options), Object.keys(i.options).forEach((e => {
                    "true" === i.options[e] ? i.options[e] = !0 : "false" === i.options[e] && (i.options[e] = !1)
                })), i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed))), "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)), i.options.disableParallax instanceof RegExp) {
                const e = i.options.disableParallax;
                i.options.disableParallax = () => e.test(u.userAgent)
            }
            if ("function" != typeof i.options.disableParallax) {
                const e = i.options.disableParallax;
                i.options.disableParallax = () => !0 === e
            }
            if ("string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)), i.options.disableVideo instanceof RegExp) {
                const e = i.options.disableVideo;
                i.options.disableVideo = () => e.test(u.userAgent)
            }
            if ("function" != typeof i.options.disableVideo) {
                const e = i.options.disableVideo;
                i.options.disableVideo = () => !0 === e
            }
            let s = i.options.elementInViewport;
            s && "object" == typeof s && void 0 !== s.length && ([s] = s), s instanceof Element || (s = null), i.options.elementInViewport = s, i.image = {
                src: i.options.imgSrc || null,
                $container: null,
                useImgTag: !1,
                position: "fixed"
            }, i.initImg() && i.canInitParallax() && i.init()
        }
        css(e, t) {
            return function(e, t) {
                return "string" == typeof t ? i.getComputedStyle(e).getPropertyValue(t) : (Object.keys(t).forEach((i => {
                    e.style[i] = t[i]
                })), e)
            }(e, t)
        }
        extend(e, ...t) {
            return function(e, ...t) {
                return e = e || {}, Object.keys(t).forEach((i => {
                    t[i] && Object.keys(t[i]).forEach((o => {
                        e[o] = t[i][o]
                    }))
                })), e
            }(e, ...t)
        }
        getWindowData() {
            const {
                width: e,
                height: t
            } = p();
            return {
                width: e,
                height: t,
                y: document.documentElement.scrollTop
            }
        }
        initImg() {
            const e = this;
            let t = e.options.imgElement;
            return t && "string" == typeof t && (t = e.$item.querySelector(t)), t instanceof Element || (e.options.imgSrc ? (t = new Image, t.src = e.options.imgSrc) : t = null), t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t, e.image.$itemParent = t.parentNode), e.image.useImgTag = !0), !!e.image.$item || (null === e.image.src && (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", e.image.bgImage = e.css(e.$item, "background-image")), !(!e.image.bgImage || "none" === e.image.bgImage))
        }
        canInitParallax() {
            return !this.options.disableParallax()
        }
        init() {
            const e = this,
                t = {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                };
            let o = {
                pointerEvents: "none",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
            };
            if (!e.options.keepImg) {
                const t = e.$item.getAttribute("style");
                if (t && e.$item.setAttribute("data-jarallax-original-styles", t), e.image.useImgTag) {
                    const t = e.image.$item.getAttribute("style");
                    t && e.image.$item.setAttribute("data-jarallax-original-styles", t)
                }
            }
            if ("static" === e.css(e.$item, "position") && e.css(e.$item, {
                    position: "relative"
                }), "auto" === e.css(e.$item, "z-index") && e.css(e.$item, {
                    zIndex: 0
                }), e.image.$container = document.createElement("div"), e.css(e.image.$container, t), e.css(e.image.$container, {
                    "z-index": e.options.zIndex
                }), "fixed" === this.image.position && e.css(e.image.$container, {
                    "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                    "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                }), e.image.$container.setAttribute("id", `jarallax-container-${e.instanceID}`), e.options.containerClass && e.image.$container.setAttribute("class", e.options.containerClass), e.$item.appendChild(e.image.$container), e.image.useImgTag ? o = e.extend({
                    "object-fit": e.options.imgSize,
                    "object-position": e.options.imgPosition,
                    "max-width": "none"
                }, t, o) : (e.image.$item = document.createElement("div"), e.image.src && (o = e.extend({
                    "background-position": e.options.imgPosition,
                    "background-size": e.options.imgSize,
                    "background-repeat": e.options.imgRepeat,
                    "background-image": e.image.bgImage || `url("${e.image.src}")`
                }, t, o))), "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"), "fixed" === e.image.position) {
                const t = function(e) {
                    const t = [];
                    for (; null !== e.parentElement;) 1 === (e = e.parentElement).nodeType && t.push(e);
                    return t
                }(e.$item).filter((e => {
                    const t = i.getComputedStyle(e),
                        o = t["-webkit-transform"] || t["-moz-transform"] || t.transform;
                    return o && "none" !== o || /(auto|scroll)/.test(t.overflow + t["overflow-y"] + t["overflow-x"])
                }));
                e.image.position = t.length ? "absolute" : "fixed"
            }
            var n;
            o.position = e.image.position, e.css(e.image.$item, o), e.image.$container.appendChild(e.image.$item), e.onResize(), e.onScroll(!0), e.options.onInit && e.options.onInit.call(e), "none" !== e.css(e.$item, "background-image") && e.css(e.$item, {
                "background-image": "none"
            }), n = e, m.push({
                instance: n
            }), 1 === m.length && i.requestAnimationFrame(d), g.observe(n.options.elementInViewport || n.$item)
        }
        destroy() {
            const e = this;
            var t;
            t = e, m.forEach(((e, i) => {
                e.instance.instanceID === t.instanceID && m.splice(i, 1)
            })), g.unobserve(t.options.elementInViewport || t.$item);
            const i = e.$item.getAttribute("data-jarallax-original-styles");
            if (e.$item.removeAttribute("data-jarallax-original-styles"), i ? e.$item.setAttribute("style", i) : e.$item.removeAttribute("style"), e.image.useImgTag) {
                const t = e.image.$item.getAttribute("data-jarallax-original-styles");
                e.image.$item.removeAttribute("data-jarallax-original-styles"), t ? e.image.$item.setAttribute("style", i) : e.image.$item.removeAttribute("style"), e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item)
            }
            e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container), e.options.onDestroy && e.options.onDestroy.call(e), delete e.$item.jarallax
        }
        coverImage() {
            const e = this,
                {
                    height: t
                } = p(),
                i = e.image.$container.getBoundingClientRect(),
                o = i.height,
                {
                    speed: n
                } = e.options,
                a = "scroll" === e.options.type || "scroll-opacity" === e.options.type;
            let s = 0,
                l = o,
                r = 0;
            return a && (n < 0 ? (s = n * Math.max(o, t), t < o && (s -= n * (o - t))) : s = n * (o + t), n > 1 ? l = Math.abs(s - t) : n < 0 ? l = s / n + Math.abs(s) : l += (t - o) * (1 - n), s /= 2), e.parallaxScrollDistance = s, r = a ? (t - l) / 2 : (o - l) / 2, e.css(e.image.$item, {
                height: `${l}px`,
                marginTop: `${r}px`,
                left: "fixed" === e.image.position ? `${i.left}px` : "0",
                width: `${i.width}px`
            }), e.options.onCoverImage && e.options.onCoverImage.call(e), {
                image: {
                    height: l,
                    marginTop: r
                },
                container: i
            }
        }
        isVisible() {
            return this.isElementInViewport || !1
        }
        onScroll(e) {
            const t = this;
            if (!e && !t.isVisible()) return;
            const {
                height: i
            } = p(), o = t.$item.getBoundingClientRect(), n = o.top, a = o.height, s = {}, l = Math.max(0, n), r = Math.max(0, a + n), c = Math.max(0, -n), m = Math.max(0, n + a - i), d = Math.max(0, a - (n + a - i)), g = Math.max(0, -n + i - a), u = 1 - (i - n) / (i + a) * 2;
            let f = 1;
            if (a < i ? f = 1 - (c || m) / a : r <= i ? f = r / i : d <= i && (f = d / i), "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (s.transform = "translate3d(0,0,0)", s.opacity = f), "scale" === t.options.type || "scale-opacity" === t.options.type) {
                let e = 1;
                t.options.speed < 0 ? e -= t.options.speed * f : e += t.options.speed * (1 - f), s.transform = `scale(${e}) translate3d(0,0,0)`
            }
            if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                let e = t.parallaxScrollDistance * u;
                "absolute" === t.image.position && (e -= n), s.transform = `translate3d(0,${e}px,0)`
            }
            t.css(t.image.$item, s), t.options.onScroll && t.options.onScroll.call(t, {
                section: o,
                beforeTop: l,
                beforeTopEnd: r,
                afterTop: c,
                beforeBottom: m,
                beforeBottomEnd: d,
                afterBottom: g,
                visiblePercent: f,
                fromViewportCenter: u
            })
        }
        onResize() {
            this.coverImage()
        }
    }
    const b = function(e, t, ...i) {
        ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
        const o = e.length;
        let n, a = 0;
        for (; a < o; a += 1)
            if ("object" == typeof t || void 0 === t ? e[a].jarallax || (e[a].jarallax = new h(e[a], t)) : e[a].jarallax && (n = e[a].jarallax[t].apply(e[a].jarallax, i)), void 0 !== n) return n;
        return e
    };
    b.constructor = h;
    const y = i.jQuery;
    if (void 0 !== y) {
        const e = function(...e) {
            Array.prototype.unshift.call(e, this);
            const t = b.apply(i, e);
            return "object" != typeof t ? t : this
        };
        e.constructor = b.constructor;
        const t = y.fn.jarallax;
        y.fn.jarallax = e, y.fn.jarallax.noConflict = function() {
            return y.fn.jarallax = t, this
        }
    }
    return e((() => {
        b(document.querySelectorAll("[data-jarallax]"))
    })), b
})); //# sourceMappingURL=jarallax.min.js.map
/*!
 * Video Extension for Jarallax v2.2.1 (https://github.com/nk-o/jarallax)
 * Copyright 2024 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jarallaxVideo = t()
}(this, (function() {
    "use strict";
    /*!
     * Video Worker v2.2.0 (https://github.com/nk-o/video-worker)
     * Copyright 2024 nK <https://nkdev.info>
     * Licensed under MIT (https://github.com/nk-o/video-worker/blob/master/LICENSE)
     */
    var e = {
        autoplay: !1,
        loop: !1,
        mute: !1,
        volume: 100,
        showControls: !0,
        accessibilityHidden: !1,
        startTime: 0,
        endTime: 0
    };
    let t, o = 0;
    class i {
        type = "none";
        constructor(t, o) {
            const i = this;
            i.url = t, i.options_default = { ...e
            }, i.options = function(e, ...t) {
                return e = e || {}, Object.keys(t).forEach((o => {
                    t[o] && Object.keys(t[o]).forEach((i => {
                        e[i] = t[o][i]
                    }))
                })), e
            }({}, i.options_default, o), i.videoID = i.constructor.parseURL(t), i.videoID && i.init()
        }
        isValid() {
            return !!this.videoID
        }
        init() {
            const e = this;
            e.ID = o, o += 1, e.playerID = `VideoWorker-${e.ID}`
        }
        on(e, t) {
            this.userEventsList = this.userEventsList || [], (this.userEventsList[e] || (this.userEventsList[e] = [])).push(t)
        }
        off(e, t) {
            this.userEventsList && this.userEventsList[e] && (t ? this.userEventsList[e].forEach(((o, i) => {
                o === t && (this.userEventsList[e][i] = !1)
            })) : delete this.userEventsList[e])
        }
        fire(e, ...t) {
            this.userEventsList && void 0 !== this.userEventsList[e] && this.userEventsList[e].forEach((e => {
                e && e.apply(this, t)
            }))
        }
        static parseURL(e) {
            return !1
        }
        play(e) {}
        pause() {}
        mute() {}
        unmute() {}
        setVolume(e = !1) {}
        getVolume(e) {}
        getMuted(e) {}
        setCurrentTime(e = !1) {}
        getCurrentTime(e) {}
        getImageURL(e) {}
        getVideo(e) {}
    }
    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var a = t;

    function n() {
        this.doneCallbacks = [], this.failCallbacks = []
    }
    n.prototype = {
        execute(e, t) {
            let o = e.length;
            for (t = Array.prototype.slice.call(t); o;) o -= 1, e[o].apply(null, t)
        },
        resolve(...e) {
            this.execute(this.doneCallbacks, e)
        },
        reject(...e) {
            this.execute(this.failCallbacks, e)
        },
        done(e) {
            this.doneCallbacks.push(e)
        },
        fail(e) {
            this.failCallbacks.push(e)
        }
    };
    let s = 0,
        r = 0;
    const l = new n;
    let p = 0,
        d = 0;
    const u = new n;

    function m(e, t) {
        let o = !1;
        return Object.keys(m.providers).forEach((i => {
            !o && m.providers[i].parseURL(e) && (o = new m.providers[i](e, t))
        })), o || new i(e, t)
    }
    let y;
    m.BaseClass = i, m.providers = {
        Youtube: class extends i {
            type = "youtube";
            static parseURL(e) {
                const t = e.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=)([^#\&\?]*).*/);
                return !(!t || 11 !== t[1].length) && t[1]
            }
            init() {
                super.init(),
                    function() {
                        if (s) return;
                        s = !0;
                        let e = document.createElement("script"),
                            t = document.getElementsByTagName("head")[0];
                        e.src = "https://www.youtube.com/iframe_api", t.appendChild(e), t = null, e = null
                    }()
            }
            play(e) {
                const t = this;
                t.player && t.player.playVideo && (void 0 !== e && t.player.seekTo(e || 0), a.YT.PlayerState.PLAYING !== t.player.getPlayerState() && (t.options.endTime && !t.options.loop ? t.getCurrentTime((e => {
                    e < t.options.endTime && t.player.playVideo()
                })) : t.player.playVideo()))
            }
            pause() {
                const e = this;
                e.player && e.player.pauseVideo && a.YT.PlayerState.PLAYING === e.player.getPlayerState() && e.player.pauseVideo()
            }
            mute() {
                const e = this;
                e.player && e.player.mute && e.player.mute()
            }
            unmute() {
                const e = this;
                e.player && e.player.unMute && e.player.unMute()
            }
            setVolume(e = !1) {
                const t = this;
                t.player && "number" == typeof e && t.player.setVolume && t.player.setVolume(e)
            }
            getVolume(e) {
                const t = this;
                t.player ? t.player.getVolume && e(t.player.getVolume()) : e(!1)
            }
            getMuted(e) {
                const t = this;
                t.player ? t.player.isMuted && e(t.player.isMuted()) : e(null)
            }
            setCurrentTime(e = !1) {
                const t = this;
                t.player && "number" == typeof e && t.player.seekTo && t.player.seekTo(e)
            }
            getCurrentTime(e) {
                const t = this;
                t.player && t.player.getCurrentTime && e(t.player.getCurrentTime())
            }
            getImageURL(e) {
                const t = this;
                if (t.videoImage) return void e(t.videoImage);
                const o = ["maxresdefault", "sddefault", "hqdefault", "0"];
                let i = 0;
                const a = new Image;
                a.onload = function() {
                    120 !== (this.naturalWidth || this.width) || i === o.length - 1 ? (t.videoImage = `https://img.youtube.com/vi/${t.videoID}/${o[i]}.jpg`, e(t.videoImage)) : (i += 1, this.src = `https://img.youtube.com/vi/${t.videoID}/${o[i]}.jpg`)
                }, a.src = `https://img.youtube.com/vi/${t.videoID}/${o[i]}.jpg`
            }
            getVideo(e) {
                const t = this;
                t.$video ? e(t.$video) : function(e) {
                    void 0 !== a.YT && 0 !== a.YT.loaded || r ? "object" == typeof a.YT && 1 === a.YT.loaded ? e() : l.done((() => {
                        e()
                    })) : (r = 1, a.onYouTubeIframeAPIReady = function() {
                        a.onYouTubeIframeAPIReady = null, l.resolve("done"), e()
                    })
                }((() => {
                    let o, i, n;
                    t.$video || (o = document.createElement("div"), o.style.display = "none"), t.playerOptions = {
                        host: "https://www.youtube-nocookie.com",
                        videoId: t.videoID,
                        playerVars: {
                            autohide: 1,
                            rel: 0,
                            autoplay: 0,
                            playsinline: 1
                        }
                    }, t.options.showControls || (t.playerOptions.playerVars.iv_load_policy = 3, t.playerOptions.playerVars.modestbranding = 1, t.playerOptions.playerVars.controls = 0, t.playerOptions.playerVars.showinfo = 0, t.playerOptions.playerVars.disablekb = 1), t.playerOptions.events = {
                        onReady(e) {
                            if (t.options.mute ? e.target.mute() : "number" == typeof t.options.volume && e.target.setVolume(t.options.volume), t.options.autoplay && t.play(t.options.startTime), t.fire("ready", e), t.options.loop && !t.options.endTime) {
                                const e = .1;
                                t.options.endTime = t.player.getDuration() - e
                            }
                            setInterval((() => {
                                t.getVolume((o => {
                                    t.options.volume !== o && (t.options.volume = o, t.fire("volumechange", e))
                                }))
                            }), 150)
                        },
                        onStateChange(e) {
                            t.options.loop && e.data === a.YT.PlayerState.ENDED && t.play(t.options.startTime), i || e.data !== a.YT.PlayerState.PLAYING || (i = 1, t.fire("started", e)), e.data === a.YT.PlayerState.PLAYING && t.fire("play", e), e.data === a.YT.PlayerState.PAUSED && t.fire("pause", e), e.data === a.YT.PlayerState.ENDED && t.fire("ended", e), e.data === a.YT.PlayerState.PLAYING ? n = setInterval((() => {
                                t.fire("timeupdate", e), t.options.endTime && t.player.getCurrentTime() >= t.options.endTime && (t.options.loop ? t.play(t.options.startTime) : t.pause())
                            }), 150) : clearInterval(n)
                        },
                        onError(e) {
                            t.fire("error", e)
                        }
                    };
                    const s = !t.$video;
                    if (s) {
                        const e = document.createElement("div");
                        e.setAttribute("id", t.playerID), o.appendChild(e), document.body.appendChild(o)
                    }
                    t.player = t.player || new a.YT.Player(t.playerID, t.playerOptions), s && (t.$video = document.getElementById(t.playerID), t.options.accessibilityHidden && (t.$video.setAttribute("tabindex", "-1"), t.$video.setAttribute("aria-hidden", "true")), t.videoWidth = parseInt(t.$video.getAttribute("width"), 10) || 1280, t.videoHeight = parseInt(t.$video.getAttribute("height"), 10) || 720), e(t.$video)
                }))
            }
        },
        Vimeo: class extends i {
            type = "vimeo";
            static parseURL(e) {
                const t = e.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                return !(!t || !t[3]) && t[3]
            }
            static parseURLHash(e) {
                const t = e.match(/^.*(vimeo.com\/|video\/)(\d+)(\?.*&*h=|\/)+([\d,a-f]+)/);
                return t && 5 === t.length ? t[4] : null
            }
            init() {
                super.init(),
                    function() {
                        if (p) return;
                        if (p = !0, void 0 !== a.Vimeo) return;
                        let e = document.createElement("script"),
                            t = document.getElementsByTagName("head")[0];
                        e.src = "https://player.vimeo.com/api/player.js", t.appendChild(e), t = null, e = null
                    }()
            }
            play(e) {
                const t = this;
                t.player && (void 0 !== e && t.player.setCurrentTime(e), t.player.getPaused().then((e => {
                    e && (t.options.endTime && !t.options.loop ? t.getCurrentTime((e => {
                        e < t.options.endTime && t.player.play()
                    })) : t.player.play())
                })))
            }
            pause() {
                const e = this;
                e.player && e.player.getPaused().then((t => {
                    t || e.player.pause()
                }))
            }
            mute() {
                const e = this;
                e.player && e.player.setVolume && e.setVolume(0)
            }
            unmute() {
                const e = this;
                e.player && e.player.setVolume && e.setVolume(e.options.volume || 100)
            }
            setVolume(e = !1) {
                const t = this;
                t.player && "number" == typeof e && t.player.setVolume && t.player.setVolume(e / 100)
            }
            getVolume(e) {
                const t = this;
                t.player ? t.player.getVolume && t.player.getVolume().then((t => {
                    e(100 * t)
                })) : e(!1)
            }
            getMuted(e) {
                const t = this;
                t.player ? t.player.getVolume && t.player.getVolume().then((t => {
                    e(!!t)
                })) : e(null)
            }
            setCurrentTime(e = !1) {
                const t = this;
                t.player && "number" == typeof e && t.player.setCurrentTime && t.player.setCurrentTime(e)
            }
            getCurrentTime(e) {
                const t = this;
                t.player && t.player.getCurrentTime && t.player.getCurrentTime().then((t => {
                    e(t)
                }))
            }
            getImageURL(e) {
                const t = this;
                if (t.videoImage) return void e(t.videoImage);
                let o = a.innerWidth || 1920;
                a.devicePixelRatio && (o *= a.devicePixelRatio), o = Math.min(o, 1920);
                let i = new XMLHttpRequest;
                i.open("GET", `https://vimeo.com/api/oembed.json?url=${t.url}&width=${o}`, !0), i.onreadystatechange = function() {
                    if (4 === this.readyState && this.status >= 200 && this.status < 400) {
                        const o = JSON.parse(this.responseText);
                        o.thumbnail_url && (t.videoImage = o.thumbnail_url, e(t.videoImage))
                    }
                }, i.send(), i = null
            }
            getVideo(e) {
                const t = this;
                t.$video ? e(t.$video) : function(e) {
                    if (void 0 !== a.Vimeo || d) void 0 !== a.Vimeo ? e() : u.done((() => {
                        e()
                    }));
                    else {
                        d = 1;
                        const t = setInterval((() => {
                            void 0 !== a.Vimeo && (clearInterval(t), u.resolve("done"), e())
                        }), 20)
                    }
                }((() => {
                    let o;
                    t.$video || (o = document.createElement("div"), o.style.display = "none"), t.playerOptions = {
                        dnt: 1,
                        id: t.videoID,
                        autopause: 0,
                        transparent: 0,
                        autoplay: t.options.autoplay ? 1 : 0,
                        loop: t.options.loop ? 1 : 0,
                        muted: t.options.mute || 0 === t.options.volume ? 1 : 0
                    };
                    const i = t.constructor.parseURLHash(t.url);
                    if (i && (t.playerOptions.h = i), t.options.showControls || (t.playerOptions.controls = 0), !t.options.showControls && t.options.loop && t.options.autoplay && (t.playerOptions.background = 1), !t.$video) {
                        let e = "";
                        Object.keys(t.playerOptions).forEach((o => {
                            "" !== e && (e += "&"), e += `${o}=${encodeURIComponent(t.playerOptions[o])}`
                        })), t.$video = document.createElement("iframe"), t.$video.setAttribute("id", t.playerID), t.$video.setAttribute("src", `https://player.vimeo.com/video/${t.videoID}?${e}`), t.$video.setAttribute("frameborder", "0"), t.$video.setAttribute("mozallowfullscreen", ""), t.$video.setAttribute("allowfullscreen", ""), t.$video.setAttribute("title", "Vimeo video player"), t.options.accessibilityHidden && (t.$video.setAttribute("tabindex", "-1"), t.$video.setAttribute("aria-hidden", "true")), o.appendChild(t.$video), document.body.appendChild(o)
                    }
                    let n;
                    t.player = t.player || new a.Vimeo.Player(t.$video, t.playerOptions), t.options.mute || "number" != typeof t.options.volume || t.setVolume(t.options.volume), t.options.startTime && t.options.autoplay && t.player.setCurrentTime(t.options.startTime), t.player.getVideoWidth().then((e => {
                        t.videoWidth = e || 1280
                    })), t.player.getVideoHeight().then((e => {
                        t.videoHeight = e || 720
                    })), t.player.on("timeupdate", (e => {
                        n || (t.fire("started", e), n = 1), t.fire("timeupdate", e), t.options.endTime && e.seconds >= t.options.endTime && (t.options.loop ? t.play(t.options.startTime) : t.pause())
                    })), t.player.on("play", (e => {
                        t.fire("play", e), t.options.startTime && 0 === e.seconds && t.play(t.options.startTime)
                    })), t.player.on("pause", (e => {
                        t.fire("pause", e)
                    })), t.player.on("ended", (e => {
                        t.fire("ended", e)
                    })), t.player.on("loaded", (e => {
                        t.fire("ready", e)
                    })), t.player.on("volumechange", (e => {
                        t.getVolume((e => {
                            t.options.volume = e
                        })), t.fire("volumechange", e)
                    })), t.player.on("error", (e => {
                        t.fire("error", e)
                    })), e(t.$video)
                }))
            }
        },
        Local: class extends i {
            type = "local";
            static parseURL(e) {
                const t = e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/),
                    o = {};
                let i = 0;
                return t.forEach((e => {
                    const t = e.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                    t && t[1] && t[2] && (o["ogv" === t[1] ? "ogg" : t[1]] = t[2], i = 1)
                })), !!i && o
            }
            play(e) {
                const t = this;
                t.player && (void 0 !== e && (t.player.currentTime = e), t.player.paused && (t.options.endTime && !t.options.loop ? t.getCurrentTime((e => {
                    e < t.options.endTime && t.player.play()
                })) : t.player.play()))
            }
            pause() {
                const e = this;
                e.player && !e.player.paused && e.player.pause()
            }
            mute() {
                this.player && (this.$video.muted = !0)
            }
            unmute() {
                this.player && (this.$video.muted = !1)
            }
            setVolume(e = !1) {
                this.player && "number" == typeof e && (this.$video.volume = e / 100)
            }
            getVolume(e) {
                this.player ? e(100 * this.$video.volume) : e(!1)
            }
            getMuted(e) {
                this.player ? e(this.$video.muted) : e(null)
            }
            setCurrentTime(e = !1) {
                this.player && "number" == typeof e && (this.$video.currentTime = e)
            }
            getCurrentTime(e) {
                this.player && e(this.player.currentTime)
            }
            getImageURL(e) {
                const t = this;
                t.videoImage && e(t.videoImage)
            }
            getVideo(e) {
                const t = this;
                if (t.$video) return void e(t.$video);
                let o, i;
                t.$video || (o = document.createElement("div"), o.style.display = "none"), t.$video || (t.$video = document.createElement("video"), t.player = t.$video, t.options.showControls && (t.$video.controls = !0), "number" == typeof t.options.volume && t.setVolume(t.options.volume), t.options.mute && t.mute(), t.options.loop && (t.$video.loop = !0), t.$video.setAttribute("playsinline", ""), t.$video.setAttribute("webkit-playsinline", ""), t.options.accessibilityHidden && (t.$video.setAttribute("tabindex", "-1"), t.$video.setAttribute("aria-hidden", "true")), t.$video.setAttribute("id", t.playerID), o.appendChild(t.$video), document.body.appendChild(o), Object.keys(t.videoID).forEach((e => {
                    ! function(e, t, o) {
                        const i = document.createElement("source");
                        i.src = t, i.type = o, e.appendChild(i)
                    }(t.$video, t.videoID[e], `video/${e}`)
                }))), t.player.addEventListener("playing", (e => {
                    i || t.fire("started", e), i = 1
                })), t.player.addEventListener("timeupdate", (function(e) {
                    t.fire("timeupdate", e), t.options.endTime && this.currentTime >= t.options.endTime && (t.options.loop ? t.play(t.options.startTime) : t.pause())
                })), t.player.addEventListener("play", (e => {
                    t.fire("play", e)
                })), t.player.addEventListener("pause", (e => {
                    t.fire("pause", e)
                })), t.player.addEventListener("ended", (e => {
                    t.fire("ended", e)
                })), t.player.addEventListener("loadedmetadata", (function() {
                    t.videoWidth = this.videoWidth || 1280, t.videoHeight = this.videoHeight || 720, t.fire("ready"), t.options.autoplay && t.play(t.options.startTime)
                })), t.player.addEventListener("volumechange", (e => {
                    t.getVolume((e => {
                        t.options.volume = e
                    })), t.fire("volumechange", e)
                })), t.player.addEventListener("error", (e => {
                    t.fire("error", e)
                })), e(t.$video)
            }
        }
    }, y = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var c, v = y;

    function h(e = v.jarallax) {
        if (void 0 === e) return;
        const t = e.constructor,
            o = t.prototype.onScroll;
        t.prototype.onScroll = function() {
            const e = this;
            o.apply(e);
            !e.isVideoInserted && e.video && (!e.options.videoLazyLoading || e.isElementInViewport) && !e.options.disableVideo() && (e.isVideoInserted = !0, e.video.getVideo((t => {
                const o = t.parentNode;
                e.css(t, {
                    position: e.image.position,
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    maxHeight: "none",
                    pointerEvents: "none",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    margin: 0,
                    zIndex: -1
                }), e.$video = t, "local" === e.video.type && (e.image.src ? e.$video.setAttribute("poster", e.image.src) : e.image.$item && "IMG" === e.image.$item.tagName && e.image.$item.src && e.$video.setAttribute("poster", e.image.$item.src)), e.options.videoClass && e.$video.setAttribute("class", `${e.options.videoClass} ${e.options.videoClass}-${e.video.type}`), e.image.$container.appendChild(t), o.parentNode.removeChild(o), e.options.onVideoInsert && e.options.onVideoInsert.call(e)
            })))
        };
        const i = t.prototype.coverImage;
        t.prototype.coverImage = function() {
            const e = this,
                t = i.apply(e),
                o = !!e.image.$item && e.image.$item.nodeName;
            if (t && e.video && o && ("IFRAME" === o || "VIDEO" === o)) {
                let i = t.image.height,
                    a = i * e.image.width / e.image.height,
                    n = (t.container.width - a) / 2,
                    s = t.image.marginTop;
                t.container.width > a && (a = t.container.width, i = a * e.image.height / e.image.width, n = 0, s += (t.image.height - i) / 2), "IFRAME" === o && (i += 400, s -= 200), e.css(e.$video, {
                    width: `${a}px`,
                    marginLeft: `${n}px`,
                    height: `${i}px`,
                    marginTop: `${s}px`
                })
            }
            return t
        };
        const a = t.prototype.initImg;
        t.prototype.initImg = function() {
            const e = this,
                t = a.apply(e);
            return e.options.videoSrc || (e.options.videoSrc = e.$item.getAttribute("data-jarallax-video") || null), e.options.videoSrc ? (e.defaultInitImgResult = t, !0) : t
        };
        const n = t.prototype.canInitParallax;
        t.prototype.canInitParallax = function() {
            const e = this;
            let t = n.apply(e);
            if (!e.options.videoSrc) return t;
            const o = new m(e.options.videoSrc, {
                autoplay: !0,
                loop: e.options.videoLoop,
                showControls: !1,
                accessibilityHidden: !0,
                startTime: e.options.videoStartTime || 0,
                endTime: e.options.videoEndTime || 0,
                mute: !e.options.videoVolume,
                volume: e.options.videoVolume || 0
            });

            function i() {
                e.image.$default_item && (e.image.$item = e.image.$default_item, e.image.$item.style.display = "block", e.coverImage(), e.onScroll())
            }
            if (e.options.onVideoWorkerInit && e.options.onVideoWorkerInit.call(e, o), o.isValid())
                if (this.options.disableParallax() && (t = !0, e.image.position = "absolute", e.options.type = "scroll", e.options.speed = 1), t) {
                    if (o.on("ready", (() => {
                            if (e.options.videoPlayOnlyVisible) {
                                const t = e.onScroll;
                                e.onScroll = function() {
                                    t.apply(e), e.videoError || !e.options.videoLoop && (e.options.videoLoop || e.videoEnded) || (e.isVisible() ? o.play() : o.pause())
                                }
                            } else o.play()
                        })), o.on("started", (() => {
                            e.image.$default_item = e.image.$item, e.image.$item = e.$video, e.image.width = e.video.videoWidth || 1280, e.image.height = e.video.videoHeight || 720, e.coverImage(), e.onScroll(), e.image.$default_item && (e.image.$default_item.style.display = "none")
                        })), o.on("ended", (() => {
                            e.videoEnded = !0, e.options.videoLoop || i()
                        })), o.on("error", (() => {
                            e.videoError = !0, i()
                        })), e.video = o, !e.defaultInitImgResult && (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "local" !== o.type)) return o.getImageURL((t => {
                        e.image.bgImage = `url("${t}")`, e.init()
                    })), !1
                } else e.defaultInitImgResult || o.getImageURL((t => {
                    const o = e.$item.getAttribute("style");
                    o && e.$item.setAttribute("data-jarallax-original-styles", o), e.css(e.$item, {
                        "background-image": `url("${t}")`,
                        "background-position": "center",
                        "background-size": "cover"
                    })
                }));
            return t
        };
        const s = t.prototype.destroy;
        t.prototype.destroy = function() {
            const e = this;
            e.image.$default_item && (e.image.$item = e.image.$default_item, delete e.image.$default_item), s.apply(e)
        }
    }
    return h(), c = () => {
        void 0 !== v.jarallax && v.jarallax(document.querySelectorAll("[data-jarallax-video]"))
    }, "complete" === document.readyState || "interactive" === document.readyState ? c() : document.addEventListener("DOMContentLoaded", c, {
        capture: !0,
        once: !0,
        passive: !0
    }), v.VideoWorker || (v.VideoWorker = m), h
})); //# sourceMappingURL=jarallax-video.min.js.map