import { EntityRepository } from "./common/entityRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/medications`;

class MedicineRepository extends EntityRepository {
  constructor() {
    super(path);
  }
}

export default new MedicineRepository();
