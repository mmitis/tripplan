import { signIn } from "next-auth/react";
import Link from "next/link";

export const Restricted = () => {
  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-teal-600 sm:text-5xl">
              Restricted
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  This event cannot be shown
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please ask someone to invite you or go away
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                {/*eslint-disable-next-line @next/next/no-html-link-for-pages*/}
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Go back home
                </a>
                <a
                  onClick={() => signIn()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Login !
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
