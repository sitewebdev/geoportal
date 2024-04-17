/*! For license information please see formio.embed.min.js.LICENSE.txt */
!function (e, i) {
    "object" == typeof exports && "object" == typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define([], i) : "object" == typeof exports ? exports.Formio = i() : e.Formio = i()
}(self, (function () {
    return function () {
        "use strict";
        var e = {
            36310: function (e, i) {
                Object.defineProperty(i, "__esModule", {value: !0}), i.default = class {
                    constructor(e) {
                        this.baseUrl = e || "https://cdn.form.io", this.overrides = {}, this.libs = {
                            js: "",
                            ace: "1.4.12",
                            bootstrap: "4.6.2",
                            ckeditor: "19.0.0",
                            flatpickr: "4.6.8",
                            "flatpickr-formio": "4.6.13-formio.3",
                            "font-awesome": "4.7.0",
                            grid: "latest",
                            "moment-timezone": "latest",
                            quill: "2.0.0-dev.3",
                            "shortcut-buttons-flatpickr": "0.4.0",
                            uswds: "2.4.8",
                            core: ""
                        }, this.updateUrls()
                    }

                    getVersion(e) {
                        return this.libs[e]
                    }

                    setVersion(e, i) {
                        this.libs[e] = i, this.updateUrls()
                    }

                    setBaseUrl(e) {
                        this.baseUrl = e, this.updateUrls()
                    }

                    setOverrideUrl(e, i) {
                        this.overrides[e] = i, this.updateUrls()
                    }

                    removeOverride(e) {
                        delete this.overrides[e], this.updateUrls()
                    }

                    removeOverrides() {
                        this.overrides = {}, this.updateUrls()
                    }

                    buildUrl(e, i, o) {
                        let t;
                        return t = "latest" === o || "" === o ? `${e}/${i}` : `${e}/${i}/${o}`, t
                    }

                    updateUrls() {
                        for (const e in this.libs) e in this.overrides ? this[e] = this.buildUrl(this.overrides[e], e, this.libs[e]) : this[e] = this.buildUrl(this.baseUrl, e, this.libs[e])
                    }
                }
            }, 4481: function (e, i, o) {
                var t = this && this.__awaiter || function (e, i, o, t) {
                    return new (o || (o = Promise))((function (s, r) {
                        function n(e) {
                            try {
                                d(t.next(e))
                            } catch (e) {
                                r(e)
                            }
                        }

                        function l(e) {
                            try {
                                d(t.throw(e))
                            } catch (e) {
                                r(e)
                            }
                        }

                        function d(e) {
                            var i;
                            e.done ? s(e.value) : (i = e.value, i instanceof o ? i : new o((function (e) {
                                e(i)
                            }))).then(n, l)
                        }

                        d((t = t.apply(e, i || [])).next())
                    }))
                }, s = this && this.__importDefault || function (e) {
                    return e && e.__esModule ? e : {default: e}
                };
                Object.defineProperty(i, "__esModule", {value: !0}), i.FormBuilder = i.Form = i.Formio = void 0;
                const r = s(o(36310));

                class n {
                    static setBaseUrl(e) {
                        return t(this, void 0, void 0, (function* () {
                            n.baseUrl = e
                        }))
                    }

                    static setProjectUrl(e) {
                        return t(this, void 0, void 0, (function* () {
                            n.projectUrl = e
                        }))
                    }

                    static debug(...e) {
                        n.config.debug && console.log(...e)
                    }

                    static clearCache() {
                        n.FormioClass && n.FormioClass.clearCache()
                    }

                    static global(e) {
                        const i = window[e];
                        return i && i.proxy ? null : (n.debug(`Getting global ${e}`, i), i)
                    }

                    static createElement(e, i, o) {
                        const t = document.createElement(e);
                        return Object.keys(i).forEach((e => {
                            t.setAttribute(e, i[e])
                        })), (o || []).forEach((e => {
                            t.appendChild(n.createElement(e.tag, e.attrs, e.children))
                        })), t
                    }

                    static addScript(e, i, o) {
                        return t(this, void 0, void 0, (function* () {
                            return i ? "string" != typeof i && i.length ? Promise.all(i.map((i => n.addScript(e, i)))) : o && n.global(o) ? (n.debug(`${o} already loaded.`), Promise.resolve(n.global(o))) : (n.debug("Adding Script", i), e.appendChild(n.createElement("script", {src: i})), o ? new Promise((e => {
                                n.debug(`Waiting to load ${o}`);
                                const i = setInterval((() => {
                                    n.global(o) && (clearInterval(i), n.debug(`${o} loaded.`), e(n.global(o)))
                                }), 100)
                            })) : Promise.resolve()) : Promise.resolve()
                        }))
                    }

                    static addStyles(e, i) {
                        return t(this, void 0, void 0, (function* () {
                            i && ("string" != typeof i && i.length ? i.forEach((i => n.addStyles(e, i))) : (n.debug("Adding Styles", i), e.appendChild(n.createElement("link", {
                                rel: "stylesheet",
                                href: i
                            }))))
                        }))
                    }

                    static submitDone(e, i) {
                        return t(this, void 0, void 0, (function* () {
                            n.debug("Submision Complete", i);
                            const o = (n.config.success || "").toString();
                            o && "false" !== o.toLowerCase() && e.element && (e.element.innerHTML = `<div class="alert-success" role="alert">${o}</div>`);
                            let t = n.config.redirect;
                            if (!t && e._form && e._form.settings && (e._form.settings.returnUrl || e._form.settings.redirect) && (n.debug("Return url found in form configuration"), t = e._form.settings.returnUrl || e._form.settings.redirect), t) {
                                const o = e.formio ? e.formio.formUrl : "", s = !!t.match(/\?/),
                                    r = 0 === t.indexOf(location.origin);
                                t += s ? "&" : "?", t += `sub=${i._id}`, !r && o && (t += `&form=${encodeURIComponent(o)}`), n.debug("Return URL", t), window.location.href = t, r && window.location.reload()
                            }
                        }))
                    }

                    static formioScript(e, i) {
                        return n.fullAdded || i ? (n.fullAdded = !0, e.replace("formio.form", "formio.full")) : e
                    }

                    static init(e, i = !1) {
                        return t(this, void 0, void 0, (function* () {
                            n.cdn = new r.default(n.config.cdn), n.config.libs = n.config.libs || {
                                uswds: {
                                    fa: !0,
                                    js: `${n.cdn.uswds}/uswds.min.js`,
                                    css: `${n.cdn.uswds}/uswds.min.css`
                                },
                                fontawesome: {css: `${n.cdn["font-awesome"]}/css/font-awesome.min.css`},
                                bootstrap: {css: `${n.cdn.bootstrap}/css/bootstrap.min.css`}
                            };
                            const o = n.config.id || `formio-${Math.random().toString(36).substring(7)}`,
                                t = n.createElement("div", {id: `"${o}-wrapper"`});
                            if (e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e), t.appendChild(e), yield n.addStyles(t, n.config.embedCSS || `${n.cdn.js}/formio.embed.css`), t.appendChild(n.createElement("div", {class: "formio-loader"}, [{
                                tag: "div",
                                attrs: {class: "loader-wrapper"},
                                children: [{tag: "div", attrs: {class: "loader text-center"}}]
                            }])), n.FormioClass = yield n.addScript(t, n.formioScript(n.config.script || `${n.cdn.js}/formio.form.min.js`, i), "Formio"), n.FormioClass.setBaseUrl(n.baseUrl || n.config.base), n.FormioClass.setProjectUrl(n.projectUrl || n.config.project), n.FormioClass.language = n.language, n.global("premium") && (n.debug("Using premium module."), n.FormioClass.use(n.global("premium"))), n.global("vpat") && (n.debug("Using vpat module."), n.FormioClass.use(n.global("vpat"))), n.config.template) {
                                if (n.config.includeLibs && (yield n.addStyles(t, n.config.libs[n.config.template].css), yield n.addScript(t, n.config.libs[n.config.template].js), n.config.libs[n.config.template].fa && (yield n.addStyles(t, n.config.libs.fontawesome.css))), n.cdn[n.config.template]) {
                                    const e = `${n.cdn[n.config.template]}/${n.config.template}.min`;
                                    yield n.addStyles(t, `${e}.css`), n.debug(`Using ${n.config.template}`), n.FormioClass.use(yield n.addScript(t, `${e}.js`, n.config.template))
                                }
                            } else n.global("uswds") ? (n.debug("Using uswds module."), n.FormioClass.use(n.global("uswds"))) : n.config.includeLibs && (yield n.addStyles(t, n.config.libs.fontawesome.css), yield n.addStyles(t, n.config.libs.bootstrap.css));
                            return n.config.premium && (yield n.addStyles(t, n.config.premium.css), n.debug("Using premium"), n.FormioClass.use(yield n.addScript(t, n.config.premium.js, "premium"))), yield n.addStyles(t, n.formioScript(n.config.style || `${n.cdn.js}/formio.form.min.css`, i)), n.config.before && (yield n.config.before(n.FormioClass, e, n.config)), n.FormioClass.license = !0, t
                        }))
                    }

                    static createForm(e, i, o) {
                        return t(this, void 0, void 0, (function* () {
                            const t = yield n.init(e);
                            return n.FormioClass.createForm(e, i, Object.assign(Object.assign({}, o), {noLoader: !0})).then((e => (n.debug("Form created", e), n.debug("Removing loader"), t.removeChild(t.querySelector(".formio-loader")), n.config.submission && (n.debug("Setting submission", n.config.submission), e.submission = n.config.submission), n.debug("Triggering embed event"), n.FormioClass.events.emit("formEmbedded", e), n.config.after && (n.debug("Calling ready callback"), n.config.after(e, n.config)), e)))
                        }))
                    }

                    static builder(e, i, o) {
                        return t(this, void 0, void 0, (function* () {
                            const t = yield n.init(e, !0);
                            return n.FormioClass.builder(e, i, o).then((e => (n.debug("Builder created", e), n.debug("Removing loader"), t.removeChild(t.querySelector(".formio-loader")), n.debug("Triggering embed event"), n.FormioClass.events.emit("builderEmbedded", e), n.config.after && (n.debug("Calling ready callback"), n.config.after(e, n.config)), e)))
                        }))
                    }
                }

                n.config = {}, n.cdn = null, n.proxy = !0, n.version = "5.0.0-rc.27", i.Formio = n;

                class l {
                    constructor(e, i, o) {
                        this.form = i, this.element = e, this.options = o || {}, this.init(), this.instance = {
                            proxy: !0,
                            ready: this.ready,
                            destroy: () => {
                            }
                        }
                    }

                    init() {
                        this.element.innerHTML = "", this.ready = this.create().then((e => (this.instance = e, this.form = e.form, e)))
                    }

                    create() {
                        return n.createForm(this.element, this.form, this.options)
                    }

                    setDisplay(e) {
                        return this.instance.proxy || (this.form.display = e, this.init()), this.ready
                    }
                }

                i.Form = l;

                class d extends l {
                    create() {
                        return n.builder(this.element, this.form, this.options)
                    }
                }

                i.FormBuilder = d, n.Form = l, n.FormBuilder = d
            }
        }, i = {};

        function o(t) {
            var s = i[t];
            if (void 0 !== s) return s.exports;
            var r = i[t] = {exports: {}};
            return e[t].call(r.exports, r, r.exports, o), r.exports
        }

        var t = {};
        return function () {
            var e = t;
            e.Formio = void 0;
            const i = o(4481);
            Object.defineProperty(e, "Formio", {
                enumerable: !0, get: function () {
                    return i.Formio
                }
            });
            const s = document.getElementsByTagName("script"), r = window.FormioConfig || {};
            let n = null, l = s.length;
            const d = r.scriptName || "formio.embed.";
            for (; l--;) if (s[l].src && -1 !== s[l].src.indexOf(d)) {
                n = s[l];
                break
            }
            if (n) {
                const e = {};
                n.src.replace(/^[^?]+\??/, "").replace(/\?/g, "&").split("&").forEach((i => {
                    e[i.split("=")[0]] = i.split("=")[1] && decodeURIComponent(i.split("=")[1])
                }));
                let o = n.src.replace(/^([^?]+).*/, "$1").split("/");
                o.pop(), r.formioPath && r.formioPath(o), o = o.join("/"), i.Formio.config = Object.assign({
                    script: e.script || `${r.updatePath ? r.updatePath() : o}/formio.form.min.js`,
                    style: e.styles || `${r.updatePath ? r.updatePath() : o}/formio.form.min.css`,
                    cdn: e.cdn,
                    class: e.class || "formio-form-wrapper",
                    src: e.src,
                    form: null,
                    submission: null,
                    project: e.project,
                    base: e.base || "https://api.form.io",
                    submit: e.submit,
                    includeLibs: "true" === e.libs || "1" === e.libs,
                    template: e.template,
                    debug: "true" === e.debug || "1" === e.debug,
                    config: {},
                    redirect: e.return || e.redirect,
                    embedCSS: `${r.updatePath ? r.updatePath() : o}/formio.embed.css`,
                    success: e.success || "Thank you for your submission!",
                    before: null,
                    after: null
                }, r);
                const t = i.Formio.config.form || i.Formio.config.src;
                if (t) {
                    i.Formio.debug("Embedding Configuration", r), i.Formio.config.addPremiumLib && i.Formio.config.addPremiumLib(i.Formio.config, o), i.Formio.config.id = `formio-${Math.random().toString(36).substring(7)}`, i.Formio.debug("Creating form element");
                    const e = i.Formio.createElement("div", {id: i.Formio.config.id, class: i.Formio.config.class});
                    n.parentNode.insertBefore(e, n.parentNode.firstElementChild.nextSibling), i.Formio.createForm(e, t, i.Formio.config.config).then((e => {
                        i.Formio.config.submit && (e.nosubmit = !0), e.on("submit", (o => {
                            if (i.Formio.debug("on('submit')", o), i.Formio.config.submit) {
                                i.Formio.debug(`Sending submission to ${i.Formio.config.submit}`);
                                const t = {"content-type": "application/json"}, s = i.Formio.FormioClass.getToken();
                                s && (t["x-jwt-token"] = s), i.Formio.FormioClass.fetch(i.Formio.config.submit, {
                                    body: JSON.stringify(o),
                                    headers: t,
                                    method: "POST",
                                    mode: "cors"
                                }).then((e => e.json())).then((o => i.Formio.submitDone(e, o)))
                            } else i.Formio.submitDone(e, o)
                        }))
                    }))
                }
            } else document.write("<span>Could not locate the Embedded form.</span>")
        }(), t.Formio
    }()
}));