(function () {
  function $(sel) {
    return document.querySelector(sel);
  }
  function qa(sel) {
    return document.querySelectorAll(sel);
  }
  function text(v) {
    return v == null ? "" : String(v);
  }
  function splitLines(val) {
    return text(val)
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  function sanitizeFileName(name) {
    return (
      text(name)
        .toLowerCase()
        .replace(/[^a-z0-9\-\_ ]+/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 64) || "mi-cv"
    );
  }
  window.CVUtils = { $, qa, text, splitLines, sanitizeFileName };
})();
