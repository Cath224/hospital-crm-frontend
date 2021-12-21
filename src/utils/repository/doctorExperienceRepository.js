import { CommonRepository } from "./common/commonRepository";

const path = `${process.env.VUE_APP_BACKEND_API}/doctorExperiences`;

class DoctorExperienceRepository extends CommonRepository {
  constructor() {
    super(path);
  }
}

export default new DoctorExperienceRepository();
