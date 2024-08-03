import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favoriteList, setFavoritesList] = useState([]);

  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSearchParam("");
    }
  }

  const handleAddToFavorite = (currentitem) => {
    console.log(currentitem)
    let cpyFavorite = [...favoriteList]
    const index = cpyFavorite.findIndex(item => item.id === currentitem.id)
    if(index === -1){
      cpyFavorite.push(currentitem)
    } else {
      cpyFavorite.splice(index)
    }
    setFavoritesList(cpyFavorite)
  }
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        handleAddToFavorite,
        favoriteList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
