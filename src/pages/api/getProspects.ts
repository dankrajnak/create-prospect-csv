import type { NextApiRequest, NextApiResponse } from "next";
import { createProspects } from "../../apiServices/fakeProspectService";
import { Prospect } from "../../types/prospect";

const getPropsects = (
  req: NextApiRequest,
  res: NextApiResponse<Prospect[]>
) => {
  const numProspects = Number(req.query["num"]);
  const email = req.query["email"] as string;

  res.status(200).json(createProspects(numProspects, { email }));
};

export default getPropsects;
