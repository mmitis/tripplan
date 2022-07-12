import type { NextApiRequest, NextApiResponse } from "next";

import { removeTripTransport } from "services/prisma";
import { ErrorResponse } from "types";
import { getSessionAPIProps } from "utils/access";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  const tripId = (req?.query?.tripId || "") as string;
  const transportId = (req?.query?.transportId || "") as string;

  const props = await getSessionAPIProps(tripId, req, res);
  if (!props.isAccess) {
    return res.status(403).json({
      error: "Not authorized",
    });
  }

  switch (req.method?.toLocaleUpperCase()) {
    case "DELETE":
      return transportDelete(req, res, tripId, transportId);
    default:
      return res.json({});
  }
}

const transportDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<{ place: null } | ErrorResponse>,
  tripId: string,
  transportId: string
) => {
  try {
    (await removeTripTransport(tripId, transportId)) || [];
    return res.status(200).json({
      place: null,
    });
  } catch (err) {}
};
