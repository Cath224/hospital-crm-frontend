import { EntityRepository } from "./common/entityRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/branches`;

class BranchRepository extends EntityRepository {
  constructor() {
    super(path);
  }
}

export default new BranchRepository();
