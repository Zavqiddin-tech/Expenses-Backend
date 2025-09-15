const postService = require("../service/post.service");

class PostController {
  async getAll(req, res, next) {
    try {
      const allPosts = await postService.getAll(req, res);
      res.status(200).json(allPosts);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const newPost = await postService.create(req, res);
      res.status(200).json(newPost);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();