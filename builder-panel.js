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
                    <tr>
                        <td><label for="builder_tenant_url">Tenant URL:</label></td>
                        <td><input id="builder_tenant_url" type="text"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_api_string">API String:</label></td>
                        <td><input id="builder_api_string" type="text"></td>
                    </tr>
                    <tr>
                        <td><label for="builder_private_version_location">Private Version Location:</label></td>
                        <td><input id="builder_private_version_location" type="text"></td>
                    </tr>
                     <tr>
                        <td><label for="builder_public_version_location">Public Version Location:</label></td>
                        <td><input id="builder_public_version_location" type="text"></td>
                    </tr>
                    
                </table>
                <button id="applyChanges">Apply Changes</button>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class BuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
         this._shadowRoot.getElementById("applyChanges").addEventListener("click", this._submit.bind(this));
 
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        modelId: this.modelId,
                        tenantUrl: this.tenantUrl,
                        apiString: this.apiString,
                        privateVersionLocation: this.privateVersionLocation,
                        publicVersionLocation: this.publicVersionLocation
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

        set tenantUrl(newTenantUrl) {
            this._shadowRoot.getElementById("builder_tenant_url").value = newTenantUrl;
        }

        get tenantUrl() {
            return this._shadowRoot.getElementById("builder_tenant_url").value;
        }

        set apiString(newApiString) {
            this._shadowRoot.getElementById("builder_api_string").value = newApiString;
        }

        get apiString() {
            return this._shadowRoot.getElementById("builder_api_string").value;
        }

        set privateVersionLocation(newPrivateVersionLocation) {
            this._shadowRoot.getElementById("builder_private_version_location").value = newPrivateVersionLocation;
        }

        get privateVersionLocation() {
            return this._shadowRoot.getElementById("builder_private_version_location").value;
        }
        
        set publicVersionLocation(newPublicVersionLocation) {
            this._shadowRoot.getElementById("builder_public_version_location").value = newPublicVersionLocation;
        }

        get publicVersionLocation() {
            return this._shadowRoot.getElementById("builder_public_version_location").value;
        }
    }

    customElements.define('com-sap-sample-sac-cockpit-builder', BuilderPanel);
})();
