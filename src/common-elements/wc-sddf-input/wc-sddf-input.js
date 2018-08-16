import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-input-css.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";

class WcSddfInput extends LitElement {
    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    _render({}) {
        return html`
            ${style.content}
            <div class="content">
                <paper-input label="Enter name">
                </paper-input>
                <paper-checkbox>
                </paper-checkbox>
                <paper-button on-click=${this.confess}>
                    Confess
                </paper-button>
            </div>
        `;
    }

    confess() {
        alert("Confessed");
    }
}

customElements.define('wc-sddf-input', WcSddfInput);
