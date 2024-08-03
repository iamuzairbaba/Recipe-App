import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import RecipeItem from '../../components/recipeItem/RecipeItem';

const Favorites = () => {
  const { favoriteList } = useContext(GlobalContext);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 bg-white/75 p-6 rounded-b-lg shadow-md">
      {favoriteList && favoriteList.length > 0 ? (
        favoriteList.map((item) => <RecipeItem key={item.title} item={item} />)
      ) : (
        <div className="text-center lg:text-4xl text-xl text-gray-500 font-bold">
          No Item Added To Favorites
        </div>
      )}
    </div>
  );
}

export default Favorites

