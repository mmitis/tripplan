import { TripPoll } from "@prisma/client";

import { PollCreateValues, PollsCreateModal } from "./PollsCreateModal";
import { EmptyState } from "../../EmptyState";
import { useState } from "react";
import { Button } from "components/Button";
import { ContainerTitle } from "components/ContainerTitle";
import { usePolls } from "../hooks/usePolls";
import { ListItem } from "components/ListItem";
import { StockImages } from "constants/mockImages";
import { TripPollOverall } from "services/prisma";

type PollsProps = {
  polls: TripPollOverall[];
  locale: string;
  currency: string;
  tripId: string;
};

export const Polls = ({ tripId, polls, locale, currency }: PollsProps) => {
  const [addModal, setAddModal] = useState(false);
  const {
    polls: pollsList,
    addPoll,
    isAdding,
    isLoading,
  } = usePolls(tripId, polls);

  const onAccept = (values: PollCreateValues) => {
    setAddModal(false);
    addPoll(values);
  };
  return (
    <>
      <ContainerTitle>Polls</ContainerTitle>
      <PollsCreateModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onAccept={onAccept}
      />
      {!pollsList.length && (
        <EmptyState
          cta="Create poll"
          label="No polls"
          subtitle="Click button to create new poll"
          onClick={() => setAddModal(true)}
        />
      )}

      {Boolean(pollsList.length) && (
        <ul role="list" className="divide-y divide-gray-200">
          {pollsList.map((poll) => (
            <ListItem
              key={poll.id}
              id={poll.id}
              locale={locale}
              currency={currency}
              description={poll.description}
              dateStart={poll.dateStart}
              dateEnd={poll.dateEnd}
              image={StockImages.Polls}
              name={poll.name}
              annotation={`votes: ${poll.answer.reduce(
                (acc, el) => acc + el.vote.length,
                0
              )} / options: ${poll.answer.length}`}
              onClickRemove={() => {}}
              isRemoving={false}
            />
          ))}
        </ul>
      )}
      <div className="mt-4 mb-2">
        <Button onClick={() => setAddModal(true)}>Create poll</Button>
      </div>
    </>
  );
};
