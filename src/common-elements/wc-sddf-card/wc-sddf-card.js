import {LitElement, html} from "@polymer/lit-element/lit-element.js";
import {style} from "./wc-sddf-card-css.js";
import "@polymer/paper-card/paper-card.js"
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";


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
            ${style.content}
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
                        <div class="paper-card-contents">
                            <slot></slot>
                        </div>
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
