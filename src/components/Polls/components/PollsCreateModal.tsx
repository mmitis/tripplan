/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TripPollType } from "@prisma/client";
import { Button } from "components/Button";
import { v4 as uuid } from "uuid";
import { Field, Form } from "react-final-form";

interface PollsCreateModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: (pollData: PollCreateValues) => void;
}

export type PollCreateValues = {
  name: string;
  description: string;
  options: PollOption[];
  type: TripPollType;
  validity: number;
};

type PollOption = {
  id: string;
  value: string;
  description: string;
};

export const PollsCreateModal = ({
  open,
  onClose,
  onAccept,
}: PollsCreateModalProps) => {
  useEffect(() => {}, [open]);

  const onSubmit = (values: PollCreateValues) => {
    onAccept(values);
  };
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
                <Form<PollCreateValues>
                  onSubmit={onSubmit}
                  initialValues={{
                    options: [],
                    validity: 24,
                    type: TripPollType.SINGLESELECT,
                    name: "",
                    description: "",
                  }}
                  validate={(values) => {
                    const errors = {};

                    return errors;
                  }}
                  render={({
                    handleSubmit,
                    submitting,
                    valid,
                    form,
                    values,
                  }) => {
                    return (
                      <>
                        <div>
                          <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title
                              as="h3"
                              className="text-lg leading-6 font-medium text-gray-900"
                            >
                              Add poll
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500 mb-3">
                                Fill the form to create new poll
                              </p>
                              <Field name="type" type="select">
                                {(props) => (
                                  <div className="w-full">
                                    <select
                                      {...props.input}
                                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                      <option value={TripPollType.SINGLESELECT}>
                                        Single select
                                      </option>
                                      <option value={TripPollType.MULTISELECT}>
                                        Multi select
                                      </option>
                                    </select>
                                  </div>
                                )}
                              </Field>
                              <Field name="validity" type="select">
                                {(props) => (
                                  <div className="w-full">
                                    <select
                                      {...props.input}
                                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                      {[12, 24, 47, 72].map((value) => (
                                        <option key={value} value={value}>
                                          {value}h
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                              </Field>
                              <Field name="name">
                                {(props) => (
                                  <div className="w-full mt-2">
                                    <input
                                      type="text"
                                      className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                      placeholder="Poll name"
                                      {...props.input}
                                    />
                                  </div>
                                )}
                              </Field>
                              <Field name="description">
                                {(props) => (
                                  <div className="w-full mt-2">
                                    <input
                                      type="text"
                                      className="shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                      placeholder="Question / short description"
                                      {...props.input}
                                    />
                                  </div>
                                )}
                              </Field>
                              <Field name="options">
                                {(props) => (
                                  <>
                                    <div className="mt-4">
                                      {values.options.map((option, index) => {
                                        return (
                                          <div
                                            className="mt-2 flex items-center "
                                            key={option.id}
                                          >
                                            <span className="text-xs text-gray-500">
                                              {index + 1})
                                            </span>
                                            <div className="flex flex-col w-full">
                                              <input
                                                type="text"
                                                className="ml-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder={`Answer ${
                                                  index + 1
                                                }`}
                                                onChange={(e) =>
                                                  props.input.onChange(
                                                    values.options.map(
                                                      (el, innerIndex) =>
                                                        index === innerIndex
                                                          ? {
                                                              ...el,
                                                              value:
                                                                e.currentTarget
                                                                  .value,
                                                            }
                                                          : el
                                                    )
                                                  )
                                                }
                                              />
                                              <input
                                                type="text"
                                                className="ml-4 mt-1 shadow-sm focus:ring-lime-500 focus:border-lime-500 block sm:text-sm border-gray-300 rounded-md"
                                                placeholder={`Answer description ${
                                                  index + 1
                                                }`}
                                                onChange={(e) =>
                                                  props.input.onChange(
                                                    values.options.map(
                                                      (el, innerIndex) =>
                                                        index === innerIndex
                                                          ? {
                                                              ...el,
                                                              description:
                                                                e.currentTarget
                                                                  .value,
                                                            }
                                                          : el
                                                    )
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="text-right mt-2">
                                      <Button
                                        onClick={() =>
                                          props.input.onChange([
                                            ...values.options,
                                            {
                                              id: uuid(),
                                              value: "",
                                              description: "",
                                            },
                                          ])
                                        }
                                      >
                                        Add answer
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </Field>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <Button
                            disabled={!valid}
                            onClick={handleSubmit}
                            className="w-full"
                          >
                            Create poll
                          </Button>
                        </div>
                      </>
                    );
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
