function qSel(e, t = document) {
  return t.querySelector(e);
}
function qSelA(e, t = document) {
  return t.querySelectorAll(e);
}
function createNodeWithClass(e, ...t) {
  let s = document.createElement(e);
  return s.classList.add(...t), s;
}
const styles = (e) => getComputedStyle(e),
  parsI = (e) => parseInt(e),
  parsF = (e) => parseFloat(e),
  getElemTransition = (e) => parsF(styles(e).transitionDuration),
  scrollSmoothTo = (e) => scrollTo({ top: e, left: 0, behavior: "smooth" }),
  getElemPagePos = (e) => {
    let t = e.getBoundingClientRect();
    return { y: t.top + pageYOffset, x: t.left + pageXOffset, rect: t };
  },
  getCenteredYElemPagePos = (e) => {
    let t = getElemPagePos(e),
      s = t.y,
      n = t.rect.height;
    if (n >= window.innerHeight) return s;
    let l = (window.innerHeight - n) / 2;
    return s - l;
  },
  btnWave = () => {
    let e = () => {
        let e = createNodeWithClass(
          "span",
          "wave-effect",
          "wave-effect--template"
        );
        document.body.append(e);
        let t = 1e3 * getElemTransition(e);
        return e.remove(), t;
      },
      t = e(),
      s = qSelA(".btn--waved"),
      n = 0;
    for (let l of s) o(l);
    function o(e) {
      e.addEventListener("mousedown", (s) => {
        let l = setTimeout(function e() {
            n >= t && clearTimeout(l), (n += 100), (l = setTimeout(e, 100));
          }, 100),
          o = createNodeWithClass("span", "wave-effect");
        e.append(o);
        let r = parsF(styles(e).width) + "px";
        (o.style.width = r), (o.style.height = r);
        let i = styles(o);
        function a(s) {
          e.addEventListener(s, () => {
            clearTimeout(l),
              new Promise((e) => {
                setTimeout(() => {
                  var t;
                  (t = e), (o.style.opacity = "0"), t();
                }, t - n);
              }).then(() => {
                (n = 0),
                  setTimeout(() => {
                    o.remove();
                  }, t);
              });
          });
        }
        (o.style.top = `${s.offsetY - parsF(i.height) / 2}px`),
          (o.style.left = `${s.offsetX - parsF(i.width) / 2}px`),
          o.classList.add("active"),
          a("mouseup"),
          a("mouseout");
      });
    }
  },
  modal = () => {
    let e = qSel(".btn--book-modal"),
      t = qSel(".modal--book"),
      s = (e, t) => {
        let s = (e) => {
          t.classList.add("active"),
            (document.body.style.overflow = "hidden"),
            currentNoScrollSessions.push("modal");
          let s = (e) => {
            let n = qSel(".modal__exit", t);
            (e.target == n || e.target == t) &&
              (t.classList.remove("active"),
              (document.body.style.overflow = ""),
              currentNoScrollSessions.splice(
                currentNoScrollSessions.indexOf("modal"),
                1
              ),
              document.removeEventListener("click", s));
          };
          document.addEventListener("click", s);
        };
        e.addEventListener("click", s);
      };
    s(e, t);
  },
  forms = () => {
    let e = () => {
        let e = qSelA(".form--animated");
        for (let t of e)
          t.addEventListener("focus", () => {
            let e = qSel(".form__label", t.parentNode);
            e.classList.contains("chosen") ||
              (e.classList.add("chosen"),
              t.parentNode.classList.add("selected")),
              t.addEventListener("blur", function e(s) {
                t.value.length || (u(t), t.removeEventListener("blur", e));
              });
          });
      },
      t = () => {
        let e = qSelA(".btn--form");
        for (let t of e) t.addEventListener("click", s);
        function s(e) {
          let t = (e) => qSel(e, this.parentNode),
            s = new Map()
              .set(t(".form__elem--name"), /^[a-z0-9]{2,60}$/)
              .set(
                t(".form__elem--phone"),
                /^[+][0-9]{3}[(][0-9]{2}[)][0-9]{2}[-][0-9]{2}[-][0-9]{3}$/
              )
              .set(
                t(".form__elem--email"),
                /^[a-z0-9][a-z0-9.-_]{2,62}[a-z0-9][@][a-z0-9]{1,30}[.][a-z]{2,10}([.][a-z]{2,10})?$/
              )
              .set(t(".select__hidden--people"), /^[0-9]{1,2}$/)
              .set(t(".select__hidden--time"), /^[0-9]{2}[:][0-9]{2}$/)
              .set(t(".form__elem--date"), /^[0-9]{2}[/][0-9]{2}$/)
              .set(t(".form__elem--message"), /^[a-z0-9]{2,60}$/);
          (() => {
            for (let t of s)
              if (t[0] && 0 != c(t[0], t[1])) {
                let n = (e) => {
                  let t = e.closest(".form__section");
                  t.classList.add("wrong-input"), t.classList.add("selected");
                };
                n(t[0]), e.preventDefault();
                let l = () => {
                  this.classList.contains("rejected") ||
                    (this.classList.add("rejected"),
                    setTimeout(() => {
                      this.classList.remove("rejected");
                    }, 1e3));
                };
                l();
              }
          })(),
            (function e() {
              for (let t of s)
                t[0] &&
                  ("INPUT" == t[0].tagName || "TEXTAREA" == t[0].tagName) &&
                  t[0].addEventListener("input", () => {
                    setTimeout(() => {
                      c(t[0], t[1]) || d(t[0]);
                    }, 1);
                  });
            })();
        }
      },
      s = () => {
        let e = qSelA(".form__elem--template");
        for (let t of e) {
          let s = [],
            n;
          function l(e) {
            null == e.data
              ? s.includes("_")
                ? s.splice(s.indexOf("_") - 1, 1, "_")
                : s.splice(s.length - 1, 1, "_")
              : e.data.match(/[0-9]/) &&
                s.includes("_") &&
                s.splice(s.indexOf("_"), 1, e.data),
              o();
          }
          function o() {
            let e = Array.from(n),
              l = 0;
            e.forEach((e, t, n) => {
              "_" == e && ((n[t] = s[l]), l++);
            }),
              (t.value = e.join(""));
          }
          function r() {
            l(), (n = n.replace(/[.]/g, "_"));
            for (let e = 0; e < n.match(RegExp("_", "g")).length; e++)
              s.push("_");
            function l() {
              t.classList.contains("form__elem--phone") &&
                (n = "+380(..)..-..-..."),
                t.classList.contains("form__elem--date") && (n = "../..");
            }
          }
          r(),
            t.addEventListener("focus", (e) => {
              o(),
                t.addEventListener("input", l),
                t.addEventListener("blur", () => {
                  "_" == s[0] && u(t), t.removeEventListener("input", l);
                });
            });
        }
      },
      n = () => {
        let e = qSelA(".select");
        for (let t of e)
          t.addEventListener("mousedown", (s) => {
            let n = qSel(".select__menu", t);
            if (
              s.target == t ||
              (s.target.closest(".select") &&
                !s.target.closest(".select__menu"))
            ) {
              if (n.classList.contains("extended")) h();
              else {
                m(), i();
                let l = qSel("ul", t);
                function i() {
                  let s = Array.from(e);
                  for (let n of (s.splice(s.indexOf(t), 1), s)) {
                    let l = qSel(".select__menu", n);
                    n.classList.contains("extended") && h(n, l);
                  }
                }
                function a() {
                  (scrollbarElem = qSel(".scrollbar__elem", t)),
                    setTimeout(() => {
                      (scrollbarElem.style.display = "block"),
                        setTimeout(() => {
                          scrollbarElem.classList.add("active");
                        }, 50);
                    }, 500);
                }
                function u() {
                  for (let e of qSelA("li", t)) {
                    e.addEventListener("click", function n(l) {
                      t.classList.add("selected"),
                        qSel(".form__label", t).classList.add("chosen"),
                        s();
                      let o = qSel(".select__hidden", e.closest(".select"));
                      0 == c(o) && d(e.closest(".select")),
                        h(),
                        e.removeEventListener("click", n);
                    });
                    function s() {
                      let s = qSel(".select__current-value", t);
                      (s.innerText = e.innerText),
                        s.classList.add("selected"),
                        qSel("select", t).setAttribute("value", e.innerText);
                    }
                  }
                }
                r(n) < o(l) && a(),
                  document.addEventListener("mousedown", function e(s) {
                    s.target == t ||
                      s.target.closest(".select") ||
                      (h(), document.removeEventListener("click", e));
                  }),
                  u();
              }
            }
            function h(e = t, s = n) {
              function l() {
                let t = e.closest(".form__section"),
                  s = qSel(".select__hidden", t).getAttribute("value");
                t.classList.remove("wrong-input"),
                  s || t.classList.remove("selected");
              }
              e.classList.remove("extended"),
                s.classList.remove("extended"),
                currentNoScrollSessions.splice(
                  currentNoScrollSessions.indexOf("field"),
                  1
                ),
                l();
            }
            function m() {
              n.classList.add("extended"),
                t.classList.add("extended"),
                currentNoScrollSessions.push("field");
            }
          });
      },
      l = () => {
        let e = qSelA(".scrollbar__elem");
        for (let t of e) {
          let s = o(t),
            n = r(t.parentNode),
            l = t.closest(".select__menu"),
            i = r(l),
            a = qSel("ul", l),
            c = a.scrollHeight - i,
            d = c / (n - s) + 1;
          "" == t.style.transform && (t.style.transform = "translateY(0px)");
          let u = () => +t.style.transform.match(/-*[0-9]+(.[0-9])*/)[0],
            h = () => {
              t.classList.add("smooth"), a.classList.add("smooth");
            },
            m = () => {
              t.classList.remove("smooth"), a.classList.remove("smooth");
            };
          function f(e) {
            let s = e.touches;
            l.removeEventListener("wheel", g);
            let n = 0,
              o = s?.[0].clientY || e.layerY,
              r = (e) => {
                e.preventDefault(),
                  m(),
                  (n = (e.touches?.[0].clientY || e.layerY) - o),
                  (n = s ? -(n / d) : n),
                  (t.style.transform = `translateY(${u() + n}px)`),
                  $(),
                  (o = e.touches?.[0].clientY || e.layerY),
                  v();
              };
            l.addEventListener(s ? "touchmove" : "mousemove", r);
            let i = () => {
              document.addEventListener(
                s ? "touchend" : "mouseup",
                function e() {
                  l.removeEventListener(s ? "touchmove" : "mousemove", r),
                    document.removeEventListener(s ? "touchend" : "mouseup", e),
                    l.addEventListener("wheel", g);
                }
              );
            };
            i();
          }
          function g(e) {
            e.preventDefault(),
              h(),
              (t.style.transform = `translateY(${u() + e.deltaY / 7}px)`),
              $(),
              v();
          }
          function v() {
            let e = (100 * u()) / (n - s);
            a.style.transform = `translateY(-${e * (c / 100)}px)`;
          }
          function $() {
            0 > u() && (t.style.transform = "translateY(0px)"),
              u() > n - s && (t.style.transform = `translateY(${n - s}px)`);
          }
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
            ? l.addEventListener("touchstart", f)
            : (l.addEventListener("wheel", g),
              t.addEventListener("mousedown", f));
        }
        for (let p of qSelA(".modal"))
          p.classList.add("modal--after-height-calc");
      };
    function o(e) {
      return parsF(styles(e).height);
    }
    function r(e) {
      return parsF(styles(e).maxHeight);
    }
    function i() {
      return !(window.innerWidth > 768);
    }
    function a() {
      for (let e of qSelA("input, textarea")) e.value = "";
    }
    function c(e, t = /[0-9]/) {
      return "INPUT" == e.tagName || "TEXTAREA" == e.tagName
        ? e.value.toLowerCase().trim().search(t)
        : "SELECT" == e.tagName
        ? e.getAttribute("value").toLowerCase().trim().search(t)
        : void 0;
    }
    function d(e) {
      let t = e.closest(".form__section");
      t.classList.remove("wrong-input"), t.classList.add("selected");
    }
    function u(e) {
      let t = qSel(".form__label", e.parentNode);
      t.classList.remove("chosen"),
        e.parentNode.classList.remove("selected"),
        e.parentNode.classList.remove("wrong-input"),
        (e.value = "");
    }
    a(), e(), n(), l(), s(), t();
  },
  backgroundSlider = () => {
    let e = qSelA(".slider");
    for (let t of e) {
      let s = 0,
        n = 1,
        l = qSel(".slider-btns", t.parentNode),
        o = l.children,
        r = qSelA(".slider__slide", t),
        i = [
          "./assets/img/chocolate/bg.jpg",
          "./assets/img/master/bg.jpg",
          "./assets/img/header/bg.jpg",
        ],
        a = 1e3 * getElemTransition(r[0]);
      for (let c = 0; c < r.length; c++)
        r[c].style.backgroundImage = `url(${i[c]})`;
      let d = setInterval(m, 5e3);
      function u(e) {
        if ("BUTTON" == e.target.tagName && n) {
          s = Array.from(o).findIndex((t) => t == e.target);
          let l = qSel(".slider__slide--second", t);
          (l.style.backgroundImage = `url(${i[s]})`), f(), g();
        }
      }
      function h() {
        for (let e of o) e.classList.remove("slider__btn--active");
        o[s].classList.add("slider__btn--active");
      }
      function m() {
        n && (e(), f());
        function e() {
          ++s == i.length && (s = 0);
        }
      }
      function f() {
        let e = qSel(".slider__slide--current", t),
          s = qSel(".slider__slide--second", t),
          n = e == e.parentNode.children[0];
        function l() {
          setTimeout(() => {
            function t() {
              let e = s.style.backgroundImage.match(
                  /(\/assets\/img\/).+(\.jpg)|(\.png)/i
                )[0],
                t = i.indexOf(e);
              return t == i.length - 1 ? i[0] : i[t + 1];
            }
            e.classList.remove("slider__slide--current"),
              n
                ? e.classList.remove("slider__slide--clipped-reverse")
                : e.classList.remove("slider__slide--clipped"),
              e.classList.add("slider__slide--second"),
              (e.style.backgroundImage = `url(${t()})`),
              s.classList.add("slider__slide--current"),
              s.classList.remove("slider__slide--second");
          }, a);
        }
        function o() {
          n
            ? e.classList.add("slider__slide--clipped-reverse")
            : e.classList.add("slider__slide--clipped");
        }
        o(), v(), h(), l();
      }
      function g() {
        clearInterval(d),
          setTimeout(() => {
            d = setInterval(m, 5e3);
          }, a);
      }
      function v() {
        (n = 0),
          setTimeout(() => {
            n = 1;
          }, a);
      }
      l.addEventListener("click", u);
    }
  },
  tabs = () => {
    let e = () => {
      let e = qSel(".menu__show-more");
      function t() {
        let e = qSel(".menu__body", this.closest(".menu"));
        if ((this.classList.toggle("accordeon-extended"), e.style.height))
          (e.style.height = ""),
            scrollTo({
              top: getElemPagePos(this.closest(".menu")).y,
              left: 0,
              behavior: "smooth",
            });
        else {
          let t = (e) => parsF(e.scrollHeight);
          e.style.height = `${t(e) + t(this)}px`;
        }
      }
      e.addEventListener("click", t);
    };
    e();
    let t = qSel(".menu__header"),
      s = qSelA(".menu__kind", t),
      n = qSelA(".menu__section"),
      l = 1,
      o = window.innerWidth <= 768;
    function r(e) {
      if (e.target.classList.contains("menu__kind") && l) {
        let t = Array.from(s).indexOf(e.target),
          r = qSel(".menu__section--active"),
          i = n[t].classList.contains("menu__section--active");
        function a() {
          for (let e of n) e.classList.remove("menu__section--active");
          n[t].classList.add("menu__section--active");
        }
        !i &&
          (o
            ? a()
            : (function e() {
                let t = 1e3 * parsF(styles(r).animationDuration);
                new Promise((e) => {
                  (l = 0),
                    r.classList.add("menu__section--closed"),
                    setTimeout(() => {
                      r.classList.remove("menu__section--closed"), e();
                    }, t - 50);
                }).then(() => {
                  a(), setTimeout(() => (l = 1), t);
                });
              })());
      }
    }
    t.addEventListener("click", r);
  },
  clipboard = () => {
    let e = (e, t, s) => {
        if (!qSel(".notification")) {
          let n = s.clientY >= (window.innerHeight / 100) * 35,
            l = createNodeWithClass("span", "notification"),
            o = createNodeWithClass(
              "span",
              n ? "notification__top" : "notification__bottom"
            );
          l.append(o), (o.innerText = e), document.body.append(l);
          let r = () => {
            let e = l.getBoundingClientRect().height,
              t = getElemPagePos(s.target);
            n
              ? (l.style.top = `${t.y - (e + 10)}px`)
              : (l.style.top = `${t.y + (e + 10)}px`),
              (l.style.left = `${
                t.x + s.target.getBoundingClientRect().width / 2 - 18
              }px`);
          };
          r(),
            l.classList.add("show-fade"),
            setTimeout(() => {
              l.classList.remove("show-fade");
              let e = 1e3 * getElemTransition(l);
              setTimeout(() => l.remove(), e);
            }, t);
        }
      },
      t = qSel(".contacts__item--address");
    function s(t) {
      let s = (() => {
        let e = createNodeWithClass("input", "contacts__input--hidden");
        return (e.value = this.textContent.trim()), e;
      })();
      if ((document.body.append(s), "" != s.value)) {
        var n;
        (n = s).select(),
          document.execCommand("copy"),
          e("Succefully copied", 2e3, t);
      }
      s.remove();
    }
    t.addEventListener("click", s);
  };
