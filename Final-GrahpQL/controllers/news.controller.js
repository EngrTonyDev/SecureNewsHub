import { newsModel } from "../models/news.model.js";


export const filterNewsByUserId = async function (userId) {
  try {


    const news = await newsModel.find().populate('user').populate('category').populate('tags');
    const filteredNews = news.filter(item => item.user._id === userId);



    if (filteredNews) {

      return filteredNews;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving news: ', error);
    return null;
  }
}

export const getNews = async function (userId, search, categoryId, tags) {
  console.log("userId");
  console.log(userId);
  try {

    const news = await newsModel.find().populate('user').populate('category').populate('tags');
    const filteredNews = news.filter(item => {
      const titleMatch = !search || (item.title && item.title.toLowerCase().includes(search.toLowerCase()));
      const descMatch = !search || (item.description && item.description.toLowerCase().includes(search.toLowerCase()));

      return item.user._id === userId && (!categoryId || item.category._id === categoryId) && (titleMatch || descMatch);

    });
    if (filteredNews) {
      console.log("filteredNews");
      console.log(filteredNews);
      return filteredNews;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error retrieving news: ', error);
    return null;
  }
};