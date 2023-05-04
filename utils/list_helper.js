const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = blogs.reduce((prev, cur) => prev + cur.likes, 0);
  console.log("res", total);
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
