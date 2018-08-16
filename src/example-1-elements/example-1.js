import {LitElement, html} from '@polymer/lit-element/lit-element.js';
//import {style} from "./wc-sddf-app-css.js";
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";
import "../common-elements/wc-sddf-card/wc-sddf-card.js";


class Example1 extends LitElement {
    _render({foo, state}) {
        return html`
            <wc-sddf-layout>
                <wc-sddf-card cardTitle="Who has written a web component?" showBackButton>
                    <div class="content">
                        ADD INPUT FIELDS
                    </div>
                </wc-sddf-card>
            </wc-sddf-layout>
        `;
    }
}

customElements.define('example-1', Example1);
