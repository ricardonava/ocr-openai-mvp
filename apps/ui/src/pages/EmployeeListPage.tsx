import classNames from 'classnames';
import { employees } from '../mock/employees';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const statuses = {
  Completed: 'text-green-400 bg-green-400/10',
  Pending: 'text-yellow-400 bg-yellow-400/10',
};

export default function Example() {
  const navigate = useNavigate();
  const gotoUploadPage = (employeeId: number) =>
    navigate(`/employee/${employeeId}`);

  return (
    <div className="bg-gray-900 ">
      <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">
        Employees
      </h2>
      <table className="w-full mt-6 text-left whitespace-nowrap">
        <colgroup>
          <col className="w-full sm:w-4/12" />
          <col className="lg:w-4/12" />
          <col className="lg:w-2/12" />
          <col className="lg:w-1/12" />
          <col className="lg:w-1/12" />
        </colgroup>
        <thead className="text-sm leading-6 text-white border-b border-white/10">
          <tr>
            <th
              scope="col"
              className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
            >
              User
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell"
            >
              Company
            </th>
            <th
              scope="col"
              className="py-2 pl-0 pr-4 font-semibold text-right sm:pr-8 sm:text-left lg:pr-20"
            >
              Status
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
            >
              Email
            </th>
            <th
              scope="col"
              className="hidden py-2 pl-0 pr-4 font-semibold text-center sm:table-cell sm:pr-6 lg:pr-8"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {employees.map((item) => (
            <tr key={item.id}>
              <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                <div className="flex items-center gap-x-4">
                  <img
                    alt=""
                    src={item.user.imageUrl}
                    className="w-12 h-12 bg-gray-800 rounded-full"
                  />
                  <div className="text-sm font-medium leading-6 text-white truncate">
                    {item.user.name}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                <div className="flex gap-x-3">
                  <div className="text-sm leading-6 text-gray-400 ">
                    {item.company}
                  </div>
                </div>
              </td>
              <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                  <div
                    className={classNames(
                      statuses[item.status as keyof typeof statuses],
                      'flex-none rounded-full p-1'
                    )}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                  </div>
                  <div className="hidden text-white sm:block">
                    {item.status}
                  </div>
                </div>
              </td>
              <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                {item.email}
              </td>
              <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-center text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                {item.status === 'Completed' ? (
                  <div className="flex items-center font-bold">
                    <CheckCircleIcon
                      height={20}
                      fill="rgb(34,197,94)"
                      className="mr-1 text-black"
                    />
                    All set
                  </div>
                ) : (
                  <button
                    onClick={() => gotoUploadPage(item.id)}
                    type="button"
                    className={classNames(
                      `block px-3 py-2 text-xs font-semibold text-center text-white bg-indigo-500 rounded-md shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
                    )}
                  >
                    Add Information
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
