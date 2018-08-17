import {LitElement, html} from "@polymer/lit-element";
import {linkVal, linkChecked} from "../../lib/linkProp.js";
import {style} from "./wc-sddf-input-css.js";
import "@polymer/paper-input/paper-input";
import "@polymer/paper-checkbox";
import "@polymer/paper-button";
import "@polymer/app-layout/app-toolbar/app-toolbar";

class WcSddfInput extends LitElement {
    static get properties() {
        return {
            state: Object
        };
    }

    constructor() {
        super();
    }

    _render({state}) {
        return html`
            ${style.content}
            <app-toolbar>
                <paper-input
                    autofocus
                    label="Enter name"
                    on-change=${linkVal(this, "state.name")}
                    value=${state.name}
                    >
                </paper-input>
                <paper-checkbox
                    on-change=${linkChecked(this, "state.yes")}
                    checked=${state.yes}
                    >
                </paper-checkbox>
                <paper-button type="submit" raised on-click=${this.confess.bind(this)}>
                    Confess
                </paper-button>
            </app-toolbar>
        `;
    }

    confess() {
        const {name, yes} = this.state;

        this.dispatchEvent(new CustomEvent("confess", {
            detail: {name, yes}
        }));

        this.shadowRoot.querySelector("paper-input").focus();
    }
}

customElements.define('wc-sddf-input', WcSddfInput);
