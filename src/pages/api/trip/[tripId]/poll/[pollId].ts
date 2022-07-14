import type { NextApiRequest, NextApiResponse } from "next";

import { removeTripPoll, removeTripTransport } from "services/prisma";
import { ErrorResponse } from "types";
import { getSessionAPIProps } from "utils/access";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  const tripId = (req?.query?.tripId || "") as string;
  const pollId = (req?.query?.pollId || "") as string;

  const props = await getSessionAPIProps(tripId, req, res);
  if (!props.isAccess) {
    return res.status(403).json({
      error: "Not authorized",
    });
  }

  switch (req.method?.toLocaleUpperCase()) {
    case "DELETE":
      return pollDelete(req, res, tripId, pollId);
    default:
      return res.json({});
  }
}

const pollDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<{ place: null } | ErrorResponse>,
  tripId: string,
  pollId: string
) => {
  try {
    (await removeTripPoll(tripId, pollId)) || [];
    return res.status(200).json({
      place: null,
    });
  } catch (err) {}
};
