import { EntityRepository } from "./common/entityRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/doctors`;

class DoctorRepository extends EntityRepository {
  constructor() {
    super(path);
  }
}

export default new DoctorRepository();
