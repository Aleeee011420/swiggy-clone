import { RestaurantCard } from "./RestaurantCard";
import React, { useEffect, useState } from "react"; 
//import Shimmer from "./Shimmer"; 
import { FOOD_API } from "../constants/Constants";
import {Link } from "react-router-dom";

import {useOnline} from "../constants/useOnline";

function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch(FOOD_API);
      const json = await response.json();

      function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      const resData = checkJsonData(json);

      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage("No matches restaurant found");
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  if (!allRestaurants) return null;

  const isOnline=useOnline();
  if(!isOnline){
    return(
      <h2>oops!,you are offline, check your connection</h2>
    )
  }

  return (
    <>
      <div className="p-4 bg-gray-100 mt-16">
        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search a restaurant you want..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => searchData(searchText, allRestaurants)}
          >
            Search
          </button>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {allRestaurants?.length === 0 ? (
          <h1 className="text-center text-xl text-gray-500">Restaurants loading...</h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) =>{
              return (
             <Link
              to={"/restaurant/" + restaurant?.info?.id}
                key={restaurant?.info?.id}
                className="border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white"
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            )})}
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
