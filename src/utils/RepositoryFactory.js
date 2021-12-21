import DoctorRepository from "./repository/doctorRepository";
import PatientRepository from "./repository/patientRepository";
import OfficeRepository from "./repository/officeRepository";
import BranchRepository from "./repository/branchRepository";
import DoctorExperienceRepository from "./repository/doctorExperienceRepository";
import MedicineRepository from "./repository/medicineRepository";
import PatientVisitRepository from "./repository/patientVisitRepository";
import DiagnosisRepository from "./repository/diagnosisRepository";

const repositories = {
  DOCTOR: DoctorRepository,
  PATIENT: PatientRepository,
  OFFICE: OfficeRepository,
  BRANCH: BranchRepository,
  DOCTOR_EXPERIENCE: DoctorExperienceRepository,
  MEDICINE: MedicineRepository,
  PATIENT_VISIT: PatientVisitRepository,
  DIAGNOSIS: DiagnosisRepository,
};

export const RepositoryFactory = {
  get(name) {
    return repositories[name];
  },
};
