import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-infobar-css.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";

class WcSddfInfobar extends LitElement {
    static get properties() {
        return {
            info: String
        };
    }

    constructor() {
        super();
    }

    _render({info}) {
        return html`
            ${style.content}
            <app-toolbar>
                <div class="clear-button">
                    <paper-button>Clear all</paper-button>
                </div>
                <div class="info">
                    ${info}
                </div>
            </app-toolbar>
        `;
    }

    confess() {
        alert("Confessed");
    }
}

customElements.define('wc-sddf-infobar', WcSddfInfobar);
