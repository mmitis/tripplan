import { getFlightDetails } from "./../../../../../fetchers/flights";
import type { NextApiRequest, NextApiResponse } from "next";
import { TripTransport, TripTransportType } from "@prisma/client";

import { createTripTransport, getTripTransports } from "services/prisma";
import { ErrorResponse } from "types";
import { getSessionAPIProps } from "utils/access";
import { TransportPayload } from "components/Transport/types/transport";

type TransportPayloadAdd = {
  type: TripTransportType;
  payload: {
    id: string;
  };
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
      return transportAdd(req, res, tripId);
    case "GET":
      return transportList(req, res, tripId);
    default:
      return res.json({});
  }
}

const transportAdd = async (
  req: NextApiRequest,
  res: NextApiResponse<null | ErrorResponse>,
  tripId: string
) => {
  try {
    const body = req.body as TransportPayload;
    switch (body.type) {
      case TripTransportType.PLANE: {
        const transports: Partial<TripTransport>[] = await getFlightDetails(
          tripId,
          body
        );
        await Promise.all(
          transports.map((transport) => createTripTransport(transport))
        );
        return res.status(200).json(null);
      }
      default:
        return res.status(404).json({
          error: "Provider does not exist",
        });
    }
  } catch (err) {
    console.log(err)
  }
};

const transportList = async (
  req: NextApiRequest,
  res: NextApiResponse<{ transports: TripTransport[] } | ErrorResponse>,
  tripId: string
) => {
  try {
    const transports = (await getTripTransports(tripId)) || [];
    return res.status(200).json({
      transports,
    });
  } catch (err) {}
};
