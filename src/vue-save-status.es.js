import { isRef as d, isReactive as w, onBeforeUnmount as B } from "vue";
const a = {}, f = {}, c = [], i = (e, t, r) => {
  r ? a[e].push(t) : a[e] = t;
}, h = (e, t = -1) => {
  if (c.includes(e))
    return t > -1 ? a[e][t] : a[e];
}, l = (e, t, r) => {
  r ? f[e].push(t) : f[e] = t;
}, v = (e, t = -1) => {
  if (c.includes(e))
    return t > -1 ? f[e][t] : f[e];
}, $ = () => ({
  store: a,
  initStore: f,
  hasInitOnlyName: c
}), J = ({ store: e, initStore: t, hasInitOnlyName: r }) => {
  for (let o in e)
    a[o] = e[o];
  for (let o in t)
    f[o] = t[o];
  for (let o of r)
    c.push(o);
};
class A {
  /**
   * 设置数据
   * @param {string} key
   * @param {*} value
   */
  static setItem(t, r) {
    try {
      localStorage.setItem(t, JSON.stringify(r));
    } catch (o) {
      console.error(`Failed to set item: ${t}`, o);
    }
  }
  /**
   *获取数据
   * @param {string} key
   * @return {any|null}
   */
  static getItem(t) {
    try {
      const r = localStorage.getItem(t);
      return r ? JSON.parse(r) : null;
    } catch (r) {
      return console.error(`Failed to get item: ${t}`, r), null;
    }
  }
  /**
   * 删除数据
   * @param {string} key
   */
  static removeItem(t) {
    try {
      localStorage.removeItem(t);
    } catch (r) {
      console.error(`Failed to remove item: ${t}`, r);
    }
  }
  /**
   * 清除所有数据
   */
  static clear() {
    try {
      localStorage.clear();
    } catch (t) {
      console.error("Failed to clear localStorage", t);
    }
  }
  /**
   * 获取所有存储的数据
   * @return {{}}
   */
  static getAll() {
    try {
      const t = {};
      for (let r = 0; r < localStorage.length; r++) {
        const o = localStorage.key(r);
        t[o] = JSON.parse(localStorage.getItem(o));
      }
      return t;
    } catch (t) {
      return console.error("Failed to get all items from localStorage", t), {};
    }
  }
}
class O {
  /**
   * 设置数据
   * @param {string} key
   * @param {*} value
   */
  static setItem(t, r) {
    try {
      sessionStorage.setItem(t, JSON.stringify(r));
    } catch (o) {
      console.error(`Failed to set item: ${t}`, o);
    }
  }
  /**
   *获取数据
   * @param {string} key
   * @return {any|null}
   */
  static getItem(t) {
    try {
      const r = sessionStorage.getItem(t);
      return r ? JSON.parse(r) : null;
    } catch (r) {
      return console.error(`Failed to get item: ${t}`, r), null;
    }
  }
  /**
   * 删除数据
   * @param {string} key
   */
  static removeItem(t) {
    try {
      sessionStorage.removeItem(t);
    } catch (r) {
      console.error(`Failed to remove item: ${t}`, r);
    }
  }
  /**
   * 清除所有数据
   */
  static clear() {
    try {
      sessionStorage.clear();
    } catch (t) {
      console.error("Failed to clear sessionStorage", t);
    }
  }
  /**
   * 获取所有存储的数据
   * @return {{}}
   */
  static getAll() {
    try {
      const t = {};
      for (let r = 0; r < sessionStorage.length; r++) {
        const o = sessionStorage.key(r);
        t[o] = JSON.parse(sessionStorage.getItem(o));
      }
      return t;
    } catch (t) {
      return console.error("Failed to get all items from sessionStorage", t), {};
    }
  }
}
const u = "##vueSaveStatus##";
let y = O;
const E = {
  isOpenLocal: !1
};
function k() {
  console.log("恢复数据");
  const e = y.getItem(u);
  e && J(e);
}
function P() {
  setTimeout(() => {
    y.setItem(u, $());
  }, 0);
}
const _ = (e = "session") => {
  y = e === "local" ? A : O, window.addEventListener("beforeunload", P), k(), E.isOpenLocal = !0;
}, x = () => {
  c.forEach((e) => {
    i(e, null), l(e, null), y.removeItem(u);
  });
};
function n(e, t = /* @__PURE__ */ new WeakMap()) {
  if (e === null || typeof e != "object")
    return e;
  if (t.has(e))
    return t.get(e);
  let r;
  if (Array.isArray(e)) {
    r = [], t.set(e, r);
    for (let s = 0; s < e.length; s++)
      r[s] = n(e[s], t);
  } else if (e instanceof Date)
    r = new Date(e.getTime());
  else if (e instanceof RegExp)
    r = new RegExp(e.source, e.flags);
  else if (e instanceof Map) {
    r = /* @__PURE__ */ new Map(), t.set(e, r);
    for (const [s, I] of e)
      r.set(n(s, t), n(I, t));
  } else if (e instanceof Set) {
    r = /* @__PURE__ */ new Set(), t.set(e, r);
    for (const s of e)
      r.add(n(s, t));
  } else {
    r = {}, t.set(e, r);
    for (const s in e)
      e.hasOwnProperty(s) && (r[s] = n(e[s], t));
  }
  if (typeof e == "function")
    return e.bind({});
  const o = Object.getOwnPropertySymbols(e);
  for (const s of o)
    r[s] = n(e[s], t);
  return r;
}
function g(e) {
  return Object.prototype.toString.call(e).replace(/^\[object (\S+)\]$/, "$1").toLowerCase();
}
function S(e) {
  if (d(e))
    return e.value;
  if (w(e))
    return e;
}
function m(e, t) {
  if (d(e))
    e.value = t;
  else if (w(e))
    for (let r in e)
      e[r] = t[r];
}
const K = (e) => {
  if (!e) {
    console.info("getRecoverDataByName:参数onlyName不可为空");
    return;
  }
  if (g(e) === "string")
    return h(e);
  console.info("getRecoverDataByName:参数onlyName只能为String类型");
}, M = (e) => {
  if (!e) {
    console.info("onlyName必须");
    return;
  }
  const t = g(e);
  t === "array" ? e.forEach((r) => {
    g(r) === "string" ? (i(e, null), l(e, null)) : console.info("传入的数组里的唯一标识不是string");
  }) : t === "string" ? (i(e, null), l(e, null)) : console.info("类型传参错误，clear参数仅支持string | array");
}, U = function(e, t, r, o) {
  g(o) === "function" && (o == null || o()), c.includes(e) || c.push(e), t && (r.length > 1 ? (i(e, []), r.forEach((s) => {
    i(e, n(S(s)), !0);
  })) : r.length === 1 && i(e, n(S(r[0]))));
};
function V(e) {
  let t, r, o;
  const s = g(e);
  return s === "string" ? t = e : s === "object" && (t = e.onlyName, r = e.beforeSave, o = e.autoRecover || !1), {
    onlyName: t,
    beforeSave: r,
    autoRecover: o
  };
}
function C(e, t) {
  t.length > 1 ? (l(e, []), t.forEach((r) => {
    l(e, n(S(r)), !0);
  })) : t.length === 1 && l(e, n(S(t[0])));
}
function R(e, t) {
  var r;
  c.includes(e) && (t.length > 1 ? (r = h(e)) == null || r.forEach((o, s) => {
    m(t[s], o);
  }) : t.length === 1 && m(t[0], h(e)));
}
function W(e, t) {
  t.length > 1 ? t.forEach((r, o) => {
    m(r, v(e, o));
  }) : t.length === 1 && m(t[0], v(e));
}
const q = () => {
  var e;
  return (e = $()) == null ? void 0 : e.store;
}, G = (e, ...t) => {
  E.isOpenLocal || (A.removeItem(u), O.removeItem(u));
  let r = !0;
  const { onlyName: o, beforeSave: s, autoRecover: I } = V(e);
  I && R(o, t), C(o, t);
  function p() {
    U(o, r, t, s);
  }
  window.addEventListener("beforeunload", p), B(() => {
    p(), window.removeEventListener("beforeunload", p);
  });
  const L = () => R(o, t), F = () => W(o, t);
  function D(T) {
    r = !!T;
  }
  return {
    recoverData: h(o),
    recoverDataAction: L,
    reSetData: F,
    controlRecordAction: D
  };
}, H = x, Q = K, X = M, Y = _, Z = q;
export {
  H as $clearRecoverData,
  X as $clearRecoverDataByName,
  Z as $getAllRecoverData,
  Q as $getRecoverDataByName,
  Y as $lastingDataOpen,
  G as $useSaveStatus
};
