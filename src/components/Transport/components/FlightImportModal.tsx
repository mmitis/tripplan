/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { TripTransportProvider, TripTransportType } from "@prisma/client";
import { TransportPayload } from "../types/transport";

interface FlightImportModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: (data: TransportPayload) => void;
}

export const FlightImportModal = ({
  open,
  onClose,
  onAccept,
}: FlightImportModalProps) => {
  const [reservationNumber, setReservationNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  useEffect(() => {
    setReservationNumber("");
    setEmailAddress("");
  }, [open]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Import flight
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-3">
                        Paste reservation number
                      </p>
                      <div className="w-full">
                        <label
                          htmlFor="provider"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Provider
                        </label>
                        <select
                          id="provider"
                          name="provider"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          defaultValue="Canada"
                        >
                          <option value={TripTransportProvider.RYANAIR}>
                            Ryanair
                          </option>
                        </select>
                      </div>
                      <div className="w-full  mt-2">
                        <label htmlFor="reservation-number" className="sr-only">
                          Reservation ID
                        </label>
                        <input
                          type="password"
                          name="reservation-number"
                          id="reservation-number"
                          value={reservationNumber}
                          onChange={(e) =>
                            setReservationNumber(e.currentTarget.value)
                          }
                          className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Reservation number"
                        />
                      </div>
                      <div className="w-full mt-2">
                        <label htmlFor="email" className="sr-only">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={emailAddress}
                          onChange={(e) =>
                            setEmailAddress(e.currentTarget.value)
                          }
                          className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-lime-600 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 sm:text-sm"
                    onClick={() =>
                      onAccept({
                        emailAddress,
                        reservationNumber,
                        provider: TripTransportProvider.RYANAIR,
                        type: TripTransportType.PLANE,
                      })
                    }
                  >
                    Import flight
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
