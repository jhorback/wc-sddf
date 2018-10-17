import {LitElement, html} from '@polymer/lit-element';
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

    render() {
        const {state} = this;

        return html`
            <example-1-data
                dbKey="example-1"
                @state-changed=${this._stateChanged.bind(this)}
                >
            </example-1-data>
            <wc-sddf-layout>                
                <wc-sddf-card cardTitle="Who has written a web component?" showBackButton>
                    
                    <wc-sddf-input @confess=${this.confess}
                        .state=${state}
                        >
                    </wc-sddf-input>
                    
                    <wc-sddf-results .results=${state.results}>
                    </wc-sddf-results>
                    
                    <wc-sddf-infobar .info=${state.infoText}
                        @clear-all=${this.clearAll}
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

    _stateChanged(event) {
        const fromEl = event.currentTarget;
        
        // use a setTimeout here since etting properties in response
        // to other properties changing considered harmful.
        setTimeout(() => {
            this.state = fromEl.state;
        });
    }
}

customElements.define('example-1', Example1);
