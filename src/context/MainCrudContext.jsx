import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const MainCrudContext = createContext();

export const MainCrudContextProvider = ({ children }) => {
  const LOCAL_STORAGE_KEY_FAVLIST = "favList";
  const LOCAL_STORAGE_KEY_LOGINUSER = "loggedInUser";
  const [favList, setFavList] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FAVLIST)) ?? []
  );
  const [searchList, setSearchList] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [registeredUserList, setRegisteredUserList] = useState([
    { id: 50, name: "John Doe", username: "johndoe", password: "123" },
  ]);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LOGINUSER)) ?? {}
  );
  const [loadPage, setLoadPage] = useState(1);

  // API Key:
  // b420fc32da1e49cea29b5a7c0df7c5ad
  // must have q, sortBy, searchIn, pageSize, page, and language
  // const newsapi = new NewsAPI("b420fc32da1e49cea29b5a7c0df7c5ad");
  const searchResults = async (searchTerm, loadMore) => {
    if (searchTerm === "") {
      setSearchList([]);
    } else if (loadMore) {
      console.log(loadPage);
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=b420fc32da1e49cea29b5a7c0df7c5ad&sortBy=publishedAt&q=${searchTerm}&searchIn=title&pageSize=${
          loadPage === 4 ? 10 : 30
        }&page=${loadPage}&language=en`
      );
      let setNewArticles = [...searchList];
      for (let i = 0; i < response.data.articles.length; i++) {
        setNewArticles.push({ ...response.data.articles[i], id: i });
      }
      console.log(setNewArticles);
      setSearchList(setNewArticles);
      setLoadPage(() => loadPage + 1);
    } else {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=b420fc32da1e49cea29b5a7c0df7c5ad&sortBy=publishedAt&q=${searchTerm}&searchIn=title&pageSize=30&page=${1}&language=en`
      );
      // console.log(response.data.articles);
      let setNewArticles = [];
      for (let i = 0; i < response.data.articles.length; i++) {
        setNewArticles.push({ ...response.data.articles[i], id: i });
      }
      console.log(setNewArticles);
      setSearchList(setNewArticles);
      setLoadPage(() => 2);
    }
    // newsapi.v2
    //   .everything({
    //     q: searchTerm,
    //     sortBy: "publishedAt",
    //     searchIn: "title",
    //     pageSize: 100,
    //     page: 1,
    //     language: "en",
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  const insertFavArticle = (article) => {
    const defExistingArticle = favList.filter((fav) => {
      if (fav.description === article.description) {
        return fav;
      }
    });

    if (defExistingArticle[0]) {
      const newArticleList = favList.filter((fav) => {
        if (fav.description !== article.description) {
          return fav;
        }
      });
      setFavList(newArticleList);
    } else {
      setFavList((currList) => [...currList, article]);
    }
    // console.log(favList);
  };

  const removeFavHandler = (favArticle) => {
    const newFavList = favList.filter((fav) => {
      if (fav.description !== favArticle.description) {
        return fav;
      }
    });

    setFavList(newFavList);
  };

  const authenticationHandler = async (authName, authPassword) => {
    const filteredUserList = registeredUserList.filter((list) => {
      return (
        list.username.includes(authName) && list.password.includes(authPassword)
      );
    });
    console.log(filteredUserList);

    if (filteredUserList.length) {
      setLoggedInUser(filteredUserList[0]);
      return filteredUserList[0];
    }
    return filteredUserList[0];
  };

  const handleSetKeyWord = (value) => {
    setKeyWord(value);
  };

  const logOutHandler = () => {
    setLoggedInUser({});
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVLIST, JSON.stringify(favList));
    localStorage.setItem(
      LOCAL_STORAGE_KEY_LOGINUSER,
      JSON.stringify(loggedInUser)
    );
  }, [favList, loggedInUser]);

  const value = {
    loggedInUser,
    setLoggedInUser,
    registeredUserList,
    authenticationHandler,
    handleSetKeyWord,
    setKeyWord,
    keyWord,
    favList,
    setFavList,
    searchResults,
    searchList,
    insertFavArticle,
    logOutHandler,
    removeFavHandler,
  };

  return (
    <MainCrudContext.Provider value={value}>
      {children}
    </MainCrudContext.Provider>
  );
};

export const useMainCrud = () => {
  return useContext(MainCrudContext);
};

MainCrudContextProvider.propTypes = {
  children: PropTypes.any,
};
