import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-layout-css.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";


class WcSddfLayout extends LitElement {
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
            <app-header>
                <app-toolbar>
                    <div class="wc-org-logo"></div>
                    <div main-title>WC-SDDF</div>
                    <div class="connect-tech">CONNECT.TECH 2018</div>
                </app-toolbar>
                <app-toolbar class="bottom"></app-toolbar>
            </app-header>
            <slot></slot>         
        `;
    }
}

customElements.define('wc-sddf-layout', WcSddfLayout);
