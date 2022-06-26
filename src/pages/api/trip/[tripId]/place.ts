import { createTripAccomodation } from "./../../../../services/prisma";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { TripAccomodation, TripAccomodationProvider } from "@prisma/client";
import { ErrorResponse } from "../../../../types";
import { parseBookingSite } from "../../../../parsers/bookings";
import { getSessionAPIProps } from "../../../../utils/access";

const DEFAULT_LOCALE = "PL";

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
  res: NextApiResponse<PlaceData | ErrorResponse>
) {
  const tripId = (req?.query?.tripId || "") as string;

  const props = await getSessionAPIProps(tripId, req, res);
  if (!props.isAccess) {
    return res.status(403).json({
      error: "Not authorized",
    });
  }

  switch (req.method) {
    case "POST": {
      try {
        const body = req.body as PlacePayloadAdd;
        const response = await axios.get(body.confirmationUrl, {
          headers: {
            "accept-language": req.body.locale || DEFAULT_LOCALE,
          },
        });
        switch (body.provider) {
          case TripAccomodationProvider.BOOKING: {
            const data = parseBookingSite(response.data, DEFAULT_LOCALE);
            console.log("try create", data);
            const place = await createTripAccomodation(
              tripId,
              TripAccomodationProvider.BOOKING,
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
      } catch (err) {}
    }
  }
}
