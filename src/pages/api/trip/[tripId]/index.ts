import type { NextApiRequest, NextApiResponse } from "next";

import { getTrip, TripOverall } from "backend/services/prisma";
import { ErrorResponse } from "types";
import { getSessionAPIProps } from "utils/access";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  const tripId = (req?.query?.tripId || "") as string;

  const props = await getSessionAPIProps(tripId, req, res);
  if (!props.isAccess) {
    return res.status(403).json({
      error: "Not authorized",
    });
  }

  switch (req.method?.toLocaleUpperCase()) {
    case "GET":
      return tripGet(req, res, tripId);
    default:
      return res.json({});
  }
}

const tripGet = async (
  req: NextApiRequest,
  res: NextApiResponse<{ trip: TripOverall | null } | ErrorResponse>,
  tripId: string
) => {
  try {
    const trip = await getTrip(tripId);
    return res.status(200).json({
      trip,
    });
  } catch (err) {}
};
