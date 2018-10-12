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

    render() {
        const {info} = this;

        if (!info) {
            return html``;
        };
        
        return html`
            ${style}
            <app-toolbar>
                <div class="clear-button">
                    <paper-button
                        @click=${this.clearAll.bind(this)}
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
