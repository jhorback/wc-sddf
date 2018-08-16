import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";
import "../common-elements/wc-sddf-card/wc-sddf-card.js";


class WcSddfApp extends LitElement {
    _render({foo, state}) {
        return html`
            <wc-sddf-layout>
                <wc-sddf-card>
                    <a href="example1.html">Example 1</a>
                </wc-sddf-card>
            </wc-sddf-layout>
        `;
    }
}

customElements.define('wc-sddf-app', WcSddfApp);
