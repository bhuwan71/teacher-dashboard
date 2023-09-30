import { useState, useEffect } from "react";
import { Input } from "antd";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import api from "../api/axios";
import Link from "next/link";

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Use debounce to delay the search when typing
  const debouncedSearch = debounce(async (query) => {
    try {
      const results = await fetchDataFromApi(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }, 400); // Adjust the debounce delay as needed

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    // Trigger the debounced search
    debouncedSearch(newSearchQuery);
  };

  const fetchDataFromApi = async (query) => {
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await api.get(
        `stats/binarysearchforteacher?search=${query}`
      );
      if (response.status === 200) {
        const data = response.data; // Assuming the data is an array of items
        return data;
      } else {
        throw new Error("API request failed");
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      return [];
    }
  };

  return (
    <div>
      <Input
        placeholder="Search Students"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {searchResults?.length > 0 ? (
        <ul className="bg-white shadow-lg  px-5 z-20">
          {searchResults.map((item) => (
            <li className="py-4" key={item.id}>
              <Link
                href={`/studentProfile?id=${item.id}&firstName=${item.firstName}&lastName=${item.lastName}`}
              >
                {item.firstName} {item.lastName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 my-2 text-xl">No results found.</p>
      )}
    </div>
  );
}

export default SearchComponent;
