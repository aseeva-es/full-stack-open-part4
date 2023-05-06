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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
