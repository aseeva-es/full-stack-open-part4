var _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = blogs.reduce((prev, cur) => prev + cur.likes, 0);
  console.log("res", total);
  return total;
};

const favoriteBlog = (blogs) => {
let favorite = blogs.sort((a, b) => b.likes - a.likes)
return favorite[0];
}

const getBestAuthor = (obj) => {
  let bestInd;
  let bestCount = 0;
  let authors = Object.keys(obj);
  let blogs = Object.values(obj);
  for (i = 0; i < blogs.length; i++) {
    if (blogs[i] > bestCount) {
      bestCount = blogs[i];
      bestInd = i;
    }
  }

  return {
    author: authors[bestInd],
    blogs: bestCount,
  };
}

const mostBlogs = (blogs) => {
  var result = _.countBy(blogs, (blog) => blog.author);
  console.log(result);
  return getBestAuthor(result);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
