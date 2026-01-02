import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const UserSearchSelect = ({
  users,
  value,
  onChange,
  searchValue,
  onSearchChange,
  placeholder = "Assign user",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedUser = users.find((u) => u._id === value);

  return (
    <div ref={ref} className="relative w-full">
      {/* SELECT BOX */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          px-4 py-2.5 rounded-lg
          border border-gray-300
          bg-white text-gray-800
          focus:outline-none
          dark:bg-gray-700 dark:border-gray-600 dark:text-white
        "
      >
        <span className="truncate">
          {selectedUser
            ? `${selectedUser.name} (${selectedUser.email})`
            : placeholder}
        </span>
        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute z-20 mt-2 w-full rounded-lg
            border border-gray-200
            bg-white shadow-lg
            dark:bg-gray-800 dark:border-gray-700
          "
        >
          {/* SEARCH */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search user..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="
                w-full bg-transparent outline-none
                text-sm text-gray-800
                dark:text-white
              "
            />
          </div>

          {/* LIST */}
          <ul className="max-h-48 overflow-y-auto">
            {users.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">
                No users found
              </li>
            )}

            {users.map((u) => (
              <li
                key={u._id}
                onClick={() => {
                  onChange(u._id);
                  setOpen(false);
                }}
                className="
                  px-4 py-2 text-sm cursor-pointer
                  hover:bg-sky-100 dark:hover:bg-sky-700
                "
              >
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {u.email}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearchSelect;
