class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        p { font-size: 32px; }
      </style>
      <p>Hello <slot>World</slot>!!!</p>`;
    this.shadowRoot.addEventListener("click", () => {
      alert("Clicked hello...");
    });
  }
}
window.customElements.define('hello-world', HelloWorld);
