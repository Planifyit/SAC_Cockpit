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
            #addButton {
                cursor: pointer;
                color: blue;
                text-decoration: underline;
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
                    <tr id="secondLine" style="display: none;">
                        <td><label for="builder_model_id_2">Model ID 2:</label></td>
                        <td><input id="builder_model_id_2" type="text"></td>
                    </tr>
                </table>
                <span id="addButton">+</span>
            </fieldset>
        </form>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._shadowRoot.getElementById("addButton").addEventListener("click", this._addSecondLine.bind(this));
            this._shadowRoot.getElementById("form").addEventListener("input", this._submit.bind(this));
        }

        _addSecondLine() {
            this._shadowRoot.getElementById("secondLine").style.display = "table-row";
            this._shadowRoot.getElementById("addButton").style.display = "none";
        }

        _submit() {
            let modelIdsArray = [
                this._shadowRoot.getElementById("builder_model_id").value,
                this._shadowRoot.getElementById("builder_model_id_2").value
            ];
            this.modelIds = JSON.stringify(modelIdsArray);
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        modelIds: this.modelIds
                    }
                }
            }));
        }

        set modelIds(value) {
            let modelIdsArray = JSON.parse(value);
            this._shadowRoot.getElementById("builder_model_id").value = modelIdsArray[0] || '';
            this._shadowRoot.getElementById("builder_model_id_2").value = modelIdsArray[1] || '';
        }

        get modelIds() {
            return JSON.stringify([
                this._shadowRoot.getElementById("builder_model_id").value,
                this._shadowRoot.getElementById("builder_model_id_2").value
            ]);
        }
    }

    customElements.define('com-sap-sample-sac-cockpit-builder', BuilderPanel);
})();
