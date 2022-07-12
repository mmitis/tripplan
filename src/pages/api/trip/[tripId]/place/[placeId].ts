import type { NextApiRequest, NextApiResponse } from "next";

import { removeTripAccomodation } from "services/prisma";
import { ErrorResponse } from "types";
import { getSessionAPIProps } from "utils/access";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  const tripId = (req?.query?.tripId || "") as string;
  const placeId = (req?.query?.placeId || "") as string;

  const props = await getSessionAPIProps(tripId, req, res);
  if (!props.isAccess) {
    return res.status(403).json({
      error: "Not authorized",
    });
  }

  switch (req.method?.toLocaleUpperCase()) {
    case "DELETE":
      return placeDelete(req, res, tripId, placeId);
    default:
      return res.json({});
  }
}

const placeDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<{ place: null } | ErrorResponse>,
  tripId: string,
  placeId: string
) => {
  try {
    (await removeTripAccomodation(tripId, placeId)) || [];
    return res.status(200).json({
      place: null,
    });
  } catch (err) {}
};
