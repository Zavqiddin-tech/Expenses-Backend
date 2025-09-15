const postModel = require("../model/post.model");
const fileService = require("./file.service");

class PostService {
  async getAll(req, res) {
    const limit = parseInt(req.query.limit);

    const allPosts = await postModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);
    return allPosts;
  }

  async create(req, res) {
    const fileName = fileService.save(req.files);
    const newPost = await postModel.create({
      ...req.body,
      picture: Array.isArray(fileName) ? fileName : [...fileName],
      user: req.user.id,
    });
    console.log(newPost);
    return newPost;
  }
}

module.exports = new PostService();
