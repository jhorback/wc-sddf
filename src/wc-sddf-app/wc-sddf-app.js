import {LitElement, html} from '@polymer/lit-element';
import {style} from "./wc-sddf-app-css.js";
import "../common-elements/wc-sddf-layout/wc-sddf-layout.js";
import "../common-elements/wc-sddf-card/wc-sddf-card.js";


class WcSddfApp extends LitElement {
    static get properties() {
        return {
            example1Text: String,
            example2Text: String,
            example3Text: String
        };
    };

    constructor() {
        super();
        this._setExampleText({dbKey: "example-1", propertyName: "example1Text"});
        this._setExampleText({dbKey: "example-2", propertyName: "example2Text"});
        this._setExampleText({dbKey: "example-3", propertyName: "example3Text"});
    }

    _setExampleText({dbKey, propertyName}) {
        const state = JSON.parse(sessionStorage.getItem(dbKey));
        if (!state) {
            return;
        }

        let pageTitle = "";
        switch (propertyName) {
            case "example1Text":
                pageTitle = "Who has written a web component?";
                break;
            case "example2Text":
                pageTitle = "Who will write a web component?";
                break;
            case "example3Text":
                pageTitle = "Who liked this talk?";
                break;
        }

        this[propertyName] = state.infoText ? ` - ${pageTitle} ${state.infoText}` : "";
    }

    _render({
        example1Text,
        example2Text,
        example3Text
    }) {
        return html`
            ${style}
            <wc-sddf-layout>
                <wc-sddf-card cardTitle="Web Components and Single Directional Data Flow">
                    <div class="content">
                        <div>
                            <a href="example-1.html">Example 1</a> ${example1Text}
                        </div>
                        <div>
                            <a href="example-2.html">Example 2</a> ${example2Text}
                        </div>
                        <div>
                            <a href="example-3.html">Example 3</a> ${example3Text}
                        </div>
                    </div>
                </wc-sddf-card>
            </wc-sddf-layout>
        `;
    }
}

customElements.define('wc-sddf-app', WcSddfApp);
