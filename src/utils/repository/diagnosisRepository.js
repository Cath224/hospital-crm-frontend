import { EntityRepository } from "./common/entityRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/diagnoses`;

class DiagnosisRepository extends EntityRepository {
  constructor() {
    super(path);
  }
}

export default new DiagnosisRepository();
