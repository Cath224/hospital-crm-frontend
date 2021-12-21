import { EntityRepository } from "./common/entityRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/offices`;

class OfficeRepository extends EntityRepository {
  constructor() {
    super(path);
  }
}

export default new OfficeRepository();
