import { restClient } from "../../../plugins/axios";
import { CommonRepository } from "./commonRepository";

export class EntityRepository extends CommonRepository {
  constructor(path) {
    super(path);
  }

  update(entity, id) {
    return restClient.put(`${this.path}/${id}`, entity);
  }

  deleteById(id) {
    return restClient.delete(`${this.path}/${id}`);
  }

  getById(id) {
    return restClient.get(`${this.path}/${id}`);
  }
}
