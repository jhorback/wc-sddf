import {LitElement, html} from '@polymer/lit-element/lit-element.js';
//import {style} from "./wc-sddf-app-css.js";
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";
import "../common-elements/wc-sddf-card/wc-sddf-card.js";
import "../common-elements/wc-sddf-input/wc-sddf-input.js";
import "../common-elements/wc-sddf-results/wc-sddf-results.js";
import "../common-elements/wc-sddf-infobar/wc-sddf-infobar.js";


class Example1 extends LitElement {
    static get properties() {
        return {          
            results: Object,
            infoText: String
        };
    }

    constructor() {
        super();
        this.results = [{
            name: "John",
            yes: true
        }, {
            name: "George",
            yes: false
        },{
            name: "Sally",
            yes: false
        },{
            name: "Dan",
            yes: true
        }];
        this.infoText = "67% are awesome";
    }

    _render({results, infoText}) {
        return html`
            <wc-sddf-layout>
                <wc-sddf-card cardTitle="Who has written a web component?" showBackButton>
                    
                    <wc-sddf-input on-confess=${this.confess}>
                    </wc-sddf-input>
                    
                    <wc-sddf-results results=${results}>
                    </wc-sddf-results>
                    
                    <wc-sddf-infobar info=${infoText}>
                    </wc-sddf-infobar>
                    
                </wc-sddf-card>
            </wc-sddf-layout>
        `;
    }

    confess(event) {
        const {name, yes} = event.detail;
        alert(`here: name: ${name}, yes:  ${yes}`);
    }
}

customElements.define('example-1', Example1);
