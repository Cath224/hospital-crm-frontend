import DoctorRepository from "./repository/doctorRepository";
import PatientRepository from "./repository/patientRepository";

const repositories = {
  DOCTOR: DoctorRepository,
  PATIENT: PatientRepository,
};

export const RepositoryFactory = {
  get(name) {
    return repositories[name];
  },
};
