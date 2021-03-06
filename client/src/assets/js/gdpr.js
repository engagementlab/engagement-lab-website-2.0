!(function (e) {
    let o = !1;
    if (
        (typeof define === 'function' && define.amd && (define(e), (o = !0)),
        typeof exports === 'object' && ((module.exports = e()), (o = !0)),
        !o)
    ) {
        const t = window.Cookies;
        const n = (window.Cookies = e());
        n.noConflict = function () {
            return (window.Cookies = t), n;
        };
    }
}(() => {
    function k() {
        for (var e = 0, o = {}; e < arguments.length; e++) {
            const t = arguments[e];
            for (const n in t) o[n] = t[n];
        }
        return o;
    }
    return (function e(p) {
        function f(e, o, t) {
            let n;
            if (typeof document !== 'undefined') {
                if (arguments.length > 1) {
                    if (
                        typeof (t = k(
                            {
                                path: '/',
                            },
                            f.defaults,
                            t,
                        )).expires
                        === 'number'
                    ) {
                        const i = new Date();
                        i.setMilliseconds(i.getMilliseconds() + 864e5 * t.expires), (t.expires = i);
                    }
                    t.expires = t.expires ? t.expires.toUTCString() : '';
                    try {
                        (n = JSON.stringify(o)), /^[\{\[]/.test(n) && (o = n);
                    } catch (e) {}
                    (o = p.write
                        ? p.write(o, e)
                        : encodeURIComponent(String(o)).replace(
                            /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                            decodeURIComponent,
                        )),
                    (e = (e = (e = encodeURIComponent(String(e))).replace(
                        /%(23|24|26|2B|5E|60|7C)/g,
                        decodeURIComponent,
                    )).replace(/[\(\)]/g, escape));
                    let c = '';
                    for (const a in t) t[a] && ((c += `; ${a}`), !0 !== t[a] && (c += `=${t[a]}`));
                    return (document.cookie = `${e}=${o}${c}`);
                }
                e || (n = {});
                for (
                    let r = document.cookie ? document.cookie.split('; ') : [], s = /(%[0-9A-Z]{2})+/g, d = 0;
                    d < r.length;
                    d++
                ) {
                    const l = r[d].split('=');
                    let m = l.slice(1).join('=');
                    this.json || m.charAt(0) !== '"' || (m = m.slice(1, -1));
                    try {
                        const u = l[0].replace(s, decodeURIComponent);
                        if (((m = p.read ? p.read(m, u) : p(m, u) || m.replace(s, decodeURIComponent)), this.json)) {
                            try {
                                m = JSON.parse(m);
                            } catch (e) {}
                        }
                        if (e === u) {
                            n = m;
                            break;
                        }
                        e || (n[u] = m);
                    } catch (e) {}
                }
                return n;
            }
        }
        return (
            ((f.set = f).get = function (e) {
                return f.call(f, e);
            }),
            (f.getJSON = function () {
                return f.apply(
                    {
                        json: !0,
                    },
                    [].slice.call(arguments),
                );
            }),
            (f.defaults = {}),
            (f.remove = function (e, o) {
                f(
                    e,
                    '',
                    k(o, {
                        expires: -1,
                    }),
                );
            }),
            (f.withConverter = e),
            f
        );
    }(() => {}));
})),
(window['gdpr-cookie-notice-templates'] = {}),
(window['gdpr-cookie-notice-templates']['bar.html'] = '<div class="gdpr-cookie-notice">\n  <p class="gdpr-cookie-notice-description">{description}</p>\n  <nav class="gdpr-cookie-notice-nav">\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-settings">{settings}</a>\n    <a href="#" class="gdpr-cookie-notice-nav-item gdpr-cookie-notice-nav-item-accept gdpr-cookie-notice-nav-item-btn">{accept}</a>\n  </nav>\n</div>\n'),
(window['gdpr-cookie-notice-templates']['category.html'] = '<li class="gdpr-cookie-notice-modal-cookie">\n  <div class="gdpr-cookie-notice-modal-cookie-row">\n    <h3 class="gdpr-cookie-notice-modal-cookie-title">{title}</h3>\n    <input type="checkbox" name="gdpr-cookie-notice-{prefix}" checked="checked" id="gdpr-cookie-notice-{prefix}" class="gdpr-cookie-notice-modal-cookie-input">\n    <label class="gdpr-cookie-notice-modal-cookie-input-switch" for="gdpr-cookie-notice-{prefix}"></label>\n  </div>\n  <p class="gdpr-cookie-notice-modal-cookie-info">{desc}</p>\n</li>\n'),
(window['gdpr-cookie-notice-templates']['modal.html'] = '<div class="gdpr-cookie-notice-modal">\n  <div class="gdpr-cookie-notice-modal-content">\n    <div class="gdpr-cookie-notice-modal-header">\n      <h2 class="gdpr-cookie-notice-modal-title">{settings}</h2>\n      <button type="button" class="gdpr-cookie-notice-modal-close"></button>\n    </div>\n    <ul class="gdpr-cookie-notice-modal-cookies"></ul>\n    <div class="gdpr-cookie-notice-modal-footer">\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-statement">{statement}</a>\n      <a href="#" class="gdpr-cookie-notice-modal-footer-item gdpr-cookie-notice-modal-footer-item-save gdpr-cookie-notice-modal-footer-item-btn"><span>{save}</span></a>\n    </div>\n  </div>\n</div>\n');
const gdprCookieNoticeLocales = {};

function gdprCookieNotice(c) {
    const n = 'gdprcookienotice';
    const a = 'gdpr-cookie-notice';
    const r = window[`${a}-templates`];
    const i = Cookies.noConflict();
    let s = !1;
    let d = !1;
    let l = !1;
    const m = ['performance', 'analytics', 'marketing'];
    c.locale || (c.locale = 'en'),
    c.timeout || (c.timeout = 500),
    c.domain || (c.domain = null),
    c.expiration || (c.expiration = 30);
    const u = i.getJSON(n);
    let p = new CustomEvent('gdprCookiesEnabled', {
        detail: u,
    });

    function f(e) {
        for (var o = !1, t = 0; t < m.length; t++) if (c[m[t]] && !e[m[t]]) for (let n = 0; n < c[m[t]].length; n++) i.remove(c[m[t]][n]), (o = !0);
        o ? g() : document.documentElement.classList.remove(`${a}-loaded`);
    }

    function k(e) {
        const o = {
            date: new Date(),
            necessary: !0,
            performance: !0,
            analytics: !0,
            marketing: !0,
        };
        if (e) for (let t = 0; t < m.length; t++) o[m[t]] = document.getElementById(`${a}-cookie_${m[t]}`).checked;
        i.set(n, o, {
            expires: c.expiration,
            domain: c.domain,
        }),
        f(o),
        (p = new CustomEvent('gdprCookiesEnabled', {
            detail: o,
        })),
        document.dispatchEvent(p);
    }

    function e() {
        if (d) return !1;
        let e;
        let o;
        const t = v('bar.html');
        document.body.insertAdjacentHTML('beforeend', t),
        (e = document.querySelectorAll(`.${a}-nav-item-settings`)[0]),
        (o = document.querySelectorAll(`.${a}-nav-item-accept`)[0]),
        e.addEventListener('click', (e) => {
            e.preventDefault(), h();
        }),
        o.addEventListener('click', (e) => {
            e.preventDefault(), k();
        }),
        (d = !0);
    }

    function g() {
        e(),
        setTimeout(() => {
            document.documentElement.classList.add(`${a}-loaded`);
        }, c.timeout);
    }

    function v(e, t) {
        const o = r[e];
        const n = gdprCookieNoticeLocales[c.locale];
        if ((t ? (t += '_') : (t = ''), !(typeof o === 'string' && n instanceof Object))) return !1;
        for (const i in n) {
            return o.replace(/({([^}]+)})/g, (e) => {
                const o = e.replace(/{/, '').replace(/}/, '');
                return o == 'prefix' ? t.slice(0, -1) : n[o] ? n[o] : n[t + o] ? n[t + o] : e;
            });
        }
    }

    function o() {
        if (s) return !1;
        const e = v('modal.html');
        document.body.insertAdjacentHTML('beforeend', e);
        const o = document.querySelector(`.${a}-modal-cookies`);
        o.innerHTML += v('category.html', 'cookie_essential');
        const t = document.querySelector(`.${a}-modal-cookie-input`);
        const n = document.querySelector(`.${a}-modal-cookie-input-switch`);
        (n.innerHTML = gdprCookieNoticeLocales[c.locale].always_on),
        n.classList.add(`${a}-modal-cookie-state`),
        n.classList.remove(`${a}-modal-cookie-input-switch`),
        t.remove(),
        c.performance && (o.innerHTML += v('category.html', 'cookie_performance')),
        c.analytics && (o.innerHTML += v('category.html', 'cookie_analytics')),
        c.marketing && (o.innerHTML += v('category.html', 'cookie_marketing')),
        (function () {
            const e = document.querySelectorAll(`.${a}-modal-close`)[0];
            const o = document.querySelectorAll(`.${a}-modal-footer-item-statement`)[0];
            const t = document.querySelectorAll(`.${a}-modal-cookie-title`);
            const n = document.querySelectorAll(`.${a}-modal-footer-item-save`)[0];
            e.addEventListener('click', () => (document.documentElement.classList.remove(`${a}-show-modal`), !1)),
            o.addEventListener('click', (e) => {
                e.preventDefault(), (window.location.href = c.statement);
            });
            for (let i = 0; i < t.length; i++) {
                t[i].addEventListener('click', function () {
                    return this.parentNode.parentNode.classList.toggle('open'), !1;
                });
            }
            n.addEventListener('click', (e) => {
                e.preventDefault(),
                n.classList.add('saved'),
                setTimeout(() => {
                    n.classList.remove('saved');
                }, 1e3),
                k(!0);
            });
        }()),
        u
                && ((document.getElementById(`${a}-cookie_performance`).checked = u.performance),
                (document.getElementById(`${a}-cookie_analytics`).checked = u.analytics),
                (document.getElementById(`${a}-cookie_marketing`).checked = u.marketing)),
        (s = !0);
    }

    function h() {
        o(), document.documentElement.classList.add(`${a}-show-modal`);
    }
    u
        ? (f(u), document.dispatchEvent(p))
        : (g(),
        c.implicit
              && window.addEventListener('scroll', function e() {
                  let o; let t; let n; let i; let
                      c;
                  (o = window.innerHeight || (document.documentElement || document.body).clientHeight),
                  (c = document),
                  (t = Math.max(
                      c.body.scrollHeight,
                      c.documentElement.scrollHeight,
                      c.body.offsetHeight,
                      c.documentElement.offsetHeight,
                      c.body.clientHeight,
                      c.documentElement.clientHeight,
                  )),
                  (n = window.pageYOffset
                          || (document.documentElement || document.body.parentNode || document.body).scrollTop),
                  (i = t - o),
                  Math.floor((n / i) * 100) > 25 && !l && (l = !0) && (k(), window.removeEventListener('click', e));
              }));
    const t = document.querySelectorAll(`.${a}-settings-button`);
    if (t) {
        for (let y = 0; y < t.length; y++) {
            t[y].addEventListener('click', (e) => {
                e.preventDefault(), h();
            });
        }
    }
}
gdprCookieNoticeLocales.en = {
    description:
        'We use cookies to offer you a better browsing experience, personalise content and ads, to provide social media features and to analyse our traffic. Read about how we use cookies and how you can control them by clicking Cookie Settings. You consent to our cookies if you continue to use this website.',
    settings: 'Cookie settings',
    accept: 'Accept cookies',
    statement: 'Our cookie statement',
    save: 'Save settings',
    always_on: 'Always on',
    cookie_essential_title: 'Essential website cookies',
    cookie_essential_desc:
        'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
    cookie_performance_title: 'Performance cookies',
    cookie_performance_desc:
        'These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. For example it stores your preferred language or the region that you are in.',
    cookie_analytics_title: 'Analytics cookies',
    cookie_analytics_desc:
        'We use analytics cookies to help us measure how users interact with website content, which helps us customize our websites and application for you in order to enhance your experience.',
    cookie_marketing_title: 'Marketing cookies',
    cookie_marketing_desc:
        'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
};
// # sourceMappingURL=script.js.map
