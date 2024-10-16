import ProgressBar from '@ramonak/react-progress-bar';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

type Props = {
  start: boolean;
  isSuccess: boolean;
};

export default function Progress({ start = true, isSuccess }: Props) {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setCompleted((prev) => prev + 2);
    }, 100);

    if (isSuccess) {
      setCompleted(100);
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, completed, isSuccess]);

  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <div aria-hidden="true" className="mt-6">
        <ProgressBar
          completed={completed}
          isLabelVisible={false}
          bgColor="rgb(79,70,229)"
          height="8px"
          baseBgColor="#27324a"
        />
        <div className="hidden grid-cols-4 mt-6 text-sm font-medium text-gray-600 sm:grid">
          <div className={classNames(completed >= 25 && 'text-white')}>
            Uploading files
          </div>
          <div
            className={classNames(
              'text-center',
              completed >= 80 && 'text-white'
            )}
          >
            Scanning the Image
          </div>
          <div
            className={classNames(
              'text-center',
              completed >= 90 && 'text-white'
            )}
          >
            Doing some AI Magic
          </div>
          <div
            className={classNames(
              'text-right',
              completed >= 100 && 'text-white'
            )}
          >
            Done
          </div>
        </div>
      </div>
    </div>
  );
}
