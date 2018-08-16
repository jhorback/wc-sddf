import {LitElement, html} from '@polymer/lit-element/lit-element.js';
import {style} from "./wc-sddf-app-css.js";
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";
import "../common-elements/wc-sddf-card/wc-sddf-card.js";


class WcSddfApp extends LitElement {
    _render({foo, state}) {
        return html`
            ${style.content}
            <wc-sddf-layout>
                <wc-sddf-card cardTitle="Web Components and Single Directional Data Flow">
                    <div class="content">
                        <div>
                            <a href="example-1.html">Example 1</a>
                        </div>
                        <div>
                            <a href="example-1.html">Example 2</a>
                        </div>
                        <div>
                            <a href="example-1.html">Example 3</a>
                        </div>
                    </div>
                </wc-sddf-card>
            </wc-sddf-layout>
        `;
    }
}

customElements.define('wc-sddf-app', WcSddfApp);
