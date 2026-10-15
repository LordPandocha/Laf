(function () {
  "use strict";

  const dialog = document.querySelector("#product-experience");
  if (!dialog) return;

  const products = {
    base: {
      category: "01 / БАЗЫ",
      title: "Base Soft",
      description: "Мягкая база средней консистенции. После полимеризации остаётся эластичной; допустимый выравнивающий слой — до 1 мм.",
      image: "assets/onelaf-base-soft.jpg",
      alt: "Тюбик мягкой базы ONELAF Base Soft",
      url: "https://onelaf.ru/p/base-soft/",
      width: 1440,
      height: 1920
    },
    gel: {
      category: "02 / ГЕЛИ",
      title: "Gel Express Touch",
      description: "Gel Express Touch — моделирующий гель ONELAF. Посмотрите оттенки серии и подробное описание в каталоге бренда.",
      image: "assets/onelaf-gel-express-touch.jpg",
      alt: "Баночка моделирующего геля ONELAF Gel Express Touch",
      url: "https://onelaf.ru/p/gel-express/",
      width: 1254,
      height: 1254
    },
    top: {
      category: "03 / ФИНИШ",
      title: "Top Mirror",
      description: "Top Mirror — зеркальный топ ONELAF. Завершающий штрих покрытия, который задаёт характер всему маникюру.",
      image: "assets/onelaf-top-mirror-editorial.jpg",
      alt: "Редакционная съёмка ONELAF Top Mirror",
      url: "https://onelaf.ru/p/top-mirror/",
      width: 1080,
      height: 1350
    }
  };

  const closeButton = dialog.querySelector(".experience__close");
  const object = dialog.querySelector(".experience__object");
  const image = dialog.querySelector("#experience-image");
  const category = dialog.querySelector("#experience-category");
  const title = dialog.querySelector("#experience-title");
  const description = dialog.querySelector("#experience-description");
  const link = dialog.querySelector("#experience-link");
  const surface = dialog.querySelector(".experience__surface");
  const plane = dialog.querySelector(".experience__plane");
  const ribbon = dialog.querySelector(".experience__ribbon");
  const pageRegions = [
    document.querySelector("main"),
    document.querySelector(".site-header"),
    document.querySelector(".site-footer"),
    document.querySelector(".announcement")
  ].filter(Boolean);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const gsap = window.gsap;
  let activeKey = null;
  let timeline = null;
  let previousFocus = null;
  let pushedByUs = false;
  let closing = false;

  function setPageBlocked(blocked) {
    pageRegions.forEach(region => { region.inert = blocked; });
    document.body.classList.toggle("experience-open", blocked);
  }

  function fillProduct(product, key) {
    dialog.dataset.theme = key;
    category.textContent = product.category;
    title.textContent = product.title;
    description.textContent = product.description;
    image.src = product.image;
    image.alt = product.alt;
    image.width = product.width;
    image.height = product.height;
    link.href = product.url;
  }

  function clearAnimation() {
    if (!gsap) return;
    if (timeline) timeline.kill();
    timeline = null;
    gsap.set([dialog, surface, object, plane, ribbon, category, title, description, link], { clearProps: "all" });
  }

  function finishClose() {
    clearAnimation();
    dialog.hidden = true;
    setPageBlocked(false);
    activeKey = null;
    closing = false;
    pushedByUs = false;
    if (previousFocus && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    previousFocus = null;
  }

  function createTimeline(sourceRect) {
    if (!gsap || prefersReducedMotion.matches) return;
    const mobile = window.innerWidth <= 760;
    const targetRect = object.getBoundingClientRect();
    const origin = sourceRect || targetRect;
    const offsetX = origin.left + origin.width / 2 - (targetRect.left + targetRect.width / 2);
    const offsetY = origin.top + origin.height / 2 - (targetRect.top + targetRect.height / 2);
    const scaleX = Math.max(.18, origin.width / targetRect.width);
    const scaleY = Math.max(.18, origin.height / targetRect.height);

    gsap.set(dialog, { opacity: 0 });
    gsap.set(surface, { opacity: 0 });
    gsap.set(object, { x: offsetX, y: offsetY, scaleX, scaleY, rotationY: mobile ? -32 : -65, rotationZ: -5, opacity: .55, transformPerspective: 1100 });
    gsap.set(plane, { x: mobile ? -90 : -240, y: mobile ? 36 : 78, rotation: -24, scale: .65, autoAlpha: 0 });
    gsap.set(ribbon, { scaleX: 0 });
    gsap.set([category, description, link], { autoAlpha: 0, y: 16 });
    gsap.set(title, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });

    timeline = gsap.timeline({ paused: true, onReverseComplete: finishClose });
    timeline
      .to(dialog, { opacity: 1, duration: .22 }, 0)
      .to(surface, { opacity: 1, duration: .7 }, 0)
      .to(object, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationY: 360, rotationZ: 0, opacity: 1, duration: mobile ? .85 : 1.15, ease: "power3.inOut" }, .08)
      .to(plane, { autoAlpha: 1, duration: .1 }, mobile ? .18 : .32)
      .to(plane, { x: 0, y: 0, rotation: 0, scale: 1, duration: mobile ? .55 : .8, ease: "power2.out" }, mobile ? .18 : .32)
      .to(plane, { scaleX: .1, scaleY: .08, autoAlpha: 0, duration: .23, ease: "power2.in" }, mobile ? .7 : 1.02)
      .to(ribbon, { scaleX: 1, duration: mobile ? .35 : .5, ease: "power3.out" }, mobile ? .75 : 1.04)
      .to(category, { autoAlpha: 1, y: 0, duration: .3 }, mobile ? .78 : 1.12)
      .to(title, { autoAlpha: 1, clipPath: "inset(0 0 0 0)", duration: mobile ? .42 : .58, ease: "power3.out" }, mobile ? .88 : 1.2)
      .to(description, { autoAlpha: 1, y: 0, duration: .42 }, mobile ? 1.02 : 1.42)
      .to(link, { autoAlpha: 1, y: 0, duration: .42 }, mobile ? 1.12 : 1.54);
    timeline.play();
  }

  function openProduct(key, trigger, updateHistory) {
    if (!products[key] || activeKey) return;
    activeKey = key;
    closing = false;
    previousFocus = trigger || document.activeElement;
    if (updateHistory) {
      history.pushState({ onelafProduct: key }, "", "#product-" + key);
      pushedByUs = true;
    }
    fillProduct(products[key], key);
    dialog.hidden = false;
    setPageBlocked(true);
    const sourceImage = trigger && trigger.closest(".material-scene")?.querySelector(".material-scene__visual img");
    const sourceRect = sourceImage ? sourceImage.getBoundingClientRect() : null;
    createTimeline(sourceRect);
    closeButton.focus({ preventScroll: true });
  }

  function beginClose() {
    if (!activeKey || closing) return;
    closing = true;
    if (timeline) timeline.timeScale(3).reverse();
    else finishClose();
  }

  function requestClose() {
    if (!activeKey || closing) return;
    beginClose();
    if (location.hash === "#product-" + activeKey) {
      if (pushedByUs) history.back();
      else history.replaceState(null, "", location.pathname + location.search);
    }
  }

  document.querySelectorAll(".experience-trigger[data-product]").forEach(button => {
    button.addEventListener("click", () => openProduct(button.dataset.product, button, true));
  });
  closeButton.addEventListener("click", requestClose);
  document.addEventListener("keydown", event => {
    if (!activeKey) return;
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose();
    } else if (event.key === "Tab") {
      const focusable = [closeButton, link];
      const index = focusable.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); link.focus(); }
      else if (!event.shiftKey && index === focusable.length - 1) { event.preventDefault(); closeButton.focus(); }
    }
  });
  window.addEventListener("popstate", () => {
    const key = location.hash.startsWith("#product-") ? location.hash.slice(9) : null;
    if (activeKey && key !== activeKey) beginClose();
    else if (!activeKey && key && products[key]) openProduct(key, null, false);
  });

  document.documentElement.classList.add("experience-ready");
  const initialKey = location.hash.startsWith("#product-") ? location.hash.slice(9) : null;
  if (initialKey && products[initialKey]) openProduct(initialKey, null, false);
})();
