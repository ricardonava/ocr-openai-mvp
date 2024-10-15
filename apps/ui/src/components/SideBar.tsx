import React from 'react';
import { BoltIcon, FireIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Logo from './Logo';

const navigation = [
  { name: 'Onboarding', href: '#', icon: BoltIcon, current: true },
  { name: 'Offboarding', href: '#', icon: FireIcon, current: false },
];

const teams = [
  { id: 1, name: 'INTL', href: '#', initial: 'I', current: false },
  { id: 2, name: 'Ops', href: '#', initial: 'O', current: false },
];

const SideBar = () => {
  return (
    <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div className="flex flex-col px-6 overflow-y-auto grow gap-y-5 bg-black/10 ring-1 ring-white/5">
        <div className="flex items-center h-16 shrink-0">
          <Logo />
        </div>
        <nav className="flex flex-col flex-1">
          <ul className="flex flex-col flex-1 gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="w-6 h-6 shrink-0"
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Your teams
              </div>
              <ul className="mt-2 -mx-2 space-y-1">
                {teams.map((team) => (
                  <li key={team.name}>
                    <a
                      href={team.href}
                      className={classNames(
                        team.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                        {team.initial}
                      </span>
                      <span className="truncate">{team.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto -mx-6">
              <div className="flex items-center px-6 py-3 text-sm font-semibold text-white gap-x-4 hover:bg-gray-800">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="w-8 h-8 bg-gray-800 rounded-full"
                />
                <div className="flex flex-col">
                  <span aria-hidden="true">Tom Cook</span>
                  <span aria-hidden="true" className="font-light">
                    CSM
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
