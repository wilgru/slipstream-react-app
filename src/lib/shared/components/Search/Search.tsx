export const Search = () => {
  return (
    <form>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-stone-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-72 p-1 pl-10 text-sm text-stone-700 placeholder-stone-500 border border-stone-700 bg-stone-100"
          placeholder="Search slips, topics..."
          required
        />
      </div>
    </form>
  );
};

// https://flowbite.com/docs/forms/search-input/
