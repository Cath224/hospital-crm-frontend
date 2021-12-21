import { restClient } from "../../../plugins/axios";

export class CommonRepository {
  constructor(path) {
    this.path = path;
  }

  create(entity) {
    return restClient.post(this.path, entity);
  }

  get(filter) {
    let fullPath = this.path;
    if (filter != null) {
      fullPath += `?filter=${filter}`;
    }
    return restClient.get(fullPath);
  }

  deleteByFilter(filter) {
    let fullPath = this.path;
    if (filter != null) {
      fullPath += `?filter=${filter}`;
    }
    return restClient.delete(fullPath);
  }
}
