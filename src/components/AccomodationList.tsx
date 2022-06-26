import {
  XCircleIcon,
  CashIcon,
  CalendarIcon,
  BookOpenIcon,
} from "@heroicons/react/outline";
import { TripAccomodation } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { Fragment, useMemo } from "react";
import { useMutation } from "react-query";
import { EmptyState } from "./EmptyState";

type AccomodationListProps = {
  accomodations: TripAccomodation[];
  locale: string;
  currency: string;
  tripId: string;
};

export const AccomodationList = ({
  accomodations,
  locale,
  currency,
  tripId,
}: AccomodationListProps) => {
  const { mutate: addPlace } = useMutation(() =>
    axios.post(`/api/trip/${tripId}/place`, {
      confirmationUrl:
        "https://secure.booking.com/myreservations.en-gb.html?aid=7937097&label=from_conf_1&sid=28577b8c20c5f3bdea32acf2f73ae26f&auth_key=3cfYKXvcvqZ7Vmur;do=login&",
      provider: "BOOKING",
    })
  );

  const sortedAccomodations = useMemo(
    () =>
      accomodations.sort((accoA, accoB) => {
        return (
          new Date(accoA.dateStart).getTime() -
          new Date(accoB.dateStart).getTime()
        );
      }),
    [accomodations]
  );

  const onAccomodationAdd = () => {};

  return (
    <div className="bg-white overflow-hidden sm:rounded-md">
      <h4 className="truncate text-base font-medium leading-7 text-slate-900 mb-3">
        Accomodations
      </h4>
      {!accomodations.length && (
        <EmptyState
          cta="Add accomodation"
          label="No accomodations"
          subtitle="Click button to add new accomodation"
          onClick={onAccomodationAdd}
        />
      )}
      {Boolean(accomodations.length) && (
        <ul role="list" className="divide-y divide-gray-200">
          {sortedAccomodations.map((accomodation) => (
            <li key={accomodation.id}>
              <div className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0 ">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="object-cover h-18 w-24 rounded-md"
                        src={accomodation.coverPhoto}
                        alt="accomodation photo"
                      />
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {accomodation.name}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="truncate">
                            {accomodation.propertyAddress} (
                            {accomodation.propertyPhone})
                          </span>
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div>
                          {[accomodation.dateStart, accomodation.dateEnd].map(
                            (date, index) => (
                              <Fragment key={index}>
                                <p
                                  className={`${
                                    index ? "mt-2" : ""
                                  } text-sm text-gray-700 flex items-center`}
                                >
                                  <CalendarIcon
                                    className="h-5 w-5 text-gray-300 mr-2"
                                    aria-hidden="true"
                                  />
                                  <time>
                                    {format(new Date(date), "dd/mm/yyyy")}
                                  </time>
                                </p>
                              </Fragment>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 flex items-center">
                          <CashIcon
                            className="h-5 w-5 text-gray-300 mr-2"
                            aria-hidden="true"
                          />
                          {new Intl.NumberFormat(locale, {
                            style: "currency",
                            currency,
                          }).format(accomodation.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <a href={accomodation.confirmationLink}>
                      <BookOpenIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </a>
                    <XCircleIcon
                      className=" ml-1 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <button
          onClick={onAccomodationAdd}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add accomodation
        </button>
      </div>
    </div>
  );
};
