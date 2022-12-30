import {
  TripTransport,
  TripTransportProvider,
  TripTransportType,
} from "@prisma/client";
import axios from "axios";
import { TransportPayload } from "components/Transport/types/transport";
import { ryanairFlightDetails } from "backend/graphql/ryanair";

const RYANAIR_API = "https://www.ryanair.com/api/bookingfa/pl-pl/graphql";

export const getFlightDetails = async (
  tripId: string,
  payload: TransportPayload
) => {
  switch (payload.provider) {
    case TripTransportProvider.RYANAIR: {
      const { data, status } = await axios.post(RYANAIR_API, {
        query: ryanairFlightDetails,
        variables: {
          bookingInfo: {
            reservationNumber: payload.reservationNumber,
            emailAddress: payload.emailAddress,
          },
        },
      });
      if (status !== 200) {
        throw new Error("Not supported");
      }

      const {
        data: { getBookingByReservationNumber: flightData },
      } = data;

      const transports = flightData.journeys.map((journey: any) => {
        const transport: Partial<TripTransport> = {
          tripId,
          price: flightData.payments[0].amt / flightData.journeys.length,
          dateStart: new Date(journey.arriveUTC),
          dateEnd: new Date(journey.departUTC),
          origin: `${journey.orig} (${journey.origCountry})`,
          destination: `${journey.dest} (${journey.destCountry})`,
          provider: TripTransportProvider.RYANAIR,
          type: TripTransportType.PLANE,
          uniqueNumber: payload.reservationNumber,
        };
        return transport;
      });

      return transports;
    }
    default:
      throw new Error("Not supported");
  }
};
