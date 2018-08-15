import {LitElement, html} from '@polymer/lit-element/lit-element.js';

class WcSddfApp extends LitElement {
//class WcSddfApp extends HTMLElement {
    static get properties() {
        return {
            foo: String,
            state: Object
        };
    }

    constructor() {
        super();
        this.state = {};
        this.test();
    }

    async test() {
        const foo = await this.testDeconstruction({foo:"bar"});
        console.log("testing deconstruction:", foo);
    }

    async testDeconstruction(params) {
        const {foo} = params;
        return foo;
    }

    /**
     * How to get users from the data element to set users here?
     * @param {object} properties 
     */
    _render({foo, state}) {
        return html`
            <h1>WC-SDDF-APP</h1>           
        `;
    }
}

customElements.define('wc-sddf-app', WcSddfApp);
