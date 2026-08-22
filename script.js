
// =========================================
// DATA
// =========================================

let currentRole = "doctor";

let selectedPatient = null;

let selectedMedicines = [];


// =========================================
// PATIENT DATA
// =========================================

const patients = [

    {
        id: "P001",
        name: "Karim",
        ward: "Ward-A",
        bed: "Bed-01",
        password: "1234",
        alarm: false,
        medicines: []
    },

    {
        id: "P002",
        name: "Rahim",
        ward: "Ward-A",
        bed: "Bed-02",
        password: "1234",
        alarm: false,
        medicines: []
    },

    {
        id: "P003",
        name: "Hasan",
        ward: "Ward-B",
        bed: "Bed-05",
        password: "1234",
        alarm: false,
        medicines: []
    }

];


// =========================================
// USERS
// =========================================

const users = {

    doctor: {
        id: "D001",
        password: "1234",
        name: "Dr. Rahman"
    },

    sister: {
        id: "S001",
        password: "1234",
        name: "Sister Sumaiya"
    }

};


// =========================================
// SELECT ROLE
// =========================================

function selectRole(role, button) {

    currentRole = role;


    document
        .querySelectorAll(".role-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    button.classList.add("active");


    document.getElementById("loginId").placeholder =
        role === "doctor"
            ? "Example: D001"
            : role === "sister"
            ? "Example: S001"
            : "Example: P001";
}


// =========================================
// LOGIN
// =========================================

function login() {

    const id =
        document.getElementById("loginId").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();


    let validUser = null;


    // Doctor
    if (
        currentRole === "doctor" &&
        id === users.doctor.id &&
        password === users.doctor.password
    ) {

        validUser = users.doctor;

    }


    // Sister
    else if (
        currentRole === "sister" &&
        id === users.sister.id &&
        password === users.sister.password
    ) {

        validUser = users.sister;

    }


    // Patient
    else if (currentRole === "patient") {

        validUser =
            patients.find(
                p =>
                    p.id === id &&
                    p.password === password
            );
    }


    if (!validUser) {

        alert(
            "Invalid ID or Password!"
        );

        return;
    }


    // Hide login
    document
        .getElementById("loginPage")
        .classList.add("hidden");


    // Show application
    document
        .getElementById("appPage")
        .classList.remove("hidden");


    // User info
    document.getElementById("userName").textContent =
        validUser.name;


    document.getElementById("userRole").textContent =
        currentRole.toUpperCase();


    document.getElementById("dashboardRole").textContent =
        currentRole === "doctor"
            ? "Doctor"
            : currentRole === "sister"
            ? "Sister"
            : "Patient";


    updateDashboardDescription();


    showDashboard();

    updateMedicineCount();
}


// =========================================
// DASHBOARD DESCRIPTION
// =========================================

function updateDashboardDescription() {

    const description =
        document.getElementById(
            "dashboardDescription"
        );


    if (currentRole === "doctor") {

        description.textContent =
            "Create prescriptions for hospital patients.";

    }

    else if (currentRole === "sister") {

        description.textContent =
            "Manage medicine schedules and turn reminders ON.";

    }

    else {

        description.textContent =
            "View your medicines and manage your reminder.";

    }
}


// =========================================
// DASHBOARD
// =========================================

function showDashboard() {

    document
        .getElementById("dashboard")
        .classList.remove("hidden");


    document
        .getElementById("mainInterface")
        .classList.add("hidden");


    document.getElementById("pageTitle")
        .textContent = "Dashboard";


    document
        .getElementById("dashboardBtn")
        .classList.add("active");


    document
        .getElementById("mainBtn")
        .classList.remove("active");
}


// =========================================
// MAIN INTERFACE
// =========================================

function showMainInterface() {

    document
        .getElementById("dashboard")
        .classList.add("hidden");


    document
        .getElementById("mainInterface")
        .classList.remove("hidden");


    document.getElementById("pageTitle")
        .textContent =
        "Medicine Management";


    document
        .getElementById("dashboardBtn")
        .classList.remove("active");


    document
        .getElementById("mainBtn")
        .classList.add("active");


    showCorrectInterface();
}


// =========================================
// SHOW ROLE INTERFACE
// =========================================

function showCorrectInterface() {

    document
        .getElementById("doctorInterface")
        .classList.add("hidden");

    document
        .getElementById("sisterInterface")
        .classList.add("hidden");

    document
        .getElementById("patientInterface")
        .classList.add("hidden");


    if (currentRole === "doctor") {

        document
            .getElementById("doctorInterface")
            .classList.remove("hidden");

    }


    else if (currentRole === "sister") {

        document
            .getElementById("sisterInterface")
            .classList.remove("hidden");

        showMedicineTime(
            "Morning",
            document.querySelector(".time-tab")
        );

    }


    else {

        document
            .getElementById("patientInterface")
            .classList.remove("hidden");

        loadPatientMedicines();

    }


    updateJavaCode();
}


// =========================================
// DOCTOR FIND PATIENT
// =========================================

function findPatient() {

    const id =
        document
            .getElementById("patientSearch")
            .value
            .trim()
            .toUpperCase();


    const result =
        document.getElementById(
            "patientResult"
        );


    const patient =
        patients.find(
            p => p.id === id
        );


    if (!patient) {

        result.classList.remove("hidden");

        result.style.background =
            "#fff1f2";

        result.style.borderColor =
            "#fecdd3";

        result.innerHTML = `
            <strong style="color:#e11d48">
                Patient Not Found!
            </strong>
            <p style="font-size:11px;margin-top:5px">
                Please check the Patient ID.
            </p>
        `;


        document
            .getElementById(
                "prescriptionPanel"
            )
            .classList.add("hidden");


        selectedPatient = null;

        return;
    }


    selectedPatient = patient;


    result.classList.remove("hidden");

    result.style.background =
        "#f0fdf4";

    result.style.borderColor =
        "#bbf7d0";


    result.innerHTML = `

        <strong>
            ✓ Patient Found
        </strong>

        <div style="
            margin-top:10px;
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:8px;
            font-size:11px;
        ">

            <div>
                <b>Name:</b>
                ${patient.name}
            </div>

            <div>
                <b>ID:</b>
                ${patient.id}
            </div>

            <div>
                <b>Ward:</b>
                ${patient.ward}
            </div>

            <div>
                <b>Bed:</b>
                ${patient.bed}
            </div>

        </div>
    `;


    document
        .getElementById(
            "prescriptionPanel"
        )
        .classList.remove("hidden");


    selectedMedicines = [];

    renderSelectedMedicines();

    updateJavaCode();
}


// =========================================
// ADD MEDICINE
// =========================================

function addMedicine(name, dose) {

    if (!selectedPatient) {

        alert(
            "Please find a patient first!"
        );

        return;
    }


    selectedMedicines.push({

        name: name,

        dose: dose,

        time: "Morning"

    });


    renderSelectedMedicines();

    updateJavaCode();
}


// =========================================
// RENDER SELECTED MEDICINES
// =========================================

function renderSelectedMedicines() {

    const container =
        document.getElementById(
            "selectedMedicineList"
        );


    if (selectedMedicines.length === 0) {

        container.innerHTML = `
            <p class="empty-text">
                No medicine selected.
            </p>
        `;

        return;
    }


    container.innerHTML = "";


    selectedMedicines.forEach(
        (medicine, index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "selected-item";


            div.innerHTML = `

                <div class="selected-info">

                    <b>
                        💊 ${medicine.name}
                    </b>

                    <span>
                        ${medicine.dose}
                    </span>

                </div>


                <select
                    class="time-select"
                    onchange="changeMedicineTime(
                        ${index},
                        this.value
                    )"
                >

                    <option
                        value="Morning"
                        ${medicine.time === "Morning"
                            ? "selected"
                            : ""}
                    >
                        Morning
                    </option>

                    <option
                        value="Afternoon"
                        ${medicine.time === "Afternoon"
                            ? "selected"
                            : ""}
                    >
                        Afternoon
                    </option>

                    <option
                        value="Night"
                        ${medicine.time === "Night"
                            ? "selected"
                            : ""}
                    >
                        Night
                    </option>

                </select>


                <button
                    class="remove-btn"
                    onclick="removeMedicine(${index})"
                >
                    ×
                </button>

            `;


            container.appendChild(div);

        }
    );
}


// =========================================
// CHANGE MEDICINE TIME
// =========================================

function changeMedicineTime(
    index,
    time
) {

    selectedMedicines[index].time =
        time;


    updateJavaCode();
}


// =========================================
// REMOVE MEDICINE
// =========================================

function removeMedicine(index) {

    selectedMedicines.splice(
        index,
        1
    );


    renderSelectedMedicines();

    updateJavaCode();
}


// =========================================
// COMPLETE PRESCRIPTION
// =========================================

function completePrescription() {

    if (!selectedPatient) {

        alert(
            "Please select a patient first."
        );

        return;
    }


    if (selectedMedicines.length === 0) {

        alert(
            "Please select at least one medicine."
        );

        return;
    }


    selectedMedicines.forEach(
        medicine => {

            selectedPatient.medicines.push({

                name: medicine.name,

                dose: medicine.dose,

                time: medicine.time

            });

        }
    );


    alert(
        "Prescription completed successfully!"
    );


    selectedMedicines = [];

    renderSelectedMedicines();

    updateMedicineCount();


    document
        .getElementById(
            "prescriptionPanel"
        )
        .classList.add("hidden");


    document
        .getElementById(
            "patientSearch"
        ).value = "";


    document
        .getElementById(
            "patientResult"
        )
        .classList.add("hidden");


    selectedPatient = null;
}


// =========================================
// SISTER TIME LIST
// =========================================

function showMedicineTime(
    time,
    button
) {

    document
        .querySelectorAll(".time-tab")
        .forEach(
            btn =>
                btn.classList.remove(
                    "active"
                )
        );


    if (button) {

        button.classList.add(
            "active"
        );
    }


    const container =
        document.getElementById(
            "sisterMedicineList"
        );


    container.innerHTML = "";


    let found = false;


    patients.forEach(
        patient => {

            patient.medicines.forEach(
                (medicine, index) => {

                    if (
                        medicine.time ===
                        time
                    ) {

                        found = true;


                        const div =
                            document.createElement(
                                "div"
                            );


                        div.className =
                            "sister-item";


                        div.innerHTML = `

                            <div class="patient-info">

                                <h3>
                                    🧑 ${patient.name}
                                </h3>

                                <p>
                                    ID: ${patient.id}
                                    &nbsp; • &nbsp;
                                    ${patient.ward}
                                    &nbsp; • &nbsp;
                                    ${patient.bed}
                                </p>


                                <div class="med-info">

                                    💊
                                    ${medicine.name}

                                    &nbsp; | &nbsp;

                                    ${medicine.dose}

                                    &nbsp; | &nbsp;

                                    ${medicine.time}

                                </div>

                            </div>


                            <button
                                class="alarm-on
                                ${patient.alarm
                                    ? "active"
                                    : ""}"
                                onclick="
                                    sisterAlarmOn(
                                        '${patient.id}'
                                    )
                                "
                            >

                                ${
                                    patient.alarm
                                    ? "✓ Alarm ON"
                                    : "🔔 Alarm ON"
                                }

                            </button>

                        `;


                        container.appendChild(
                            div
                        );
                    }

                }
            );

        }
    );


    if (!found) {

        container.innerHTML = `

            <div class="panel-card"
                style="text-align:center">

                <div style="
                    font-size:35px;
                ">
                    💊
                </div>

                <h3 style="
                    margin-top:10px;
                ">
                    No Medicine Scheduled
                </h3>

                <p style="
                    color:#64748b;
                    font-size:12px;
                    margin-top:5px;
                ">
                    No patient has medicine
                    scheduled for ${time}.
                </p>

            </div>

        `;
    }


    updateJavaCode();
}


// =========================================
// SISTER ALARM ON
// =========================================

function sisterAlarmOn(
    patientId
) {

    const patient =
        patients.find(
            p => p.id === patientId
        );


    if (!patient) {

        return;
    }


    patient.alarm = true;


    alert(
        `🔔 Alarm ON for ${patient.name}

Ward: ${patient.ward}
Bed: ${patient.bed}`
    );


    const activeTab =
        document.querySelector(
            ".time-tab.active"
        );


    const time =
        activeTab
            ? activeTab.textContent.includes(
                "Morning"
              )
                ? "Morning"
                : activeTab.textContent.includes(
                    "Afternoon"
                  )
                    ? "Afternoon"
                    : "Night"
            : "Morning";


    showMedicineTime(
        time,
        activeTab
    );


    updateJavaCode();
}


// =========================================
// PATIENT MEDICINES
// =========================================

function loadPatientMedicines() {

    const patient =
        patients.find(
            p =>
                p.id ===
                document.getElementById(
                    "loginId"
                ).value
        );


    if (!patient) {

        return;
    }


    window.loggedPatient =
        patient;


    const container =
        document.getElementById(
            "patientMedicineList"
        );


    if (patient.medicines.length === 0) {

        container.innerHTML = `

            <div class="panel-card"
                style="text-align:center">

                <div style="
                    font-size:40px;
                ">
                    💊
                </div>

                <h3>
                    No Medicine Yet
                </h3>

                <p style="
                    color:#64748b;
                    font-size:12px;
                    margin-top:5px;
                ">
                    Your doctor has not added
                    any medicine yet.
                </p>

            </div>

        `;

    }


    else {

        container.innerHTML = "";


        patient.medicines.forEach(
            medicine => {

                const div =
                    document.createElement(
                        "div"
                    );


                div.className =
                    "patient-med-card";


                div.innerHTML = `

                    <div>

                        <h3>
                            💊 ${medicine.name}
                        </h3>

                        <p>
                            Dose: ${medicine.dose}
                        </p>

                    </div>


                    <span class="time-badge">

                        ${medicine.time}

                    </span>

                `;


                container.appendChild(
                    div
                );

            }
        );
    }


    document.getElementById(
        "patientAlarmText"
    ).textContent =
        patient.alarm
            ? "Alarm is ON"
            : "Alarm is OFF";
}


// =========================================
// PATIENT ALARM OFF
// =========================================

function patientAlarmOff() {

    const patient =
        window.loggedPatient;


    if (!patient) {

        return;
    }


    patient.alarm = false;


    document.getElementById(
        "patientAlarmText"
    ).textContent =
        "Alarm is OFF";


    alert(
        "🔕 Your medicine reminder is now OFF."
    );


    updateJavaCode();
}


// =========================================
// MEDICINE COUNT
// =========================================

function updateMedicineCount() {

    let count = 0;


    patients.forEach(
        patient => {

            count +=
                patient.medicines.length;

        }
    );


    document.getElementById(
        "medicineCount"
    ).textContent =
        count;
}


// =========================================
// JAVA CORE CODE
// =========================================

function updateJavaCode() {

    const code =
        document.getElementById(
            "javaCode"
        );


    let javaText = "";


    // DOCTOR
    if (currentRole === "doctor") {

        javaText = `
// Doctor finds patient
Patient patient =
    findPatient(patientId);

if (patient != null) {

    writePrescription(
        patient,
        medicine,
        time
    );
}


// Multiple medicines
patient.addPrescription(
    new Prescription(
        medicine,
        time
    )
);
`;

    }


    // SISTER
    else if (currentRole === "sister") {

        javaText = `
// Sister gets time-wise list
showTimeList(
    patients,
    "Morning"
);


// Turn alarm ON
patient.alarm = true;

alarmOn(patient);
`;

    }


    // PATIENT
    else {

        javaText = `
// Patient sees medicines
patient.showMedicine();


// Patient turns alarm OFF
patient.alarm = false;

patient.alarmOff();
`;

    }


    code.textContent =
        javaText.trim();
}


// =========================================
// LOGOUT
// =========================================

function logout() {

    document
        .getElementById("appPage")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document.getElementById(
        "loginId"
    ).value = "";


    document.getElementById(
        "loginPassword"
    ).value = "";


    selectedPatient = null;

    selectedMedicines = [];
}


// =========================================
// INITIAL CODE
// =========================================

updateJavaCode();
