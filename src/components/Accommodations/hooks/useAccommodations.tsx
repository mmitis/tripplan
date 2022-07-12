import { TripAccommodation } from "@prisma/client";
import axios from "axios";
import { QueryKey } from "constants/queryKeys";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useAccommodations = (
  tripId: string,
  ssrAccommodations: TripAccommodation[]
) => {
  const queryClient = useQueryClient();
  const {
    data: placesData,
    isFetched,
    isLoading,
  } = useQuery(
    [QueryKey.Accommodations, tripId],
    () => {
      return axios.get<{ places: TripAccommodation[] }>(
        `/api/trip/${tripId}/place`
      );
    },
    {
      enabled: false,
    }
  );

  const modifyHandler = {
    onSuccess: () => {
      queryClient.refetchQueries([QueryKey.Trip, tripId]);
      queryClient.refetchQueries([QueryKey.Accommodations, tripId]);
    },
  };

  const { mutate: addAccommodation, isLoading: isAdding } = useMutation(
    (confirmationUrl: string) => {
      return axios.post(`/api/trip/${tripId}/place`, {
        confirmationUrl,
        provider: "BOOKING",
      });
    },
    modifyHandler
  );

  const { mutate: removeAccommodation, isLoading: isRemoving } = useMutation(
    (placeId: string) => {
      return axios.delete(`/api/trip/${tripId}/place/${placeId}`);
    },
    modifyHandler
  );

  const sortedAccommodations = useMemo(
    () =>
      (isFetched ? placesData?.data?.places || [] : ssrAccommodations).sort(
        (accoA, accoB) => {
          return (
            new Date(accoA.dateStart).getTime() -
            new Date(accoB.dateStart).getTime()
          );
        }
      ),
    [isFetched, placesData?.data?.places, ssrAccommodations]
  );

  return {
    accommodations: sortedAccommodations,
    addAccommodation,
    removeAccommodation,

    isAdding,
    isLoading,
    isRemoving,
  };
};
