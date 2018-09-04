import {LitElement, html} from "@polymer/lit-element";
import {style} from "./wc-sddf-card-css.js";
import "@polymer/paper-card"
import "@polymer/app-layout/app-toolbar/app-toolbar";
import "@polymer/paper-icon-button";
import "@polymer/iron-icons/iron-icons";


class WcSddfCard extends LitElement {
    static get properties() {
        return {
            cardTitle: String,
            showBackButton: Boolean
        };
    }

    constructor() {
        super();
        this.cardTitle = "Add title...";
        this.showBackButton = false;
    }

    _render({cardTitle, showBackButton}) {
        return html`
            ${style}
            <div class="content">
                <div class="card-container">
                    <paper-card>
                        <app-toolbar>
                            ${showBackButton
                                ? html `
                                    <paper-icon-button icon="arrow-back" on-click=${this.goBack}></paper-icon-button>
                                `
                                : ``
                            }
                            <div main-title>${cardTitle}</div>                            
                        </app-toolbar>
                        <slot></slot>
                    </paper-card>
                </div>
            </div>
        `;
    }

    goBack(event) {
        history.back();
    }
}

customElements.define('wc-sddf-card', WcSddfCard);
