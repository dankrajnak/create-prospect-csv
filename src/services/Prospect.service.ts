import axios from "axios";
import { Prospect } from "../types/prospect";

export default class ProspectService {
  static createProspects(
    numberOfProspects: number,
    options: { email: string }
  ): Promise<Prospect[]> {
    return axios
      .get("/api/getProspects", {
        params: {
          num: numberOfProspects,
          email: options.email,
        },
      })
      .then(({ data }) => data);
  }
}
