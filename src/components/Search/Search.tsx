import MagnifyingGlass from "src/models/icons/magnifyingGlass.svg?react";

export const Search = () => {
  return (
    <form>
      <div className="relative z-0">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlass className="w-4 h-4 text-black" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-72 p-1 pl-10 text-sm text-black placeholder-stone-500 border border-black rounded-full bg-white"
          placeholder="Search slips, journals..."
          required
        />
      </div>
    </form>
  );
};

// https://flowbite.com/docs/forms/search-input/
