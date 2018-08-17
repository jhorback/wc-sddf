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
                    on-change=${linkVal(this, "state.input.nameInput")}
                    value=${state.input.nameInput}
                    >
                </paper-input>
                <paper-checkbox
                    on-change=${linkChecked(this, "state.input.yesInput")}
                    checked=${state.input.yesInput}
                    >
                </paper-checkbox>
                <paper-button type="submit" raised on-click=${this.confess.bind(this)}>
                    Confess
                </paper-button>
            </app-toolbar>
        `;
    }

    confess() {
        // @ts-ignore
        const {nameInput, yesInput} = this.state.input;

        this.dispatchEvent(new CustomEvent("confess", {
            detail: {nameInput, yesInput}
        }));

        // @ts-ignore
        this.shadowRoot.querySelector("paper-input").focus();
    }
}

customElements.define('wc-sddf-input', WcSddfInput);
