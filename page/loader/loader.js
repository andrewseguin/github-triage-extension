class Loader {
  /** Shows a loading spinner on an element for two seconds. */
  static show(element) {
    const oldHtml = element.innerHTML;
    const html = `<div class="loader"></div>`;
    element.insertAdjacentHTML('beforeend', html);
    element.style.color = 'transparent';
    setTimeout(() => {
      element.style.color = '';
      element.innerHTML = oldHtml;
    }, 2000);
  }
}
