import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";


class WcSddfApp extends LitElement {
    _render({foo, state}) {
        return html`
            <wc-sddf-layout>
                <a href="example1.html">Example 1</a>
            </wc-sddf-layout>
        `;
    }
}

customElements.define('wc-sddf-app', WcSddfApp);