window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
});
const currentNoScrollSessions = [],
  anchorElems = new Map()
    .set(qSel("._anchor-home"), qSel("._anchor-home--target"))
    .set(qSel("._anchor-about"), qSel("._anchor-about--target"))
    .set(qSel("._anchor-team"), qSel("._anchor-team--target"))
    .set(qSel("._anchor-booking"), qSel("._anchor-booking--target"))
    .set(qSel("._anchor-menu"), qSel("._anchor-menu--target"))
    .set(qSel("._anchor-galerie"), qSel("._anchor-galerie--target"))
    .set(qSel("._anchor-events"), qSel("._anchor-events--target"))
    .set(qSel("._anchor-contact"), qSel("._anchor-contact--target"));
btnWave();
class Nav {
  constructor(e) {
    (this.nav = e), (this.transition = 1e3 * getElemTransition(e));
  }
  notify(e, t) {
    if (e.constructor == Anchor && "scrollToAnchor" == t) {
      let s = getCenteredYElemPagePos(e.target);
      this.burgerMenu.getActiveStatus()
        ? (this.burgerMenu.hideBurgerMenu(),
          setTimeout(() => {
            scrollSmoothTo(s);
          }, this.transition))
        : window.innerWidth >= 1024
        ? ((this.pageScroll.currentPos = this.pageScroll.scrollSections.indexOf(
            e.target
          )),
          this.pageScroll.scrollToElem())
        : scrollSmoothTo(s);
    }
  }
}
const nav = new Nav(qSel(".nav"));
if (window.innerWidth >= 1024) {
  class e {
    constructor(e, t) {
      (this.scrollSections = e),
        (this.sectionCoords = this.scrollSections.map(
          (e) => getElemPagePos(e).y
        )),
        (this.sectionCoordsLength = this.sectionCoords.length - 1),
        (this.currentPos = 0),
        (this.navMediator = t),
        (t.pageScroll = this);
    }
    scrollToElem() {
      (() => {
        let e = qSelA("input, textarea");
        e.forEach((e) => e.blur());
      })(),
        scrollSmoothTo(this.sectionCoords[this.currentPos]),
        currentNoScrollSessions.push(1),
        setTimeout(() => {
          currentNoScrollSessions.pop();
        }, 1e3);
    }
    scrollByBtn() {
      currentNoScrollSessions.length ||
        (this.currentPos++, this.scrollToElem());
    }
    scrollByWheel(e) {
      currentNoScrollSessions.length ||
        (e.deltaY > 0 ? this.currentPos++ : this.currentPos--,
        this.currentPos > this.sectionCoordsLength
          ? (this.currentPos = this.sectionCoordsLength)
          : this.currentPos < 0
          ? (this.currentPos = 0)
          : this.scrollToElem());
    }
  }
  let t = new e(Array.from(qSelA("._scroll-page")), nav);
  window.addEventListener("wheel", (e) => {
    t.scrollByWheel(e);
  }),
    qSelA(".arrow-scroll").forEach((e) => {
      e.addEventListener("click", () => t.scrollByBtn());
    });
}
class BurgerMenu {
  constructor(e, t) {
    (this.btn = e), (this.navMediator = t), (t.burgerMenu = this);
  }
  showBurgerMenu() {
    this.btn.classList.add("burger--active"),
      this.navMediator.nav.classList.add("showed"),
      (document.body.style.overflow = "hidden");
  }
  hideBurgerMenu() {
    this.btn.classList.remove("burger--active"),
      this.navMediator.nav.classList.remove("showed"),
      (document.body.style.overflow = "");
  }
  getActiveStatus() {
    return this.btn.classList.contains("burger--active");
  }
}
const burgerMenu = new BurgerMenu(qSel(".burger"), nav);
burgerMenu.btn.addEventListener("click", () => {
  burgerMenu.getActiveStatus()
    ? burgerMenu.hideBurgerMenu()
    : burgerMenu.showBurgerMenu();
});
class Anchor {
  constructor(e, t, s) {
    (this.navMediator = s),
      (this.btn = e),
      (this.target = t),
      (s.anchor = this);
  }
  scrollToAnchor() {
    this.navMediator.notify(this, "scrollToAnchor");
  }
}
for (let item of anchorElems) {
  let s = new Anchor(item[0], item[1], nav);
  s.btn.addEventListener("click", (e) => {
    e.preventDefault(), s.scrollToAnchor();
  });
}
modal(), forms(), backgroundSlider(), tabs(), clipboard();
