/** Returns the current page's issue number. */
function getIssueNumber() {
  return window.location.pathname.split('issues/')[1];
}

/** Adds the HTML to the page. */
function addHTML() {
  const template = `
    <div class="suggestions discussion-sidebar-item js-discussion-sidebar-item">
      <div class="discussion-sidebar-heading text-bold">
        Suggestions
      </div>
      <div class="no-suggestions hidden"> None </div>
    </div>
  `;

  const sidebar = document.querySelector('#partial-discussion-sidebar');
  if (!sidebar) {
    return;
  }
  sidebar.insertAdjacentHTML('beforebegin', template);
}

addHTML();
registerClickListeners();

setTimeout(() => {
  setInterval(() => {
    const showingPriorityLabels = document.querySelector('.priorities:not(.hidden)');
    const showingSuggestedLabels = document.querySelector('.suggested-label:not(.hidden)');
    const noSuggestions = document.querySelector('.no-suggestions');
    if (noSuggestions) {
      noSuggestions.classList.toggle(
          'hidden', !!showingPriorityLabels || !!showingSuggestedLabels);
    }
  }, 100);
}, 500);
