import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { TripAccommodation, TripAccommodationProvider } from "@prisma/client";

import { createTripAccomodation, getTripAccomodations } from "services/prisma";
import { ErrorResponse } from "types";
import { parseBookingSite } from "parsers/bookings";
import { getSessionAPIProps } from "utils/access";

const DEFAULT_LOCALE = "EN";

type PlaceData = {
  place: TripAccomodation;
};

type PlacePayloadAdd = {
  confirmationUrl: string;
  provider: string;
  name: string;
  locale?: string;
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
      return placeAdd(req, res, tripId);
    case "GET":
      return placeList(req, res, tripId);
    default:
      return res.json({});
  }
}

const placeAdd = async (
  req: NextApiRequest,
  res: NextApiResponse<PlaceData | ErrorResponse>,
  tripId: string
) => {
  try {
    const body = req.body as PlacePayloadAdd;
    const response = await axios.get(body.confirmationUrl, {
      headers: {
        "accept-language": req.body.locale || DEFAULT_LOCALE,
      },
    });
    switch (body.provider) {
      case TripAccommodationProvider.BOOKING: {
        const data = parseBookingSite(response.data, DEFAULT_LOCALE);
        const place = await createTripAccomodation(
          tripId,
          TripAccommodationProvider.BOOKING,
          body.confirmationUrl,
          data
        );

        return res.status(200).json({
          place,
        });
      }
      default:
        return res.status(404).json({
          error: "Provider does not exist",
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      error: "Provider does not exist",
    });
  }
};

const placeList = async (
  req: NextApiRequest,
  res: NextApiResponse<{ places: TripAccommodation[] } | ErrorResponse>,
  tripId: string
) => {
  try {
    const places = (await getTripAccomodations(tripId)) || [];
    return res.status(200).json({
      places,
    });
  } catch (err) {}
};
