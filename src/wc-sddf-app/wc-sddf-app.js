import {LitElement, html} from '@polymer/lit-element/lit-element.js';

class WcSddfApp extends LitElement {
    static get properties() {
        return {
            foo: String,
            state: Object
        };
    }

    constructor() {
        super();
        this.state = {};
    }

    /**
     * How to get users from the data element to set users here?
     * @param {object} properties 
     */
    _render({foo, state}) {
        return html`
            <h1>WC-SDDF-APPs</h1>           
        `;
    }
}

customElements.define('wc-sddf-app', WcSddfApp);
