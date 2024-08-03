import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const Details = () => {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails, handleAddToFavorite, favoriteList } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );

      const data = await res.json();
      if (data?.data) {
        setRecipeDetails(data?.data);
      }
    }
    getRecipeDetails();
  }, [id]);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white/75 p-6 rounded-b-lg shadow-md">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetails?.recipe?.image_url}
            alt="Recipe"
            className="w-full h-full object-cover group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetails?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetails?.recipe?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetails?.recipe)}
            className="text-sm p-3 mt-3 rounded-lg uppercase font-medium tracking-wider inline-block shadow-medium bg-black text-white"
          >  {
            favoriteList.findIndex(item => item.id === recipeDetails?.recipe?.id) !== -1 ? "Remove from Favorites" : "Add to Favorite" 
          }

          </button>
        </div>
        <div>
          <span className="text-xl text-gray-500 font-bold mt-3">
            Ingredients
          </span>
          <ul className="flex flex-col gap-3 mt-5">
            {recipeDetails?.recipe?.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="text-xl text-black font-semibold">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-xl text-black font-semibold">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;

