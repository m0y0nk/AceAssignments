import React from "react";

export const SearchQueryContext = React.createContext();

export default function SearchQueryProvider({children}) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    const clearSearch = () => {
        setSearchQuery("");
    }

    return (
        <SearchQueryContext.Provider value={{ searchQuery, handleSearch, clearSearch }}>
            {children}
        </SearchQueryContext.Provider>
    );
}