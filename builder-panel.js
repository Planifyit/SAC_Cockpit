(function() {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 1em;
            }
            label {
                display: block;
                margin-bottom: 5px;
            }
        </style>
        <form id="form">
            <fieldset>
                <legend>Properties</legend>
                <table>
                    <tr>
                        <td><label for="builder_model_id">Model ID:</label></td>
                        <td><input id="builder_model_id" type="text"></td>
                    </tr>
                </table>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
    this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
  
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        modelId: this.modelId
                    }
                }
            }));
        }

        set modelId(newModelId) {
                	this._shadowRoot.getElementById("builder_model_id").value = newModelId;
        }

        get modelId() {
            return this._shadowRoot.getElementById("builder_model_id").value;
        }
    }

    customElements.define('com-sap-sample-sac-cockpit-builder', BuilderPanel);
})();
