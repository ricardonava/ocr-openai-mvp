import ProgressBar from '@ramonak/react-progress-bar';
import CurpImg from '../mock/CURP1.png';
import { useEffect, useState } from 'react';
import Notification from '../components/Notification';

const AIScannerPage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          return 100;
        }

        return prev + 10;
      });
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="px-32">
      <div className="h-32">
        <Notification _show={progress === 100} />
      </div>
      <div className="h-[60vh] relative scanning text-green-200">
        <img src={CurpImg} className="object-contain w-full h-full" alt="" />
      </div>
      <ProgressBar
        completed={progress}
        className="mt-5"
        bgColor="rgb(187,247,208)"
        labelColor="rgb(0, 0, 0)"
        height="40px"
        labelClassName="font-bold"
        labelAlignment="center"
      />
    </div>
  );
};

export default AIScannerPage;
