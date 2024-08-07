document.addEventListener("DOMContentLoaded", () => {
  if (document && document.body && document.head) {
    const isProd = window.location.host === "www.tesla.com";
    const cookieBannerStageSrc =
      "https://digitalassets.tesla.com/raw/upload/emea-market-assets/stage/cookie-banner.js";
    const cookieBannerProdSrc =
      "https://digitalassets.tesla.com/raw/upload/emea-market-assets/prod/cookie-banner.js";
    const optimizelyUrl = "https://cdn.optimizely.com/js/27160410180.js";
    const cookieBannerSrc = isProd ? cookieBannerProdSrc : cookieBannerStageSrc;
    const cookieBannerScript = document.createElement("script");
    cookieBannerScript.setAttribute("src", cookieBannerSrc);
    cookieBannerScript.setAttribute("type", "text/javascript");
    document.body.append(cookieBannerScript);
    const cookieBannerStyleNode = document.createElement("style");
    cookieBannerStyleNode.type = "text/css";
    const zIndexStyleText = document.createTextNode(
      "#cookie_banner { z-index: 100001 !important; }"
    );
    const positionStyleText = document.createTextNode(
      "#cookie_banner { position: sticky !important; }"
    );
    cookieBannerStyleNode.appendChild(zIndexStyleText);
    cookieBannerStyleNode.appendChild(positionStyleText);
    document.head.append(cookieBannerStyleNode);
    function addScriptToParent(e, t) {
      const scriptElement = document.createElement("script");
      scriptElement.setAttribute("src", e);
      scriptElement.setAttribute("type", "text/javascript");
      t.append(scriptElement);
    }
    function checkIfConsentAccepted(e) {
      const emeaCountries = [
        "ar_ae",
        "ar_jo",
        "ar_qa",
        "cs_cz",
        "da_dk",
        "de_at",
        "de_ch",
        "de_de",
        "de_lu",
        "el_gr",
        "en_ee",
        "en_lt",
        "en_lv",
        "en_sk",
        "en_ae",
        "en_eu",
        "en_gb",
        "en_ie",
        "en_jo",
        "en_qa",
        "es_es",
        "fi_fi",
        "fr_be",
        "fr_ch",
        "fr_fr",
        "fr_lu",
        "he_il",
        "hr_hr",
        "hu_hu",
        "is_is",
        "it_ch",
        "it_it",
        "ja_jp",
        "jp",
        "nl_be",
        "nl_nl",
        "no_no",
        "pl_pl",
        "pt_pt",
        "ro_ro",
        "sl_si",
        "sv_se",
        "tr_tr",
      ];
      const currentRegion =
        window.drupalSettings.path.currentLanguage || "en_us";
      return (
        (emeaCountries.includes(currentRegion) && e == "accepted") ||
        (!emeaCountries.includes(currentRegion) && currentRegion !== "zh_cn")
      );
    }
    function addOptimizelySnippet(e) {
      if (checkIfConsentAccepted(e)) {
        addScriptToParent(optimizelyUrl, document.body);
      }
    }
    document.addEventListener("tsla-cookie-consent", (consent) => {
      const cookieBannerEl = document.querySelector("#cookie_banner");
      if (cookieBannerEl && consent.detail.decision === "accepted") {
        addOptimizelySnippet(consent.detail.decision);
        cookieBannerEl.style.setProperty("display", "none");
        window.dataLayer = [];
        (function (e, n, o, t, c) {
          e[t] = e[t] || [];
          e[t].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var a = n.getElementsByTagName(o)[0],
            i = n.createElement(o),
            r = t != "dataLayer" ? "&l=" + t : "";
          i.async = !0;
          i.src = "https://www.googletagmanager.com/gtm.js?id=" + c + r;
          a.parentNode.insertBefore(i, a);
        })(window, document, "script", "dataLayer", "GTM-KMG5DM");
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.style.visibility = "hidden";
        iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-KMG5DM";
        document.body.appendChild(iframe);
        window.TSLA_ANALYTICS.init();
        window.addEventListener(
          "scroll",
          () => {
            window.TSLA_ANALYTICS.genericScrollEventHandler();
          },
          !1
        );
      }
      if (cookieBannerEl && consent.detail.decision === "rejected") {
        cookieBannerEl.style.setProperty("display", "none");
      }
    });
    const consentDecisionAccepted =
      document.cookie.search("tsla-cookie-consent=accepted") > 1;
    addOptimizelySnippet(consentDecisionAccepted && "accepted");
    if (consentDecisionAccepted) {
      window.dataLayer = [];
      (function (e, n, o, t, c) {
        e[t] = e[t] || [];
        e[t].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var a = n.getElementsByTagName(o)[0],
          i = n.createElement(o),
          r = t != "dataLayer" ? "&l=" + t : "";
        i.async = !0;
        i.src = "https://www.googletagmanager.com/gtm.js?id=" + c + r;
        a.parentNode.insertBefore(i, a);
      })(window, document, "script", "dataLayer", "GTM-KMG5DM");
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.visibility = "hidden";
      iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-KMG5DM";
      document.body.appendChild(iframe);
      window.TSLA_ANALYTICS.init();
      window.addEventListener(
        "scroll",
        () => {
          window.TSLA_ANALYTICS.genericScrollEventHandler();
        },
        !1
      );
    }
  }
});
