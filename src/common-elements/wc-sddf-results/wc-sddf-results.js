import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-results-css.js";

class WcSddfResults extends LitElement {
    static get properties() {
        return {
           results: Object
        };
    }

    constructor() {
        super();        
    }

    _render({}) {
        return html`
            ${style.content}
            RESULTS
        `;
    }
}

customElements.define('wc-sddf-results', WcSddfResults);
