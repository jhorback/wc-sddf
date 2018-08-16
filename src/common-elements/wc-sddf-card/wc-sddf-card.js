import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-card-css.js";


class WcSddfCard extends LitElement {
    static get properties() {
        return {
        };
    }

    constructor() {
        super();
    }

    _render({}) {
        return html`
            ${style.content}
            HELLO CARD      
            <slot></slot>  
        `;
    }
}

customElements.define('wc-sddf-card', WcSddfCard);
