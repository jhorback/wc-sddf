import {LitElement, html} from "@polymer/lit-element";
import {repeat} from 'lit-html/lib/repeat';
import {style} from "./wc-sddf-results-css.js";
import "@polymer/paper-item/paper-icon-item";

class WcSddfResults extends LitElement {
    static get properties() {
        return {
            results: Object
        };
    }

    _render({results}) {        
        return html`
            ${style}
            ${repeat(results, (item, index) => html`
                <paper-icon-item>
                    <iron-icon
                        icon="${item.yes ? 'thumb-up' : 'thumb-down'}"
                        slot="item-icon"
                        class$=${item.yes ? 'answer-yes' : 'answer-no'}>
                    </iron-icon>
                    ${item.name}
                </paper-icon-item>
            `)}
        `;
    }
}

customElements.define('wc-sddf-results', WcSddfResults);
