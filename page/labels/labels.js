class Labels {
  constructor() {
    chrome.storage.sync.get('labelsMetadata', value => {
      this.labelsMetadata = value.labelsMetadata || LABELS_METADATA;

      this.render();
      setInterval(() => this.updateVisibility(), 250);

      setTimeout(() => updateLabelsMetadata(), 1000);
    });
  }

  render() {
    const suggestions = document.querySelector('.suggestions');
    if (!suggestions) {
      return;
    }

    const matchedLabels = this.labelsMetadata.filter(l => {
      return (l.contains && l.contains.some(t => issueContainsText(t))) ||
          (l.notContains && l.notContains.every(t => !issueContainsText(t)));
    });
    const labelElements = matchedLabels.map(l => {
      return `<div class="suggested-label hidden" data-add-label="${l.label}">${l.label}</div>`
    });

    suggestions.insertAdjacentHTML('beforeend', `
      <div class="labels">${labelElements.join('')}</div>
    `);

    registerClickListeners();
  }

  updateVisibility() {
    this.labelsMetadata.forEach(l => {
      const element = document.querySelector(`.suggested-label[data-add-label="${l.label}"]`);
      if (element) {
        element.classList.toggle('hidden', issueHasLabel(l.label));
      }
    });
  }
}

new Labels();

