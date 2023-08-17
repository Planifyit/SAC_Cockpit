(function () {
    let tmpl = document.createElement('template');
   tmpl.innerHTML = `
    <style>
        /* ... (rest of your styles) ... */

        /* Adjust the table container */
        .table-container {
            margin-top: 10px;
            overflow-y: auto;
            max-height: 400px; /* Adjust based on your preference */
            border-top: 2px solid #FFC107; /* Golden border at the top */
        }

        /* Table styling */
        table {
            width: 100%; /* Full width */
            border-collapse: collapse; /* Collapse borders */
        }

        /* Table header styling */
        th {
            background-color: #ddd; /* Light gray background */
            border-bottom: 2px solid black; /* Black bottom border */
        }

        /* Table cell styling */
        td, th {
            padding: 10px; /* Some padding for spacing */
            border-right: 1px solid black; /* Right border for each cell */
        }

        /* Remove right border for the last cell */
        td:last-child, th:last-child {
            border-right: none;
        }
    </style>

    <div class="cockpit">
        <div class="image-container"></div> 
        <div class="buttons">
            <button id="managePrivateVersions">Manage Private Versions</button>
            <button id="managePublicVersions">Manage Public Versions</button>
        </div>
        <a href="https://www.linkedin.com/company/planifyit" target="_blank" class="follow-link">Follow us on Linkedin - Planifyit</a>
    </div>

    <div id="privateVersionsTableContainer" class="table-container">
        <table id="privateVersionsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Owner</th>
                    <th>Version ID</th>
                    <th>Is In Public Edit Mode</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Source Version ID</th>
                    <th>Creation Time</th>
                    <th>Is Suspended For Input Schedule</th>
                    <th>Changes</th>
                    <th>Is Storage Internal</th>
                    <th>Workflow State</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <div id="publicVersionsTableContainer" class="table-container">
        <table id="publicVersionsTable">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Is In Public Edit Mode</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Source Version ID</th>
                    <th>Planning Supported</th>
                    <th>Has Planning Area</th>
                    <th>Workflow State</th>
                    <th>Is Suspended For Input Schedule</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
`;

   
  class SACCockpit extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._props = {}; // properties 

            this._shadowRoot.querySelector('#managePrivateVersions').addEventListener('click', this._managePrivateVersions.bind(this));
            this._shadowRoot.querySelector('#managePublicVersions').addEventListener('click', this._managePublicVersions.bind(this));

            this._shadowRoot.querySelectorAll(".close").forEach(closeButton => {
                closeButton.addEventListener("click", () => {
                    const privateModal = this._shadowRoot.querySelector("#privateVersionsModal");
                    const publicModal = this._shadowRoot.querySelector("#publicVersionsModal");
                    privateModal.style.display = "none";
                    publicModal.style.display = "none";
                });
            });
/*
let isDragging = false;
let offsetX, offsetY;
let currentModal = null; // Store the modal being dragged

// Get all modal-content elements
const modalContents = this._shadowRoot.querySelectorAll(".modal-content");

// Loop through each modal-content and attach the drag functionality
modalContents.forEach(modalContent => {
    modalContent.addEventListener("mousedown", (e) => {
        isDragging = true;
        currentModal = modalContent; // Set the current modal being dragged
        offsetX = e.clientX - modalContent.getBoundingClientRect().left;
        offsetY = e.clientY - modalContent.getBoundingClientRect().top;
    });
});

document.addEventListener("mousemove", (e) => {
    if (isDragging && currentModal) {
        currentModal.style.left = (e.clientX - offsetX) + "px";
        currentModal.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    currentModal = null; // Reset the current modal
});*/



            
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            this._props = { ...this._props, ...changedProperties };
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            let currentModelId = "modelId" in changedProperties ? changedProperties["modelId"] : this.modelId;
            let currentTenantUrl = "tenantUrl" in changedProperties ? changedProperties["tenantUrl"] : this.tenantUrl;
            let currentApiString = "apiString" in changedProperties ? changedProperties["apiString"] : this.apiString;
            let currentPrivateVersionLocation = "privateVersionLocation" in changedProperties ? changedProperties["privateVersionLocation"] : this.privateVersionLocation;
            let currentPublicVersionLocation = "publicVersionLocation" in changedProperties ? changedProperties["publicVersionLocation"] : this.publicVersionLocation;

            // Concatenate the values
            let concatenatedUrlPrivate = currentTenantUrl + currentApiString + currentModelId + currentPrivateVersionLocation;
            let concatenatedUrlPublic = currentTenantUrl + currentApiString + currentModelId + currentPublicVersionLocation;

            this.concatenatedUrlPrivate = concatenatedUrlPrivate;
            this.concatenatedUrlPublic = concatenatedUrlPublic;
        }

        connectedCallback() {
            this.addEventListener('propertiesChanged', (event) => {
                this._model = event.detail.properties.model;
            });
        }


 _managePrivateVersions() {
            fetch(this.concatenatedUrlPrivate)
                .then(response => response.json())
                .then(data => {
                    const tableBody = this._shadowRoot.querySelector("#privateVersionsTable tbody");
                    tableBody.innerHTML = ""; // Clear previous data

                    data.foreignVersions.forEach(version => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
        <td>${version.id}</td>
        <td>${version.owner}</td>
        <td>${version.versionId}</td>
        <td>${version.isInPublicEditMode}</td>
        <td>${version.category}</td>
        <td>${version.description}</td>
        <td>${version.sourceVersionId}</td>
        <td>${version.creationTime}</td>
        <td>${version.isSuspendedForInputSchedule}</td>
        <td>${version.changes}</td>
        <td>${version.isStorageInternal}</td>
        <td>${version.workflowState}</td>
    `;
                tableBody.appendChild(row);
            });

            // Show the modal
                    const modal = this._shadowRoot.querySelector("#privateVersionsModal");
                    modal.style.display = "block";
                });
        }
_managePublicVersions() {
    fetch(this.concatenatedUrlPublic)
        .then(response => response.json())
        .then(data => {
            const tableBody = this._shadowRoot.querySelector("#publicVersionsTable tbody");
            tableBody.innerHTML = ""; // Clear previous data

            // Filter out only the public versions
            const publicVersions = data.versions.filter(version => version.isPublic);

            publicVersions.forEach(version => {
                const row = document.createElement("tr");
                row.innerHTML = `
        <td>${version.id}</td>
        <td>${version.isInPublicEditMode}</td>
        <td>${version.category}</td>
        <td>${version.description}</td>
        <td>${version.sourceVersionId || 'N/A'}</td>
       <td>${version.operations.planning.isSupported}</td>
        <td>${version.hasPlanningArea}</td>
        <td>${version.workflowState}</td>
        <td>${version.isSuspendedForInputSchedule}</td>     
                `;
                tableBody.appendChild(row);
            });

            // Show the public versions modal
            const modal = this._shadowRoot.querySelector("#publicVersionsModal");
            modal.style.display = "block";
        });
}

    }


    
customElements.define('sac-cockpit-widget', SACCockpit);
})();    
  
