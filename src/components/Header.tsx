import { TripOverall } from "backend/services/prisma";

type HeaderProps = {
  trip: TripOverall;
};

export const Header = ({ trip }: HeaderProps) => {
  return (
    <header className="pb-24 bg-gray-800">
      <>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative py-5 flex items-center justify-center lg:justify-between">
            {/* Logo */}
            <div className="absolute left-0 flex-shrink-0 lg:static flex items-center">
              <a href="#">
                <span className="w-auto font-medium text-lime-200 text-2xl">
                  Trip<span className="text-lime-300">Plan.io</span>
                </span>{" "}
              </a>
              {trip && (
                <span className="font-medium text-lime-50 text-xl ml-2">
                  ({trip.name} - {trip.location})
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    </header>
  );
};
