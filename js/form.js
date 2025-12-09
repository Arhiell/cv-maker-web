(function () {
  const { $, qa } = window.CVUtils;
  const S = window.CVState;
  const R = window.CVRenderer;
  function initAccordionLabels() {
    const labels = {
      "sum-personal": "Datos personales",
      "sum-summary": "Resumen",
      "sum-experience": "Experiencia",
      "sum-education": "Educación",
      "sum-skills": "Habilidades",
      "sum-languages": "Idiomas",
      "sum-certifications": "Certificaciones",
      "sum-projects": "Proyectos",
      "sum-achievements": "Logros",
      "sum-volunteer": "Voluntariado",
      "sum-courses": "Cursos relevantes",
      "sum-config": "Configuración",
    };
    Object.keys(labels).forEach((id) => {
      const el = $("#" + id);
      if (el) el.dataset.label = labels[id];
    });
  }
  function bindSidebarToggle() {
    const editor = document.querySelector(".editor");
    const btn = $("#sidebar-toggle");
    if (!editor || !btn) return;
    function setExpanded(exp) {
      btn.setAttribute("aria-expanded", exp ? "true" : "false");
      editor.classList.toggle("collapsed", !exp);
      const dets = Array.from(qa("details.group"));
      dets.forEach((d) => {
        d.open = exp;
      });
      updateAccordionCounts();
    }
    btn.addEventListener("click", () => {
      const exp = btn.getAttribute("aria-expanded") !== "false";
      setExpanded(!exp);
    });
    setExpanded(true);
  }
  function updateAccordionCounts() {
    const counts = {
      "sum-experience": S.state.experience.length,
      "sum-education": S.state.education.length,
      "sum-skills":
        S.state.skills.frontend.length +
        S.state.skills.backend.length +
        S.state.skills.tools.length +
        S.state.skills.soft.length,
      "sum-languages": S.state.languages.length,
      "sum-certifications": S.state.certifications.length,
      "sum-projects": S.state.projects.length,
      "sum-achievements": S.state.achievements.length,
      "sum-volunteer": S.state.volunteer.length,
      "sum-courses": S.state.courses.length,
    };
    Object.keys(counts).forEach((id) => {
      const sum = $("#" + id);
      if (!sum) return;
      const det = sum.parentElement;
      const base = sum.dataset.label || (sum.dataset.label = sum.textContent);
      const n = counts[id];
      sum.textContent =
        det && !det.open && n > 0
          ? base + " (" + n + " elementos añadidos)"
          : base;
    });
  }
  function createChipsController(inputSel, boxSel, getList, setList) {
    const input = $(inputSel);
    const box = $(boxSel);
    if (!input || !box) return;
    function renderBox() {
      box.innerHTML = "";
      getList().forEach((val, i) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = val;
        const btn = document.createElement("button");
        btn.className = "remove";
        btn.type = "button";
        btn.setAttribute("aria-label", "Eliminar " + val);
        btn.textContent = "x";
        btn.addEventListener("click", () => {
          const arr = getList().slice();
          arr.splice(i, 1);
          setList(arr);
          renderBox();
          R.render(S.state);
          S.save();
          updateAccordionCounts();
        });
        chip.appendChild(btn);
        box.appendChild(chip);
      });
      updateAccordionCounts();
    }
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const v = input.value.trim();
        if (!v) return;
        const arr = getList().slice();
        if (!arr.includes(v)) {
          arr.push(v);
          setList(arr);
          input.value = "";
          renderBox();
          R.render(S.state);
          S.save();
          updateAccordionCounts();
        }
      } else if (e.key === "Backspace" && input.value === "") {
        const arr = getList().slice();
        arr.pop();
        setList(arr);
        renderBox();
        R.render(S.state);
        S.save();
        updateAccordionCounts();
      }
    });
    renderBox();
  }
  function bindCVInputs() {
    ["name", "role", "email", "phone", "location", "website"].forEach((id) => {
      const el = $("#" + id);
      if (!el) return;
      el.addEventListener("input", () => {
        S.state.personal[id] = el.value;
        R.render(S.state);
        S.save();
      });
    });
    const summary = $("#summary");
    if (summary)
      summary.addEventListener("input", () => {
        S.state.summary = summary.value;
        R.render(S.state);
        S.save();
      });
    [
      ["certifications", "#certifications"],
      ["projects", "#projects"],
      ["achievements", "#achievements"],
      ["volunteer", "#volunteer"],
      ["courses", "#courses"],
    ].forEach(([key, sel]) => {
      const el = $(sel);
      if (!el) return;
      el.addEventListener("input", () => {
        S.state[key] = window.CVUtils.splitLines(el.value);
        R.render(S.state);
        S.save();
        updateAccordionCounts();
      });
    });
  }
  function bindPhoto() {
    const fileInput = $("#photo");
    if (!fileInput) return;
    fileInput.addEventListener("change", () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = (e) => {
        S.state.personal.photo = e.target.result;
        R.render(S.state);
        S.save();
      };
      r.readAsDataURL(f);
    });
  }
  function bindTemplate() {
    const sel = $("#template");
    if (!sel) return;
    sel.addEventListener("change", () => {
      S.state.template = sel.value;
      R.render(S.state);
      S.save();
    });
  }
  function inputField(label, value, onInput) {
    const wrap = document.createElement("div");
    wrap.className = "field";
    const lab = document.createElement("label");
    lab.textContent = label;
    const input = document.createElement("input");
    input.type = "text";
    input.value = value || "";
    input.addEventListener("input", () => onInput(input.value));
    wrap.appendChild(lab);
    wrap.appendChild(input);
    return wrap;
  }
  function textareaField(label, value, onInput) {
    const wrap = document.createElement("div");
    wrap.className = "field full";
    const lab = document.createElement("label");
    lab.textContent = label;
    const ta = document.createElement("textarea");
    ta.rows = 4;
    ta.value = value || "";
    ta.addEventListener("input", () => onInput(ta.value));
    wrap.appendChild(lab);
    wrap.appendChild(ta);
    return wrap;
  }
  function renderExpEditor() {
    const box = $("#exp-cards");
    if (!box) return;
    box.innerHTML = "";
    S.state.experience.forEach((e, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      const header = document.createElement("div");
      header.className = "card-header";
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = "Experiencia " + (idx + 1);
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "card-remove";
      removeBtn.textContent = "Eliminar";
      removeBtn.addEventListener("click", () => {
        S.state.experience.splice(idx, 1);
        renderExpEditor();
        R.render(S.state);
        S.save();
        updateAccordionCounts();
      });
      header.appendChild(title);
      header.appendChild(removeBtn);
      card.appendChild(header);
      const grid = document.createElement("div");
      grid.className = "card-grid";
      const f1 = inputField("Puesto", e.role, (v) => {
        e.role = v;
        R.render(S.state);
        S.save();
      });
      const f2 = inputField("Empresa", e.company, (v) => {
        e.company = v;
        R.render(S.state);
        S.save();
      });
      const f3 = inputField("Fecha inicio", e.start, (v) => {
        e.start = v;
        R.render(S.state);
        S.save();
      });
      const f4 = inputField("Fecha fin", e.end, (v) => {
        e.end = v;
        R.render(S.state);
        S.save();
      });
      const f5 = textareaField("Descripción", e.desc, (v) => {
        e.desc = v;
        R.render(S.state);
        S.save();
      });
      grid.appendChild(f1);
      grid.appendChild(f2);
      grid.appendChild(f3);
      grid.appendChild(f4);
      grid.appendChild(f5);
      card.appendChild(grid);
      box.appendChild(card);
    });
    const addBtn = $("#add-exp");
    if (addBtn)
      addBtn.onclick = () => {
        S.state.experience.push({
          role: "",
          company: "",
          desc: "",
          start: "",
          end: "",
        });
        renderExpEditor();
        R.render(S.state);
        S.save();
        updateAccordionCounts();
      };
  }
  function renderEduEditor() {
    const box = $("#edu-cards");
    if (!box) return;
    box.innerHTML = "";
    S.state.education.forEach((ed, idx) => {
      const card = document.createElement("div");
      card.className = "card";
      const header = document.createElement("div");
      header.className = "card-header";
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = "Educación " + (idx + 1);
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "card-remove";
      removeBtn.textContent = "Eliminar";
      removeBtn.addEventListener("click", () => {
        S.state.education.splice(idx, 1);
        renderEduEditor();
        R.render(S.state);
        S.save();
        updateAccordionCounts();
      });
      header.appendChild(title);
      header.appendChild(removeBtn);
      card.appendChild(header);
      const grid = document.createElement("div");
      grid.className = "card-grid";
      const f1 = inputField("Título", ed.title, (v) => {
        ed.title = v;
        R.render(S.state);
        S.save();
      });
      const f2 = inputField("Institución", ed.institution, (v) => {
        ed.institution = v;
        R.render(S.state);
        S.save();
      });
      const f3 = inputField("Fecha inicio", ed.start, (v) => {
        ed.start = v;
        R.render(S.state);
        S.save();
      });
      const f4 = inputField("Fecha fin", ed.end, (v) => {
        ed.end = v;
        R.render(S.state);
        S.save();
      });
      const f5 = textareaField("Descripción", ed.desc, (v) => {
        ed.desc = v;
        R.render(S.state);
        S.save();
      });
      grid.appendChild(f1);
      grid.appendChild(f2);
      grid.appendChild(f3);
      grid.appendChild(f4);
      grid.appendChild(f5);
      card.appendChild(grid);
      box.appendChild(card);
    });
    const addBtn = $("#add-edu");
    if (addBtn)
      addBtn.onclick = () => {
        S.state.education.push({
          title: "",
          institution: "",
          desc: "",
          start: "",
          end: "",
        });
        renderEduEditor();
        R.render(S.state);
        S.save();
        updateAccordionCounts();
      };
  }
  function bindAccordionsSingleOpen() {
    const dets = Array.from(qa("details.group"));
    dets.forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) {
          dets.forEach((o) => {
            if (o !== d) o.open = false;
          });
        }
        updateAccordionCounts();
      });
    });
    initAccordionLabels();
    updateAccordionCounts();
  }
  function bindActions() {
    const btnPDF = $("#btn-pdf");
    const btnWord = $("#btn-word");
    if (btnPDF) btnPDF.addEventListener("click", window.CVExporter.exportPDF);
    if (btnWord)
      btnWord.addEventListener("click", window.CVExporter.exportWord);
  }
  window.CVForm = {
    createChipsController,
    bindCVInputs,
    bindPhoto,
    bindTemplate,
    renderExpEditor,
    renderEduEditor,
    bindAccordionsSingleOpen,
    bindActions,
    updateAccordionCounts,
    initAccordionLabels,
    bindSidebarToggle,
  };
})();
