import java.util.ArrayList;
import java.util.Scanner;


// =====================================
// USER CLASS
// =====================================
class User {

    String name;
    String id;
    String password;

    User(String name, String id, String password) {
        this.name = name;
        this.id = id;
        this.password = password;
    }

    boolean login(String id, String password) {
        return this.id.equals(id) && this.password.equals(password);
    }
}


// =====================================
// MEDICINE CLASS
// =====================================
class Medicine {

    String name;
    String dose;

    Medicine(String name, String dose) {
        this.name = name;
        this.dose = dose;
    }
}


// =====================================
// PRESCRIPTION CLASS
// =====================================
class Prescription {

    Medicine medicine;
    String time;

    Prescription(Medicine medicine, String time) {
        this.medicine = medicine;
        this.time = time;
    }

    void showPrescription() {

        System.out.println("Medicine : " + medicine.name);
        System.out.println("Dose     : " + medicine.dose);
        System.out.println("Time     : " + time);
        System.out.println("-------------------------");
    }
}


// =====================================
// PATIENT CLASS
// =====================================
class Patient extends User {

    String ward;
    String bed;

    ArrayList<Prescription> prescriptions;

    boolean alarm = false;

    Patient(
        String name,
        String id,
        String password,
        String ward,
        String bed
    ) {

        super(name, id, password);

        this.ward = ward;
        this.bed = bed;

        prescriptions = new ArrayList<>();
    }


    // Add prescription
    void addPrescription(Prescription p) {

        prescriptions.add(p);
    }


    // Patient ????? medicine ?????
    void showMedicine() {

        System.out.println("\n===== MY MEDICINE =====");

        if (prescriptions.size() == 0) {

            System.out.println("No medicine found.");

            return;
        }

        for (Prescription p : prescriptions) {

            p.showPrescription();
        }
    }


    // Patient Alarm OFF ????
    void alarmOff() {

        alarm = false;

        System.out.println("\nAlarm is OFF.");
        System.out.println("Ward/Bed light is OFF.");
    }


    // Alarm status
    void showAlarmStatus() {

        if (alarm) {

            System.out.println("Alarm Status: ON");

        } else {

            System.out.println("Alarm Status: OFF");
        }
    }
}


// =====================================
// DOCTOR CLASS
// =====================================
class Doctor extends User {

    ArrayList<Prescription> prescriptions;

    Doctor(
        String name,
        String id,
        String password
    ) {

        super(name, id, password);

        prescriptions = new ArrayList<>();
    }


    // =================================
    // WRITE PRESCRIPTION
    // =================================

    void writePrescription(
        Patient patient,
        ArrayList<Medicine> medicines,
        Scanner input
    ) {

        System.out.println(
            "\n===== WRITE PRESCRIPTION ====="
        );

        System.out.println(
            "Patient Name : " + patient.name
        );

        System.out.println(
            "Patient ID   : " + patient.id
        );

        System.out.println(
            "Ward         : " + patient.ward
        );

        System.out.println(
            "Bed          : " + patient.bed
        );

        System.out.println(
            "-------------------------------"
        );


        // Multiple medicine
        while (true) {

            System.out.println(
                "\nSelect Medicine:"
            );

            System.out.println(
                "1. Napa - 500mg"
            );

            System.out.println(
                "2. Seclo - 20mg"
            );

            System.out.println(
                "3. Antibiotic - 500mg"
            );

            System.out.println(
                "4. Vitamin - 100mg"
            );

            System.out.println(
                "0. Finish Prescription"
            );

            System.out.print(
                "Medicine: "
            );

            int medicineChoice =
                input.nextInt();


            // Finish
            if (medicineChoice == 0) {

                break;
            }


            Medicine selectedMedicine;


            if (medicineChoice == 1) {

                selectedMedicine =
                    medicines.get(0);

            }

            else if (medicineChoice == 2) {

                selectedMedicine =
                    medicines.get(1);

            }

            else if (medicineChoice == 3) {

                selectedMedicine =
                    medicines.get(2);

            }

            else if (medicineChoice == 4) {

                selectedMedicine =
                    medicines.get(3);

            }

            else {

                System.out.println(
                    "Invalid Medicine!"
                );

                continue;
            }


            // =================================
            // SELECT TIME
            // =================================

            System.out.println(
                "\nSelect Medicine Time:"
            );

            System.out.println(
                "1. Morning"
            );

            System.out.println(
                "2. Afternoon"
            );

            System.out.println(
                "3. Night"
            );

            System.out.print(
                "Time: "
            );

            int timeChoice =
                input.nextInt();


            String time;


            if (timeChoice == 1) {

                time = "Morning";

            }

            else if (timeChoice == 2) {

                time = "Afternoon";

            }

            else if (timeChoice == 3) {

                time = "Night";

            }

            else {

                System.out.println(
                    "Invalid Time!"
                );

                continue;
            }


            // =================================
            // CREATE PRESCRIPTION
            // =================================

            Prescription p =
                new Prescription(
                    selectedMedicine,
                    time
                );


            // Doctor list
            prescriptions.add(p);


            // Patient list
            patient.addPrescription(p);


            System.out.println(
                "\nMedicine Added Successfully!"
            );

            System.out.println(
                "Medicine : "
                + selectedMedicine.name
            );

            System.out.println(
                "Dose     : "
                + selectedMedicine.dose
            );

            System.out.println(
                "Time     : "
                + time
            );
        }


        System.out.println(
            "\nPrescription Completed!"
        );
    }


