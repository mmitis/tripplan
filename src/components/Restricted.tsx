import { signIn, useSession } from "next-auth/react";

export const Restricted = () => {
  const { data, status } = useSession();
  return (
    <>
      <div className="bg-gray-800 min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-lime-300 sm:text-5xl">
              Wzbronione!
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-50 tracking-tight sm:text-5xl">
                  To trip nie może być pokazany
                </h1>
                <p className="mt-1 text-base text-gray-50">
                  Zapytaj kogoś o dostęp lub odejdź gdzieś.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                >
                  Do domu
                </a>
                {status !== "loading" && !data?.user && (
                  <a
                    onClick={() => signIn()}
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-lime-700 bg-lime-100 hover:bg-lime-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                  >
                    Zaloguj się
                  </a>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
