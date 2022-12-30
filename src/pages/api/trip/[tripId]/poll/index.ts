import { PollCreateValues } from "./../../../../../components/Polls/components/PollsCreateModal";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import {
  TripAccommodation,
  TripAccommodationProvider,
  TripPoll,
} from "@prisma/client";

import {
  createPoll,
  createTripAccomodation,
  getTripAccomodations,
  getTripPolls,
} from "backend/services/prisma";
import { ErrorResponse } from "types";
import { parseBookingSite } from "backend/parsers/bookings";
import { getSessionAPIProps } from "utils/access";

type PollData = {
  poll: TripPoll;
};

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
    case "POST":
      return pollAdd(req, res, tripId);
    case "GET":
      return pollList(req, res, tripId);
    default:
      return res.json({});
  }
}

const pollAdd = async (
  req: NextApiRequest,
  res: NextApiResponse<PollData | ErrorResponse>,
  tripId: string
) => {
  try {
    const body = req.body as PollCreateValues;
    const poll = await createPoll(tripId, body);
    res.json({
      poll,
    });
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      error: "Cannot create poll",
    });
  }
};

const pollList = async (
  req: NextApiRequest,
  res: NextApiResponse<{ polls: TripPoll[] } | ErrorResponse>,
  tripId: string
) => {
  try {
    const polls = (await getTripPolls(tripId)) || [];
    return res.status(200).json({
      polls,
    });
  } catch (err) {}
};
