let token = '';
chrome.storage.sync.get('token', value => {
  token = value.token;
});

const restUrl = 'https://api.github.com';


function post(url, data) {
  if (!token) {
    window.open(chrome.extension.getURL("options/options.html"));
    return;
  }

  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      //alert('success');
    }
  };
  request.open("POST", `${restUrl}/${url}`, true);
  request.setRequestHeader("Authorization", `Bearer ${token}`);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(data);
}

function addLabel(issue, label) {
  const pathnameParts = window.location.pathname.split('/');
  const repo = `${pathnameParts[1]}/${pathnameParts[2]}`;
  post(`repos/${repo}/issues/${issue}/labels`, `{"labels": ["${label}"]}`);
}

/** Register the click listeners for the injected HTML. */
let clickListeners = [];
function registerClickListeners() {
  clickListeners.forEach(c => c.element.removeEventListener('click', c.handler));
  clickListeners = [];

  // Elements with the attribute [data-add-label] will add a label to the current issue
  document.querySelectorAll('[data-add-label]').forEach(element => {
    const handler = () => {
      const issueNumber = getIssueNumber();
      const label = element.getAttribute('data-add-label').replace(/_/g, ' ');
      addLabel(issueNumber, label);
      Loader.show(element);
    };
    element.addEventListener('click', handler);

    clickListeners.push({element, handler});
  });
}

/** Returns the current issue's list of labels. */
function issueHasLabel(label) {
  const labelElementSelector = '#partial-discussion-sidebar .IssueLabel';
  for (const labelElement of document.querySelectorAll(labelElementSelector)) {
    if (labelElement.textContent === label) {
      return true;
    }
  }

  return false;
}

/** Whether the issue contains the text. */
function issueContainsText(text) {
  const title = document.querySelector('.js-issue-title').textContent;
  const body = document.querySelector('.comment-body').textContent;
  return (title + body).toLowerCase().indexOf(text.toLowerCase()) !== -1;
}

/** Updates the labels metadata based on the gist JSON. */
function updateLabelsMetadata() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.response);
      const labelsMetadata = JSON.parse(response.files['labels.json'].content);
      chrome.storage.sync.set({labelsMetadata});
    }
  };

  const gistId = 'f0d91cc48340a425ab032a8cd591a782';
  request.open("GET", `${restUrl}/gists/${gistId}`, true);
  request.setRequestHeader("Authorization", `Bearer ${token}`);
  request.setRequestHeader("Content-Type", "application/json");
  request.send();
}
