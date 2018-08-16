import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-input-css.js";
import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import {linkVal, linkChecked} from "../../lib/linkProp.js";

class WcSddfInput extends LitElement {
    static get properties() {
        return {
            name: String,
            yes: Boolean
        };
    }

    constructor() {
        super();
        this.name = "";
        this.yes = false;
    }

    _render({}) {
        return html`
            ${style.content}
            <app-toolbar>
                <paper-input
                    autofocus
                    label="Enter name"
                    on-change=${linkVal(this, "name")}
                    >
                </paper-input>
                <paper-checkbox
                    on-change=${linkChecked(this, "yes")}
                    >
                </paper-checkbox>
                <paper-button type="submit" raised on-click=${this.confess.bind(this)}>
                    Confess
                </paper-button>
            </app-toolbar>
        `;
    }

    confess() {
        const {name, yes} = this;

        this.dispatchEvent(new CustomEvent("confess", {
            // @ts-ignore
            composed: true,
            bubbles: true,
            detail: {name, yes}
        }));
    }

    inputChanged() {
        alert("here");
    }
}

customElements.define('wc-sddf-input', WcSddfInput);
