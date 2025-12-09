(function () {
  function init() {
    if (!CVState.load()) {
      CVState.readInitialFromForm();
    }
    CVState.normalize();
    CVForm.renderExpEditor();
    CVForm.renderEduEditor();
    CVForm.bindAccordionsSingleOpen();
    CVForm.bindSidebarToggle();
    CVForm.createChipsController(
      "#skill-input-frontend",
      "#skills-chipbox-frontend",
      () => CVState.state.skills.frontend,
      (arr) => (CVState.state.skills.frontend = arr)
    );
    CVForm.createChipsController(
      "#skill-input-backend",
      "#skills-chipbox-backend",
      () => CVState.state.skills.backend,
      (arr) => (CVState.state.skills.backend = arr)
    );
    CVForm.createChipsController(
      "#skill-input-tools",
      "#skills-chipbox-tools",
      () => CVState.state.skills.tools,
      (arr) => (CVState.state.skills.tools = arr)
    );
    CVForm.createChipsController(
      "#skill-input-soft",
      "#skills-chipbox-soft",
      () => CVState.state.skills.soft,
      (arr) => (CVState.state.skills.soft = arr)
    );
    CVForm.createChipsController(
      "#lang-input",
      "#lang-chipbox",
      () => CVState.state.languages,
      (arr) => (CVState.state.languages = arr)
    );
    CVForm.bindCVInputs();
    CVForm.bindPhoto();
    CVForm.bindTemplate();
    CVForm.bindActions();
    CVRenderer.render(CVState.state);
    CVForm.updateAccordionCounts();
  }
  document.addEventListener("DOMContentLoaded", init);
})();
