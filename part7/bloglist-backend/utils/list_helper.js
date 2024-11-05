const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(function (acc, blog) {
    return acc + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const authorCounts = _.countBy(blogs.flatMap((blog) => blog.author));

  const author = _.maxBy(_.keys(authorCounts), function (o) {
    return authorCounts[o];
  });

  return {
    author: author,
    blogs: authorCounts[author],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const totalLikes = _(blogs)
    .groupBy("author")
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, "likes"),
    }))
    .value();

  return _.maxBy(totalLikes, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
