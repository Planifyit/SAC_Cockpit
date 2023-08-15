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

            this._modelInput = this._shadowRoot.getElementById('builder_model_id');
            this._modelInput.addEventListener('input', this._onModelInputChange.bind(this));
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

        _onModelInputChange(event) {
            // Dispatch a custom event or handle the model input change
            let modelChangeEvent = new CustomEvent('modelChange', { detail: { model: this._modelInput.value } });
            this.dispatchEvent(modelChangeEvent);
        }

        set modelId(newModelId) {
            this._modelInput.value = newModelId;
        }

        get modelId() {
            return this._modelInput.value;
        }
    }

    customElements.define('sac-cockpit-builder', BuilderPanel);
})();
