import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API, RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY, IMG_CDN_URL, ITEM_IMG_CDN_URL } from "../constants/Constants";
console.log("in restaurnat menu page");
export const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(MENU_API + resId);
      const json = await response.json();
      

      // Extract restaurant data
      const restaurantData = json?.data?.cards
        ?.map((x) => x.card)
        ?.find((x) => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      setRestaurant(restaurantData);

      // Extract menu items
      const menuItemsData = json?.data?.cards
        ?.find((x) => x.groupedCard)
        ?.groupedCard?.cardGroupMap?.REGULAR?.cards
        ?.map((x) => x.card?.card)
        ?.filter((x) => x['@type'] === MENU_ITEM_TYPE_KEY)
        ?.map((x) => x.itemCards)
        ?.flat()
        ?.map((x) => x.card?.info) || [];

      // Remove duplicate items
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });

      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.error("Error fetching restaurant info:", error);
    }
  }

  return !restaurant ? (
    <h2 className="text-2xl font-semibold text-center my-10">Menu is loading...</h2>
  ) : (
    <div className="container mx-auto p-4">
      {/* Restaurant Info Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">
        <img
          src={`${IMG_CDN_URL}${restaurant?.cloudinaryImageId}`}
          alt={restaurant?.name}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex flex-col items-start">
          <h2 className="text-3xl font-bold text-gray-800">{restaurant?.name}</h2>
          <p className="text-lg text-gray-600">{restaurant?.cuisines?.join(", ")}</p>
          <div className="flex items-center gap-4 mt-4">
            <div
              className={`px-4 py-2 rounded-lg ${
                restaurant?.avgRating < 4
                  ? "bg-red-100 text-red-600"
                  : restaurant?.avgRating === "--"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-500 text-white"
              }`}
            >
              <span className="text-lg font-semibold">{restaurant?.avgRating}</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-700">{restaurant?.sla?.slaString}</div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-700">{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>
  
      {/* Menu Items Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Recommended</h3>
          <p className="text-gray-600">{menuItems.length} ITEMS</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item?.id}
              className="flex flex-col items-start bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-800">{item?.name}</h3>
              <p className="text-gray-600">
                {item?.price > 0
                  ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(item?.price / 100)
                  : " "}
              </p>
              <p className="text-sm text-gray-500 mt-2">{item?.description}</p>
              {item?.imageId && (
                <img
                  src={`${ITEM_IMG_CDN_URL}${item?.imageId}`}
                  alt={item?.name}
                  className="w-full h-32 object-cover rounded-lg mt-4"
                />
              )}
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                ADD +
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  