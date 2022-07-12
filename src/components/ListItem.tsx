import {
  AnnotationIcon,
  BookOpenIcon,
  CalendarIcon,
  CashIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { format } from "date-fns";
import { Fragment } from "react";

type ListItemProps = {
  id: string;
  isRemoving: boolean;
  image: string;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  price?: number;
  annotation?: string;
  locale: string;
  currency: string;
  previewLink?: string;
  onClickRemove: (id: string) => void;
};

export const ListItem = ({
  id,
  isRemoving,
  image,
  name,
  description,
  dateStart,
  dateEnd,
  price,
  annotation,
  locale,
  currency,
  previewLink,
  onClickRemove,
}: ListItemProps) => {
  return (
    <li className={isRemoving ? "opacity-40" : ""}>
      <div className="block hover:bg-gray-50">
        <div className="flex items-center py-3">
          <div className="min-w-0 flex-1 flex items-center">
            <div className="w-24">
              <div className="w-full lg:w-auto aspect-w-4 aspect-h-3 lg:col-span-4 rounded-lg overflow-hidden block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-center object-cover cursor-pointer"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
              <div>
                <p className="text-sm font-medium text-lime-600 truncate">
                  {name}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">{description}</span>
                </p>
              </div>
              <div className="hidden md:block min-w-[165px]">
                <div>
                  {[dateStart, dateEnd].map((date, index) => (
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
                          {format(new Date(date), "dd/MM/yyyy HH:mm")}
                        </time>
                      </p>
                    </Fragment>
                  ))}
                </div>
              </div>
              {price && (
                <div>
                  <p className="text-sm text-gray-700 flex items-center min-w-[140px]">
                    <CashIcon
                      className="h-5 w-5 text-gray-300 mr-2"
                      aria-hidden="true"
                    />
                    {new Intl.NumberFormat(locale, {
                      style: "currency",
                      currency,
                    }).format(price)}
                  </p>
                </div>
              )}
              {annotation && (
                <div>
                  <p className="text-sm text-gray-700 flex items-center min-w-[140px]">
                    <AnnotationIcon
                      className="h-5 w-5 text-gray-300 mr-2"
                      aria-hidden="true"
                    />
                    {annotation}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex min-w-[40px]">
            {previewLink && (
              <a href={previewLink}>
                <BookOpenIcon
                  className="h-5 w-5 text-lime-800"
                  aria-hidden="true"
                />
              </a>
            )}
            <a
              href="#"
              onClick={() => {
                onClickRemove(id);
              }}
            >
              <XCircleIcon
                className=" ml-1 h-5 w-5 text-lime-800"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};
