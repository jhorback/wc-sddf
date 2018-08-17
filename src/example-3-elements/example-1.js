import {LitElement, html} from '@polymer/lit-element';
import {linkProp} from "../lib/linkProp.js";
import {defaultState} from "./example-1-data.js";
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";
import "../common-elements/wc-sddf-card/wc-sddf-card.js";
import "../common-elements/wc-sddf-input/wc-sddf-input.js";
import "../common-elements/wc-sddf-results/wc-sddf-results.js";
import "../common-elements/wc-sddf-infobar/wc-sddf-infobar.js";


class Example1 extends LitElement {
    static get properties() {
        return {          
            state: Object
        };
    }

    constructor() {
        super();
        this.state = defaultState;
    }

    _render({state}) {
        return html`
            <example-1-data
                dbKey="example-1"
                on-state-changed=${linkProp(this, "state")}
                >
            </example-1-data>
            <wc-sddf-layout>                
                <wc-sddf-card cardTitle="Who has written a web component?" showBackButton>
                    
                    <wc-sddf-input on-confess=${this.confess}
                        state=${state}
                        >
                    </wc-sddf-input>
                    
                    <wc-sddf-results results=${state.results}>
                    </wc-sddf-results>
                    
                    <wc-sddf-infobar info=${state.infoText}
                        on-clear-all=${this.clearAll}
                        >
                    </wc-sddf-infobar>
                    
                </wc-sddf-card>
            </wc-sddf-layout>
        `;
    }

    confess(event) {
        const {nameInput, yesInput} = event.detail;
        this.dispatchEvent(new CustomEvent("add-confession", {
            bubbles: true,
            composed: true,
            detail: {nameInput, yesInput}
        }));
    }

    clearAll(event) {
        this.dispatchEvent(new CustomEvent("clear-results", {
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('example-1', Example1);
