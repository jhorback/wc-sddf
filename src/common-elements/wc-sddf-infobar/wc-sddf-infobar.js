import {LitElement, html} from "@polymer/lit-element";
import {style} from "./wc-sddf-infobar-css.js";
import "@polymer/paper-button";
import "@polymer/app-layout/app-toolbar/app-toolbar";

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
        if (!info) {
            return html``;
        };
        
        return html`
            ${style.content}
            <app-toolbar>
                <div class="clear-button">
                    <paper-button
                        on-click=${this.clearAll.bind(this)}
                        >
                        Clear all
                    </paper-button>
                </div>
                <div class="info">
                    ${info}
                </div>
            </app-toolbar>
        `;
    }

    clearAll() {
        this.dispatchEvent(new CustomEvent("clear-all"));
    }
}

customElements.define('wc-sddf-infobar', WcSddfInfobar);
