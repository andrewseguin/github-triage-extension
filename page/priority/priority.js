class Priority {
  template = `
    <div class="priorities hidden">
      <div class="priority p0" data-add-label="p0">P0</div>
      <div class="priority p1" data-add-label="p1">P1</div>
      <div class="priority p2" data-add-label="p2">P2</div>
      <div class="priority p3" data-add-label="p3">P3</div>
      <div class="priority p4" data-add-label="p4">P4</div>
      <div class="priority p5" data-add-label="p5">P5</div>
    </div>
  `;

  constructor() {
    const suggestions = document.querySelector('.suggestions');
    if (!suggestions) {
      return;
    }

    suggestions.insertAdjacentHTML('beforeend', this.template);
    registerClickListeners();

    setInterval(() => this.updatePrioritiesVisibility(), 250);
  }

  /** Updates the visibility of the priorities depending on whether the issue already had a priority. */
  updatePrioritiesVisibility() {
    const priorities = ['P0', 'P1', 'P2', 'P3', 'P4', 'P5'];
    const issueHasPriority = priorities.some(priority => issueHasLabel(priority));
    document.querySelector('.priorities').classList.toggle('hidden', issueHasPriority);
  }
}

new Priority();
