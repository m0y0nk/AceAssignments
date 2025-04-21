import React, { useState } from "react";
import { SearchQueryContext } from "../../context/SearchQuery";

export default function SearchBar() {
    const { searchQuery, handleSearch, clearSearch } = React.useContext(SearchQueryContext);

    return (
        <div className="flex items-center justify-center">
            <input
                type="text"
                value={searchQuery}
                onChange={(e)=>handleSearch(e.target.value)}
                placeholder="Search Problem..."
                className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}