    // =================================
    // SHOW PRESCRIPTION
    // =================================

    void showPrescriptions() {

        System.out.println(
            "\n===== DOCTOR PRESCRIPTIONS ====="
        );


        if (prescriptions.size() == 0) {

            System.out.println(
                "No prescription found."
            );

            return;
        }


        for (Prescription p :
            prescriptions) {

            p.showPrescription();
        }
    }
}


// =====================================
// SISTER CLASS
// =====================================
class Sister extends User {

    Sister(
        String name,
        String id,
        String password
    ) {

        super(name, id, password);
    }


    // =================================
    // SHOW TIME-WISE MEDICINE LIST
    // =================================

    void showTimeList(
        ArrayList<Patient> patients,
        String time,
        Scanner input
    ) {

        System.out.println(
            "\n=================================="
        );

        System.out.println(
            " "
            + time.toUpperCase()
            + " MEDICINE LIST"
        );

        System.out.println(
            "=================================="
        );


        boolean found = false;


        // ?? Patient check ????
        for (Patient patient :
            patients) {


            // Patient-?? ?? prescription check
            for (Prescription p :
                patient.prescriptions) {


                // Time match ???? ??????
                if (p.time.equalsIgnoreCase(time)) {

                    found = true;


                    System.out.println(
                        "\nPatient : "
                        + patient.name
                    );

                    System.out.println(
                        "Patient ID : "
                        + patient.id
                    );

                    System.out.println(
                        "Ward    : "
                        + patient.ward
                    );

                    System.out.println(
                        "Bed     : "
                        + patient.bed
                    );

                    System.out.println(
                        "Medicine: "
                        + p.medicine.name
                    );

                    System.out.println(
                        "Dose    : "
                        + p.medicine.dose
                    );

                    System.out.println(
                        "Time    : "
                        + p.time
                    );

                    System.out.println(
                        "Alarm   : "
                        + (patient.alarm
                            ? "ON"
                            : "OFF")
                    );


                    System.out.println(
                        "-------------------------"
                    );


                    // Alarm option
                    System.out.print(
                        "Turn Alarm ON? (1=Yes, 0=No): "
                    );

                    int alarmChoice =
                        input.nextInt();


                    if (alarmChoice == 1) {

                        alarmOn(patient);
                    }


                    System.out.println(
                        "-------------------------"
                    );
                }
            }
        }


        if (!found) {

            System.out.println(
                "\nNo medicine scheduled "
                + "for " + time + "."
            );
        }
    }


    // =================================
    // ALARM ON
    // =================================

    void alarmOn(Patient patient) {

        patient.alarm = true;


        System.out.println(
            "\n*** ALARM ON ***"
        );

        System.out.println(
            "Patient : "
            + patient.name
        );

        System.out.println(
            "Ward    : "
            + patient.ward
        );

        System.out.println(
            "Bed     : "
            + patient.bed
        );

        System.out.println(
            "Light/Alarm is ON."
        );
    }
}


// =====================================
// MAIN CLASS
// =====================================
public class Main {

