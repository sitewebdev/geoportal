/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/ol-contextmenu@5.3.0/dist/ol-contextmenu.iife.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */

/*!
* ol-contextmenu - v5.3.0
* https://github.com/jonataswalker/ol-contextmenu
* Built: Fri Sep 22 2023 13:13:39 GMT-0300 (Brasilia Standard Time)
*/

var ContextMenu = function (E, h) {
    "use strict";
    var P = Object.defineProperty;
    var H = (E, h, d) => h in E ? P(E, h, {enumerable: !0, configurable: !0, writable: !0, value: d}) : E[h] = d;
    var a = (E, h, d) => (H(E, typeof h != "symbol" ? h + "" : h, d), d);
    var d = {exports: {}};

    function x() {
    }

    x.prototype = {
        on: function (s, t, e) {
            var n = this.e || (this.e = {});
            return (n[s] || (n[s] = [])).push({fn: t, ctx: e}), this
        }, once: function (s, t, e) {
            var n = this;

            function o() {
                n.off(s, o), t.apply(e, arguments)
            }

            return o._ = t, this.on(s, o, e)
        }, emit: function (s) {
            var t = [].slice.call(arguments, 1), e = ((this.e || (this.e = {}))[s] || []).slice(), n = 0, o = e.length;
            for (n; n < o; n++) e[n].fn.apply(e[n].ctx, t);
            return this
        }, off: function (s, t) {
            var e = this.e || (this.e = {}), n = e[s], o = [];
            if (n && t) for (var i = 0, l = n.length; i < l; i++) n[i].fn !== t && n[i].fn._ !== t && o.push(n[i]);
            return o.length ? e[s] = o : delete e[s], this
        }
    }, d.exports = x;
    var T = d.exports.TinyEmitter = x,
        L = (s => (s.CONTEXTMENU = "contextmenu", s.CLICK = "click", s.DBLCLICK = "dblclick", s))(L || {}),
        p = (s => (s.BEFOREOPEN = "beforeopen", s.OPEN = "open", s.CLOSE = "close", s.ADD_MENU_ENTRY = "add-menu-entry", s))(p || {});

    class S extends h {
        constructor(t) {
            super(t.type, t.map, t.originalEvent)
        }
    }

    const k = {width: 150, scrollAt: 4, eventType: L.CONTEXTMENU, defaultItems: !0, items: []}, m = "ol-ctx-menu", r = {
        namespace: m,
        container: `${m}-container`,
        separator: `${m}-separator`,
        submenu: `${m}-submenu`,
        hidden: `${m}-hidden`,
        icon: `${m}-icon`,
        zoomIn: `${m}-zoom-in`,
        zoomOut: `${m}-zoom-out`,
        unselectable: "ol-unselectable"
    }, A = [{
        text: "Zoom In", classname: `${r.zoomIn} ${r.icon}`, callback: (s, t) => {
            const e = t.getView();
            e.animate({zoom: Number(e.getZoom()) + 1, duration: 700, center: s.coordinate})
        }
    }, {
        text: "Zoom Out", classname: `${r.zoomOut} ${r.icon}`, callback: (s, t) => {
            const e = t.getView();
            e.animate({zoom: Number(e.getZoom()) - 1, duration: 700, center: s.coordinate})
        }
    }];

    function b(s) {
        const t = document.createDocumentFragment(), e = document.createElement("div");
        for (e.innerHTML = s; e.firstChild;) t.append(e.firstChild);
        return t
    }

    function I(s) {
        const t = document.importNode(s), e = s.offsetWidth;
        t.style.cssText = `position: fixed; top: 0; left: 0; overflow: auto; visibility: hidden; pointer-events: none; height: unset; max-height: unset; width: ${e}px`;
        const n = b("<span>Foo</span>"), o = b("<span>Foo</span>"), i = document.createElement("li"),
            l = document.createElement("li");
        i.append(n), l.append(o), t.append(i), t.append(l), s.parentNode?.append(t);
        const c = t.offsetHeight / 2;
        return s.parentNode?.removeChild(t), c
    }

    function $({parentNode: s, item: t, isSubmenu: e = !1, isInsideSubmenu: n = !1, emitter: o}) {
        const i = `_${Math.random().toString(36).slice(2, 11)}`;
        if (typeof t != "string" && "text" in t) {
            const v = `<span>${t.text}</span>`, g = b(v), f = document.createElement("li");
            t.classname = t.classname || "", t.icon && (t.classname === "" ? t.classname = r.icon : t.classname.includes(r.icon) === !1 && (t.classname += ` ${r.icon}`), f.setAttribute("style", `background-image:url(${t.icon})`)), f.id = i, f.className = t.classname, f.append(g), s.append(f);
            const N = {
                id: i,
                isSubmenu: e,
                isInsideSubmenu: n,
                isSeparator: !1,
                callback: "callback" in t ? t.callback : null,
                data: "data" in t ? t.data : null
            };
            return o.emit(p.ADD_MENU_ENTRY, N, f), f
        }
        const l = `<li id="${i}" class="${r.separator}"><hr></li>`, c = b(l);
        s.append(c);
        const y = s.lastChild,
            M = {id: i, isSubmenu: !1, isInsideSubmenu: !1, isSeparator: !0, callback: null, data: null};
        return o.emit(p.ADD_MENU_ENTRY, M, y), y
    }

    function w({container: s, items: t, menuWidth: e, isInsideSubmenu: n, emitter: o}) {
        t.forEach(i => {
            if (typeof i != "string" && "items" in i && Array.isArray(i.items)) {
                const l = $({parentNode: s, item: i, isSubmenu: !0, emitter: o});
                l.classList.add(r.submenu);
                const c = document.createElement("ul");
                c.classList.add(r.container), c.style.width = `${e}px`, l.append(c), w({
                    emitter: o,
                    menuWidth: e,
                    container: c,
                    items: i.items,
                    isInsideSubmenu: !0
                })
            } else $({parentNode: s, item: i, isSubmenu: !1, isInsideSubmenu: n, emitter: o})
        })
    }

    const U = "";

    function C(s, t) {
        if (!s) throw new Error(t)
    }

    class O extends E {
        constructor(e = {}) {
            C(typeof e == "object", "@param `opts` should be object type!");
            const n = document.createElement("div");
            super({element: n});
            a(this, "map");
            a(this, "emitter", new T);
            a(this, "container");
            a(this, "coordinate", []);
            a(this, "pixel", []);
            a(this, "contextMenuEventListener");
            a(this, "entryCallbackEventListener");
            a(this, "mapMoveListener");
            a(this, "lineHeight", 0);
            a(this, "disabled");
            a(this, "opened");
            a(this, "items", []);
            a(this, "menuEntries", new Map);
            a(this, "options");
            this.options = {...k, ...e};
            const o = document.createElement("ul");
            n.append(o), n.style.width = `${this.options.width}px`, n.classList.add(r.container, r.unselectable, r.hidden), this.container = n, this.contextMenuEventListener = i => {
                this.handleContextMenu(i)
            }, this.entryCallbackEventListener = i => {
                this.handleEntryCallback(i)
            }, this.mapMoveListener = () => {
                this.handleMapMove()
            }, this.disabled = !1, this.opened = !1, window.addEventListener("beforeunload", () => {
                this.removeListeners()
            }, {once: !0})
        }

        clear() {
            for (const e of this.menuEntries.keys()) this.removeMenuEntry(e);
            this.container.replaceChildren(), this.container.append(document.createElement("ul"))
        }

        enable() {
            this.disabled = !1
        }

        disable() {
            this.disabled = !0
        }

        getDefaultItems() {
            return A
        }

        countItems() {
            return this.menuEntries.size
        }

        extend(e) {
            C(Array.isArray(e), "@param `items` should be an Array."), w({
                items: e,
                emitter: this.emitter,
                menuWidth: this.options.width,
                container: this.container.firstElementChild
            })
        }

        closeMenu() {
            this.opened = !1, this.container.classList.add(r.hidden), this.dispatchEvent(p.CLOSE)
        }

        isOpen() {
            return this.opened
        }

        updatePosition(e) {
            C(Array.isArray(e), "@param `pixel` should be an Array."), this.isOpen() && (this.pixel = e, this.positionContainer())
        }

        pop() {
            const e = Array.from(this.menuEntries.keys()).pop();
            e && this.removeMenuEntry(e)
        }

        shift() {
            const e = Array.from(this.menuEntries.keys()).shift();
            e && this.removeMenuEntry(e)
        }

        push(e) {
            e && this.extend([e])
        }

        setMap(e) {
            if (super.setMap(e), e) {
                this.map = e, e.getViewport().addEventListener(this.options.eventType, this.contextMenuEventListener, !1), e.on("movestart", () => {
                    this.handleMapMove()
                }), this.emitter.on(p.ADD_MENU_ENTRY, (o, i) => {
                    this.handleAddMenuEntry(o, i)
                }, this), this.items = this.options.defaultItems ? this.options.items.concat(A) : this.options.items, w({
                    items: this.items,
                    emitter: this.emitter,
                    menuWidth: this.options.width,
                    container: this.container.firstElementChild
                });
                const n = this.getMenuEntriesLength();
                this.lineHeight = n > 0 ? this.container.offsetHeight / n : I(this.container)
            } else this.removeListeners(), this.clear()
        }

        removeListeners() {
            this.map.getViewport().removeEventListener(this.options.eventType, this.contextMenuEventListener, !1), this.emitter.off(p.ADD_MENU_ENTRY)
        }

        removeMenuEntry(e) {
            let n = document.getElementById(e);
            n?.remove(), n = null, this.menuEntries.delete(e)
        }

        handleContextMenu(e) {
            this.coordinate = this.map.getEventCoordinate(e), this.pixel = this.map.getEventPixel(e), this.dispatchEvent(new S({
                map: this.map,
                originalEvent: e,
                type: p.BEFOREOPEN
            })), !this.disabled && (this.options.eventType === L.CONTEXTMENU && (e.stopPropagation(), e.preventDefault()), setTimeout(() => {
                this.openMenu(e)
            }), e.target?.addEventListener("pointerdown", n => {
                this.opened && (n.stopPropagation(), this.closeMenu())
            }, {once: !0}))
        }

        openMenu(e) {
            this.opened = !0, this.positionContainer(), this.container.classList.remove(r.hidden), this.dispatchEvent(new S({
                map: this.map,
                originalEvent: e,
                type: p.OPEN
            }))
        }

        getMenuEntriesLength() {
            return Array.from(this.menuEntries).filter(([, e]) => e.isSeparator === !1 && e.isSubmenu === !1 && e.isInsideSubmenu === !1).length
        }

        positionContainer() {
            const e = this.map.getSize() || [0, 0], n = {w: e[0] - this.pixel[0], h: e[1] - this.pixel[1]},
                o = this.getMenuEntriesLength(),
                i = {w: this.container.offsetWidth, h: Math.round(this.lineHeight * o)},
                l = n.w >= i.w ? this.pixel[0] + 5 : this.pixel[0] - i.w;
            this.container.style.left = `${l}px`, this.container.style.top = n.h >= i.h ? `${this.pixel[1] - 10}px` : `${this.pixel[1] - i.h}px`, this.container.style.right = "auto", this.container.style.bottom = "auto", n.w -= i.w;
            const c = v => Array.from(v.children).filter(g => g.tagName === "LI" && g.classList.contains(r.submenu));
            let y = 0;
            const M = (v, g) => {
                y += 1, c(v).forEach(N => {
                    const D = g >= i.w ? i.w - 8 : (i.w + 8) * -1, u = N.querySelector(`ul.${r.container}`),
                        _ = Math.round(this.lineHeight * Array.from(u.children).filter(z => z.tagName === "LI").length);
                    u.style.left = `${D}px`, u.style.right = "auto", u.style.top = n.h >= _ + i.h ? "0" : `-${u.offsetHeight - 25}px`, u.style.bottom = "auto", u.style.zIndex = String(y), c(u).length > 0 && M(u, g - i.w)
                })
            };
            M(this.container.firstElementChild, n.w)
        }

        handleMapMove() {
            this.closeMenu()
        }

        handleEntryCallback(e) {
            e.preventDefault(), e.stopPropagation();
            const n = e.currentTarget, o = this.menuEntries.get(n.id);
            if (!o) return;
            const i = {data: o.data, coordinate: this.coordinate};
            this.closeMenu(), o.callback?.(i, this.map)
        }

        handleAddMenuEntry(e, n) {
            this.menuEntries.set(e.id, e), this.positionContainer(), "callback" in e && typeof e.callback == "function" && n.addEventListener("click", this.entryCallbackEventListener, !1)
        }
    }

    return O
}(ol.control.Control, ol.MapBrowserEvent);