const APP_CONFIG = {
  appsScriptUrl: localStorage.getItem("appsScriptUrl") || "",
};

function setAppsScriptUrl(url) {
  APP_CONFIG.appsScriptUrl = url;
  localStorage.setItem("appsScriptUrl", url);
}

function jsonp(url, params = {}) {
  return new Promise((resolve, reject) => {
    const callback = `cb_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const query = new URLSearchParams({ ...params, callback }).toString();
    const script = document.createElement("script");
    script.src = `${url}${url.includes("?") ? "&" : "?"}${query}`;
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP timeout"));
    }, 10000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callback];
      script.remove();
    }

    window[callback] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("JSONP failed"));
    };

    document.body.appendChild(script);
  });
}

async function loadSheetData(action) {
  if (!APP_CONFIG.appsScriptUrl) return null;
  try {
    return await jsonp(APP_CONFIG.appsScriptUrl, { action });
  } catch (err) {
    console.warn(err.message);
    return null;
  }
}

function bindSettingsForm() {
  const form = document.getElementById("settingsForm");
  if (!form) return;
  const input = document.getElementById("appsScriptUrl");
  input.value = APP_CONFIG.appsScriptUrl;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    setAppsScriptUrl(input.value.trim());
    alert("บันทึก URL สำเร็จ");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  bindSettingsForm();
});
