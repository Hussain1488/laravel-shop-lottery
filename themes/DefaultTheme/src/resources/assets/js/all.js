function _typeof(t) {
    return (
        (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t &&
                          'function' == typeof Symbol &&
                          t.constructor === Symbol &&
                          t !== Symbol.prototype
                          ? 'symbol'
                          : typeof t;
                  }),
        _typeof(t)
    );
}
function reloadCaptcha() {
    $.ajax({
        url: BASE_URL + '/get-new-captcha',
        type: 'GET',
        data: {},
        success: function (t) {
            $('img.captcha').attr('src', t.captcha);
        }
    });
}
function block(t) {
    $(t).block({
        message: '<div class="mdi mdi-refresh icon-spin text-primary"></div>',
        overlayCSS: {backgroundColor: '#fff', cursor: 'wait'},
        css: {border: 0, padding: 0, backgroundColor: 'none'}
    });
}
function unblock(t) {
    $(t).unblock(),
        setTimeout(function () {
            $('[data-toggle="popover"]').popover();
        }, 200);
}
function delay(t, e) {
    var n = 0;
    return function () {
        var i = this,
            o = arguments;
        clearTimeout(n),
            (n = setTimeout(function () {
                t.apply(i, o);
            }, e || 0));
    };
}
function inputFilter(t) {
    var e = t.keyCode || t.which;
    if (
        !(
            (!t.shiftKey && !t.altKey && !t.ctrlKey && e >= 48 && e <= 57) ||
            (e >= 96 && e <= 105) ||
            8 == e ||
            9 == e ||
            13 == e ||
            37 == e ||
            39 == e
        )
    )
        return !1;
    $(t.target).val().length > 0 && $(t.target).val('');
}
function number_format(t) {
    (x = (t += '').split('.')),
        (x1 = x[0]),
        (x2 = x.length > 1 ? '.' + x[1] : '');
    for (var e = /(\d+)(\d{3})/; e.test(x1); ) x1 = x1.replace(e, '$1,$2');
    return x1 + x2;
}
!(function (t, e) {
    'use strict';
    'object' ==
        ('undefined' == typeof module ? 'undefined' : _typeof(module)) &&
    'object' == _typeof(module.exports)
        ? (module.exports = t.document
              ? e(t, !0)
              : function (t) {
                    if (!t.document)
                        throw new Error(
                            'jQuery requires a window with a document'
                        );
                    return e(t);
                })
        : e(t);
})('undefined' != typeof window ? window : this, function (t, e) {
    'use strict';
    var n = [],
        i = t.document,
        o = Object.getPrototypeOf,
        r = n.slice,
        s = n.concat,
        a = n.push,
        l = n.indexOf,
        c = {},
        u = c.toString,
        d = c.hasOwnProperty,
        h = d.toString,
        f = h.call(Object),
        p = {},
        m = function (t) {
            return 'function' == typeof t && 'number' != typeof t.nodeType;
        },
        g = function (t) {
            return null != t && t === t.window;
        },
        v = {type: !0, src: !0, nonce: !0, noModule: !0};
    function w(t, e, n) {
        var o,
            r,
            s = (n = n || i).createElement('script');
        if (((s.text = t), e))
            for (o in v)
                (r = e[o] || (e.getAttribute && e.getAttribute(o))) &&
                    s.setAttribute(o, r);
        n.head.appendChild(s).parentNode.removeChild(s);
    }
    function y(t) {
        return null == t
            ? t + ''
            : 'object' == _typeof(t) || 'function' == typeof t
            ? c[u.call(t)] || 'object'
            : _typeof(t);
    }
    var b = '3.4.1',
        _ = function t(e, n) {
            return new t.fn.init(e, n);
        },
        x = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function C(t) {
        var e = !!t && 'length' in t && t.length,
            n = y(t);
        return (
            !m(t) &&
            !g(t) &&
            ('array' === n ||
                0 === e ||
                ('number' == typeof e && 0 < e && e - 1 in t))
        );
    }
    (_.fn = _.prototype =
        {
            jquery: b,
            constructor: _,
            length: 0,
            toArray: function () {
                return r.call(this);
            },
            get: function (t) {
                return null == t
                    ? r.call(this)
                    : t < 0
                    ? this[t + this.length]
                    : this[t];
            },
            pushStack: function (t) {
                var e = _.merge(this.constructor(), t);
                return (e.prevObject = this), e;
            },
            each: function (t) {
                return _.each(this, t);
            },
            map: function (t) {
                return this.pushStack(
                    _.map(this, function (e, n) {
                        return t.call(e, n, e);
                    })
                );
            },
            slice: function () {
                return this.pushStack(r.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (t) {
                var e = this.length,
                    n = +t + (t < 0 ? e : 0);
                return this.pushStack(0 <= n && n < e ? [this[n]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: a,
            sort: n.sort,
            splice: n.splice
        }),
        (_.extend = _.fn.extend =
            function () {
                var t,
                    e,
                    n,
                    i,
                    o,
                    r,
                    s = arguments[0] || {},
                    a = 1,
                    l = arguments.length,
                    c = !1;
                for (
                    'boolean' == typeof s &&
                        ((c = s), (s = arguments[a] || {}), a++),
                        'object' == _typeof(s) || m(s) || (s = {}),
                        a === l && ((s = this), a--);
                    a < l;
                    a++
                )
                    if (null != (t = arguments[a]))
                        for (e in t)
                            (i = t[e]),
                                '__proto__' !== e &&
                                    s !== i &&
                                    (c &&
                                    i &&
                                    (_.isPlainObject(i) ||
                                        (o = Array.isArray(i)))
                                        ? ((n = s[e]),
                                          (r =
                                              o && !Array.isArray(n)
                                                  ? []
                                                  : o || _.isPlainObject(n)
                                                  ? n
                                                  : {}),
                                          (o = !1),
                                          (s[e] = _.extend(c, r, i)))
                                        : void 0 !== i && (s[e] = i));
                return s;
            }),
        _.extend({
            expando: 'jQuery' + (b + Math.random()).replace(/\D/g, ''),
            isReady: !0,
            error: function (t) {
                throw new Error(t);
            },
            noop: function () {},
            isPlainObject: function (t) {
                var e, n;
                return !(
                    !t ||
                    '[object Object]' !== u.call(t) ||
                    ((e = o(t)) &&
                        ('function' !=
                            typeof (n =
                                d.call(e, 'constructor') && e.constructor) ||
                            h.call(n) !== f))
                );
            },
            isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0;
            },
            globalEval: function (t, e) {
                w(t, {nonce: e && e.nonce});
            },
            each: function (t, e) {
                var n,
                    i = 0;
                if (C(t))
                    for (
                        n = t.length;
                        i < n && !1 !== e.call(t[i], i, t[i]);
                        i++
                    );
                else for (i in t) if (!1 === e.call(t[i], i, t[i])) break;
                return t;
            },
            trim: function (t) {
                return null == t ? '' : (t + '').replace(x, '');
            },
            makeArray: function (t, e) {
                var n = e || [];
                return (
                    null != t &&
                        (C(Object(t))
                            ? _.merge(n, 'string' == typeof t ? [t] : t)
                            : a.call(n, t)),
                    n
                );
            },
            inArray: function (t, e, n) {
                return null == e ? -1 : l.call(e, t, n);
            },
            merge: function (t, e) {
                for (var n = +e.length, i = 0, o = t.length; i < n; i++)
                    t[o++] = e[i];
                return (t.length = o), t;
            },
            grep: function (t, e, n) {
                for (var i = [], o = 0, r = t.length, s = !n; o < r; o++)
                    !e(t[o], o) !== s && i.push(t[o]);
                return i;
            },
            map: function (t, e, n) {
                var i,
                    o,
                    r = 0,
                    a = [];
                if (C(t))
                    for (i = t.length; r < i; r++)
                        null != (o = e(t[r], r, n)) && a.push(o);
                else for (r in t) null != (o = e(t[r], r, n)) && a.push(o);
                return s.apply([], a);
            },
            guid: 1,
            support: p
        }),
        'function' == typeof Symbol &&
            (_.fn[Symbol.iterator] = n[Symbol.iterator]),
        _.each(
            'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
                ' '
            ),
            function (t, e) {
                c['[object ' + e + ']'] = e.toLowerCase();
            }
        );
    var k = (function (t) {
        var e,
            n,
            i,
            o,
            r,
            s,
            a,
            l,
            c,
            u,
            d,
            h,
            f,
            p,
            m,
            g,
            v,
            w,
            y,
            b = 'sizzle' + 1 * new Date(),
            _ = t.document,
            x = 0,
            C = 0,
            k = lt(),
            T = lt(),
            E = lt(),
            S = lt(),
            A = function (t, e) {
                return t === e && (d = !0), 0;
            },
            D = {}.hasOwnProperty,
            I = [],
            O = I.pop,
            N = I.push,
            L = I.push,
            j = I.slice,
            P = function (t, e) {
                for (var n = 0, i = t.length; n < i; n++)
                    if (t[n] === e) return n;
                return -1;
            },
            $ =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
            B = '[\\x20\\t\\r\\n\\f]',
            H = '(?:\\\\.|[\\w-]|[^\0-\\xa0])+',
            M =
                '\\[' +
                B +
                '*(' +
                H +
                ')(?:' +
                B +
                '*([*^$|!~]?=)' +
                B +
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                H +
                '))|)' +
                B +
                '*\\]',
            R =
                ':(' +
                H +
                ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                M +
                ')*)|.*)\\)|)',
            z = new RegExp(B + '+', 'g'),
            q = new RegExp(
                '^' + B + '+|((?:^|[^\\\\])(?:\\\\.)*)' + B + '+$',
                'g'
            ),
            W = new RegExp('^' + B + '*,' + B + '*'),
            U = new RegExp('^' + B + '*([>+~]|' + B + ')' + B + '*'),
            F = new RegExp(B + '|>'),
            V = new RegExp(R),
            Y = new RegExp('^' + H + '$'),
            Q = {
                ID: new RegExp('^#(' + H + ')'),
                CLASS: new RegExp('^\\.(' + H + ')'),
                TAG: new RegExp('^(' + H + '|[*])'),
                ATTR: new RegExp('^' + M),
                PSEUDO: new RegExp('^' + R),
                CHILD: new RegExp(
                    '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                        B +
                        '*(even|odd|(([+-]|)(\\d*)n|)' +
                        B +
                        '*(?:([+-]|)' +
                        B +
                        '*(\\d+)|))' +
                        B +
                        '*\\)|)',
                    'i'
                ),
                bool: new RegExp('^(?:' + $ + ')$', 'i'),
                needsContext: new RegExp(
                    '^' +
                        B +
                        '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                        B +
                        '*((?:-\\d)?\\d*)' +
                        B +
                        '*\\)|)(?=[^-]|$)',
                    'i'
                )
            },
            X = /HTML$/i,
            K = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            G = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            tt = /[+~]/,
            et = new RegExp(
                '\\\\([\\da-f]{1,6}' + B + '?|(' + B + ')|.)',
                'ig'
            ),
            nt = function (t, e, n) {
                var i = '0x' + e - 65536;
                return i != i || n
                    ? e
                    : i < 0
                    ? String.fromCharCode(i + 65536)
                    : String.fromCharCode(
                          (i >> 10) | 55296,
                          (1023 & i) | 56320
                      );
            },
            it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ot = function (t, e) {
                return e
                    ? '\0' === t
                        ? '�'
                        : t.slice(0, -1) +
                          '\\' +
                          t.charCodeAt(t.length - 1).toString(16) +
                          ' '
                    : '\\' + t;
            },
            rt = function () {
                h();
            },
            st = bt(
                function (t) {
                    return (
                        !0 === t.disabled &&
                        'fieldset' === t.nodeName.toLowerCase()
                    );
                },
                {dir: 'parentNode', next: 'legend'}
            );
        try {
            L.apply((I = j.call(_.childNodes)), _.childNodes),
                I[_.childNodes.length].nodeType;
        } catch (e) {
            L = {
                apply: I.length
                    ? function (t, e) {
                          N.apply(t, j.call(e));
                      }
                    : function (t, e) {
                          for (var n = t.length, i = 0; (t[n++] = e[i++]); );
                          t.length = n - 1;
                      }
            };
        }
        function at(t, e, i, o) {
            var r,
                a,
                c,
                u,
                d,
                p,
                v,
                w = e && e.ownerDocument,
                x = e ? e.nodeType : 9;
            if (
                ((i = i || []),
                'string' != typeof t || !t || (1 !== x && 9 !== x && 11 !== x))
            )
                return i;
            if (
                !o &&
                ((e ? e.ownerDocument || e : _) !== f && h(e), (e = e || f), m)
            ) {
                if (11 !== x && (d = J.exec(t)))
                    if ((r = d[1])) {
                        if (9 === x) {
                            if (!(c = e.getElementById(r))) return i;
                            if (c.id === r) return i.push(c), i;
                        } else if (
                            w &&
                            (c = w.getElementById(r)) &&
                            y(e, c) &&
                            c.id === r
                        )
                            return i.push(c), i;
                    } else {
                        if (d[2])
                            return L.apply(i, e.getElementsByTagName(t)), i;
                        if (
                            (r = d[3]) &&
                            n.getElementsByClassName &&
                            e.getElementsByClassName
                        )
                            return L.apply(i, e.getElementsByClassName(r)), i;
                    }
                if (
                    n.qsa &&
                    !S[t + ' '] &&
                    (!g || !g.test(t)) &&
                    (1 !== x || 'object' !== e.nodeName.toLowerCase())
                ) {
                    if (((v = t), (w = e), 1 === x && F.test(t))) {
                        for (
                            (u = e.getAttribute('id'))
                                ? (u = u.replace(it, ot))
                                : e.setAttribute('id', (u = b)),
                                a = (p = s(t)).length;
                            a--;

                        )
                            p[a] = '#' + u + ' ' + yt(p[a]);
                        (v = p.join(',')),
                            (w = (tt.test(t) && vt(e.parentNode)) || e);
                    }
                    try {
                        return L.apply(i, w.querySelectorAll(v)), i;
                    } catch (e) {
                        S(t, !0);
                    } finally {
                        u === b && e.removeAttribute('id');
                    }
                }
            }
            return l(t.replace(q, '$1'), e, i, o);
        }
        function lt() {
            var t = [];
            return function e(n, o) {
                return (
                    t.push(n + ' ') > i.cacheLength && delete e[t.shift()],
                    (e[n + ' '] = o)
                );
            };
        }
        function ct(t) {
            return (t[b] = !0), t;
        }
        function ut(t) {
            var e = f.createElement('fieldset');
            try {
                return !!t(e);
            } catch (t) {
                return !1;
            } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
            }
        }
        function dt(t, e) {
            for (var n = t.split('|'), o = n.length; o--; )
                i.attrHandle[n[o]] = e;
        }
        function ht(t, e) {
            var n = e && t,
                i =
                    n &&
                    1 === t.nodeType &&
                    1 === e.nodeType &&
                    t.sourceIndex - e.sourceIndex;
            if (i) return i;
            if (n) for (; (n = n.nextSibling); ) if (n === e) return -1;
            return t ? 1 : -1;
        }
        function ft(t) {
            return function (e) {
                return 'input' === e.nodeName.toLowerCase() && e.type === t;
            };
        }
        function pt(t) {
            return function (e) {
                var n = e.nodeName.toLowerCase();
                return ('input' === n || 'button' === n) && e.type === t;
            };
        }
        function mt(t) {
            return function (e) {
                return 'form' in e
                    ? e.parentNode && !1 === e.disabled
                        ? 'label' in e
                            ? 'label' in e.parentNode
                                ? e.parentNode.disabled === t
                                : e.disabled === t
                            : e.isDisabled === t ||
                              (e.isDisabled !== !t && st(e) === t)
                        : e.disabled === t
                    : 'label' in e && e.disabled === t;
            };
        }
        function gt(t) {
            return ct(function (e) {
                return (
                    (e = +e),
                    ct(function (n, i) {
                        for (var o, r = t([], n.length, e), s = r.length; s--; )
                            n[(o = r[s])] && (n[o] = !(i[o] = n[o]));
                    })
                );
            });
        }
        function vt(t) {
            return t && void 0 !== t.getElementsByTagName && t;
        }
        for (e in ((n = at.support = {}),
        (r = at.isXML =
            function (t) {
                var e = t.namespaceURI,
                    n = (t.ownerDocument || t).documentElement;
                return !X.test(e || (n && n.nodeName) || 'HTML');
            }),
        (h = at.setDocument =
            function (t) {
                var e,
                    o,
                    s = t ? t.ownerDocument || t : _;
                return (
                    s !== f &&
                        9 === s.nodeType &&
                        s.documentElement &&
                        ((p = (f = s).documentElement),
                        (m = !r(f)),
                        _ !== f &&
                            (o = f.defaultView) &&
                            o.top !== o &&
                            (o.addEventListener
                                ? o.addEventListener('unload', rt, !1)
                                : o.attachEvent &&
                                  o.attachEvent('onunload', rt)),
                        (n.attributes = ut(function (t) {
                            return (
                                (t.className = 'i'),
                                !t.getAttribute('className')
                            );
                        })),
                        (n.getElementsByTagName = ut(function (t) {
                            return (
                                t.appendChild(f.createComment('')),
                                !t.getElementsByTagName('*').length
                            );
                        })),
                        (n.getElementsByClassName = G.test(
                            f.getElementsByClassName
                        )),
                        (n.getById = ut(function (t) {
                            return (
                                (p.appendChild(t).id = b),
                                !f.getElementsByName ||
                                    !f.getElementsByName(b).length
                            );
                        })),
                        n.getById
                            ? ((i.filter.ID = function (t) {
                                  var e = t.replace(et, nt);
                                  return function (t) {
                                      return t.getAttribute('id') === e;
                                  };
                              }),
                              (i.find.ID = function (t, e) {
                                  if (void 0 !== e.getElementById && m) {
                                      var n = e.getElementById(t);
                                      return n ? [n] : [];
                                  }
                              }))
                            : ((i.filter.ID = function (t) {
                                  var e = t.replace(et, nt);
                                  return function (t) {
                                      var n =
                                          void 0 !== t.getAttributeNode &&
                                          t.getAttributeNode('id');
                                      return n && n.value === e;
                                  };
                              }),
                              (i.find.ID = function (t, e) {
                                  if (void 0 !== e.getElementById && m) {
                                      var n,
                                          i,
                                          o,
                                          r = e.getElementById(t);
                                      if (r) {
                                          if (
                                              (n = r.getAttributeNode('id')) &&
                                              n.value === t
                                          )
                                              return [r];
                                          for (
                                              o = e.getElementsByName(t), i = 0;
                                              (r = o[i++]);

                                          )
                                              if (
                                                  (n =
                                                      r.getAttributeNode(
                                                          'id'
                                                      )) &&
                                                  n.value === t
                                              )
                                                  return [r];
                                      }
                                      return [];
                                  }
                              })),
                        (i.find.TAG = n.getElementsByTagName
                            ? function (t, e) {
                                  return void 0 !== e.getElementsByTagName
                                      ? e.getElementsByTagName(t)
                                      : n.qsa
                                      ? e.querySelectorAll(t)
                                      : void 0;
                              }
                            : function (t, e) {
                                  var n,
                                      i = [],
                                      o = 0,
                                      r = e.getElementsByTagName(t);
                                  if ('*' === t) {
                                      for (; (n = r[o++]); )
                                          1 === n.nodeType && i.push(n);
                                      return i;
                                  }
                                  return r;
                              }),
                        (i.find.CLASS =
                            n.getElementsByClassName &&
                            function (t, e) {
                                if (void 0 !== e.getElementsByClassName && m)
                                    return e.getElementsByClassName(t);
                            }),
                        (v = []),
                        (g = []),
                        (n.qsa = G.test(f.querySelectorAll)) &&
                            (ut(function (t) {
                                (p.appendChild(t).innerHTML =
                                    "<a id='" +
                                    b +
                                    "'></a><select id='" +
                                    b +
                                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                    t.querySelectorAll("[msallowcapture^='']")
                                        .length &&
                                        g.push('[*^$]=' + B + '*(?:\'\'|"")'),
                                    t.querySelectorAll('[selected]').length ||
                                        g.push(
                                            '\\[' + B + '*(?:value|' + $ + ')'
                                        ),
                                    t.querySelectorAll('[id~=' + b + '-]')
                                        .length || g.push('~='),
                                    t.querySelectorAll(':checked').length ||
                                        g.push(':checked'),
                                    t.querySelectorAll('a#' + b + '+*')
                                        .length || g.push('.#.+[+~]');
                            }),
                            ut(function (t) {
                                t.innerHTML =
                                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var e = f.createElement('input');
                                e.setAttribute('type', 'hidden'),
                                    t.appendChild(e).setAttribute('name', 'D'),
                                    t.querySelectorAll('[name=d]').length &&
                                        g.push('name' + B + '*[*^$|!~]?='),
                                    2 !==
                                        t.querySelectorAll(':enabled').length &&
                                        g.push(':enabled', ':disabled'),
                                    (p.appendChild(t).disabled = !0),
                                    2 !==
                                        t.querySelectorAll(':disabled')
                                            .length &&
                                        g.push(':enabled', ':disabled'),
                                    t.querySelectorAll('*,:x'),
                                    g.push(',.*:');
                            })),
                        (n.matchesSelector = G.test(
                            (w =
                                p.matches ||
                                p.webkitMatchesSelector ||
                                p.mozMatchesSelector ||
                                p.oMatchesSelector ||
                                p.msMatchesSelector)
                        )) &&
                            ut(function (t) {
                                (n.disconnectedMatch = w.call(t, '*')),
                                    w.call(t, "[s!='']:x"),
                                    v.push('!=', R);
                            }),
                        (g = g.length && new RegExp(g.join('|'))),
                        (v = v.length && new RegExp(v.join('|'))),
                        (e = G.test(p.compareDocumentPosition)),
                        (y =
                            e || G.test(p.contains)
                                ? function (t, e) {
                                      var n =
                                              9 === t.nodeType
                                                  ? t.documentElement
                                                  : t,
                                          i = e && e.parentNode;
                                      return (
                                          t === i ||
                                          !(
                                              !i ||
                                              1 !== i.nodeType ||
                                              !(n.contains
                                                  ? n.contains(i)
                                                  : t.compareDocumentPosition &&
                                                    16 &
                                                        t.compareDocumentPosition(
                                                            i
                                                        ))
                                          )
                                      );
                                  }
                                : function (t, e) {
                                      if (e)
                                          for (; (e = e.parentNode); )
                                              if (e === t) return !0;
                                      return !1;
                                  }),
                        (A = e
                            ? function (t, e) {
                                  if (t === e) return (d = !0), 0;
                                  var i =
                                      !t.compareDocumentPosition -
                                      !e.compareDocumentPosition;
                                  return (
                                      i ||
                                      (1 &
                                          (i =
                                              (t.ownerDocument || t) ===
                                              (e.ownerDocument || e)
                                                  ? t.compareDocumentPosition(e)
                                                  : 1) ||
                                      (!n.sortDetached &&
                                          e.compareDocumentPosition(t) === i)
                                          ? t === f ||
                                            (t.ownerDocument === _ && y(_, t))
                                              ? -1
                                              : e === f ||
                                                (e.ownerDocument === _ &&
                                                    y(_, e))
                                              ? 1
                                              : u
                                              ? P(u, t) - P(u, e)
                                              : 0
                                          : 4 & i
                                          ? -1
                                          : 1)
                                  );
                              }
                            : function (t, e) {
                                  if (t === e) return (d = !0), 0;
                                  var n,
                                      i = 0,
                                      o = t.parentNode,
                                      r = e.parentNode,
                                      s = [t],
                                      a = [e];
                                  if (!o || !r)
                                      return t === f
                                          ? -1
                                          : e === f
                                          ? 1
                                          : o
                                          ? -1
                                          : r
                                          ? 1
                                          : u
                                          ? P(u, t) - P(u, e)
                                          : 0;
                                  if (o === r) return ht(t, e);
                                  for (n = t; (n = n.parentNode); )
                                      s.unshift(n);
                                  for (n = e; (n = n.parentNode); )
                                      a.unshift(n);
                                  for (; s[i] === a[i]; ) i++;
                                  return i
                                      ? ht(s[i], a[i])
                                      : s[i] === _
                                      ? -1
                                      : a[i] === _
                                      ? 1
                                      : 0;
                              })),
                    f
                );
            }),
        (at.matches = function (t, e) {
            return at(t, null, null, e);
        }),
        (at.matchesSelector = function (t, e) {
            if (
                ((t.ownerDocument || t) !== f && h(t),
                n.matchesSelector &&
                    m &&
                    !S[e + ' '] &&
                    (!v || !v.test(e)) &&
                    (!g || !g.test(e)))
            )
                try {
                    var i = w.call(t, e);
                    if (
                        i ||
                        n.disconnectedMatch ||
                        (t.document && 11 !== t.document.nodeType)
                    )
                        return i;
                } catch (t) {
                    S(e, !0);
                }
            return 0 < at(e, f, null, [t]).length;
        }),
        (at.contains = function (t, e) {
            return (t.ownerDocument || t) !== f && h(t), y(t, e);
        }),
        (at.attr = function (t, e) {
            (t.ownerDocument || t) !== f && h(t);
            var o = i.attrHandle[e.toLowerCase()],
                r =
                    o && D.call(i.attrHandle, e.toLowerCase())
                        ? o(t, e, !m)
                        : void 0;
            return void 0 !== r
                ? r
                : n.attributes || !m
                ? t.getAttribute(e)
                : (r = t.getAttributeNode(e)) && r.specified
                ? r.value
                : null;
        }),
        (at.escape = function (t) {
            return (t + '').replace(it, ot);
        }),
        (at.error = function (t) {
            throw new Error('Syntax error, unrecognized expression: ' + t);
        }),
        (at.uniqueSort = function (t) {
            var e,
                i = [],
                o = 0,
                r = 0;
            if (
                ((d = !n.detectDuplicates),
                (u = !n.sortStable && t.slice(0)),
                t.sort(A),
                d)
            ) {
                for (; (e = t[r++]); ) e === t[r] && (o = i.push(r));
                for (; o--; ) t.splice(i[o], 1);
            }
            return (u = null), t;
        }),
        (o = at.getText =
            function (t) {
                var e,
                    n = '',
                    i = 0,
                    r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ('string' == typeof t.textContent)
                            return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += o(t);
                    } else if (3 === r || 4 === r) return t.nodeValue;
                } else for (; (e = t[i++]); ) n += o(e);
                return n;
            }),
        ((i = at.selectors =
            {
                cacheLength: 50,
                createPseudo: ct,
                match: Q,
                attrHandle: {},
                find: {},
                relative: {
                    '>': {dir: 'parentNode', first: !0},
                    ' ': {dir: 'parentNode'},
                    '+': {dir: 'previousSibling', first: !0},
                    '~': {dir: 'previousSibling'}
                },
                preFilter: {
                    ATTR: function (t) {
                        return (
                            (t[1] = t[1].replace(et, nt)),
                            (t[3] = (t[3] || t[4] || t[5] || '').replace(
                                et,
                                nt
                            )),
                            '~=' === t[2] && (t[3] = ' ' + t[3] + ' '),
                            t.slice(0, 4)
                        );
                    },
                    CHILD: function (t) {
                        return (
                            (t[1] = t[1].toLowerCase()),
                            'nth' === t[1].slice(0, 3)
                                ? (t[3] || at.error(t[0]),
                                  (t[4] = +(t[4]
                                      ? t[5] + (t[6] || 1)
                                      : 2 *
                                        ('even' === t[3] || 'odd' === t[3]))),
                                  (t[5] = +(t[7] + t[8] || 'odd' === t[3])))
                                : t[3] && at.error(t[0]),
                            t
                        );
                    },
                    PSEUDO: function (t) {
                        var e,
                            n = !t[6] && t[2];
                        return Q.CHILD.test(t[0])
                            ? null
                            : (t[3]
                                  ? (t[2] = t[4] || t[5] || '')
                                  : n &&
                                    V.test(n) &&
                                    (e = s(n, !0)) &&
                                    (e =
                                        n.indexOf(')', n.length - e) -
                                        n.length) &&
                                    ((t[0] = t[0].slice(0, e)),
                                    (t[2] = n.slice(0, e))),
                              t.slice(0, 3));
                    }
                },
                filter: {
                    TAG: function (t) {
                        var e = t.replace(et, nt).toLowerCase();
                        return '*' === t
                            ? function () {
                                  return !0;
                              }
                            : function (t) {
                                  return (
                                      t.nodeName &&
                                      t.nodeName.toLowerCase() === e
                                  );
                              };
                    },
                    CLASS: function (t) {
                        var e = k[t + ' '];
                        return (
                            e ||
                            ((e = new RegExp(
                                '(^|' + B + ')' + t + '(' + B + '|$)'
                            )) &&
                                k(t, function (t) {
                                    return e.test(
                                        ('string' == typeof t.className &&
                                            t.className) ||
                                            (void 0 !== t.getAttribute &&
                                                t.getAttribute('class')) ||
                                            ''
                                    );
                                }))
                        );
                    },
                    ATTR: function (t, e, n) {
                        return function (i) {
                            var o = at.attr(i, t);
                            return null == o
                                ? '!=' === e
                                : !e ||
                                      ((o += ''),
                                      '=' === e
                                          ? o === n
                                          : '!=' === e
                                          ? o !== n
                                          : '^=' === e
                                          ? n && 0 === o.indexOf(n)
                                          : '*=' === e
                                          ? n && -1 < o.indexOf(n)
                                          : '$=' === e
                                          ? n && o.slice(-n.length) === n
                                          : '~=' === e
                                          ? -1 <
                                            (
                                                ' ' +
                                                o.replace(z, ' ') +
                                                ' '
                                            ).indexOf(n)
                                          : '|=' === e &&
                                            (o === n ||
                                                o.slice(0, n.length + 1) ===
                                                    n + '-'));
                        };
                    },
                    CHILD: function (t, e, n, i, o) {
                        var r = 'nth' !== t.slice(0, 3),
                            s = 'last' !== t.slice(-4),
                            a = 'of-type' === e;
                        return 1 === i && 0 === o
                            ? function (t) {
                                  return !!t.parentNode;
                              }
                            : function (e, n, l) {
                                  var c,
                                      u,
                                      d,
                                      h,
                                      f,
                                      p,
                                      m =
                                          r !== s
                                              ? 'nextSibling'
                                              : 'previousSibling',
                                      g = e.parentNode,
                                      v = a && e.nodeName.toLowerCase(),
                                      w = !l && !a,
                                      y = !1;
                                  if (g) {
                                      if (r) {
                                          for (; m; ) {
                                              for (h = e; (h = h[m]); )
                                                  if (
                                                      a
                                                          ? h.nodeName.toLowerCase() ===
                                                            v
                                                          : 1 === h.nodeType
                                                  )
                                                      return !1;
                                              p = m =
                                                  'only' === t &&
                                                  !p &&
                                                  'nextSibling';
                                          }
                                          return !0;
                                      }
                                      if (
                                          ((p = [
                                              s ? g.firstChild : g.lastChild
                                          ]),
                                          s && w)
                                      ) {
                                          for (
                                              y =
                                                  (f =
                                                      (c =
                                                          (u =
                                                              (d =
                                                                  (h = g)[b] ||
                                                                  (h[b] = {}))[
                                                                  h.uniqueID
                                                              ] ||
                                                              (d[h.uniqueID] =
                                                                  {}))[t] ||
                                                          [])[0] === x &&
                                                      c[1]) && c[2],
                                                  h = f && g.childNodes[f];
                                              (h =
                                                  (++f && h && h[m]) ||
                                                  (y = f = 0) ||
                                                  p.pop());

                                          )
                                              if (
                                                  1 === h.nodeType &&
                                                  ++y &&
                                                  h === e
                                              ) {
                                                  u[t] = [x, f, y];
                                                  break;
                                              }
                                      } else if (
                                          (w &&
                                              (y = f =
                                                  (c =
                                                      (u =
                                                          (d =
                                                              (h = e)[b] ||
                                                              (h[b] = {}))[
                                                              h.uniqueID
                                                          ] ||
                                                          (d[h.uniqueID] = {}))[
                                                          t
                                                      ] || [])[0] === x &&
                                                  c[1]),
                                          !1 === y)
                                      )
                                          for (
                                              ;
                                              (h =
                                                  (++f && h && h[m]) ||
                                                  (y = f = 0) ||
                                                  p.pop()) &&
                                              ((a
                                                  ? h.nodeName.toLowerCase() !==
                                                    v
                                                  : 1 !== h.nodeType) ||
                                                  !++y ||
                                                  (w &&
                                                      ((u =
                                                          (d =
                                                              h[b] ||
                                                              (h[b] = {}))[
                                                              h.uniqueID
                                                          ] ||
                                                          (d[h.uniqueID] = {}))[
                                                          t
                                                      ] = [x, y]),
                                                  h !== e));

                                          );
                                      return (
                                          (y -= o) === i ||
                                          (y % i == 0 && 0 <= y / i)
                                      );
                                  }
                              };
                    },
                    PSEUDO: function (t, e) {
                        var n,
                            o =
                                i.pseudos[t] ||
                                i.setFilters[t.toLowerCase()] ||
                                at.error('unsupported pseudo: ' + t);
                        return o[b]
                            ? o(e)
                            : 1 < o.length
                            ? ((n = [t, t, '', e]),
                              i.setFilters.hasOwnProperty(t.toLowerCase())
                                  ? ct(function (t, n) {
                                        for (
                                            var i, r = o(t, e), s = r.length;
                                            s--;

                                        )
                                            t[(i = P(t, r[s]))] = !(n[i] =
                                                r[s]);
                                    })
                                  : function (t) {
                                        return o(t, 0, n);
                                    })
                            : o;
                    }
                },
                pseudos: {
                    not: ct(function (t) {
                        var e = [],
                            n = [],
                            i = a(t.replace(q, '$1'));
                        return i[b]
                            ? ct(function (t, e, n, o) {
                                  for (
                                      var r,
                                          s = i(t, null, o, []),
                                          a = t.length;
                                      a--;

                                  )
                                      (r = s[a]) && (t[a] = !(e[a] = r));
                              })
                            : function (t, o, r) {
                                  return (
                                      (e[0] = t),
                                      i(e, null, r, n),
                                      (e[0] = null),
                                      !n.pop()
                                  );
                              };
                    }),
                    has: ct(function (t) {
                        return function (e) {
                            return 0 < at(t, e).length;
                        };
                    }),
                    contains: ct(function (t) {
                        return (
                            (t = t.replace(et, nt)),
                            function (e) {
                                return -1 < (e.textContent || o(e)).indexOf(t);
                            }
                        );
                    }),
                    lang: ct(function (t) {
                        return (
                            Y.test(t || '') ||
                                at.error('unsupported lang: ' + t),
                            (t = t.replace(et, nt).toLowerCase()),
                            function (e) {
                                var n;
                                do {
                                    if (
                                        (n = m
                                            ? e.lang
                                            : e.getAttribute('xml:lang') ||
                                              e.getAttribute('lang'))
                                    )
                                        return (
                                            (n = n.toLowerCase()) === t ||
                                            0 === n.indexOf(t + '-')
                                        );
                                } while (
                                    (e = e.parentNode) &&
                                    1 === e.nodeType
                                );
                                return !1;
                            }
                        );
                    }),
                    target: function (e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id;
                    },
                    root: function (t) {
                        return t === p;
                    },
                    focus: function (t) {
                        return (
                            t === f.activeElement &&
                            (!f.hasFocus || f.hasFocus()) &&
                            !!(t.type || t.href || ~t.tabIndex)
                        );
                    },
                    enabled: mt(!1),
                    disabled: mt(!0),
                    checked: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return (
                            ('input' === e && !!t.checked) ||
                            ('option' === e && !!t.selected)
                        );
                    },
                    selected: function (t) {
                        return (
                            t.parentNode && t.parentNode.selectedIndex,
                            !0 === t.selected
                        );
                    },
                    empty: function (t) {
                        for (t = t.firstChild; t; t = t.nextSibling)
                            if (t.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (t) {
                        return !i.pseudos.empty(t);
                    },
                    header: function (t) {
                        return Z.test(t.nodeName);
                    },
                    input: function (t) {
                        return K.test(t.nodeName);
                    },
                    button: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return (
                            ('input' === e && 'button' === t.type) ||
                            'button' === e
                        );
                    },
                    text: function (t) {
                        var e;
                        return (
                            'input' === t.nodeName.toLowerCase() &&
                            'text' === t.type &&
                            (null == (e = t.getAttribute('type')) ||
                                'text' === e.toLowerCase())
                        );
                    },
                    first: gt(function () {
                        return [0];
                    }),
                    last: gt(function (t, e) {
                        return [e - 1];
                    }),
                    eq: gt(function (t, e, n) {
                        return [n < 0 ? n + e : n];
                    }),
                    even: gt(function (t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t;
                    }),
                    odd: gt(function (t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t;
                    }),
                    lt: gt(function (t, e, n) {
                        for (var i = n < 0 ? n + e : e < n ? e : n; 0 <= --i; )
                            t.push(i);
                        return t;
                    }),
                    gt: gt(function (t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
                        return t;
                    })
                }
            }).pseudos.nth = i.pseudos.eq),
        {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}))
            i.pseudos[e] = ft(e);
        for (e in {submit: !0, reset: !0}) i.pseudos[e] = pt(e);
        function wt() {}
        function yt(t) {
            for (var e = 0, n = t.length, i = ''; e < n; e++) i += t[e].value;
            return i;
        }
        function bt(t, e, n) {
            var i = e.dir,
                o = e.next,
                r = o || i,
                s = n && 'parentNode' === r,
                a = C++;
            return e.first
                ? function (e, n, o) {
                      for (; (e = e[i]); )
                          if (1 === e.nodeType || s) return t(e, n, o);
                      return !1;
                  }
                : function (e, n, l) {
                      var c,
                          u,
                          d,
                          h = [x, a];
                      if (l) {
                          for (; (e = e[i]); )
                              if ((1 === e.nodeType || s) && t(e, n, l))
                                  return !0;
                      } else
                          for (; (e = e[i]); )
                              if (1 === e.nodeType || s)
                                  if (
                                      ((u =
                                          (d = e[b] || (e[b] = {}))[
                                              e.uniqueID
                                          ] || (d[e.uniqueID] = {})),
                                      o && o === e.nodeName.toLowerCase())
                                  )
                                      e = e[i] || e;
                                  else {
                                      if (
                                          (c = u[r]) &&
                                          c[0] === x &&
                                          c[1] === a
                                      )
                                          return (h[2] = c[2]);
                                      if (((u[r] = h)[2] = t(e, n, l)))
                                          return !0;
                                  }
                      return !1;
                  };
        }
        function _t(t) {
            return 1 < t.length
                ? function (e, n, i) {
                      for (var o = t.length; o--; )
                          if (!t[o](e, n, i)) return !1;
                      return !0;
                  }
                : t[0];
        }
        function xt(t, e, n, i, o) {
            for (var r, s = [], a = 0, l = t.length, c = null != e; a < l; a++)
                (r = t[a]) &&
                    ((n && !n(r, i, o)) || (s.push(r), c && e.push(a)));
            return s;
        }
        function Ct(t, e, n, i, o, r) {
            return (
                i && !i[b] && (i = Ct(i)),
                o && !o[b] && (o = Ct(o, r)),
                ct(function (r, s, a, l) {
                    var c,
                        u,
                        d,
                        h = [],
                        f = [],
                        p = s.length,
                        m =
                            r ||
                            (function (t, e, n) {
                                for (var i = 0, o = e.length; i < o; i++)
                                    at(t, e[i], n);
                                return n;
                            })(e || '*', a.nodeType ? [a] : a, []),
                        g = !t || (!r && e) ? m : xt(m, h, t, a, l),
                        v = n ? (o || (r ? t : p || i) ? [] : s) : g;
                    if ((n && n(g, v, a, l), i))
                        for (c = xt(v, f), i(c, [], a, l), u = c.length; u--; )
                            (d = c[u]) && (v[f[u]] = !(g[f[u]] = d));
                    if (r) {
                        if (o || t) {
                            if (o) {
                                for (c = [], u = v.length; u--; )
                                    (d = v[u]) && c.push((g[u] = d));
                                o(null, (v = []), c, l);
                            }
                            for (u = v.length; u--; )
                                (d = v[u]) &&
                                    -1 < (c = o ? P(r, d) : h[u]) &&
                                    (r[c] = !(s[c] = d));
                        }
                    } else (v = xt(v === s ? v.splice(p, v.length) : v)), o ? o(null, s, v, l) : L.apply(s, v);
                })
            );
        }
        function kt(t) {
            for (
                var e,
                    n,
                    o,
                    r = t.length,
                    s = i.relative[t[0].type],
                    a = s || i.relative[' '],
                    l = s ? 1 : 0,
                    u = bt(
                        function (t) {
                            return t === e;
                        },
                        a,
                        !0
                    ),
                    d = bt(
                        function (t) {
                            return -1 < P(e, t);
                        },
                        a,
                        !0
                    ),
                    h = [
                        function (t, n, i) {
                            var o =
                                (!s && (i || n !== c)) ||
                                ((e = n).nodeType ? u(t, n, i) : d(t, n, i));
                            return (e = null), o;
                        }
                    ];
                l < r;
                l++
            )
                if ((n = i.relative[t[l].type])) h = [bt(_t(h), n)];
                else {
                    if (
                        (n = i.filter[t[l].type].apply(null, t[l].matches))[b]
                    ) {
                        for (o = ++l; o < r && !i.relative[t[o].type]; o++);
                        return Ct(
                            1 < l && _t(h),
                            1 < l &&
                                yt(
                                    t.slice(0, l - 1).concat({
                                        value: ' ' === t[l - 2].type ? '*' : ''
                                    })
                                ).replace(q, '$1'),
                            n,
                            l < o && kt(t.slice(l, o)),
                            o < r && kt((t = t.slice(o))),
                            o < r && yt(t)
                        );
                    }
                    h.push(n);
                }
            return _t(h);
        }
        return (
            (wt.prototype = i.filters = i.pseudos),
            (i.setFilters = new wt()),
            (s = at.tokenize =
                function (t, e) {
                    var n,
                        o,
                        r,
                        s,
                        a,
                        l,
                        c,
                        u = T[t + ' '];
                    if (u) return e ? 0 : u.slice(0);
                    for (a = t, l = [], c = i.preFilter; a; ) {
                        for (s in ((n && !(o = W.exec(a))) ||
                            (o && (a = a.slice(o[0].length) || a),
                            l.push((r = []))),
                        (n = !1),
                        (o = U.exec(a)) &&
                            ((n = o.shift()),
                            r.push({value: n, type: o[0].replace(q, ' ')}),
                            (a = a.slice(n.length))),
                        i.filter))
                            !(o = Q[s].exec(a)) ||
                                (c[s] && !(o = c[s](o))) ||
                                ((n = o.shift()),
                                r.push({value: n, type: s, matches: o}),
                                (a = a.slice(n.length)));
                        if (!n) break;
                    }
                    return e ? a.length : a ? at.error(t) : T(t, l).slice(0);
                }),
            (a = at.compile =
                function (t, e) {
                    var n,
                        o,
                        r,
                        a,
                        l,
                        u,
                        d = [],
                        p = [],
                        g = E[t + ' '];
                    if (!g) {
                        for (e || (e = s(t)), n = e.length; n--; )
                            (g = kt(e[n]))[b] ? d.push(g) : p.push(g);
                        (g = E(
                            t,
                            ((o = p),
                            (a = 0 < (r = d).length),
                            (l = 0 < o.length),
                            (u = function (t, e, n, s, u) {
                                var d,
                                    p,
                                    g,
                                    v = 0,
                                    w = '0',
                                    y = t && [],
                                    b = [],
                                    _ = c,
                                    C = t || (l && i.find.TAG('*', u)),
                                    k = (x +=
                                        null == _ ? 1 : Math.random() || 0.1),
                                    T = C.length;
                                for (
                                    u && (c = e === f || e || u);
                                    w !== T && null != (d = C[w]);
                                    w++
                                ) {
                                    if (l && d) {
                                        for (
                                            p = 0,
                                                e ||
                                                    d.ownerDocument === f ||
                                                    (h(d), (n = !m));
                                            (g = o[p++]);

                                        )
                                            if (g(d, e || f, n)) {
                                                s.push(d);
                                                break;
                                            }
                                        u && (x = k);
                                    }
                                    a && ((d = !g && d) && v--, t && y.push(d));
                                }
                                if (((v += w), a && w !== v)) {
                                    for (p = 0; (g = r[p++]); ) g(y, b, e, n);
                                    if (t) {
                                        if (0 < v)
                                            for (; w--; )
                                                y[w] ||
                                                    b[w] ||
                                                    (b[w] = O.call(s));
                                        b = xt(b);
                                    }
                                    L.apply(s, b),
                                        u &&
                                            !t &&
                                            0 < b.length &&
                                            1 < v + r.length &&
                                            at.uniqueSort(s);
                                }
                                return u && ((x = k), (c = _)), y;
                            }),
                            a ? ct(u) : u)
                        )).selector = t;
                    }
                    return g;
                }),
            (l = at.select =
                function (t, e, n, o) {
                    var r,
                        l,
                        c,
                        u,
                        d,
                        h = 'function' == typeof t && t,
                        f = !o && s((t = h.selector || t));
                    if (((n = n || []), 1 === f.length)) {
                        if (
                            2 < (l = f[0] = f[0].slice(0)).length &&
                            'ID' === (c = l[0]).type &&
                            9 === e.nodeType &&
                            m &&
                            i.relative[l[1].type]
                        ) {
                            if (
                                !(e = (i.find.ID(
                                    c.matches[0].replace(et, nt),
                                    e
                                ) || [])[0])
                            )
                                return n;
                            h && (e = e.parentNode),
                                (t = t.slice(l.shift().value.length));
                        }
                        for (
                            r = Q.needsContext.test(t) ? 0 : l.length;
                            r-- && ((c = l[r]), !i.relative[(u = c.type)]);

                        )
                            if (
                                (d = i.find[u]) &&
                                (o = d(
                                    c.matches[0].replace(et, nt),
                                    (tt.test(l[0].type) && vt(e.parentNode)) ||
                                        e
                                ))
                            ) {
                                if ((l.splice(r, 1), !(t = o.length && yt(l))))
                                    return L.apply(n, o), n;
                                break;
                            }
                    }
                    return (
                        (h || a(t, f))(
                            o,
                            e,
                            !m,
                            n,
                            !e || (tt.test(t) && vt(e.parentNode)) || e
                        ),
                        n
                    );
                }),
            (n.sortStable = b.split('').sort(A).join('') === b),
            (n.detectDuplicates = !!d),
            h(),
            (n.sortDetached = ut(function (t) {
                return (
                    1 & t.compareDocumentPosition(f.createElement('fieldset'))
                );
            })),
            ut(function (t) {
                return (
                    (t.innerHTML = "<a href='#'></a>"),
                    '#' === t.firstChild.getAttribute('href')
                );
            }) ||
                dt('type|href|height|width', function (t, e, n) {
                    if (!n)
                        return t.getAttribute(
                            e,
                            'type' === e.toLowerCase() ? 1 : 2
                        );
                }),
            (n.attributes &&
                ut(function (t) {
                    return (
                        (t.innerHTML = '<input/>'),
                        t.firstChild.setAttribute('value', ''),
                        '' === t.firstChild.getAttribute('value')
                    );
                })) ||
                dt('value', function (t, e, n) {
                    if (!n && 'input' === t.nodeName.toLowerCase())
                        return t.defaultValue;
                }),
            ut(function (t) {
                return null == t.getAttribute('disabled');
            }) ||
                dt($, function (t, e, n) {
                    var i;
                    if (!n)
                        return !0 === t[e]
                            ? e.toLowerCase()
                            : (i = t.getAttributeNode(e)) && i.specified
                            ? i.value
                            : null;
                }),
            at
        );
    })(t);
    (_.find = k),
        ((_.expr = k.selectors)[':'] = _.expr.pseudos),
        (_.uniqueSort = _.unique = k.uniqueSort),
        (_.text = k.getText),
        (_.isXMLDoc = k.isXML),
        (_.contains = k.contains),
        (_.escapeSelector = k.escape);
    var T = function (t, e, n) {
            for (var i = [], o = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
                if (1 === t.nodeType) {
                    if (o && _(t).is(n)) break;
                    i.push(t);
                }
            return i;
        },
        E = function (t, e) {
            for (var n = []; t; t = t.nextSibling)
                1 === t.nodeType && t !== e && n.push(t);
            return n;
        },
        S = _.expr.match.needsContext;
    function A(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
    }
    var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function I(t, e, n) {
        return m(e)
            ? _.grep(t, function (t, i) {
                  return !!e.call(t, i, t) !== n;
              })
            : e.nodeType
            ? _.grep(t, function (t) {
                  return (t === e) !== n;
              })
            : 'string' != typeof e
            ? _.grep(t, function (t) {
                  return -1 < l.call(e, t) !== n;
              })
            : _.filter(e, t, n);
    }
    (_.filter = function (t, e, n) {
        var i = e[0];
        return (
            n && (t = ':not(' + t + ')'),
            1 === e.length && 1 === i.nodeType
                ? _.find.matchesSelector(i, t)
                    ? [i]
                    : []
                : _.find.matches(
                      t,
                      _.grep(e, function (t) {
                          return 1 === t.nodeType;
                      })
                  )
        );
    }),
        _.fn.extend({
            find: function (t) {
                var e,
                    n,
                    i = this.length,
                    o = this;
                if ('string' != typeof t)
                    return this.pushStack(
                        _(t).filter(function () {
                            for (e = 0; e < i; e++)
                                if (_.contains(o[e], this)) return !0;
                        })
                    );
                for (n = this.pushStack([]), e = 0; e < i; e++)
                    _.find(t, o[e], n);
                return 1 < i ? _.uniqueSort(n) : n;
            },
            filter: function (t) {
                return this.pushStack(I(this, t || [], !1));
            },
            not: function (t) {
                return this.pushStack(I(this, t || [], !0));
            },
            is: function (t) {
                return !!I(
                    this,
                    'string' == typeof t && S.test(t) ? _(t) : t || [],
                    !1
                ).length;
            }
        });
    var O,
        N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((_.fn.init = function (t, e, n) {
        var o, r;
        if (!t) return this;
        if (((n = n || O), 'string' == typeof t)) {
            if (
                !(o =
                    '<' === t[0] && '>' === t[t.length - 1] && 3 <= t.length
                        ? [null, t, null]
                        : N.exec(t)) ||
                (!o[1] && e)
            )
                return !e || e.jquery
                    ? (e || n).find(t)
                    : this.constructor(e).find(t);
            if (o[1]) {
                if (
                    ((e = e instanceof _ ? e[0] : e),
                    _.merge(
                        this,
                        _.parseHTML(
                            o[1],
                            e && e.nodeType ? e.ownerDocument || e : i,
                            !0
                        )
                    ),
                    D.test(o[1]) && _.isPlainObject(e))
                )
                    for (o in e)
                        m(this[o]) ? this[o](e[o]) : this.attr(o, e[o]);
                return this;
            }
            return (
                (r = i.getElementById(o[2])) &&
                    ((this[0] = r), (this.length = 1)),
                this
            );
        }
        return t.nodeType
            ? ((this[0] = t), (this.length = 1), this)
            : m(t)
            ? void 0 !== n.ready
                ? n.ready(t)
                : t(_)
            : _.makeArray(t, this);
    }).prototype = _.fn),
        (O = _(i));
    var L = /^(?:parents|prev(?:Until|All))/,
        j = {children: !0, contents: !0, next: !0, prev: !0};
    function P(t, e) {
        for (; (t = t[e]) && 1 !== t.nodeType; );
        return t;
    }
    _.fn.extend({
        has: function (t) {
            var e = _(t, this),
                n = e.length;
            return this.filter(function () {
                for (var t = 0; t < n; t++)
                    if (_.contains(this, e[t])) return !0;
            });
        },
        closest: function (t, e) {
            var n,
                i = 0,
                o = this.length,
                r = [],
                s = 'string' != typeof t && _(t);
            if (!S.test(t))
                for (; i < o; i++)
                    for (n = this[i]; n && n !== e; n = n.parentNode)
                        if (
                            n.nodeType < 11 &&
                            (s
                                ? -1 < s.index(n)
                                : 1 === n.nodeType &&
                                  _.find.matchesSelector(n, t))
                        ) {
                            r.push(n);
                            break;
                        }
            return this.pushStack(1 < r.length ? _.uniqueSort(r) : r);
        },
        index: function (t) {
            return t
                ? 'string' == typeof t
                    ? l.call(_(t), this[0])
                    : l.call(this, t.jquery ? t[0] : t)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
        },
        add: function (t, e) {
            return this.pushStack(_.uniqueSort(_.merge(this.get(), _(t, e))));
        },
        addBack: function (t) {
            return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
            );
        }
    }),
        _.each(
            {
                parent: function (t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (t) {
                    return T(t, 'parentNode');
                },
                parentsUntil: function (t, e, n) {
                    return T(t, 'parentNode', n);
                },
                next: function (t) {
                    return P(t, 'nextSibling');
                },
                prev: function (t) {
                    return P(t, 'previousSibling');
                },
                nextAll: function (t) {
                    return T(t, 'nextSibling');
                },
                prevAll: function (t) {
                    return T(t, 'previousSibling');
                },
                nextUntil: function (t, e, n) {
                    return T(t, 'nextSibling', n);
                },
                prevUntil: function (t, e, n) {
                    return T(t, 'previousSibling', n);
                },
                siblings: function (t) {
                    return E((t.parentNode || {}).firstChild, t);
                },
                children: function (t) {
                    return E(t.firstChild);
                },
                contents: function (t) {
                    return void 0 !== t.contentDocument
                        ? t.contentDocument
                        : (A(t, 'template') && (t = t.content || t),
                          _.merge([], t.childNodes));
                }
            },
            function (t, e) {
                _.fn[t] = function (n, i) {
                    var o = _.map(this, e, n);
                    return (
                        'Until' !== t.slice(-5) && (i = n),
                        i && 'string' == typeof i && (o = _.filter(i, o)),
                        1 < this.length &&
                            (j[t] || _.uniqueSort(o), L.test(t) && o.reverse()),
                        this.pushStack(o)
                    );
                };
            }
        );
    var $ = /[^\x20\t\r\n\f]+/g;
    function B(t) {
        return t;
    }
    function H(t) {
        throw t;
    }
    function M(t, e, n, i) {
        var o;
        try {
            t && m((o = t.promise))
                ? o.call(t).done(e).fail(n)
                : t && m((o = t.then))
                ? o.call(t, e, n)
                : e.apply(void 0, [t].slice(i));
        } catch (t) {
            n.apply(void 0, [t]);
        }
    }
    (_.Callbacks = function (t) {
        var e;
        t =
            'string' == typeof t
                ? ((e = {}),
                  _.each(t.match($) || [], function (t, n) {
                      e[n] = !0;
                  }),
                  e)
                : _.extend({}, t);
        var n,
            i,
            o,
            r,
            s = [],
            a = [],
            l = -1,
            c = function () {
                for (r = r || t.once, o = n = !0; a.length; l = -1)
                    for (i = a.shift(); ++l < s.length; )
                        !1 === s[l].apply(i[0], i[1]) &&
                            t.stopOnFalse &&
                            ((l = s.length), (i = !1));
                t.memory || (i = !1), (n = !1), r && (s = i ? [] : '');
            },
            u = {
                add: function () {
                    return (
                        s &&
                            (i && !n && ((l = s.length - 1), a.push(i)),
                            (function e(n) {
                                _.each(n, function (n, i) {
                                    m(i)
                                        ? (t.unique && u.has(i)) || s.push(i)
                                        : i &&
                                          i.length &&
                                          'string' !== y(i) &&
                                          e(i);
                                });
                            })(arguments),
                            i && !n && c()),
                        this
                    );
                },
                remove: function () {
                    return (
                        _.each(arguments, function (t, e) {
                            for (var n; -1 < (n = _.inArray(e, s, n)); )
                                s.splice(n, 1), n <= l && l--;
                        }),
                        this
                    );
                },
                has: function (t) {
                    return t ? -1 < _.inArray(t, s) : 0 < s.length;
                },
                empty: function () {
                    return s && (s = []), this;
                },
                disable: function () {
                    return (r = a = []), (s = i = ''), this;
                },
                disabled: function () {
                    return !s;
                },
                lock: function () {
                    return (r = a = []), i || n || (s = i = ''), this;
                },
                locked: function () {
                    return !!r;
                },
                fireWith: function (t, e) {
                    return (
                        r ||
                            ((e = [t, (e = e || []).slice ? e.slice() : e]),
                            a.push(e),
                            n || c()),
                        this
                    );
                },
                fire: function () {
                    return u.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!o;
                }
            };
        return u;
    }),
        _.extend({
            Deferred: function (e) {
                var n = [
                        [
                            'notify',
                            'progress',
                            _.Callbacks('memory'),
                            _.Callbacks('memory'),
                            2
                        ],
                        [
                            'resolve',
                            'done',
                            _.Callbacks('once memory'),
                            _.Callbacks('once memory'),
                            0,
                            'resolved'
                        ],
                        [
                            'reject',
                            'fail',
                            _.Callbacks('once memory'),
                            _.Callbacks('once memory'),
                            1,
                            'rejected'
                        ]
                    ],
                    i = 'pending',
                    o = {
                        state: function () {
                            return i;
                        },
                        always: function () {
                            return r.done(arguments).fail(arguments), this;
                        },
                        catch: function (t) {
                            return o.then(null, t);
                        },
                        pipe: function () {
                            var t = arguments;
                            return _.Deferred(function (e) {
                                _.each(n, function (n, i) {
                                    var o = m(t[i[4]]) && t[i[4]];
                                    r[i[1]](function () {
                                        var t = o && o.apply(this, arguments);
                                        t && m(t.promise)
                                            ? t
                                                  .promise()
                                                  .progress(e.notify)
                                                  .done(e.resolve)
                                                  .fail(e.reject)
                                            : e[i[0] + 'With'](
                                                  this,
                                                  o ? [t] : arguments
                                              );
                                    });
                                }),
                                    (t = null);
                            }).promise();
                        },
                        then: function (e, i, o) {
                            var r = 0;
                            function s(e, n, i, o) {
                                return function () {
                                    var a = this,
                                        l = arguments,
                                        c = function () {
                                            var t, c;
                                            if (!(e < r)) {
                                                if (
                                                    (t = i.apply(a, l)) ===
                                                    n.promise()
                                                )
                                                    throw new TypeError(
                                                        'Thenable self-resolution'
                                                    );
                                                (c =
                                                    t &&
                                                    ('object' == _typeof(t) ||
                                                        'function' ==
                                                            typeof t) &&
                                                    t.then),
                                                    m(c)
                                                        ? o
                                                            ? c.call(
                                                                  t,
                                                                  s(r, n, B, o),
                                                                  s(r, n, H, o)
                                                              )
                                                            : (r++,
                                                              c.call(
                                                                  t,
                                                                  s(r, n, B, o),
                                                                  s(r, n, H, o),
                                                                  s(
                                                                      r,
                                                                      n,
                                                                      B,
                                                                      n.notifyWith
                                                                  )
                                                              ))
                                                        : (i !== B &&
                                                              ((a = void 0),
                                                              (l = [t])),
                                                          (o || n.resolveWith)(
                                                              a,
                                                              l
                                                          ));
                                            }
                                        },
                                        u = o
                                            ? c
                                            : function () {
                                                  try {
                                                      c();
                                                  } catch (t) {
                                                      _.Deferred
                                                          .exceptionHook &&
                                                          _.Deferred.exceptionHook(
                                                              t,
                                                              u.stackTrace
                                                          ),
                                                          r <= e + 1 &&
                                                              (i !== H &&
                                                                  ((a = void 0),
                                                                  (l = [t])),
                                                              n.rejectWith(
                                                                  a,
                                                                  l
                                                              ));
                                                  }
                                              };
                                    e
                                        ? u()
                                        : (_.Deferred.getStackHook &&
                                              (u.stackTrace =
                                                  _.Deferred.getStackHook()),
                                          t.setTimeout(u));
                                };
                            }
                            return _.Deferred(function (t) {
                                n[0][3].add(
                                    s(0, t, m(o) ? o : B, t.notifyWith)
                                ),
                                    n[1][3].add(s(0, t, m(e) ? e : B)),
                                    n[2][3].add(s(0, t, m(i) ? i : H));
                            }).promise();
                        },
                        promise: function (t) {
                            return null != t ? _.extend(t, o) : o;
                        }
                    },
                    r = {};
                return (
                    _.each(n, function (t, e) {
                        var s = e[2],
                            a = e[5];
                        (o[e[1]] = s.add),
                            a &&
                                s.add(
                                    function () {
                                        i = a;
                                    },
                                    n[3 - t][2].disable,
                                    n[3 - t][3].disable,
                                    n[0][2].lock,
                                    n[0][3].lock
                                ),
                            s.add(e[3].fire),
                            (r[e[0]] = function () {
                                return (
                                    r[e[0] + 'With'](
                                        this === r ? void 0 : this,
                                        arguments
                                    ),
                                    this
                                );
                            }),
                            (r[e[0] + 'With'] = s.fireWith);
                    }),
                    o.promise(r),
                    e && e.call(r, r),
                    r
                );
            },
            when: function (t) {
                var e = arguments.length,
                    n = e,
                    i = Array(n),
                    o = r.call(arguments),
                    s = _.Deferred(),
                    a = function (t) {
                        return function (n) {
                            (i[t] = this),
                                (o[t] =
                                    1 < arguments.length
                                        ? r.call(arguments)
                                        : n),
                                --e || s.resolveWith(i, o);
                        };
                    };
                if (
                    e <= 1 &&
                    (M(t, s.done(a(n)).resolve, s.reject, !e),
                    'pending' === s.state() || m(o[n] && o[n].then))
                )
                    return s.then();
                for (; n--; ) M(o[n], a(n), s.reject);
                return s.promise();
            }
        });
    var R = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (_.Deferred.exceptionHook = function (e, n) {
        t.console &&
            t.console.warn &&
            e &&
            R.test(e.name) &&
            t.console.warn(
                'jQuery.Deferred exception: ' + e.message,
                e.stack,
                n
            );
    }),
        (_.readyException = function (e) {
            t.setTimeout(function () {
                throw e;
            });
        });
    var z = _.Deferred();
    function q() {
        i.removeEventListener('DOMContentLoaded', q),
            t.removeEventListener('load', q),
            _.ready();
    }
    (_.fn.ready = function (t) {
        return (
            z.then(t).catch(function (t) {
                _.readyException(t);
            }),
            this
        );
    }),
        _.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (t) {
                (!0 === t ? --_.readyWait : _.isReady) ||
                    ((_.isReady = !0) !== t && 0 < --_.readyWait) ||
                    z.resolveWith(i, [_]);
            }
        }),
        (_.ready.then = z.then),
        'complete' === i.readyState ||
        ('loading' !== i.readyState && !i.documentElement.doScroll)
            ? t.setTimeout(_.ready)
            : (i.addEventListener('DOMContentLoaded', q),
              t.addEventListener('load', q));
    var W = function t(e, n, i, o, r, s, a) {
            var l = 0,
                c = e.length,
                u = null == i;
            if ('object' === y(i))
                for (l in ((r = !0), i)) t(e, n, l, i[l], !0, s, a);
            else if (
                void 0 !== o &&
                ((r = !0),
                m(o) || (a = !0),
                u &&
                    (a
                        ? (n.call(e, o), (n = null))
                        : ((u = n),
                          (n = function (t, e, n) {
                              return u.call(_(t), n);
                          }))),
                n)
            )
                for (; l < c; l++)
                    n(e[l], i, a ? o : o.call(e[l], l, n(e[l], i)));
            return r ? e : u ? n.call(e) : c ? n(e[0], i) : s;
        },
        U = /^-ms-/,
        F = /-([a-z])/g;
    function V(t, e) {
        return e.toUpperCase();
    }
    function Y(t) {
        return t.replace(U, 'ms-').replace(F, V);
    }
    var Q = function (t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
    };
    function X() {
        this.expando = _.expando + X.uid++;
    }
    (X.uid = 1),
        (X.prototype = {
            cache: function (t) {
                var e = t[this.expando];
                return (
                    e ||
                        ((e = {}),
                        Q(t) &&
                            (t.nodeType
                                ? (t[this.expando] = e)
                                : Object.defineProperty(t, this.expando, {
                                      value: e,
                                      configurable: !0
                                  }))),
                    e
                );
            },
            set: function (t, e, n) {
                var i,
                    o = this.cache(t);
                if ('string' == typeof e) o[Y(e)] = n;
                else for (i in e) o[Y(i)] = e[i];
                return o;
            },
            get: function (t, e) {
                return void 0 === e
                    ? this.cache(t)
                    : t[this.expando] && t[this.expando][Y(e)];
            },
            access: function (t, e, n) {
                return void 0 === e ||
                    (e && 'string' == typeof e && void 0 === n)
                    ? this.get(t, e)
                    : (this.set(t, e, n), void 0 !== n ? n : e);
            },
            remove: function (t, e) {
                var n,
                    i = t[this.expando];
                if (void 0 !== i) {
                    if (void 0 !== e) {
                        n = (e = Array.isArray(e)
                            ? e.map(Y)
                            : (e = Y(e)) in i
                            ? [e]
                            : e.match($) || []).length;
                        for (; n--; ) delete i[e[n]];
                    }
                    (void 0 === e || _.isEmptyObject(i)) &&
                        (t.nodeType
                            ? (t[this.expando] = void 0)
                            : delete t[this.expando]);
                }
            },
            hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !_.isEmptyObject(e);
            }
        });
    var K = new X(),
        Z = new X(),
        G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        J = /[A-Z]/g;
    function tt(t, e, n) {
        var i, o;
        if (void 0 === n && 1 === t.nodeType)
            if (
                ((i = 'data-' + e.replace(J, '-$&').toLowerCase()),
                'string' == typeof (n = t.getAttribute(i)))
            ) {
                try {
                    n =
                        'true' === (o = n) ||
                        ('false' !== o &&
                            ('null' === o
                                ? null
                                : o === +o + ''
                                ? +o
                                : G.test(o)
                                ? JSON.parse(o)
                                : o));
                } catch (t) {}
                Z.set(t, e, n);
            } else n = void 0;
        return n;
    }
    _.extend({
        hasData: function (t) {
            return Z.hasData(t) || K.hasData(t);
        },
        data: function (t, e, n) {
            return Z.access(t, e, n);
        },
        removeData: function (t, e) {
            Z.remove(t, e);
        },
        _data: function (t, e, n) {
            return K.access(t, e, n);
        },
        _removeData: function (t, e) {
            K.remove(t, e);
        }
    }),
        _.fn.extend({
            data: function (t, e) {
                var n,
                    i,
                    o,
                    r = this[0],
                    s = r && r.attributes;
                if (void 0 === t) {
                    if (
                        this.length &&
                        ((o = Z.get(r)),
                        1 === r.nodeType && !K.get(r, 'hasDataAttrs'))
                    ) {
                        for (n = s.length; n--; )
                            s[n] &&
                                0 === (i = s[n].name).indexOf('data-') &&
                                ((i = Y(i.slice(5))), tt(r, i, o[i]));
                        K.set(r, 'hasDataAttrs', !0);
                    }
                    return o;
                }
                return 'object' == _typeof(t)
                    ? this.each(function () {
                          Z.set(this, t);
                      })
                    : W(
                          this,
                          function (e) {
                              var n;
                              if (r && void 0 === e)
                                  return void 0 !== (n = Z.get(r, t)) ||
                                      void 0 !== (n = tt(r, t))
                                      ? n
                                      : void 0;
                              this.each(function () {
                                  Z.set(this, t, e);
                              });
                          },
                          null,
                          e,
                          1 < arguments.length,
                          null,
                          !0
                      );
            },
            removeData: function (t) {
                return this.each(function () {
                    Z.remove(this, t);
                });
            }
        }),
        _.extend({
            queue: function (t, e, n) {
                var i;
                if (t)
                    return (
                        (e = (e || 'fx') + 'queue'),
                        (i = K.get(t, e)),
                        n &&
                            (!i || Array.isArray(n)
                                ? (i = K.access(t, e, _.makeArray(n)))
                                : i.push(n)),
                        i || []
                    );
            },
            dequeue: function (t, e) {
                var n = _.queue(t, (e = e || 'fx')),
                    i = n.length,
                    o = n.shift(),
                    r = _._queueHooks(t, e);
                'inprogress' === o && ((o = n.shift()), i--),
                    o &&
                        ('fx' === e && n.unshift('inprogress'),
                        delete r.stop,
                        o.call(
                            t,
                            function () {
                                _.dequeue(t, e);
                            },
                            r
                        )),
                    !i && r && r.empty.fire();
            },
            _queueHooks: function (t, e) {
                var n = e + 'queueHooks';
                return (
                    K.get(t, n) ||
                    K.access(t, n, {
                        empty: _.Callbacks('once memory').add(function () {
                            K.remove(t, [e + 'queue', n]);
                        })
                    })
                );
            }
        }),
        _.fn.extend({
            queue: function (t, e) {
                var n = 2;
                return (
                    'string' != typeof t && ((e = t), (t = 'fx'), n--),
                    arguments.length < n
                        ? _.queue(this[0], t)
                        : void 0 === e
                        ? this
                        : this.each(function () {
                              var n = _.queue(this, t, e);
                              _._queueHooks(this, t),
                                  'fx' === t &&
                                      'inprogress' !== n[0] &&
                                      _.dequeue(this, t);
                          })
                );
            },
            dequeue: function (t) {
                return this.each(function () {
                    _.dequeue(this, t);
                });
            },
            clearQueue: function (t) {
                return this.queue(t || 'fx', []);
            },
            promise: function (t, e) {
                var n,
                    i = 1,
                    o = _.Deferred(),
                    r = this,
                    s = this.length,
                    a = function () {
                        --i || o.resolveWith(r, [r]);
                    };
                for (
                    'string' != typeof t && ((e = t), (t = void 0)),
                        t = t || 'fx';
                    s--;

                )
                    (n = K.get(r[s], t + 'queueHooks')) &&
                        n.empty &&
                        (i++, n.empty.add(a));
                return a(), o.promise(e);
            }
        });
    var et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        nt = new RegExp('^(?:([+-])=|)(' + et + ')([a-z%]*)$', 'i'),
        it = ['Top', 'Right', 'Bottom', 'Left'],
        ot = i.documentElement,
        rt = function (t) {
            return _.contains(t.ownerDocument, t);
        },
        st = {composed: !0};
    ot.getRootNode &&
        (rt = function (t) {
            return (
                _.contains(t.ownerDocument, t) ||
                t.getRootNode(st) === t.ownerDocument
            );
        });
    var at = function (t, e) {
            return (
                'none' === (t = e || t).style.display ||
                ('' === t.style.display &&
                    rt(t) &&
                    'none' === _.css(t, 'display'))
            );
        },
        lt = function (t, e, n, i) {
            var o,
                r,
                s = {};
            for (r in e) (s[r] = t.style[r]), (t.style[r] = e[r]);
            for (r in ((o = n.apply(t, i || [])), e)) t.style[r] = s[r];
            return o;
        };
    function ct(t, e, n, i) {
        var o,
            r,
            s = 20,
            a = i
                ? function () {
                      return i.cur();
                  }
                : function () {
                      return _.css(t, e, '');
                  },
            l = a(),
            c = (n && n[3]) || (_.cssNumber[e] ? '' : 'px'),
            u =
                t.nodeType &&
                (_.cssNumber[e] || ('px' !== c && +l)) &&
                nt.exec(_.css(t, e));
        if (u && u[3] !== c) {
            for (l /= 2, c = c || u[3], u = +l || 1; s--; )
                _.style(t, e, u + c),
                    (1 - r) * (1 - (r = a() / l || 0.5)) <= 0 && (s = 0),
                    (u /= r);
            _.style(t, e, (u *= 2) + c), (n = n || []);
        }
        return (
            n &&
                ((u = +u || +l || 0),
                (o = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
                i && ((i.unit = c), (i.start = u), (i.end = o))),
            o
        );
    }
    var ut = {};
    function dt(t, e) {
        for (var n, i, o, r, s, a, l, c = [], u = 0, d = t.length; u < d; u++)
            (i = t[u]).style &&
                ((n = i.style.display),
                e
                    ? ('none' === n &&
                          ((c[u] = K.get(i, 'display') || null),
                          c[u] || (i.style.display = '')),
                      '' === i.style.display &&
                          at(i) &&
                          (c[u] =
                              ((l = s = r = void 0),
                              (s = (o = i).ownerDocument),
                              (a = o.nodeName),
                              (l = ut[a]) ||
                                  ((r = s.body.appendChild(s.createElement(a))),
                                  (l = _.css(r, 'display')),
                                  r.parentNode.removeChild(r),
                                  'none' === l && (l = 'block'),
                                  (ut[a] = l)))))
                    : 'none' !== n &&
                      ((c[u] = 'none'), K.set(i, 'display', n)));
        for (u = 0; u < d; u++) null != c[u] && (t[u].style.display = c[u]);
        return t;
    }
    _.fn.extend({
        show: function () {
            return dt(this, !0);
        },
        hide: function () {
            return dt(this);
        },
        toggle: function (t) {
            return 'boolean' == typeof t
                ? t
                    ? this.show()
                    : this.hide()
                : this.each(function () {
                      at(this) ? _(this).show() : _(this).hide();
                  });
        }
    });
    var ht = /^(?:checkbox|radio)$/i,
        ft = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        pt = /^$|^module$|\/(?:java|ecma)script/i,
        mt = {
            option: [1, "<select multiple='multiple'>", '</select>'],
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            _default: [0, '', '']
        };
    function gt(t, e) {
        var n;
        return (
            (n =
                void 0 !== t.getElementsByTagName
                    ? t.getElementsByTagName(e || '*')
                    : void 0 !== t.querySelectorAll
                    ? t.querySelectorAll(e || '*')
                    : []),
            void 0 === e || (e && A(t, e)) ? _.merge([t], n) : n
        );
    }
    function vt(t, e) {
        for (var n = 0, i = t.length; n < i; n++)
            K.set(t[n], 'globalEval', !e || K.get(e[n], 'globalEval'));
    }
    (mt.optgroup = mt.option),
        (mt.tbody = mt.tfoot = mt.colgroup = mt.caption = mt.thead),
        (mt.th = mt.td);
    var wt,
        yt,
        bt = /<|&#?\w+;/;
    function _t(t, e, n, i, o) {
        for (
            var r,
                s,
                a,
                l,
                c,
                u,
                d = e.createDocumentFragment(),
                h = [],
                f = 0,
                p = t.length;
            f < p;
            f++
        )
            if ((r = t[f]) || 0 === r)
                if ('object' === y(r)) _.merge(h, r.nodeType ? [r] : r);
                else if (bt.test(r)) {
                    for (
                        s = s || d.appendChild(e.createElement('div')),
                            a = (ft.exec(r) || ['', ''])[1].toLowerCase(),
                            l = mt[a] || mt._default,
                            s.innerHTML = l[1] + _.htmlPrefilter(r) + l[2],
                            u = l[0];
                        u--;

                    )
                        s = s.lastChild;
                    _.merge(h, s.childNodes),
                        ((s = d.firstChild).textContent = '');
                } else h.push(e.createTextNode(r));
        for (d.textContent = '', f = 0; (r = h[f++]); )
            if (i && -1 < _.inArray(r, i)) o && o.push(r);
            else if (
                ((c = rt(r)),
                (s = gt(d.appendChild(r), 'script')),
                c && vt(s),
                n)
            )
                for (u = 0; (r = s[u++]); ) pt.test(r.type || '') && n.push(r);
        return d;
    }
    (wt = i.createDocumentFragment().appendChild(i.createElement('div'))),
        (yt = i.createElement('input')).setAttribute('type', 'radio'),
        yt.setAttribute('checked', 'checked'),
        yt.setAttribute('name', 't'),
        wt.appendChild(yt),
        (p.checkClone = wt.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (wt.innerHTML = '<textarea>x</textarea>'),
        (p.noCloneChecked = !!wt.cloneNode(!0).lastChild.defaultValue);
    var xt = /^key/,
        Ct = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        kt = /^([^.]*)(?:\.(.+)|)/;
    function Tt() {
        return !0;
    }
    function Et() {
        return !1;
    }
    function St(t, e) {
        return (
            (t ===
                (function () {
                    try {
                        return i.activeElement;
                    } catch (t) {}
                })()) ==
            ('focus' === e)
        );
    }
    function At(t, e, n, i, o, r) {
        var s, a;
        if ('object' == _typeof(e)) {
            for (a in ('string' != typeof n && ((i = i || n), (n = void 0)), e))
                At(t, a, n, i, e[a], r);
            return t;
        }
        if (
            (null == i && null == o
                ? ((o = n), (i = n = void 0))
                : null == o &&
                  ('string' == typeof n
                      ? ((o = i), (i = void 0))
                      : ((o = i), (i = n), (n = void 0))),
            !1 === o)
        )
            o = Et;
        else if (!o) return t;
        return (
            1 === r &&
                ((s = o),
                ((o = function (t) {
                    return _().off(t), s.apply(this, arguments);
                }).guid = s.guid || (s.guid = _.guid++))),
            t.each(function () {
                _.event.add(this, e, o, i, n);
            })
        );
    }
    function Dt(t, e, n) {
        n
            ? (K.set(t, e, !1),
              _.event.add(t, e, {
                  namespace: !1,
                  handler: function (t) {
                      var i,
                          o,
                          s = K.get(this, e);
                      if (1 & t.isTrigger && this[e]) {
                          if (s.length)
                              (_.event.special[e] || {}).delegateType &&
                                  t.stopPropagation();
                          else if (
                              ((s = r.call(arguments)),
                              K.set(this, e, s),
                              (i = n(this, e)),
                              this[e](),
                              s !== (o = K.get(this, e)) || i
                                  ? K.set(this, e, !1)
                                  : (o = {}),
                              s !== o)
                          )
                              return (
                                  t.stopImmediatePropagation(),
                                  t.preventDefault(),
                                  o.value
                              );
                      } else
                          s.length &&
                              (K.set(this, e, {
                                  value: _.event.trigger(
                                      _.extend(s[0], _.Event.prototype),
                                      s.slice(1),
                                      this
                                  )
                              }),
                              t.stopImmediatePropagation());
                  }
              }))
            : void 0 === K.get(t, e) && _.event.add(t, e, Tt);
    }
    (_.event = {
        global: {},
        add: function (t, e, n, i, o) {
            var r,
                s,
                a,
                l,
                c,
                u,
                d,
                h,
                f,
                p,
                m,
                g = K.get(t);
            if (g)
                for (
                    n.handler && ((n = (r = n).handler), (o = r.selector)),
                        o && _.find.matchesSelector(ot, o),
                        n.guid || (n.guid = _.guid++),
                        (l = g.events) || (l = g.events = {}),
                        (s = g.handle) ||
                            (s = g.handle =
                                function (e) {
                                    return void 0 !== _ &&
                                        _.event.triggered !== e.type
                                        ? _.event.dispatch.apply(t, arguments)
                                        : void 0;
                                }),
                        c = (e = (e || '').match($) || ['']).length;
                    c--;

                )
                    (f = m = (a = kt.exec(e[c]) || [])[1]),
                        (p = (a[2] || '').split('.').sort()),
                        f &&
                            ((d = _.event.special[f] || {}),
                            (f = (o ? d.delegateType : d.bindType) || f),
                            (d = _.event.special[f] || {}),
                            (u = _.extend(
                                {
                                    type: f,
                                    origType: m,
                                    data: i,
                                    handler: n,
                                    guid: n.guid,
                                    selector: o,
                                    needsContext:
                                        o && _.expr.match.needsContext.test(o),
                                    namespace: p.join('.')
                                },
                                r
                            )),
                            (h = l[f]) ||
                                (((h = l[f] = []).delegateCount = 0),
                                (d.setup && !1 !== d.setup.call(t, i, p, s)) ||
                                    (t.addEventListener &&
                                        t.addEventListener(f, s))),
                            d.add &&
                                (d.add.call(t, u),
                                u.handler.guid || (u.handler.guid = n.guid)),
                            o ? h.splice(h.delegateCount++, 0, u) : h.push(u),
                            (_.event.global[f] = !0));
        },
        remove: function (t, e, n, i, o) {
            var r,
                s,
                a,
                l,
                c,
                u,
                d,
                h,
                f,
                p,
                m,
                g = K.hasData(t) && K.get(t);
            if (g && (l = g.events)) {
                for (c = (e = (e || '').match($) || ['']).length; c--; )
                    if (
                        ((f = m = (a = kt.exec(e[c]) || [])[1]),
                        (p = (a[2] || '').split('.').sort()),
                        f)
                    ) {
                        for (
                            d = _.event.special[f] || {},
                                h =
                                    l[
                                        (f =
                                            (i ? d.delegateType : d.bindType) ||
                                            f)
                                    ] || [],
                                a =
                                    a[2] &&
                                    new RegExp(
                                        '(^|\\.)' +
                                            p.join('\\.(?:.*\\.|)') +
                                            '(\\.|$)'
                                    ),
                                s = r = h.length;
                            r--;

                        )
                            (u = h[r]),
                                (!o && m !== u.origType) ||
                                    (n && n.guid !== u.guid) ||
                                    (a && !a.test(u.namespace)) ||
                                    (i &&
                                        i !== u.selector &&
                                        ('**' !== i || !u.selector)) ||
                                    (h.splice(r, 1),
                                    u.selector && h.delegateCount--,
                                    d.remove && d.remove.call(t, u));
                        s &&
                            !h.length &&
                            ((d.teardown &&
                                !1 !== d.teardown.call(t, p, g.handle)) ||
                                _.removeEvent(t, f, g.handle),
                            delete l[f]);
                    } else for (f in l) _.event.remove(t, f + e[c], n, i, !0);
                _.isEmptyObject(l) && K.remove(t, 'handle events');
            }
        },
        dispatch: function (t) {
            var e,
                n,
                i,
                o,
                r,
                s,
                a = _.event.fix(t),
                l = new Array(arguments.length),
                c = (K.get(this, 'events') || {})[a.type] || [],
                u = _.event.special[a.type] || {};
            for (l[0] = a, e = 1; e < arguments.length; e++)
                l[e] = arguments[e];
            if (
                ((a.delegateTarget = this),
                !u.preDispatch || !1 !== u.preDispatch.call(this, a))
            ) {
                for (
                    s = _.event.handlers.call(this, a, c), e = 0;
                    (o = s[e++]) && !a.isPropagationStopped();

                )
                    for (
                        a.currentTarget = o.elem, n = 0;
                        (r = o.handlers[n++]) &&
                        !a.isImmediatePropagationStopped();

                    )
                        (a.rnamespace &&
                            !1 !== r.namespace &&
                            !a.rnamespace.test(r.namespace)) ||
                            ((a.handleObj = r),
                            (a.data = r.data),
                            void 0 !==
                                (i = (
                                    (_.event.special[r.origType] || {})
                                        .handle || r.handler
                                ).apply(o.elem, l)) &&
                                !1 === (a.result = i) &&
                                (a.preventDefault(), a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (t, e) {
            var n,
                i,
                o,
                r,
                s,
                a = [],
                l = e.delegateCount,
                c = t.target;
            if (l && c.nodeType && !('click' === t.type && 1 <= t.button))
                for (; c !== this; c = c.parentNode || this)
                    if (
                        1 === c.nodeType &&
                        ('click' !== t.type || !0 !== c.disabled)
                    ) {
                        for (r = [], s = {}, n = 0; n < l; n++)
                            void 0 === s[(o = (i = e[n]).selector + ' ')] &&
                                (s[o] = i.needsContext
                                    ? -1 < _(o, this).index(c)
                                    : _.find(o, this, null, [c]).length),
                                s[o] && r.push(i);
                        r.length && a.push({elem: c, handlers: r});
                    }
            return (
                (c = this),
                l < e.length && a.push({elem: c, handlers: e.slice(l)}),
                a
            );
        },
        addProp: function (t, e) {
            Object.defineProperty(_.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e)
                    ? function () {
                          if (this.originalEvent) return e(this.originalEvent);
                      }
                    : function () {
                          if (this.originalEvent) return this.originalEvent[t];
                      },
                set: function (e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    });
                }
            });
        },
        fix: function (t) {
            return t[_.expando] ? t : new _.Event(t);
        },
        special: {
            load: {noBubble: !0},
            click: {
                setup: function (t) {
                    var e = this || t;
                    return (
                        ht.test(e.type) &&
                            e.click &&
                            A(e, 'input') &&
                            Dt(e, 'click', Tt),
                        !1
                    );
                },
                trigger: function (t) {
                    var e = this || t;
                    return (
                        ht.test(e.type) &&
                            e.click &&
                            A(e, 'input') &&
                            Dt(e, 'click'),
                        !0
                    );
                },
                _default: function (t) {
                    var e = t.target;
                    return (
                        (ht.test(e.type) &&
                            e.click &&
                            A(e, 'input') &&
                            K.get(e, 'click')) ||
                        A(e, 'a')
                    );
                }
            },
            beforeunload: {
                postDispatch: function (t) {
                    void 0 !== t.result &&
                        t.originalEvent &&
                        (t.originalEvent.returnValue = t.result);
                }
            }
        }
    }),
        (_.removeEvent = function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n);
        }),
        ((_.Event = function (t, e) {
            if (!(this instanceof _.Event)) return new _.Event(t, e);
            t && t.type
                ? ((this.originalEvent = t),
                  (this.type = t.type),
                  (this.isDefaultPrevented =
                      t.defaultPrevented ||
                      (void 0 === t.defaultPrevented && !1 === t.returnValue)
                          ? Tt
                          : Et),
                  (this.target =
                      t.target && 3 === t.target.nodeType
                          ? t.target.parentNode
                          : t.target),
                  (this.currentTarget = t.currentTarget),
                  (this.relatedTarget = t.relatedTarget))
                : (this.type = t),
                e && _.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || Date.now()),
                (this[_.expando] = !0);
        }).prototype = {
            constructor: _.Event,
            isDefaultPrevented: Et,
            isPropagationStopped: Et,
            isImmediatePropagationStopped: Et,
            isSimulated: !1,
            preventDefault: function () {
                var t = this.originalEvent;
                (this.isDefaultPrevented = Tt),
                    t && !this.isSimulated && t.preventDefault();
            },
            stopPropagation: function () {
                var t = this.originalEvent;
                (this.isPropagationStopped = Tt),
                    t && !this.isSimulated && t.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var t = this.originalEvent;
                (this.isImmediatePropagationStopped = Tt),
                    t && !this.isSimulated && t.stopImmediatePropagation(),
                    this.stopPropagation();
            }
        }),
        _.each(
            {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: function (t) {
                    var e = t.button;
                    return null == t.which && xt.test(t.type)
                        ? null != t.charCode
                            ? t.charCode
                            : t.keyCode
                        : !t.which && void 0 !== e && Ct.test(t.type)
                        ? 1 & e
                            ? 1
                            : 2 & e
                            ? 3
                            : 4 & e
                            ? 2
                            : 0
                        : t.which;
                }
            },
            _.event.addProp
        ),
        _.each({focus: 'focusin', blur: 'focusout'}, function (t, e) {
            _.event.special[t] = {
                setup: function () {
                    return Dt(this, t, St), !1;
                },
                trigger: function () {
                    return Dt(this, t), !0;
                },
                delegateType: e
            };
        }),
        _.each(
            {
                mouseenter: 'mouseover',
                mouseleave: 'mouseout',
                pointerenter: 'pointerover',
                pointerleave: 'pointerout'
            },
            function (t, e) {
                _.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function (t) {
                        var n,
                            i = t.relatedTarget,
                            o = t.handleObj;
                        return (
                            (i && (i === this || _.contains(this, i))) ||
                                ((t.type = o.origType),
                                (n = o.handler.apply(this, arguments)),
                                (t.type = e)),
                            n
                        );
                    }
                };
            }
        ),
        _.fn.extend({
            on: function (t, e, n, i) {
                return At(this, t, e, n, i);
            },
            one: function (t, e, n, i) {
                return At(this, t, e, n, i, 1);
            },
            off: function (t, e, n) {
                var i, o;
                if (t && t.preventDefault && t.handleObj)
                    return (
                        (i = t.handleObj),
                        _(t.delegateTarget).off(
                            i.namespace
                                ? i.origType + '.' + i.namespace
                                : i.origType,
                            i.selector,
                            i.handler
                        ),
                        this
                    );
                if ('object' == _typeof(t)) {
                    for (o in t) this.off(o, e, t[o]);
                    return this;
                }
                return (
                    (!1 !== e && 'function' != typeof e) ||
                        ((n = e), (e = void 0)),
                    !1 === n && (n = Et),
                    this.each(function () {
                        _.event.remove(this, t, n, e);
                    })
                );
            }
        });
    var It =
            /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Ot = /<script|<style|<link/i,
        Nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function jt(t, e) {
        return (
            (A(t, 'table') &&
                A(11 !== e.nodeType ? e : e.firstChild, 'tr') &&
                _(t).children('tbody')[0]) ||
            t
        );
    }
    function Pt(t) {
        return (t.type = (null !== t.getAttribute('type')) + '/' + t.type), t;
    }
    function $t(t) {
        return (
            'true/' === (t.type || '').slice(0, 5)
                ? (t.type = t.type.slice(5))
                : t.removeAttribute('type'),
            t
        );
    }
    function Bt(t, e) {
        var n, i, o, r, s, a, l, c;
        if (1 === e.nodeType) {
            if (
                K.hasData(t) &&
                ((r = K.access(t)), (s = K.set(e, r)), (c = r.events))
            )
                for (o in (delete s.handle, (s.events = {}), c))
                    for (n = 0, i = c[o].length; n < i; n++)
                        _.event.add(e, o, c[o][n]);
            Z.hasData(t) &&
                ((a = Z.access(t)), (l = _.extend({}, a)), Z.set(e, l));
        }
    }
    function Ht(t, e, n, i) {
        e = s.apply([], e);
        var o,
            r,
            a,
            l,
            c,
            u,
            d = 0,
            h = t.length,
            f = h - 1,
            g = e[0],
            v = m(g);
        if (v || (1 < h && 'string' == typeof g && !p.checkClone && Nt.test(g)))
            return t.each(function (o) {
                var r = t.eq(o);
                v && (e[0] = g.call(this, o, r.html())), Ht(r, e, n, i);
            });
        if (
            h &&
            ((r = (o = _t(e, t[0].ownerDocument, !1, t, i)).firstChild),
            1 === o.childNodes.length && (o = r),
            r || i)
        ) {
            for (l = (a = _.map(gt(o, 'script'), Pt)).length; d < h; d++)
                (c = o),
                    d !== f &&
                        ((c = _.clone(c, !0, !0)),
                        l && _.merge(a, gt(c, 'script'))),
                    n.call(t[d], c, d);
            if (l)
                for (
                    u = a[a.length - 1].ownerDocument, _.map(a, $t), d = 0;
                    d < l;
                    d++
                )
                    (c = a[d]),
                        pt.test(c.type || '') &&
                            !K.access(c, 'globalEval') &&
                            _.contains(u, c) &&
                            (c.src && 'module' !== (c.type || '').toLowerCase()
                                ? _._evalUrl &&
                                  !c.noModule &&
                                  _._evalUrl(c.src, {
                                      nonce: c.nonce || c.getAttribute('nonce')
                                  })
                                : w(c.textContent.replace(Lt, ''), c, u));
        }
        return t;
    }
    function Mt(t, e, n) {
        for (var i, o = e ? _.filter(e, t) : t, r = 0; null != (i = o[r]); r++)
            n || 1 !== i.nodeType || _.cleanData(gt(i)),
                i.parentNode &&
                    (n && rt(i) && vt(gt(i, 'script')),
                    i.parentNode.removeChild(i));
        return t;
    }
    _.extend({
        htmlPrefilter: function (t) {
            return t.replace(It, '<$1></$2>');
        },
        clone: function (t, e, n) {
            var i,
                o,
                r,
                s,
                a,
                l,
                c,
                u = t.cloneNode(!0),
                d = rt(t);
            if (
                !(
                    p.noCloneChecked ||
                    (1 !== t.nodeType && 11 !== t.nodeType) ||
                    _.isXMLDoc(t)
                )
            )
                for (s = gt(u), i = 0, o = (r = gt(t)).length; i < o; i++)
                    (a = r[i]),
                        'input' === (c = (l = s[i]).nodeName.toLowerCase()) &&
                        ht.test(a.type)
                            ? (l.checked = a.checked)
                            : ('input' !== c && 'textarea' !== c) ||
                              (l.defaultValue = a.defaultValue);
            if (e)
                if (n)
                    for (
                        r = r || gt(t), s = s || gt(u), i = 0, o = r.length;
                        i < o;
                        i++
                    )
                        Bt(r[i], s[i]);
                else Bt(t, u);
            return (
                0 < (s = gt(u, 'script')).length &&
                    vt(s, !d && gt(t, 'script')),
                u
            );
        },
        cleanData: function (t) {
            for (
                var e, n, i, o = _.event.special, r = 0;
                void 0 !== (n = t[r]);
                r++
            )
                if (Q(n)) {
                    if ((e = n[K.expando])) {
                        if (e.events)
                            for (i in e.events)
                                o[i]
                                    ? _.event.remove(n, i)
                                    : _.removeEvent(n, i, e.handle);
                        n[K.expando] = void 0;
                    }
                    n[Z.expando] && (n[Z.expando] = void 0);
                }
        }
    }),
        _.fn.extend({
            detach: function (t) {
                return Mt(this, t, !0);
            },
            remove: function (t) {
                return Mt(this, t);
            },
            text: function (t) {
                return W(
                    this,
                    function (t) {
                        return void 0 === t
                            ? _.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType &&
                                      11 !== this.nodeType &&
                                      9 !== this.nodeType) ||
                                      (this.textContent = t);
                              });
                    },
                    null,
                    t,
                    arguments.length
                );
            },
            append: function () {
                return Ht(this, arguments, function (t) {
                    (1 !== this.nodeType &&
                        11 !== this.nodeType &&
                        9 !== this.nodeType) ||
                        jt(this, t).appendChild(t);
                });
            },
            prepend: function () {
                return Ht(this, arguments, function (t) {
                    if (
                        1 === this.nodeType ||
                        11 === this.nodeType ||
                        9 === this.nodeType
                    ) {
                        var e = jt(this, t);
                        e.insertBefore(t, e.firstChild);
                    }
                });
            },
            before: function () {
                return Ht(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this);
                });
            },
            after: function () {
                return Ht(this, arguments, function (t) {
                    this.parentNode &&
                        this.parentNode.insertBefore(t, this.nextSibling);
                });
            },
            empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++)
                    1 === t.nodeType &&
                        (_.cleanData(gt(t, !1)), (t.textContent = ''));
                return this;
            },
            clone: function (t, e) {
                return (
                    (t = null != t && t),
                    (e = null == e ? t : e),
                    this.map(function () {
                        return _.clone(this, t, e);
                    })
                );
            },
            html: function (t) {
                return W(
                    this,
                    function (t) {
                        var e = this[0] || {},
                            n = 0,
                            i = this.length;
                        if (void 0 === t && 1 === e.nodeType)
                            return e.innerHTML;
                        if (
                            'string' == typeof t &&
                            !Ot.test(t) &&
                            !mt[(ft.exec(t) || ['', ''])[1].toLowerCase()]
                        ) {
                            t = _.htmlPrefilter(t);
                            try {
                                for (; n < i; n++)
                                    1 === (e = this[n] || {}).nodeType &&
                                        (_.cleanData(gt(e, !1)),
                                        (e.innerHTML = t));
                                e = 0;
                            } catch (t) {}
                        }
                        e && this.empty().append(t);
                    },
                    null,
                    t,
                    arguments.length
                );
            },
            replaceWith: function () {
                var t = [];
                return Ht(
                    this,
                    arguments,
                    function (e) {
                        var n = this.parentNode;
                        _.inArray(this, t) < 0 &&
                            (_.cleanData(gt(this)),
                            n && n.replaceChild(e, this));
                    },
                    t
                );
            }
        }),
        _.each(
            {
                appendTo: 'append',
                prependTo: 'prepend',
                insertBefore: 'before',
                insertAfter: 'after',
                replaceAll: 'replaceWith'
            },
            function (t, e) {
                _.fn[t] = function (t) {
                    for (
                        var n, i = [], o = _(t), r = o.length - 1, s = 0;
                        s <= r;
                        s++
                    )
                        (n = s === r ? this : this.clone(!0)),
                            _(o[s])[e](n),
                            a.apply(i, n.get());
                    return this.pushStack(i);
                };
            }
        );
    var Rt = new RegExp('^(' + et + ')(?!px)[a-z%]+$', 'i'),
        zt = function (e) {
            var n = e.ownerDocument.defaultView;
            return (n && n.opener) || (n = t), n.getComputedStyle(e);
        },
        qt = new RegExp(it.join('|'), 'i');
    function Wt(t, e, n) {
        var i,
            o,
            r,
            s,
            a = t.style;
        return (
            (n = n || zt(t)) &&
                ('' !== (s = n.getPropertyValue(e) || n[e]) ||
                    rt(t) ||
                    (s = _.style(t, e)),
                !p.pixelBoxStyles() &&
                    Rt.test(s) &&
                    qt.test(e) &&
                    ((i = a.width),
                    (o = a.minWidth),
                    (r = a.maxWidth),
                    (a.minWidth = a.maxWidth = a.width = s),
                    (s = n.width),
                    (a.width = i),
                    (a.minWidth = o),
                    (a.maxWidth = r))),
            void 0 !== s ? s + '' : s
        );
    }
    function Ut(t, e) {
        return {
            get: function () {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get;
            }
        };
    }
    !(function () {
        function e() {
            if (u) {
                (c.style.cssText =
                    'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                    (u.style.cssText =
                        'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                    ot.appendChild(c).appendChild(u);
                var e = t.getComputedStyle(u);
                (o = '1%' !== e.top),
                    (l = 12 === n(e.marginLeft)),
                    (u.style.right = '60%'),
                    (a = 36 === n(e.right)),
                    (r = 36 === n(e.width)),
                    (u.style.position = 'absolute'),
                    (s = 12 === n(u.offsetWidth / 3)),
                    ot.removeChild(c),
                    (u = null);
            }
        }
        function n(t) {
            return Math.round(parseFloat(t));
        }
        var o,
            r,
            s,
            a,
            l,
            c = i.createElement('div'),
            u = i.createElement('div');
        u.style &&
            ((u.style.backgroundClip = 'content-box'),
            (u.cloneNode(!0).style.backgroundClip = ''),
            (p.clearCloneStyle = 'content-box' === u.style.backgroundClip),
            _.extend(p, {
                boxSizingReliable: function () {
                    return e(), r;
                },
                pixelBoxStyles: function () {
                    return e(), a;
                },
                pixelPosition: function () {
                    return e(), o;
                },
                reliableMarginLeft: function () {
                    return e(), l;
                },
                scrollboxSize: function () {
                    return e(), s;
                }
            }));
    })();
    var Ft = ['Webkit', 'Moz', 'ms'],
        Vt = i.createElement('div').style,
        Yt = {};
    function Qt(t) {
        return (
            _.cssProps[t] ||
            Yt[t] ||
            (t in Vt
                ? t
                : (Yt[t] =
                      (function (t) {
                          for (
                              var e = t[0].toUpperCase() + t.slice(1),
                                  n = Ft.length;
                              n--;

                          )
                              if ((t = Ft[n] + e) in Vt) return t;
                      })(t) || t))
        );
    }
    var Xt = /^(none|table(?!-c[ea]).+)/,
        Kt = /^--/,
        Zt = {position: 'absolute', visibility: 'hidden', display: 'block'},
        Gt = {letterSpacing: '0', fontWeight: '400'};
    function Jt(t, e, n) {
        var i = nt.exec(e);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || 'px') : e;
    }
    function te(t, e, n, i, o, r) {
        var s = 'width' === e ? 1 : 0,
            a = 0,
            l = 0;
        if (n === (i ? 'border' : 'content')) return 0;
        for (; s < 4; s += 2)
            'margin' === n && (l += _.css(t, n + it[s], !0, o)),
                i
                    ? ('content' === n &&
                          (l -= _.css(t, 'padding' + it[s], !0, o)),
                      'margin' !== n &&
                          (l -= _.css(t, 'border' + it[s] + 'Width', !0, o)))
                    : ((l += _.css(t, 'padding' + it[s], !0, o)),
                      'padding' !== n
                          ? (l += _.css(t, 'border' + it[s] + 'Width', !0, o))
                          : (a += _.css(t, 'border' + it[s] + 'Width', !0, o)));
        return (
            !i &&
                0 <= r &&
                (l +=
                    Math.max(
                        0,
                        Math.ceil(
                            t['offset' + e[0].toUpperCase() + e.slice(1)] -
                                r -
                                l -
                                a -
                                0.5
                        )
                    ) || 0),
            l
        );
    }
    function ee(t, e, n) {
        var i = zt(t),
            o =
                (!p.boxSizingReliable() || n) &&
                'border-box' === _.css(t, 'boxSizing', !1, i),
            r = o,
            s = Wt(t, e, i),
            a = 'offset' + e[0].toUpperCase() + e.slice(1);
        if (Rt.test(s)) {
            if (!n) return s;
            s = 'auto';
        }
        return (
            ((!p.boxSizingReliable() && o) ||
                'auto' === s ||
                (!parseFloat(s) && 'inline' === _.css(t, 'display', !1, i))) &&
                t.getClientRects().length &&
                ((o = 'border-box' === _.css(t, 'boxSizing', !1, i)),
                (r = a in t) && (s = t[a])),
            (s = parseFloat(s) || 0) +
                te(t, e, n || (o ? 'border' : 'content'), r, i, s) +
                'px'
        );
    }
    function ne(t, e, n, i, o) {
        return new ne.prototype.init(t, e, n, i, o);
    }
    _.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var n = Wt(t, 'opacity');
                        return '' === n ? '1' : n;
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function (t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o,
                    r,
                    s,
                    a = Y(e),
                    l = Kt.test(e),
                    c = t.style;
                if (
                    (l || (e = Qt(a)),
                    (s = _.cssHooks[e] || _.cssHooks[a]),
                    void 0 === n)
                )
                    return s && 'get' in s && void 0 !== (o = s.get(t, !1, i))
                        ? o
                        : c[e];
                'string' === (r = _typeof(n)) &&
                    (o = nt.exec(n)) &&
                    o[1] &&
                    ((n = ct(t, e, o)), (r = 'number')),
                    null != n &&
                        n == n &&
                        ('number' !== r ||
                            l ||
                            (n += (o && o[3]) || (_.cssNumber[a] ? '' : 'px')),
                        p.clearCloneStyle ||
                            '' !== n ||
                            0 !== e.indexOf('background') ||
                            (c[e] = 'inherit'),
                        (s && 'set' in s && void 0 === (n = s.set(t, n, i))) ||
                            (l ? c.setProperty(e, n) : (c[e] = n)));
            }
        },
        css: function (t, e, n, i) {
            var o,
                r,
                s,
                a = Y(e);
            return (
                Kt.test(e) || (e = Qt(a)),
                (s = _.cssHooks[e] || _.cssHooks[a]) &&
                    'get' in s &&
                    (o = s.get(t, !0, n)),
                void 0 === o && (o = Wt(t, e, i)),
                'normal' === o && e in Gt && (o = Gt[e]),
                '' === n || n
                    ? ((r = parseFloat(o)),
                      !0 === n || isFinite(r) ? r || 0 : o)
                    : o
            );
        }
    }),
        _.each(['height', 'width'], function (t, e) {
            _.cssHooks[e] = {
                get: function (t, n, i) {
                    if (n)
                        return !Xt.test(_.css(t, 'display')) ||
                            (t.getClientRects().length &&
                                t.getBoundingClientRect().width)
                            ? ee(t, e, i)
                            : lt(t, Zt, function () {
                                  return ee(t, e, i);
                              });
                },
                set: function (t, n, i) {
                    var o,
                        r = zt(t),
                        s = !p.scrollboxSize() && 'absolute' === r.position,
                        a =
                            (s || i) &&
                            'border-box' === _.css(t, 'boxSizing', !1, r),
                        l = i ? te(t, e, i, a, r) : 0;
                    return (
                        a &&
                            s &&
                            (l -= Math.ceil(
                                t['offset' + e[0].toUpperCase() + e.slice(1)] -
                                    parseFloat(r[e]) -
                                    te(t, e, 'border', !1, r) -
                                    0.5
                            )),
                        l &&
                            (o = nt.exec(n)) &&
                            'px' !== (o[3] || 'px') &&
                            ((t.style[e] = n), (n = _.css(t, e))),
                        Jt(0, n, l)
                    );
                }
            };
        }),
        (_.cssHooks.marginLeft = Ut(p.reliableMarginLeft, function (t, e) {
            if (e)
                return (
                    (parseFloat(Wt(t, 'marginLeft')) ||
                        t.getBoundingClientRect().left -
                            lt(t, {marginLeft: 0}, function () {
                                return t.getBoundingClientRect().left;
                            })) + 'px'
                );
        })),
        _.each({margin: '', padding: '', border: 'Width'}, function (t, e) {
            (_.cssHooks[t + e] = {
                expand: function (n) {
                    for (
                        var i = 0,
                            o = {},
                            r = 'string' == typeof n ? n.split(' ') : [n];
                        i < 4;
                        i++
                    )
                        o[t + it[i] + e] = r[i] || r[i - 2] || r[0];
                    return o;
                }
            }),
                'margin' !== t && (_.cssHooks[t + e].set = Jt);
        }),
        _.fn.extend({
            css: function (t, e) {
                return W(
                    this,
                    function (t, e, n) {
                        var i,
                            o,
                            r = {},
                            s = 0;
                        if (Array.isArray(e)) {
                            for (i = zt(t), o = e.length; s < o; s++)
                                r[e[s]] = _.css(t, e[s], !1, i);
                            return r;
                        }
                        return void 0 !== n ? _.style(t, e, n) : _.css(t, e);
                    },
                    t,
                    e,
                    1 < arguments.length
                );
            }
        }),
        (((_.Tween = ne).prototype = {
            constructor: ne,
            init: function (t, e, n, i, o, r) {
                (this.elem = t),
                    (this.prop = n),
                    (this.easing = o || _.easing._default),
                    (this.options = e),
                    (this.start = this.now = this.cur()),
                    (this.end = i),
                    (this.unit = r || (_.cssNumber[n] ? '' : 'px'));
            },
            cur: function () {
                var t = ne.propHooks[this.prop];
                return t && t.get
                    ? t.get(this)
                    : ne.propHooks._default.get(this);
            },
            run: function (t) {
                var e,
                    n = ne.propHooks[this.prop];
                return (
                    this.options.duration
                        ? (this.pos = e =
                              _.easing[this.easing](
                                  t,
                                  this.options.duration * t,
                                  0,
                                  1,
                                  this.options.duration
                              ))
                        : (this.pos = e = t),
                    (this.now = (this.end - this.start) * e + this.start),
                    this.options.step &&
                        this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : ne.propHooks._default.set(this),
                    this
                );
            }
        }).init.prototype = ne.prototype),
        ((ne.propHooks = {
            _default: {
                get: function (t) {
                    var e;
                    return 1 !== t.elem.nodeType ||
                        (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                        ? t.elem[t.prop]
                        : (e = _.css(t.elem, t.prop, '')) && 'auto' !== e
                        ? e
                        : 0;
                },
                set: function (t) {
                    _.fx.step[t.prop]
                        ? _.fx.step[t.prop](t)
                        : 1 !== t.elem.nodeType ||
                          (!_.cssHooks[t.prop] &&
                              null == t.elem.style[Qt(t.prop)])
                        ? (t.elem[t.prop] = t.now)
                        : _.style(t.elem, t.prop, t.now + t.unit);
                }
            }
        }).scrollTop = ne.propHooks.scrollLeft =
            {
                set: function (t) {
                    t.elem.nodeType &&
                        t.elem.parentNode &&
                        (t.elem[t.prop] = t.now);
                }
            }),
        (_.easing = {
            linear: function (t) {
                return t;
            },
            swing: function (t) {
                return 0.5 - Math.cos(t * Math.PI) / 2;
            },
            _default: 'swing'
        }),
        ((_.fx = ne.prototype.init).step = {});
    var ie,
        oe,
        re,
        se,
        ae = /^(?:toggle|show|hide)$/,
        le = /queueHooks$/;
    function ce() {
        oe &&
            (!1 === i.hidden && t.requestAnimationFrame
                ? t.requestAnimationFrame(ce)
                : t.setTimeout(ce, _.fx.interval),
            _.fx.tick());
    }
    function ue() {
        return (
            t.setTimeout(function () {
                ie = void 0;
            }),
            (ie = Date.now())
        );
    }
    function de(t, e) {
        var n,
            i = 0,
            o = {height: t};
        for (e = e ? 1 : 0; i < 4; i += 2 - e)
            o['margin' + (n = it[i])] = o['padding' + n] = t;
        return e && (o.opacity = o.width = t), o;
    }
    function he(t, e, n) {
        for (
            var i,
                o = (fe.tweeners[e] || []).concat(fe.tweeners['*']),
                r = 0,
                s = o.length;
            r < s;
            r++
        )
            if ((i = o[r].call(n, e, t))) return i;
    }
    function fe(t, e, n) {
        var i,
            o,
            r = 0,
            s = fe.prefilters.length,
            a = _.Deferred().always(function () {
                delete l.elem;
            }),
            l = function () {
                if (o) return !1;
                for (
                    var e = ie || ue(),
                        n = Math.max(0, c.startTime + c.duration - e),
                        i = 1 - (n / c.duration || 0),
                        r = 0,
                        s = c.tweens.length;
                    r < s;
                    r++
                )
                    c.tweens[r].run(i);
                return (
                    a.notifyWith(t, [c, i, n]),
                    i < 1 && s
                        ? n
                        : (s || a.notifyWith(t, [c, 1, 0]),
                          a.resolveWith(t, [c]),
                          !1)
                );
            },
            c = a.promise({
                elem: t,
                props: _.extend({}, e),
                opts: _.extend(
                    !0,
                    {specialEasing: {}, easing: _.easing._default},
                    n
                ),
                originalProperties: e,
                originalOptions: n,
                startTime: ie || ue(),
                duration: n.duration,
                tweens: [],
                createTween: function (e, n) {
                    var i = _.Tween(
                        t,
                        c.opts,
                        e,
                        n,
                        c.opts.specialEasing[e] || c.opts.easing
                    );
                    return c.tweens.push(i), i;
                },
                stop: function (e) {
                    var n = 0,
                        i = e ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; n < i; n++) c.tweens[n].run(1);
                    return (
                        e
                            ? (a.notifyWith(t, [c, 1, 0]),
                              a.resolveWith(t, [c, e]))
                            : a.rejectWith(t, [c, e]),
                        this
                    );
                }
            }),
            u = c.props;
        for (
            (function (t, e) {
                var n, i, o, r, s;
                for (n in t)
                    if (
                        ((o = e[(i = Y(n))]),
                        (r = t[n]),
                        Array.isArray(r) && ((o = r[1]), (r = t[n] = r[0])),
                        n !== i && ((t[i] = r), delete t[n]),
                        (s = _.cssHooks[i]) && ('expand' in s))
                    )
                        for (n in ((r = s.expand(r)), delete t[i], r))
                            (n in t) || ((t[n] = r[n]), (e[n] = o));
                    else e[i] = o;
            })(u, c.opts.specialEasing);
            r < s;
            r++
        )
            if ((i = fe.prefilters[r].call(c, t, u, c.opts)))
                return (
                    m(i.stop) &&
                        (_._queueHooks(c.elem, c.opts.queue).stop =
                            i.stop.bind(i)),
                    i
                );
        return (
            _.map(u, he, c),
            m(c.opts.start) && c.opts.start.call(t, c),
            c
                .progress(c.opts.progress)
                .done(c.opts.done, c.opts.complete)
                .fail(c.opts.fail)
                .always(c.opts.always),
            _.fx.timer(_.extend(l, {elem: t, anim: c, queue: c.opts.queue})),
            c
        );
    }
    (_.Animation = _.extend(fe, {
        tweeners: {
            '*': [
                function (t, e) {
                    var n = this.createTween(t, e);
                    return ct(n.elem, t, nt.exec(e), n), n;
                }
            ]
        },
        tweener: function (t, e) {
            m(t) ? ((e = t), (t = ['*'])) : (t = t.match($));
            for (var n, i = 0, o = t.length; i < o; i++)
                (n = t[i]),
                    (fe.tweeners[n] = fe.tweeners[n] || []),
                    fe.tweeners[n].unshift(e);
        },
        prefilters: [
            function (t, e, n) {
                var i,
                    o,
                    r,
                    s,
                    a,
                    l,
                    c,
                    u,
                    d = 'width' in e || 'height' in e,
                    h = this,
                    f = {},
                    p = t.style,
                    m = t.nodeType && at(t),
                    g = K.get(t, 'fxshow');
                for (i in (n.queue ||
                    (null == (s = _._queueHooks(t, 'fx')).unqueued &&
                        ((s.unqueued = 0),
                        (a = s.empty.fire),
                        (s.empty.fire = function () {
                            s.unqueued || a();
                        })),
                    s.unqueued++,
                    h.always(function () {
                        h.always(function () {
                            s.unqueued--,
                                _.queue(t, 'fx').length || s.empty.fire();
                        });
                    })),
                e))
                    if (((o = e[i]), ae.test(o))) {
                        if (
                            (delete e[i],
                            (r = r || 'toggle' === o),
                            o === (m ? 'hide' : 'show'))
                        ) {
                            if ('show' !== o || !g || void 0 === g[i]) continue;
                            m = !0;
                        }
                        f[i] = (g && g[i]) || _.style(t, i);
                    }
                if ((l = !_.isEmptyObject(e)) || !_.isEmptyObject(f))
                    for (i in (d &&
                        1 === t.nodeType &&
                        ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
                        null == (c = g && g.display) &&
                            (c = K.get(t, 'display')),
                        'none' === (u = _.css(t, 'display')) &&
                            (c
                                ? (u = c)
                                : (dt([t], !0),
                                  (c = t.style.display || c),
                                  (u = _.css(t, 'display')),
                                  dt([t]))),
                        ('inline' === u ||
                            ('inline-block' === u && null != c)) &&
                            'none' === _.css(t, 'float') &&
                            (l ||
                                (h.done(function () {
                                    p.display = c;
                                }),
                                null == c &&
                                    ((u = p.display),
                                    (c = 'none' === u ? '' : u))),
                            (p.display = 'inline-block'))),
                    n.overflow &&
                        ((p.overflow = 'hidden'),
                        h.always(function () {
                            (p.overflow = n.overflow[0]),
                                (p.overflowX = n.overflow[1]),
                                (p.overflowY = n.overflow[2]);
                        })),
                    (l = !1),
                    f))
                        l ||
                            (g
                                ? 'hidden' in g && (m = g.hidden)
                                : (g = K.access(t, 'fxshow', {display: c})),
                            r && (g.hidden = !m),
                            m && dt([t], !0),
                            h.done(function () {
                                for (i in (m || dt([t]),
                                K.remove(t, 'fxshow'),
                                f))
                                    _.style(t, i, f[i]);
                            })),
                            (l = he(m ? g[i] : 0, i, h)),
                            i in g ||
                                ((g[i] = l.start),
                                m && ((l.end = l.start), (l.start = 0)));
            }
        ],
        prefilter: function (t, e) {
            e ? fe.prefilters.unshift(t) : fe.prefilters.push(t);
        }
    })),
        (_.speed = function (t, e, n) {
            var i =
                t && 'object' == _typeof(t)
                    ? _.extend({}, t)
                    : {
                          complete: n || (!n && e) || (m(t) && t),
                          duration: t,
                          easing: (n && e) || (e && !m(e) && e)
                      };
            return (
                _.fx.off
                    ? (i.duration = 0)
                    : 'number' != typeof i.duration &&
                      (i.duration in _.fx.speeds
                          ? (i.duration = _.fx.speeds[i.duration])
                          : (i.duration = _.fx.speeds._default)),
                (null != i.queue && !0 !== i.queue) || (i.queue = 'fx'),
                (i.old = i.complete),
                (i.complete = function () {
                    m(i.old) && i.old.call(this),
                        i.queue && _.dequeue(this, i.queue);
                }),
                i
            );
        }),
        _.fn.extend({
            fadeTo: function (t, e, n, i) {
                return this.filter(at)
                    .css('opacity', 0)
                    .show()
                    .end()
                    .animate({opacity: e}, t, n, i);
            },
            animate: function (t, e, n, i) {
                var o = _.isEmptyObject(t),
                    r = _.speed(e, n, i),
                    s = function () {
                        var e = fe(this, _.extend({}, t), r);
                        (o || K.get(this, 'finish')) && e.stop(!0);
                    };
                return (
                    (s.finish = s),
                    o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
                );
            },
            stop: function (t, e, n) {
                var i = function (t) {
                    var e = t.stop;
                    delete t.stop, e(n);
                };
                return (
                    'string' != typeof t && ((n = e), (e = t), (t = void 0)),
                    e && !1 !== t && this.queue(t || 'fx', []),
                    this.each(function () {
                        var e = !0,
                            o = null != t && t + 'queueHooks',
                            r = _.timers,
                            s = K.get(this);
                        if (o) s[o] && s[o].stop && i(s[o]);
                        else
                            for (o in s)
                                s[o] && s[o].stop && le.test(o) && i(s[o]);
                        for (o = r.length; o--; )
                            r[o].elem !== this ||
                                (null != t && r[o].queue !== t) ||
                                (r[o].anim.stop(n), (e = !1), r.splice(o, 1));
                        (!e && n) || _.dequeue(this, t);
                    })
                );
            },
            finish: function (t) {
                return (
                    !1 !== t && (t = t || 'fx'),
                    this.each(function () {
                        var e,
                            n = K.get(this),
                            i = n[t + 'queue'],
                            o = n[t + 'queueHooks'],
                            r = _.timers,
                            s = i ? i.length : 0;
                        for (
                            n.finish = !0,
                                _.queue(this, t, []),
                                o && o.stop && o.stop.call(this, !0),
                                e = r.length;
                            e--;

                        )
                            r[e].elem === this &&
                                r[e].queue === t &&
                                (r[e].anim.stop(!0), r.splice(e, 1));
                        for (e = 0; e < s; e++)
                            i[e] && i[e].finish && i[e].finish.call(this);
                        delete n.finish;
                    })
                );
            }
        }),
        _.each(['toggle', 'show', 'hide'], function (t, e) {
            var n = _.fn[e];
            _.fn[e] = function (t, i, o) {
                return null == t || 'boolean' == typeof t
                    ? n.apply(this, arguments)
                    : this.animate(de(e, !0), t, i, o);
            };
        }),
        _.each(
            {
                slideDown: de('show'),
                slideUp: de('hide'),
                slideToggle: de('toggle'),
                fadeIn: {opacity: 'show'},
                fadeOut: {opacity: 'hide'},
                fadeToggle: {opacity: 'toggle'}
            },
            function (t, e) {
                _.fn[t] = function (t, n, i) {
                    return this.animate(e, t, n, i);
                };
            }
        ),
        (_.timers = []),
        (_.fx.tick = function () {
            var t,
                e = 0,
                n = _.timers;
            for (ie = Date.now(); e < n.length; e++)
                (t = n[e])() || n[e] !== t || n.splice(e--, 1);
            n.length || _.fx.stop(), (ie = void 0);
        }),
        (_.fx.timer = function (t) {
            _.timers.push(t), _.fx.start();
        }),
        (_.fx.interval = 13),
        (_.fx.start = function () {
            oe || ((oe = !0), ce());
        }),
        (_.fx.stop = function () {
            oe = null;
        }),
        (_.fx.speeds = {slow: 600, fast: 200, _default: 400}),
        (_.fn.delay = function (e, n) {
            return (
                (e = (_.fx && _.fx.speeds[e]) || e),
                (n = n || 'fx'),
                this.queue(n, function (n, i) {
                    var o = t.setTimeout(n, e);
                    i.stop = function () {
                        t.clearTimeout(o);
                    };
                })
            );
        }),
        (re = i.createElement('input')),
        (se = i.createElement('select').appendChild(i.createElement('option'))),
        (re.type = 'checkbox'),
        (p.checkOn = '' !== re.value),
        (p.optSelected = se.selected),
        ((re = i.createElement('input')).value = 't'),
        (re.type = 'radio'),
        (p.radioValue = 't' === re.value);
    var pe,
        me = _.expr.attrHandle;
    _.fn.extend({
        attr: function (t, e) {
            return W(this, _.attr, t, e, 1 < arguments.length);
        },
        removeAttr: function (t) {
            return this.each(function () {
                _.removeAttr(this, t);
            });
        }
    }),
        _.extend({
            attr: function (t, e, n) {
                var i,
                    o,
                    r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r)
                    return void 0 === t.getAttribute
                        ? _.prop(t, e, n)
                        : ((1 === r && _.isXMLDoc(t)) ||
                              (o =
                                  _.attrHooks[e.toLowerCase()] ||
                                  (_.expr.match.bool.test(e) ? pe : void 0)),
                          void 0 !== n
                              ? null === n
                                  ? void _.removeAttr(t, e)
                                  : o &&
                                    'set' in o &&
                                    void 0 !== (i = o.set(t, n, e))
                                  ? i
                                  : (t.setAttribute(e, n + ''), n)
                              : o && 'get' in o && null !== (i = o.get(t, e))
                              ? i
                              : null == (i = _.find.attr(t, e))
                              ? void 0
                              : i);
            },
            attrHooks: {
                type: {
                    set: function (t, e) {
                        if (!p.radioValue && 'radio' === e && A(t, 'input')) {
                            var n = t.value;
                            return (
                                t.setAttribute('type', e), n && (t.value = n), e
                            );
                        }
                    }
                }
            },
            removeAttr: function (t, e) {
                var n,
                    i = 0,
                    o = e && e.match($);
                if (o && 1 === t.nodeType)
                    for (; (n = o[i++]); ) t.removeAttribute(n);
            }
        }),
        (pe = {
            set: function (t, e, n) {
                return !1 === e ? _.removeAttr(t, n) : t.setAttribute(n, n), n;
            }
        }),
        _.each(_.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var n = me[e] || _.find.attr;
            me[e] = function (t, e, i) {
                var o,
                    r,
                    s = e.toLowerCase();
                return (
                    i ||
                        ((r = me[s]),
                        (me[s] = o),
                        (o = null != n(t, e, i) ? s : null),
                        (me[s] = r)),
                    o
                );
            };
        });
    var ge = /^(?:input|select|textarea|button)$/i,
        ve = /^(?:a|area)$/i;
    function we(t) {
        return (t.match($) || []).join(' ');
    }
    function ye(t) {
        return (t.getAttribute && t.getAttribute('class')) || '';
    }
    function be(t) {
        return Array.isArray(t)
            ? t
            : ('string' == typeof t && t.match($)) || [];
    }
    _.fn.extend({
        prop: function (t, e) {
            return W(this, _.prop, t, e, 1 < arguments.length);
        },
        removeProp: function (t) {
            return this.each(function () {
                delete this[_.propFix[t] || t];
            });
        }
    }),
        _.extend({
            prop: function (t, e, n) {
                var i,
                    o,
                    r = t.nodeType;
                if (3 !== r && 8 !== r && 2 !== r)
                    return (
                        (1 === r && _.isXMLDoc(t)) ||
                            ((e = _.propFix[e] || e), (o = _.propHooks[e])),
                        void 0 !== n
                            ? o && 'set' in o && void 0 !== (i = o.set(t, n, e))
                                ? i
                                : (t[e] = n)
                            : o && 'get' in o && null !== (i = o.get(t, e))
                            ? i
                            : t[e]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (t) {
                        var e = _.find.attr(t, 'tabindex');
                        return e
                            ? parseInt(e, 10)
                            : ge.test(t.nodeName) ||
                              (ve.test(t.nodeName) && t.href)
                            ? 0
                            : -1;
                    }
                }
            },
            propFix: {for: 'htmlFor', class: 'className'}
        }),
        p.optSelected ||
            (_.propHooks.selected = {
                get: function (t) {
                    var e = t.parentNode;
                    return (
                        e && e.parentNode && e.parentNode.selectedIndex, null
                    );
                },
                set: function (t) {
                    var e = t.parentNode;
                    e &&
                        (e.selectedIndex,
                        e.parentNode && e.parentNode.selectedIndex);
                }
            }),
        _.each(
            [
                'tabIndex',
                'readOnly',
                'maxLength',
                'cellSpacing',
                'cellPadding',
                'rowSpan',
                'colSpan',
                'useMap',
                'frameBorder',
                'contentEditable'
            ],
            function () {
                _.propFix[this.toLowerCase()] = this;
            }
        ),
        _.fn.extend({
            addClass: function (t) {
                var e,
                    n,
                    i,
                    o,
                    r,
                    s,
                    a,
                    l = 0;
                if (m(t))
                    return this.each(function (e) {
                        _(this).addClass(t.call(this, e, ye(this)));
                    });
                if ((e = be(t)).length)
                    for (; (n = this[l++]); )
                        if (
                            ((o = ye(n)),
                            (i = 1 === n.nodeType && ' ' + we(o) + ' '))
                        ) {
                            for (s = 0; (r = e[s++]); )
                                i.indexOf(' ' + r + ' ') < 0 && (i += r + ' ');
                            o !== (a = we(i)) && n.setAttribute('class', a);
                        }
                return this;
            },
            removeClass: function (t) {
                var e,
                    n,
                    i,
                    o,
                    r,
                    s,
                    a,
                    l = 0;
                if (m(t))
                    return this.each(function (e) {
                        _(this).removeClass(t.call(this, e, ye(this)));
                    });
                if (!arguments.length) return this.attr('class', '');
                if ((e = be(t)).length)
                    for (; (n = this[l++]); )
                        if (
                            ((o = ye(n)),
                            (i = 1 === n.nodeType && ' ' + we(o) + ' '))
                        ) {
                            for (s = 0; (r = e[s++]); )
                                for (; -1 < i.indexOf(' ' + r + ' '); )
                                    i = i.replace(' ' + r + ' ', ' ');
                            o !== (a = we(i)) && n.setAttribute('class', a);
                        }
                return this;
            },
            toggleClass: function (t, e) {
                var n = _typeof(t),
                    i = 'string' === n || Array.isArray(t);
                return 'boolean' == typeof e && i
                    ? e
                        ? this.addClass(t)
                        : this.removeClass(t)
                    : m(t)
                    ? this.each(function (n) {
                          _(this).toggleClass(t.call(this, n, ye(this), e), e);
                      })
                    : this.each(function () {
                          var e, o, r, s;
                          if (i)
                              for (
                                  o = 0, r = _(this), s = be(t);
                                  (e = s[o++]);

                              )
                                  r.hasClass(e)
                                      ? r.removeClass(e)
                                      : r.addClass(e);
                          else
                              (void 0 !== t && 'boolean' !== n) ||
                                  ((e = ye(this)) &&
                                      K.set(this, '__className__', e),
                                  this.setAttribute &&
                                      this.setAttribute(
                                          'class',
                                          e || !1 === t
                                              ? ''
                                              : K.get(this, '__className__') ||
                                                    ''
                                      ));
                      });
            },
            hasClass: function (t) {
                var e,
                    n,
                    i = 0;
                for (e = ' ' + t + ' '; (n = this[i++]); )
                    if (
                        1 === n.nodeType &&
                        -1 < (' ' + we(ye(n)) + ' ').indexOf(e)
                    )
                        return !0;
                return !1;
            }
        });
    var _e = /\r/g;
    _.fn.extend({
        val: function (t) {
            var e,
                n,
                i,
                o = this[0];
            return arguments.length
                ? ((i = m(t)),
                  this.each(function (n) {
                      var o;
                      1 === this.nodeType &&
                          (null == (o = i ? t.call(this, n, _(this).val()) : t)
                              ? (o = '')
                              : 'number' == typeof o
                              ? (o += '')
                              : Array.isArray(o) &&
                                (o = _.map(o, function (t) {
                                    return null == t ? '' : t + '';
                                })),
                          ((e =
                              _.valHooks[this.type] ||
                              _.valHooks[this.nodeName.toLowerCase()]) &&
                              'set' in e &&
                              void 0 !== e.set(this, o, 'value')) ||
                              (this.value = o));
                  }))
                : o
                ? (e =
                      _.valHooks[o.type] ||
                      _.valHooks[o.nodeName.toLowerCase()]) &&
                  'get' in e &&
                  void 0 !== (n = e.get(o, 'value'))
                    ? n
                    : 'string' == typeof (n = o.value)
                    ? n.replace(_e, '')
                    : null == n
                    ? ''
                    : n
                : void 0;
        }
    }),
        _.extend({
            valHooks: {
                option: {
                    get: function (t) {
                        var e = _.find.attr(t, 'value');
                        return null != e ? e : we(_.text(t));
                    }
                },
                select: {
                    get: function (t) {
                        var e,
                            n,
                            i,
                            o = t.options,
                            r = t.selectedIndex,
                            s = 'select-one' === t.type,
                            a = s ? null : [],
                            l = s ? r + 1 : o.length;
                        for (i = r < 0 ? l : s ? r : 0; i < l; i++)
                            if (
                                ((n = o[i]).selected || i === r) &&
                                !n.disabled &&
                                (!n.parentNode.disabled ||
                                    !A(n.parentNode, 'optgroup'))
                            ) {
                                if (((e = _(n).val()), s)) return e;
                                a.push(e);
                            }
                        return a;
                    },
                    set: function (t, e) {
                        for (
                            var n,
                                i,
                                o = t.options,
                                r = _.makeArray(e),
                                s = o.length;
                            s--;

                        )
                            ((i = o[s]).selected =
                                -1 < _.inArray(_.valHooks.option.get(i), r)) &&
                                (n = !0);
                        return n || (t.selectedIndex = -1), r;
                    }
                }
            }
        }),
        _.each(['radio', 'checkbox'], function () {
            (_.valHooks[this] = {
                set: function (t, e) {
                    if (Array.isArray(e))
                        return (t.checked = -1 < _.inArray(_(t).val(), e));
                }
            }),
                p.checkOn ||
                    (_.valHooks[this].get = function (t) {
                        return null === t.getAttribute('value')
                            ? 'on'
                            : t.value;
                    });
        }),
        (p.focusin = 'onfocusin' in t);
    var xe = /^(?:focusinfocus|focusoutblur)$/,
        Ce = function (t) {
            t.stopPropagation();
        };
    _.extend(_.event, {
        trigger: function (e, n, o, r) {
            var s,
                a,
                l,
                c,
                u,
                h,
                f,
                p,
                v = [o || i],
                w = d.call(e, 'type') ? e.type : e,
                y = d.call(e, 'namespace') ? e.namespace.split('.') : [];
            if (
                ((a = p = l = o = o || i),
                3 !== o.nodeType &&
                    8 !== o.nodeType &&
                    !xe.test(w + _.event.triggered) &&
                    (-1 < w.indexOf('.') &&
                        ((w = (y = w.split('.')).shift()), y.sort()),
                    (u = w.indexOf(':') < 0 && 'on' + w),
                    ((e = e[_.expando]
                        ? e
                        : new _.Event(
                              w,
                              'object' == _typeof(e) && e
                          )).isTrigger = r ? 2 : 3),
                    (e.namespace = y.join('.')),
                    (e.rnamespace = e.namespace
                        ? new RegExp(
                              '(^|\\.)' + y.join('\\.(?:.*\\.|)') + '(\\.|$)'
                          )
                        : null),
                    (e.result = void 0),
                    e.target || (e.target = o),
                    (n = null == n ? [e] : _.makeArray(n, [e])),
                    (f = _.event.special[w] || {}),
                    r || !f.trigger || !1 !== f.trigger.apply(o, n)))
            ) {
                if (!r && !f.noBubble && !g(o)) {
                    for (
                        c = f.delegateType || w,
                            xe.test(c + w) || (a = a.parentNode);
                        a;
                        a = a.parentNode
                    )
                        v.push(a), (l = a);
                    l === (o.ownerDocument || i) &&
                        v.push(l.defaultView || l.parentWindow || t);
                }
                for (s = 0; (a = v[s++]) && !e.isPropagationStopped(); )
                    (p = a),
                        (e.type = 1 < s ? c : f.bindType || w),
                        (h =
                            (K.get(a, 'events') || {})[e.type] &&
                            K.get(a, 'handle')) && h.apply(a, n),
                        (h = u && a[u]) &&
                            h.apply &&
                            Q(a) &&
                            ((e.result = h.apply(a, n)),
                            !1 === e.result && e.preventDefault());
                return (
                    (e.type = w),
                    r ||
                        e.isDefaultPrevented() ||
                        (f._default && !1 !== f._default.apply(v.pop(), n)) ||
                        !Q(o) ||
                        (u &&
                            m(o[w]) &&
                            !g(o) &&
                            ((l = o[u]) && (o[u] = null),
                            (_.event.triggered = w),
                            e.isPropagationStopped() &&
                                p.addEventListener(w, Ce),
                            o[w](),
                            e.isPropagationStopped() &&
                                p.removeEventListener(w, Ce),
                            (_.event.triggered = void 0),
                            l && (o[u] = l))),
                    e.result
                );
            }
        },
        simulate: function (t, e, n) {
            var i = _.extend(new _.Event(), n, {type: t, isSimulated: !0});
            _.event.trigger(i, null, e);
        }
    }),
        _.fn.extend({
            trigger: function (t, e) {
                return this.each(function () {
                    _.event.trigger(t, e, this);
                });
            },
            triggerHandler: function (t, e) {
                var n = this[0];
                if (n) return _.event.trigger(t, e, n, !0);
            }
        }),
        p.focusin ||
            _.each({focus: 'focusin', blur: 'focusout'}, function (t, e) {
                var n = function (t) {
                    _.event.simulate(e, t.target, _.event.fix(t));
                };
                _.event.special[e] = {
                    setup: function () {
                        var i = this.ownerDocument || this,
                            o = K.access(i, e);
                        o || i.addEventListener(t, n, !0),
                            K.access(i, e, (o || 0) + 1);
                    },
                    teardown: function () {
                        var i = this.ownerDocument || this,
                            o = K.access(i, e) - 1;
                        o
                            ? K.access(i, e, o)
                            : (i.removeEventListener(t, n, !0), K.remove(i, e));
                    }
                };
            });
    var ke = t.location,
        Te = Date.now(),
        Ee = /\?/;
    _.parseXML = function (e) {
        var n;
        if (!e || 'string' != typeof e) return null;
        try {
            n = new t.DOMParser().parseFromString(e, 'text/xml');
        } catch (e) {
            n = void 0;
        }
        return (
            (n && !n.getElementsByTagName('parsererror').length) ||
                _.error('Invalid XML: ' + e),
            n
        );
    };
    var Se = /\[\]$/,
        Ae = /\r?\n/g,
        De = /^(?:submit|button|image|reset|file)$/i,
        Ie = /^(?:input|select|textarea|keygen)/i;
    function Oe(t, e, n, i) {
        var o;
        if (Array.isArray(e))
            _.each(e, function (e, o) {
                n || Se.test(t)
                    ? i(t, o)
                    : Oe(
                          t +
                              '[' +
                              ('object' == _typeof(o) && null != o ? e : '') +
                              ']',
                          o,
                          n,
                          i
                      );
            });
        else if (n || 'object' !== y(e)) i(t, e);
        else for (o in e) Oe(t + '[' + o + ']', e[o], n, i);
    }
    (_.param = function (t, e) {
        var n,
            i = [],
            o = function (t, e) {
                var n = m(e) ? e() : e;
                i[i.length] =
                    encodeURIComponent(t) +
                    '=' +
                    encodeURIComponent(null == n ? '' : n);
            };
        if (null == t) return '';
        if (Array.isArray(t) || (t.jquery && !_.isPlainObject(t)))
            _.each(t, function () {
                o(this.name, this.value);
            });
        else for (n in t) Oe(n, t[n], e, o);
        return i.join('&');
    }),
        _.fn.extend({
            serialize: function () {
                return _.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var t = _.prop(this, 'elements');
                    return t ? _.makeArray(t) : this;
                })
                    .filter(function () {
                        var t = this.type;
                        return (
                            this.name &&
                            !_(this).is(':disabled') &&
                            Ie.test(this.nodeName) &&
                            !De.test(t) &&
                            (this.checked || !ht.test(t))
                        );
                    })
                    .map(function (t, e) {
                        var n = _(this).val();
                        return null == n
                            ? null
                            : Array.isArray(n)
                            ? _.map(n, function (t) {
                                  return {
                                      name: e.name,
                                      value: t.replace(Ae, '\r\n')
                                  };
                              })
                            : {name: e.name, value: n.replace(Ae, '\r\n')};
                    })
                    .get();
            }
        });
    var Ne = /%20/g,
        Le = /#.*$/,
        je = /([?&])_=[^&]*/,
        Pe = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        $e = /^(?:GET|HEAD)$/,
        Be = /^\/\//,
        He = {},
        Me = {},
        Re = '*/'.concat('*'),
        ze = i.createElement('a');
    function qe(t) {
        return function (e, n) {
            'string' != typeof e && ((n = e), (e = '*'));
            var i,
                o = 0,
                r = e.toLowerCase().match($) || [];
            if (m(n))
                for (; (i = r[o++]); )
                    '+' === i[0]
                        ? ((i = i.slice(1) || '*'),
                          (t[i] = t[i] || []).unshift(n))
                        : (t[i] = t[i] || []).push(n);
        };
    }
    function We(t, e, n, i) {
        var o = {},
            r = t === Me;
        function s(a) {
            var l;
            return (
                (o[a] = !0),
                _.each(t[a] || [], function (t, a) {
                    var c = a(e, n, i);
                    return 'string' != typeof c || r || o[c]
                        ? r
                            ? !(l = c)
                            : void 0
                        : (e.dataTypes.unshift(c), s(c), !1);
                }),
                l
            );
        }
        return s(e.dataTypes[0]) || (!o['*'] && s('*'));
    }
    function Ue(t, e) {
        var n,
            i,
            o = _.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((o[n] ? t : i || (i = {}))[n] = e[n]);
        return i && _.extend(!0, t, i), t;
    }
    (ze.href = ke.href),
        _.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ke.href,
                type: 'GET',
                isLocal:
                    /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                        ke.protocol
                    ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                accepts: {
                    '*': Re,
                    text: 'text/plain',
                    html: 'text/html',
                    xml: 'application/xml, text/xml',
                    json: 'application/json, text/javascript'
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {
                    xml: 'responseXML',
                    text: 'responseText',
                    json: 'responseJSON'
                },
                converters: {
                    '* text': String,
                    'text html': !0,
                    'text json': JSON.parse,
                    'text xml': _.parseXML
                },
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (t, e) {
                return e ? Ue(Ue(t, _.ajaxSettings), e) : Ue(_.ajaxSettings, t);
            },
            ajaxPrefilter: qe(He),
            ajaxTransport: qe(Me),
            ajax: function (e, n) {
                'object' == _typeof(e) && ((n = e), (e = void 0));
                var o,
                    r,
                    s,
                    a,
                    l,
                    c,
                    u,
                    d,
                    h,
                    f,
                    p = _.ajaxSetup({}, (n = n || {})),
                    m = p.context || p,
                    g = p.context && (m.nodeType || m.jquery) ? _(m) : _.event,
                    v = _.Deferred(),
                    w = _.Callbacks('once memory'),
                    y = p.statusCode || {},
                    b = {},
                    x = {},
                    C = 'canceled',
                    k = {
                        readyState: 0,
                        getResponseHeader: function (t) {
                            var e;
                            if (u) {
                                if (!a)
                                    for (a = {}; (e = Pe.exec(s)); )
                                        a[e[1].toLowerCase() + ' '] = (
                                            a[e[1].toLowerCase() + ' '] || []
                                        ).concat(e[2]);
                                e = a[t.toLowerCase() + ' '];
                            }
                            return null == e ? null : e.join(', ');
                        },
                        getAllResponseHeaders: function () {
                            return u ? s : null;
                        },
                        setRequestHeader: function (t, e) {
                            return (
                                null == u &&
                                    ((t = x[t.toLowerCase()] =
                                        x[t.toLowerCase()] || t),
                                    (b[t] = e)),
                                this
                            );
                        },
                        overrideMimeType: function (t) {
                            return null == u && (p.mimeType = t), this;
                        },
                        statusCode: function (t) {
                            var e;
                            if (t)
                                if (u) k.always(t[k.status]);
                                else for (e in t) y[e] = [y[e], t[e]];
                            return this;
                        },
                        abort: function (t) {
                            var e = t || C;
                            return o && o.abort(e), T(0, e), this;
                        }
                    };
                if (
                    (v.promise(k),
                    (p.url = ((e || p.url || ke.href) + '').replace(
                        Be,
                        ke.protocol + '//'
                    )),
                    (p.type = n.method || n.type || p.method || p.type),
                    (p.dataTypes = (p.dataType || '*')
                        .toLowerCase()
                        .match($) || ['']),
                    null == p.crossDomain)
                ) {
                    c = i.createElement('a');
                    try {
                        (c.href = p.url),
                            (c.href = c.href),
                            (p.crossDomain =
                                ze.protocol + '//' + ze.host !=
                                c.protocol + '//' + c.host);
                    } catch (e) {
                        p.crossDomain = !0;
                    }
                }
                if (
                    (p.data &&
                        p.processData &&
                        'string' != typeof p.data &&
                        (p.data = _.param(p.data, p.traditional)),
                    We(He, p, n, k),
                    u)
                )
                    return k;
                for (h in ((d = _.event && p.global) &&
                    0 == _.active++ &&
                    _.event.trigger('ajaxStart'),
                (p.type = p.type.toUpperCase()),
                (p.hasContent = !$e.test(p.type)),
                (r = p.url.replace(Le, '')),
                p.hasContent
                    ? p.data &&
                      p.processData &&
                      0 ===
                          (p.contentType || '').indexOf(
                              'application/x-www-form-urlencoded'
                          ) &&
                      (p.data = p.data.replace(Ne, '+'))
                    : ((f = p.url.slice(r.length)),
                      p.data &&
                          (p.processData || 'string' == typeof p.data) &&
                          ((r += (Ee.test(r) ? '&' : '?') + p.data),
                          delete p.data),
                      !1 === p.cache &&
                          ((r = r.replace(je, '$1')),
                          (f = (Ee.test(r) ? '&' : '?') + '_=' + Te++ + f)),
                      (p.url = r + f)),
                p.ifModified &&
                    (_.lastModified[r] &&
                        k.setRequestHeader(
                            'If-Modified-Since',
                            _.lastModified[r]
                        ),
                    _.etag[r] &&
                        k.setRequestHeader('If-None-Match', _.etag[r])),
                ((p.data && p.hasContent && !1 !== p.contentType) ||
                    n.contentType) &&
                    k.setRequestHeader('Content-Type', p.contentType),
                k.setRequestHeader(
                    'Accept',
                    p.dataTypes[0] && p.accepts[p.dataTypes[0]]
                        ? p.accepts[p.dataTypes[0]] +
                              ('*' !== p.dataTypes[0]
                                  ? ', ' + Re + '; q=0.01'
                                  : '')
                        : p.accepts['*']
                ),
                p.headers))
                    k.setRequestHeader(h, p.headers[h]);
                if (p.beforeSend && (!1 === p.beforeSend.call(m, k, p) || u))
                    return k.abort();
                if (
                    ((C = 'abort'),
                    w.add(p.complete),
                    k.done(p.success),
                    k.fail(p.error),
                    (o = We(Me, p, n, k)))
                ) {
                    if (
                        ((k.readyState = 1),
                        d && g.trigger('ajaxSend', [k, p]),
                        u)
                    )
                        return k;
                    p.async &&
                        0 < p.timeout &&
                        (l = t.setTimeout(function () {
                            k.abort('timeout');
                        }, p.timeout));
                    try {
                        (u = !1), o.send(b, T);
                    } catch (e) {
                        if (u) throw e;
                        T(-1, e);
                    }
                } else T(-1, 'No Transport');
                function T(e, n, i, a) {
                    var c,
                        h,
                        f,
                        b,
                        x,
                        C = n;
                    u ||
                        ((u = !0),
                        l && t.clearTimeout(l),
                        (o = void 0),
                        (s = a || ''),
                        (k.readyState = 0 < e ? 4 : 0),
                        (c = (200 <= e && e < 300) || 304 === e),
                        i &&
                            (b = (function (t, e, n) {
                                for (
                                    var i,
                                        o,
                                        r,
                                        s,
                                        a = t.contents,
                                        l = t.dataTypes;
                                    '*' === l[0];

                                )
                                    l.shift(),
                                        void 0 === i &&
                                            (i =
                                                t.mimeType ||
                                                e.getResponseHeader(
                                                    'Content-Type'
                                                ));
                                if (i)
                                    for (o in a)
                                        if (a[o] && a[o].test(i)) {
                                            l.unshift(o);
                                            break;
                                        }
                                if (l[0] in n) r = l[0];
                                else {
                                    for (o in n) {
                                        if (
                                            !l[0] ||
                                            t.converters[o + ' ' + l[0]]
                                        ) {
                                            r = o;
                                            break;
                                        }
                                        s || (s = o);
                                    }
                                    r = r || s;
                                }
                                if (r) return r !== l[0] && l.unshift(r), n[r];
                            })(p, k, i)),
                        (b = (function (t, e, n, i) {
                            var o,
                                r,
                                s,
                                a,
                                l,
                                c = {},
                                u = t.dataTypes.slice();
                            if (u[1])
                                for (s in t.converters)
                                    c[s.toLowerCase()] = t.converters[s];
                            for (r = u.shift(); r; )
                                if (
                                    (t.responseFields[r] &&
                                        (n[t.responseFields[r]] = e),
                                    !l &&
                                        i &&
                                        t.dataFilter &&
                                        (e = t.dataFilter(e, t.dataType)),
                                    (l = r),
                                    (r = u.shift()))
                                )
                                    if ('*' === r) r = l;
                                    else if ('*' !== l && l !== r) {
                                        if (
                                            !(s = c[l + ' ' + r] || c['* ' + r])
                                        )
                                            for (o in c)
                                                if (
                                                    (a = o.split(' '))[1] ===
                                                        r &&
                                                    (s =
                                                        c[l + ' ' + a[0]] ||
                                                        c['* ' + a[0]])
                                                ) {
                                                    !0 === s
                                                        ? (s = c[o])
                                                        : !0 !== c[o] &&
                                                          ((r = a[0]),
                                                          u.unshift(a[1]));
                                                    break;
                                                }
                                        if (!0 !== s)
                                            if (s && t.throws) e = s(e);
                                            else
                                                try {
                                                    e = s(e);
                                                } catch (t) {
                                                    return {
                                                        state: 'parsererror',
                                                        error: s
                                                            ? t
                                                            : 'No conversion from ' +
                                                              l +
                                                              ' to ' +
                                                              r
                                                    };
                                                }
                                    }
                            return {state: 'success', data: e};
                        })(p, b, k, c)),
                        c
                            ? (p.ifModified &&
                                  ((x = k.getResponseHeader('Last-Modified')) &&
                                      (_.lastModified[r] = x),
                                  (x = k.getResponseHeader('etag')) &&
                                      (_.etag[r] = x)),
                              204 === e || 'HEAD' === p.type
                                  ? (C = 'nocontent')
                                  : 304 === e
                                  ? (C = 'notmodified')
                                  : ((C = b.state),
                                    (h = b.data),
                                    (c = !(f = b.error))))
                            : ((f = C),
                              (!e && C) || ((C = 'error'), e < 0 && (e = 0))),
                        (k.status = e),
                        (k.statusText = (n || C) + ''),
                        c
                            ? v.resolveWith(m, [h, C, k])
                            : v.rejectWith(m, [k, C, f]),
                        k.statusCode(y),
                        (y = void 0),
                        d &&
                            g.trigger(c ? 'ajaxSuccess' : 'ajaxError', [
                                k,
                                p,
                                c ? h : f
                            ]),
                        w.fireWith(m, [k, C]),
                        d &&
                            (g.trigger('ajaxComplete', [k, p]),
                            --_.active || _.event.trigger('ajaxStop')));
                }
                return k;
            },
            getJSON: function (t, e, n) {
                return _.get(t, e, n, 'json');
            },
            getScript: function (t, e) {
                return _.get(t, void 0, e, 'script');
            }
        }),
        _.each(['get', 'post'], function (t, e) {
            _[e] = function (t, n, i, o) {
                return (
                    m(n) && ((o = o || i), (i = n), (n = void 0)),
                    _.ajax(
                        _.extend(
                            {url: t, type: e, dataType: o, data: n, success: i},
                            _.isPlainObject(t) && t
                        )
                    )
                );
            };
        }),
        (_._evalUrl = function (t, e) {
            return _.ajax({
                url: t,
                type: 'GET',
                dataType: 'script',
                cache: !0,
                async: !1,
                global: !1,
                converters: {'text script': function () {}},
                dataFilter: function (t) {
                    _.globalEval(t, e);
                }
            });
        }),
        _.fn.extend({
            wrapAll: function (t) {
                var e;
                return (
                    this[0] &&
                        (m(t) && (t = t.call(this[0])),
                        (e = _(t, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && e.insertBefore(this[0]),
                        e
                            .map(function () {
                                for (var t = this; t.firstElementChild; )
                                    t = t.firstElementChild;
                                return t;
                            })
                            .append(this)),
                    this
                );
            },
            wrapInner: function (t) {
                return m(t)
                    ? this.each(function (e) {
                          _(this).wrapInner(t.call(this, e));
                      })
                    : this.each(function () {
                          var e = _(this),
                              n = e.contents();
                          n.length ? n.wrapAll(t) : e.append(t);
                      });
            },
            wrap: function (t) {
                var e = m(t);
                return this.each(function (n) {
                    _(this).wrapAll(e ? t.call(this, n) : t);
                });
            },
            unwrap: function (t) {
                return (
                    this.parent(t)
                        .not('body')
                        .each(function () {
                            _(this).replaceWith(this.childNodes);
                        }),
                    this
                );
            }
        }),
        (_.expr.pseudos.hidden = function (t) {
            return !_.expr.pseudos.visible(t);
        }),
        (_.expr.pseudos.visible = function (t) {
            return !!(
                t.offsetWidth ||
                t.offsetHeight ||
                t.getClientRects().length
            );
        }),
        (_.ajaxSettings.xhr = function () {
            try {
                return new t.XMLHttpRequest();
            } catch (t) {}
        });
    var Fe = {0: 200, 1223: 204},
        Ve = _.ajaxSettings.xhr();
    (p.cors = !!Ve && 'withCredentials' in Ve),
        (p.ajax = Ve = !!Ve),
        _.ajaxTransport(function (e) {
            var n, i;
            if (p.cors || (Ve && !e.crossDomain))
                return {
                    send: function (o, r) {
                        var s,
                            a = e.xhr();
                        if (
                            (a.open(
                                e.type,
                                e.url,
                                e.async,
                                e.username,
                                e.password
                            ),
                            e.xhrFields)
                        )
                            for (s in e.xhrFields) a[s] = e.xhrFields[s];
                        for (s in (e.mimeType &&
                            a.overrideMimeType &&
                            a.overrideMimeType(e.mimeType),
                        e.crossDomain ||
                            o['X-Requested-With'] ||
                            (o['X-Requested-With'] = 'XMLHttpRequest'),
                        o))
                            a.setRequestHeader(s, o[s]);
                        (n = function (t) {
                            return function () {
                                n &&
                                    ((n =
                                        i =
                                        a.onload =
                                        a.onerror =
                                        a.onabort =
                                        a.ontimeout =
                                        a.onreadystatechange =
                                            null),
                                    'abort' === t
                                        ? a.abort()
                                        : 'error' === t
                                        ? 'number' != typeof a.status
                                            ? r(0, 'error')
                                            : r(a.status, a.statusText)
                                        : r(
                                              Fe[a.status] || a.status,
                                              a.statusText,
                                              'text' !==
                                                  (a.responseType || 'text') ||
                                                  'string' !=
                                                      typeof a.responseText
                                                  ? {binary: a.response}
                                                  : {text: a.responseText},
                                              a.getAllResponseHeaders()
                                          ));
                            };
                        }),
                            (a.onload = n()),
                            (i = a.onerror = a.ontimeout = n('error')),
                            void 0 !== a.onabort
                                ? (a.onabort = i)
                                : (a.onreadystatechange = function () {
                                      4 === a.readyState &&
                                          t.setTimeout(function () {
                                              n && i();
                                          });
                                  }),
                            (n = n('abort'));
                        try {
                            a.send((e.hasContent && e.data) || null);
                        } catch (o) {
                            if (n) throw o;
                        }
                    },
                    abort: function () {
                        n && n();
                    }
                };
        }),
        _.ajaxPrefilter(function (t) {
            t.crossDomain && (t.contents.script = !1);
        }),
        _.ajaxSetup({
            accepts: {
                script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
            },
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                'text script': function (t) {
                    return _.globalEval(t), t;
                }
            }
        }),
        _.ajaxPrefilter('script', function (t) {
            void 0 === t.cache && (t.cache = !1),
                t.crossDomain && (t.type = 'GET');
        }),
        _.ajaxTransport('script', function (t) {
            var e, n;
            if (t.crossDomain || t.scriptAttrs)
                return {
                    send: function (o, r) {
                        (e = _('<script>')
                            .attr(t.scriptAttrs || {})
                            .prop({charset: t.scriptCharset, src: t.url})
                            .on(
                                'load error',
                                (n = function (t) {
                                    e.remove(),
                                        (n = null),
                                        t &&
                                            r(
                                                'error' === t.type ? 404 : 200,
                                                t.type
                                            );
                                })
                            )),
                            i.head.appendChild(e[0]);
                    },
                    abort: function () {
                        n && n();
                    }
                };
        });
    var Ye,
        Qe = [],
        Xe = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: 'callback',
        jsonpCallback: function () {
            var t = Qe.pop() || _.expando + '_' + Te++;
            return (this[t] = !0), t;
        }
    }),
        _.ajaxPrefilter('json jsonp', function (e, n, i) {
            var o,
                r,
                s,
                a =
                    !1 !== e.jsonp &&
                    (Xe.test(e.url)
                        ? 'url'
                        : 'string' == typeof e.data &&
                          0 ===
                              (e.contentType || '').indexOf(
                                  'application/x-www-form-urlencoded'
                              ) &&
                          Xe.test(e.data) &&
                          'data');
            if (a || 'jsonp' === e.dataTypes[0])
                return (
                    (o = e.jsonpCallback =
                        m(e.jsonpCallback)
                            ? e.jsonpCallback()
                            : e.jsonpCallback),
                    a
                        ? (e[a] = e[a].replace(Xe, '$1' + o))
                        : !1 !== e.jsonp &&
                          (e.url +=
                              (Ee.test(e.url) ? '&' : '?') + e.jsonp + '=' + o),
                    (e.converters['script json'] = function () {
                        return s || _.error(o + ' was not called'), s[0];
                    }),
                    (e.dataTypes[0] = 'json'),
                    (r = t[o]),
                    (t[o] = function () {
                        s = arguments;
                    }),
                    i.always(function () {
                        void 0 === r ? _(t).removeProp(o) : (t[o] = r),
                            e[o] &&
                                ((e.jsonpCallback = n.jsonpCallback),
                                Qe.push(o)),
                            s && m(r) && r(s[0]),
                            (s = r = void 0);
                    }),
                    'script'
                );
        }),
        (p.createHTMLDocument =
            (((Ye = i.implementation.createHTMLDocument('').body).innerHTML =
                '<form></form><form></form>'),
            2 === Ye.childNodes.length)),
        (_.parseHTML = function (t, e, n) {
            return 'string' != typeof t
                ? []
                : ('boolean' == typeof e && ((n = e), (e = !1)),
                  e ||
                      (p.createHTMLDocument
                          ? (((o = (e =
                                i.implementation.createHTMLDocument(
                                    ''
                                )).createElement('base')).href =
                                i.location.href),
                            e.head.appendChild(o))
                          : (e = i)),
                  (s = !n && []),
                  (r = D.exec(t))
                      ? [e.createElement(r[1])]
                      : ((r = _t([t], e, s)),
                        s && s.length && _(s).remove(),
                        _.merge([], r.childNodes)));
            var o, r, s;
        }),
        (_.fn.load = function (t, e, n) {
            var i,
                o,
                r,
                s = this,
                a = t.indexOf(' ');
            return (
                -1 < a && ((i = we(t.slice(a))), (t = t.slice(0, a))),
                m(e)
                    ? ((n = e), (e = void 0))
                    : e && 'object' == _typeof(e) && (o = 'POST'),
                0 < s.length &&
                    _.ajax({
                        url: t,
                        type: o || 'GET',
                        dataType: 'html',
                        data: e
                    })
                        .done(function (t) {
                            (r = arguments),
                                s.html(
                                    i
                                        ? _('<div>')
                                              .append(_.parseHTML(t))
                                              .find(i)
                                        : t
                                );
                        })
                        .always(
                            n &&
                                function (t, e) {
                                    s.each(function () {
                                        n.apply(
                                            this,
                                            r || [t.responseText, e, t]
                                        );
                                    });
                                }
                        ),
                this
            );
        }),
        _.each(
            [
                'ajaxStart',
                'ajaxStop',
                'ajaxComplete',
                'ajaxError',
                'ajaxSuccess',
                'ajaxSend'
            ],
            function (t, e) {
                _.fn[e] = function (t) {
                    return this.on(e, t);
                };
            }
        ),
        (_.expr.pseudos.animated = function (t) {
            return _.grep(_.timers, function (e) {
                return t === e.elem;
            }).length;
        }),
        (_.offset = {
            setOffset: function (t, e, n) {
                var i,
                    o,
                    r,
                    s,
                    a,
                    l,
                    c = _.css(t, 'position'),
                    u = _(t),
                    d = {};
                'static' === c && (t.style.position = 'relative'),
                    (a = u.offset()),
                    (r = _.css(t, 'top')),
                    (l = _.css(t, 'left')),
                    ('absolute' === c || 'fixed' === c) &&
                    -1 < (r + l).indexOf('auto')
                        ? ((s = (i = u.position()).top), (o = i.left))
                        : ((s = parseFloat(r) || 0), (o = parseFloat(l) || 0)),
                    m(e) && (e = e.call(t, n, _.extend({}, a))),
                    null != e.top && (d.top = e.top - a.top + s),
                    null != e.left && (d.left = e.left - a.left + o),
                    'using' in e ? e.using.call(t, d) : u.css(d);
            }
        }),
        _.fn.extend({
            offset: function (t) {
                if (arguments.length)
                    return void 0 === t
                        ? this
                        : this.each(function (e) {
                              _.offset.setOffset(this, t, e);
                          });
                var e,
                    n,
                    i = this[0];
                return i
                    ? i.getClientRects().length
                        ? ((e = i.getBoundingClientRect()),
                          (n = i.ownerDocument.defaultView),
                          {
                              top: e.top + n.pageYOffset,
                              left: e.left + n.pageXOffset
                          })
                        : {top: 0, left: 0}
                    : void 0;
            },
            position: function () {
                if (this[0]) {
                    var t,
                        e,
                        n,
                        i = this[0],
                        o = {top: 0, left: 0};
                    if ('fixed' === _.css(i, 'position'))
                        e = i.getBoundingClientRect();
                    else {
                        for (
                            e = this.offset(),
                                n = i.ownerDocument,
                                t = i.offsetParent || n.documentElement;
                            t &&
                            (t === n.body || t === n.documentElement) &&
                            'static' === _.css(t, 'position');

                        )
                            t = t.parentNode;
                        t &&
                            t !== i &&
                            1 === t.nodeType &&
                            (((o = _(t).offset()).top += _.css(
                                t,
                                'borderTopWidth',
                                !0
                            )),
                            (o.left += _.css(t, 'borderLeftWidth', !0)));
                    }
                    return {
                        top: e.top - o.top - _.css(i, 'marginTop', !0),
                        left: e.left - o.left - _.css(i, 'marginLeft', !0)
                    };
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (
                        var t = this.offsetParent;
                        t && 'static' === _.css(t, 'position');

                    )
                        t = t.offsetParent;
                    return t || ot;
                });
            }
        }),
        _.each(
            {scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset'},
            function (t, e) {
                var n = 'pageYOffset' === e;
                _.fn[t] = function (i) {
                    return W(
                        this,
                        function (t, i, o) {
                            var r;
                            if (
                                (g(t)
                                    ? (r = t)
                                    : 9 === t.nodeType && (r = t.defaultView),
                                void 0 === o)
                            )
                                return r ? r[e] : t[i];
                            r
                                ? r.scrollTo(
                                      n ? r.pageXOffset : o,
                                      n ? o : r.pageYOffset
                                  )
                                : (t[i] = o);
                        },
                        t,
                        i,
                        arguments.length
                    );
                };
            }
        ),
        _.each(['top', 'left'], function (t, e) {
            _.cssHooks[e] = Ut(p.pixelPosition, function (t, n) {
                if (n)
                    return (
                        (n = Wt(t, e)),
                        Rt.test(n) ? _(t).position()[e] + 'px' : n
                    );
            });
        }),
        _.each({Height: 'height', Width: 'width'}, function (t, e) {
            _.each(
                {padding: 'inner' + t, content: e, '': 'outer' + t},
                function (n, i) {
                    _.fn[i] = function (o, r) {
                        var s =
                                arguments.length &&
                                (n || 'boolean' != typeof o),
                            a =
                                n ||
                                (!0 === o || !0 === r ? 'margin' : 'border');
                        return W(
                            this,
                            function (e, n, o) {
                                var r;
                                return g(e)
                                    ? 0 === i.indexOf('outer')
                                        ? e['inner' + t]
                                        : e.document.documentElement[
                                              'client' + t
                                          ]
                                    : 9 === e.nodeType
                                    ? ((r = e.documentElement),
                                      Math.max(
                                          e.body['scroll' + t],
                                          r['scroll' + t],
                                          e.body['offset' + t],
                                          r['offset' + t],
                                          r['client' + t]
                                      ))
                                    : void 0 === o
                                    ? _.css(e, n, a)
                                    : _.style(e, n, o, a);
                            },
                            e,
                            s ? o : void 0,
                            s
                        );
                    };
                }
            );
        }),
        _.each(
            'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                ' '
            ),
            function (t, e) {
                _.fn[e] = function (t, n) {
                    return 0 < arguments.length
                        ? this.on(e, null, t, n)
                        : this.trigger(e);
                };
            }
        ),
        _.fn.extend({
            hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t);
            }
        }),
        _.fn.extend({
            bind: function (t, e, n) {
                return this.on(t, null, e, n);
            },
            unbind: function (t, e) {
                return this.off(t, null, e);
            },
            delegate: function (t, e, n, i) {
                return this.on(e, t, n, i);
            },
            undelegate: function (t, e, n) {
                return 1 === arguments.length
                    ? this.off(t, '**')
                    : this.off(e, t || '**', n);
            }
        }),
        (_.proxy = function (t, e) {
            var n, i, o;
            if (('string' == typeof e && ((n = t[e]), (e = t), (t = n)), m(t)))
                return (
                    (i = r.call(arguments, 2)),
                    ((o = function () {
                        return t.apply(e || this, i.concat(r.call(arguments)));
                    }).guid = t.guid =
                        t.guid || _.guid++),
                    o
                );
        }),
        (_.holdReady = function (t) {
            t ? _.readyWait++ : _.ready(!0);
        }),
        (_.isArray = Array.isArray),
        (_.parseJSON = JSON.parse),
        (_.nodeName = A),
        (_.isFunction = m),
        (_.isWindow = g),
        (_.camelCase = Y),
        (_.type = y),
        (_.now = Date.now),
        (_.isNumeric = function (t) {
            var e = _.type(t);
            return (
                ('number' === e || 'string' === e) && !isNaN(t - parseFloat(t))
            );
        }),
        'function' == typeof define &&
            define.amd &&
            define('jquery', [], function () {
                return _;
            });
    var Ke = t.jQuery,
        Ze = t.$;
    return (
        (_.noConflict = function (e) {
            return (
                t.$ === _ && (t.$ = Ze),
                e && t.jQuery === _ && (t.jQuery = Ke),
                _
            );
        }),
        e || (t.jQuery = t.$ = _),
        _
    );
}),
    (function (t, e) {
        'object' ==
            ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
        'undefined' != typeof module
            ? (module.exports = e())
            : 'function' == typeof define && define.amd
            ? define(e)
            : (t.Popper = e());
    })(this, function () {
        'use strict';
        function t(t) {
            return t && '[object Function]' === {}.toString.call(t);
        }
        function e(t, e) {
            if (1 !== t.nodeType) return [];
            var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
            return e ? n[e] : n;
        }
        function n(t) {
            return 'HTML' === t.nodeName ? t : t.parentNode || t.host;
        }
        function i(t) {
            if (!t) return document.body;
            switch (t.nodeName) {
                case 'HTML':
                case 'BODY':
                    return t.ownerDocument.body;
                case '#document':
                    return t.body;
            }
            var o = e(t),
                r = o.overflow,
                s = o.overflowX,
                a = o.overflowY;
            return /(auto|scroll|overlay)/.test(r + a + s) ? t : i(n(t));
        }
        function o(t) {
            return 11 === t ? Z : 10 === t ? G : Z || G;
        }
        function r(t) {
            if (!t) return document.documentElement;
            for (
                var n = o(10) ? document.body : null,
                    i = t.offsetParent || null;
                i === n && t.nextElementSibling;

            )
                i = (t = t.nextElementSibling).offsetParent;
            var s = i && i.nodeName;
            return s && 'BODY' !== s && 'HTML' !== s
                ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(i.nodeName) &&
                  'static' === e(i, 'position')
                    ? r(i)
                    : i
                : t
                ? t.ownerDocument.documentElement
                : document.documentElement;
        }
        function s(t) {
            return null === t.parentNode ? t : s(t.parentNode);
        }
        function a(t, e) {
            if (!(t && t.nodeType && e && e.nodeType))
                return document.documentElement;
            var n =
                    t.compareDocumentPosition(e) &
                    Node.DOCUMENT_POSITION_FOLLOWING,
                i = n ? t : e,
                o = n ? e : t,
                l = document.createRange();
            l.setStart(i, 0), l.setEnd(o, 0);
            var c = l.commonAncestorContainer;
            if ((t !== c && e !== c) || i.contains(o))
                return (function (t) {
                    var e = t.nodeName;
                    return (
                        'BODY' !== e &&
                        ('HTML' === e || r(t.firstElementChild) === t)
                    );
                })(c)
                    ? c
                    : r(c);
            var u = s(t);
            return u.host ? a(u.host, e) : a(t, s(e).host);
        }
        function l(t) {
            var e =
                    1 < arguments.length && void 0 !== arguments[1]
                        ? arguments[1]
                        : 'top',
                n = 'top' === e ? 'scrollTop' : 'scrollLeft',
                i = t.nodeName;
            if ('BODY' === i || 'HTML' === i) {
                var o = t.ownerDocument.documentElement,
                    r = t.ownerDocument.scrollingElement || o;
                return r[n];
            }
            return t[n];
        }
        function c(t, e) {
            var n =
                    2 < arguments.length &&
                    void 0 !== arguments[2] &&
                    arguments[2],
                i = l(e, 'top'),
                o = l(e, 'left'),
                r = n ? -1 : 1;
            return (
                (t.top += i * r),
                (t.bottom += i * r),
                (t.left += o * r),
                (t.right += o * r),
                t
            );
        }
        function u(t, e) {
            var n = 'x' === e ? 'Left' : 'Top',
                i = 'Left' == n ? 'Right' : 'Bottom';
            return (
                parseFloat(t['border' + n + 'Width'], 10) +
                parseFloat(t['border' + i + 'Width'], 10)
            );
        }
        function d(t, e, n, i) {
            return F(
                e['offset' + t],
                e['scroll' + t],
                n['client' + t],
                n['offset' + t],
                n['scroll' + t],
                o(10)
                    ? parseInt(n['offset' + t]) +
                          parseInt(
                              i['margin' + ('Height' === t ? 'Top' : 'Left')]
                          ) +
                          parseInt(
                              i[
                                  'margin' +
                                      ('Height' === t ? 'Bottom' : 'Right')
                              ]
                          )
                    : 0
            );
        }
        function h(t) {
            var e = t.body,
                n = t.documentElement,
                i = o(10) && getComputedStyle(n);
            return {height: d('Height', e, n, i), width: d('Width', e, n, i)};
        }
        function f(t) {
            return nt({}, t, {
                right: t.left + t.width,
                bottom: t.top + t.height
            });
        }
        function p(t) {
            var n = {};
            try {
                if (o(10)) {
                    n = t.getBoundingClientRect();
                    var i = l(t, 'top'),
                        r = l(t, 'left');
                    (n.top += i),
                        (n.left += r),
                        (n.bottom += i),
                        (n.right += r);
                } else n = t.getBoundingClientRect();
            } catch (t) {}
            var s = {
                    left: n.left,
                    top: n.top,
                    width: n.right - n.left,
                    height: n.bottom - n.top
                },
                a = 'HTML' === t.nodeName ? h(t.ownerDocument) : {},
                c = a.width || t.clientWidth || s.right - s.left,
                d = a.height || t.clientHeight || s.bottom - s.top,
                p = t.offsetWidth - c,
                m = t.offsetHeight - d;
            if (p || m) {
                var g = e(t);
                (p -= u(g, 'x')),
                    (m -= u(g, 'y')),
                    (s.width -= p),
                    (s.height -= m);
            }
            return f(s);
        }
        function m(t, n) {
            var r =
                    2 < arguments.length &&
                    void 0 !== arguments[2] &&
                    arguments[2],
                s = o(10),
                a = 'HTML' === n.nodeName,
                l = p(t),
                u = p(n),
                d = i(t),
                h = e(n),
                m = parseFloat(h.borderTopWidth, 10),
                g = parseFloat(h.borderLeftWidth, 10);
            r && a && ((u.top = F(u.top, 0)), (u.left = F(u.left, 0)));
            var v = f({
                top: l.top - u.top - m,
                left: l.left - u.left - g,
                width: l.width,
                height: l.height
            });
            if (((v.marginTop = 0), (v.marginLeft = 0), !s && a)) {
                var w = parseFloat(h.marginTop, 10),
                    y = parseFloat(h.marginLeft, 10);
                (v.top -= m - w),
                    (v.bottom -= m - w),
                    (v.left -= g - y),
                    (v.right -= g - y),
                    (v.marginTop = w),
                    (v.marginLeft = y);
            }
            return (
                (s && !r ? n.contains(d) : n === d && 'BODY' !== d.nodeName) &&
                    (v = c(v, n)),
                v
            );
        }
        function g(t) {
            var e =
                    1 < arguments.length &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                n = t.ownerDocument.documentElement,
                i = m(t, n),
                o = F(n.clientWidth, window.innerWidth || 0),
                r = F(n.clientHeight, window.innerHeight || 0),
                s = e ? 0 : l(n),
                a = e ? 0 : l(n, 'left'),
                c = {
                    top: s - i.top + i.marginTop,
                    left: a - i.left + i.marginLeft,
                    width: o,
                    height: r
                };
            return f(c);
        }
        function v(t) {
            var i = t.nodeName;
            if ('BODY' === i || 'HTML' === i) return !1;
            if ('fixed' === e(t, 'position')) return !0;
            var o = n(t);
            return !!o && v(o);
        }
        function w(t) {
            if (!t || !t.parentElement || o()) return document.documentElement;
            for (var n = t.parentElement; n && 'none' === e(n, 'transform'); )
                n = n.parentElement;
            return n || document.documentElement;
        }
        function y(t, e, o, r) {
            var s =
                    4 < arguments.length &&
                    void 0 !== arguments[4] &&
                    arguments[4],
                l = {top: 0, left: 0},
                c = s ? w(t) : a(t, e);
            if ('viewport' === r) l = g(c, s);
            else {
                var u;
                'scrollParent' === r
                    ? 'BODY' === (u = i(n(e))).nodeName &&
                      (u = t.ownerDocument.documentElement)
                    : (u =
                          'window' === r ? t.ownerDocument.documentElement : r);
                var d = m(u, c, s);
                if ('HTML' !== u.nodeName || v(c)) l = d;
                else {
                    var f = h(t.ownerDocument),
                        p = f.height,
                        y = f.width;
                    (l.top += d.top - d.marginTop),
                        (l.bottom = p + d.top),
                        (l.left += d.left - d.marginLeft),
                        (l.right = y + d.left);
                }
            }
            var b = 'number' == typeof (o = o || 0);
            return (
                (l.left += b ? o : o.left || 0),
                (l.top += b ? o : o.top || 0),
                (l.right -= b ? o : o.right || 0),
                (l.bottom -= b ? o : o.bottom || 0),
                l
            );
        }
        function b(t) {
            return t.width * t.height;
        }
        function _(t, e, n, i, o) {
            var r =
                5 < arguments.length && void 0 !== arguments[5]
                    ? arguments[5]
                    : 0;
            if (-1 === t.indexOf('auto')) return t;
            var s = y(n, i, r, o),
                a = {
                    top: {width: s.width, height: e.top - s.top},
                    right: {width: s.right - e.right, height: s.height},
                    bottom: {width: s.width, height: s.bottom - e.bottom},
                    left: {width: e.left - s.left, height: s.height}
                },
                l = Object.keys(a)
                    .map(function (t) {
                        return nt({key: t}, a[t], {area: b(a[t])});
                    })
                    .sort(function (t, e) {
                        return e.area - t.area;
                    }),
                c = l.filter(function (t) {
                    var e = t.width,
                        i = t.height;
                    return e >= n.clientWidth && i >= n.clientHeight;
                }),
                u = 0 < c.length ? c[0].key : l[0].key,
                d = t.split('-')[1];
            return u + (d ? '-' + d : '');
        }
        function x(t, e, n) {
            var i =
                    3 < arguments.length && void 0 !== arguments[3]
                        ? arguments[3]
                        : null,
                o = i ? w(e) : a(e, n);
            return m(n, o, i);
        }
        function C(t) {
            var e = t.ownerDocument.defaultView.getComputedStyle(t),
                n =
                    parseFloat(e.marginTop || 0) +
                    parseFloat(e.marginBottom || 0),
                i =
                    parseFloat(e.marginLeft || 0) +
                    parseFloat(e.marginRight || 0);
            return {width: t.offsetWidth + i, height: t.offsetHeight + n};
        }
        function k(t) {
            var e = {
                left: 'right',
                right: 'left',
                bottom: 'top',
                top: 'bottom'
            };
            return t.replace(/left|right|bottom|top/g, function (t) {
                return e[t];
            });
        }
        function T(t, e, n) {
            n = n.split('-')[0];
            var i = C(t),
                o = {width: i.width, height: i.height},
                r = -1 !== ['right', 'left'].indexOf(n),
                s = r ? 'top' : 'left',
                a = r ? 'left' : 'top',
                l = r ? 'height' : 'width',
                c = r ? 'width' : 'height';
            return (
                (o[s] = e[s] + e[l] / 2 - i[l] / 2),
                (o[a] = n === a ? e[a] - i[c] : e[k(a)]),
                o
            );
        }
        function E(t, e) {
            return Array.prototype.find ? t.find(e) : t.filter(e)[0];
        }
        function S(e, n, i) {
            var o =
                void 0 === i
                    ? e
                    : e.slice(
                          0,
                          (function (t, e, n) {
                              if (Array.prototype.findIndex)
                                  return t.findIndex(function (t) {
                                      return t[e] === n;
                                  });
                              var i = E(t, function (t) {
                                  return t[e] === n;
                              });
                              return t.indexOf(i);
                          })(e, 'name', i)
                      );
            return (
                o.forEach(function (e) {
                    e.function &&
                        console.warn(
                            '`modifier.function` is deprecated, use `modifier.fn`!'
                        );
                    var i = e.function || e.fn;
                    e.enabled &&
                        t(i) &&
                        ((n.offsets.popper = f(n.offsets.popper)),
                        (n.offsets.reference = f(n.offsets.reference)),
                        (n = i(n, e)));
                }),
                n
            );
        }
        function A() {
            if (!this.state.isDestroyed) {
                var t = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                (t.offsets.reference = x(
                    this.state,
                    this.popper,
                    this.reference,
                    this.options.positionFixed
                )),
                    (t.placement = _(
                        this.options.placement,
                        t.offsets.reference,
                        this.popper,
                        this.reference,
                        this.options.modifiers.flip.boundariesElement,
                        this.options.modifiers.flip.padding
                    )),
                    (t.originalPlacement = t.placement),
                    (t.positionFixed = this.options.positionFixed),
                    (t.offsets.popper = T(
                        this.popper,
                        t.offsets.reference,
                        t.placement
                    )),
                    (t.offsets.popper.position = this.options.positionFixed
                        ? 'fixed'
                        : 'absolute'),
                    (t = S(this.modifiers, t)),
                    this.state.isCreated
                        ? this.options.onUpdate(t)
                        : ((this.state.isCreated = !0),
                          this.options.onCreate(t));
            }
        }
        function D(t, e) {
            return t.some(function (t) {
                var n = t.name;
                return t.enabled && n === e;
            });
        }
        function I(t) {
            for (
                var e = [!1, 'ms', 'Webkit', 'Moz', 'O'],
                    n = t.charAt(0).toUpperCase() + t.slice(1),
                    i = 0;
                i < e.length;
                i++
            ) {
                var o = e[i],
                    r = o ? '' + o + n : t;
                if (void 0 !== document.body.style[r]) return r;
            }
            return null;
        }
        function O() {
            return (
                (this.state.isDestroyed = !0),
                D(this.modifiers, 'applyStyle') &&
                    (this.popper.removeAttribute('x-placement'),
                    (this.popper.style.position = ''),
                    (this.popper.style.top = ''),
                    (this.popper.style.left = ''),
                    (this.popper.style.right = ''),
                    (this.popper.style.bottom = ''),
                    (this.popper.style.willChange = ''),
                    (this.popper.style[I('transform')] = '')),
                this.disableEventListeners(),
                this.options.removeOnDestroy &&
                    this.popper.parentNode.removeChild(this.popper),
                this
            );
        }
        function N(t) {
            var e = t.ownerDocument;
            return e ? e.defaultView : window;
        }
        function L(t, e, n, o) {
            var r = 'BODY' === t.nodeName,
                s = r ? t.ownerDocument.defaultView : t;
            s.addEventListener(e, n, {passive: !0}),
                r || L(i(s.parentNode), e, n, o),
                o.push(s);
        }
        function j(t, e, n, o) {
            (n.updateBound = o),
                N(t).addEventListener('resize', n.updateBound, {passive: !0});
            var r = i(t);
            return (
                L(r, 'scroll', n.updateBound, n.scrollParents),
                (n.scrollElement = r),
                (n.eventsEnabled = !0),
                n
            );
        }
        function P() {
            this.state.eventsEnabled ||
                (this.state = j(
                    this.reference,
                    this.options,
                    this.state,
                    this.scheduleUpdate
                ));
        }
        function $() {
            this.state.eventsEnabled &&
                (cancelAnimationFrame(this.scheduleUpdate),
                (this.state = (function (t, e) {
                    return (
                        N(t).removeEventListener('resize', e.updateBound),
                        e.scrollParents.forEach(function (t) {
                            t.removeEventListener('scroll', e.updateBound);
                        }),
                        (e.updateBound = null),
                        (e.scrollParents = []),
                        (e.scrollElement = null),
                        (e.eventsEnabled = !1),
                        e
                    );
                })(this.reference, this.state)));
        }
        function B(t) {
            return '' !== t && !isNaN(parseFloat(t)) && isFinite(t);
        }
        function H(t, e) {
            Object.keys(e).forEach(function (n) {
                var i = '';
                -1 !==
                    [
                        'width',
                        'height',
                        'top',
                        'right',
                        'bottom',
                        'left'
                    ].indexOf(n) &&
                    B(e[n]) &&
                    (i = 'px'),
                    (t.style[n] = e[n] + i);
            });
        }
        function M(t, e, n) {
            var i = E(t, function (t) {
                    return t.name === e;
                }),
                o =
                    !!i &&
                    t.some(function (t) {
                        return t.name === n && t.enabled && t.order < i.order;
                    });
            if (!o) {
                var r = '`' + e + '`';
                console.warn(
                    '`' +
                        n +
                        '` modifier is required by ' +
                        r +
                        ' modifier in order to work, be sure to include it before ' +
                        r +
                        '!'
                );
            }
            return o;
        }
        function R(t) {
            var e =
                    1 < arguments.length &&
                    void 0 !== arguments[1] &&
                    arguments[1],
                n = rt.indexOf(t),
                i = rt.slice(n + 1).concat(rt.slice(0, n));
            return e ? i.reverse() : i;
        }
        function z(t, e, n, i) {
            var o = [0, 0],
                r = -1 !== ['right', 'left'].indexOf(i),
                s = t.split(/(\+|\-)/).map(function (t) {
                    return t.trim();
                }),
                a = s.indexOf(
                    E(s, function (t) {
                        return -1 !== t.search(/,|\s/);
                    })
                );
            s[a] &&
                -1 === s[a].indexOf(',') &&
                console.warn(
                    'Offsets separated by white space(s) are deprecated, use a comma (,) instead.'
                );
            var l = /\s*,\s*|\s+/,
                c =
                    -1 === a
                        ? [s]
                        : [
                              s.slice(0, a).concat([s[a].split(l)[0]]),
                              [s[a].split(l)[1]].concat(s.slice(a + 1))
                          ];
            return (
                (c = c.map(function (t, i) {
                    var o = (1 === i ? !r : r) ? 'height' : 'width',
                        s = !1;
                    return t
                        .reduce(function (t, e) {
                            return '' === t[t.length - 1] &&
                                -1 !== ['+', '-'].indexOf(e)
                                ? ((t[t.length - 1] = e), (s = !0), t)
                                : s
                                ? ((t[t.length - 1] += e), (s = !1), t)
                                : t.concat(e);
                        }, [])
                        .map(function (t) {
                            return (function (t, e, n, i) {
                                var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                                    r = +o[1],
                                    s = o[2];
                                if (!r) return t;
                                if (0 === s.indexOf('%')) {
                                    return (f('%p' === s ? n : i)[e] / 100) * r;
                                }
                                return 'vh' === s || 'vw' === s
                                    ? (('vh' === s
                                          ? F(
                                                document.documentElement
                                                    .clientHeight,
                                                window.innerHeight || 0
                                            )
                                          : F(
                                                document.documentElement
                                                    .clientWidth,
                                                window.innerWidth || 0
                                            )) /
                                          100) *
                                          r
                                    : r;
                            })(t, o, e, n);
                        });
                })),
                c.forEach(function (t, e) {
                    t.forEach(function (n, i) {
                        B(n) && (o[e] += n * ('-' === t[i - 1] ? -1 : 1));
                    });
                }),
                o
            );
        }
        for (
            var q = Math.min,
                W = Math.floor,
                U = Math.round,
                F = Math.max,
                V =
                    'undefined' != typeof window &&
                    'undefined' != typeof document,
                Y = ['Edge', 'Trident', 'Firefox'],
                Q = 0,
                X = 0;
            X < Y.length;
            X += 1
        )
            if (V && 0 <= navigator.userAgent.indexOf(Y[X])) {
                Q = 1;
                break;
            }
        var K =
                V && window.Promise
                    ? function (t) {
                          var e = !1;
                          return function () {
                              e ||
                                  ((e = !0),
                                  window.Promise.resolve().then(function () {
                                      (e = !1), t();
                                  }));
                          };
                      }
                    : function (t) {
                          var e = !1;
                          return function () {
                              e ||
                                  ((e = !0),
                                  setTimeout(function () {
                                      (e = !1), t();
                                  }, Q));
                          };
                      },
            Z = V && !(!window.MSInputMethodContext || !document.documentMode),
            G = V && /MSIE 10/.test(navigator.userAgent),
            J = function (t, e) {
                if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function');
            },
            tt = (function () {
                function t(t, e) {
                    for (var n, i = 0; i < e.length; i++)
                        ((n = e[i]).enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            'value' in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n);
                }
                return function (e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e;
                };
            })(),
            et = function (t, e, n) {
                return (
                    e in t
                        ? Object.defineProperty(t, e, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (t[e] = n),
                    t
                );
            },
            nt =
                Object.assign ||
                function (t) {
                    for (var e, n = 1; n < arguments.length; n++)
                        for (var i in (e = arguments[n]))
                            Object.prototype.hasOwnProperty.call(e, i) &&
                                (t[i] = e[i]);
                    return t;
                },
            it = V && /Firefox/i.test(navigator.userAgent),
            ot = [
                'auto-start',
                'auto',
                'auto-end',
                'top-start',
                'top',
                'top-end',
                'right-start',
                'right',
                'right-end',
                'bottom-end',
                'bottom',
                'bottom-start',
                'left-end',
                'left',
                'left-start'
            ],
            rt = ot.slice(3),
            st = 'flip',
            at = 'clockwise',
            lt = 'counterclockwise',
            ct = (function () {
                function e(n, i) {
                    var o = this,
                        r =
                            2 < arguments.length && void 0 !== arguments[2]
                                ? arguments[2]
                                : {};
                    J(this, e),
                        (this.scheduleUpdate = function () {
                            return requestAnimationFrame(o.update);
                        }),
                        (this.update = K(this.update.bind(this))),
                        (this.options = nt({}, e.Defaults, r)),
                        (this.state = {
                            isDestroyed: !1,
                            isCreated: !1,
                            scrollParents: []
                        }),
                        (this.reference = n && n.jquery ? n[0] : n),
                        (this.popper = i && i.jquery ? i[0] : i),
                        (this.options.modifiers = {}),
                        Object.keys(
                            nt({}, e.Defaults.modifiers, r.modifiers)
                        ).forEach(function (t) {
                            o.options.modifiers[t] = nt(
                                {},
                                e.Defaults.modifiers[t] || {},
                                r.modifiers ? r.modifiers[t] : {}
                            );
                        }),
                        (this.modifiers = Object.keys(this.options.modifiers)
                            .map(function (t) {
                                return nt({name: t}, o.options.modifiers[t]);
                            })
                            .sort(function (t, e) {
                                return t.order - e.order;
                            })),
                        this.modifiers.forEach(function (e) {
                            e.enabled &&
                                t(e.onLoad) &&
                                e.onLoad(
                                    o.reference,
                                    o.popper,
                                    o.options,
                                    e,
                                    o.state
                                );
                        }),
                        this.update();
                    var s = this.options.eventsEnabled;
                    s && this.enableEventListeners(),
                        (this.state.eventsEnabled = s);
                }
                return (
                    tt(e, [
                        {
                            key: 'update',
                            value: function () {
                                return A.call(this);
                            }
                        },
                        {
                            key: 'destroy',
                            value: function () {
                                return O.call(this);
                            }
                        },
                        {
                            key: 'enableEventListeners',
                            value: function () {
                                return P.call(this);
                            }
                        },
                        {
                            key: 'disableEventListeners',
                            value: function () {
                                return $.call(this);
                            }
                        }
                    ]),
                    e
                );
            })();
        return (
            (ct.Utils = (
                'undefined' == typeof window ? global : window
            ).PopperUtils),
            (ct.placements = ot),
            (ct.Defaults = {
                placement: 'bottom',
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function () {},
                onUpdate: function () {},
                modifiers: {
                    shift: {
                        order: 100,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.placement,
                                n = e.split('-')[0],
                                i = e.split('-')[1];
                            if (i) {
                                var o = t.offsets,
                                    r = o.reference,
                                    s = o.popper,
                                    a = -1 !== ['bottom', 'top'].indexOf(n),
                                    l = a ? 'left' : 'top',
                                    c = a ? 'width' : 'height',
                                    u = {
                                        start: et({}, l, r[l]),
                                        end: et({}, l, r[l] + r[c] - s[c])
                                    };
                                t.offsets.popper = nt({}, s, u[i]);
                            }
                            return t;
                        }
                    },
                    offset: {
                        order: 200,
                        enabled: !0,
                        fn: function (t, e) {
                            var n,
                                i = e.offset,
                                o = t.placement,
                                r = t.offsets,
                                s = r.popper,
                                a = r.reference,
                                l = o.split('-')[0];
                            return (
                                (n = B(+i) ? [+i, 0] : z(i, s, a, l)),
                                'left' === l
                                    ? ((s.top += n[0]), (s.left -= n[1]))
                                    : 'right' === l
                                    ? ((s.top += n[0]), (s.left += n[1]))
                                    : 'top' === l
                                    ? ((s.left += n[0]), (s.top -= n[1]))
                                    : 'bottom' === l &&
                                      ((s.left += n[0]), (s.top += n[1])),
                                (t.popper = s),
                                t
                            );
                        },
                        offset: 0
                    },
                    preventOverflow: {
                        order: 300,
                        enabled: !0,
                        fn: function (t, e) {
                            var n = e.boundariesElement || r(t.instance.popper);
                            t.instance.reference === n && (n = r(n));
                            var i = I('transform'),
                                o = t.instance.popper.style,
                                s = o.top,
                                a = o.left,
                                l = o[i];
                            (o.top = ''), (o.left = ''), (o[i] = '');
                            var c = y(
                                t.instance.popper,
                                t.instance.reference,
                                e.padding,
                                n,
                                t.positionFixed
                            );
                            (o.top = s),
                                (o.left = a),
                                (o[i] = l),
                                (e.boundaries = c);
                            var u = e.priority,
                                d = t.offsets.popper,
                                h = {
                                    primary: function (t) {
                                        var n = d[t];
                                        return (
                                            d[t] < c[t] &&
                                                !e.escapeWithReference &&
                                                (n = F(d[t], c[t])),
                                            et({}, t, n)
                                        );
                                    },
                                    secondary: function (t) {
                                        var n = 'right' === t ? 'left' : 'top',
                                            i = d[n];
                                        return (
                                            d[t] > c[t] &&
                                                !e.escapeWithReference &&
                                                (i = q(
                                                    d[n],
                                                    c[t] -
                                                        ('right' === t
                                                            ? d.width
                                                            : d.height)
                                                )),
                                            et({}, n, i)
                                        );
                                    }
                                };
                            return (
                                u.forEach(function (t) {
                                    var e =
                                        -1 === ['left', 'top'].indexOf(t)
                                            ? 'secondary'
                                            : 'primary';
                                    d = nt({}, d, h[e](t));
                                }),
                                (t.offsets.popper = d),
                                t
                            );
                        },
                        priority: ['left', 'right', 'top', 'bottom'],
                        padding: 5,
                        boundariesElement: 'scrollParent'
                    },
                    keepTogether: {
                        order: 400,
                        enabled: !0,
                        fn: function (t) {
                            var e = t.offsets,
                                n = e.popper,
                                i = e.reference,
                                o = t.placement.split('-')[0],
                                r = W,
                                s = -1 !== ['top', 'bottom'].indexOf(o),
                                a = s ? 'right' : 'bottom',
                                l = s ? 'left' : 'top',
                                c = s ? 'width' : 'height';
                            return (
                                n[a] < r(i[l]) &&
                                    (t.offsets.popper[l] = r(i[l]) - n[c]),
                                n[l] > r(i[a]) &&
                                    (t.offsets.popper[l] = r(i[a])),
                                t
                            );
                        }
                    },
                    arrow: {
                        order: 500,
                        enabled: !0,
                        fn: function (t, n) {
                            var i;
                            if (
                                !M(
                                    t.instance.modifiers,
                                    'arrow',
                                    'keepTogether'
                                )
                            )
                                return t;
                            var o = n.element;
                            if ('string' == typeof o) {
                                if (!(o = t.instance.popper.querySelector(o)))
                                    return t;
                            } else if (!t.instance.popper.contains(o))
                                return (
                                    console.warn(
                                        'WARNING: `arrow.element` must be child of its popper element!'
                                    ),
                                    t
                                );
                            var r = t.placement.split('-')[0],
                                s = t.offsets,
                                a = s.popper,
                                l = s.reference,
                                c = -1 !== ['left', 'right'].indexOf(r),
                                u = c ? 'height' : 'width',
                                d = c ? 'Top' : 'Left',
                                h = d.toLowerCase(),
                                p = c ? 'left' : 'top',
                                m = c ? 'bottom' : 'right',
                                g = C(o)[u];
                            l[m] - g < a[h] &&
                                (t.offsets.popper[h] -= a[h] - (l[m] - g)),
                                l[h] + g > a[m] &&
                                    (t.offsets.popper[h] += l[h] + g - a[m]),
                                (t.offsets.popper = f(t.offsets.popper));
                            var v = l[h] + l[u] / 2 - g / 2,
                                w = e(t.instance.popper),
                                y = parseFloat(w['margin' + d], 10),
                                b = parseFloat(w['border' + d + 'Width'], 10),
                                _ = v - t.offsets.popper[h] - y - b;
                            return (
                                (_ = F(q(a[u] - g, _), 0)),
                                (t.arrowElement = o),
                                (t.offsets.arrow =
                                    (et((i = {}), h, U(_)), et(i, p, ''), i)),
                                t
                            );
                        },
                        element: '[x-arrow]'
                    },
                    flip: {
                        order: 600,
                        enabled: !0,
                        fn: function (t, e) {
                            if (D(t.instance.modifiers, 'inner')) return t;
                            if (
                                t.flipped &&
                                t.placement === t.originalPlacement
                            )
                                return t;
                            var n = y(
                                    t.instance.popper,
                                    t.instance.reference,
                                    e.padding,
                                    e.boundariesElement,
                                    t.positionFixed
                                ),
                                i = t.placement.split('-')[0],
                                o = k(i),
                                r = t.placement.split('-')[1] || '',
                                s = [];
                            switch (e.behavior) {
                                case st:
                                    s = [i, o];
                                    break;
                                case at:
                                    s = R(i);
                                    break;
                                case lt:
                                    s = R(i, !0);
                                    break;
                                default:
                                    s = e.behavior;
                            }
                            return (
                                s.forEach(function (a, l) {
                                    if (i !== a || s.length === l + 1) return t;
                                    (i = t.placement.split('-')[0]), (o = k(i));
                                    var c = t.offsets.popper,
                                        u = t.offsets.reference,
                                        d = W,
                                        h =
                                            ('left' === i &&
                                                d(c.right) > d(u.left)) ||
                                            ('right' === i &&
                                                d(c.left) < d(u.right)) ||
                                            ('top' === i &&
                                                d(c.bottom) > d(u.top)) ||
                                            ('bottom' === i &&
                                                d(c.top) < d(u.bottom)),
                                        f = d(c.left) < d(n.left),
                                        p = d(c.right) > d(n.right),
                                        m = d(c.top) < d(n.top),
                                        g = d(c.bottom) > d(n.bottom),
                                        v =
                                            ('left' === i && f) ||
                                            ('right' === i && p) ||
                                            ('top' === i && m) ||
                                            ('bottom' === i && g),
                                        w = -1 !== ['top', 'bottom'].indexOf(i),
                                        y =
                                            !!e.flipVariations &&
                                            ((w && 'start' === r && f) ||
                                                (w && 'end' === r && p) ||
                                                (!w && 'start' === r && m) ||
                                                (!w && 'end' === r && g));
                                    (h || v || y) &&
                                        ((t.flipped = !0),
                                        (h || v) && (i = s[l + 1]),
                                        y &&
                                            (r = (function (t) {
                                                return 'end' === t
                                                    ? 'start'
                                                    : 'start' === t
                                                    ? 'end'
                                                    : t;
                                            })(r)),
                                        (t.placement = i + (r ? '-' + r : '')),
                                        (t.offsets.popper = nt(
                                            {},
                                            t.offsets.popper,
                                            T(
                                                t.instance.popper,
                                                t.offsets.reference,
                                                t.placement
                                            )
                                        )),
                                        (t = S(
                                            t.instance.modifiers,
                                            t,
                                            'flip'
                                        )));
                                }),
                                t
                            );
                        },
                        behavior: 'flip',
                        padding: 5,
                        boundariesElement: 'viewport'
                    },
                    inner: {
                        order: 700,
                        enabled: !1,
                        fn: function (t) {
                            var e = t.placement,
                                n = e.split('-')[0],
                                i = t.offsets,
                                o = i.popper,
                                r = i.reference,
                                s = -1 !== ['left', 'right'].indexOf(n),
                                a = -1 === ['top', 'left'].indexOf(n);
                            return (
                                (o[s ? 'left' : 'top'] =
                                    r[n] - (a ? o[s ? 'width' : 'height'] : 0)),
                                (t.placement = k(e)),
                                (t.offsets.popper = f(o)),
                                t
                            );
                        }
                    },
                    hide: {
                        order: 800,
                        enabled: !0,
                        fn: function (t) {
                            if (
                                !M(
                                    t.instance.modifiers,
                                    'hide',
                                    'preventOverflow'
                                )
                            )
                                return t;
                            var e = t.offsets.reference,
                                n = E(t.instance.modifiers, function (t) {
                                    return 'preventOverflow' === t.name;
                                }).boundaries;
                            if (
                                e.bottom < n.top ||
                                e.left > n.right ||
                                e.top > n.bottom ||
                                e.right < n.left
                            ) {
                                if (!0 === t.hide) return t;
                                (t.hide = !0),
                                    (t.attributes['x-out-of-boundaries'] = '');
                            } else {
                                if (!1 === t.hide) return t;
                                (t.hide = !1),
                                    (t.attributes['x-out-of-boundaries'] = !1);
                            }
                            return t;
                        }
                    },
                    computeStyle: {
                        order: 850,
                        enabled: !0,
                        fn: function (t, e) {
                            var n = e.x,
                                i = e.y,
                                o = t.offsets.popper,
                                s = E(t.instance.modifiers, function (t) {
                                    return 'applyStyle' === t.name;
                                }).gpuAcceleration;
                            void 0 !== s &&
                                console.warn(
                                    'WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!'
                                );
                            var a,
                                l,
                                c = void 0 === s ? e.gpuAcceleration : s,
                                u = r(t.instance.popper),
                                d = p(u),
                                h = {position: o.position},
                                f = (function (t, e) {
                                    var n = t.offsets,
                                        i = n.popper,
                                        o = n.reference,
                                        r = U,
                                        s = function (t) {
                                            return t;
                                        },
                                        a = r(o.width),
                                        l = r(i.width),
                                        c =
                                            -1 !==
                                            ['left', 'right'].indexOf(
                                                t.placement
                                            ),
                                        u = -1 !== t.placement.indexOf('-'),
                                        d = e
                                            ? c || u || a % 2 == l % 2
                                                ? r
                                                : W
                                            : s,
                                        h = e ? r : s;
                                    return {
                                        left: d(
                                            1 == a % 2 && 1 == l % 2 && !u && e
                                                ? i.left - 1
                                                : i.left
                                        ),
                                        top: h(i.top),
                                        bottom: h(i.bottom),
                                        right: d(i.right)
                                    };
                                })(t, 2 > window.devicePixelRatio || !it),
                                m = 'bottom' === n ? 'top' : 'bottom',
                                g = 'right' === i ? 'left' : 'right',
                                v = I('transform');
                            if (
                                ((l =
                                    'bottom' == m
                                        ? 'HTML' === u.nodeName
                                            ? -u.clientHeight + f.bottom
                                            : -d.height + f.bottom
                                        : f.top),
                                (a =
                                    'right' == g
                                        ? 'HTML' === u.nodeName
                                            ? -u.clientWidth + f.right
                                            : -d.width + f.right
                                        : f.left),
                                c && v)
                            )
                                (h[v] =
                                    'translate3d(' + a + 'px, ' + l + 'px, 0)'),
                                    (h[m] = 0),
                                    (h[g] = 0),
                                    (h.willChange = 'transform');
                            else {
                                var w = 'bottom' == m ? -1 : 1,
                                    y = 'right' == g ? -1 : 1;
                                (h[m] = l * w),
                                    (h[g] = a * y),
                                    (h.willChange = m + ', ' + g);
                            }
                            var b = {'x-placement': t.placement};
                            return (
                                (t.attributes = nt({}, b, t.attributes)),
                                (t.styles = nt({}, h, t.styles)),
                                (t.arrowStyles = nt(
                                    {},
                                    t.offsets.arrow,
                                    t.arrowStyles
                                )),
                                t
                            );
                        },
                        gpuAcceleration: !0,
                        x: 'bottom',
                        y: 'right'
                    },
                    applyStyle: {
                        order: 900,
                        enabled: !0,
                        fn: function (t) {
                            return (
                                H(t.instance.popper, t.styles),
                                (function (t, e) {
                                    Object.keys(e).forEach(function (n) {
                                        !1 === e[n]
                                            ? t.removeAttribute(n)
                                            : t.setAttribute(n, e[n]);
                                    });
                                })(t.instance.popper, t.attributes),
                                t.arrowElement &&
                                    Object.keys(t.arrowStyles).length &&
                                    H(t.arrowElement, t.arrowStyles),
                                t
                            );
                        },
                        onLoad: function (t, e, n, i, o) {
                            var r = x(o, e, t, n.positionFixed),
                                s = _(
                                    n.placement,
                                    r,
                                    e,
                                    t,
                                    n.modifiers.flip.boundariesElement,
                                    n.modifiers.flip.padding
                                );
                            return (
                                e.setAttribute('x-placement', s),
                                H(e, {
                                    position: n.positionFixed
                                        ? 'fixed'
                                        : 'absolute'
                                }),
                                n
                            );
                        },
                        gpuAcceleration: void 0
                    }
                }
            }),
            ct
        );
    }),
    (function (t, e) {
        'object' ==
            ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
        'undefined' != typeof module
            ? e(exports, require('jquery'), require('popper.js'))
            : 'function' == typeof define && define.amd
            ? define(['exports', 'jquery', 'popper.js'], e)
            : e(((t = t || self).bootstrap = {}), t.jQuery, t.Popper);
    })(this, function (t, e, n) {
        'use strict';
        function i(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                (i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    'value' in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i);
            }
        }
        function o(t, e, n) {
            return e && i(t.prototype, e), n && i(t, n), t;
        }
        function r(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {},
                    i = Object.keys(n);
                'function' == typeof Object.getOwnPropertySymbols &&
                    (i = i.concat(
                        Object.getOwnPropertySymbols(n).filter(function (t) {
                            return Object.getOwnPropertyDescriptor(
                                n,
                                t
                            ).enumerable;
                        })
                    )),
                    i.forEach(function (e) {
                        var i, o, r;
                        (i = t),
                            (r = n[(o = e)]),
                            o in i
                                ? Object.defineProperty(i, o, {
                                      value: r,
                                      enumerable: !0,
                                      configurable: !0,
                                      writable: !0
                                  })
                                : (i[o] = r);
                    });
            }
            return t;
        }
        (e = e && e.hasOwnProperty('default') ? e.default : e),
            (n = n && n.hasOwnProperty('default') ? n.default : n);
        var s = 'transitionend';
        var a = {
            TRANSITION_END: 'bsTransitionEnd',
            getUID: function (t) {
                for (
                    ;
                    (t += ~~(1e6 * Math.random())), document.getElementById(t);

                );
                return t;
            },
            getSelectorFromElement: function (t) {
                var e = t.getAttribute('data-target');
                if (!e || '#' === e) {
                    var n = t.getAttribute('href');
                    e = n && '#' !== n ? n.trim() : '';
                }
                try {
                    return document.querySelector(e) ? e : null;
                } catch (t) {
                    return null;
                }
            },
            getTransitionDurationFromElement: function (t) {
                if (!t) return 0;
                var n = e(t).css('transition-duration'),
                    i = e(t).css('transition-delay'),
                    o = parseFloat(n),
                    r = parseFloat(i);
                return o || r
                    ? ((n = n.split(',')[0]),
                      (i = i.split(',')[0]),
                      1e3 * (parseFloat(n) + parseFloat(i)))
                    : 0;
            },
            reflow: function (t) {
                return t.offsetHeight;
            },
            triggerTransitionEnd: function (t) {
                e(t).trigger(s);
            },
            supportsTransitionEnd: function () {
                return Boolean(s);
            },
            isElement: function (t) {
                return (t[0] || t).nodeType;
            },
            typeCheckConfig: function (t, e, n) {
                for (var i in n)
                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                        var o = n[i],
                            r = e[i],
                            s =
                                r && a.isElement(r)
                                    ? 'element'
                                    : ((l = r),
                                      {}.toString
                                          .call(l)
                                          .match(/\s([a-z]+)/i)[1]
                                          .toLowerCase());
                        if (!new RegExp(o).test(s))
                            throw new Error(
                                t.toUpperCase() +
                                    ': Option "' +
                                    i +
                                    '" provided type "' +
                                    s +
                                    '" but expected type "' +
                                    o +
                                    '".'
                            );
                    }
                var l;
            },
            findShadowRoot: function (t) {
                if (!document.documentElement.attachShadow) return null;
                if ('function' != typeof t.getRootNode)
                    return t instanceof ShadowRoot
                        ? t
                        : t.parentNode
                        ? a.findShadowRoot(t.parentNode)
                        : null;
                var e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null;
            }
        };
        (e.fn.emulateTransitionEnd = function (t) {
            var n = this,
                i = !1;
            return (
                e(this).one(a.TRANSITION_END, function () {
                    i = !0;
                }),
                setTimeout(function () {
                    i || a.triggerTransitionEnd(n);
                }, t),
                this
            );
        }),
            (e.event.special[a.TRANSITION_END] = {
                bindType: s,
                delegateType: s,
                handle: function (t) {
                    if (e(t.target).is(this))
                        return t.handleObj.handler.apply(this, arguments);
                }
            });
        var l = 'alert',
            c = 'bs.alert',
            u = '.' + c,
            d = e.fn[l],
            h = {
                CLOSE: 'close' + u,
                CLOSED: 'closed' + u,
                CLICK_DATA_API: 'click' + u + '.data-api'
            },
            f = (function () {
                function t(t) {
                    this._element = t;
                }
                var n = t.prototype;
                return (
                    (n.close = function (t) {
                        var e = this._element;
                        t && (e = this._getRootElement(t)),
                            this._triggerCloseEvent(e).isDefaultPrevented() ||
                                this._removeElement(e);
                    }),
                    (n.dispose = function () {
                        e.removeData(this._element, c), (this._element = null);
                    }),
                    (n._getRootElement = function (t) {
                        var n = a.getSelectorFromElement(t),
                            i = !1;
                        return (
                            n && (i = document.querySelector(n)),
                            i || (i = e(t).closest('.alert')[0]),
                            i
                        );
                    }),
                    (n._triggerCloseEvent = function (t) {
                        var n = e.Event(h.CLOSE);
                        return e(t).trigger(n), n;
                    }),
                    (n._removeElement = function (t) {
                        var n = this;
                        if ((e(t).removeClass('show'), e(t).hasClass('fade'))) {
                            var i = a.getTransitionDurationFromElement(t);
                            e(t)
                                .one(a.TRANSITION_END, function (e) {
                                    return n._destroyElement(t, e);
                                })
                                .emulateTransitionEnd(i);
                        } else this._destroyElement(t);
                    }),
                    (n._destroyElement = function (t) {
                        e(t).detach().trigger(h.CLOSED).remove();
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this),
                                o = i.data(c);
                            o || ((o = new t(this)), i.data(c, o)),
                                'close' === n && o[n](this);
                        });
                    }),
                    (t._handleDismiss = function (t) {
                        return function (e) {
                            e && e.preventDefault(), t.close(this);
                        };
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document).on(
            h.CLICK_DATA_API,
            '[data-dismiss="alert"]',
            f._handleDismiss(new f())
        ),
            (e.fn[l] = f._jQueryInterface),
            (e.fn[l].Constructor = f),
            (e.fn[l].noConflict = function () {
                return (e.fn[l] = d), f._jQueryInterface;
            });
        var p = 'button',
            m = 'bs.button',
            g = '.' + m,
            v = '.data-api',
            w = e.fn[p],
            y = 'active',
            b = '[data-toggle^="button"]',
            _ = '.btn',
            x = {
                CLICK_DATA_API: 'click' + g + v,
                FOCUS_BLUR_DATA_API: 'focus' + g + v + ' blur' + g + v
            },
            C = (function () {
                function t(t) {
                    this._element = t;
                }
                var n = t.prototype;
                return (
                    (n.toggle = function () {
                        var t = !0,
                            n = !0,
                            i = e(this._element).closest(
                                '[data-toggle="buttons"]'
                            )[0];
                        if (i) {
                            var o = this._element.querySelector(
                                'input:not([type="hidden"])'
                            );
                            if (o) {
                                if ('radio' === o.type)
                                    if (
                                        o.checked &&
                                        this._element.classList.contains(y)
                                    )
                                        t = !1;
                                    else {
                                        var r = i.querySelector('.active');
                                        r && e(r).removeClass(y);
                                    }
                                if (t) {
                                    if (
                                        o.hasAttribute('disabled') ||
                                        i.hasAttribute('disabled') ||
                                        o.classList.contains('disabled') ||
                                        i.classList.contains('disabled')
                                    )
                                        return;
                                    (o.checked =
                                        !this._element.classList.contains(y)),
                                        e(o).trigger('change');
                                }
                                o.focus(), (n = !1);
                            }
                        }
                        n &&
                            this._element.setAttribute(
                                'aria-pressed',
                                !this._element.classList.contains(y)
                            ),
                            t && e(this._element).toggleClass(y);
                    }),
                    (n.dispose = function () {
                        e.removeData(this._element, m), (this._element = null);
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this).data(m);
                            i || ((i = new t(this)), e(this).data(m, i)),
                                'toggle' === n && i[n]();
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document)
            .on(x.CLICK_DATA_API, b, function (t) {
                t.preventDefault();
                var n = t.target;
                e(n).hasClass('btn') || (n = e(n).closest(_)),
                    C._jQueryInterface.call(e(n), 'toggle');
            })
            .on(x.FOCUS_BLUR_DATA_API, b, function (t) {
                var n = e(t.target).closest(_)[0];
                e(n).toggleClass('focus', /^focus(in)?$/.test(t.type));
            }),
            (e.fn[p] = C._jQueryInterface),
            (e.fn[p].Constructor = C),
            (e.fn[p].noConflict = function () {
                return (e.fn[p] = w), C._jQueryInterface;
            });
        var k = 'carousel',
            T = 'bs.carousel',
            E = '.' + T,
            S = '.data-api',
            A = e.fn[k],
            D = {
                interval: 5e3,
                keyboard: !0,
                slide: !1,
                pause: 'hover',
                wrap: !0,
                touch: !0
            },
            I = {
                interval: '(number|boolean)',
                keyboard: 'boolean',
                slide: '(boolean|string)',
                pause: '(string|boolean)',
                wrap: 'boolean',
                touch: 'boolean'
            },
            O = 'next',
            N = 'prev',
            L = {
                SLIDE: 'slide' + E,
                SLID: 'slid' + E,
                KEYDOWN: 'keydown' + E,
                MOUSEENTER: 'mouseenter' + E,
                MOUSELEAVE: 'mouseleave' + E,
                TOUCHSTART: 'touchstart' + E,
                TOUCHMOVE: 'touchmove' + E,
                TOUCHEND: 'touchend' + E,
                POINTERDOWN: 'pointerdown' + E,
                POINTERUP: 'pointerup' + E,
                DRAG_START: 'dragstart' + E,
                LOAD_DATA_API: 'load' + E + S,
                CLICK_DATA_API: 'click' + E + S
            },
            j = 'active',
            P = '.active.carousel-item',
            $ = {TOUCH: 'touch', PEN: 'pen'},
            B = (function () {
                function t(t, e) {
                    (this._items = null),
                        (this._interval = null),
                        (this._activeElement = null),
                        (this._isPaused = !1),
                        (this._isSliding = !1),
                        (this.touchTimeout = null),
                        (this.touchStartX = 0),
                        (this.touchDeltaX = 0),
                        (this._config = this._getConfig(e)),
                        (this._element = t),
                        (this._indicatorsElement = this._element.querySelector(
                            '.carousel-indicators'
                        )),
                        (this._touchSupported =
                            'ontouchstart' in document.documentElement ||
                            0 < navigator.maxTouchPoints),
                        (this._pointerEvent = Boolean(
                            window.PointerEvent || window.MSPointerEvent
                        )),
                        this._addEventListeners();
                }
                var n = t.prototype;
                return (
                    (n.next = function () {
                        this._isSliding || this._slide(O);
                    }),
                    (n.nextWhenVisible = function () {
                        !document.hidden &&
                            e(this._element).is(':visible') &&
                            'hidden' !== e(this._element).css('visibility') &&
                            this.next();
                    }),
                    (n.prev = function () {
                        this._isSliding || this._slide(N);
                    }),
                    (n.pause = function (t) {
                        t || (this._isPaused = !0),
                            this._element.querySelector(
                                '.carousel-item-next, .carousel-item-prev'
                            ) &&
                                (a.triggerTransitionEnd(this._element),
                                this.cycle(!0)),
                            clearInterval(this._interval),
                            (this._interval = null);
                    }),
                    (n.cycle = function (t) {
                        t || (this._isPaused = !1),
                            this._interval &&
                                (clearInterval(this._interval),
                                (this._interval = null)),
                            this._config.interval &&
                                !this._isPaused &&
                                (this._interval = setInterval(
                                    (document.visibilityState
                                        ? this.nextWhenVisible
                                        : this.next
                                    ).bind(this),
                                    this._config.interval
                                ));
                    }),
                    (n.to = function (t) {
                        var n = this;
                        this._activeElement = this._element.querySelector(P);
                        var i = this._getItemIndex(this._activeElement);
                        if (!(t > this._items.length - 1 || t < 0))
                            if (this._isSliding)
                                e(this._element).one(L.SLID, function () {
                                    return n.to(t);
                                });
                            else {
                                if (i === t)
                                    return this.pause(), void this.cycle();
                                var o = i < t ? O : N;
                                this._slide(o, this._items[t]);
                            }
                    }),
                    (n.dispose = function () {
                        e(this._element).off(E),
                            e.removeData(this._element, T),
                            (this._items = null),
                            (this._config = null),
                            (this._element = null),
                            (this._interval = null),
                            (this._isPaused = null),
                            (this._isSliding = null),
                            (this._activeElement = null),
                            (this._indicatorsElement = null);
                    }),
                    (n._getConfig = function (t) {
                        return (t = r({}, D, t)), a.typeCheckConfig(k, t, I), t;
                    }),
                    (n._handleSwipe = function () {
                        var t = Math.abs(this.touchDeltaX);
                        if (!(t <= 40)) {
                            var e = t / this.touchDeltaX;
                            0 < e && this.prev(), e < 0 && this.next();
                        }
                    }),
                    (n._addEventListeners = function () {
                        var t = this;
                        this._config.keyboard &&
                            e(this._element).on(L.KEYDOWN, function (e) {
                                return t._keydown(e);
                            }),
                            'hover' === this._config.pause &&
                                e(this._element)
                                    .on(L.MOUSEENTER, function (e) {
                                        return t.pause(e);
                                    })
                                    .on(L.MOUSELEAVE, function (e) {
                                        return t.cycle(e);
                                    }),
                            this._config.touch &&
                                this._addTouchEventListeners();
                    }),
                    (n._addTouchEventListeners = function () {
                        var t = this;
                        if (this._touchSupported) {
                            var n = function (e) {
                                    t._pointerEvent &&
                                    $[e.originalEvent.pointerType.toUpperCase()]
                                        ? (t.touchStartX =
                                              e.originalEvent.clientX)
                                        : t._pointerEvent ||
                                          (t.touchStartX =
                                              e.originalEvent.touches[0].clientX);
                                },
                                i = function (e) {
                                    t._pointerEvent &&
                                        $[
                                            e.originalEvent.pointerType.toUpperCase()
                                        ] &&
                                        (t.touchDeltaX =
                                            e.originalEvent.clientX -
                                            t.touchStartX),
                                        t._handleSwipe(),
                                        'hover' === t._config.pause &&
                                            (t.pause(),
                                            t.touchTimeout &&
                                                clearTimeout(t.touchTimeout),
                                            (t.touchTimeout = setTimeout(
                                                function (e) {
                                                    return t.cycle(e);
                                                },
                                                500 + t._config.interval
                                            )));
                                };
                            e(
                                this._element.querySelectorAll(
                                    '.carousel-item img'
                                )
                            ).on(L.DRAG_START, function (t) {
                                return t.preventDefault();
                            }),
                                this._pointerEvent
                                    ? (e(this._element).on(
                                          L.POINTERDOWN,
                                          function (t) {
                                              return n(t);
                                          }
                                      ),
                                      e(this._element).on(
                                          L.POINTERUP,
                                          function (t) {
                                              return i(t);
                                          }
                                      ),
                                      this._element.classList.add(
                                          'pointer-event'
                                      ))
                                    : (e(this._element).on(
                                          L.TOUCHSTART,
                                          function (t) {
                                              return n(t);
                                          }
                                      ),
                                      e(this._element).on(
                                          L.TOUCHMOVE,
                                          function (e) {
                                              var n;
                                              (n = e).originalEvent.touches &&
                                              1 < n.originalEvent.touches.length
                                                  ? (t.touchDeltaX = 0)
                                                  : (t.touchDeltaX =
                                                        n.originalEvent
                                                            .touches[0]
                                                            .clientX -
                                                        t.touchStartX);
                                          }
                                      ),
                                      e(this._element).on(
                                          L.TOUCHEND,
                                          function (t) {
                                              return i(t);
                                          }
                                      ));
                        }
                    }),
                    (n._keydown = function (t) {
                        if (!/input|textarea/i.test(t.target.tagName))
                            switch (t.which) {
                                case 37:
                                    t.preventDefault(), this.prev();
                                    break;
                                case 39:
                                    t.preventDefault(), this.next();
                            }
                    }),
                    (n._getItemIndex = function (t) {
                        return (
                            (this._items =
                                t && t.parentNode
                                    ? [].slice.call(
                                          t.parentNode.querySelectorAll(
                                              '.carousel-item'
                                          )
                                      )
                                    : []),
                            this._items.indexOf(t)
                        );
                    }),
                    (n._getItemByDirection = function (t, e) {
                        var n = t === O,
                            i = t === N,
                            o = this._getItemIndex(e),
                            r = this._items.length - 1;
                        if (
                            ((i && 0 === o) || (n && o === r)) &&
                            !this._config.wrap
                        )
                            return e;
                        var s = (o + (t === N ? -1 : 1)) % this._items.length;
                        return -1 === s
                            ? this._items[this._items.length - 1]
                            : this._items[s];
                    }),
                    (n._triggerSlideEvent = function (t, n) {
                        var i = this._getItemIndex(t),
                            o = this._getItemIndex(
                                this._element.querySelector(P)
                            ),
                            r = e.Event(L.SLIDE, {
                                relatedTarget: t,
                                direction: n,
                                from: o,
                                to: i
                            });
                        return e(this._element).trigger(r), r;
                    }),
                    (n._setActiveIndicatorElement = function (t) {
                        if (this._indicatorsElement) {
                            var n = [].slice.call(
                                this._indicatorsElement.querySelectorAll(
                                    '.active'
                                )
                            );
                            e(n).removeClass(j);
                            var i =
                                this._indicatorsElement.children[
                                    this._getItemIndex(t)
                                ];
                            i && e(i).addClass(j);
                        }
                    }),
                    (n._slide = function (t, n) {
                        var i,
                            o,
                            r,
                            s = this,
                            l = this._element.querySelector(P),
                            c = this._getItemIndex(l),
                            u = n || (l && this._getItemByDirection(t, l)),
                            d = this._getItemIndex(u),
                            h = Boolean(this._interval);
                        if (
                            ((r =
                                t === O
                                    ? ((i = 'carousel-item-left'),
                                      (o = 'carousel-item-next'),
                                      'left')
                                    : ((i = 'carousel-item-right'),
                                      (o = 'carousel-item-prev'),
                                      'right')),
                            u && e(u).hasClass(j))
                        )
                            this._isSliding = !1;
                        else if (
                            !this._triggerSlideEvent(
                                u,
                                r
                            ).isDefaultPrevented() &&
                            l &&
                            u
                        ) {
                            (this._isSliding = !0),
                                h && this.pause(),
                                this._setActiveIndicatorElement(u);
                            var f = e.Event(L.SLID, {
                                relatedTarget: u,
                                direction: r,
                                from: c,
                                to: d
                            });
                            if (e(this._element).hasClass('slide')) {
                                e(u).addClass(o),
                                    a.reflow(u),
                                    e(l).addClass(i),
                                    e(u).addClass(i);
                                var p = parseInt(
                                    u.getAttribute('data-interval'),
                                    10
                                );
                                this._config.interval = p
                                    ? ((this._config.defaultInterval =
                                          this._config.defaultInterval ||
                                          this._config.interval),
                                      p)
                                    : this._config.defaultInterval ||
                                      this._config.interval;
                                var m = a.getTransitionDurationFromElement(l);
                                e(l)
                                    .one(a.TRANSITION_END, function () {
                                        e(u)
                                            .removeClass(i + ' ' + o)
                                            .addClass(j),
                                            e(l).removeClass(
                                                j + ' ' + o + ' ' + i
                                            ),
                                            (s._isSliding = !1),
                                            setTimeout(function () {
                                                return e(s._element).trigger(f);
                                            }, 0);
                                    })
                                    .emulateTransitionEnd(m);
                            } else
                                e(l).removeClass(j),
                                    e(u).addClass(j),
                                    (this._isSliding = !1),
                                    e(this._element).trigger(f);
                            h && this.cycle();
                        }
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this).data(T),
                                o = r({}, D, e(this).data());
                            'object' == _typeof(n) && (o = r({}, o, n));
                            var s = 'string' == typeof n ? n : o.slide;
                            if (
                                (i ||
                                    ((i = new t(this, o)), e(this).data(T, i)),
                                'number' == typeof n)
                            )
                                i.to(n);
                            else if ('string' == typeof s) {
                                if (void 0 === i[s])
                                    throw new TypeError(
                                        'No method named "' + s + '"'
                                    );
                                i[s]();
                            } else
                                o.interval && o.ride && (i.pause(), i.cycle());
                        });
                    }),
                    (t._dataApiClickHandler = function (n) {
                        var i = a.getSelectorFromElement(this);
                        if (i) {
                            var o = e(i)[0];
                            if (o && e(o).hasClass('carousel')) {
                                var s = r({}, e(o).data(), e(this).data()),
                                    l = this.getAttribute('data-slide-to');
                                l && (s.interval = !1),
                                    t._jQueryInterface.call(e(o), s),
                                    l && e(o).data(T).to(l),
                                    n.preventDefault();
                            }
                        }
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return D;
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document).on(
            L.CLICK_DATA_API,
            '[data-slide], [data-slide-to]',
            B._dataApiClickHandler
        ),
            e(window).on(L.LOAD_DATA_API, function () {
                for (
                    var t = [].slice.call(
                            document.querySelectorAll('[data-ride="carousel"]')
                        ),
                        n = 0,
                        i = t.length;
                    n < i;
                    n++
                ) {
                    var o = e(t[n]);
                    B._jQueryInterface.call(o, o.data());
                }
            }),
            (e.fn[k] = B._jQueryInterface),
            (e.fn[k].Constructor = B),
            (e.fn[k].noConflict = function () {
                return (e.fn[k] = A), B._jQueryInterface;
            });
        var H = 'collapse',
            M = 'bs.collapse',
            R = '.' + M,
            z = e.fn[H],
            q = {toggle: !0, parent: ''},
            W = {toggle: 'boolean', parent: '(string|element)'},
            U = {
                SHOW: 'show' + R,
                SHOWN: 'shown' + R,
                HIDE: 'hide' + R,
                HIDDEN: 'hidden' + R,
                CLICK_DATA_API: 'click' + R + '.data-api'
            },
            F = 'show',
            V = 'collapse',
            Y = 'collapsing',
            Q = 'collapsed',
            X = 'width',
            K = '[data-toggle="collapse"]',
            Z = (function () {
                function t(t, e) {
                    (this._isTransitioning = !1),
                        (this._element = t),
                        (this._config = this._getConfig(e)),
                        (this._triggerArray = [].slice.call(
                            document.querySelectorAll(
                                '[data-toggle="collapse"][href="#' +
                                    t.id +
                                    '"],[data-toggle="collapse"][data-target="#' +
                                    t.id +
                                    '"]'
                            )
                        ));
                    for (
                        var n = [].slice.call(document.querySelectorAll(K)),
                            i = 0,
                            o = n.length;
                        i < o;
                        i++
                    ) {
                        var r = n[i],
                            s = a.getSelectorFromElement(r),
                            l = [].slice
                                .call(document.querySelectorAll(s))
                                .filter(function (e) {
                                    return e === t;
                                });
                        null !== s &&
                            0 < l.length &&
                            ((this._selector = s), this._triggerArray.push(r));
                    }
                    (this._parent = this._config.parent
                        ? this._getParent()
                        : null),
                        this._config.parent ||
                            this._addAriaAndCollapsedClass(
                                this._element,
                                this._triggerArray
                            ),
                        this._config.toggle && this.toggle();
                }
                var n = t.prototype;
                return (
                    (n.toggle = function () {
                        e(this._element).hasClass(F)
                            ? this.hide()
                            : this.show();
                    }),
                    (n.show = function () {
                        var n,
                            i,
                            o = this;
                        if (
                            !(
                                this._isTransitioning ||
                                e(this._element).hasClass(F) ||
                                (this._parent &&
                                    0 ===
                                        (n = [].slice
                                            .call(
                                                this._parent.querySelectorAll(
                                                    '.show, .collapsing'
                                                )
                                            )
                                            .filter(function (t) {
                                                return 'string' ==
                                                    typeof o._config.parent
                                                    ? t.getAttribute(
                                                          'data-parent'
                                                      ) === o._config.parent
                                                    : t.classList.contains(V);
                                            })).length &&
                                    (n = null),
                                n &&
                                    (i = e(n).not(this._selector).data(M)) &&
                                    i._isTransitioning)
                            )
                        ) {
                            var r = e.Event(U.SHOW);
                            if (
                                (e(this._element).trigger(r),
                                !r.isDefaultPrevented())
                            ) {
                                n &&
                                    (t._jQueryInterface.call(
                                        e(n).not(this._selector),
                                        'hide'
                                    ),
                                    i || e(n).data(M, null));
                                var s = this._getDimension();
                                e(this._element).removeClass(V).addClass(Y),
                                    (this._element.style[s] = 0),
                                    this._triggerArray.length &&
                                        e(this._triggerArray)
                                            .removeClass(Q)
                                            .attr('aria-expanded', !0),
                                    this.setTransitioning(!0);
                                var l =
                                        'scroll' +
                                        (s[0].toUpperCase() + s.slice(1)),
                                    c = a.getTransitionDurationFromElement(
                                        this._element
                                    );
                                e(this._element)
                                    .one(a.TRANSITION_END, function () {
                                        e(o._element)
                                            .removeClass(Y)
                                            .addClass(V)
                                            .addClass(F),
                                            (o._element.style[s] = ''),
                                            o.setTransitioning(!1),
                                            e(o._element).trigger(U.SHOWN);
                                    })
                                    .emulateTransitionEnd(c),
                                    (this._element.style[s] =
                                        this._element[l] + 'px');
                            }
                        }
                    }),
                    (n.hide = function () {
                        var t = this;
                        if (
                            !this._isTransitioning &&
                            e(this._element).hasClass(F)
                        ) {
                            var n = e.Event(U.HIDE);
                            if (
                                (e(this._element).trigger(n),
                                !n.isDefaultPrevented())
                            ) {
                                var i = this._getDimension();
                                (this._element.style[i] =
                                    this._element.getBoundingClientRect()[i] +
                                    'px'),
                                    a.reflow(this._element),
                                    e(this._element)
                                        .addClass(Y)
                                        .removeClass(V)
                                        .removeClass(F);
                                var o = this._triggerArray.length;
                                if (0 < o)
                                    for (var r = 0; r < o; r++) {
                                        var s = this._triggerArray[r],
                                            l = a.getSelectorFromElement(s);
                                        null !== l &&
                                            (e(
                                                [].slice.call(
                                                    document.querySelectorAll(l)
                                                )
                                            ).hasClass(F) ||
                                                e(s)
                                                    .addClass(Q)
                                                    .attr('aria-expanded', !1));
                                    }
                                this.setTransitioning(!0),
                                    (this._element.style[i] = '');
                                var c = a.getTransitionDurationFromElement(
                                    this._element
                                );
                                e(this._element)
                                    .one(a.TRANSITION_END, function () {
                                        t.setTransitioning(!1),
                                            e(t._element)
                                                .removeClass(Y)
                                                .addClass(V)
                                                .trigger(U.HIDDEN);
                                    })
                                    .emulateTransitionEnd(c);
                            }
                        }
                    }),
                    (n.setTransitioning = function (t) {
                        this._isTransitioning = t;
                    }),
                    (n.dispose = function () {
                        e.removeData(this._element, M),
                            (this._config = null),
                            (this._parent = null),
                            (this._element = null),
                            (this._triggerArray = null),
                            (this._isTransitioning = null);
                    }),
                    (n._getConfig = function (t) {
                        return (
                            ((t = r({}, q, t)).toggle = Boolean(t.toggle)),
                            a.typeCheckConfig(H, t, W),
                            t
                        );
                    }),
                    (n._getDimension = function () {
                        return e(this._element).hasClass(X) ? X : 'height';
                    }),
                    (n._getParent = function () {
                        var n,
                            i = this;
                        a.isElement(this._config.parent)
                            ? ((n = this._config.parent),
                              void 0 !== this._config.parent.jquery &&
                                  (n = this._config.parent[0]))
                            : (n = document.querySelector(this._config.parent));
                        var o =
                                '[data-toggle="collapse"][data-parent="' +
                                this._config.parent +
                                '"]',
                            r = [].slice.call(n.querySelectorAll(o));
                        return (
                            e(r).each(function (e, n) {
                                i._addAriaAndCollapsedClass(
                                    t._getTargetFromElement(n),
                                    [n]
                                );
                            }),
                            n
                        );
                    }),
                    (n._addAriaAndCollapsedClass = function (t, n) {
                        var i = e(t).hasClass(F);
                        n.length &&
                            e(n).toggleClass(Q, !i).attr('aria-expanded', i);
                    }),
                    (t._getTargetFromElement = function (t) {
                        var e = a.getSelectorFromElement(t);
                        return e ? document.querySelector(e) : null;
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this),
                                o = i.data(M),
                                s = r(
                                    {},
                                    q,
                                    i.data(),
                                    'object' == _typeof(n) && n ? n : {}
                                );
                            if (
                                (!o &&
                                    s.toggle &&
                                    /show|hide/.test(n) &&
                                    (s.toggle = !1),
                                o || ((o = new t(this, s)), i.data(M, o)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === o[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                o[n]();
                            }
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return q;
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document).on(U.CLICK_DATA_API, K, function (t) {
            'A' === t.currentTarget.tagName && t.preventDefault();
            var n = e(this),
                i = a.getSelectorFromElement(this),
                o = [].slice.call(document.querySelectorAll(i));
            e(o).each(function () {
                var t = e(this),
                    i = t.data(M) ? 'toggle' : n.data();
                Z._jQueryInterface.call(t, i);
            });
        }),
            (e.fn[H] = Z._jQueryInterface),
            (e.fn[H].Constructor = Z),
            (e.fn[H].noConflict = function () {
                return (e.fn[H] = z), Z._jQueryInterface;
            });
        var G = 'dropdown',
            J = 'bs.dropdown',
            tt = '.' + J,
            et = '.data-api',
            nt = e.fn[G],
            it = new RegExp('38|40|27'),
            ot = {
                HIDE: 'hide' + tt,
                HIDDEN: 'hidden' + tt,
                SHOW: 'show' + tt,
                SHOWN: 'shown' + tt,
                CLICK: 'click' + tt,
                CLICK_DATA_API: 'click' + tt + et,
                KEYDOWN_DATA_API: 'keydown' + tt + et,
                KEYUP_DATA_API: 'keyup' + tt + et
            },
            rt = 'disabled',
            st = 'show',
            at = 'dropdown-menu-right',
            lt = '[data-toggle="dropdown"]',
            ct = '.dropdown-menu',
            ut = {
                offset: 0,
                flip: !0,
                boundary: 'scrollParent',
                reference: 'toggle',
                display: 'dynamic'
            },
            dt = {
                offset: '(number|string|function)',
                flip: 'boolean',
                boundary: '(string|element)',
                reference: '(string|element)',
                display: 'string'
            },
            ht = (function () {
                function t(t, e) {
                    (this._element = t),
                        (this._popper = null),
                        (this._config = this._getConfig(e)),
                        (this._menu = this._getMenuElement()),
                        (this._inNavbar = this._detectNavbar()),
                        this._addEventListeners();
                }
                var i = t.prototype;
                return (
                    (i.toggle = function () {
                        if (
                            !this._element.disabled &&
                            !e(this._element).hasClass(rt)
                        ) {
                            var i = t._getParentFromElement(this._element),
                                o = e(this._menu).hasClass(st);
                            if ((t._clearMenus(), !o)) {
                                var r = {relatedTarget: this._element},
                                    s = e.Event(ot.SHOW, r);
                                if (
                                    (e(i).trigger(s), !s.isDefaultPrevented())
                                ) {
                                    if (!this._inNavbar) {
                                        if (void 0 === n)
                                            throw new TypeError(
                                                "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                                            );
                                        var l = this._element;
                                        'parent' === this._config.reference
                                            ? (l = i)
                                            : a.isElement(
                                                  this._config.reference
                                              ) &&
                                              ((l = this._config.reference),
                                              void 0 !==
                                                  this._config.reference
                                                      .jquery &&
                                                  (l =
                                                      this._config
                                                          .reference[0])),
                                            'scrollParent' !==
                                                this._config.boundary &&
                                                e(i).addClass(
                                                    'position-static'
                                                ),
                                            (this._popper = new n(
                                                l,
                                                this._menu,
                                                this._getPopperConfig()
                                            ));
                                    }
                                    'ontouchstart' in
                                        document.documentElement &&
                                        0 ===
                                            e(i).closest('.navbar-nav')
                                                .length &&
                                        e(document.body)
                                            .children()
                                            .on('mouseover', null, e.noop),
                                        this._element.focus(),
                                        this._element.setAttribute(
                                            'aria-expanded',
                                            !0
                                        ),
                                        e(this._menu).toggleClass(st),
                                        e(i)
                                            .toggleClass(st)
                                            .trigger(e.Event(ot.SHOWN, r));
                                }
                            }
                        }
                    }),
                    (i.show = function () {
                        if (
                            !(
                                this._element.disabled ||
                                e(this._element).hasClass(rt) ||
                                e(this._menu).hasClass(st)
                            )
                        ) {
                            var n = {relatedTarget: this._element},
                                i = e.Event(ot.SHOW, n),
                                o = t._getParentFromElement(this._element);
                            e(o).trigger(i),
                                i.isDefaultPrevented() ||
                                    (e(this._menu).toggleClass(st),
                                    e(o)
                                        .toggleClass(st)
                                        .trigger(e.Event(ot.SHOWN, n)));
                        }
                    }),
                    (i.hide = function () {
                        if (
                            !this._element.disabled &&
                            !e(this._element).hasClass(rt) &&
                            e(this._menu).hasClass(st)
                        ) {
                            var n = {relatedTarget: this._element},
                                i = e.Event(ot.HIDE, n),
                                o = t._getParentFromElement(this._element);
                            e(o).trigger(i),
                                i.isDefaultPrevented() ||
                                    (e(this._menu).toggleClass(st),
                                    e(o)
                                        .toggleClass(st)
                                        .trigger(e.Event(ot.HIDDEN, n)));
                        }
                    }),
                    (i.dispose = function () {
                        e.removeData(this._element, J),
                            e(this._element).off(tt),
                            (this._element = null),
                            (this._menu = null) !== this._popper &&
                                (this._popper.destroy(), (this._popper = null));
                    }),
                    (i.update = function () {
                        (this._inNavbar = this._detectNavbar()),
                            null !== this._popper &&
                                this._popper.scheduleUpdate();
                    }),
                    (i._addEventListeners = function () {
                        var t = this;
                        e(this._element).on(ot.CLICK, function (e) {
                            e.preventDefault(), e.stopPropagation(), t.toggle();
                        });
                    }),
                    (i._getConfig = function (t) {
                        return (
                            (t = r(
                                {},
                                this.constructor.Default,
                                e(this._element).data(),
                                t
                            )),
                            a.typeCheckConfig(
                                G,
                                t,
                                this.constructor.DefaultType
                            ),
                            t
                        );
                    }),
                    (i._getMenuElement = function () {
                        if (!this._menu) {
                            var e = t._getParentFromElement(this._element);
                            e && (this._menu = e.querySelector(ct));
                        }
                        return this._menu;
                    }),
                    (i._getPlacement = function () {
                        var t = e(this._element.parentNode),
                            n = 'bottom-start';
                        return (
                            t.hasClass('dropup')
                                ? ((n = 'top-start'),
                                  e(this._menu).hasClass(at) && (n = 'top-end'))
                                : t.hasClass('dropright')
                                ? (n = 'right-start')
                                : t.hasClass('dropleft')
                                ? (n = 'left-start')
                                : e(this._menu).hasClass(at) &&
                                  (n = 'bottom-end'),
                            n
                        );
                    }),
                    (i._detectNavbar = function () {
                        return 0 < e(this._element).closest('.navbar').length;
                    }),
                    (i._getOffset = function () {
                        var t = this,
                            e = {};
                        return (
                            'function' == typeof this._config.offset
                                ? (e.fn = function (e) {
                                      return (
                                          (e.offsets = r(
                                              {},
                                              e.offsets,
                                              t._config.offset(
                                                  e.offsets,
                                                  t._element
                                              ) || {}
                                          )),
                                          e
                                      );
                                  })
                                : (e.offset = this._config.offset),
                            e
                        );
                    }),
                    (i._getPopperConfig = function () {
                        var t = {
                            placement: this._getPlacement(),
                            modifiers: {
                                offset: this._getOffset(),
                                flip: {enabled: this._config.flip},
                                preventOverflow: {
                                    boundariesElement: this._config.boundary
                                }
                            }
                        };
                        return (
                            'static' === this._config.display &&
                                (t.modifiers.applyStyle = {enabled: !1}),
                            t
                        );
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this).data(J);
                            if (
                                (i ||
                                    ((i = new t(
                                        this,
                                        'object' == _typeof(n) ? n : null
                                    )),
                                    e(this).data(J, i)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === i[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                i[n]();
                            }
                        });
                    }),
                    (t._clearMenus = function (n) {
                        if (
                            !n ||
                            (3 !== n.which &&
                                ('keyup' !== n.type || 9 === n.which))
                        )
                            for (
                                var i = [].slice.call(
                                        document.querySelectorAll(lt)
                                    ),
                                    o = 0,
                                    r = i.length;
                                o < r;
                                o++
                            ) {
                                var s = t._getParentFromElement(i[o]),
                                    a = e(i[o]).data(J),
                                    l = {relatedTarget: i[o]};
                                if (
                                    (n &&
                                        'click' === n.type &&
                                        (l.clickEvent = n),
                                    a)
                                ) {
                                    var c = a._menu;
                                    if (
                                        e(s).hasClass(st) &&
                                        !(
                                            n &&
                                            (('click' === n.type &&
                                                /input|textarea/i.test(
                                                    n.target.tagName
                                                )) ||
                                                ('keyup' === n.type &&
                                                    9 === n.which)) &&
                                            e.contains(s, n.target)
                                        )
                                    ) {
                                        var u = e.Event(ot.HIDE, l);
                                        e(s).trigger(u),
                                            u.isDefaultPrevented() ||
                                                ('ontouchstart' in
                                                    document.documentElement &&
                                                    e(document.body)
                                                        .children()
                                                        .off(
                                                            'mouseover',
                                                            null,
                                                            e.noop
                                                        ),
                                                i[o].setAttribute(
                                                    'aria-expanded',
                                                    'false'
                                                ),
                                                e(c).removeClass(st),
                                                e(s)
                                                    .removeClass(st)
                                                    .trigger(
                                                        e.Event(ot.HIDDEN, l)
                                                    ));
                                    }
                                }
                            }
                    }),
                    (t._getParentFromElement = function (t) {
                        var e,
                            n = a.getSelectorFromElement(t);
                        return (
                            n && (e = document.querySelector(n)),
                            e || t.parentNode
                        );
                    }),
                    (t._dataApiKeydownHandler = function (n) {
                        if (
                            (/input|textarea/i.test(n.target.tagName)
                                ? !(
                                      32 === n.which ||
                                      (27 !== n.which &&
                                          ((40 !== n.which && 38 !== n.which) ||
                                              e(n.target).closest(ct).length))
                                  )
                                : it.test(n.which)) &&
                            (n.preventDefault(),
                            n.stopPropagation(),
                            !this.disabled && !e(this).hasClass(rt))
                        ) {
                            var i = t._getParentFromElement(this),
                                o = e(i).hasClass(st);
                            if (
                                o &&
                                (!o || (27 !== n.which && 32 !== n.which))
                            ) {
                                var r = [].slice.call(
                                    i.querySelectorAll(
                                        '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
                                    )
                                );
                                if (0 !== r.length) {
                                    var s = r.indexOf(n.target);
                                    38 === n.which && 0 < s && s--,
                                        40 === n.which &&
                                            s < r.length - 1 &&
                                            s++,
                                        s < 0 && (s = 0),
                                        r[s].focus();
                                }
                            } else {
                                if (27 === n.which) {
                                    var a = i.querySelector(lt);
                                    e(a).trigger('focus');
                                }
                                e(this).trigger('click');
                            }
                        }
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return ut;
                            }
                        },
                        {
                            key: 'DefaultType',
                            get: function () {
                                return dt;
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document)
            .on(ot.KEYDOWN_DATA_API, lt, ht._dataApiKeydownHandler)
            .on(ot.KEYDOWN_DATA_API, ct, ht._dataApiKeydownHandler)
            .on(ot.CLICK_DATA_API + ' ' + ot.KEYUP_DATA_API, ht._clearMenus)
            .on(ot.CLICK_DATA_API, lt, function (t) {
                t.preventDefault(),
                    t.stopPropagation(),
                    ht._jQueryInterface.call(e(this), 'toggle');
            })
            .on(ot.CLICK_DATA_API, '.dropdown form', function (t) {
                t.stopPropagation();
            }),
            (e.fn[G] = ht._jQueryInterface),
            (e.fn[G].Constructor = ht),
            (e.fn[G].noConflict = function () {
                return (e.fn[G] = nt), ht._jQueryInterface;
            });
        var ft = 'modal',
            pt = 'bs.modal',
            mt = '.' + pt,
            gt = e.fn[ft],
            vt = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
            wt = {
                backdrop: '(boolean|string)',
                keyboard: 'boolean',
                focus: 'boolean',
                show: 'boolean'
            },
            yt = {
                HIDE: 'hide' + mt,
                HIDDEN: 'hidden' + mt,
                SHOW: 'show' + mt,
                SHOWN: 'shown' + mt,
                FOCUSIN: 'focusin' + mt,
                RESIZE: 'resize' + mt,
                CLICK_DISMISS: 'click.dismiss' + mt,
                KEYDOWN_DISMISS: 'keydown.dismiss' + mt,
                MOUSEUP_DISMISS: 'mouseup.dismiss' + mt,
                MOUSEDOWN_DISMISS: 'mousedown.dismiss' + mt,
                CLICK_DATA_API: 'click' + mt + '.data-api'
            },
            bt = 'modal-open',
            _t = 'fade',
            xt = 'show',
            Ct = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
            kt = '.sticky-top',
            Tt = (function () {
                function t(t, e) {
                    (this._config = this._getConfig(e)),
                        (this._element = t),
                        (this._dialog = t.querySelector('.modal-dialog')),
                        (this._backdrop = null),
                        (this._isShown = !1),
                        (this._isBodyOverflowing = !1),
                        (this._ignoreBackdropClick = !1),
                        (this._isTransitioning = !1),
                        (this._scrollbarWidth = 0);
                }
                var n = t.prototype;
                return (
                    (n.toggle = function (t) {
                        return this._isShown ? this.hide() : this.show(t);
                    }),
                    (n.show = function (t) {
                        var n = this;
                        if (!this._isShown && !this._isTransitioning) {
                            e(this._element).hasClass(_t) &&
                                (this._isTransitioning = !0);
                            var i = e.Event(yt.SHOW, {relatedTarget: t});
                            e(this._element).trigger(i),
                                this._isShown ||
                                    i.isDefaultPrevented() ||
                                    ((this._isShown = !0),
                                    this._checkScrollbar(),
                                    this._setScrollbar(),
                                    this._adjustDialog(),
                                    this._setEscapeEvent(),
                                    this._setResizeEvent(),
                                    e(this._element).on(
                                        yt.CLICK_DISMISS,
                                        '[data-dismiss="modal"]',
                                        function (t) {
                                            return n.hide(t);
                                        }
                                    ),
                                    e(this._dialog).on(
                                        yt.MOUSEDOWN_DISMISS,
                                        function () {
                                            e(n._element).one(
                                                yt.MOUSEUP_DISMISS,
                                                function (t) {
                                                    e(t.target).is(
                                                        n._element
                                                    ) &&
                                                        (n._ignoreBackdropClick =
                                                            !0);
                                                }
                                            );
                                        }
                                    ),
                                    this._showBackdrop(function () {
                                        return n._showElement(t);
                                    }));
                        }
                    }),
                    (n.hide = function (t) {
                        var n = this;
                        if (
                            (t && t.preventDefault(),
                            this._isShown && !this._isTransitioning)
                        ) {
                            var i = e.Event(yt.HIDE);
                            if (
                                (e(this._element).trigger(i),
                                this._isShown && !i.isDefaultPrevented())
                            ) {
                                this._isShown = !1;
                                var o = e(this._element).hasClass(_t);
                                if (
                                    (o && (this._isTransitioning = !0),
                                    this._setEscapeEvent(),
                                    this._setResizeEvent(),
                                    e(document).off(yt.FOCUSIN),
                                    e(this._element).removeClass(xt),
                                    e(this._element).off(yt.CLICK_DISMISS),
                                    e(this._dialog).off(yt.MOUSEDOWN_DISMISS),
                                    o)
                                ) {
                                    var r = a.getTransitionDurationFromElement(
                                        this._element
                                    );
                                    e(this._element)
                                        .one(a.TRANSITION_END, function (t) {
                                            return n._hideModal(t);
                                        })
                                        .emulateTransitionEnd(r);
                                } else this._hideModal();
                            }
                        }
                    }),
                    (n.dispose = function () {
                        [window, this._element, this._dialog].forEach(function (
                            t
                        ) {
                            return e(t).off(mt);
                        }),
                            e(document).off(yt.FOCUSIN),
                            e.removeData(this._element, pt),
                            (this._config = null),
                            (this._element = null),
                            (this._dialog = null),
                            (this._backdrop = null),
                            (this._isShown = null),
                            (this._isBodyOverflowing = null),
                            (this._ignoreBackdropClick = null),
                            (this._isTransitioning = null),
                            (this._scrollbarWidth = null);
                    }),
                    (n.handleUpdate = function () {
                        this._adjustDialog();
                    }),
                    (n._getConfig = function (t) {
                        return (
                            (t = r({}, vt, t)), a.typeCheckConfig(ft, t, wt), t
                        );
                    }),
                    (n._showElement = function (t) {
                        var n = this,
                            i = e(this._element).hasClass(_t);
                        (this._element.parentNode &&
                            this._element.parentNode.nodeType ===
                                Node.ELEMENT_NODE) ||
                            document.body.appendChild(this._element),
                            (this._element.style.display = 'block'),
                            this._element.removeAttribute('aria-hidden'),
                            this._element.setAttribute('aria-modal', !0),
                            e(this._dialog).hasClass('modal-dialog-scrollable')
                                ? (this._dialog.querySelector(
                                      '.modal-body'
                                  ).scrollTop = 0)
                                : (this._element.scrollTop = 0),
                            i && a.reflow(this._element),
                            e(this._element).addClass(xt),
                            this._config.focus && this._enforceFocus();
                        var o = e.Event(yt.SHOWN, {relatedTarget: t}),
                            r = function () {
                                n._config.focus && n._element.focus(),
                                    (n._isTransitioning = !1),
                                    e(n._element).trigger(o);
                            };
                        if (i) {
                            var s = a.getTransitionDurationFromElement(
                                this._dialog
                            );
                            e(this._dialog)
                                .one(a.TRANSITION_END, r)
                                .emulateTransitionEnd(s);
                        } else r();
                    }),
                    (n._enforceFocus = function () {
                        var t = this;
                        e(document)
                            .off(yt.FOCUSIN)
                            .on(yt.FOCUSIN, function (n) {
                                document !== n.target &&
                                    t._element !== n.target &&
                                    0 === e(t._element).has(n.target).length &&
                                    t._element.focus();
                            });
                    }),
                    (n._setEscapeEvent = function () {
                        var t = this;
                        this._isShown && this._config.keyboard
                            ? e(this._element).on(
                                  yt.KEYDOWN_DISMISS,
                                  function (e) {
                                      27 === e.which &&
                                          (e.preventDefault(), t.hide());
                                  }
                              )
                            : this._isShown ||
                              e(this._element).off(yt.KEYDOWN_DISMISS);
                    }),
                    (n._setResizeEvent = function () {
                        var t = this;
                        this._isShown
                            ? e(window).on(yt.RESIZE, function (e) {
                                  return t.handleUpdate(e);
                              })
                            : e(window).off(yt.RESIZE);
                    }),
                    (n._hideModal = function () {
                        var t = this;
                        (this._element.style.display = 'none'),
                            this._element.setAttribute('aria-hidden', !0),
                            this._element.removeAttribute('aria-modal'),
                            (this._isTransitioning = !1),
                            this._showBackdrop(function () {
                                e(document.body).removeClass(bt),
                                    t._resetAdjustments(),
                                    t._resetScrollbar(),
                                    e(t._element).trigger(yt.HIDDEN);
                            });
                    }),
                    (n._removeBackdrop = function () {
                        this._backdrop &&
                            (e(this._backdrop).remove(),
                            (this._backdrop = null));
                    }),
                    (n._showBackdrop = function (t) {
                        var n = this,
                            i = e(this._element).hasClass(_t) ? _t : '';
                        if (this._isShown && this._config.backdrop) {
                            if (
                                ((this._backdrop =
                                    document.createElement('div')),
                                (this._backdrop.className = 'modal-backdrop'),
                                i && this._backdrop.classList.add(i),
                                e(this._backdrop).appendTo(document.body),
                                e(this._element).on(
                                    yt.CLICK_DISMISS,
                                    function (t) {
                                        n._ignoreBackdropClick
                                            ? (n._ignoreBackdropClick = !1)
                                            : t.target === t.currentTarget &&
                                              ('static' === n._config.backdrop
                                                  ? n._element.focus()
                                                  : n.hide());
                                    }
                                ),
                                i && a.reflow(this._backdrop),
                                e(this._backdrop).addClass(xt),
                                !t)
                            )
                                return;
                            if (!i) return void t();
                            var o = a.getTransitionDurationFromElement(
                                this._backdrop
                            );
                            e(this._backdrop)
                                .one(a.TRANSITION_END, t)
                                .emulateTransitionEnd(o);
                        } else if (!this._isShown && this._backdrop) {
                            e(this._backdrop).removeClass(xt);
                            var r = function () {
                                n._removeBackdrop(), t && t();
                            };
                            if (e(this._element).hasClass(_t)) {
                                var s = a.getTransitionDurationFromElement(
                                    this._backdrop
                                );
                                e(this._backdrop)
                                    .one(a.TRANSITION_END, r)
                                    .emulateTransitionEnd(s);
                            } else r();
                        } else t && t();
                    }),
                    (n._adjustDialog = function () {
                        var t =
                            this._element.scrollHeight >
                            document.documentElement.clientHeight;
                        !this._isBodyOverflowing &&
                            t &&
                            (this._element.style.paddingLeft =
                                this._scrollbarWidth + 'px'),
                            this._isBodyOverflowing &&
                                !t &&
                                (this._element.style.paddingRight =
                                    this._scrollbarWidth + 'px');
                    }),
                    (n._resetAdjustments = function () {
                        (this._element.style.paddingLeft = ''),
                            (this._element.style.paddingRight = '');
                    }),
                    (n._checkScrollbar = function () {
                        var t = document.body.getBoundingClientRect();
                        (this._isBodyOverflowing =
                            t.left + t.right < window.innerWidth),
                            (this._scrollbarWidth = this._getScrollbarWidth());
                    }),
                    (n._setScrollbar = function () {
                        var t = this;
                        if (this._isBodyOverflowing) {
                            var n = [].slice.call(
                                    document.querySelectorAll(Ct)
                                ),
                                i = [].slice.call(
                                    document.querySelectorAll(kt)
                                );
                            e(n).each(function (n, i) {
                                var o = i.style.paddingRight,
                                    r = e(i).css('padding-right');
                                e(i)
                                    .data('padding-right', o)
                                    .css(
                                        'padding-right',
                                        parseFloat(r) + t._scrollbarWidth + 'px'
                                    );
                            }),
                                e(i).each(function (n, i) {
                                    var o = i.style.marginRight,
                                        r = e(i).css('margin-right');
                                    e(i)
                                        .data('margin-right', o)
                                        .css(
                                            'margin-right',
                                            parseFloat(r) -
                                                t._scrollbarWidth +
                                                'px'
                                        );
                                });
                            var o = document.body.style.paddingRight,
                                r = e(document.body).css('padding-right');
                            e(document.body)
                                .data('padding-right', o)
                                .css(
                                    'padding-right',
                                    parseFloat(r) + this._scrollbarWidth + 'px'
                                );
                        }
                        e(document.body).addClass(bt);
                    }),
                    (n._resetScrollbar = function () {
                        var t = [].slice.call(document.querySelectorAll(Ct));
                        e(t).each(function (t, n) {
                            var i = e(n).data('padding-right');
                            e(n).removeData('padding-right'),
                                (n.style.paddingRight = i || '');
                        });
                        var n = [].slice.call(
                            document.querySelectorAll('' + kt)
                        );
                        e(n).each(function (t, n) {
                            var i = e(n).data('margin-right');
                            void 0 !== i &&
                                e(n)
                                    .css('margin-right', i)
                                    .removeData('margin-right');
                        });
                        var i = e(document.body).data('padding-right');
                        e(document.body).removeData('padding-right'),
                            (document.body.style.paddingRight = i || '');
                    }),
                    (n._getScrollbarWidth = function () {
                        var t = document.createElement('div');
                        (t.className = 'modal-scrollbar-measure'),
                            document.body.appendChild(t);
                        var e = t.getBoundingClientRect().width - t.clientWidth;
                        return document.body.removeChild(t), e;
                    }),
                    (t._jQueryInterface = function (n, i) {
                        return this.each(function () {
                            var o = e(this).data(pt),
                                s = r(
                                    {},
                                    vt,
                                    e(this).data(),
                                    'object' == _typeof(n) && n ? n : {}
                                );
                            if (
                                (o ||
                                    ((o = new t(this, s)), e(this).data(pt, o)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === o[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                o[n](i);
                            } else s.show && o.show(i);
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return vt;
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document).on(
            yt.CLICK_DATA_API,
            '[data-toggle="modal"]',
            function (t) {
                var n,
                    i = this,
                    o = a.getSelectorFromElement(this);
                o && (n = document.querySelector(o));
                var s = e(n).data(pt)
                    ? 'toggle'
                    : r({}, e(n).data(), e(this).data());
                ('A' !== this.tagName && 'AREA' !== this.tagName) ||
                    t.preventDefault();
                var l = e(n).one(yt.SHOW, function (t) {
                    t.isDefaultPrevented() ||
                        l.one(yt.HIDDEN, function () {
                            e(i).is(':visible') && i.focus();
                        });
                });
                Tt._jQueryInterface.call(e(n), s, this);
            }
        ),
            (e.fn[ft] = Tt._jQueryInterface),
            (e.fn[ft].Constructor = Tt),
            (e.fn[ft].noConflict = function () {
                return (e.fn[ft] = gt), Tt._jQueryInterface;
            });
        var Et = [
                'background',
                'cite',
                'href',
                'itemtype',
                'longdesc',
                'poster',
                'src',
                'xlink:href'
            ],
            St = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
            At =
                /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
        function Dt(t, e, n) {
            if (0 === t.length) return t;
            if (n && 'function' == typeof n) return n(t);
            for (
                var i = new window.DOMParser().parseFromString(t, 'text/html'),
                    o = Object.keys(e),
                    r = [].slice.call(i.body.querySelectorAll('*')),
                    s = function (t, n) {
                        var i = r[t],
                            s = i.nodeName.toLowerCase();
                        if (-1 === o.indexOf(i.nodeName.toLowerCase()))
                            return i.parentNode.removeChild(i), 'continue';
                        var a = [].slice.call(i.attributes),
                            l = [].concat(e['*'] || [], e[s] || []);
                        a.forEach(function (t) {
                            (function (t, e) {
                                var n = t.nodeName.toLowerCase();
                                if (-1 !== e.indexOf(n))
                                    return (
                                        -1 === Et.indexOf(n) ||
                                        Boolean(
                                            t.nodeValue.match(St) ||
                                                t.nodeValue.match(At)
                                        )
                                    );
                                for (
                                    var i = e.filter(function (t) {
                                            return t instanceof RegExp;
                                        }),
                                        o = 0,
                                        r = i.length;
                                    o < r;
                                    o++
                                )
                                    if (n.match(i[o])) return !0;
                                return !1;
                            })(t, l) || i.removeAttribute(t.nodeName);
                        });
                    },
                    a = 0,
                    l = r.length;
                a < l;
                a++
            )
                s(a);
            return i.body.innerHTML;
        }
        var It = 'tooltip',
            Ot = 'bs.tooltip',
            Nt = '.' + Ot,
            Lt = e.fn[It],
            jt = 'bs-tooltip',
            Pt = new RegExp('(^|\\s)' + jt + '\\S+', 'g'),
            $t = ['sanitize', 'whiteList', 'sanitizeFn'],
            Bt = {
                animation: 'boolean',
                template: 'string',
                title: '(string|element|function)',
                trigger: 'string',
                delay: '(number|object)',
                html: 'boolean',
                selector: '(string|boolean)',
                placement: '(string|function)',
                offset: '(number|string|function)',
                container: '(string|element|boolean)',
                fallbackPlacement: '(string|array)',
                boundary: '(string|element)',
                sanitize: 'boolean',
                sanitizeFn: '(null|function)',
                whiteList: 'object'
            },
            Ht = {
                AUTO: 'auto',
                TOP: 'top',
                RIGHT: 'right',
                BOTTOM: 'bottom',
                LEFT: 'left'
            },
            Mt = {
                animation: !0,
                template:
                    '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
                trigger: 'hover focus',
                title: '',
                delay: 0,
                html: !1,
                selector: !1,
                placement: 'top',
                offset: 0,
                container: !1,
                fallbackPlacement: 'flip',
                boundary: 'scrollParent',
                sanitize: !0,
                sanitizeFn: null,
                whiteList: {
                    '*': [
                        'class',
                        'dir',
                        'id',
                        'lang',
                        'role',
                        /^aria-[\w-]*$/i
                    ],
                    a: ['target', 'href', 'title', 'rel'],
                    area: [],
                    b: [],
                    br: [],
                    col: [],
                    code: [],
                    div: [],
                    em: [],
                    hr: [],
                    h1: [],
                    h2: [],
                    h3: [],
                    h4: [],
                    h5: [],
                    h6: [],
                    i: [],
                    img: ['src', 'alt', 'title', 'width', 'height'],
                    li: [],
                    ol: [],
                    p: [],
                    pre: [],
                    s: [],
                    small: [],
                    span: [],
                    sub: [],
                    sup: [],
                    strong: [],
                    u: [],
                    ul: []
                }
            },
            Rt = 'show',
            zt = 'out',
            qt = {
                HIDE: 'hide' + Nt,
                HIDDEN: 'hidden' + Nt,
                SHOW: 'show' + Nt,
                SHOWN: 'shown' + Nt,
                INSERTED: 'inserted' + Nt,
                CLICK: 'click' + Nt,
                FOCUSIN: 'focusin' + Nt,
                FOCUSOUT: 'focusout' + Nt,
                MOUSEENTER: 'mouseenter' + Nt,
                MOUSELEAVE: 'mouseleave' + Nt
            },
            Wt = 'fade',
            Ut = 'show',
            Ft = 'hover',
            Vt = 'focus',
            Yt = (function () {
                function t(t, e) {
                    if (void 0 === n)
                        throw new TypeError(
                            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
                        );
                    (this._isEnabled = !0),
                        (this._timeout = 0),
                        (this._hoverState = ''),
                        (this._activeTrigger = {}),
                        (this._popper = null),
                        (this.element = t),
                        (this.config = this._getConfig(e)),
                        (this.tip = null),
                        this._setListeners();
                }
                var i = t.prototype;
                return (
                    (i.enable = function () {
                        this._isEnabled = !0;
                    }),
                    (i.disable = function () {
                        this._isEnabled = !1;
                    }),
                    (i.toggleEnabled = function () {
                        this._isEnabled = !this._isEnabled;
                    }),
                    (i.toggle = function (t) {
                        if (this._isEnabled)
                            if (t) {
                                var n = this.constructor.DATA_KEY,
                                    i = e(t.currentTarget).data(n);
                                i ||
                                    ((i = new this.constructor(
                                        t.currentTarget,
                                        this._getDelegateConfig()
                                    )),
                                    e(t.currentTarget).data(n, i)),
                                    (i._activeTrigger.click =
                                        !i._activeTrigger.click),
                                    i._isWithActiveTrigger()
                                        ? i._enter(null, i)
                                        : i._leave(null, i);
                            } else {
                                if (e(this.getTipElement()).hasClass(Ut))
                                    return void this._leave(null, this);
                                this._enter(null, this);
                            }
                    }),
                    (i.dispose = function () {
                        clearTimeout(this._timeout),
                            e.removeData(
                                this.element,
                                this.constructor.DATA_KEY
                            ),
                            e(this.element).off(this.constructor.EVENT_KEY),
                            e(this.element)
                                .closest('.modal')
                                .off('hide.bs.modal'),
                            this.tip && e(this.tip).remove(),
                            (this._isEnabled = null),
                            (this._timeout = null),
                            (this._hoverState = null),
                            (this._activeTrigger = null) !== this._popper &&
                                this._popper.destroy(),
                            (this._popper = null),
                            (this.element = null),
                            (this.config = null),
                            (this.tip = null);
                    }),
                    (i.show = function () {
                        var t = this;
                        if ('none' === e(this.element).css('display'))
                            throw new Error(
                                'Please use show on visible elements'
                            );
                        var i = e.Event(this.constructor.Event.SHOW);
                        if (this.isWithContent() && this._isEnabled) {
                            e(this.element).trigger(i);
                            var o = a.findShadowRoot(this.element),
                                r = e.contains(
                                    null !== o
                                        ? o
                                        : this.element.ownerDocument
                                              .documentElement,
                                    this.element
                                );
                            if (i.isDefaultPrevented() || !r) return;
                            var s = this.getTipElement(),
                                l = a.getUID(this.constructor.NAME);
                            s.setAttribute('id', l),
                                this.element.setAttribute(
                                    'aria-describedby',
                                    l
                                ),
                                this.setContent(),
                                this.config.animation && e(s).addClass(Wt);
                            var c =
                                    'function' == typeof this.config.placement
                                        ? this.config.placement.call(
                                              this,
                                              s,
                                              this.element
                                          )
                                        : this.config.placement,
                                u = this._getAttachment(c);
                            this.addAttachmentClass(u);
                            var d = this._getContainer();
                            e(s).data(this.constructor.DATA_KEY, this),
                                e.contains(
                                    this.element.ownerDocument.documentElement,
                                    this.tip
                                ) || e(s).appendTo(d),
                                e(this.element).trigger(
                                    this.constructor.Event.INSERTED
                                ),
                                (this._popper = new n(this.element, s, {
                                    placement: u,
                                    modifiers: {
                                        offset: this._getOffset(),
                                        flip: {
                                            behavior:
                                                this.config.fallbackPlacement
                                        },
                                        arrow: {element: '.arrow'},
                                        preventOverflow: {
                                            boundariesElement:
                                                this.config.boundary
                                        }
                                    },
                                    onCreate: function (e) {
                                        e.originalPlacement !== e.placement &&
                                            t._handlePopperPlacementChange(e);
                                    },
                                    onUpdate: function (e) {
                                        return t._handlePopperPlacementChange(
                                            e
                                        );
                                    }
                                })),
                                e(s).addClass(Ut),
                                'ontouchstart' in document.documentElement &&
                                    e(document.body)
                                        .children()
                                        .on('mouseover', null, e.noop);
                            var h = function () {
                                t.config.animation && t._fixTransition();
                                var n = t._hoverState;
                                (t._hoverState = null),
                                    e(t.element).trigger(
                                        t.constructor.Event.SHOWN
                                    ),
                                    n === zt && t._leave(null, t);
                            };
                            if (e(this.tip).hasClass(Wt)) {
                                var f = a.getTransitionDurationFromElement(
                                    this.tip
                                );
                                e(this.tip)
                                    .one(a.TRANSITION_END, h)
                                    .emulateTransitionEnd(f);
                            } else h();
                        }
                    }),
                    (i.hide = function (t) {
                        var n = this,
                            i = this.getTipElement(),
                            o = e.Event(this.constructor.Event.HIDE),
                            r = function () {
                                n._hoverState !== Rt &&
                                    i.parentNode &&
                                    i.parentNode.removeChild(i),
                                    n._cleanTipClass(),
                                    n.element.removeAttribute(
                                        'aria-describedby'
                                    ),
                                    e(n.element).trigger(
                                        n.constructor.Event.HIDDEN
                                    ),
                                    null !== n._popper && n._popper.destroy(),
                                    t && t();
                            };
                        if (
                            (e(this.element).trigger(o),
                            !o.isDefaultPrevented())
                        ) {
                            if (
                                (e(i).removeClass(Ut),
                                'ontouchstart' in document.documentElement &&
                                    e(document.body)
                                        .children()
                                        .off('mouseover', null, e.noop),
                                (this._activeTrigger.click = !1),
                                (this._activeTrigger[Vt] = !1),
                                (this._activeTrigger[Ft] = !1),
                                e(this.tip).hasClass(Wt))
                            ) {
                                var s = a.getTransitionDurationFromElement(i);
                                e(i)
                                    .one(a.TRANSITION_END, r)
                                    .emulateTransitionEnd(s);
                            } else r();
                            this._hoverState = '';
                        }
                    }),
                    (i.update = function () {
                        null !== this._popper && this._popper.scheduleUpdate();
                    }),
                    (i.isWithContent = function () {
                        return Boolean(this.getTitle());
                    }),
                    (i.addAttachmentClass = function (t) {
                        e(this.getTipElement()).addClass(jt + '-' + t);
                    }),
                    (i.getTipElement = function () {
                        return (
                            (this.tip = this.tip || e(this.config.template)[0]),
                            this.tip
                        );
                    }),
                    (i.setContent = function () {
                        var t = this.getTipElement();
                        this.setElementContent(
                            e(t.querySelectorAll('.tooltip-inner')),
                            this.getTitle()
                        ),
                            e(t).removeClass(Wt + ' ' + Ut);
                    }),
                    (i.setElementContent = function (t, n) {
                        'object' != _typeof(n) || (!n.nodeType && !n.jquery)
                            ? this.config.html
                                ? (this.config.sanitize &&
                                      (n = Dt(
                                          n,
                                          this.config.whiteList,
                                          this.config.sanitizeFn
                                      )),
                                  t.html(n))
                                : t.text(n)
                            : this.config.html
                            ? e(n).parent().is(t) || t.empty().append(n)
                            : t.text(e(n).text());
                    }),
                    (i.getTitle = function () {
                        var t = this.element.getAttribute(
                            'data-original-title'
                        );
                        return (
                            t ||
                                (t =
                                    'function' == typeof this.config.title
                                        ? this.config.title.call(this.element)
                                        : this.config.title),
                            t
                        );
                    }),
                    (i._getOffset = function () {
                        var t = this,
                            e = {};
                        return (
                            'function' == typeof this.config.offset
                                ? (e.fn = function (e) {
                                      return (
                                          (e.offsets = r(
                                              {},
                                              e.offsets,
                                              t.config.offset(
                                                  e.offsets,
                                                  t.element
                                              ) || {}
                                          )),
                                          e
                                      );
                                  })
                                : (e.offset = this.config.offset),
                            e
                        );
                    }),
                    (i._getContainer = function () {
                        return !1 === this.config.container
                            ? document.body
                            : a.isElement(this.config.container)
                            ? e(this.config.container)
                            : e(document).find(this.config.container);
                    }),
                    (i._getAttachment = function (t) {
                        return Ht[t.toUpperCase()];
                    }),
                    (i._setListeners = function () {
                        var t = this;
                        this.config.trigger.split(' ').forEach(function (n) {
                            if ('click' === n)
                                e(t.element).on(
                                    t.constructor.Event.CLICK,
                                    t.config.selector,
                                    function (e) {
                                        return t.toggle(e);
                                    }
                                );
                            else if ('manual' !== n) {
                                var i =
                                        n === Ft
                                            ? t.constructor.Event.MOUSEENTER
                                            : t.constructor.Event.FOCUSIN,
                                    o =
                                        n === Ft
                                            ? t.constructor.Event.MOUSELEAVE
                                            : t.constructor.Event.FOCUSOUT;
                                e(t.element)
                                    .on(i, t.config.selector, function (e) {
                                        return t._enter(e);
                                    })
                                    .on(o, t.config.selector, function (e) {
                                        return t._leave(e);
                                    });
                            }
                        }),
                            e(this.element)
                                .closest('.modal')
                                .on('hide.bs.modal', function () {
                                    t.element && t.hide();
                                }),
                            this.config.selector
                                ? (this.config = r({}, this.config, {
                                      trigger: 'manual',
                                      selector: ''
                                  }))
                                : this._fixTitle();
                    }),
                    (i._fixTitle = function () {
                        var t = _typeof(
                            this.element.getAttribute('data-original-title')
                        );
                        (this.element.getAttribute('title') ||
                            'string' !== t) &&
                            (this.element.setAttribute(
                                'data-original-title',
                                this.element.getAttribute('title') || ''
                            ),
                            this.element.setAttribute('title', ''));
                    }),
                    (i._enter = function (t, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || e(t.currentTarget).data(i)) ||
                            ((n = new this.constructor(
                                t.currentTarget,
                                this._getDelegateConfig()
                            )),
                            e(t.currentTarget).data(i, n)),
                            t &&
                                (n._activeTrigger[
                                    'focusin' === t.type ? Vt : Ft
                                ] = !0),
                            e(n.getTipElement()).hasClass(Ut) ||
                            n._hoverState === Rt
                                ? (n._hoverState = Rt)
                                : (clearTimeout(n._timeout),
                                  (n._hoverState = Rt),
                                  n.config.delay && n.config.delay.show
                                      ? (n._timeout = setTimeout(function () {
                                            n._hoverState === Rt && n.show();
                                        }, n.config.delay.show))
                                      : n.show());
                    }),
                    (i._leave = function (t, n) {
                        var i = this.constructor.DATA_KEY;
                        (n = n || e(t.currentTarget).data(i)) ||
                            ((n = new this.constructor(
                                t.currentTarget,
                                this._getDelegateConfig()
                            )),
                            e(t.currentTarget).data(i, n)),
                            t &&
                                (n._activeTrigger[
                                    'focusout' === t.type ? Vt : Ft
                                ] = !1),
                            n._isWithActiveTrigger() ||
                                (clearTimeout(n._timeout),
                                (n._hoverState = zt),
                                n.config.delay && n.config.delay.hide
                                    ? (n._timeout = setTimeout(function () {
                                          n._hoverState === zt && n.hide();
                                      }, n.config.delay.hide))
                                    : n.hide());
                    }),
                    (i._isWithActiveTrigger = function () {
                        for (var t in this._activeTrigger)
                            if (this._activeTrigger[t]) return !0;
                        return !1;
                    }),
                    (i._getConfig = function (t) {
                        var n = e(this.element).data();
                        return (
                            Object.keys(n).forEach(function (t) {
                                -1 !== $t.indexOf(t) && delete n[t];
                            }),
                            'number' ==
                                typeof (t = r(
                                    {},
                                    this.constructor.Default,
                                    n,
                                    'object' == _typeof(t) && t ? t : {}
                                )).delay &&
                                (t.delay = {show: t.delay, hide: t.delay}),
                            'number' == typeof t.title &&
                                (t.title = t.title.toString()),
                            'number' == typeof t.content &&
                                (t.content = t.content.toString()),
                            a.typeCheckConfig(
                                It,
                                t,
                                this.constructor.DefaultType
                            ),
                            t.sanitize &&
                                (t.template = Dt(
                                    t.template,
                                    t.whiteList,
                                    t.sanitizeFn
                                )),
                            t
                        );
                    }),
                    (i._getDelegateConfig = function () {
                        var t = {};
                        if (this.config)
                            for (var e in this.config)
                                this.constructor.Default[e] !==
                                    this.config[e] && (t[e] = this.config[e]);
                        return t;
                    }),
                    (i._cleanTipClass = function () {
                        var t = e(this.getTipElement()),
                            n = t.attr('class').match(Pt);
                        null !== n && n.length && t.removeClass(n.join(''));
                    }),
                    (i._handlePopperPlacementChange = function (t) {
                        var e = t.instance;
                        (this.tip = e.popper),
                            this._cleanTipClass(),
                            this.addAttachmentClass(
                                this._getAttachment(t.placement)
                            );
                    }),
                    (i._fixTransition = function () {
                        var t = this.getTipElement(),
                            n = this.config.animation;
                        null === t.getAttribute('x-placement') &&
                            (e(t).removeClass(Wt),
                            (this.config.animation = !1),
                            this.hide(),
                            this.show(),
                            (this.config.animation = n));
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this).data(Ot),
                                o = 'object' == _typeof(n) && n;
                            if (
                                (i || !/dispose|hide/.test(n)) &&
                                (i ||
                                    ((i = new t(this, o)), e(this).data(Ot, i)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === i[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                i[n]();
                            }
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return Mt;
                            }
                        },
                        {
                            key: 'NAME',
                            get: function () {
                                return It;
                            }
                        },
                        {
                            key: 'DATA_KEY',
                            get: function () {
                                return Ot;
                            }
                        },
                        {
                            key: 'Event',
                            get: function () {
                                return qt;
                            }
                        },
                        {
                            key: 'EVENT_KEY',
                            get: function () {
                                return Nt;
                            }
                        },
                        {
                            key: 'DefaultType',
                            get: function () {
                                return Bt;
                            }
                        }
                    ]),
                    t
                );
            })();
        (e.fn[It] = Yt._jQueryInterface),
            (e.fn[It].Constructor = Yt),
            (e.fn[It].noConflict = function () {
                return (e.fn[It] = Lt), Yt._jQueryInterface;
            });
        var Qt = 'popover',
            Xt = 'bs.popover',
            Kt = '.' + Xt,
            Zt = e.fn[Qt],
            Gt = 'bs-popover',
            Jt = new RegExp('(^|\\s)' + Gt + '\\S+', 'g'),
            te = r({}, Yt.Default, {
                placement: 'right',
                trigger: 'click',
                content: '',
                template:
                    '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
            }),
            ee = r({}, Yt.DefaultType, {content: '(string|element|function)'}),
            ne = {
                HIDE: 'hide' + Kt,
                HIDDEN: 'hidden' + Kt,
                SHOW: 'show' + Kt,
                SHOWN: 'shown' + Kt,
                INSERTED: 'inserted' + Kt,
                CLICK: 'click' + Kt,
                FOCUSIN: 'focusin' + Kt,
                FOCUSOUT: 'focusout' + Kt,
                MOUSEENTER: 'mouseenter' + Kt,
                MOUSELEAVE: 'mouseleave' + Kt
            },
            ie = (function (t) {
                var n, i;
                function r() {
                    return t.apply(this, arguments) || this;
                }
                (i = t),
                    ((n = r).prototype = Object.create(i.prototype)),
                    ((n.prototype.constructor = n).__proto__ = i);
                var s = r.prototype;
                return (
                    (s.isWithContent = function () {
                        return this.getTitle() || this._getContent();
                    }),
                    (s.addAttachmentClass = function (t) {
                        e(this.getTipElement()).addClass(Gt + '-' + t);
                    }),
                    (s.getTipElement = function () {
                        return (
                            (this.tip = this.tip || e(this.config.template)[0]),
                            this.tip
                        );
                    }),
                    (s.setContent = function () {
                        var t = e(this.getTipElement());
                        this.setElementContent(
                            t.find('.popover-header'),
                            this.getTitle()
                        );
                        var n = this._getContent();
                        'function' == typeof n && (n = n.call(this.element)),
                            this.setElementContent(t.find('.popover-body'), n),
                            t.removeClass('fade show');
                    }),
                    (s._getContent = function () {
                        return (
                            this.element.getAttribute('data-content') ||
                            this.config.content
                        );
                    }),
                    (s._cleanTipClass = function () {
                        var t = e(this.getTipElement()),
                            n = t.attr('class').match(Jt);
                        null !== n && 0 < n.length && t.removeClass(n.join(''));
                    }),
                    (r._jQueryInterface = function (t) {
                        return this.each(function () {
                            var n = e(this).data(Xt),
                                i = 'object' == _typeof(t) ? t : null;
                            if (
                                (n || !/dispose|hide/.test(t)) &&
                                (n ||
                                    ((n = new r(this, i)), e(this).data(Xt, n)),
                                'string' == typeof t)
                            ) {
                                if (void 0 === n[t])
                                    throw new TypeError(
                                        'No method named "' + t + '"'
                                    );
                                n[t]();
                            }
                        });
                    }),
                    o(r, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return te;
                            }
                        },
                        {
                            key: 'NAME',
                            get: function () {
                                return Qt;
                            }
                        },
                        {
                            key: 'DATA_KEY',
                            get: function () {
                                return Xt;
                            }
                        },
                        {
                            key: 'Event',
                            get: function () {
                                return ne;
                            }
                        },
                        {
                            key: 'EVENT_KEY',
                            get: function () {
                                return Kt;
                            }
                        },
                        {
                            key: 'DefaultType',
                            get: function () {
                                return ee;
                            }
                        }
                    ]),
                    r
                );
            })(Yt);
        (e.fn[Qt] = ie._jQueryInterface),
            (e.fn[Qt].Constructor = ie),
            (e.fn[Qt].noConflict = function () {
                return (e.fn[Qt] = Zt), ie._jQueryInterface;
            });
        var oe = 'scrollspy',
            re = 'bs.scrollspy',
            se = '.' + re,
            ae = e.fn[oe],
            le = {offset: 10, method: 'auto', target: ''},
            ce = {
                offset: 'number',
                method: 'string',
                target: '(string|element)'
            },
            ue = {
                ACTIVATE: 'activate' + se,
                SCROLL: 'scroll' + se,
                LOAD_DATA_API: 'load' + se + '.data-api'
            },
            de = 'active',
            he = '.nav, .list-group',
            fe = '.nav-link',
            pe = '.list-group-item',
            me = 'position',
            ge = (function () {
                function t(t, n) {
                    var i = this;
                    (this._element = t),
                        (this._scrollElement =
                            'BODY' === t.tagName ? window : t),
                        (this._config = this._getConfig(n)),
                        (this._selector =
                            this._config.target +
                            ' ' +
                            fe +
                            ',' +
                            this._config.target +
                            ' ' +
                            pe +
                            ',' +
                            this._config.target +
                            ' .dropdown-item'),
                        (this._offsets = []),
                        (this._targets = []),
                        (this._activeTarget = null),
                        (this._scrollHeight = 0),
                        e(this._scrollElement).on(ue.SCROLL, function (t) {
                            return i._process(t);
                        }),
                        this.refresh(),
                        this._process();
                }
                var n = t.prototype;
                return (
                    (n.refresh = function () {
                        var t = this,
                            n =
                                this._scrollElement ===
                                this._scrollElement.window
                                    ? 'offset'
                                    : me,
                            i =
                                'auto' === this._config.method
                                    ? n
                                    : this._config.method,
                            o = i === me ? this._getScrollTop() : 0;
                        (this._offsets = []),
                            (this._targets = []),
                            (this._scrollHeight = this._getScrollHeight()),
                            [].slice
                                .call(document.querySelectorAll(this._selector))
                                .map(function (t) {
                                    var n,
                                        r = a.getSelectorFromElement(t);
                                    if (
                                        (r && (n = document.querySelector(r)),
                                        n)
                                    ) {
                                        var s = n.getBoundingClientRect();
                                        if (s.width || s.height)
                                            return [e(n)[i]().top + o, r];
                                    }
                                    return null;
                                })
                                .filter(function (t) {
                                    return t;
                                })
                                .sort(function (t, e) {
                                    return t[0] - e[0];
                                })
                                .forEach(function (e) {
                                    t._offsets.push(e[0]),
                                        t._targets.push(e[1]);
                                });
                    }),
                    (n.dispose = function () {
                        e.removeData(this._element, re),
                            e(this._scrollElement).off(se),
                            (this._element = null),
                            (this._scrollElement = null),
                            (this._config = null),
                            (this._selector = null),
                            (this._offsets = null),
                            (this._targets = null),
                            (this._activeTarget = null),
                            (this._scrollHeight = null);
                    }),
                    (n._getConfig = function (t) {
                        if (
                            'string' !=
                            typeof (t = r(
                                {},
                                le,
                                'object' == _typeof(t) && t ? t : {}
                            )).target
                        ) {
                            var n = e(t.target).attr('id');
                            n ||
                                ((n = a.getUID(oe)), e(t.target).attr('id', n)),
                                (t.target = '#' + n);
                        }
                        return a.typeCheckConfig(oe, t, ce), t;
                    }),
                    (n._getScrollTop = function () {
                        return this._scrollElement === window
                            ? this._scrollElement.pageYOffset
                            : this._scrollElement.scrollTop;
                    }),
                    (n._getScrollHeight = function () {
                        return (
                            this._scrollElement.scrollHeight ||
                            Math.max(
                                document.body.scrollHeight,
                                document.documentElement.scrollHeight
                            )
                        );
                    }),
                    (n._getOffsetHeight = function () {
                        return this._scrollElement === window
                            ? window.innerHeight
                            : this._scrollElement.getBoundingClientRect()
                                  .height;
                    }),
                    (n._process = function () {
                        var t = this._getScrollTop() + this._config.offset,
                            e = this._getScrollHeight(),
                            n =
                                this._config.offset +
                                e -
                                this._getOffsetHeight();
                        if (
                            (this._scrollHeight !== e && this.refresh(), n <= t)
                        ) {
                            var i = this._targets[this._targets.length - 1];
                            this._activeTarget !== i && this._activate(i);
                        } else {
                            if (
                                this._activeTarget &&
                                t < this._offsets[0] &&
                                0 < this._offsets[0]
                            )
                                return (
                                    (this._activeTarget = null),
                                    void this._clear()
                                );
                            for (var o = this._offsets.length; o--; )
                                this._activeTarget !== this._targets[o] &&
                                    t >= this._offsets[o] &&
                                    (void 0 === this._offsets[o + 1] ||
                                        t < this._offsets[o + 1]) &&
                                    this._activate(this._targets[o]);
                        }
                    }),
                    (n._activate = function (t) {
                        (this._activeTarget = t), this._clear();
                        var n = this._selector.split(',').map(function (e) {
                                return (
                                    e +
                                    '[data-target="' +
                                    t +
                                    '"],' +
                                    e +
                                    '[href="' +
                                    t +
                                    '"]'
                                );
                            }),
                            i = e(
                                [].slice.call(
                                    document.querySelectorAll(n.join(','))
                                )
                            );
                        i.hasClass('dropdown-item')
                            ? (i
                                  .closest('.dropdown')
                                  .find('.dropdown-toggle')
                                  .addClass(de),
                              i.addClass(de))
                            : (i.addClass(de),
                              i
                                  .parents(he)
                                  .prev(fe + ', ' + pe)
                                  .addClass(de),
                              i
                                  .parents(he)
                                  .prev('.nav-item')
                                  .children(fe)
                                  .addClass(de)),
                            e(this._scrollElement).trigger(ue.ACTIVATE, {
                                relatedTarget: t
                            });
                    }),
                    (n._clear = function () {
                        [].slice
                            .call(document.querySelectorAll(this._selector))
                            .filter(function (t) {
                                return t.classList.contains(de);
                            })
                            .forEach(function (t) {
                                return t.classList.remove(de);
                            });
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this).data(re);
                            if (
                                (i ||
                                    ((i = new t(
                                        this,
                                        'object' == _typeof(n) && n
                                    )),
                                    e(this).data(re, i)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === i[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                i[n]();
                            }
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return le;
                            }
                        }
                    ]),
                    t
                );
            })();
        e(window).on(ue.LOAD_DATA_API, function () {
            for (
                var t = [].slice.call(
                        document.querySelectorAll('[data-spy="scroll"]')
                    ),
                    n = t.length;
                n--;

            ) {
                var i = e(t[n]);
                ge._jQueryInterface.call(i, i.data());
            }
        }),
            (e.fn[oe] = ge._jQueryInterface),
            (e.fn[oe].Constructor = ge),
            (e.fn[oe].noConflict = function () {
                return (e.fn[oe] = ae), ge._jQueryInterface;
            });
        var ve = 'bs.tab',
            we = '.' + ve,
            ye = e.fn.tab,
            be = {
                HIDE: 'hide' + we,
                HIDDEN: 'hidden' + we,
                SHOW: 'show' + we,
                SHOWN: 'shown' + we,
                CLICK_DATA_API: 'click' + we + '.data-api'
            },
            _e = 'active',
            xe = 'fade',
            Ce = 'show',
            ke = '.active',
            Te = '> li > .active',
            Ee = (function () {
                function t(t) {
                    this._element = t;
                }
                var n = t.prototype;
                return (
                    (n.show = function () {
                        var t = this;
                        if (
                            !(
                                (this._element.parentNode &&
                                    this._element.parentNode.nodeType ===
                                        Node.ELEMENT_NODE &&
                                    e(this._element).hasClass(_e)) ||
                                e(this._element).hasClass('disabled')
                            )
                        ) {
                            var n,
                                i,
                                o = e(this._element).closest(
                                    '.nav, .list-group'
                                )[0],
                                r = a.getSelectorFromElement(this._element);
                            if (o) {
                                var s =
                                    'UL' === o.nodeName || 'OL' === o.nodeName
                                        ? Te
                                        : ke;
                                i = (i = e.makeArray(e(o).find(s)))[
                                    i.length - 1
                                ];
                            }
                            var l = e.Event(be.HIDE, {
                                    relatedTarget: this._element
                                }),
                                c = e.Event(be.SHOW, {relatedTarget: i});
                            if (
                                (i && e(i).trigger(l),
                                e(this._element).trigger(c),
                                !c.isDefaultPrevented() &&
                                    !l.isDefaultPrevented())
                            ) {
                                r && (n = document.querySelector(r)),
                                    this._activate(this._element, o);
                                var u = function () {
                                    var n = e.Event(be.HIDDEN, {
                                            relatedTarget: t._element
                                        }),
                                        o = e.Event(be.SHOWN, {
                                            relatedTarget: i
                                        });
                                    e(i).trigger(n), e(t._element).trigger(o);
                                };
                                n ? this._activate(n, n.parentNode, u) : u();
                            }
                        }
                    }),
                    (n.dispose = function () {
                        e.removeData(this._element, ve), (this._element = null);
                    }),
                    (n._activate = function (t, n, i) {
                        var o = this,
                            r = (
                                !n ||
                                ('UL' !== n.nodeName && 'OL' !== n.nodeName)
                                    ? e(n).children(ke)
                                    : e(n).find(Te)
                            )[0],
                            s = i && r && e(r).hasClass(xe),
                            l = function () {
                                return o._transitionComplete(t, r, i);
                            };
                        if (r && s) {
                            var c = a.getTransitionDurationFromElement(r);
                            e(r)
                                .removeClass(Ce)
                                .one(a.TRANSITION_END, l)
                                .emulateTransitionEnd(c);
                        } else l();
                    }),
                    (n._transitionComplete = function (t, n, i) {
                        if (n) {
                            e(n).removeClass(_e);
                            var o = e(n.parentNode).find(
                                '> .dropdown-menu .active'
                            )[0];
                            o && e(o).removeClass(_e),
                                'tab' === n.getAttribute('role') &&
                                    n.setAttribute('aria-selected', !1);
                        }
                        if (
                            (e(t).addClass(_e),
                            'tab' === t.getAttribute('role') &&
                                t.setAttribute('aria-selected', !0),
                            a.reflow(t),
                            t.classList.contains(xe) && t.classList.add(Ce),
                            t.parentNode &&
                                e(t.parentNode).hasClass('dropdown-menu'))
                        ) {
                            var r = e(t).closest('.dropdown')[0];
                            if (r) {
                                var s = [].slice.call(
                                    r.querySelectorAll('.dropdown-toggle')
                                );
                                e(s).addClass(_e);
                            }
                            t.setAttribute('aria-expanded', !0);
                        }
                        i && i();
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this),
                                o = i.data(ve);
                            if (
                                (o || ((o = new t(this)), i.data(ve, o)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === o[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                o[n]();
                            }
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        }
                    ]),
                    t
                );
            })();
        e(document).on(
            be.CLICK_DATA_API,
            '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
            function (t) {
                t.preventDefault(), Ee._jQueryInterface.call(e(this), 'show');
            }
        ),
            (e.fn.tab = Ee._jQueryInterface),
            (e.fn.tab.Constructor = Ee),
            (e.fn.tab.noConflict = function () {
                return (e.fn.tab = ye), Ee._jQueryInterface;
            });
        var Se = 'toast',
            Ae = 'bs.toast',
            De = '.' + Ae,
            Ie = e.fn[Se],
            Oe = {
                CLICK_DISMISS: 'click.dismiss' + De,
                HIDE: 'hide' + De,
                HIDDEN: 'hidden' + De,
                SHOW: 'show' + De,
                SHOWN: 'shown' + De
            },
            Ne = 'hide',
            Le = 'show',
            je = 'showing',
            Pe = {animation: 'boolean', autohide: 'boolean', delay: 'number'},
            $e = {animation: !0, autohide: !0, delay: 500},
            Be = (function () {
                function t(t, e) {
                    (this._element = t),
                        (this._config = this._getConfig(e)),
                        (this._timeout = null),
                        this._setListeners();
                }
                var n = t.prototype;
                return (
                    (n.show = function () {
                        var t = this;
                        e(this._element).trigger(Oe.SHOW),
                            this._config.animation &&
                                this._element.classList.add('fade');
                        var n = function () {
                            t._element.classList.remove(je),
                                t._element.classList.add(Le),
                                e(t._element).trigger(Oe.SHOWN),
                                t._config.autohide && t.hide();
                        };
                        if (
                            (this._element.classList.remove(Ne),
                            this._element.classList.add(je),
                            this._config.animation)
                        ) {
                            var i = a.getTransitionDurationFromElement(
                                this._element
                            );
                            e(this._element)
                                .one(a.TRANSITION_END, n)
                                .emulateTransitionEnd(i);
                        } else n();
                    }),
                    (n.hide = function (t) {
                        var n = this;
                        this._element.classList.contains(Le) &&
                            (e(this._element).trigger(Oe.HIDE),
                            t
                                ? this._close()
                                : (this._timeout = setTimeout(function () {
                                      n._close();
                                  }, this._config.delay)));
                    }),
                    (n.dispose = function () {
                        clearTimeout(this._timeout),
                            (this._timeout = null),
                            this._element.classList.contains(Le) &&
                                this._element.classList.remove(Le),
                            e(this._element).off(Oe.CLICK_DISMISS),
                            e.removeData(this._element, Ae),
                            (this._element = null),
                            (this._config = null);
                    }),
                    (n._getConfig = function (t) {
                        return (
                            (t = r(
                                {},
                                $e,
                                e(this._element).data(),
                                'object' == _typeof(t) && t ? t : {}
                            )),
                            a.typeCheckConfig(
                                Se,
                                t,
                                this.constructor.DefaultType
                            ),
                            t
                        );
                    }),
                    (n._setListeners = function () {
                        var t = this;
                        e(this._element).on(
                            Oe.CLICK_DISMISS,
                            '[data-dismiss="toast"]',
                            function () {
                                return t.hide(!0);
                            }
                        );
                    }),
                    (n._close = function () {
                        var t = this,
                            n = function () {
                                t._element.classList.add(Ne),
                                    e(t._element).trigger(Oe.HIDDEN);
                            };
                        if (
                            (this._element.classList.remove(Le),
                            this._config.animation)
                        ) {
                            var i = a.getTransitionDurationFromElement(
                                this._element
                            );
                            e(this._element)
                                .one(a.TRANSITION_END, n)
                                .emulateTransitionEnd(i);
                        } else n();
                    }),
                    (t._jQueryInterface = function (n) {
                        return this.each(function () {
                            var i = e(this),
                                o = i.data(Ae);
                            if (
                                (o ||
                                    ((o = new t(
                                        this,
                                        'object' == _typeof(n) && n
                                    )),
                                    i.data(Ae, o)),
                                'string' == typeof n)
                            ) {
                                if (void 0 === o[n])
                                    throw new TypeError(
                                        'No method named "' + n + '"'
                                    );
                                o[n](this);
                            }
                        });
                    }),
                    o(t, null, [
                        {
                            key: 'VERSION',
                            get: function () {
                                return '4.3.1';
                            }
                        },
                        {
                            key: 'DefaultType',
                            get: function () {
                                return Pe;
                            }
                        },
                        {
                            key: 'Default',
                            get: function () {
                                return $e;
                            }
                        }
                    ]),
                    t
                );
            })();
        (e.fn[Se] = Be._jQueryInterface),
            (e.fn[Se].Constructor = Be),
            (e.fn[Se].noConflict = function () {
                return (e.fn[Se] = Ie), Be._jQueryInterface;
            }),
            (function () {
                if (void 0 === e)
                    throw new TypeError(
                        "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
                    );
                var t = e.fn.jquery.split(' ')[0].split('.');
                if (
                    (t[0] < 2 && t[1] < 9) ||
                    (1 === t[0] && 9 === t[1] && t[2] < 1) ||
                    4 <= t[0]
                )
                    throw new Error(
                        "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
                    );
            })(),
            (t.Util = a),
            (t.Alert = f),
            (t.Button = C),
            (t.Carousel = B),
            (t.Collapse = Z),
            (t.Dropdown = ht),
            (t.Modal = Tt),
            (t.Popover = ie),
            (t.Scrollspy = ge),
            (t.Tab = Ee),
            (t.Toast = Be),
            (t.Tooltip = Yt),
            Object.defineProperty(t, '__esModule', {value: !0});
    }),
    (function (t, e, n, i) {
        function o(e, n) {
            (this.settings = null),
                (this.options = t.extend({}, o.Defaults, n)),
                (this.$element = t(e)),
                (this._handlers = {}),
                (this._plugins = {}),
                (this._supress = {}),
                (this._current = null),
                (this._speed = null),
                (this._coordinates = []),
                (this._breakpoint = null),
                (this._width = null),
                (this._items = []),
                (this._clones = []),
                (this._mergers = []),
                (this._widths = []),
                (this._invalidated = {}),
                (this._pipe = []),
                (this._drag = {
                    time: null,
                    target: null,
                    pointer: null,
                    stage: {start: null, current: null},
                    direction: null
                }),
                (this._states = {
                    current: {},
                    tags: {
                        initializing: ['busy'],
                        animating: ['busy'],
                        dragging: ['interacting']
                    }
                }),
                t.each(
                    ['onResize', 'onThrottledResize'],
                    t.proxy(function (e, n) {
                        this._handlers[n] = t.proxy(this[n], this);
                    }, this)
                ),
                t.each(
                    o.Plugins,
                    t.proxy(function (t, e) {
                        this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] =
                            new e(this);
                    }, this)
                ),
                t.each(
                    o.Workers,
                    t.proxy(function (e, n) {
                        this._pipe.push({
                            filter: n.filter,
                            run: t.proxy(n.run, this)
                        });
                    }, this)
                ),
                this.setup(),
                this.initialize();
        }
        (o.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            checkVisibility: !0,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            fallbackEasing: 'swing',
            slideTransition: '',
            info: !1,
            nestedItemSelector: !1,
            itemElement: 'div',
            stageElement: 'div',
            refreshClass: 'owl-refresh',
            loadedClass: 'owl-loaded',
            loadingClass: 'owl-loading',
            rtlClass: 'owl-rtl',
            responsiveClass: 'owl-responsive',
            dragClass: 'owl-drag',
            itemClass: 'owl-item',
            stageClass: 'owl-stage',
            stageOuterClass: 'owl-stage-outer',
            grabClass: 'owl-grab'
        }),
            (o.Width = {Default: 'default', Inner: 'inner', Outer: 'outer'}),
            (o.Type = {Event: 'event', State: 'state'}),
            (o.Plugins = {}),
            (o.Workers = [
                {
                    filter: ['width', 'settings'],
                    run: function () {
                        this._width = this.$element.width();
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (t) {
                        t.current =
                            this._items &&
                            this._items[this.relative(this._current)];
                    }
                },
                {
                    filter: ['items', 'settings'],
                    run: function () {
                        this.$stage.children('.cloned').remove();
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (t) {
                        var e = this.settings.margin || '',
                            n = !this.settings.autoWidth,
                            i = this.settings.rtl,
                            o = {
                                width: 'auto',
                                'margin-left': i ? e : '',
                                'margin-right': i ? '' : e
                            };
                        !n && this.$stage.children().css(o), (t.css = o);
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (t) {
                        var e =
                                (this.width() / this.settings.items).toFixed(
                                    3
                                ) - this.settings.margin,
                            n = null,
                            i = this._items.length,
                            o = !this.settings.autoWidth,
                            r = [];
                        for (t.items = {merge: !1, width: e}; i--; )
                            (n = this._mergers[i]),
                                (n =
                                    (this.settings.mergeFit &&
                                        Math.min(n, this.settings.items)) ||
                                    n),
                                (t.items.merge = n > 1 || t.items.merge),
                                (r[i] = o ? e * n : this._items[i].width());
                        this._widths = r;
                    }
                },
                {
                    filter: ['items', 'settings'],
                    run: function () {
                        var e = [],
                            n = this._items,
                            i = this.settings,
                            o = Math.max(2 * i.items, 4),
                            r = 2 * Math.ceil(n.length / 2),
                            s =
                                i.loop && n.length
                                    ? i.rewind
                                        ? o
                                        : Math.max(o, r)
                                    : 0,
                            a = '',
                            l = '';
                        for (s /= 2; s > 0; )
                            e.push(this.normalize(e.length / 2, !0)),
                                (a += n[e[e.length - 1]][0].outerHTML),
                                e.push(
                                    this.normalize(
                                        n.length - 1 - (e.length - 1) / 2,
                                        !0
                                    )
                                ),
                                (l = n[e[e.length - 1]][0].outerHTML + l),
                                (s -= 1);
                        (this._clones = e),
                            t(a).addClass('cloned').appendTo(this.$stage),
                            t(l).addClass('cloned').prependTo(this.$stage);
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function () {
                        for (
                            var t = this.settings.rtl ? 1 : -1,
                                e = this._clones.length + this._items.length,
                                n = -1,
                                i = 0,
                                o = 0,
                                r = [];
                            ++n < e;

                        )
                            (i = r[n - 1] || 0),
                                (o =
                                    this._widths[this.relative(n)] +
                                    this.settings.margin),
                                r.push(i + o * t);
                        this._coordinates = r;
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function () {
                        var t = this.settings.stagePadding,
                            e = this._coordinates,
                            n = {
                                width:
                                    Math.ceil(Math.abs(e[e.length - 1])) +
                                    2 * t,
                                'padding-left': t || '',
                                'padding-right': t || ''
                            };
                        this.$stage.css(n);
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (t) {
                        var e = this._coordinates.length,
                            n = !this.settings.autoWidth,
                            i = this.$stage.children();
                        if (n && t.items.merge)
                            for (; e--; )
                                (t.css.width = this._widths[this.relative(e)]),
                                    i.eq(e).css(t.css);
                        else n && ((t.css.width = t.items.width), i.css(t.css));
                    }
                },
                {
                    filter: ['items'],
                    run: function () {
                        this._coordinates.length < 1 &&
                            this.$stage.removeAttr('style');
                    }
                },
                {
                    filter: ['width', 'items', 'settings'],
                    run: function (t) {
                        (t.current = t.current
                            ? this.$stage.children().index(t.current)
                            : 0),
                            (t.current = Math.max(
                                this.minimum(),
                                Math.min(this.maximum(), t.current)
                            )),
                            this.reset(t.current);
                    }
                },
                {
                    filter: ['position'],
                    run: function () {
                        this.animate(this.coordinates(this._current));
                    }
                },
                {
                    filter: ['width', 'position', 'items', 'settings'],
                    run: function () {
                        var t,
                            e,
                            n,
                            i,
                            o = this.settings.rtl ? 1 : -1,
                            r = 2 * this.settings.stagePadding,
                            s = this.coordinates(this.current()) + r,
                            a = s + this.width() * o,
                            l = [];
                        for (n = 0, i = this._coordinates.length; n < i; n++)
                            (t = this._coordinates[n - 1] || 0),
                                (e = Math.abs(this._coordinates[n]) + r * o),
                                ((this.op(t, '<=', s) && this.op(t, '>', a)) ||
                                    (this.op(e, '<', s) &&
                                        this.op(e, '>', a))) &&
                                    l.push(n);
                        this.$stage.children('.active').removeClass('active'),
                            this.$stage
                                .children(':eq(' + l.join('), :eq(') + ')')
                                .addClass('active'),
                            this.$stage
                                .children('.center')
                                .removeClass('center'),
                            this.settings.center &&
                                this.$stage
                                    .children()
                                    .eq(this.current())
                                    .addClass('center');
                    }
                }
            ]),
            (o.prototype.initializeStage = function () {
                (this.$stage = this.$element.find(
                    '.' + this.settings.stageClass
                )),
                    this.$stage.length ||
                        (this.$element.addClass(this.options.loadingClass),
                        (this.$stage = t(
                            '<' + this.settings.stageElement + '>',
                            {class: this.settings.stageClass}
                        ).wrap(
                            t('<div/>', {class: this.settings.stageOuterClass})
                        )),
                        this.$element.append(this.$stage.parent()));
            }),
            (o.prototype.initializeItems = function () {
                var e = this.$element.find('.owl-item');
                if (e.length)
                    return (
                        (this._items = e.get().map(function (e) {
                            return t(e);
                        })),
                        (this._mergers = this._items.map(function () {
                            return 1;
                        })),
                        void this.refresh()
                    );
                this.replace(
                    this.$element.children().not(this.$stage.parent())
                ),
                    this.isVisible()
                        ? this.refresh()
                        : this.invalidate('width'),
                    this.$element
                        .removeClass(this.options.loadingClass)
                        .addClass(this.options.loadedClass);
            }),
            (o.prototype.initialize = function () {
                var t, e, n;
                (this.enter('initializing'),
                this.trigger('initialize'),
                this.$element.toggleClass(
                    this.settings.rtlClass,
                    this.settings.rtl
                ),
                this.settings.autoWidth && !this.is('pre-loading')) &&
                    ((t = this.$element.find('img')),
                    (e = this.settings.nestedItemSelector
                        ? '.' + this.settings.nestedItemSelector
                        : i),
                    (n = this.$element.children(e).width()),
                    t.length && n <= 0 && this.preloadAutoWidthImages(t));
                this.initializeStage(),
                    this.initializeItems(),
                    this.registerEventHandlers(),
                    this.leave('initializing'),
                    this.trigger('initialized');
            }),
            (o.prototype.isVisible = function () {
                return (
                    !this.settings.checkVisibility ||
                    this.$element.is(':visible')
                );
            }),
            (o.prototype.setup = function () {
                var e = this.viewport(),
                    n = this.options.responsive,
                    i = -1,
                    o = null;
                n
                    ? (t.each(n, function (t) {
                          t <= e && t > i && (i = Number(t));
                      }),
                      'function' ==
                          typeof (o = t.extend({}, this.options, n[i]))
                              .stagePadding &&
                          (o.stagePadding = o.stagePadding()),
                      delete o.responsive,
                      o.responsiveClass &&
                          this.$element.attr(
                              'class',
                              this.$element
                                  .attr('class')
                                  .replace(
                                      new RegExp(
                                          '(' +
                                              this.options.responsiveClass +
                                              '-)\\S+\\s',
                                          'g'
                                      ),
                                      '$1' + i
                                  )
                          ))
                    : (o = t.extend({}, this.options)),
                    this.trigger('change', {
                        property: {name: 'settings', value: o}
                    }),
                    (this._breakpoint = i),
                    (this.settings = o),
                    this.invalidate('settings'),
                    this.trigger('changed', {
                        property: {name: 'settings', value: this.settings}
                    });
            }),
            (o.prototype.optionsLogic = function () {
                this.settings.autoWidth &&
                    ((this.settings.stagePadding = !1),
                    (this.settings.merge = !1));
            }),
            (o.prototype.prepare = function (e) {
                var n = this.trigger('prepare', {content: e});
                return (
                    n.data ||
                        (n.data = t('<' + this.settings.itemElement + '/>')
                            .addClass(this.options.itemClass)
                            .append(e)),
                    this.trigger('prepared', {content: n.data}),
                    n.data
                );
            }),
            (o.prototype.update = function () {
                for (
                    var e = 0,
                        n = this._pipe.length,
                        i = t.proxy(function (t) {
                            return this[t];
                        }, this._invalidated),
                        o = {};
                    e < n;

                )
                    (this._invalidated.all ||
                        t.grep(this._pipe[e].filter, i).length > 0) &&
                        this._pipe[e].run(o),
                        e++;
                (this._invalidated = {}),
                    !this.is('valid') && this.enter('valid');
            }),
            (o.prototype.width = function (t) {
                switch ((t = t || o.Width.Default)) {
                    case o.Width.Inner:
                    case o.Width.Outer:
                        return this._width;
                    default:
                        return (
                            this._width -
                            2 * this.settings.stagePadding +
                            this.settings.margin
                        );
                }
            }),
            (o.prototype.refresh = function () {
                this.enter('refreshing'),
                    this.trigger('refresh'),
                    this.setup(),
                    this.optionsLogic(),
                    this.$element.addClass(this.options.refreshClass),
                    this.update(),
                    this.$element.removeClass(this.options.refreshClass),
                    this.leave('refreshing'),
                    this.trigger('refreshed');
            }),
            (o.prototype.onThrottledResize = function () {
                e.clearTimeout(this.resizeTimer),
                    (this.resizeTimer = e.setTimeout(
                        this._handlers.onResize,
                        this.settings.responsiveRefreshRate
                    ));
            }),
            (o.prototype.onResize = function () {
                return (
                    !!this._items.length &&
                    this._width !== this.$element.width() &&
                    !!this.isVisible() &&
                    (this.enter('resizing'),
                    this.trigger('resize').isDefaultPrevented()
                        ? (this.leave('resizing'), !1)
                        : (this.invalidate('width'),
                          this.refresh(),
                          this.leave('resizing'),
                          void this.trigger('resized')))
                );
            }),
            (o.prototype.registerEventHandlers = function () {
                t.support.transition &&
                    this.$stage.on(
                        t.support.transition.end + '.owl.core',
                        t.proxy(this.onTransitionEnd, this)
                    ),
                    !1 !== this.settings.responsive &&
                        this.on(e, 'resize', this._handlers.onThrottledResize),
                    this.settings.mouseDrag &&
                        (this.$element.addClass(this.options.dragClass),
                        this.$stage.on(
                            'mousedown.owl.core',
                            t.proxy(this.onDragStart, this)
                        ),
                        this.$stage.on(
                            'dragstart.owl.core selectstart.owl.core',
                            function () {
                                return !1;
                            }
                        )),
                    this.settings.touchDrag &&
                        (this.$stage.on(
                            'touchstart.owl.core',
                            t.proxy(this.onDragStart, this)
                        ),
                        this.$stage.on(
                            'touchcancel.owl.core',
                            t.proxy(this.onDragEnd, this)
                        ));
            }),
            (o.prototype.onDragStart = function (e) {
                var i = null;
                3 !== e.which &&
                    (t.support.transform
                        ? (i = {
                              x: (i = this.$stage
                                  .css('transform')
                                  .replace(/.*\(|\)| /g, '')
                                  .split(','))[16 === i.length ? 12 : 4],
                              y: i[16 === i.length ? 13 : 5]
                          })
                        : ((i = this.$stage.position()),
                          (i = {
                              x: this.settings.rtl
                                  ? i.left +
                                    this.$stage.width() -
                                    this.width() +
                                    this.settings.margin
                                  : i.left,
                              y: i.top
                          })),
                    this.is('animating') &&
                        (t.support.transform
                            ? this.animate(i.x)
                            : this.$stage.stop(),
                        this.invalidate('position')),
                    this.$element.toggleClass(
                        this.options.grabClass,
                        'mousedown' === e.type
                    ),
                    this.speed(0),
                    (this._drag.time = new Date().getTime()),
                    (this._drag.target = t(e.target)),
                    (this._drag.stage.start = i),
                    (this._drag.stage.current = i),
                    (this._drag.pointer = this.pointer(e)),
                    t(n).on(
                        'mouseup.owl.core touchend.owl.core',
                        t.proxy(this.onDragEnd, this)
                    ),
                    t(n).one(
                        'mousemove.owl.core touchmove.owl.core',
                        t.proxy(function (e) {
                            var i = this.difference(
                                this._drag.pointer,
                                this.pointer(e)
                            );
                            t(n).on(
                                'mousemove.owl.core touchmove.owl.core',
                                t.proxy(this.onDragMove, this)
                            ),
                                (Math.abs(i.x) < Math.abs(i.y) &&
                                    this.is('valid')) ||
                                    (e.preventDefault(),
                                    this.enter('dragging'),
                                    this.trigger('drag'));
                        }, this)
                    ));
            }),
            (o.prototype.onDragMove = function (t) {
                var e = null,
                    n = null,
                    i = null,
                    o = this.difference(this._drag.pointer, this.pointer(t)),
                    r = this.difference(this._drag.stage.start, o);
                this.is('dragging') &&
                    (t.preventDefault(),
                    this.settings.loop
                        ? ((e = this.coordinates(this.minimum())),
                          (n = this.coordinates(this.maximum() + 1) - e),
                          (r.x = ((((r.x - e) % n) + n) % n) + e))
                        : ((e = this.settings.rtl
                              ? this.coordinates(this.maximum())
                              : this.coordinates(this.minimum())),
                          (n = this.settings.rtl
                              ? this.coordinates(this.minimum())
                              : this.coordinates(this.maximum())),
                          (i = this.settings.pullDrag ? (-1 * o.x) / 5 : 0),
                          (r.x = Math.max(Math.min(r.x, e + i), n + i))),
                    (this._drag.stage.current = r),
                    this.animate(r.x));
            }),
            (o.prototype.onDragEnd = function (e) {
                var i = this.difference(this._drag.pointer, this.pointer(e)),
                    o = this._drag.stage.current,
                    r = (i.x > 0) ^ this.settings.rtl ? 'left' : 'right';
                t(n).off('.owl.core'),
                    this.$element.removeClass(this.options.grabClass),
                    ((0 !== i.x && this.is('dragging')) || !this.is('valid')) &&
                        (this.speed(
                            this.settings.dragEndSpeed ||
                                this.settings.smartSpeed
                        ),
                        this.current(
                            this.closest(
                                o.x,
                                0 !== i.x ? r : this._drag.direction
                            )
                        ),
                        this.invalidate('position'),
                        this.update(),
                        (this._drag.direction = r),
                        (Math.abs(i.x) > 3 ||
                            new Date().getTime() - this._drag.time > 300) &&
                            this._drag.target.one(
                                'click.owl.core',
                                function () {
                                    return !1;
                                }
                            )),
                    this.is('dragging') &&
                        (this.leave('dragging'), this.trigger('dragged'));
            }),
            (o.prototype.closest = function (e, n) {
                var o = -1,
                    r = this.width(),
                    s = this.coordinates();
                return (
                    this.settings.freeDrag ||
                        t.each(
                            s,
                            t.proxy(function (t, a) {
                                return (
                                    'left' === n && e > a - 30 && e < a + 30
                                        ? (o = t)
                                        : 'right' === n &&
                                          e > a - r - 30 &&
                                          e < a - r + 30
                                        ? (o = t + 1)
                                        : this.op(e, '<', a) &&
                                          this.op(
                                              e,
                                              '>',
                                              s[t + 1] !== i ? s[t + 1] : a - r
                                          ) &&
                                          (o = 'left' === n ? t + 1 : t),
                                    -1 === o
                                );
                            }, this)
                        ),
                    this.settings.loop ||
                        (this.op(e, '>', s[this.minimum()])
                            ? (o = e = this.minimum())
                            : this.op(e, '<', s[this.maximum()]) &&
                              (o = e = this.maximum())),
                    o
                );
            }),
            (o.prototype.animate = function (e) {
                var n = this.speed() > 0;
                this.is('animating') && this.onTransitionEnd(),
                    n && (this.enter('animating'), this.trigger('translate')),
                    t.support.transform3d && t.support.transition
                        ? this.$stage.css({
                              transform: 'translate3d(' + e + 'px,0px,0px)',
                              transition:
                                  this.speed() / 1e3 +
                                  's' +
                                  (this.settings.slideTransition
                                      ? ' ' + this.settings.slideTransition
                                      : '')
                          })
                        : n
                        ? this.$stage.animate(
                              {left: e + 'px'},
                              this.speed(),
                              this.settings.fallbackEasing,
                              t.proxy(this.onTransitionEnd, this)
                          )
                        : this.$stage.css({left: e + 'px'});
            }),
            (o.prototype.is = function (t) {
                return this._states.current[t] && this._states.current[t] > 0;
            }),
            (o.prototype.current = function (t) {
                if (t === i) return this._current;
                if (0 === this._items.length) return i;
                if (((t = this.normalize(t)), this._current !== t)) {
                    var e = this.trigger('change', {
                        property: {name: 'position', value: t}
                    });
                    e.data !== i && (t = this.normalize(e.data)),
                        (this._current = t),
                        this.invalidate('position'),
                        this.trigger('changed', {
                            property: {name: 'position', value: this._current}
                        });
                }
                return this._current;
            }),
            (o.prototype.invalidate = function (e) {
                return (
                    'string' === t.type(e) &&
                        ((this._invalidated[e] = !0),
                        this.is('valid') && this.leave('valid')),
                    t.map(this._invalidated, function (t, e) {
                        return e;
                    })
                );
            }),
            (o.prototype.reset = function (t) {
                (t = this.normalize(t)) !== i &&
                    ((this._speed = 0),
                    (this._current = t),
                    this.suppress(['translate', 'translated']),
                    this.animate(this.coordinates(t)),
                    this.release(['translate', 'translated']));
            }),
            (o.prototype.normalize = function (t, e) {
                var n = this._items.length,
                    o = e ? 0 : this._clones.length;
                return (
                    !this.isNumeric(t) || n < 1
                        ? (t = i)
                        : (t < 0 || t >= n + o) &&
                          (t = ((((t - o / 2) % n) + n) % n) + o / 2),
                    t
                );
            }),
            (o.prototype.relative = function (t) {
                return (t -= this._clones.length / 2), this.normalize(t, !0);
            }),
            (o.prototype.maximum = function (t) {
                var e,
                    n,
                    i,
                    o = this.settings,
                    r = this._coordinates.length;
                if (o.loop)
                    r = this._clones.length / 2 + this._items.length - 1;
                else if (o.autoWidth || o.merge) {
                    if ((e = this._items.length))
                        for (
                            n = this._items[--e].width(),
                                i = this.$element.width();
                            e-- &&
                            !(
                                (n +=
                                    this._items[e].width() +
                                    this.settings.margin) > i
                            );

                        );
                    r = e + 1;
                } else
                    r = o.center
                        ? this._items.length - 1
                        : this._items.length - o.items;
                return t && (r -= this._clones.length / 2), Math.max(r, 0);
            }),
            (o.prototype.minimum = function (t) {
                return t ? 0 : this._clones.length / 2;
            }),
            (o.prototype.items = function (t) {
                return t === i
                    ? this._items.slice()
                    : ((t = this.normalize(t, !0)), this._items[t]);
            }),
            (o.prototype.mergers = function (t) {
                return t === i
                    ? this._mergers.slice()
                    : ((t = this.normalize(t, !0)), this._mergers[t]);
            }),
            (o.prototype.clones = function (e) {
                var n = this._clones.length / 2,
                    o = n + this._items.length,
                    r = function (t) {
                        return t % 2 == 0 ? o + t / 2 : n - (t + 1) / 2;
                    };
                return e === i
                    ? t.map(this._clones, function (t, e) {
                          return r(e);
                      })
                    : t.map(this._clones, function (t, n) {
                          return t === e ? r(n) : null;
                      });
            }),
            (o.prototype.speed = function (t) {
                return t !== i && (this._speed = t), this._speed;
            }),
            (o.prototype.coordinates = function (e) {
                var n,
                    o = 1,
                    r = e - 1;
                return e === i
                    ? t.map(
                          this._coordinates,
                          t.proxy(function (t, e) {
                              return this.coordinates(e);
                          }, this)
                      )
                    : (this.settings.center
                          ? (this.settings.rtl && ((o = -1), (r = e + 1)),
                            (n = this._coordinates[e]),
                            (n +=
                                ((this.width() -
                                    n +
                                    (this._coordinates[r] || 0)) /
                                    2) *
                                o))
                          : (n = this._coordinates[r] || 0),
                      (n = Math.ceil(n)));
            }),
            (o.prototype.duration = function (t, e, n) {
                return 0 === n
                    ? 0
                    : Math.min(Math.max(Math.abs(e - t), 1), 6) *
                          Math.abs(n || this.settings.smartSpeed);
            }),
            (o.prototype.to = function (t, e) {
                var n = this.current(),
                    i = null,
                    o = t - this.relative(n),
                    r = (o > 0) - (o < 0),
                    s = this._items.length,
                    a = this.minimum(),
                    l = this.maximum();
                this.settings.loop
                    ? (!this.settings.rewind &&
                          Math.abs(o) > s / 2 &&
                          (o += -1 * r * s),
                      (i = (((((t = n + o) - a) % s) + s) % s) + a) !== t &&
                          i - o <= l &&
                          i - o > 0 &&
                          ((n = i - o), (t = i), this.reset(n)))
                    : this.settings.rewind
                    ? (t = ((t % (l += 1)) + l) % l)
                    : (t = Math.max(a, Math.min(l, t))),
                    this.speed(this.duration(n, t, e)),
                    this.current(t),
                    this.isVisible() && this.update();
            }),
            (o.prototype.next = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) + 1, t);
            }),
            (o.prototype.prev = function (t) {
                (t = t || !1), this.to(this.relative(this.current()) - 1, t);
            }),
            (o.prototype.onTransitionEnd = function (t) {
                if (
                    t !== i &&
                    (t.stopPropagation(),
                    (t.target || t.srcElement || t.originalTarget) !==
                        this.$stage.get(0))
                )
                    return !1;
                this.leave('animating'), this.trigger('translated');
            }),
            (o.prototype.viewport = function () {
                var i;
                return (
                    this.options.responsiveBaseElement !== e
                        ? (i = t(this.options.responsiveBaseElement).width())
                        : e.innerWidth
                        ? (i = e.innerWidth)
                        : n.documentElement && n.documentElement.clientWidth
                        ? (i = n.documentElement.clientWidth)
                        : console.warn('Can not detect viewport width.'),
                    i
                );
            }),
            (o.prototype.replace = function (e) {
                this.$stage.empty(),
                    (this._items = []),
                    e && (e = e instanceof jQuery ? e : t(e)),
                    this.settings.nestedItemSelector &&
                        (e = e.find('.' + this.settings.nestedItemSelector)),
                    e
                        .filter(function () {
                            return 1 === this.nodeType;
                        })
                        .each(
                            t.proxy(function (t, e) {
                                (e = this.prepare(e)),
                                    this.$stage.append(e),
                                    this._items.push(e),
                                    this._mergers.push(
                                        1 *
                                            e
                                                .find('[data-merge]')
                                                .addBack('[data-merge]')
                                                .attr('data-merge') || 1
                                    );
                            }, this)
                        ),
                    this.reset(
                        this.isNumeric(this.settings.startPosition)
                            ? this.settings.startPosition
                            : 0
                    ),
                    this.invalidate('items');
            }),
            (o.prototype.add = function (e, n) {
                var o = this.relative(this._current);
                (n = n === i ? this._items.length : this.normalize(n, !0)),
                    (e = e instanceof jQuery ? e : t(e)),
                    this.trigger('add', {content: e, position: n}),
                    (e = this.prepare(e)),
                    0 === this._items.length || n === this._items.length
                        ? (0 === this._items.length && this.$stage.append(e),
                          0 !== this._items.length &&
                              this._items[n - 1].after(e),
                          this._items.push(e),
                          this._mergers.push(
                              1 *
                                  e
                                      .find('[data-merge]')
                                      .addBack('[data-merge]')
                                      .attr('data-merge') || 1
                          ))
                        : (this._items[n].before(e),
                          this._items.splice(n, 0, e),
                          this._mergers.splice(
                              n,
                              0,
                              1 *
                                  e
                                      .find('[data-merge]')
                                      .addBack('[data-merge]')
                                      .attr('data-merge') || 1
                          )),
                    this._items[o] && this.reset(this._items[o].index()),
                    this.invalidate('items'),
                    this.trigger('added', {content: e, position: n});
            }),
            (o.prototype.remove = function (t) {
                (t = this.normalize(t, !0)) !== i &&
                    (this.trigger('remove', {
                        content: this._items[t],
                        position: t
                    }),
                    this._items[t].remove(),
                    this._items.splice(t, 1),
                    this._mergers.splice(t, 1),
                    this.invalidate('items'),
                    this.trigger('removed', {content: null, position: t}));
            }),
            (o.prototype.preloadAutoWidthImages = function (e) {
                e.each(
                    t.proxy(function (e, n) {
                        this.enter('pre-loading'),
                            (n = t(n)),
                            t(new Image())
                                .one(
                                    'load',
                                    t.proxy(function (t) {
                                        n.attr('src', t.target.src),
                                            n.css('opacity', 1),
                                            this.leave('pre-loading'),
                                            !this.is('pre-loading') &&
                                                !this.is('initializing') &&
                                                this.refresh();
                                    }, this)
                                )
                                .attr(
                                    'src',
                                    n.attr('src') ||
                                        n.attr('data-src') ||
                                        n.attr('data-src-retina')
                                );
                    }, this)
                );
            }),
            (o.prototype.destroy = function () {
                for (var i in (this.$element.off('.owl.core'),
                this.$stage.off('.owl.core'),
                t(n).off('.owl.core'),
                !1 !== this.settings.responsive &&
                    (e.clearTimeout(this.resizeTimer),
                    this.off(e, 'resize', this._handlers.onThrottledResize)),
                this._plugins))
                    this._plugins[i].destroy();
                this.$stage.children('.cloned').remove(),
                    this.$stage.unwrap(),
                    this.$stage.children().contents().unwrap(),
                    this.$stage.children().unwrap(),
                    this.$stage.remove(),
                    this.$element
                        .removeClass(this.options.refreshClass)
                        .removeClass(this.options.loadingClass)
                        .removeClass(this.options.loadedClass)
                        .removeClass(this.options.rtlClass)
                        .removeClass(this.options.dragClass)
                        .removeClass(this.options.grabClass)
                        .attr(
                            'class',
                            this.$element
                                .attr('class')
                                .replace(
                                    new RegExp(
                                        this.options.responsiveClass +
                                            '-\\S+\\s',
                                        'g'
                                    ),
                                    ''
                                )
                        )
                        .removeData('owl.carousel');
            }),
            (o.prototype.op = function (t, e, n) {
                var i = this.settings.rtl;
                switch (e) {
                    case '<':
                        return i ? t > n : t < n;
                    case '>':
                        return i ? t < n : t > n;
                    case '>=':
                        return i ? t <= n : t >= n;
                    case '<=':
                        return i ? t >= n : t <= n;
                }
            }),
            (o.prototype.on = function (t, e, n, i) {
                t.addEventListener
                    ? t.addEventListener(e, n, i)
                    : t.attachEvent && t.attachEvent('on' + e, n);
            }),
            (o.prototype.off = function (t, e, n, i) {
                t.removeEventListener
                    ? t.removeEventListener(e, n, i)
                    : t.detachEvent && t.detachEvent('on' + e, n);
            }),
            (o.prototype.trigger = function (e, n, i, r, s) {
                var a = {
                        item: {count: this._items.length, index: this.current()}
                    },
                    l = t.camelCase(
                        t
                            .grep(['on', e, i], function (t) {
                                return t;
                            })
                            .join('-')
                            .toLowerCase()
                    ),
                    c = t.Event(
                        [e, 'owl', i || 'carousel'].join('.').toLowerCase(),
                        t.extend({relatedTarget: this}, a, n)
                    );
                return (
                    this._supress[e] ||
                        (t.each(this._plugins, function (t, e) {
                            e.onTrigger && e.onTrigger(c);
                        }),
                        this.register({type: o.Type.Event, name: e}),
                        this.$element.trigger(c),
                        this.settings &&
                            'function' == typeof this.settings[l] &&
                            this.settings[l].call(this, c)),
                    c
                );
            }),
            (o.prototype.enter = function (e) {
                t.each(
                    [e].concat(this._states.tags[e] || []),
                    t.proxy(function (t, e) {
                        this._states.current[e] === i &&
                            (this._states.current[e] = 0),
                            this._states.current[e]++;
                    }, this)
                );
            }),
            (o.prototype.leave = function (e) {
                t.each(
                    [e].concat(this._states.tags[e] || []),
                    t.proxy(function (t, e) {
                        this._states.current[e]--;
                    }, this)
                );
            }),
            (o.prototype.register = function (e) {
                if (e.type === o.Type.Event) {
                    if (
                        (t.event.special[e.name] ||
                            (t.event.special[e.name] = {}),
                        !t.event.special[e.name].owl)
                    ) {
                        var n = t.event.special[e.name]._default;
                        (t.event.special[e.name]._default = function (t) {
                            return !n ||
                                !n.apply ||
                                (t.namespace &&
                                    -1 !== t.namespace.indexOf('owl'))
                                ? t.namespace && t.namespace.indexOf('owl') > -1
                                : n.apply(this, arguments);
                        }),
                            (t.event.special[e.name].owl = !0);
                    }
                } else
                    e.type === o.Type.State &&
                        (this._states.tags[e.name]
                            ? (this._states.tags[e.name] = this._states.tags[
                                  e.name
                              ].concat(e.tags))
                            : (this._states.tags[e.name] = e.tags),
                        (this._states.tags[e.name] = t.grep(
                            this._states.tags[e.name],
                            t.proxy(function (n, i) {
                                return (
                                    t.inArray(n, this._states.tags[e.name]) ===
                                    i
                                );
                            }, this)
                        )));
            }),
            (o.prototype.suppress = function (e) {
                t.each(
                    e,
                    t.proxy(function (t, e) {
                        this._supress[e] = !0;
                    }, this)
                );
            }),
            (o.prototype.release = function (e) {
                t.each(
                    e,
                    t.proxy(function (t, e) {
                        delete this._supress[e];
                    }, this)
                );
            }),
            (o.prototype.pointer = function (t) {
                var n = {x: null, y: null};
                return (
                    (t =
                        (t = t.originalEvent || t || e.event).touches &&
                        t.touches.length
                            ? t.touches[0]
                            : t.changedTouches && t.changedTouches.length
                            ? t.changedTouches[0]
                            : t).pageX
                        ? ((n.x = t.pageX), (n.y = t.pageY))
                        : ((n.x = t.clientX), (n.y = t.clientY)),
                    n
                );
            }),
            (o.prototype.isNumeric = function (t) {
                return !isNaN(parseFloat(t));
            }),
            (o.prototype.difference = function (t, e) {
                return {x: t.x - e.x, y: t.y - e.y};
            }),
            (t.fn.owlCarousel = function (e) {
                var n = Array.prototype.slice.call(arguments, 1);
                return this.each(function () {
                    var i = t(this),
                        r = i.data('owl.carousel');
                    r ||
                        ((r = new o(this, 'object' == _typeof(e) && e)),
                        i.data('owl.carousel', r),
                        t.each(
                            [
                                'next',
                                'prev',
                                'to',
                                'destroy',
                                'refresh',
                                'replace',
                                'add',
                                'remove'
                            ],
                            function (e, n) {
                                r.register({type: o.Type.Event, name: n}),
                                    r.$element.on(
                                        n + '.owl.carousel.core',
                                        t.proxy(function (t) {
                                            t.namespace &&
                                                t.relatedTarget !== this &&
                                                (this.suppress([n]),
                                                r[n].apply(
                                                    this,
                                                    [].slice.call(arguments, 1)
                                                ),
                                                this.release([n]));
                                        }, r)
                                    );
                            }
                        )),
                        'string' == typeof e &&
                            '_' !== e.charAt(0) &&
                            r[e].apply(r, n);
                });
            }),
            (t.fn.owlCarousel.Constructor = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        var o = function e(n) {
            (this._core = n),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    'initialized.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.autoRefresh &&
                            this.watch();
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (o.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}),
            (o.prototype.watch = function () {
                this._interval ||
                    ((this._visible = this._core.isVisible()),
                    (this._interval = e.setInterval(
                        t.proxy(this.refresh, this),
                        this._core.settings.autoRefreshInterval
                    )));
            }),
            (o.prototype.refresh = function () {
                this._core.isVisible() !== this._visible &&
                    ((this._visible = !this._visible),
                    this._core.$element.toggleClass(
                        'owl-hidden',
                        !this._visible
                    ),
                    this._visible &&
                        this._core.invalidate('width') &&
                        this._core.refresh());
            }),
            (o.prototype.destroy = function () {
                var t, n;
                for (t in (e.clearInterval(this._interval), this._handlers))
                    this._core.$element.off(t, this._handlers[t]);
                for (n in Object.getOwnPropertyNames(this))
                    'function' != typeof this[n] && (this[n] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        var o = function e(n) {
            (this._core = n),
                (this._loaded = []),
                (this._handlers = {
                    'initialized.owl.carousel change.owl.carousel resized.owl.carousel':
                        t.proxy(function (e) {
                            if (
                                e.namespace &&
                                this._core.settings &&
                                this._core.settings.lazyLoad &&
                                ((e.property &&
                                    'position' == e.property.name) ||
                                    'initialized' == e.type)
                            ) {
                                var n = this._core.settings,
                                    i =
                                        (n.center && Math.ceil(n.items / 2)) ||
                                        n.items,
                                    o = (n.center && -1 * i) || 0,
                                    r =
                                        (e.property &&
                                        undefined !== e.property.value
                                            ? e.property.value
                                            : this._core.current()) + o,
                                    s = this._core.clones().length,
                                    a = t.proxy(function (t, e) {
                                        this.load(e);
                                    }, this);
                                for (
                                    n.lazyLoadEager > 0 &&
                                    ((i += n.lazyLoadEager),
                                    n.loop && ((r -= n.lazyLoadEager), i++));
                                    o++ < i;

                                )
                                    this.load(s / 2 + this._core.relative(r)),
                                        s &&
                                            t.each(
                                                this._core.clones(
                                                    this._core.relative(r)
                                                ),
                                                a
                                            ),
                                        r++;
                            }
                        }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (o.Defaults = {lazyLoad: !1, lazyLoadEager: 0}),
            (o.prototype.load = function (n) {
                var i = this._core.$stage.children().eq(n),
                    o = i && i.find('.owl-lazy');
                !o ||
                    t.inArray(i.get(0), this._loaded) > -1 ||
                    (o.each(
                        t.proxy(function (n, i) {
                            var o,
                                r = t(i),
                                s =
                                    (e.devicePixelRatio > 1 &&
                                        r.attr('data-src-retina')) ||
                                    r.attr('data-src') ||
                                    r.attr('data-srcset');
                            this._core.trigger(
                                'load',
                                {element: r, url: s},
                                'lazy'
                            ),
                                r.is('img')
                                    ? r
                                          .one(
                                              'load.owl.lazy',
                                              t.proxy(function () {
                                                  r.css('opacity', 1),
                                                      this._core.trigger(
                                                          'loaded',
                                                          {element: r, url: s},
                                                          'lazy'
                                                      );
                                              }, this)
                                          )
                                          .attr('src', s)
                                    : r.is('source')
                                    ? r
                                          .one(
                                              'load.owl.lazy',
                                              t.proxy(function () {
                                                  this._core.trigger(
                                                      'loaded',
                                                      {element: r, url: s},
                                                      'lazy'
                                                  );
                                              }, this)
                                          )
                                          .attr('srcset', s)
                                    : (((o = new Image()).onload = t.proxy(
                                          function () {
                                              r.css({
                                                  'background-image':
                                                      'url("' + s + '")',
                                                  opacity: '1'
                                              }),
                                                  this._core.trigger(
                                                      'loaded',
                                                      {element: r, url: s},
                                                      'lazy'
                                                  );
                                          },
                                          this
                                      )),
                                      (o.src = s));
                        }, this)
                    ),
                    this._loaded.push(i.get(0)));
            }),
            (o.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers)
                    this._core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    'function' != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Lazy = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        var o = function n(i) {
            (this._core = i),
                (this._previousHeight = null),
                (this._handlers = {
                    'initialized.owl.carousel refreshed.owl.carousel': t.proxy(
                        function (t) {
                            t.namespace &&
                                this._core.settings.autoHeight &&
                                this.update();
                        },
                        this
                    ),
                    'changed.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.autoHeight &&
                            'position' === t.property.name &&
                            this.update();
                    }, this),
                    'loaded.owl.lazy': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.autoHeight &&
                            t.element
                                .closest('.' + this._core.settings.itemClass)
                                .index() === this._core.current() &&
                            this.update();
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    n.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers),
                (this._intervalId = null);
            var o = this;
            t(e).on('load', function () {
                o._core.settings.autoHeight && o.update();
            }),
                t(e).resize(function () {
                    o._core.settings.autoHeight &&
                        (null != o._intervalId && clearTimeout(o._intervalId),
                        (o._intervalId = setTimeout(function () {
                            o.update();
                        }, 250)));
                });
        };
        (o.Defaults = {autoHeight: !1, autoHeightClass: 'owl-height'}),
            (o.prototype.update = function () {
                var e = this._core._current,
                    n = e + this._core.settings.items,
                    i = this._core.settings.lazyLoad,
                    o = this._core.$stage.children().toArray().slice(e, n),
                    r = [],
                    s = 0;
                t.each(o, function (e, n) {
                    r.push(t(n).height());
                }),
                    (s = Math.max.apply(null, r)) <= 1 &&
                        i &&
                        this._previousHeight &&
                        (s = this._previousHeight),
                    (this._previousHeight = s),
                    this._core.$stage
                        .parent()
                        .height(s)
                        .addClass(this._core.settings.autoHeightClass);
            }),
            (o.prototype.destroy = function () {
                var t, e;
                for (t in this._handlers)
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    'function' != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        var o = function e(n) {
            (this._core = n),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    'initialized.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.register({
                                type: 'state',
                                name: 'playing',
                                tags: ['interacting']
                            });
                    }, this),
                    'resize.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.video &&
                            this.isInFullScreen() &&
                            t.preventDefault();
                    }, this),
                    'refreshed.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.is('resizing') &&
                            this._core.$stage
                                .find('.cloned .owl-video-frame')
                                .remove();
                    }, this),
                    'changed.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            'position' === t.property.name &&
                            this._playing &&
                            this.stop();
                    }, this),
                    'prepared.owl.carousel': t.proxy(function (e) {
                        if (e.namespace) {
                            var n = t(e.content).find('.owl-video');
                            n.length &&
                                (n.css('display', 'none'),
                                this.fetch(n, t(e.content)));
                        }
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    'click.owl.video',
                    '.owl-video-play-icon',
                    t.proxy(function (t) {
                        this.play(t);
                    }, this)
                );
        };
        (o.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}),
            (o.prototype.fetch = function (t, e) {
                var n = t.attr('data-vimeo-id')
                        ? 'vimeo'
                        : t.attr('data-vzaar-id')
                        ? 'vzaar'
                        : 'youtube',
                    i =
                        t.attr('data-vimeo-id') ||
                        t.attr('data-youtube-id') ||
                        t.attr('data-vzaar-id'),
                    o = t.attr('data-width') || this._core.settings.videoWidth,
                    r =
                        t.attr('data-height') ||
                        this._core.settings.videoHeight,
                    s = t.attr('href');
                if (!s) throw new Error('Missing video URL.');
                if (
                    (i = s.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    ))[3].indexOf('youtu') > -1
                )
                    n = 'youtube';
                else if (i[3].indexOf('vimeo') > -1) n = 'vimeo';
                else {
                    if (!(i[3].indexOf('vzaar') > -1))
                        throw new Error('Video URL not supported.');
                    n = 'vzaar';
                }
                (i = i[6]),
                    (this._videos[s] = {type: n, id: i, width: o, height: r}),
                    e.attr('data-video', s),
                    this.thumbnail(t, this._videos[s]);
            }),
            (o.prototype.thumbnail = function (e, n) {
                var i,
                    o,
                    r =
                        n.width && n.height
                            ? 'width:' +
                              n.width +
                              'px;height:' +
                              n.height +
                              'px;'
                            : '',
                    s = e.find('img'),
                    a = 'src',
                    l = '',
                    c = this._core.settings,
                    u = function (n) {
                        '<div class="owl-video-play-icon"></div>',
                            (i = c.lazyLoad
                                ? t('<div/>', {
                                      class: 'owl-video-tn ' + l,
                                      srcType: n
                                  })
                                : t('<div/>', {
                                      class: 'owl-video-tn',
                                      style:
                                          'opacity:1;background-image:url(' +
                                          n +
                                          ')'
                                  })),
                            e.after(i),
                            e.after('<div class="owl-video-play-icon"></div>');
                    };
                if (
                    (e.wrap(
                        t('<div/>', {class: 'owl-video-wrapper', style: r})
                    ),
                    this._core.settings.lazyLoad &&
                        ((a = 'data-src'), (l = 'owl-lazy')),
                    s.length)
                )
                    return u(s.attr(a)), s.remove(), !1;
                'youtube' === n.type
                    ? ((o = '//img.youtube.com/vi/' + n.id + '/hqdefault.jpg'),
                      u(o))
                    : 'vimeo' === n.type
                    ? t.ajax({
                          type: 'GET',
                          url: '//vimeo.com/api/v2/video/' + n.id + '.json',
                          jsonp: 'callback',
                          dataType: 'jsonp',
                          success: function (t) {
                              (o = t[0].thumbnail_large), u(o);
                          }
                      })
                    : 'vzaar' === n.type &&
                      t.ajax({
                          type: 'GET',
                          url: '//vzaar.com/api/videos/' + n.id + '.json',
                          jsonp: 'callback',
                          dataType: 'jsonp',
                          success: function (t) {
                              (o = t.framegrab_url), u(o);
                          }
                      });
            }),
            (o.prototype.stop = function () {
                this._core.trigger('stop', null, 'video'),
                    this._playing.find('.owl-video-frame').remove(),
                    this._playing.removeClass('owl-video-playing'),
                    (this._playing = null),
                    this._core.leave('playing'),
                    this._core.trigger('stopped', null, 'video');
            }),
            (o.prototype.play = function (e) {
                var n,
                    i = t(e.target).closest(
                        '.' + this._core.settings.itemClass
                    ),
                    o = this._videos[i.attr('data-video')],
                    r = o.width || '100%',
                    s = o.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter('playing'),
                    this._core.trigger('play', null, 'video'),
                    (i = this._core.items(this._core.relative(i.index()))),
                    this._core.reset(i.index()),
                    (n = t(
                        '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
                    )).attr('height', s),
                    n.attr('width', r),
                    'youtube' === o.type
                        ? n.attr(
                              'src',
                              '//www.youtube.com/embed/' +
                                  o.id +
                                  '?autoplay=1&rel=0&v=' +
                                  o.id
                          )
                        : 'vimeo' === o.type
                        ? n.attr(
                              'src',
                              '//player.vimeo.com/video/' + o.id + '?autoplay=1'
                          )
                        : 'vzaar' === o.type &&
                          n.attr(
                              'src',
                              '//view.vzaar.com/' +
                                  o.id +
                                  '/player?autoplay=true'
                          ),
                    t(n)
                        .wrap('<div class="owl-video-frame" />')
                        .insertAfter(i.find('.owl-video')),
                    (this._playing = i.addClass('owl-video-playing')));
            }),
            (o.prototype.isInFullScreen = function () {
                var e =
                    n.fullscreenElement ||
                    n.mozFullScreenElement ||
                    n.webkitFullscreenElement;
                return e && t(e).parent().hasClass('owl-video-frame');
            }),
            (o.prototype.destroy = function () {
                var t, e;
                for (t in (this._core.$element.off('click.owl.video'),
                this._handlers))
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    'function' != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Video = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        var o = function e(n) {
            (this.core = n),
                (this.core.options = t.extend(
                    {},
                    e.Defaults,
                    this.core.options
                )),
                (this.swapping = !0),
                (this.previous = i),
                (this.next = i),
                (this.handlers = {
                    'change.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            'position' == t.property.name &&
                            ((this.previous = this.core.current()),
                            (this.next = t.property.value));
                    }, this),
                    'drag.owl.carousel dragged.owl.carousel translated.owl.carousel':
                        t.proxy(function (t) {
                            t.namespace &&
                                (this.swapping = 'translated' == t.type);
                        }, this),
                    'translate.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this.swapping &&
                            (this.core.options.animateOut ||
                                this.core.options.animateIn) &&
                            this.swap();
                    }, this)
                }),
                this.core.$element.on(this.handlers);
        };
        (o.Defaults = {animateOut: !1, animateIn: !1}),
            (o.prototype.swap = function () {
                if (
                    1 === this.core.settings.items &&
                    t.support.animation &&
                    t.support.transition
                ) {
                    this.core.speed(0);
                    var e,
                        n = t.proxy(this.clear, this),
                        i = this.core.$stage.children().eq(this.previous),
                        o = this.core.$stage.children().eq(this.next),
                        r = this.core.settings.animateIn,
                        s = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (s &&
                            ((e =
                                this.core.coordinates(this.previous) -
                                this.core.coordinates(this.next)),
                            i
                                .one(t.support.animation.end, n)
                                .css({left: e + 'px'})
                                .addClass('animated owl-animated-out')
                                .addClass(s)),
                        r &&
                            o
                                .one(t.support.animation.end, n)
                                .addClass('animated owl-animated-in')
                                .addClass(r));
                }
            }),
            (o.prototype.clear = function (e) {
                t(e.target)
                    .css({left: ''})
                    .removeClass('animated owl-animated-out owl-animated-in')
                    .removeClass(this.core.settings.animateIn)
                    .removeClass(this.core.settings.animateOut),
                    this.core.onTransitionEnd();
            }),
            (o.prototype.destroy = function () {
                var t, e;
                for (t in this.handlers)
                    this.core.$element.off(t, this.handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    'function' != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Animate = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        var o = function e(n) {
            (this._core = n),
                (this._call = null),
                (this._time = 0),
                (this._timeout = 0),
                (this._paused = !0),
                (this._handlers = {
                    'changed.owl.carousel': t.proxy(function (t) {
                        t.namespace && 'settings' === t.property.name
                            ? this._core.settings.autoplay
                                ? this.play()
                                : this.stop()
                            : t.namespace &&
                              'position' === t.property.name &&
                              this._paused &&
                              (this._time = 0);
                    }, this),
                    'initialized.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.autoplay &&
                            this.play();
                    }, this),
                    'play.owl.autoplay': t.proxy(function (t, e, n) {
                        t.namespace && this.play(e, n);
                    }, this),
                    'stop.owl.autoplay': t.proxy(function (t) {
                        t.namespace && this.stop();
                    }, this),
                    'mouseover.owl.autoplay': t.proxy(function () {
                        this._core.settings.autoplayHoverPause &&
                            this._core.is('rotating') &&
                            this.pause();
                    }, this),
                    'mouseleave.owl.autoplay': t.proxy(function () {
                        this._core.settings.autoplayHoverPause &&
                            this._core.is('rotating') &&
                            this.play();
                    }, this),
                    'touchstart.owl.core': t.proxy(function () {
                        this._core.settings.autoplayHoverPause &&
                            this._core.is('rotating') &&
                            this.pause();
                    }, this),
                    'touchend.owl.core': t.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this)
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                ));
        };
        (o.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }),
            (o.prototype._next = function (i) {
                (this._call = e.setTimeout(
                    t.proxy(this._next, this, i),
                    this._timeout *
                        (Math.round(this.read() / this._timeout) + 1) -
                        this.read()
                )),
                    this._core.is('interacting') ||
                        n.hidden ||
                        this._core.next(i || this._core.settings.autoplaySpeed);
            }),
            (o.prototype.read = function () {
                return new Date().getTime() - this._time;
            }),
            (o.prototype.play = function (n, i) {
                var o;
                this._core.is('rotating') || this._core.enter('rotating'),
                    (n = n || this._core.settings.autoplayTimeout),
                    (o = Math.min(this._time % (this._timeout || n), n)),
                    this._paused
                        ? ((this._time = this.read()), (this._paused = !1))
                        : e.clearTimeout(this._call),
                    (this._time += (this.read() % n) - o),
                    (this._timeout = n),
                    (this._call = e.setTimeout(
                        t.proxy(this._next, this, i),
                        n - o
                    ));
            }),
            (o.prototype.stop = function () {
                this._core.is('rotating') &&
                    ((this._time = 0),
                    (this._paused = !0),
                    e.clearTimeout(this._call),
                    this._core.leave('rotating'));
            }),
            (o.prototype.pause = function () {
                this._core.is('rotating') &&
                    !this._paused &&
                    ((this._time = this.read()),
                    (this._paused = !0),
                    e.clearTimeout(this._call));
            }),
            (o.prototype.destroy = function () {
                var t, e;
                for (t in (this.stop(), this._handlers))
                    this._core.$element.off(t, this._handlers[t]);
                for (e in Object.getOwnPropertyNames(this))
                    'function' != typeof this[e] && (this[e] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.autoplay = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        'use strict';
        var o = function e(n) {
            (this._core = n),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to
                }),
                (this._handlers = {
                    'prepared.owl.carousel': t.proxy(function (e) {
                        e.namespace &&
                            this._core.settings.dotsData &&
                            this._templates.push(
                                '<div class="' +
                                    this._core.settings.dotClass +
                                    '">' +
                                    t(e.content)
                                        .find('[data-dot]')
                                        .addBack('[data-dot]')
                                        .attr('data-dot') +
                                    '</div>'
                            );
                    }, this),
                    'added.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.dotsData &&
                            this._templates.splice(
                                t.position,
                                0,
                                this._templates.pop()
                            );
                    }, this),
                    'remove.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._core.settings.dotsData &&
                            this._templates.splice(t.position, 1);
                    }, this),
                    'changed.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            'position' == t.property.name &&
                            this.draw();
                    }, this),
                    'initialized.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            !this._initialized &&
                            (this._core.trigger(
                                'initialize',
                                null,
                                'navigation'
                            ),
                            this.initialize(),
                            this.update(),
                            this.draw(),
                            (this._initialized = !0),
                            this._core.trigger(
                                'initialized',
                                null,
                                'navigation'
                            ));
                    }, this),
                    'refreshed.owl.carousel': t.proxy(function (t) {
                        t.namespace &&
                            this._initialized &&
                            (this._core.trigger('refresh', null, 'navigation'),
                            this.update(),
                            this.draw(),
                            this._core.trigger(
                                'refreshed',
                                null,
                                'navigation'
                            ));
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers);
        };
        (o.Defaults = {
            nav: !1,
            navText: [
                '<span aria-label="Previous">&#x2039;</span>',
                '<span aria-label="Next">&#x203a;</span>'
            ],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: 'owl-nav',
            navClass: ['owl-prev', 'owl-next'],
            slideBy: 1,
            dotClass: 'owl-dot',
            dotsClass: 'owl-dots',
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }),
            (o.prototype.initialize = function () {
                var e,
                    n = this._core.settings;
                for (e in ((this._controls.$relative = (
                    n.navContainer
                        ? t(n.navContainer)
                        : t('<div>')
                              .addClass(n.navContainerClass)
                              .appendTo(this.$element)
                ).addClass('disabled')),
                (this._controls.$previous = t('<' + n.navElement + '>')
                    .addClass(n.navClass[0])
                    .html(n.navText[0])
                    .prependTo(this._controls.$relative)
                    .on(
                        'click',
                        t.proxy(function (t) {
                            this.prev(n.navSpeed);
                        }, this)
                    )),
                (this._controls.$next = t('<' + n.navElement + '>')
                    .addClass(n.navClass[1])
                    .html(n.navText[1])
                    .appendTo(this._controls.$relative)
                    .on(
                        'click',
                        t.proxy(function (t) {
                            this.next(n.navSpeed);
                        }, this)
                    )),
                n.dotsData ||
                    (this._templates = [
                        t('<button role="button">')
                            .addClass(n.dotClass)
                            .append(t('<span>'))
                            .prop('outerHTML')
                    ]),
                (this._controls.$absolute = (
                    n.dotsContainer
                        ? t(n.dotsContainer)
                        : t('<div>')
                              .addClass(n.dotsClass)
                              .appendTo(this.$element)
                ).addClass('disabled')),
                this._controls.$absolute.on(
                    'click',
                    'button',
                    t.proxy(function (e) {
                        var i = t(e.target)
                            .parent()
                            .is(this._controls.$absolute)
                            ? t(e.target).index()
                            : t(e.target).parent().index();
                        e.preventDefault(), this.to(i, n.dotsSpeed);
                    }, this)
                ),
                this._overrides))
                    this._core[e] = t.proxy(this[e], this);
            }),
            (o.prototype.destroy = function () {
                var t, e, n, i, o;
                for (t in ((o = this._core.settings), this._handlers))
                    this.$element.off(t, this._handlers[t]);
                for (e in this._controls)
                    '$relative' === e && o.navContainer
                        ? this._controls[e].html('')
                        : this._controls[e].remove();
                for (i in this.overides) this._core[i] = this._overrides[i];
                for (n in Object.getOwnPropertyNames(this))
                    'function' != typeof this[n] && (this[n] = null);
            }),
            (o.prototype.update = function () {
                var t,
                    e,
                    n = this._core.clones().length / 2,
                    i = n + this._core.items().length,
                    o = this._core.maximum(!0),
                    r = this._core.settings,
                    s =
                        r.center || r.autoWidth || r.dotsData
                            ? 1
                            : r.dotsEach || r.items;
                if (
                    ('page' !== r.slideBy &&
                        (r.slideBy = Math.min(r.slideBy, r.items)),
                    r.dots || 'page' == r.slideBy)
                )
                    for (this._pages = [], t = n, e = 0, 0; t < i; t++) {
                        if (e >= s || 0 === e) {
                            if (
                                (this._pages.push({
                                    start: Math.min(o, t - n),
                                    end: t - n + s - 1
                                }),
                                Math.min(o, t - n) === o)
                            )
                                break;
                            e = 0;
                        }
                        e += this._core.mergers(this._core.relative(t));
                    }
            }),
            (o.prototype.draw = function () {
                var e,
                    n = this._core.settings,
                    i = this._core.items().length <= n.items,
                    o = this._core.relative(this._core.current()),
                    r = n.loop || n.rewind;
                this._controls.$relative.toggleClass('disabled', !n.nav || i),
                    n.nav &&
                        (this._controls.$previous.toggleClass(
                            'disabled',
                            !r && o <= this._core.minimum(!0)
                        ),
                        this._controls.$next.toggleClass(
                            'disabled',
                            !r && o >= this._core.maximum(!0)
                        )),
                    this._controls.$absolute.toggleClass(
                        'disabled',
                        !n.dots || i
                    ),
                    n.dots &&
                        ((e =
                            this._pages.length -
                            this._controls.$absolute.children().length),
                        n.dotsData && 0 !== e
                            ? this._controls.$absolute.html(
                                  this._templates.join('')
                              )
                            : e > 0
                            ? this._controls.$absolute.append(
                                  new Array(e + 1).join(this._templates[0])
                              )
                            : e < 0 &&
                              this._controls.$absolute
                                  .children()
                                  .slice(e)
                                  .remove(),
                        this._controls.$absolute
                            .find('.active')
                            .removeClass('active'),
                        this._controls.$absolute
                            .children()
                            .eq(t.inArray(this.current(), this._pages))
                            .addClass('active'));
            }),
            (o.prototype.onTrigger = function (e) {
                var n = this._core.settings;
                e.page = {
                    index: t.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size:
                        n &&
                        (n.center || n.autoWidth || n.dotsData
                            ? 1
                            : n.dotsEach || n.items)
                };
            }),
            (o.prototype.current = function () {
                var e = this._core.relative(this._core.current());
                return t
                    .grep(
                        this._pages,
                        t.proxy(function (t, n) {
                            return t.start <= e && t.end >= e;
                        }, this)
                    )
                    .pop();
            }),
            (o.prototype.getPosition = function (e) {
                var n,
                    i,
                    o = this._core.settings;
                return (
                    'page' == o.slideBy
                        ? ((n = t.inArray(this.current(), this._pages)),
                          (i = this._pages.length),
                          e ? ++n : --n,
                          (n = this._pages[((n % i) + i) % i].start))
                        : ((n = this._core.relative(this._core.current())),
                          (i = this._core.items().length),
                          e ? (n += o.slideBy) : (n -= o.slideBy)),
                    n
                );
            }),
            (o.prototype.next = function (e) {
                t.proxy(this._overrides.to, this._core)(
                    this.getPosition(!0),
                    e
                );
            }),
            (o.prototype.prev = function (e) {
                t.proxy(this._overrides.to, this._core)(
                    this.getPosition(!1),
                    e
                );
            }),
            (o.prototype.to = function (e, n, i) {
                var o;
                !i && this._pages.length
                    ? ((o = this._pages.length),
                      t.proxy(this._overrides.to, this._core)(
                          this._pages[((e % o) + o) % o].start,
                          n
                      ))
                    : t.proxy(this._overrides.to, this._core)(e, n);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Navigation = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        'use strict';
        var o = function n(i) {
            (this._core = i),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    'initialized.owl.carousel': t.proxy(function (n) {
                        n.namespace &&
                            'URLHash' === this._core.settings.startPosition &&
                            t(e).trigger('hashchange.owl.navigation');
                    }, this),
                    'prepared.owl.carousel': t.proxy(function (e) {
                        if (e.namespace) {
                            var n = t(e.content)
                                .find('[data-hash]')
                                .addBack('[data-hash]')
                                .attr('data-hash');
                            if (!n) return;
                            this._hashes[n] = e.content;
                        }
                    }, this),
                    'changed.owl.carousel': t.proxy(function (n) {
                        if (n.namespace && 'position' === n.property.name) {
                            var i = this._core.items(
                                    this._core.relative(this._core.current())
                                ),
                                o = t
                                    .map(this._hashes, function (t, e) {
                                        return t === i ? e : null;
                                    })
                                    .join();
                            if (!o || e.location.hash.slice(1) === o) return;
                            e.location.hash = o;
                        }
                    }, this)
                }),
                (this._core.options = t.extend(
                    {},
                    n.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers),
                t(e).on(
                    'hashchange.owl.navigation',
                    t.proxy(function (t) {
                        var n = e.location.hash.substring(1),
                            i = this._core.$stage.children(),
                            o = this._hashes[n] && i.index(this._hashes[n]);
                        undefined !== o &&
                            o !== this._core.current() &&
                            this._core.to(this._core.relative(o), !1, !0);
                    }, this)
                );
        };
        (o.Defaults = {URLhashListener: !1}),
            (o.prototype.destroy = function () {
                var n, i;
                for (n in (t(e).off('hashchange.owl.navigation'),
                this._handlers))
                    this._core.$element.off(n, this._handlers[n]);
                for (i in Object.getOwnPropertyNames(this))
                    'function' != typeof this[i] && (this[i] = null);
            }),
            (t.fn.owlCarousel.Constructor.Plugins.Hash = o);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, n, i) {
        function o(e, n) {
            var i = !1,
                o = e.charAt(0).toUpperCase() + e.slice(1);
            return (
                t.each(
                    (e + ' ' + a.join(o + ' ') + o).split(' '),
                    function (t, e) {
                        if (undefined !== s[e]) return (i = !n || e), !1;
                    }
                ),
                i
            );
        }
        function r(t) {
            return o(t, !0);
        }
        var s = t('<support>').get(0).style,
            a = 'Webkit Moz O ms'.split(' '),
            l = {
                transition: {
                    end: {
                        WebkitTransition: 'webkitTransitionEnd',
                        MozTransition: 'transitionend',
                        OTransition: 'oTransitionEnd',
                        transition: 'transitionend'
                    }
                },
                animation: {
                    end: {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd',
                        animation: 'animationend'
                    }
                }
            },
            c = function () {
                return !!o('transform');
            },
            u = function () {
                return !!o('perspective');
            },
            d = function () {
                return !!o('animation');
            };
        (function () {
            return !!o('transition');
        })() &&
            ((t.support.transition = new String(r('transition'))),
            (t.support.transition.end =
                l.transition.end[t.support.transition])),
            d() &&
                ((t.support.animation = new String(r('animation'))),
                (t.support.animation.end =
                    l.animation.end[t.support.animation])),
            c() &&
                ((t.support.transform = new String(r('transform'))),
                (t.support.transform3d = u()));
    })(window.Zepto || window.jQuery, window, document),
    (function (t) {
        t.fn.horizontalmenu = function (e) {
            var n = {
                itemClick: function (t) {
                    return !0;
                }
            };
            e && t.extend(n, e);
            var i = function (e) {
                var n,
                    i = t(e).find('.ah-tab'),
                    o = i.find('.ah-tab-item'),
                    r = i.find('.ah-tab-item[data-ah-tab-active="true"]'),
                    s = (n = t(i)[0]).scrollWidth > n.clientWidth;
                t(e)
                    .find('.ah-tab-overflow-wrapper')
                    .attr('data-ah-tab-active', s);
                var a = 0,
                    l = 0,
                    c = r.index();
                if (s) {
                    for (var u = 0; u < o.length; u++) {
                        var d = o.eq(u),
                            h = d.width(),
                            f = parseInt(d.css('margin-left')) || 0;
                        u < c ? (l += h + (u + 1 < c ? f : 0)) : (a -= h + f);
                    }
                    if (a + r.width() + 80 > t(i).width()) {
                        if (((a *= -1), c)) {
                            var p = t(i).width() - a - 80;
                            p > 0 && (a += p),
                                i.addClass('ah-tab-overflow-left');
                        }
                    } else (a = 0), i.removeClass('ah-tab-overflow-left');
                    i.addClass('ah-tab-overflow-right');
                } else
                    i.removeClass('ah-tab-overflow-left ah-tab-overflow-right');
                o.css({
                    '-moz-transform': 'translateX(' + l + 'px)',
                    '-o-transform': 'translateX(' + l + 'px)',
                    '-webkit-transform': 'translateX(' + l + 'px)',
                    transform: 'translateX(' + l + 'px)'
                });
            };
            return this.each(function () {
                !(function (e) {
                    if (e.find('.ah-tab-overflow-wrapper').length) return !1;
                    var o = e.find('.ah-tab-item');
                    o.bind('click', function () {
                        var e = n.itemClick(t(this));
                        if (!e) {
                            var o = t(this).index(),
                                r = t(this).closest('.ah-tab-wrapper');
                            r
                                .find('.ah-tab-item')
                                .removeAttr('data-ah-tab-active'),
                                r
                                    .find('.ah-tab .ah-tab-item')
                                    .eq(o)
                                    .attr('data-ah-tab-active', 'true'),
                                r
                                    .find(
                                        '.ah-tab-overflow-wrapper .ah-tab-item'
                                    )
                                    .eq(o)
                                    .attr('data-ah-tab-active', 'true'),
                                i(r);
                        }
                        return e;
                    }),
                        t('<div>', {
                            class: 'ah-tab-overflow-wrapper',
                            append: t('<button>', {
                                type: 'menu',
                                class: 'ah-tab-overflow-menu'
                            }).add(
                                t('<div>', {
                                    class: 'ah-tab-overflow-list',
                                    append: o.clone(!0, !0).removeAttr('style')
                                })
                            )
                        }).appendTo(e),
                        i(e);
                    var r = void 0;
                    t(window).bind('resize', function () {
                        r && clearTimeout(r),
                            (r = setTimeout(function () {
                                i(e);
                            }, 20));
                    });
                })(t(this));
            });
        };
    })(jQuery),
    (function (t) {
        t.fn.theiaStickySidebar = function (e) {
            function n(e, n) {
                return (
                    !0 === e.initialized ||
                    (!(t('body').width() < e.minWidth) &&
                        ((function (e, n) {
                            (e.initialized = !0),
                                0 ===
                                    t(
                                        '#theia-sticky-sidebar-stylesheet-' +
                                            e.namespace
                                    ).length &&
                                    t('head').append(
                                        t(
                                            '<style id="theia-sticky-sidebar-stylesheet-' +
                                                e.namespace +
                                                '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'
                                        )
                                    ),
                                n.each(function () {
                                    function n() {
                                        (r.fixedScrollTop = 0),
                                            r.sidebar.css({
                                                'min-height': '1px'
                                            }),
                                            r.stickySidebar.css({
                                                position: 'static',
                                                width: '',
                                                transform: 'none'
                                            });
                                    }
                                    function o(e) {
                                        var n = e.height();
                                        return (
                                            e.children().each(function () {
                                                n = Math.max(
                                                    n,
                                                    t(this).height()
                                                );
                                            }),
                                            n
                                        );
                                    }
                                    var r = {};
                                    if (
                                        ((r.sidebar = t(this)),
                                        (r.options = e || {}),
                                        (r.container = t(
                                            r.options.containerSelector
                                        )),
                                        0 == r.container.length &&
                                            (r.container = r.sidebar.parent()),
                                        r.sidebar
                                            .parents()
                                            .css('-webkit-transform', 'none'),
                                        r.sidebar.css({
                                            position: r.options.defaultPosition,
                                            overflow: 'visible',
                                            '-webkit-box-sizing': 'border-box',
                                            '-moz-box-sizing': 'border-box',
                                            'box-sizing': 'border-box'
                                        }),
                                        (r.stickySidebar = r.sidebar.find(
                                            '.theiaStickySidebar'
                                        )),
                                        0 == r.stickySidebar.length)
                                    ) {
                                        var s =
                                            /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                                        r.sidebar
                                            .find('script')
                                            .filter(function (t, e) {
                                                return (
                                                    0 === e.type.length ||
                                                    e.type.match(s)
                                                );
                                            })
                                            .remove(),
                                            (r.stickySidebar = t('<div>')
                                                .addClass('theiaStickySidebar')
                                                .append(r.sidebar.children())),
                                            r.sidebar.append(r.stickySidebar);
                                    }
                                    (r.marginBottom = parseInt(
                                        r.sidebar.css('margin-bottom')
                                    )),
                                        (r.paddingTop = parseInt(
                                            r.sidebar.css('padding-top')
                                        )),
                                        (r.paddingBottom = parseInt(
                                            r.sidebar.css('padding-bottom')
                                        ));
                                    var a = r.stickySidebar.offset().top,
                                        l = r.stickySidebar.outerHeight();
                                    r.stickySidebar.css('padding-top', 1),
                                        r.stickySidebar.css(
                                            'padding-bottom',
                                            1
                                        ),
                                        (a -= r.stickySidebar.offset().top),
                                        (l =
                                            r.stickySidebar.outerHeight() -
                                            l -
                                            a),
                                        0 == a
                                            ? (r.stickySidebar.css(
                                                  'padding-top',
                                                  0
                                              ),
                                              (r.stickySidebarPaddingTop = 0))
                                            : (r.stickySidebarPaddingTop = 1),
                                        0 == l
                                            ? (r.stickySidebar.css(
                                                  'padding-bottom',
                                                  0
                                              ),
                                              (r.stickySidebarPaddingBottom = 0))
                                            : (r.stickySidebarPaddingBottom = 1),
                                        (r.previousScrollTop = null),
                                        (r.fixedScrollTop = 0),
                                        n(),
                                        (r.onScroll = function (r) {
                                            if (
                                                r.stickySidebar.is(':visible')
                                            ) {
                                                if (
                                                    t('body').width() <
                                                    r.options.minWidth
                                                )
                                                    return void n();
                                                if (
                                                    r.options
                                                        .disableOnResponsiveLayouts
                                                )
                                                    if (
                                                        r.sidebar.outerWidth(
                                                            'none' ==
                                                                r.sidebar.css(
                                                                    'float'
                                                                )
                                                        ) +
                                                            50 >
                                                        r.container.width()
                                                    )
                                                        return void n();
                                                var s = t(document).scrollTop(),
                                                    a = 'static';
                                                if (
                                                    s >=
                                                    r.sidebar.offset().top +
                                                        (r.paddingTop -
                                                            r.options
                                                                .additionalMarginTop)
                                                ) {
                                                    var l,
                                                        c =
                                                            r.paddingTop +
                                                            e.additionalMarginTop,
                                                        u =
                                                            r.paddingBottom +
                                                            r.marginBottom +
                                                            e.additionalMarginBottom,
                                                        d =
                                                            r.sidebar.offset()
                                                                .top,
                                                        h =
                                                            r.sidebar.offset()
                                                                .top +
                                                            o(r.container),
                                                        f =
                                                            0 +
                                                            e.additionalMarginTop;
                                                    l =
                                                        r.stickySidebar.outerHeight() +
                                                            c +
                                                            u <
                                                        t(window).height()
                                                            ? f +
                                                              r.stickySidebar.outerHeight()
                                                            : t(
                                                                  window
                                                              ).height() -
                                                              r.marginBottom -
                                                              r.paddingBottom -
                                                              e.additionalMarginBottom;
                                                    var p =
                                                            d -
                                                            s +
                                                            r.paddingTop,
                                                        m =
                                                            h -
                                                            s -
                                                            r.paddingBottom -
                                                            r.marginBottom,
                                                        g =
                                                            r.stickySidebar.offset()
                                                                .top - s,
                                                        v =
                                                            r.previousScrollTop -
                                                            s;
                                                    'fixed' ==
                                                        r.stickySidebar.css(
                                                            'position'
                                                        ) &&
                                                        'modern' ==
                                                            r.options
                                                                .sidebarBehavior &&
                                                        (g += v),
                                                        'stick-to-top' ==
                                                            r.options
                                                                .sidebarBehavior &&
                                                            (g =
                                                                e.additionalMarginTop),
                                                        'stick-to-bottom' ==
                                                            r.options
                                                                .sidebarBehavior &&
                                                            (g =
                                                                l -
                                                                r.stickySidebar.outerHeight()),
                                                        (g =
                                                            v > 0
                                                                ? Math.min(g, f)
                                                                : Math.max(
                                                                      g,
                                                                      l -
                                                                          r.stickySidebar.outerHeight()
                                                                  )),
                                                        (g = Math.max(g, p)),
                                                        (g = Math.min(
                                                            g,
                                                            m -
                                                                r.stickySidebar.outerHeight()
                                                        ));
                                                    var w =
                                                        r.container.height() ==
                                                        r.stickySidebar.outerHeight();
                                                    a =
                                                        (!w && g == f) ||
                                                        (!w &&
                                                            g ==
                                                                l -
                                                                    r.stickySidebar.outerHeight())
                                                            ? 'fixed'
                                                            : s +
                                                                  g -
                                                                  r.sidebar.offset()
                                                                      .top -
                                                                  r.paddingTop <=
                                                              e.additionalMarginTop
                                                            ? 'static'
                                                            : 'absolute';
                                                }
                                                if ('fixed' == a) {
                                                    var y =
                                                        t(
                                                            document
                                                        ).scrollLeft();
                                                    r.stickySidebar.css({
                                                        position: 'fixed',
                                                        width:
                                                            i(r.stickySidebar) +
                                                            'px',
                                                        transform:
                                                            'translateY(' +
                                                            g +
                                                            'px)',
                                                        left:
                                                            r.sidebar.offset()
                                                                .left +
                                                            parseInt(
                                                                r.sidebar.css(
                                                                    'padding-left'
                                                                )
                                                            ) -
                                                            y +
                                                            'px',
                                                        top: '0px'
                                                    });
                                                } else if ('absolute' == a) {
                                                    var b = {};
                                                    'absolute' !=
                                                        r.stickySidebar.css(
                                                            'position'
                                                        ) &&
                                                        ((b.position =
                                                            'absolute'),
                                                        (b.transform =
                                                            'translateY(' +
                                                            (s +
                                                                g -
                                                                r.sidebar.offset()
                                                                    .top -
                                                                r.stickySidebarPaddingTop -
                                                                r.stickySidebarPaddingBottom) +
                                                            'px)'),
                                                        (b.top = '0px')),
                                                        (b.width =
                                                            i(r.stickySidebar) +
                                                            'px'),
                                                        (b.left = ''),
                                                        r.stickySidebar.css(b);
                                                } else 'static' == a && n();
                                                'static' != a &&
                                                    1 ==
                                                        r.options
                                                            .updateSidebarHeight &&
                                                    r.sidebar.css({
                                                        'min-height':
                                                            r.stickySidebar.outerHeight() +
                                                            r.stickySidebar.offset()
                                                                .top -
                                                            r.sidebar.offset()
                                                                .top +
                                                            r.paddingBottom
                                                    }),
                                                    (r.previousScrollTop = s);
                                            }
                                        }),
                                        r.onScroll(r),
                                        t(document).on(
                                            'scroll.' + r.options.namespace,
                                            (function (t) {
                                                return function () {
                                                    t.onScroll(t);
                                                };
                                            })(r)
                                        ),
                                        t(window).on(
                                            'resize.' + r.options.namespace,
                                            (function (t) {
                                                return function () {
                                                    t.stickySidebar.css({
                                                        position: 'static'
                                                    }),
                                                        t.onScroll(t);
                                                };
                                            })(r)
                                        ),
                                        'undefined' != typeof ResizeSensor &&
                                            new ResizeSensor(
                                                r.stickySidebar[0],
                                                (function (t) {
                                                    return function () {
                                                        t.onScroll(t);
                                                    };
                                                })(r)
                                            );
                                });
                        })(e, n),
                        !0))
                );
            }
            function i(t) {
                var e;
                try {
                    e = t[0].getBoundingClientRect().width;
                } catch (t) {}
                return void 0 === e && (e = t.width()), e;
            }
            return (
                ((e = t.extend(
                    {
                        containerSelector: '',
                        additionalMarginTop: 0,
                        additionalMarginBottom: 0,
                        updateSidebarHeight: !0,
                        minWidth: 0,
                        disableOnResponsiveLayouts: !0,
                        sidebarBehavior: 'modern',
                        defaultPosition: 'relative',
                        namespace: 'TSS'
                    },
                    e
                )).additionalMarginTop = parseInt(e.additionalMarginTop) || 0),
                (e.additionalMarginBottom =
                    parseInt(e.additionalMarginBottom) || 0),
                (function (e, i) {
                    n(e, i) ||
                        (console.log(
                            'TSS: Body width smaller than options.minWidth. Init is delayed.'
                        ),
                        t(document).on(
                            'scroll.' + e.namespace,
                            (function (e, i) {
                                return function (o) {
                                    n(e, i) && t(this).unbind(o);
                                };
                            })(e, i)
                        ),
                        t(window).on(
                            'resize.' + e.namespace,
                            (function (e, i) {
                                return function (o) {
                                    n(e, i) && t(this).unbind(o);
                                };
                            })(e, i)
                        ));
                })(e, this),
                this
            );
        };
    })(jQuery),
    (function (t, e, n, i) {
        function o(t, e) {
            return t[e] === i ? w[e] : t[e];
        }
        function r() {
            var t = e.pageYOffset;
            return t === i ? v.scrollTop : t;
        }
        function s(t, e) {
            var n = w['on' + t];
            n &&
                (_(n)
                    ? n.call(e[0])
                    : (n.addClass && e.addClass(n.addClass),
                      n.removeClass && e.removeClass(n.removeClass))),
                e.trigger('lazy' + t, [e]),
                u();
        }
        function a(e) {
            s(e.type, t(this).off(m, a));
        }
        function l(n) {
            if (k.length) {
                (n = n || w.forceLoad), (T = 1 / 0);
                var i,
                    o,
                    l = r(),
                    c = e.innerHeight || v.clientHeight,
                    u = e.innerWidth || v.clientWidth;
                for (i = 0, o = k.length; o > i; i++) {
                    var d,
                        h = k[i],
                        g = h[0],
                        y = h[f],
                        b = !1,
                        x = n || C(g, p) < 0;
                    if (t.contains(v, g)) {
                        if (
                            n ||
                            !y.visibleOnly ||
                            g.offsetWidth ||
                            g.offsetHeight
                        ) {
                            if (!x) {
                                var E = g.getBoundingClientRect(),
                                    S = y.edgeX,
                                    A = y.edgeY;
                                x =
                                    l >= (d = E.top + l - A - c) &&
                                    E.bottom > -A &&
                                    E.left <= u + S &&
                                    E.right > -S;
                            }
                            if (x) {
                                h.on(m, a), s('show', h);
                                var D = y.srcAttr,
                                    I = _(D) ? D(h) : g.getAttribute(D);
                                I && (g.src = I), (b = !0);
                            } else T > d && (T = d);
                        }
                    } else b = !0;
                    b && (C(g, p, 0), k.splice(i--, 1), o--);
                }
                o || s('complete', t(v));
            }
        }
        function c() {
            E > 1 ? ((E = 1), l(), setTimeout(c, w.throttle)) : (E = 0);
        }
        function u(t) {
            k.length &&
                ((t &&
                    'scroll' === t.type &&
                    t.currentTarget === e &&
                    T >= r()) ||
                    (E || setTimeout(c, 0), (E = 2)));
        }
        function d() {
            b.lazyLoadXT();
        }
        function h() {
            l(!0);
        }
        var f = 'lazyLoadXT',
            p = 'lazied',
            m = 'load error',
            g = 'lazy-hidden',
            v = n.documentElement || n.body,
            w = {
                autoInit: !0,
                selector: 'img[data-src]',
                blankImage:
                    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                throttle: 99,
                forceLoad:
                    e.onscroll === i ||
                    !!e.operamini ||
                    !v.getBoundingClientRect,
                loadEvent: 'pageshow',
                updateEvent:
                    'load orientationchange resize scroll touchmove focus',
                forceEvent: 'lazyloadall',
                oninit: {removeClass: 'lazy'},
                onshow: {addClass: g},
                onload: {removeClass: g, addClass: 'lazy-loaded'},
                onerror: {removeClass: g},
                checkDuplicates: !0
            },
            y = {srcAttr: 'data-src', edgeX: 0, edgeY: 0, visibleOnly: !0},
            b = t(e),
            _ = t.isFunction,
            x = t.extend,
            C =
                t.data ||
                function (e, n) {
                    return t(e).data(n);
                },
            k = [],
            T = 0,
            E = 0;
        (t[f] = x(w, y, t[f])),
            (t.fn[f] = function (n) {
                var i,
                    r = o((n = n || {}), 'blankImage'),
                    a = o(n, 'checkDuplicates'),
                    l = o(n, 'scrollContainer'),
                    c = o(n, 'show'),
                    d = {};
                for (i in (t(l).on('scroll', u), y)) d[i] = o(n, i);
                return this.each(function (i, o) {
                    if (o === e) t(w.selector).lazyLoadXT(n);
                    else {
                        var l = a && C(o, p),
                            h = t(o).data(p, c ? -1 : 1);
                        if (l) return void u();
                        r && 'IMG' === o.tagName && !o.src && (o.src = r),
                            (h[f] = x({}, d)),
                            s('init', h),
                            k.push(h),
                            u();
                    }
                });
            }),
            t(n).ready(function () {
                s('start', b),
                    b.on(w.updateEvent, u).on(w.forceEvent, h),
                    t(n).on(w.updateEvent, u),
                    w.autoInit && (b.on(w.loadEvent, d), d());
            });
    })(window.jQuery || window.Zepto || window.$, window, document),
    (function () {
        'use strict';
        function t(t) {
            t.fn._fadeIn = t.fn.fadeIn;
            var e = t.noop || function () {},
                n = /MSIE/.test(navigator.userAgent),
                i =
                    /MSIE 6.0/.test(navigator.userAgent) &&
                    !/MSIE 8.0/.test(navigator.userAgent),
                o =
                    (document.documentMode,
                    t.isFunction(
                        document.createElement('div').style.setExpression
                    ));
            (t.blockUI = function (t) {
                a(window, t);
            }),
                (t.unblockUI = function (t) {
                    l(window, t);
                }),
                (t.growlUI = function (e, n, i, o) {
                    var r = t('<div class="growlUI"></div>');
                    e && r.append('<h1>' + e + '</h1>'),
                        n && r.append('<h2>' + n + '</h2>'),
                        void 0 === i && (i = 3e3);
                    var s = function (e) {
                        (e = e || {}),
                            t.blockUI({
                                message: r,
                                fadeIn: void 0 !== e.fadeIn ? e.fadeIn : 700,
                                fadeOut: void 0 !== e.fadeOut ? e.fadeOut : 1e3,
                                timeout: void 0 !== e.timeout ? e.timeout : i,
                                centerY: !1,
                                showOverlay: !1,
                                onUnblock: o,
                                css: t.blockUI.defaults.growlCSS
                            });
                    };
                    s();
                    r.css('opacity');
                    r.mouseover(function () {
                        s({fadeIn: 0, timeout: 3e4});
                        var e = t('.blockMsg');
                        e.stop(), e.fadeTo(300, 1);
                    }).mouseout(function () {
                        t('.blockMsg').fadeOut(1e3);
                    });
                }),
                (t.fn.block = function (e) {
                    if (this[0] === window) return t.blockUI(e), this;
                    var n = t.extend({}, t.blockUI.defaults, e || {});
                    return (
                        this.each(function () {
                            var e = t(this);
                            (n.ignoreIfBlocked &&
                                e.data('blockUI.isBlocked')) ||
                                e.unblock({fadeOut: 0});
                        }),
                        this.each(function () {
                            'static' == t.css(this, 'position') &&
                                ((this.style.position = 'relative'),
                                t(this).data('blockUI.static', !0)),
                                (this.style.zoom = 1),
                                a(this, e);
                        })
                    );
                }),
                (t.fn.unblock = function (e) {
                    return this[0] === window
                        ? (t.unblockUI(e), this)
                        : this.each(function () {
                              l(this, e);
                          });
                }),
                (t.blockUI.version = 2.7),
                (t.blockUI.defaults = {
                    message: '<h1>Please wait...</h1>',
                    title: null,
                    draggable: !0,
                    theme: !1,
                    css: {
                        padding: 0,
                        margin: 0,
                        width: '30%',
                        top: '40%',
                        left: '35%',
                        textAlign: 'center',
                        color: '#000',
                        border: '3px solid #aaa',
                        backgroundColor: '#fff',
                        cursor: 'wait'
                    },
                    themedCSS: {width: '30%', top: '40%', left: '35%'},
                    overlayCSS: {
                        backgroundColor: '#000',
                        opacity: 0.6,
                        cursor: 'wait'
                    },
                    cursorReset: 'default',
                    growlCSS: {
                        width: '350px',
                        top: '10px',
                        left: '',
                        right: '10px',
                        border: 'none',
                        padding: '5px',
                        opacity: 0.6,
                        cursor: 'default',
                        color: '#fff',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        'border-radius': '10px'
                    },
                    iframeSrc: /^https/i.test(window.location.href || '')
                        ? 'javascript:false'
                        : 'about:blank',
                    forceIframe: !1,
                    baseZ: 1e3,
                    centerX: !0,
                    centerY: !0,
                    allowBodyStretch: !0,
                    bindEvents: !0,
                    constrainTabKey: !0,
                    fadeIn: 200,
                    fadeOut: 400,
                    timeout: 0,
                    showOverlay: !0,
                    focusInput: !0,
                    focusableElements: ':input:enabled:visible',
                    onBlock: null,
                    onUnblock: null,
                    onOverlayClick: null,
                    quirksmodeOffsetHack: 4,
                    blockMsgClass: 'blockMsg',
                    ignoreIfBlocked: !1
                });
            var r = null,
                s = [];
            function a(a, c) {
                var d,
                    p,
                    m = a == window,
                    g = c && void 0 !== c.message ? c.message : void 0;
                if (
                    !(c = t.extend({}, t.blockUI.defaults, c || {}))
                        .ignoreIfBlocked ||
                    !t(a).data('blockUI.isBlocked')
                ) {
                    if (
                        ((c.overlayCSS = t.extend(
                            {},
                            t.blockUI.defaults.overlayCSS,
                            c.overlayCSS || {}
                        )),
                        (d = t.extend({}, t.blockUI.defaults.css, c.css || {})),
                        c.onOverlayClick && (c.overlayCSS.cursor = 'pointer'),
                        (p = t.extend(
                            {},
                            t.blockUI.defaults.themedCSS,
                            c.themedCSS || {}
                        )),
                        (g = void 0 === g ? c.message : g),
                        m && r && l(window, {fadeOut: 0}),
                        g && 'string' != typeof g && (g.parentNode || g.jquery))
                    ) {
                        var v = g.jquery ? g[0] : g,
                            w = {};
                        t(a).data('blockUI.history', w),
                            (w.el = v),
                            (w.parent = v.parentNode),
                            (w.display = v.style.display),
                            (w.position = v.style.position),
                            w.parent && w.parent.removeChild(v);
                    }
                    t(a).data('blockUI.onUnblock', c.onUnblock);
                    var y,
                        b,
                        _,
                        x,
                        C = c.baseZ;
                    (y =
                        n || c.forceIframe
                            ? t(
                                  '<iframe class="blockUI" style="z-index:' +
                                      C++ +
                                      ';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' +
                                      c.iframeSrc +
                                      '"></iframe>'
                              )
                            : t(
                                  '<div class="blockUI" style="display:none"></div>'
                              )),
                        (b = c.theme
                            ? t(
                                  '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' +
                                      C++ +
                                      ';display:none"></div>'
                              )
                            : t(
                                  '<div class="blockUI blockOverlay" style="z-index:' +
                                      C++ +
                                      ';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'
                              )),
                        c.theme && m
                            ? ((x =
                                  '<div class="blockUI ' +
                                  c.blockMsgClass +
                                  ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' +
                                  (C + 10) +
                                  ';display:none;position:fixed">'),
                              c.title &&
                                  (x +=
                                      '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                                      (c.title || '&nbsp;') +
                                      '</div>'),
                              (x +=
                                  '<div class="ui-widget-content ui-dialog-content"></div>'),
                              (x += '</div>'))
                            : c.theme
                            ? ((x =
                                  '<div class="blockUI ' +
                                  c.blockMsgClass +
                                  ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' +
                                  (C + 10) +
                                  ';display:none;position:absolute">'),
                              c.title &&
                                  (x +=
                                      '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' +
                                      (c.title || '&nbsp;') +
                                      '</div>'),
                              (x +=
                                  '<div class="ui-widget-content ui-dialog-content"></div>'),
                              (x += '</div>'))
                            : (x = m
                                  ? '<div class="blockUI ' +
                                    c.blockMsgClass +
                                    ' blockPage" style="z-index:' +
                                    (C + 10) +
                                    ';display:none;position:fixed"></div>'
                                  : '<div class="blockUI ' +
                                    c.blockMsgClass +
                                    ' blockElement" style="z-index:' +
                                    (C + 10) +
                                    ';display:none;position:absolute"></div>'),
                        (_ = t(x)),
                        g &&
                            (c.theme
                                ? (_.css(p), _.addClass('ui-widget-content'))
                                : _.css(d)),
                        c.theme || b.css(c.overlayCSS),
                        b.css('position', m ? 'fixed' : 'absolute'),
                        (n || c.forceIframe) && y.css('opacity', 0);
                    var k = [y, b, _],
                        T = t(m ? 'body' : a);
                    t.each(k, function () {
                        this.appendTo(T);
                    }),
                        c.theme &&
                            c.draggable &&
                            t.fn.draggable &&
                            _.draggable({
                                handle: '.ui-dialog-titlebar',
                                cancel: 'li'
                            });
                    var E =
                        o &&
                        (!t.support.boxModel ||
                            t('object,embed', m ? null : a).length > 0);
                    if (i || E) {
                        if (
                            (m &&
                                c.allowBodyStretch &&
                                t.support.boxModel &&
                                t('html,body').css('height', '100%'),
                            (i || !t.support.boxModel) && !m)
                        )
                            var S = f(a, 'borderTopWidth'),
                                A = f(a, 'borderLeftWidth'),
                                D = S ? '(0 - ' + S + ')' : 0,
                                I = A ? '(0 - ' + A + ')' : 0;
                        t.each(k, function (t, e) {
                            var n = e[0].style;
                            if (((n.position = 'absolute'), t < 2))
                                m
                                    ? n.setExpression(
                                          'height',
                                          'Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:' +
                                              c.quirksmodeOffsetHack +
                                              ') + "px"'
                                      )
                                    : n.setExpression(
                                          'height',
                                          'this.parentNode.offsetHeight + "px"'
                                      ),
                                    m
                                        ? n.setExpression(
                                              'width',
                                              'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'
                                          )
                                        : n.setExpression(
                                              'width',
                                              'this.parentNode.offsetWidth + "px"'
                                          ),
                                    I && n.setExpression('left', I),
                                    D && n.setExpression('top', D);
                            else if (c.centerY)
                                m &&
                                    n.setExpression(
                                        'top',
                                        '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'
                                    ),
                                    (n.marginTop = 0);
                            else if (!c.centerY && m) {
                                var i =
                                    '((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + ' +
                                    (c.css && c.css.top
                                        ? parseInt(c.css.top, 10)
                                        : 0) +
                                    ') + "px"';
                                n.setExpression('top', i);
                            }
                        });
                    }
                    if (
                        (g &&
                            (c.theme
                                ? _.find('.ui-widget-content').append(g)
                                : _.append(g),
                            (g.jquery || g.nodeType) && t(g).show()),
                        (n || c.forceIframe) && c.showOverlay && y.show(),
                        c.fadeIn)
                    ) {
                        var O = c.onBlock ? c.onBlock : e,
                            N = c.showOverlay && !g ? O : e,
                            L = g ? O : e;
                        c.showOverlay && b._fadeIn(c.fadeIn, N),
                            g && _._fadeIn(c.fadeIn, L);
                    } else
                        c.showOverlay && b.show(),
                            g && _.show(),
                            c.onBlock && c.onBlock.bind(_)();
                    if (
                        (u(1, a, c),
                        m
                            ? ((r = _[0]),
                              (s = t(c.focusableElements, r)),
                              c.focusInput && setTimeout(h, 20))
                            : (function (t, e, n) {
                                  var i = t.parentNode,
                                      o = t.style,
                                      r =
                                          (i.offsetWidth - t.offsetWidth) / 2 -
                                          f(i, 'borderLeftWidth'),
                                      s =
                                          (i.offsetHeight - t.offsetHeight) /
                                              2 -
                                          f(i, 'borderTopWidth');
                                  e && (o.left = r > 0 ? r + 'px' : '0');
                                  n && (o.top = s > 0 ? s + 'px' : '0');
                              })(_[0], c.centerX, c.centerY),
                        c.timeout)
                    ) {
                        var j = setTimeout(function () {
                            m ? t.unblockUI(c) : t(a).unblock(c);
                        }, c.timeout);
                        t(a).data('blockUI.timeout', j);
                    }
                }
            }
            function l(e, n) {
                var i,
                    o,
                    a = e == window,
                    l = t(e),
                    d = l.data('blockUI.history'),
                    h = l.data('blockUI.timeout');
                h && (clearTimeout(h), l.removeData('blockUI.timeout')),
                    (n = t.extend({}, t.blockUI.defaults, n || {})),
                    u(0, e, n),
                    null === n.onUnblock &&
                        ((n.onUnblock = l.data('blockUI.onUnblock')),
                        l.removeData('blockUI.onUnblock')),
                    (o = a
                        ? t('body')
                              .children()
                              .filter('.blockUI')
                              .add('body > .blockUI')
                        : l.find('>.blockUI')),
                    n.cursorReset &&
                        (o.length > 1 && (o[1].style.cursor = n.cursorReset),
                        o.length > 2 && (o[2].style.cursor = n.cursorReset)),
                    a && (r = s = null),
                    n.fadeOut
                        ? ((i = o.length),
                          o.stop().fadeOut(n.fadeOut, function () {
                              0 == --i && c(o, d, n, e);
                          }))
                        : c(o, d, n, e);
            }
            function c(e, n, i, o) {
                var r = t(o);
                if (!r.data('blockUI.isBlocked')) {
                    e.each(function (t, e) {
                        this.parentNode && this.parentNode.removeChild(this);
                    }),
                        n &&
                            n.el &&
                            ((n.el.style.display = n.display),
                            (n.el.style.position = n.position),
                            (n.el.style.cursor = 'default'),
                            n.parent && n.parent.appendChild(n.el),
                            r.removeData('blockUI.history')),
                        r.data('blockUI.static') && r.css('position', 'static'),
                        'function' == typeof i.onUnblock && i.onUnblock(o, i);
                    var s = t(document.body),
                        a = s.width(),
                        l = s[0].style.width;
                    s.width(a - 1).width(a), (s[0].style.width = l);
                }
            }
            function u(e, n, i) {
                var o = n == window,
                    s = t(n);
                if (
                    (e || ((!o || r) && (o || s.data('blockUI.isBlocked')))) &&
                    (s.data('blockUI.isBlocked', e),
                    o && i.bindEvents && (!e || i.showOverlay))
                ) {
                    var a =
                        'mousedown mouseup keydown keypress keyup touchstart touchend touchmove';
                    e ? t(document).bind(a, i, d) : t(document).unbind(a, d);
                }
            }
            function d(e) {
                if (
                    'keydown' === e.type &&
                    e.keyCode &&
                    9 == e.keyCode &&
                    r &&
                    e.data.constrainTabKey
                ) {
                    var n = s,
                        i = !e.shiftKey && e.target === n[n.length - 1],
                        o = e.shiftKey && e.target === n[0];
                    if (i || o)
                        return (
                            setTimeout(function () {
                                h(o);
                            }, 10),
                            !1
                        );
                }
                var a = e.data,
                    l = t(e.target);
                return (
                    l.hasClass('blockOverlay') &&
                        a.onOverlayClick &&
                        a.onOverlayClick(e),
                    l.parents('div.' + a.blockMsgClass).length > 0 ||
                        0 ===
                            l.parents().children().filter('div.blockUI').length
                );
            }
            function h(t) {
                if (s) {
                    var e = s[!0 === t ? s.length - 1 : 0];
                    e && e.focus();
                }
            }
            function f(e, n) {
                return parseInt(t.css(e, n), 10) || 0;
            }
        }
        'function' == typeof define && define.amd && define.amd.jQuery
            ? define(['jquery'], t)
            : t(jQuery);
    })(),
    (function (t, e) {
        'object' ==
            ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) &&
        'undefined' != typeof module
            ? (module.exports = e())
            : 'function' == typeof define && define.amd
            ? define(e)
            : (t.Sweetalert2 = e());
    })(this, function () {
        'use strict';
        function t(e) {
            return (t =
                'function' == typeof Symbol &&
                'symbol' == _typeof(Symbol.iterator)
                    ? function (t) {
                          return _typeof(t);
                      }
                    : function (t) {
                          return t &&
                              'function' == typeof Symbol &&
                              t.constructor === Symbol &&
                              t !== Symbol.prototype
                              ? 'symbol'
                              : _typeof(t);
                      })(e);
        }
        function e(t, e) {
            if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function');
        }
        function n(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                (i.enumerable = i.enumerable || !1),
                    (i.configurable = !0),
                    'value' in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i);
            }
        }
        function i(t, e, i) {
            return e && n(t.prototype, e), i && n(t, i), t;
        }
        function o() {
            return (o =
                Object.assign ||
                function (t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)
                            Object.prototype.hasOwnProperty.call(n, i) &&
                                (t[i] = n[i]);
                    }
                    return t;
                }).apply(this, arguments);
        }
        function r(t) {
            return (r = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function (t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        function s(t, e) {
            return (s =
                Object.setPrototypeOf ||
                function (t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function a(t, e, n) {
            return (a = (function () {
                if ('undefined' == typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham) return !1;
                if ('function' == typeof Proxy) return !0;
                try {
                    return (
                        Date.prototype.toString.call(
                            Reflect.construct(Date, [], function () {})
                        ),
                        !0
                    );
                } catch (t) {
                    return !1;
                }
            })()
                ? Reflect.construct
                : function (t, e, n) {
                      var i = [null];
                      i.push.apply(i, e);
                      var o = new (Function.bind.apply(t, i))();
                      return n && s(o, n.prototype), o;
                  }).apply(null, arguments);
        }
        function l(t, e) {
            return !e || ('object' != _typeof(e) && 'function' != typeof e)
                ? (function (t) {
                      if (void 0 === t)
                          throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called"
                          );
                      return t;
                  })(t)
                : e;
        }
        function c(t, e, n) {
            return (c =
                'undefined' != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function (t, e, n) {
                          var i = (function (t, e) {
                              for (
                                  ;
                                  !Object.prototype.hasOwnProperty.call(t, e) &&
                                  null !== (t = r(t));

                              );
                              return t;
                          })(t, e);
                          if (i) {
                              var o = Object.getOwnPropertyDescriptor(i, e);
                              return o.get ? o.get.call(n) : o.value;
                          }
                      })(t, e, n || t);
        }
        function u(t) {
            return Object.keys(t).map(function (e) {
                return t[e];
            });
        }
        function d(t) {
            return Array.prototype.slice.call(t);
        }
        function h(t) {
            console.error(''.concat(v, ' ').concat(t));
        }
        function f(t, e) {
            !(function (t) {
                -1 === y.indexOf(t) && (y.push(t), w(t));
            })(
                '"'
                    .concat(
                        t,
                        '" is deprecated and will be removed in the next major release. Please use "'
                    )
                    .concat(e, '" instead.')
            );
        }
        function p(t) {
            return t && Promise.resolve(t) === t;
        }
        function m(t) {
            var e = {};
            for (var n in t) e[t[n]] = 'swal2-' + t[n];
            return e;
        }
        function g(t, e, n) {
            d(t.classList).forEach(function (e) {
                -1 === u(x).indexOf(e) &&
                    -1 === u(C).indexOf(e) &&
                    t.classList.remove(e);
            }),
                e && e[n] && nt(t, e[n]);
        }
        var v = 'SweetAlert2:',
            w = function (t) {
                console.warn(''.concat(v, ' ').concat(t));
            },
            y = [],
            b = function (t) {
                return 'function' == typeof t ? t() : t;
            },
            _ = Object.freeze({
                cancel: 'cancel',
                backdrop: 'backdrop',
                close: 'close',
                esc: 'esc',
                timer: 'timer'
            }),
            x = m([
                'container',
                'shown',
                'height-auto',
                'iosfix',
                'popup',
                'modal',
                'no-backdrop',
                'toast',
                'toast-shown',
                'toast-column',
                'fade',
                'show',
                'hide',
                'noanimation',
                'close',
                'title',
                'header',
                'content',
                'actions',
                'confirm',
                'cancel',
                'footer',
                'icon',
                'image',
                'input',
                'file',
                'range',
                'select',
                'radio',
                'checkbox',
                'label',
                'textarea',
                'inputerror',
                'validation-message',
                'progress-steps',
                'active-progress-step',
                'progress-step',
                'progress-step-line',
                'loading',
                'styled',
                'top',
                'top-start',
                'top-end',
                'top-left',
                'top-right',
                'center',
                'center-start',
                'center-end',
                'center-left',
                'center-right',
                'bottom',
                'bottom-start',
                'bottom-end',
                'bottom-left',
                'bottom-right',
                'grow-row',
                'grow-column',
                'grow-fullscreen',
                'rtl'
            ]),
            C = m(['success', 'warning', 'info', 'question', 'error']),
            k = {previousBodyPadding: null},
            T = function (t, e) {
                return t.classList.contains(e);
            };
        function E(t, e) {
            if (!e) return null;
            switch (e) {
                case 'select':
                case 'textarea':
                case 'file':
                    return ot(t, x[e]);
                case 'checkbox':
                    return t.querySelector('.'.concat(x.checkbox, ' input'));
                case 'radio':
                    return (
                        t.querySelector(
                            '.'.concat(x.radio, ' input:checked')
                        ) ||
                        t.querySelector(
                            '.'.concat(x.radio, ' input:first-child')
                        )
                    );
                case 'range':
                    return t.querySelector('.'.concat(x.range, ' input'));
                default:
                    return ot(t, x.input);
            }
        }
        function S(t) {
            if ((t.focus(), 'file' !== t.type)) {
                var e = t.value;
                (t.value = ''), (t.value = e);
            }
        }
        function A(t, e, n) {
            t &&
                e &&
                ('string' == typeof e && (e = e.split(/\s+/).filter(Boolean)),
                e.forEach(function (e) {
                    t.forEach
                        ? t.forEach(function (t) {
                              n ? t.classList.add(e) : t.classList.remove(e);
                          })
                        : n
                        ? t.classList.add(e)
                        : t.classList.remove(e);
                }));
        }
        function D(t, e, n) {
            n || 0 === parseInt(n)
                ? (t.style[e] = 'number' == typeof n ? n + 'px' : n)
                : t.style.removeProperty(e);
        }
        function I(t, e) {
            var n = 1 < arguments.length && void 0 !== e ? e : 'flex';
            (t.style.opacity = ''), (t.style.display = n);
        }
        function O(t) {
            (t.style.opacity = ''), (t.style.display = 'none');
        }
        function N(t, e, n) {
            e ? I(t, n) : O(t);
        }
        function L(t) {
            return !(
                !t ||
                !(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
            );
        }
        function j(t) {
            var e = window.getComputedStyle(t),
                n = parseFloat(e.getPropertyValue('animation-duration') || '0'),
                i = parseFloat(
                    e.getPropertyValue('transition-duration') || '0'
                );
            return 0 < n || 0 < i;
        }
        function P() {
            return document.body.querySelector('.' + x.container);
        }
        function $(t) {
            var e = P();
            return e ? e.querySelector(t) : null;
        }
        function B(t) {
            return $('.' + t);
        }
        function H() {
            return d(rt().querySelectorAll('.' + x.icon));
        }
        function M() {
            var t = H().filter(function (t) {
                return L(t);
            });
            return t.length ? t[0] : null;
        }
        function R() {
            return B(x.title);
        }
        function z() {
            return B(x.content);
        }
        function q() {
            return B(x.image);
        }
        function W() {
            return B(x['progress-steps']);
        }
        function U() {
            return B(x['validation-message']);
        }
        function F() {
            return $('.' + x.actions + ' .' + x.confirm);
        }
        function V() {
            return $('.' + x.actions + ' .' + x.cancel);
        }
        function Y() {
            return B(x.actions);
        }
        function Q() {
            return B(x.header);
        }
        function X() {
            return B(x.footer);
        }
        function K() {
            return B(x.close);
        }
        function Z() {
            var t = d(
                    rt().querySelectorAll(
                        '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
                    )
                ).sort(function (t, e) {
                    return (
                        (t = parseInt(t.getAttribute('tabindex'))),
                        (e = parseInt(e.getAttribute('tabindex'))) < t
                            ? 1
                            : t < e
                            ? -1
                            : 0
                    );
                }),
                e = d(
                    rt().querySelectorAll(
                        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'
                    )
                ).filter(function (t) {
                    return '-1' !== t.getAttribute('tabindex');
                });
            return (function (t) {
                for (var e = [], n = 0; n < t.length; n++)
                    -1 === e.indexOf(t[n]) && e.push(t[n]);
                return e;
            })(t.concat(e)).filter(function (t) {
                return L(t);
            });
        }
        function G() {
            return (
                'undefined' == typeof window || 'undefined' == typeof document
            );
        }
        function J(t) {
            Xt.isVisible() &&
                et !== t.target.value &&
                Xt.resetValidationMessage(),
                (et = t.target.value);
        }
        function tt(e, n) {
            e instanceof HTMLElement
                ? n.appendChild(e)
                : 'object' === t(e)
                ? ct(n, e)
                : e && (n.innerHTML = e);
        }
        var et,
            nt = function (t, e) {
                A(t, e, !0);
            },
            it = function (t, e) {
                A(t, e, !1);
            },
            ot = function (t, e) {
                for (var n = 0; n < t.childNodes.length; n++)
                    if (T(t.childNodes[n], e)) return t.childNodes[n];
            },
            rt = function () {
                return B(x.popup);
            },
            st = function () {
                return (
                    !at() && !document.body.classList.contains(x['no-backdrop'])
                );
            },
            at = function () {
                return document.body.classList.contains(x['toast-shown']);
            },
            lt = '\n <div aria-labelledby="'
                .concat(x.title, '" aria-describedby="')
                .concat(x.content, '" class="')
                .concat(x.popup, '" tabindex="-1">\n   <div class="')
                .concat(x.header, '">\n     <ul class="')
                .concat(x['progress-steps'], '"></ul>\n     <div class="')
                .concat(x.icon, ' ')
                .concat(
                    C.error,
                    '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="'
                )
                .concat(x.icon, ' ')
                .concat(C.question, '"></div>\n     <div class="')
                .concat(x.icon, ' ')
                .concat(C.warning, '"></div>\n     <div class="')
                .concat(x.icon, ' ')
                .concat(C.info, '"></div>\n     <div class="')
                .concat(x.icon, ' ')
                .concat(
                    C.success,
                    '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="'
                )
                .concat(x.image, '" />\n     <h2 class="')
                .concat(x.title, '" id="')
                .concat(x.title, '"></h2>\n     <button type="button" class="')
                .concat(
                    x.close,
                    '">&times;</button>\n   </div>\n   <div class="'
                )
                .concat(x.content, '">\n     <div id="')
                .concat(x.content, '"></div>\n     <input class="')
                .concat(x.input, '" />\n     <input type="file" class="')
                .concat(x.file, '" />\n     <div class="')
                .concat(
                    x.range,
                    '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="'
                )
                .concat(x.select, '"></select>\n     <div class="')
                .concat(x.radio, '"></div>\n     <label for="')
                .concat(x.checkbox, '" class="')
                .concat(
                    x.checkbox,
                    '">\n       <input type="checkbox" />\n       <span class="'
                )
                .concat(
                    x.label,
                    '"></span>\n     </label>\n     <textarea class="'
                )
                .concat(x.textarea, '"></textarea>\n     <div class="')
                .concat(x['validation-message'], '" id="')
                .concat(
                    x['validation-message'],
                    '"></div>\n   </div>\n   <div class="'
                )
                .concat(x.actions, '">\n     <button type="button" class="')
                .concat(
                    x.confirm,
                    '">OK</button>\n     <button type="button" class="'
                )
                .concat(
                    x.cancel,
                    '">Cancel</button>\n   </div>\n   <div class="'
                )
                .concat(x.footer, '">\n   </div>\n </div>\n')
                .replace(/(^|\n)\s*/g, ''),
            ct = function (t, e) {
                if (((t.innerHTML = ''), 0 in e))
                    for (var n = 0; n in e; n++)
                        t.appendChild(e[n].cloneNode(!0));
                else t.appendChild(e.cloneNode(!0));
            },
            ut = (function () {
                if (G()) return !1;
                var t = document.createElement('div'),
                    e = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    };
                for (var n in e)
                    if (e.hasOwnProperty(n) && void 0 !== t.style[n])
                        return e[n];
                return !1;
            })();
        function dt(t, e, n) {
            N(t, n['showC' + e.substring(1) + 'Button'], 'inline-block'),
                (t.innerHTML = n[e + 'ButtonText']),
                t.setAttribute('aria-label', n[e + 'ButtonAriaLabel']),
                (t.className = x[e]),
                g(t, n.customClass, e + 'Button'),
                nt(t, n[e + 'ButtonClass']);
        }
        function ht(t, e) {
            (t.placeholder && !e.inputPlaceholder) ||
                (t.placeholder = e.inputPlaceholder);
        }
        var ft = {
                promise: new WeakMap(),
                innerParams: new WeakMap(),
                domCache: new WeakMap()
            },
            pt = function (t, e) {
                var n = E(z(), t);
                if (n)
                    for (var i in ((function (t) {
                        for (var e = 0; e < t.attributes.length; e++) {
                            var n = t.attributes[e].name;
                            -1 === ['type', 'value', 'style'].indexOf(n) &&
                                t.removeAttribute(n);
                        }
                    })(n),
                    e))
                        ('range' === t && 'placeholder' === i) ||
                            n.setAttribute(i, e[i]);
            },
            mt = function (t, e, n) {
                (t.className = e),
                    n.inputClass && nt(t, n.inputClass),
                    n.customClass && nt(t, n.customClass.input);
            },
            gt = {};
        function vt(t, e) {
            var n = W();
            if (!e.progressSteps || 0 === e.progressSteps.length) return O(n);
            I(n), (n.innerHTML = '');
            var i = parseInt(
                null === e.currentProgressStep
                    ? Xt.getQueueStep()
                    : e.currentProgressStep
            );
            i >= e.progressSteps.length &&
                w(
                    'Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)'
                ),
                e.progressSteps.forEach(function (t, o) {
                    var r = (function (t) {
                        var e = document.createElement('li');
                        return nt(e, x['progress-step']), (e.innerHTML = t), e;
                    })(t);
                    if (
                        (n.appendChild(r),
                        o === i && nt(r, x['active-progress-step']),
                        o !== e.progressSteps.length - 1)
                    ) {
                        var s = (function (t) {
                            var e = document.createElement('li');
                            return (
                                nt(e, x['progress-step-line']),
                                t.progressStepsDistance &&
                                    (e.style.width = t.progressStepsDistance),
                                e
                            );
                        })(t);
                        n.appendChild(s);
                    }
                });
        }
        function wt(t, e) {
            !(function (t, e) {
                var n = rt();
                D(n, 'width', e.width),
                    D(n, 'padding', e.padding),
                    e.background && (n.style.background = e.background),
                    (n.className = x.popup),
                    e.toast
                        ? (nt(
                              [document.documentElement, document.body],
                              x['toast-shown']
                          ),
                          nt(n, x.toast))
                        : nt(n, x.modal),
                    g(n, e.customClass, 'popup'),
                    'string' == typeof e.customClass && nt(n, e.customClass),
                    A(n, x.noanimation, !e.animation);
            })(0, e),
                (function (t, e) {
                    var n = P();
                    n &&
                        ((function (t, e) {
                            'string' == typeof e
                                ? (t.style.background = e)
                                : e ||
                                  nt(
                                      [document.documentElement, document.body],
                                      x['no-backdrop']
                                  );
                        })(n, e.backdrop),
                        !e.backdrop &&
                            e.allowOutsideClick &&
                            w(
                                '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
                            ),
                        (function (t, e) {
                            e in x
                                ? nt(t, x[e])
                                : (w(
                                      'The "position" parameter is not valid, defaulting to "center"'
                                  ),
                                  nt(t, x.center));
                        })(n, e.position),
                        (function (t, e) {
                            if (e && 'string' == typeof e) {
                                var n = 'grow-' + e;
                                n in x && nt(t, x[n]);
                            }
                        })(n, e.grow),
                        g(n, e.customClass, 'container'),
                        e.customContainerClass &&
                            nt(n, e.customContainerClass));
                })(0, e),
                (function (t, e) {
                    g(Q(), e.customClass, 'header'),
                        vt(0, e),
                        (function (t, e) {
                            var n = ft.innerParams.get(t);
                            if (n && e.type === n.type && M())
                                g(M(), e.customClass, 'icon');
                            else if ((yt(), e.type))
                                if (
                                    (bt(),
                                    -1 !== Object.keys(C).indexOf(e.type))
                                ) {
                                    var i = $(
                                        '.'
                                            .concat(x.icon, '.')
                                            .concat(C[e.type])
                                    );
                                    I(i),
                                        g(i, e.customClass, 'icon'),
                                        A(
                                            i,
                                            'swal2-animate-'.concat(
                                                e.type,
                                                '-icon'
                                            ),
                                            e.animation
                                        );
                                } else
                                    h(
                                        'Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(
                                            e.type,
                                            '"'
                                        )
                                    );
                        })(t, e),
                        (function (t, e) {
                            var n = q();
                            if (!e.imageUrl) return O(n);
                            I(n),
                                n.setAttribute('src', e.imageUrl),
                                n.setAttribute('alt', e.imageAlt),
                                D(n, 'width', e.imageWidth),
                                D(n, 'height', e.imageHeight),
                                (n.className = x.image),
                                g(n, e.customClass, 'image'),
                                e.imageClass && nt(n, e.imageClass);
                        })(0, e),
                        (function (t, e) {
                            var n = R();
                            N(n, e.title || e.titleText),
                                e.title && tt(e.title, n),
                                e.titleText && (n.innerText = e.titleText),
                                g(n, e.customClass, 'title');
                        })(0, e),
                        (function (t, e) {
                            var n = K();
                            g(n, e.customClass, 'closeButton'),
                                N(n, e.showCloseButton),
                                n.setAttribute(
                                    'aria-label',
                                    e.closeButtonAriaLabel
                                );
                        })(0, e);
                })(t, e),
                (function (t, e) {
                    var n = z().querySelector('#' + x.content);
                    e.html
                        ? (tt(e.html, n), I(n, 'block'))
                        : e.text
                        ? ((n.textContent = e.text), I(n, 'block'))
                        : O(n),
                        (function (t, e) {
                            for (
                                var n = ft.innerParams.get(t),
                                    i = !n || e.input !== n.input,
                                    o = z(),
                                    r = [
                                        'input',
                                        'file',
                                        'range',
                                        'select',
                                        'radio',
                                        'checkbox',
                                        'textarea'
                                    ],
                                    s = 0;
                                s < r.length;
                                s++
                            ) {
                                var a = x[r[s]],
                                    l = ot(o, a);
                                pt(r[s], e.inputAttributes),
                                    mt(l, a, e),
                                    i && O(l);
                            }
                            if (e.input) {
                                if (!gt[e.input])
                                    return h(
                                        'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(
                                            e.input,
                                            '"'
                                        )
                                    );
                                i && I(gt[e.input](e));
                            }
                        })(t, e),
                        g(z(), e.customClass, 'content');
                })(t, e),
                (function (t, e) {
                    var n = Y(),
                        i = F(),
                        o = V();
                    e.showConfirmButton || e.showCancelButton ? I(n) : O(n),
                        g(n, e.customClass, 'actions'),
                        dt(i, 'confirm', e),
                        dt(o, 'cancel', e),
                        e.buttonsStyling
                            ? (function (t, e, n) {
                                  nt([t, e], x.styled),
                                      n.confirmButtonColor &&
                                          (t.style.backgroundColor =
                                              n.confirmButtonColor),
                                      n.cancelButtonColor &&
                                          (e.style.backgroundColor =
                                              n.cancelButtonColor);
                                  var i = window
                                      .getComputedStyle(t)
                                      .getPropertyValue('background-color');
                                  (t.style.borderLeftColor = i),
                                      (t.style.borderRightColor = i);
                              })(i, o, e)
                            : (it([i, o], x.styled),
                              (i.style.backgroundColor =
                                  i.style.borderLeftColor =
                                  i.style.borderRightColor =
                                      ''),
                              (o.style.backgroundColor =
                                  o.style.borderLeftColor =
                                  o.style.borderRightColor =
                                      ''));
                })(0, e),
                (function (t, e) {
                    var n = X();
                    N(n, e.footer),
                        e.footer && tt(e.footer, n),
                        g(n, e.customClass, 'footer');
                })(0, e);
        }
        (gt.text =
            gt.email =
            gt.password =
            gt.number =
            gt.tel =
            gt.url =
                function (e) {
                    var n = ot(z(), x.input);
                    return (
                        'string' == typeof e.inputValue ||
                        'number' == typeof e.inputValue
                            ? (n.value = e.inputValue)
                            : p(e.inputValue) ||
                              w(
                                  'Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(
                                      t(e.inputValue),
                                      '"'
                                  )
                              ),
                        ht(n, e),
                        (n.type = e.input),
                        n
                    );
                }),
            (gt.file = function (t) {
                var e = ot(z(), x.file);
                return ht(e, t), (e.type = t.input), e;
            }),
            (gt.range = function (t) {
                var e = ot(z(), x.range),
                    n = e.querySelector('input'),
                    i = e.querySelector('output');
                return (
                    (n.value = t.inputValue),
                    (n.type = t.input),
                    (i.value = t.inputValue),
                    e
                );
            }),
            (gt.select = function (t) {
                var e = ot(z(), x.select);
                if (((e.innerHTML = ''), t.inputPlaceholder)) {
                    var n = document.createElement('option');
                    (n.innerHTML = t.inputPlaceholder),
                        (n.value = ''),
                        (n.disabled = !0),
                        (n.selected = !0),
                        e.appendChild(n);
                }
                return e;
            }),
            (gt.radio = function () {
                var t = ot(z(), x.radio);
                return (t.innerHTML = ''), t;
            }),
            (gt.checkbox = function (t) {
                var e = ot(z(), x.checkbox),
                    n = E(z(), 'checkbox');
                return (
                    (n.type = 'checkbox'),
                    (n.value = 1),
                    (n.id = x.checkbox),
                    (n.checked = Boolean(t.inputValue)),
                    (e.querySelector('span').innerHTML = t.inputPlaceholder),
                    e
                );
            }),
            (gt.textarea = function (t) {
                var e = ot(z(), x.textarea);
                return (e.value = t.inputValue), ht(e, t), e;
            });
        var yt = function () {
                for (var t = H(), e = 0; e < t.length; e++) O(t[e]);
            },
            bt = function () {
                for (
                    var t = rt(),
                        e = window
                            .getComputedStyle(t)
                            .getPropertyValue('background-color'),
                        n = t.querySelectorAll(
                            '[class^=swal2-success-circular-line], .swal2-success-fix'
                        ),
                        i = 0;
                    i < n.length;
                    i++
                )
                    n[i].style.backgroundColor = e;
            };
        function _t() {
            var t = rt();
            t || Xt.fire(''), (t = rt());
            var e = Y(),
                n = F(),
                i = V();
            I(e),
                I(n),
                nt([t, e], x.loading),
                (n.disabled = !0),
                (i.disabled = !0),
                t.setAttribute('data-loading', !0),
                t.setAttribute('aria-busy', !0),
                t.focus();
        }
        function xt(t) {
            return Et.hasOwnProperty(t);
        }
        function Ct(t) {
            return At[t];
        }
        var kt = [],
            Tt = {},
            Et = {
                title: '',
                titleText: '',
                text: '',
                html: '',
                footer: '',
                type: null,
                toast: !1,
                customClass: '',
                customContainerClass: '',
                target: 'body',
                backdrop: !0,
                animation: !0,
                heightAuto: !0,
                allowOutsideClick: !0,
                allowEscapeKey: !0,
                allowEnterKey: !0,
                stopKeydownPropagation: !0,
                keydownListenerCapture: !1,
                showConfirmButton: !0,
                showCancelButton: !1,
                preConfirm: null,
                confirmButtonText: 'OK',
                confirmButtonAriaLabel: '',
                confirmButtonColor: null,
                confirmButtonClass: '',
                cancelButtonText: 'Cancel',
                cancelButtonAriaLabel: '',
                cancelButtonColor: null,
                cancelButtonClass: '',
                buttonsStyling: !0,
                reverseButtons: !1,
                focusConfirm: !0,
                focusCancel: !1,
                showCloseButton: !1,
                closeButtonAriaLabel: 'Close this dialog',
                showLoaderOnConfirm: !1,
                imageUrl: null,
                imageWidth: null,
                imageHeight: null,
                imageAlt: '',
                imageClass: '',
                timer: null,
                width: null,
                padding: null,
                background: null,
                input: null,
                inputPlaceholder: '',
                inputValue: '',
                inputOptions: {},
                inputAutoTrim: !0,
                inputClass: '',
                inputAttributes: {},
                inputValidator: null,
                validationMessage: null,
                grow: !1,
                position: 'center',
                progressSteps: [],
                currentProgressStep: null,
                progressStepsDistance: null,
                onBeforeOpen: null,
                onAfterClose: null,
                onOpen: null,
                onClose: null,
                scrollbarPadding: !0
            },
            St = [
                'title',
                'titleText',
                'text',
                'html',
                'type',
                'customClass',
                'showConfirmButton',
                'showCancelButton',
                'confirmButtonText',
                'confirmButtonAriaLabel',
                'confirmButtonColor',
                'confirmButtonClass',
                'cancelButtonText',
                'cancelButtonAriaLabel',
                'cancelButtonColor',
                'cancelButtonClass',
                'buttonsStyling',
                'reverseButtons',
                'imageUrl',
                'imageWidth',
                'imageHeigth',
                'imageAlt',
                'imageClass',
                'progressSteps',
                'currentProgressStep'
            ],
            At = {
                customContainerClass: 'customClass',
                confirmButtonClass: 'customClass',
                cancelButtonClass: 'customClass',
                imageClass: 'customClass',
                inputClass: 'customClass'
            },
            Dt = [
                'allowOutsideClick',
                'allowEnterKey',
                'backdrop',
                'focusConfirm',
                'focusCancel',
                'heightAuto',
                'keydownListenerCapture'
            ],
            It = Object.freeze({
                isValidParameter: xt,
                isUpdatableParameter: function (t) {
                    return -1 !== St.indexOf(t);
                },
                isDeprecatedParameter: Ct,
                argsToParams: function (e) {
                    var n = {};
                    if ('object' === t(e[0])) o(n, e[0]);
                    else
                        ['title', 'html', 'type'].forEach(function (i, o) {
                            switch (t(e[o])) {
                                case 'string':
                                    n[i] = e[o];
                                    break;
                                case 'undefined':
                                    break;
                                default:
                                    h(
                                        'Unexpected type of '
                                            .concat(
                                                i,
                                                '! Expected "string", got '
                                            )
                                            .concat(t(e[o]))
                                    );
                            }
                        });
                    return n;
                },
                isVisible: function () {
                    return L(rt());
                },
                clickConfirm: function () {
                    return F() && F().click();
                },
                clickCancel: function () {
                    return V() && V().click();
                },
                getContainer: P,
                getPopup: rt,
                getTitle: R,
                getContent: z,
                getImage: q,
                getIcon: M,
                getIcons: H,
                getCloseButton: K,
                getActions: Y,
                getConfirmButton: F,
                getCancelButton: V,
                getHeader: Q,
                getFooter: X,
                getFocusableElements: Z,
                getValidationMessage: U,
                isLoading: function () {
                    return rt().hasAttribute('data-loading');
                },
                fire: function () {
                    for (
                        var t = arguments.length, e = new Array(t), n = 0;
                        n < t;
                        n++
                    )
                        e[n] = arguments[n];
                    return a(this, e);
                },
                mixin: function (t) {
                    return (function (n) {
                        function a() {
                            return (
                                e(this, a), l(this, r(a).apply(this, arguments))
                            );
                        }
                        return (
                            (function (t, e) {
                                if ('function' != typeof e && null !== e)
                                    throw new TypeError(
                                        'Super expression must either be null or a function'
                                    );
                                (t.prototype = Object.create(e && e.prototype, {
                                    constructor: {
                                        value: t,
                                        writable: !0,
                                        configurable: !0
                                    }
                                })),
                                    e && s(t, e);
                            })(a, n),
                            i(a, [
                                {
                                    key: '_main',
                                    value: function (e) {
                                        return c(
                                            r(a.prototype),
                                            '_main',
                                            this
                                        ).call(this, o({}, t, e));
                                    }
                                }
                            ]),
                            a
                        );
                    })(this);
                },
                queue: function (t) {
                    var e = this;
                    function n(t, e) {
                        (kt = []),
                            document.body.removeAttribute(
                                'data-swal2-queue-step'
                            ),
                            t(e);
                    }
                    kt = t;
                    var i = [];
                    return new Promise(function (t) {
                        !(function o(r, s) {
                            r < kt.length
                                ? (document.body.setAttribute(
                                      'data-swal2-queue-step',
                                      r
                                  ),
                                  e.fire(kt[r]).then(function (e) {
                                      void 0 !== e.value
                                          ? (i.push(e.value), o(r + 1, s))
                                          : n(t, {dismiss: e.dismiss});
                                  }))
                                : n(t, {value: i});
                        })(0);
                    });
                },
                getQueueStep: function () {
                    return document.body.getAttribute('data-swal2-queue-step');
                },
                insertQueueStep: function (t, e) {
                    return e && e < kt.length ? kt.splice(e, 0, t) : kt.push(t);
                },
                deleteQueueStep: function (t) {
                    void 0 !== kt[t] && kt.splice(t, 1);
                },
                showLoading: _t,
                enableLoading: _t,
                getTimerLeft: function () {
                    return Tt.timeout && Tt.timeout.getTimerLeft();
                },
                stopTimer: function () {
                    return Tt.timeout && Tt.timeout.stop();
                },
                resumeTimer: function () {
                    return Tt.timeout && Tt.timeout.start();
                },
                toggleTimer: function () {
                    var t = Tt.timeout;
                    return t && (t.running ? t.stop() : t.start());
                },
                increaseTimer: function (t) {
                    return Tt.timeout && Tt.timeout.increase(t);
                },
                isTimerRunning: function () {
                    return Tt.timeout && Tt.timeout.isRunning();
                }
            });
        function Ot() {
            var t = ft.innerParams.get(this),
                e = ft.domCache.get(this);
            t.showConfirmButton ||
                (O(e.confirmButton), t.showCancelButton || O(e.actions)),
                it([e.popup, e.actions], x.loading),
                e.popup.removeAttribute('aria-busy'),
                e.popup.removeAttribute('data-loading'),
                (e.confirmButton.disabled = !1),
                (e.cancelButton.disabled = !1);
        }
        function Nt() {
            return !!window.MSInputMethodContext && !!document.documentMode;
        }
        function Lt() {
            var t = P(),
                e = rt();
            t.style.removeProperty('align-items'),
                e.offsetTop < 0 && (t.style.alignItems = 'flex-start');
        }
        var jt = {swalPromiseResolve: new WeakMap()};
        function Pt(t, e, n) {
            e
                ? Ht(n)
                : (new Promise(function (t) {
                      var e = window.scrollX,
                          n = window.scrollY;
                      (Tt.restoreFocusTimeout = setTimeout(function () {
                          Tt.previousActiveElement &&
                          Tt.previousActiveElement.focus
                              ? (Tt.previousActiveElement.focus(),
                                (Tt.previousActiveElement = null))
                              : document.body && document.body.focus(),
                              t();
                      }, 100)),
                          void 0 !== e && void 0 !== n && window.scrollTo(e, n);
                  }).then(function () {
                      return Ht(n);
                  }),
                  Tt.keydownTarget.removeEventListener(
                      'keydown',
                      Tt.keydownHandler,
                      {capture: Tt.keydownListenerCapture}
                  ),
                  (Tt.keydownHandlerAdded = !1)),
                delete Tt.keydownHandler,
                delete Tt.keydownTarget,
                t.parentNode && t.parentNode.removeChild(t),
                it(
                    [document.documentElement, document.body],
                    [
                        x.shown,
                        x['height-auto'],
                        x['no-backdrop'],
                        x['toast-shown'],
                        x['toast-column']
                    ]
                ),
                st() &&
                    (null !== k.previousBodyPadding &&
                        ((document.body.style.paddingRight =
                            k.previousBodyPadding + 'px'),
                        (k.previousBodyPadding = null)),
                    (function () {
                        if (T(document.body, x.iosfix)) {
                            var t = parseInt(document.body.style.top, 10);
                            it(document.body, x.iosfix),
                                (document.body.style.top = ''),
                                (document.body.scrollTop = -1 * t);
                        }
                    })(),
                    'undefined' != typeof window &&
                        Nt() &&
                        window.removeEventListener('resize', Lt),
                    d(document.body.children).forEach(function (t) {
                        t.hasAttribute('data-previous-aria-hidden')
                            ? (t.setAttribute(
                                  'aria-hidden',
                                  t.getAttribute('data-previous-aria-hidden')
                              ),
                              t.removeAttribute('data-previous-aria-hidden'))
                            : t.removeAttribute('aria-hidden');
                    }));
        }
        function $t(t) {
            var e = P(),
                n = rt();
            if (n && !T(n, x.hide)) {
                var i = ft.innerParams.get(this),
                    o = jt.swalPromiseResolve.get(this),
                    r = i.onClose,
                    s = i.onAfterClose;
                it(n, x.show),
                    nt(n, x.hide),
                    ut && j(n)
                        ? n.addEventListener(ut, function (t) {
                              t.target === n &&
                                  (function (t, e, n, i) {
                                      T(t, x.hide) && Pt(e, n, i),
                                          Bt(ft),
                                          Bt(jt);
                                  })(n, e, at(), s);
                          })
                        : Pt(e, at(), s),
                    null !== r && 'function' == typeof r && r(n),
                    o(t || {}),
                    delete this.params;
            }
        }
        var Bt = function (t) {
                for (var e in t) t[e] = new WeakMap();
            },
            Ht = function (t) {
                null !== t &&
                    'function' == typeof t &&
                    setTimeout(function () {
                        t();
                    });
            };
        function Mt(t, e, n) {
            var i = ft.domCache.get(t);
            e.forEach(function (t) {
                i[t].disabled = n;
            });
        }
        function Rt(t, e) {
            if (!t) return !1;
            if ('radio' === t.type)
                for (
                    var n = t.parentNode.parentNode.querySelectorAll('input'),
                        i = 0;
                    i < n.length;
                    i++
                )
                    n[i].disabled = e;
            else t.disabled = e;
        }
        var zt = (function () {
                function t(n, i) {
                    e(this, t),
                        (this.callback = n),
                        (this.remaining = i),
                        (this.running = !1),
                        this.start();
                }
                return (
                    i(t, [
                        {
                            key: 'start',
                            value: function () {
                                return (
                                    this.running ||
                                        ((this.running = !0),
                                        (this.started = new Date()),
                                        (this.id = setTimeout(
                                            this.callback,
                                            this.remaining
                                        ))),
                                    this.remaining
                                );
                            }
                        },
                        {
                            key: 'stop',
                            value: function () {
                                return (
                                    this.running &&
                                        ((this.running = !1),
                                        clearTimeout(this.id),
                                        (this.remaining -=
                                            new Date() - this.started)),
                                    this.remaining
                                );
                            }
                        },
                        {
                            key: 'increase',
                            value: function (t) {
                                var e = this.running;
                                return (
                                    e && this.stop(),
                                    (this.remaining += t),
                                    e && this.start(),
                                    this.remaining
                                );
                            }
                        },
                        {
                            key: 'getTimerLeft',
                            value: function () {
                                return (
                                    this.running && (this.stop(), this.start()),
                                    this.remaining
                                );
                            }
                        },
                        {
                            key: 'isRunning',
                            value: function () {
                                return this.running;
                            }
                        }
                    ]),
                    t
                );
            })(),
            qt = {
                email: function (t, e) {
                    return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(
                        t
                    )
                        ? Promise.resolve()
                        : Promise.resolve(e || 'Invalid email address');
                },
                url: function (t, e) {
                    return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(
                        t
                    )
                        ? Promise.resolve()
                        : Promise.resolve(e || 'Invalid URL');
                }
            };
        function Wt(t, e) {
            t.removeEventListener(ut, Wt), (e.style.overflowY = 'auto');
        }
        function Ut(t) {
            var e = P(),
                n = rt();
            null !== t.onBeforeOpen &&
                'function' == typeof t.onBeforeOpen &&
                t.onBeforeOpen(n),
                t.animation && (nt(n, x.show), nt(e, x.fade)),
                I(n),
                ut && j(n)
                    ? ((e.style.overflowY = 'hidden'),
                      n.addEventListener(ut, Wt.bind(null, n, e)))
                    : (e.style.overflowY = 'auto'),
                nt([document.documentElement, document.body, e], x.shown),
                t.heightAuto &&
                    t.backdrop &&
                    !t.toast &&
                    nt(
                        [document.documentElement, document.body],
                        x['height-auto']
                    ),
                st() &&
                    (t.scrollbarPadding &&
                        null === k.previousBodyPadding &&
                        document.body.scrollHeight > window.innerHeight &&
                        ((k.previousBodyPadding = parseInt(
                            window
                                .getComputedStyle(document.body)
                                .getPropertyValue('padding-right')
                        )),
                        (document.body.style.paddingRight =
                            k.previousBodyPadding +
                            (function () {
                                if (
                                    'ontouchstart' in window ||
                                    navigator.msMaxTouchPoints
                                )
                                    return 0;
                                var t = document.createElement('div');
                                (t.style.width = '50px'),
                                    (t.style.height = '50px'),
                                    (t.style.overflow = 'scroll'),
                                    document.body.appendChild(t);
                                var e = t.offsetWidth - t.clientWidth;
                                return document.body.removeChild(t), e;
                            })() +
                            'px')),
                    (function () {
                        if (
                            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                            !window.MSStream &&
                            !T(document.body, x.iosfix)
                        ) {
                            var t = document.body.scrollTop;
                            (document.body.style.top = -1 * t + 'px'),
                                nt(document.body, x.iosfix),
                                (function () {
                                    var t,
                                        e = P();
                                    (e.ontouchstart = function (n) {
                                        t =
                                            n.target === e ||
                                            (!(function (t) {
                                                return !!(
                                                    t.scrollHeight >
                                                    t.clientHeight
                                                );
                                            })(e) &&
                                                'INPUT' !== n.target.tagName);
                                    }),
                                        (e.ontouchmove = function (e) {
                                            t &&
                                                (e.preventDefault(),
                                                e.stopPropagation());
                                        });
                                })();
                        }
                    })(),
                    'undefined' != typeof window &&
                        Nt() &&
                        (Lt(), window.addEventListener('resize', Lt)),
                    d(document.body.children).forEach(function (t) {
                        t === P() ||
                            (function (t, e) {
                                if ('function' == typeof t.contains)
                                    return t.contains(e);
                            })(t, P()) ||
                            (t.hasAttribute('aria-hidden') &&
                                t.setAttribute(
                                    'data-previous-aria-hidden',
                                    t.getAttribute('aria-hidden')
                                ),
                            t.setAttribute('aria-hidden', 'true'));
                    }),
                    setTimeout(function () {
                        e.scrollTop = 0;
                    })),
                at() ||
                    Tt.previousActiveElement ||
                    (Tt.previousActiveElement = document.activeElement),
                null !== t.onOpen &&
                    'function' == typeof t.onOpen &&
                    setTimeout(function () {
                        t.onOpen(n);
                    });
        }
        var Ft,
            Vt = {
                select: function (t, e, n) {
                    var i = ot(t, x.select);
                    e.forEach(function (t) {
                        var e = t[0],
                            o = t[1],
                            r = document.createElement('option');
                        (r.value = e),
                            (r.innerHTML = o),
                            n.inputValue.toString() === e.toString() &&
                                (r.selected = !0),
                            i.appendChild(r);
                    }),
                        i.focus();
                },
                radio: function (t, e, n) {
                    var i = ot(t, x.radio);
                    e.forEach(function (t) {
                        var e = t[0],
                            o = t[1],
                            r = document.createElement('input'),
                            s = document.createElement('label');
                        (r.type = 'radio'),
                            (r.name = x.radio),
                            (r.value = e),
                            n.inputValue.toString() === e.toString() &&
                                (r.checked = !0);
                        var a = document.createElement('span');
                        (a.innerHTML = o),
                            (a.className = x.label),
                            s.appendChild(r),
                            s.appendChild(a),
                            i.appendChild(s);
                    });
                    var o = i.querySelectorAll('input');
                    o.length && o[0].focus();
                }
            },
            Yt = Object.freeze({
                hideLoading: Ot,
                disableLoading: Ot,
                getInput: function (t) {
                    var e = ft.innerParams.get(t || this);
                    return E(ft.domCache.get(t || this).content, e.input);
                },
                close: $t,
                closePopup: $t,
                closeModal: $t,
                closeToast: $t,
                enableButtons: function () {
                    Mt(this, ['confirmButton', 'cancelButton'], !1);
                },
                disableButtons: function () {
                    Mt(this, ['confirmButton', 'cancelButton'], !0);
                },
                enableConfirmButton: function () {
                    f(
                        'Swal.disableConfirmButton()',
                        "Swal.getConfirmButton().removeAttribute('disabled')"
                    ),
                        Mt(this, ['confirmButton'], !1);
                },
                disableConfirmButton: function () {
                    f(
                        'Swal.enableConfirmButton()',
                        "Swal.getConfirmButton().setAttribute('disabled', '')"
                    ),
                        Mt(this, ['confirmButton'], !0);
                },
                enableInput: function () {
                    return Rt(this.getInput(), !1);
                },
                disableInput: function () {
                    return Rt(this.getInput(), !0);
                },
                showValidationMessage: function (t) {
                    var e = ft.domCache.get(this);
                    e.validationMessage.innerHTML = t;
                    var n = window.getComputedStyle(e.popup);
                    (e.validationMessage.style.marginLeft = '-'.concat(
                        n.getPropertyValue('padding-left')
                    )),
                        (e.validationMessage.style.marginRight = '-'.concat(
                            n.getPropertyValue('padding-right')
                        )),
                        I(e.validationMessage);
                    var i = this.getInput();
                    i &&
                        (i.setAttribute('aria-invalid', !0),
                        i.setAttribute(
                            'aria-describedBy',
                            x['validation-message']
                        ),
                        S(i),
                        nt(i, x.inputerror));
                },
                resetValidationMessage: function () {
                    var t = ft.domCache.get(this);
                    t.validationMessage && O(t.validationMessage);
                    var e = this.getInput();
                    e &&
                        (e.removeAttribute('aria-invalid'),
                        e.removeAttribute('aria-describedBy'),
                        it(e, x.inputerror));
                },
                getProgressSteps: function () {
                    return (
                        f(
                            'Swal.getProgressSteps()',
                            "const swalInstance = Swal.fire({progressSteps: ['1', '2', '3']}); const progressSteps = swalInstance.params.progressSteps"
                        ),
                        ft.innerParams.get(this).progressSteps
                    );
                },
                setProgressSteps: function (t) {
                    f('Swal.setProgressSteps()', 'Swal.update()');
                    var e = o({}, ft.innerParams.get(this), {progressSteps: t});
                    vt(0, e), ft.innerParams.set(this, e);
                },
                showProgressSteps: function () {
                    I(ft.domCache.get(this).progressSteps);
                },
                hideProgressSteps: function () {
                    O(ft.domCache.get(this).progressSteps);
                },
                _main: function (e) {
                    var n = this;
                    !(function (t) {
                        for (var e in t)
                            xt((o = e)) ||
                                w('Unknown parameter "'.concat(o, '"')),
                                t.toast &&
                                    ((i = e),
                                    -1 !== Dt.indexOf(i) &&
                                        w(
                                            'The parameter "'.concat(
                                                i,
                                                '" is incompatible with toasts'
                                            )
                                        )),
                                Ct((n = void 0)) && f(n, Ct(n));
                        var n, i, o;
                    })(e);
                    var i = o({}, Et, e);
                    !(function (t) {
                        t.inputValidator ||
                            Object.keys(qt).forEach(function (e) {
                                t.input === e && (t.inputValidator = qt[e]);
                            }),
                            t.showLoaderOnConfirm &&
                                !t.preConfirm &&
                                w(
                                    'showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request'
                                ),
                            (t.animation = b(t.animation)),
                            (t.target &&
                                ('string' != typeof t.target ||
                                    document.querySelector(t.target)) &&
                                ('string' == typeof t.target ||
                                    t.target.appendChild)) ||
                                (w(
                                    'Target parameter is not valid, defaulting to "body"'
                                ),
                                (t.target = 'body')),
                            'string' == typeof t.title &&
                                (t.title = t.title.split('\n').join('<br />'));
                        var e = rt(),
                            n =
                                'string' == typeof t.target
                                    ? document.querySelector(t.target)
                                    : t.target;
                        (!e || (e && n && e.parentNode !== n.parentNode)) &&
                            (function (t) {
                                if (
                                    ((function () {
                                        var t = P();
                                        t &&
                                            (t.parentNode.removeChild(t),
                                            it(
                                                [
                                                    document.documentElement,
                                                    document.body
                                                ],
                                                [
                                                    x['no-backdrop'],
                                                    x['toast-shown'],
                                                    x['has-column']
                                                ]
                                            ));
                                    })(),
                                    G())
                                )
                                    h(
                                        'SweetAlert2 requires document to initialize'
                                    );
                                else {
                                    var e = document.createElement('div');
                                    (e.className = x.container),
                                        (e.innerHTML = lt);
                                    var n = (function (t) {
                                        return 'string' == typeof t
                                            ? document.querySelector(t)
                                            : t;
                                    })(t.target);
                                    n.appendChild(e),
                                        (function (t) {
                                            var e = rt();
                                            e.setAttribute(
                                                'role',
                                                t.toast ? 'alert' : 'dialog'
                                            ),
                                                e.setAttribute(
                                                    'aria-live',
                                                    t.toast
                                                        ? 'polite'
                                                        : 'assertive'
                                                ),
                                                t.toast ||
                                                    e.setAttribute(
                                                        'aria-modal',
                                                        'true'
                                                    );
                                        })(t),
                                        (function (t) {
                                            'rtl' ===
                                                window.getComputedStyle(t)
                                                    .direction &&
                                                nt(P(), x.rtl);
                                        })(n),
                                        (function () {
                                            var t = z(),
                                                e = ot(t, x.input),
                                                n = ot(t, x.file),
                                                i = t.querySelector(
                                                    '.'.concat(
                                                        x.range,
                                                        ' input'
                                                    )
                                                ),
                                                o = t.querySelector(
                                                    '.'.concat(
                                                        x.range,
                                                        ' output'
                                                    )
                                                ),
                                                r = ot(t, x.select),
                                                s = t.querySelector(
                                                    '.'.concat(
                                                        x.checkbox,
                                                        ' input'
                                                    )
                                                ),
                                                a = ot(t, x.textarea);
                                            (e.oninput = J),
                                                (n.onchange = J),
                                                (r.onchange = J),
                                                (s.onchange = J),
                                                (a.oninput = J),
                                                (i.oninput = function (t) {
                                                    J(t), (o.value = i.value);
                                                }),
                                                (i.onchange = function (t) {
                                                    J(t),
                                                        (i.nextSibling.value =
                                                            i.value);
                                                });
                                        })();
                                }
                            })(t);
                    })(i),
                        Object.freeze(i),
                        Tt.timeout && (Tt.timeout.stop(), delete Tt.timeout),
                        clearTimeout(Tt.restoreFocusTimeout);
                    var r = {
                        popup: rt(),
                        container: P(),
                        content: z(),
                        actions: Y(),
                        confirmButton: F(),
                        cancelButton: V(),
                        closeButton: K(),
                        validationMessage: U(),
                        progressSteps: W()
                    };
                    ft.domCache.set(this, r),
                        wt(this, i),
                        ft.innerParams.set(this, i);
                    var s = this.constructor;
                    return new Promise(function (e) {
                        function o(t) {
                            n.closePopup({value: t});
                        }
                        function a(t) {
                            n.closePopup({dismiss: t});
                        }
                        jt.swalPromiseResolve.set(n, e),
                            i.timer &&
                                (Tt.timeout = new zt(function () {
                                    a('timer'), delete Tt.timeout;
                                }, i.timer)),
                            i.input &&
                                setTimeout(function () {
                                    var t = n.getInput();
                                    t && S(t);
                                }, 0);
                        for (
                            var l = function (t) {
                                    i.showLoaderOnConfirm && s.showLoading(),
                                        i.preConfirm
                                            ? (n.resetValidationMessage(),
                                              Promise.resolve()
                                                  .then(function () {
                                                      return i.preConfirm(
                                                          t,
                                                          i.validationMessage
                                                      );
                                                  })
                                                  .then(function (e) {
                                                      L(r.validationMessage) ||
                                                      !1 === e
                                                          ? n.hideLoading()
                                                          : o(
                                                                void 0 === e
                                                                    ? t
                                                                    : e
                                                            );
                                                  }))
                                            : o(t);
                                },
                                c = function (t) {
                                    var e = t.target,
                                        o = r.confirmButton,
                                        c = r.cancelButton,
                                        u = o && (o === e || o.contains(e)),
                                        d = c && (c === e || c.contains(e));
                                    if ('click' === t.type)
                                        if (u)
                                            if ((n.disableButtons(), i.input)) {
                                                var h = (function () {
                                                    var t = n.getInput();
                                                    if (!t) return null;
                                                    switch (i.input) {
                                                        case 'checkbox':
                                                            return t.checked
                                                                ? 1
                                                                : 0;
                                                        case 'radio':
                                                            return t.checked
                                                                ? t.value
                                                                : null;
                                                        case 'file':
                                                            return t.files
                                                                .length
                                                                ? t.files[0]
                                                                : null;
                                                        default:
                                                            return i.inputAutoTrim
                                                                ? t.value.trim()
                                                                : t.value;
                                                    }
                                                })();
                                                i.inputValidator
                                                    ? (n.disableInput(),
                                                      Promise.resolve()
                                                          .then(function () {
                                                              return i.inputValidator(
                                                                  h,
                                                                  i.validationMessage
                                                              );
                                                          })
                                                          .then(function (t) {
                                                              n.enableButtons(),
                                                                  n.enableInput(),
                                                                  t
                                                                      ? n.showValidationMessage(
                                                                            t
                                                                        )
                                                                      : l(h);
                                                          }))
                                                    : n
                                                          .getInput()
                                                          .checkValidity()
                                                    ? l(h)
                                                    : (n.enableButtons(),
                                                      n.showValidationMessage(
                                                          i.validationMessage
                                                      ));
                                            } else l(!0);
                                        else
                                            d &&
                                                (n.disableButtons(),
                                                a(s.DismissReason.cancel));
                                },
                                u = r.popup.querySelectorAll('button'),
                                d = 0;
                            d < u.length;
                            d++
                        )
                            (u[d].onclick = c),
                                (u[d].onmouseover = c),
                                (u[d].onmouseout = c),
                                (u[d].onmousedown = c);
                        if (
                            ((r.closeButton.onclick = function () {
                                a(s.DismissReason.close);
                            }),
                            i.toast)
                        )
                            r.popup.onclick = function () {
                                i.showConfirmButton ||
                                    i.showCancelButton ||
                                    i.showCloseButton ||
                                    i.input ||
                                    a(s.DismissReason.close);
                            };
                        else {
                            var f = !1;
                            (r.popup.onmousedown = function () {
                                r.container.onmouseup = function (t) {
                                    (r.container.onmouseup = void 0),
                                        t.target === r.container && (f = !0);
                                };
                            }),
                                (r.container.onmousedown = function () {
                                    r.popup.onmouseup = function (t) {
                                        (r.popup.onmouseup = void 0),
                                            (t.target !== r.popup &&
                                                !r.popup.contains(t.target)) ||
                                                (f = !0);
                                    };
                                }),
                                (r.container.onclick = function (t) {
                                    f
                                        ? (f = !1)
                                        : t.target === r.container &&
                                          b(i.allowOutsideClick) &&
                                          a(s.DismissReason.backdrop);
                                });
                        }
                        function m(t, e) {
                            for (
                                var n = Z(i.focusCancel), o = 0;
                                o < n.length;
                                o++
                            )
                                return (
                                    (t += e) === n.length
                                        ? (t = 0)
                                        : -1 === t && (t = n.length - 1),
                                    n[t].focus()
                                );
                            r.popup.focus();
                        }
                        i.reverseButtons
                            ? r.confirmButton.parentNode.insertBefore(
                                  r.cancelButton,
                                  r.confirmButton
                              )
                            : r.confirmButton.parentNode.insertBefore(
                                  r.confirmButton,
                                  r.cancelButton
                              ),
                            Tt.keydownTarget &&
                                Tt.keydownHandlerAdded &&
                                (Tt.keydownTarget.removeEventListener(
                                    'keydown',
                                    Tt.keydownHandler,
                                    {capture: Tt.keydownListenerCapture}
                                ),
                                (Tt.keydownHandlerAdded = !1)),
                            i.toast ||
                                ((Tt.keydownHandler = function (t) {
                                    return (function (t, e) {
                                        if (
                                            (e.stopKeydownPropagation &&
                                                t.stopPropagation(),
                                            'Enter' !== t.key || t.isComposing)
                                        )
                                            if ('Tab' === t.key) {
                                                for (
                                                    var i = t.target,
                                                        o = Z(e.focusCancel),
                                                        l = -1,
                                                        c = 0;
                                                    c < o.length;
                                                    c++
                                                )
                                                    if (i === o[c]) {
                                                        l = c;
                                                        break;
                                                    }
                                                t.shiftKey ? m(l, -1) : m(l, 1),
                                                    t.stopPropagation(),
                                                    t.preventDefault();
                                            } else
                                                -1 !==
                                                [
                                                    'ArrowLeft',
                                                    'ArrowRight',
                                                    'ArrowUp',
                                                    'ArrowDown',
                                                    'Left',
                                                    'Right',
                                                    'Up',
                                                    'Down'
                                                ].indexOf(t.key)
                                                    ? document.activeElement ===
                                                          r.confirmButton &&
                                                      L(r.cancelButton)
                                                        ? r.cancelButton.focus()
                                                        : document.activeElement ===
                                                              r.cancelButton &&
                                                          L(r.confirmButton) &&
                                                          r.confirmButton.focus()
                                                    : ('Escape' !== t.key &&
                                                          'Esc' !== t.key) ||
                                                      !0 !==
                                                          b(e.allowEscapeKey) ||
                                                      (t.preventDefault(),
                                                      a(s.DismissReason.esc));
                                        else if (
                                            t.target &&
                                            n.getInput() &&
                                            t.target.outerHTML ===
                                                n.getInput().outerHTML
                                        ) {
                                            if (
                                                -1 !==
                                                ['textarea', 'file'].indexOf(
                                                    e.input
                                                )
                                            )
                                                return;
                                            s.clickConfirm(),
                                                t.preventDefault();
                                        }
                                    })(t, i);
                                }),
                                (Tt.keydownTarget = i.keydownListenerCapture
                                    ? window
                                    : r.popup),
                                (Tt.keydownListenerCapture =
                                    i.keydownListenerCapture),
                                Tt.keydownTarget.addEventListener(
                                    'keydown',
                                    Tt.keydownHandler,
                                    {capture: Tt.keydownListenerCapture}
                                ),
                                (Tt.keydownHandlerAdded = !0)),
                            n.enableButtons(),
                            n.hideLoading(),
                            n.resetValidationMessage(),
                            i.toast &&
                            (i.input || i.footer || i.showCloseButton)
                                ? nt(document.body, x['toast-column'])
                                : it(document.body, x['toast-column']),
                            'select' === i.input || 'radio' === i.input
                                ? (function (e, n) {
                                      function i(t) {
                                          return Vt[n.input](
                                              o,
                                              (function (t) {
                                                  var e = [];
                                                  return (
                                                      'undefined' !=
                                                          typeof Map &&
                                                      t instanceof Map
                                                          ? t.forEach(function (
                                                                t,
                                                                n
                                                            ) {
                                                                e.push([n, t]);
                                                            })
                                                          : Object.keys(
                                                                t
                                                            ).forEach(function (
                                                                n
                                                            ) {
                                                                e.push([
                                                                    n,
                                                                    t[n]
                                                                ]);
                                                            }),
                                                      e
                                                  );
                                              })(t),
                                              n
                                          );
                                      }
                                      var o = z();
                                      p(n.inputOptions)
                                          ? (_t(),
                                            n.inputOptions.then(function (t) {
                                                e.hideLoading(), i(t);
                                            }))
                                          : 'object' === t(n.inputOptions)
                                          ? i(n.inputOptions)
                                          : h(
                                                'Unexpected type of inputOptions! Expected object, Map or Promise, got '.concat(
                                                    t(n.inputOptions)
                                                )
                                            );
                                  })(n, i)
                                : -1 !==
                                      [
                                          'text',
                                          'email',
                                          'number',
                                          'tel',
                                          'textarea'
                                      ].indexOf(i.input) &&
                                  p(i.inputValue) &&
                                  (function (t, e) {
                                      var n = t.getInput();
                                      O(n),
                                          e.inputValue
                                              .then(function (i) {
                                                  (n.value =
                                                      'number' === e.input
                                                          ? parseFloat(i) || 0
                                                          : i + ''),
                                                      I(n),
                                                      n.focus(),
                                                      t.hideLoading();
                                              })
                                              .catch(function (t) {
                                                  h(
                                                      'Error in inputValue promise: ' +
                                                          t
                                                  ),
                                                      (n.value = ''),
                                                      I(n),
                                                      n.focus(),
                                                      undefined.hideLoading();
                                              });
                                  })(n, i),
                            Ut(i),
                            i.toast ||
                                (b(i.allowEnterKey)
                                    ? i.focusCancel && L(r.cancelButton)
                                        ? r.cancelButton.focus()
                                        : i.focusConfirm && L(r.confirmButton)
                                        ? r.confirmButton.focus()
                                        : m(-1, 1)
                                    : document.activeElement &&
                                      'function' ==
                                          typeof document.activeElement.blur &&
                                      document.activeElement.blur()),
                            (r.container.scrollTop = 0);
                    });
                },
                update: function (t) {
                    var e = {};
                    Object.keys(t).forEach(function (n) {
                        Xt.isUpdatableParameter(n)
                            ? (e[n] = t[n])
                            : w(
                                  'Invalid parameter to update: "'.concat(
                                      n,
                                      '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js'
                                  )
                              );
                    });
                    var n = o({}, ft.innerParams.get(this), e);
                    wt(this, n),
                        ft.innerParams.set(this, n),
                        Object.defineProperties(this, {
                            params: {
                                value: o({}, this.params, t),
                                writable: !1,
                                enumerable: !0
                            }
                        });
                }
            });
        function Qt() {
            if ('undefined' != typeof window) {
                'undefined' == typeof Promise &&
                    h(
                        'This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)'
                    ),
                    (Ft = this);
                for (
                    var t = arguments.length, e = new Array(t), n = 0;
                    n < t;
                    n++
                )
                    e[n] = arguments[n];
                var i = Object.freeze(this.constructor.argsToParams(e));
                Object.defineProperties(this, {
                    params: {
                        value: i,
                        writable: !1,
                        enumerable: !0,
                        configurable: !0
                    }
                });
                var o = this._main(this.params);
                ft.promise.set(this, o);
            }
        }
        (Qt.prototype.then = function (t) {
            return ft.promise.get(this).then(t);
        }),
            (Qt.prototype.finally = function (t) {
                return ft.promise.get(this).finally(t);
            }),
            o(Qt.prototype, Yt),
            o(Qt, It),
            Object.keys(Yt).forEach(function (t) {
                Qt[t] = function () {
                    var e;
                    if (Ft) return (e = Ft)[t].apply(e, arguments);
                };
            }),
            (Qt.DismissReason = _),
            (Qt.version = '8.11.8');
        var Xt = Qt;
        return (Xt.default = Xt);
    }),
    'undefined' != typeof window &&
        window.Sweetalert2 &&
        (window.swal =
            window.sweetAlert =
            window.Swal =
            window.SweetAlert =
                window.Sweetalert2),
    'undefined' != typeof document &&
        (function (t, e) {
            var n = t.createElement('style');
            if (
                (t.getElementsByTagName('head')[0].appendChild(n), n.styleSheet)
            )
                n.styleSheet.disabled || (n.styleSheet.cssText = e);
            else
                try {
                    n.innerHTML = e;
                } catch (t) {
                    n.innerText = e;
                }
        })(
            document,
            '@charset "UTF-8";@-webkit-keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes swal2-show{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}100%{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.875em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}100%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}50%{margin-top:1.625em;-webkit-transform:scale(.4);transform:scale(.4);opacity:0}80%{margin-top:-.375em;-webkit-transform:scale(1.15);transform:scale(1.15)}100%{margin-top:0;-webkit-transform:scale(1);transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}100%{-webkit-transform:rotateX(0);transform:rotateX(0);opacity:1}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-shown{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon::before{display:flex;align-items:center;font-size:2em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon::before{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 .0625em #fff,0 0 0 .125em rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:2em 2em;transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;-webkit-transform-origin:0 1.5em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}@-webkit-keyframes swal2-toast-show{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg)}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg)}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg)}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{-webkit-transform:translateY(-.625em) rotateZ(2deg);transform:translateY(-.625em) rotateZ(2deg)}33%{-webkit-transform:translateY(0) rotateZ(-2deg);transform:translateY(0) rotateZ(-2deg)}66%{-webkit-transform:translateY(.3125em) rotateZ(2deg);transform:translateY(.3125em) rotateZ(2deg)}100%{-webkit-transform:translateY(0) rotateZ(0);transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{-webkit-transform:rotateZ(1deg);transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-shown{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent}body.swal2-no-backdrop .swal2-shown>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-shown.swal2-top{top:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-top-left,body.swal2-no-backdrop .swal2-shown.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-top-end,body.swal2-no-backdrop .swal2-shown.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-shown.swal2-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-left,body.swal2-no-backdrop .swal2-shown.swal2-center-start{top:50%;left:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-center-end,body.swal2-no-backdrop .swal2-shown.swal2-center-right{top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom{bottom:0;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}body.swal2-no-backdrop .swal2-shown.swal2-bottom-left,body.swal2-no-backdrop .swal2-shown.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-shown.swal2-bottom-end,body.swal2-no-backdrop .swal2-shown.swal2-bottom-right{right:0;bottom:0}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;background-color:transparent;-webkit-overflow-scrolling:touch}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-container.swal2-fade{transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:"";display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 2px #fff,0 0 0 4px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;top:0;right:0;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{-webkit-transform:none;transform:none;background:0 0;color:#f27474}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:300;line-height:normal;word-wrap:break-word}#swal2-content{text-align:center}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-webkit-input-placeholder,.swal2-input::-webkit-input-placeholder,.swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:inherit}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:inherit;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;zoom:normal;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;zoom:normal;border:.25em solid transparent;border-radius:50%;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon::before{display:flex;align-items:center;height:92%;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning::before{content:"!"}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info::before{content:"i"}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question::before{content:"?"}.swal2-icon.swal2-question.swal2-arabic-question-mark::before{content:"؟"}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;-webkit-transform:rotate(45deg);transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:3.75em 3.75em;transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 3.75em;transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.875em;width:1.5625em;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-animate-success-icon .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-animate-success-icon .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-animate-success-icon .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-animate-error-icon{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-animate-error-icon .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}@-webkit-keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}'
        ),
    (function (t) {
        t(['jquery'], function (t) {
            return (function () {
                function e(e, n) {
                    return (
                        e || (e = s()),
                        (l = t('#' + e.containerId)).length ||
                            (n &&
                                (l = (function (e) {
                                    return (
                                        (l = t('<div/>')
                                            .attr('id', e.containerId)
                                            .addClass('toast-container')
                                            .addClass(
                                                e.positionClass
                                            )).appendTo(t(e.target)),
                                        l
                                    );
                                })(e))),
                        l
                    );
                }
                function n(e) {
                    for (var n = l.children(), o = n.length - 1; o >= 0; o--)
                        i(t(n[o]), e);
                }
                function i(e, n, i) {
                    var o = !(!i || !i.force) && i.force;
                    return !(
                        !e ||
                        (!o && 0 !== t(':focus', e).length) ||
                        (e[n.hideMethod]({
                            duration: n.hideDuration,
                            easing: n.hideEasing,
                            complete: function () {
                                a(e);
                            }
                        }),
                        0)
                    );
                }
                function o(t) {
                    c && c(t);
                }
                function r(n) {
                    function i(t) {
                        return (
                            null == t && (t = ''),
                            t
                                .replace(/&/g, '&amp;')
                                .replace(/"/g, '&quot;')
                                .replace(/'/g, '&#39;')
                                .replace(/</g, '&lt;')
                                .replace(/>/g, '&gt;')
                        );
                    }
                    function r(e) {
                        var n =
                                e && !1 !== p.closeMethod
                                    ? p.closeMethod
                                    : p.hideMethod,
                            i =
                                e && !1 !== p.closeDuration
                                    ? p.closeDuration
                                    : p.hideDuration,
                            r =
                                e && !1 !== p.closeEasing
                                    ? p.closeEasing
                                    : p.hideEasing;
                        if (!t(':focus', v).length || e)
                            return (
                                clearTimeout(x.intervalId),
                                v[n]({
                                    duration: i,
                                    easing: r,
                                    complete: function () {
                                        a(v),
                                            clearTimeout(g),
                                            p.onHidden &&
                                                'hidden' !== C.state &&
                                                p.onHidden(),
                                            (C.state = 'hidden'),
                                            (C.endTime = new Date()),
                                            o(C);
                                    }
                                })
                            );
                    }
                    function c() {
                        (p.timeOut > 0 || p.extendedTimeOut > 0) &&
                            ((g = setTimeout(r, p.extendedTimeOut)),
                            (x.maxHideTime = parseFloat(p.extendedTimeOut)),
                            (x.hideEta = new Date().getTime() + x.maxHideTime));
                    }
                    function h() {
                        clearTimeout(g),
                            (x.hideEta = 0),
                            v.stop(!0, !0)[p.showMethod]({
                                duration: p.showDuration,
                                easing: p.showEasing
                            });
                    }
                    function f() {
                        var t =
                            ((x.hideEta - new Date().getTime()) /
                                x.maxHideTime) *
                            100;
                        b.width(t + '%');
                    }
                    var p = s(),
                        m = n.iconClass || p.iconClass;
                    if (
                        (void 0 !== n.optionsOverride &&
                            ((p = t.extend(p, n.optionsOverride)),
                            (m = n.optionsOverride.iconClass || m)),
                        !(function (t, e) {
                            if (t.preventDuplicates) {
                                if (e.message === u) return !0;
                                u = e.message;
                            }
                            return !1;
                        })(p, n))
                    ) {
                        d++, (l = e(p, !0));
                        var g = null,
                            v = t('<div/>'),
                            w = t('<div/>'),
                            y = t('<div/>'),
                            b = t('<div/>'),
                            _ = t(p.closeHtml),
                            x = {
                                intervalId: null,
                                hideEta: null,
                                maxHideTime: null
                            },
                            C = {
                                toastId: d,
                                state: 'visible',
                                startTime: new Date(),
                                options: p,
                                map: n
                            };
                        return (
                            n.iconClass && v.addClass(p.toastClass).addClass(m),
                            (function () {
                                if (n.title) {
                                    var t = n.title;
                                    p.escapeHtml && (t = i(n.title)),
                                        w.append(t).addClass(p.titleClass),
                                        v.append(w);
                                }
                            })(),
                            (function () {
                                if (n.message) {
                                    var t = n.message;
                                    p.escapeHtml && (t = i(n.message)),
                                        y.append(t).addClass(p.messageClass),
                                        v.append(y);
                                }
                            })(),
                            p.closeButton &&
                                (_.addClass(p.closeClass).attr(
                                    'role',
                                    'button'
                                ),
                                v.prepend(_)),
                            p.progressBar &&
                                (b.addClass(p.progressClass), v.prepend(b)),
                            p.rtl && v.addClass('rtl'),
                            p.newestOnTop ? l.prepend(v) : l.append(v),
                            (function () {
                                var t = '';
                                switch (n.iconClass) {
                                    case 'toast-success':
                                    case 'toast-info':
                                        t = 'polite';
                                        break;
                                    default:
                                        t = 'assertive';
                                }
                                v.attr('aria-live', t);
                            })(),
                            v.hide(),
                            v[p.showMethod]({
                                duration: p.showDuration,
                                easing: p.showEasing,
                                complete: p.onShown
                            }),
                            p.timeOut > 0 &&
                                ((g = setTimeout(r, p.timeOut)),
                                (x.maxHideTime = parseFloat(p.timeOut)),
                                (x.hideEta =
                                    new Date().getTime() + x.maxHideTime),
                                p.progressBar &&
                                    (x.intervalId = setInterval(f, 10))),
                            p.closeOnHover && v.hover(h, c),
                            !p.onclick && p.tapToDismiss && v.click(r),
                            p.closeButton &&
                                _ &&
                                _.click(function (t) {
                                    t.stopPropagation
                                        ? t.stopPropagation()
                                        : void 0 !== t.cancelBubble &&
                                          !0 !== t.cancelBubble &&
                                          (t.cancelBubble = !0),
                                        p.onCloseClick && p.onCloseClick(t),
                                        r(!0);
                                }),
                            p.onclick &&
                                v.click(function (t) {
                                    p.onclick(t), r();
                                }),
                            o(C),
                            p.debug && console && console.log(C),
                            v
                        );
                    }
                }
                function s() {
                    return t.extend(
                        {},
                        {
                            tapToDismiss: !0,
                            toastClass: 'toast',
                            containerId: 'toast-container',
                            debug: !1,
                            showMethod: 'fadeIn',
                            showDuration: 300,
                            showEasing: 'swing',
                            onShown: void 0,
                            hideMethod: 'fadeOut',
                            hideDuration: 1e3,
                            hideEasing: 'swing',
                            onHidden: void 0,
                            closeMethod: !1,
                            closeDuration: !1,
                            closeEasing: !1,
                            closeOnHover: !0,
                            extendedTimeOut: 1e3,
                            iconClasses: {
                                error: 'toast-error',
                                info: 'toast-info',
                                success: 'toast-success',
                                warning: 'toast-warning'
                            },
                            iconClass: 'toast-info',
                            positionClass: 'toast-top-right',
                            timeOut: 5e3,
                            titleClass: 'toast-title',
                            messageClass: 'toast-message',
                            escapeHtml: !1,
                            target: 'body',
                            closeHtml: '<button type="button">&times;</button>',
                            closeClass: 'toast-close-button',
                            newestOnTop: !0,
                            preventDuplicates: !1,
                            progressBar: !1,
                            progressClass: 'toast-progress',
                            rtl: !1
                        },
                        f.options
                    );
                }
                function a(t) {
                    l || (l = e()),
                        t.is(':visible') ||
                            (t.remove(),
                            (t = null),
                            0 === l.children().length &&
                                (l.remove(), (u = void 0)));
                }
                var l,
                    c,
                    u,
                    d = 0,
                    h = {
                        error: 'error',
                        info: 'info',
                        success: 'success',
                        warning: 'warning'
                    },
                    f = {
                        clear: function (t, o) {
                            var r = s();
                            l || e(r), i(t, r, o) || n(r);
                        },
                        remove: function (n) {
                            var i = s();
                            return (
                                l || e(i),
                                n && 0 === t(':focus', n).length
                                    ? void a(n)
                                    : void (l.children().length && l.remove())
                            );
                        },
                        error: function (t, e, n) {
                            return r({
                                type: h.error,
                                iconClass: s().iconClasses.error,
                                message: t,
                                optionsOverride: n,
                                title: e
                            });
                        },
                        getContainer: e,
                        info: function (t, e, n) {
                            return r({
                                type: h.info,
                                iconClass: s().iconClasses.info,
                                message: t,
                                optionsOverride: n,
                                title: e
                            });
                        },
                        options: {},
                        subscribe: function (t) {
                            c = t;
                        },
                        success: function (t, e, n) {
                            return r({
                                type: h.success,
                                iconClass: s().iconClasses.success,
                                message: t,
                                optionsOverride: n,
                                title: e
                            });
                        },
                        version: '2.1.3',
                        warning: function (t, e, n) {
                            return r({
                                type: h.warning,
                                iconClass: s().iconClasses.warning,
                                message: t,
                                optionsOverride: n,
                                title: e
                            });
                        }
                    };
                return f;
            })();
        });
    })(
        'function' == typeof define && define.amd
            ? define
            : function (t, e) {
                  'undefined' != typeof module && module.exports
                      ? (module.exports = e(require('jquery')))
                      : (window.toastr = e(window.jQuery));
              }
    ),
    $(document).ready(function (t) {
        function e() {
            $('.slide-progress').css({
                width: '100%',
                transition: 'width 5000ms'
            });
        }
        $(window).scroll(function () {
            $(this).scrollTop() > 60
                ? ($('header.main-header.js-fixed-header').addClass('fixed'),
                  $('header.main-header.js-fixed-topbar').addClass(
                      'fixed fixed-topbar'
                  ))
                : ($('header.main-header.js-fixed-header').removeClass('fixed'),
                  $('header.main-header.js-fixed-topbar').removeClass(
                      'fixed fixed-topbar'
                  ));
        }),
            $('.category-slider').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !0,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !1,
                responsiveClass: !0,
                responsive: {
                    0: {items: 2, slideBy: 1},
                    576: {items: 3, slideBy: 2},
                    768: {items: 4, slideBy: 2},
                    992: {items: 6, slideBy: 3},
                    1400: {items: 8, slideBy: 4}
                }
            }),
            $('.carousel-products').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !0,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !1,
                stagePadding: 1,
                responsiveClass: !0,
                responsive: {
                    0: {items: 3, slideBy: 1},
                    576: {items: 4, slideBy: 1},
                    768: {items: 6, slideBy: 1},
                    991: {items: 7, slideBy: 1},
                    992: {items: 3, slideBy: 1},
                    1400: {items: 6, slideBy: 1}
                }
            }),
            $('[data-toggle="tooltip"]').tooltip(),
            $('.carousel-lg').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !0,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !0,
                responsiveClass: !0,
                responsive: {
                    0: {items: 2, slideBy: 1},
                    480: {items: 2, slideBy: 1},
                    576: {items: 3, slideBy: 1},
                    768: {items: 3, slideBy: 2},
                    992: {items: 3, slideBy: 2},
                    1200: {items: 4, slideBy: 3},
                    1400: {items: 4, slideBy: 4}
                }
            }),
            $('.carousel-thumbnails').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !1,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !1,
                responsiveClass: !0,
                responsive: {
                    0: {items: 2, slideBy: 1},
                    480: {items: 2, slideBy: 1},
                    576: {items: 3, slideBy: 1},
                    768: {items: 3, slideBy: 1},
                    992: {items: 3, slideBy: 1},
                    1200: {items: 4, slideBy: 1},
                    1400: {items: 4, slideBy: 1}
                }
            }),
            $('.profile-order-steps').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !0,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !0,
                responsiveClass: !0,
                responsive: {
                    0: {items: 2, slideBy: 1},
                    480: {items: 2, slideBy: 1},
                    576: {items: 3, slideBy: 1},
                    768: {items: 3, slideBy: 2},
                    992: {items: 3, slideBy: 2},
                    1200: {items: 3, slideBy: 3},
                    1400: {items: 3, slideBy: 4}
                }
            }),
            $('.carousel-sm').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !0,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !0,
                responsiveClass: !0,
                responsive: {
                    0: {items: 2, slideBy: 1},
                    480: {items: 2, slideBy: 1},
                    576: {items: 3, slideBy: 1},
                    768: {items: 3, slideBy: 2},
                    992: {items: 9, slideBy: 2},
                    1200: {items: 9, slideBy: 3},
                    1400: {items: 7, slideBy: 4}
                }
            }),
            $('.carousel-md').owlCarousel({
                rtl: !!IS_RTL,
                margin: 10,
                nav: !0,
                navText: [
                    '<i class="mdi mdi mdi-chevron-right"></i>',
                    '<i class="mdi mdi mdi-chevron-left"></i>'
                ],
                dots: !0,
                responsiveClass: !0,
                responsive: {
                    0: {items: 2, slideBy: 1},
                    480: {items: 2, slideBy: 1},
                    576: {items: 3, slideBy: 1},
                    768: {items: 3, slideBy: 2},
                    992: {items: 4, slideBy: 2},
                    1200: {items: 4, slideBy: 3},
                    1400: {items: 5, slideBy: 4}
                }
            }),
            $('#suggestion-slider').owlCarousel({
                rtl: !!IS_RTL,
                items: 1,
                autoplay: !0,
                autoplayTimeout: 5e3,
                loop: !0,
                dots: !0,
                onInitialized: e,
                onTranslate: function () {
                    $('.slide-progress').css({
                        width: 0,
                        transition: 'width 0s'
                    });
                },
                onTranslated: e
            });
        document;
        $('.product-carousel').owlCarousel({
            rtl: !!IS_RTL,
            items: 1,
            loop: !1,
            dots: !1,
            nav: !0,
            navText: [
                '<i class="mdi mdi mdi-chevron-right"></i>',
                '<i class="mdi mdi mdi-chevron-left"></i>'
            ],
            onTranslate: function (e) {
                var n = e.item.index,
                    i = t('.product-gallery .owl-item')
                        .eq(n)
                        .find('[data-owl]')
                        .attr('data-owl');
                t('.product-thumbnails li ').removeClass('active'),
                    t('[href="#' + i + '"]')
                        .parent()
                        .addClass('active'),
                    t('[data-owl="' + i + '"]')
                        .parent()
                        .addClass('active');
            }
        }),
            null != $.fancybox &&
                (($.fancybox.defaults.hash = !1),
                $('.gallery-item').fancybox({
                    loop: !0,
                    keyboard: !0,
                    clickContent: !1,
                    afterShow: function (t, e) {
                        $(
                            '.product-thumbnails .owl-thumbnail[data-slide="'.concat(
                                t.currIndex,
                                '"]'
                            )
                        ).trigger('click');
                    }
                })),
            $('.owl-thumbnail').click(function (t) {
                t.preventDefault();
                var e = $(this).data('slide');
                $('.product-gallery .product-carousel').trigger(
                    'to.owl.carousel',
                    e
                );
            }),
            $('.container .sticky-sidebar').length &&
                $('.container .sticky-sidebar').theiaStickySidebar({
                    additionalMarginTop: 20
                }),
            $(document).on('click', '.product-params .sum-more', function () {
                $(this).parents('.product-params').toggleClass('active'),
                    $(this).find('i').toggleClass('active'),
                    $(this).find('.show-more').fadeToggle(0),
                    $(this).find('.show-less').fadeToggle(0);
            }),
            $('.ah-tab-wrapper').horizontalmenu({
                itemClick: function (t) {
                    return (
                        $('.ah-tab-content-wrapper .ah-tab-content').removeAttr(
                            'data-ah-tab-active'
                        ),
                        $(
                            '.ah-tab-content-wrapper .ah-tab-content:eq(' +
                                $(t).index() +
                                ')'
                        ).attr('data-ah-tab-active', 'true'),
                        !1
                    );
                }
            }),
            $('#btn-checkout-contact-location').click(function () {
                $('.checkout-address').addClass('show'),
                    $('.checkout-contact-content').addClass('hidden');
            }),
            $('#cancel-change-address-btn').click(function () {
                $('.checkout-address').removeClass('show'),
                    $('.checkout-contact-content').removeClass('hidden');
            }),
            $('.custom-select-ui').length &&
                $('.custom-select-ui select').niceSelect(),
            $('.back-to-top a').click(function () {
                return $('body,html').animate({scrollTop: 0}, 700), !1;
            }),
            $('header.main-header button.btn-menu').click(function () {
                $('header.main-header .side-menu').addClass('open'),
                    $('header.main-header .overlay-side-menu').addClass('show');
            }),
            $('header.main-header .overlay-side-menu.show').click(function () {
                $(this).removeClass('show'),
                    $('header.main-header .side-menu').removeClass('open');
            }),
            $('button.btn-menu').on('click', function () {
                $('.overlay-side-menu').fadeIn(200),
                    $('header.main-header .side-menu').addClass('open');
            }),
            $('.overlay-side-menu').on('click', function () {
                $('header.main-header .side-menu').hasClass('open') &&
                    $('header.main-header .side-menu').removeClass('open'),
                    $(this).fadeOut(200);
            }),
            $('header.main-header .side-menu li.active')
                .addClass('open')
                .children('ul')
                .show(),
            $('header.main-header .side-menu li.sub-menu> a').on(
                'click',
                function () {
                    $(this).removeAttr('href');
                    var t = $(this).parent('li');
                    t.hasClass('open')
                        ? (t.removeClass('open'),
                          t.find('li').removeClass('open'),
                          t.find('ul').slideUp(400))
                        : (t.addClass('open'),
                          t.children('ul').slideDown(400),
                          t.siblings('li').children('ul').slideUp(400),
                          t.siblings('li').removeClass('open'));
                }
            ),
            $('#colorswitch-option').length &&
                ($('#colorswitch-option button').on('click', function () {
                    $('#colorswitch-option ul').toggleClass('show');
                }),
                $('#colorswitch-option ul li').on('click', function () {
                    $('#colorswitch-option ul li').removeClass('active'),
                        $(this).addClass('active');
                    var t = $(this).attr('data-path');
                    $('#colorswitch').attr('href', t);
                })),
            $('.f-menu > li').hover(function () {
                $(this)
                    .closest('.list-item')
                    .find('.f-menu > li')
                    .removeClass('active'),
                    $(this).addClass('active');
            }),
            $('.list-item.list-item-has-children.position-static').hover(
                function () {
                    $('.main-content').append(
                        '<div class="trasparent-background"></div>'
                    ),
                        setTimeout(function () {
                            $('.trasparent-background').css('opacity', '1');
                        }, 20);
                }
            ),
            $('.list-item.list-item-has-children.position-static').mouseleave(
                function () {
                    $('.trasparent-background').remove();
                }
            ),
            $(document).on('click', '.add-to-cart-single', function () {
                var t = this;
                $.ajax({
                    type: 'POST',
                    url: $(t).data('action'),
                    data: {quantity: 1},
                    success: function (t) {
                        'success' == t.status
                            ? (Swal.fire({
                                  type: 'success',
                                  title: 'با موفقیت اضافه شد',
                                  text: 'محصول مورد نظر با موفقیت به سبد خرید شما اضافه شد برای رزرو محصول سفارش خود را نهایی کنید.',
                                  confirmButtonText: 'باشه',
                                  footer: '<h5><a href="/cart">مشاهده سبد خرید</a></h5>'
                              }),
                              $('#cart-list-item').replaceWith(t.cart))
                            : Swal.fire({
                                  type: 'error',
                                  title: 'خطا',
                                  text: t.message,
                                  confirmButtonText: 'باشه',
                                  footer: '<h5><a href="/cart">مشاهده سبد خرید</a></h5>'
                              });
                    },
                    beforeSend: function (e) {
                        e.setRequestHeader(
                            'X-CSRF-TOKEN',
                            $('meta[name="csrf-token"]').attr('content')
                        ),
                            block(t.closest('.cart'));
                    },
                    complete: function () {
                        unblock(t.closest('.cart'));
                    }
                });
            });
    }),
    $.ajaxSetup({
        error: function (t) {
            if ((reloadCaptcha(), 403 != t.status))
                if (429 != t.status)
                    if (401 != t.status)
                        if (500 != t.status)
                            if (t.responseJSON.errors) {
                                for (var e in t.responseJSON.errors)
                                    if (
                                        t.responseJSON.errors.hasOwnProperty(e)
                                    ) {
                                        var n = t.responseJSON.errors[e];
                                        for (var i in n)
                                            n.hasOwnProperty(i) &&
                                                toastr.error(n[i], 'خطا', {
                                                    positionClass:
                                                        'toast-bottom-left',
                                                    containerId:
                                                        'toast-bottom-left'
                                                });
                                    }
                            } else
                                toastr.error('خطایی رخ داده است', 'خطا', {
                                    positionClass: 'toast-bottom-left',
                                    containerId: 'toast-bottom-left'
                                });
                        else
                            toastr.error('خطایی در سرور رخ داده است', 'خطا', {
                                positionClass: 'toast-bottom-left',
                                containerId: 'toast-bottom-left'
                            });
                    else
                        toastr.error('لطفا وارد حساب کاربری خود شوید', {
                            positionClass: 'toast-bottom-left',
                            containerId: 'toast-bottom-left'
                        });
                else
                    toastr.error(
                        'تعداد درخواست ها بیش از حد مجاز است لطفا پس از دقایقی مجدد تلاش کنید',
                        'خطا',
                        {
                            positionClass: 'toast-bottom-left',
                            containerId: 'toast-bottom-left'
                        }
                    );
            else
                toastr.error('اجازه ی دسترسی ندارید', 'خطا', {
                    positionClass: 'toast-bottom-left',
                    containerId: 'toast-bottom-left'
                });
        }
    }),
    $(document).on('click', '#checkout-link', function () {
        $('#checkout-form').trigger('submit');
    }),
    $('[data-toggle="popover"]').popover(),
    $('#province').change(function () {
        if (
            ($('#city').empty(),
            $('#city').append('<option value="">انتخاب کنید</option>'),
            $('#city').trigger('change'),
            $('.custom-select-ui select').niceSelect('update'),
            $(this).val())
        ) {
            var t = $(this).find(':selected').val();
            $.ajax({
                type: 'get',
                url: '/province/get-cities',
                data: {id: t},
                success: function (t) {
                    $(t).each(function () {
                        $('#city').append(
                            '<option value="' +
                                $(this)[0].id +
                                '">' +
                                $(this)[0].name +
                                '</option>'
                        );
                    }),
                        $('.custom-select-ui select').niceSelect('update');
                },
                beforeSend: function () {}
            });
        }
    }),
    $('header.main-header .search-area form.search input').keyup(
        delay(function (t) {
            var e = $(this).val();
            if (!(e = $.trim(e)))
                return (
                    $(
                        'header.main-header .search-area form.search .search-result'
                    ).removeClass('open'),
                    void $(
                        'header.main-header .search-area form.search .close-search-result'
                    ).removeClass('show')
                );
            $.ajax({
                url: '/search',
                type: 'POST',
                data: {q: e},
                success: function (t) {
                    $(
                        'header.main-header .search-area form.search .search-result'
                    ).removeClass('open'),
                        $(
                            'header.main-header .search-area form.search .search-result ul'
                        ).empty(),
                        $(
                            'header.main-header .search-area form.search .close-search-result'
                        ).removeClass('show'),
                        t.length &&
                            ($(t).each(function (t, e) {
                                $(
                                    'header.main-header .search-area form.search .search-result ul'
                                ).append(
                                    '<li class="d-flex p-2 px-3">\n                                <div>\n                                    <img src="'
                                        .concat(e.image, '" alt="')
                                        .concat(
                                            e.title,
                                            '">\n                                </div>\n                                <div class="search-result-text">\n                                    <div class="search-result-body">\n                                        <a class="mr-3" href="'
                                        )
                                        .concat(e.link, '">')
                                        .concat(
                                            e.title,
                                            '</a>\n                                        <span class="text-muted mr-3">'
                                        )
                                        .concat(
                                            e.category,
                                            '</span>\n                                    </div>\n                                </div>\n                                <div class="box-search-price">\n                                    <span class="ml-3">'
                                        )
                                        .concat(
                                            e.price,
                                            '</span>\n                                    <a href="'
                                        )
                                        .concat(
                                            e.link,
                                            '" class="d-flex align-items-center">\n                                        <i class="mdi mdi-eye text-center search-icon "></i>\n                                    </a>\n                                </div>\n                            </li>'
                                        )
                                );
                            }),
                            $(
                                'header.main-header .search-area form.search .search-result'
                            ).addClass('open'),
                            $(
                                'header.main-header .search-area form.search .close-search-result'
                            ).addClass('show'));
                },
                beforeSend: function (t) {
                    t.setRequestHeader(
                        'X-CSRF-TOKEN',
                        $('meta[name="csrf-token"]').attr('content')
                    );
                },
                error: function () {}
            });
        }, 300)
    ),
    $('header.main-header .search-area form.search .close-search-result').on(
        'click',
        function () {
            $(this).removeClass('show'),
                $(
                    'header.main-header .search-area form.search .search-result'
                ).removeClass('open');
        }
    ),
    $('img.captcha').on('click', reloadCaptcha),
    void 0 !== $.lazyLoadXT &&
        (($.lazyLoadXT.onload.addClass =
            'animated fadeIn lazyLoadXT-completed'),
        ($.lazyLoadXT.selector = 'img[data-src]:not(.lazyLoadXT-completed)'),
        setInterval(function () {
            $(window).lazyLoadXT();
        }, 1500),
        $(document).on('lazyerror', function (t, e) {
            $(e).attr('data-src', '');
        })),
    (jQuery.fn.activationCodeInput = function (t) {
        var e = $.extend({}, {number: 4, length: 1}, t);
        return this.each(function () {
            var t = $(this),
                n = $('<div />').addClass('activation-code'),
                i = t.attr('placeholder');
            n.append($('<span />').text(i)), t.replaceWith(n), n.append(t);
            for (
                var o = $('<div />').addClass('activation-code-inputs'), r = 1;
                r <= e.number;
                r++
            )
                o.append(
                    $('<input />').attr({
                        maxLength: e.length,
                        onkeydown: 'return inputFilter(event)',
                        oncopy: 'return false',
                        onpaste: 'return false',
                        oncut: 'return false',
                        ondrag: 'return false',
                        ondrop: 'return false',
                        type: 'number'
                    })
                );
            n.prepend(o),
                n.on('click touchstart', function (t) {
                    n.hasClass('active') ||
                        (n.addClass('active'),
                        setTimeout(function () {
                            n.find(
                                '.activation-code-inputs input:first-child'
                            ).focus();
                        }, 200));
                }),
                n
                    .find('.activation-code-inputs')
                    .on('keyup input', 'input', function (i) {
                        ($(this).val().toString().length != e.length &&
                            39 != i.keyCode) ||
                            ($(this).next().focus(),
                            $(this).val().toString().length &&
                                $(this).css('border-color', '#46b2f0')),
                            (8 != i.keyCode && 37 != i.keyCode) ||
                                ($(this).prev().focus(),
                                $(this).val().toString().length ||
                                    $(this).css('border-color', '#ccc'));
                        var o = '';
                        n
                            .find('.activation-code-inputs input')
                            .each(function () {
                                o += $(this).val().toString();
                            }),
                            t.attr({value: o});
                    }),
                $(document).on('click touchstart', function (t) {
                    if (
                        !$(t.target).parent().is(n) &&
                        !$(t.target).is(n) &&
                        !$(t.target).parent().parent().is(n)
                    ) {
                        var e = !0;
                        n
                            .find('.activation-code-inputs input')
                            .each(function () {
                                $(this).val().toString().length && (e = !1);
                            }),
                            e ? n.removeClass('active') : n.addClass('active');
                    }
                });
        });
    });
var intervals = {};
$('.product-special-end-date').each(function (t, e) {
    var n = new Date($(e).data('date')).getTime(),
        i = setInterval(function () {
            var i = new Date().getTime(),
                o = n - i,
                r = Math.floor(o / 864e5),
                s = Math.floor((o % 864e5) / 36e5),
                a = Math.floor((o % 36e5) / 6e4),
                l = Math.floor((o % 6e4) / 1e3);
            $(e).find('[data-days]').text(r),
                $(e).find('[data-hours]').text(s),
                $(e).find('[data-minutes]').text(a),
                $(e).find('[data-seconds]').text(l),
                o < 0 && (clearInterval(intervals[t]), $(e));
        }, 1e3);
    intervals[t] = i;
});

$(document).on('click', '.websiteDailyCodeGeneratorButton', function () {
    $('#websiteDailyCodeGeneratorModal').modal();
});
