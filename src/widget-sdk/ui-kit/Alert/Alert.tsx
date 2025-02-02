import { FunctionComponent } from 'preact';

import Checkmark from '../../icons/checkmark.svg';
import Error from '../../icons/error.svg';
import Info from '../../icons/info.svg';
import Warning from '../../icons/warning.svg';
import X from '../../icons/x.svg';

// Maybe someday extend the `type` field to allow more inputs like `range` or `time`
export interface AlertProps {
  title: string;
  type: 'error' | 'warning' | 'info' | 'success';
  description: string;
  url?: string;
}

export const Alert: FunctionComponent<AlertProps> = ({
  title,
  type,
  description,
  url,
}) => {
  return (
    <div className="mx-auto max-w-8xl">
      {(() => {
        switch (type) {
          case 'error':
            return (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0 p-1">
                    <Error
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {title}
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 'warning':
            return (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0 p-1">
                    <Warning
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      {title}
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 'info':
            return (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0 p-1">
                    <Info
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">
                        {title}
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>{description}</p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm md:ml-6">
                      <a
                        href={url}
                        className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                      >
                        Details
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          case 'success':
            return (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0 p-1">
                    <Checkmark
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {title}
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{description}</p>
                    </div>
                  </div>
                  <div className="ml-auto pl-3">
                    <div className="mt-3 md:ml-6">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                      >
                        <span className="sr-only">Dismiss</span>
                        <X className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
};
