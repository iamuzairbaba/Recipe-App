import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import RecipeItem from "../../components/recipeItem/RecipeItem";

const Home = () => {
  const { recipeList, loading } = useContext(GlobalContext);

  if (loading) {
    return (
      <div className="py-8 container mx-auto flex justify-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 bg-white/75 p-6 rounded-lg shadow-md">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.title} item={item} />)
      ) : (
        <div className="text-center lg:text-4xl text-xl text-gray-500 font-bold">
          Search for a recipe
        </div>
      )}
    </div>
  );
};

export default Home;
