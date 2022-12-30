import { TripOverall } from "backend/services/prisma";

type EstimationsProps = {
  trip: Awaited<TripOverall>;
};
export const Estimations = ({ trip }: EstimationsProps) => {
  const acommodationCosts = (trip?.accommodation || []).map(
    (acco) => acco.price
  );
  const transportCosts = (trip?.transport || []).map((trans) => trans.price);
  const overallCost = [...acommodationCosts, ...transportCosts].reduce(
    (acc, cost) => acc + cost,
    0
  );
  return (
    <div className="text-sm text-gray-400 flex justify-between">
      <span className="text-gray-700">Costs overall:</span>
      <span>
        {new Intl.NumberFormat(trip?.locale, {
          style: "currency",
          currency: trip?.currency,
        }).format(overallCost)}
      </span>
      <span className="text-gray-700">Splitwise costs:</span>
      <span>
        {new Intl.NumberFormat(trip?.locale, {
          style: "currency",
          currency: trip?.currency,
        }).format(0)}
      </span>
      <span className="text-gray-700">Costs per person:</span>
      <span>
        {new Intl.NumberFormat(trip?.locale, {
          style: "currency",
          currency: trip?.currency,
        }).format(overallCost / (trip?.users || []).length)}
      </span>
    </div>
  );
};
