import { TripPoll } from "@prisma/client";
import axios from "axios";
import { QueryKey } from "constants/queryKeys";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TripPollOverall } from "backend/services/prisma";
import { PollCreateValues } from "../components/PollsCreateModal";

export const usePolls = (tripId: string, ssrPolls: TripPollOverall[]) => {
  const queryClient = useQueryClient();
  const {
    data: pollsData,
    isFetched,
    isLoading,
  } = useQuery(
    [QueryKey.Polls, tripId],
    () => {
      return axios.get<{ polls: TripPollOverall[] }>(
        `/api/trip/${tripId}/poll`
      );
    },
    {
      enabled: false,
    }
  );

  const modifyHandler = {
    onSuccess: () => {
      queryClient.refetchQueries([QueryKey.Trip, tripId]);
      queryClient.refetchQueries([QueryKey.Polls, tripId]);
    },
  };

  const { mutate: addPoll, isLoading: isAdding } = useMutation(
    (values: PollCreateValues) => {
      return axios.post(`/api/trip/${tripId}/poll`, values);
    },
    modifyHandler
  );

  const { mutate: removePoll, isLoading: isRemoving } = useMutation(
    (pollId: string) => {
      return axios.delete(`/api/trip/${tripId}/poll/${pollId}`);
    },
    modifyHandler
  );

  const sortedPolls = useMemo(
    () =>
      (isFetched ? pollsData?.data?.polls || [] : ssrPolls).sort(
        (pollA, pollB) => {
          return (
            new Date(pollA.dateStart).getTime() -
            new Date(pollB.dateStart).getTime()
          );
        }
      ),
    [isFetched, pollsData?.data?.polls, ssrPolls]
  );

  return {
    polls: sortedPolls,
    addPoll,
    removePoll,

    isAdding,
    isLoading,
    isRemoving,
  };
};
