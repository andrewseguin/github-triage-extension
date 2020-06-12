{
  const input = document.querySelector('input');
  input.focus();

  function validate() {
    const token = input.value;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      input.classList.toggle('valid', this.status === 200);
    };
    request.open("GET", `https://api.github.com/rate_limit`, true);
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    request.send();
  }

  chrome.storage.sync.get('token', value => {
    input.value = value.token || '';
    validate();
  });

  input.addEventListener('input', () => {
    chrome.storage.sync.set({token: input.value});
    validate();
  });
}
