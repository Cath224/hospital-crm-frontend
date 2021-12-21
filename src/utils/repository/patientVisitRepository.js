import { EntityRepository } from "./common/entityRepository";
import { restClient } from "../../plugins/axios";

const path = `${process.env.VUE_APP_BACKEND_API}/patientVisits`;

class PatientVisitRepository extends EntityRepository {
  constructor() {
    super(path);
  }

  getStatistics(doctorId) {
    return restClient.get(`${path}/statistics/${doctorId}`);
  }
}

export default new PatientVisitRepository();