    public static void main(String[] args) {

        Scanner input =
            new Scanner(System.in);


        // =================================
        // DOCTOR
        // =================================

        Doctor doctor =
            new Doctor(
                "Dr. Rahman",
                "D001",
                "1234"
            );


        // =================================
        // SISTER
        // =================================

        Sister sister =
            new Sister(
                "Sister Sumaiya",
                "S001",
                "1234"
            );


        // =================================
        // PATIENTS
        // =================================

        Patient patient1 =
            new Patient(
                "Karim",
                "P001",
                "1234",
                "Ward-A",
                "Bed-01"
            );


        Patient patient2 =
            new Patient(
                "Rahim",
                "P002",
                "1234",
                "Ward-A",
                "Bed-02"
            );


        Patient patient3 =
            new Patient(
                "Hasan",
                "P003",
                "1234",
                "Ward-B",
                "Bed-05"
            );


        // Patient List
        ArrayList<Patient> patients =
            new ArrayList<>();

        patients.add(patient1);
        patients.add(patient2);
        patients.add(patient3);


        // =================================
        // MEDICINES
        // =================================

        Medicine napa =
            new Medicine(
                "Napa",
                "500mg"
            );


        Medicine seclo =
            new Medicine(
                "Seclo",
                "20mg"
            );


        Medicine antibiotic =
            new Medicine(
                "Antibiotic",
                "500mg"
            );


        Medicine vitamin =
            new Medicine(
                "Vitamin",
                "100mg"
            );


        // Medicine List
        ArrayList<Medicine> medicines =
            new ArrayList<>();

        medicines.add(napa);
        medicines.add(seclo);
        medicines.add(antibiotic);
        medicines.add(vitamin);


        // =================================
        // MAIN MENU
        // =================================

        while (true) {

            System.out.println("\n");

            System.out.println(
                "======================================"
            );

            System.out.println(
                " HOSPITAL MEDICINE REMINDER SYSTEM"
            );

            System.out.println(
                "======================================"
            );

            System.out.println(
                "1. Doctor Login"
            );

            System.out.println(
                "2. Sister Login"
            );

            System.out.println(
                "3. Patient Login"
            );

            System.out.println(
                "4. Exit"
            );

            System.out.print(
                "Enter Choice: "
            );


            int choice =
                input.nextInt();


            // =================================
            // DOCTOR LOGIN
            // =================================

            if (choice == 1) {

                System.out.print(
                    "\nDoctor ID: "
                );

                String id =
                    input.next();


                System.out.print(
                    "Password: "
                );

                String password =
                    input.next();


                if (doctor.login(id, password)) {

                    System.out.println(
                        "\nDoctor Login Successful!"
                    );


                    while (true) {

                        System.out.println(
                            "\n===== DOCTOR PORTAL ====="
                        );

                        System.out.println(
                            "1. Write Prescription"
                        );

                        System.out.println(
                            "2. Show Prescription"
                        );

                        System.out.println(
                            "3. Logout"
                        );

                        System.out.print(
                            "Choice: "
                        );


                        int dc =
                            input.nextInt();


                        // =========================
                        // WRITE PRESCRIPTION
                        // =========================

                        if (dc == 1) {

                            System.out.println(
                                "\n===== FIND PATIENT ====="
                            );

                            System.out.print(
                                "Enter Patient ID: "
                            );


                            String patientId =
                                input.next();


                            Patient selectedPatient =
                                null;


                            // Patient search
                            for (Patient p :
                                patients) {

                                if (p.id.equals(patientId)) {

                                    selectedPatient =
                                        p;

                                    break;
                                }
                            }


                            // Patient ?? ????? ????
                            if (selectedPatient == null) {

                                System.out.println(
                                    "\nPatient Not Found!"
                                );

                                System.out.println(
                                    "Please check Patient ID."
                                );

                                continue;
                            }


                            // Patient ????? ????
                            System.out.println(
                                "\nPatient Found!"
                            );

                            System.out.println(
                                "Name : "
                                + selectedPatient.name
                            );

                            System.out.println(
                                "ID   : "
                                + selectedPatient.id
                            );

                            System.out.println(
                                "Ward : "
                                + selectedPatient.ward
                            );

                            System.out.println(
                                "Bed  : "
                                + selectedPatient.bed
                            );


                            // Prescription ????
                            doctor.writePrescription(
                                selectedPatient,
                                medicines,
                                input
                            );
                        }


                        // =========================
                        // SHOW PRESCRIPTION
                        // =========================

                        else if (dc == 2) {

                            doctor.showPrescriptions();
                        }


                        // =========================
                        // LOGOUT
                        // =========================

                        else if (dc == 3) {

                            break;
                        }


                        else {

                            System.out.println(
                                "Invalid Choice!"
                            );
                        }
                    }


                } else {

                    System.out.println(
                        "Wrong Doctor ID or Password!"
                    );
                }
            }


            // =================================
            // SISTER LOGIN
            // =================================

            else if (choice == 2) {

                System.out.print(
                    "\nSister ID: "
                );

                String id =
                    input.next();


                System.out.print(
                    "Password: "
                );

                String password =
                    input.next();


                if (sister.login(id, password)) {

                    System.out.println(
                        "\nSister Login Successful!"
                    );


                    while (true) {

                        System.out.println(
                            "\n===== SISTER PORTAL ====="
                        );

                        System.out.println(
                            "1. Morning Medicine List"
                        );

                        System.out.println(
                            "2. Afternoon Medicine List"
                        );

                        System.out.println(
                            "3. Night Medicine List"
                        );

                        System.out.println(
                            "4. Logout"
                        );

                        System.out.print(
                            "Choice: "
                        );


                        int sc =
                            input.nextInt();


                        // Morning
                        if (sc == 1) {

                            sister.showTimeList(
                                patients,
                                "Morning",
                                input
                            );
                        }


                        // Afternoon
                        else if (sc == 2) {

                            sister.showTimeList(
                                patients,
                                "Afternoon",
                                input
                            );
                        }


                        // Night
                        else if (sc == 3) {

                            sister.showTimeList(
                                patients,
                                "Night",
                                input
                            );
                        }


                        // Logout
                        else if (sc == 4) {

                            break;
                        }


                        else {

                            System.out.println(
                                "Invalid Choice!"
                            );
                        }
                    }


                } else {

                    System.out.println(
                        "Wrong Sister ID or Password!"
                    );
                }
            }


            // =================================
            // PATIENT LOGIN
            // =================================

            else if (choice == 3) {

                System.out.print(
                    "\nPatient ID: "
                );

                String id =
                    input.next();


                System.out.print(
                    "Password: "
                );

                String password =
                    input.next();


                Patient loggedPatient =
                    null;


                // Patient Login
                for (Patient p :
                    patients) {

                    if (p.login(id, password)) {

                        loggedPatient = p;

                        break;
                    }
                }


                if (loggedPatient != null) {

                    System.out.println(
                        "\nPatient Login Successful!"
                    );


                    while (true) {

                        System.out.println(
                            "\n===== PATIENT PORTAL ====="
                        );

                        System.out.println(
                            "Name : "
                            + loggedPatient.name
                        );

                        System.out.println(
                            "ID   : "
                            + loggedPatient.id
                        );

                        System.out.println(
                            "Ward : "
                            + loggedPatient.ward
                        );

                        System.out.println(
                            "Bed  : "
                            + loggedPatient.bed
                        );


                        System.out.println(
                            "\n1. My Medicine"
                        );

                        System.out.println(
                            "2. Alarm Status"
                        );

                        System.out.println(
                            "3. Alarm OFF"
                        );

                        System.out.println(
                            "4. Logout"
                        );

                        System.out.print(
                            "Choice: "
                        );


                        int pc =
                            input.nextInt();


                        // My Medicine
                        if (pc == 1) {

                            loggedPatient.showMedicine();
                        }


                        // Alarm Status
                        else if (pc == 2) {

                            loggedPatient.showAlarmStatus();
                        }


                        // Alarm OFF
                        else if (pc == 3) {

                            loggedPatient.alarmOff();
                        }


                        // Logout
                        else if (pc == 4) {

                            break;
                        }


                        else {

                            System.out.println(
                                "Invalid Choice!"
                            );
                        }
                    }


                } else {

                    System.out.println(
                        "Wrong Patient ID or Password!"
                    );
                }
            }


            // =================================
            // EXIT
            // =================================

            else if (choice == 4) {

                System.out.println(
                    "\nThank you!"
                );

                break;
            }


            else {

                System.out.println(
                    "\nInvalid Choice!"
                );
            }
        }


        input.close();
    }
}