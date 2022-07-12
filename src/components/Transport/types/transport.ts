import { TripTransportProvider, TripTransportType } from "@prisma/client";

export type TransportPayload = {
  provider: TripTransportProvider;
  reservationNumber: string;
  emailAddress: string;
  type: TripTransportType;
};
