import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export const Hero = () => {
  return (
    <div className="relative bg-gray-800 overflow-hidden h-full">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 sm:mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                <div>
                  <div className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200">
                    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-lime-500 rounded-full">
                      BETA
                    </span>
                    <span className="ml-4 text-sm">
                      Trip<span className="text-lime-200">Plan.io</span>
                    </span>
                    <ChevronRightIcon
                      className="ml-2 w-5 h-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </div>
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className="md:block">Zorganizuj</span>{" "}
                    <span className="text-lime-400 md:block">
                      swój trip tak jak trzeba.
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Aktualnie <span className="text-lime-200">TripPlan.io</span>{" "}
                    znajduje się w fazie zamkniętych testów i jeśli nie
                    otrzymałeś zaproszenia do jednego z powstałych tripów to nie
                    będzie Ci dane go przetestować.
                  </p>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
