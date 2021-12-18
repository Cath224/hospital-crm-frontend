import { EntityRepository } from "./common/entityRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/patients`;

class PatientRepository extends EntityRepository {
  constructor() {
    super(path);
  }
}

export default new PatientRepository();
