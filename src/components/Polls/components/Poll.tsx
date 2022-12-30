import { RadioGroup } from "@headlessui/react";
import { Container } from "components/Container";
import { ContainerTitle } from "components/ContainerTitle";
import { useState } from "react";
import { TripPollOverall } from "backend/services/prisma";
import { classNames } from "utils/styles";
import { formatDistance } from "date-fns";
import { TripPollType } from "@prisma/client";

type PollType = {
  poll: TripPollOverall;
};

export const Poll = ({ poll }: PollType) => {
  const [selected, setSelected] = useState<string[]>([]);

  const timeTillEnd = new Date(poll.dateEnd).getTime() - new Date().getTime();
  const isDisabled = timeTillEnd < 0;
  return (
    <>
      <Container>
        <>
          <ContainerTitle
            subtext={
              isDisabled
                ? "Poll expired"
                : `Valid : ${formatDistance(
                    new Date(poll.dateEnd),
                    new Date()
                  )}`
            }
          >
            {poll.name}
          </ContainerTitle>
          <h4 className="border-b border-gray-200  pb-2 truncate text-xl font-semibold leading-7 text-slate-900 mb-1">
            {poll.description}
          </h4>
        </>
        <RadioGroup
          value={selected}
          onChange={(option) => {
            const parsedOption = option as unknown as string;

            if (poll.type === TripPollType.SINGLESELECT) {
              return setSelected([parsedOption]);
            }
            if (selected.includes(parsedOption)) {
              return setSelected(selected.filter((id) => parsedOption !== id));
            }
            const dedup = new Set([...selected, parsedOption]);
            setSelected(Array.from(dedup));
          }}
          className="py-2"
          disabled={isDisabled}
        >
          <div className="space-y-4 mt-3">
            {poll.answer.map((option) => (
              <RadioGroup.Option
                key={option.id}
                value={option.id}
                className={({ checked, disabled }) =>
                  classNames(
                    disabled ? "opacity-50" : "",
                    checked ? "border-transparent" : "border-gray-300",
                    selected.includes(option.id)
                      ? "border-lime-500 border ring-lime-500 bg-lime-50"
                      : "",
                    "relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center">
                      <span className="text-sm flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="font-medium text-gray-900"
                        >
                          {option.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="text-gray-500"
                        >
                          <span className="block sm:inline">
                            {option.description}
                          </span>{" "}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <RadioGroup.Description
                      as="span"
                      className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right"
                    >
                      <span className="font-medium text-gray-900">
                        {option.vote.length}
                      </span>
                      <span className="ml-1 text-gray-500 sm:ml-0">
                        /people voted
                      </span>
                    </RadioGroup.Description>
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-lime-500" : "border-transparent",
                        "absolute -inset-px rounded-lg pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </Container>
    </>
  );
};
