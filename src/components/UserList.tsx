import { TripUser, TripUserType, User } from "@prisma/client";
type UserListProps = {
  users?: Array<TripUser & { user?: User }>;
};

export const UserList = ({ users = [] }: UserListProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {(users || []).map((person) => (
        <li key={person?.id} className="py-4 flex">
          <>
            {person.userType == TripUserType.COMMON && (
              <>
                <img
                  className="h-10 w-10 rounded-full"
                  src={person?.user?.image}
                  alt=""
                />
                <div className="ml-3 flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {person?.user?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {person?.user?.email} ({person.role})
                  </span>
                </div>
              </>
            )}
            {person.userType == TripUserType.INVITE && (
              <>
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="ml-3 flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {person?.email}
                  </span>
                  <span className="text-sm text-gray-500">(invited)</span>
                </div>
              </>
            )}
          </>
        </li>
      ))}
    </ul>
  );
};
