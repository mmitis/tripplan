import { TripTransport, TripTransportType } from "@prisma/client";
import axios from "axios";
import { QueryKey } from "constants/queryKeys";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TransportPayload } from "../types/transport";

export const useTransports = (
  tripId: string,
  ssrTransports: TripTransport[]
) => {
  const queryClient = useQueryClient();
  const {
    data: transportData,
    isFetched,
    isLoading,
  } = useQuery(
    [QueryKey.Transports, tripId],
    () => {
      return axios.get<{ transports: TripTransport[] }>(
        `/api/trip/${tripId}/transport`
      );
    },
    {
      enabled: false,
    }
  );

  const modifyhandler = {
    onSuccess: () => {
      queryClient.refetchQueries([QueryKey.Trip, tripId]);
      queryClient.refetchQueries([QueryKey.Transports, tripId]);
    },
  };

  const { mutate: addTransport, isLoading: isAdding } = useMutation(
    (payloadData: TransportPayload) => {
      return axios.post(`/api/trip/${tripId}/transport`, payloadData);
    },
    modifyhandler
  );

  const { mutate: removeTransport, isLoading: isRemoving } = useMutation(
    (transportId: string) => {
      return axios.delete(`/api/trip/${tripId}/transport/${transportId}`);
    },
    modifyhandler
  );

  const sortedTransports = useMemo(
    () =>
      (isFetched
        ? transportData?.data?.transports || []
        : ssrTransports || []
      ).sort((accoA, accoB) => {
        return 1;
      }),
    [isFetched, transportData?.data?.transports, ssrTransports]
  );

  return {
    transports: sortedTransports,
    addTransport,
    removeTransport,

    isAdding,
    isLoading,
    isRemoving,
  };
};
