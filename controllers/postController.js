const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  const { image, location, caption, postType } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profilePhoto = user.profilePhoto;

    const post = await Post.create({ image, location, caption, postType, username, profilePhoto });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validatePost = async (req, res) => {
  const { postId, validateUsername } = req.body;
  try {
    const post = await Post.findById(postId);
    if (post) {
      post.validated = true;
      post.validateUsername = validateUsername;
      post.credits = 2;
      await post.save();

      const postUser = await User.findOne({ username: post.username });
      const validateUser = await User.findOne({ username: validateUsername });

      if (postUser && validateUser) {
        postUser.credits += 2;
        validateUser.credits += 2;

        await postUser.save();
        await validateUser.save();
      }

      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostsByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    console.log(`Searching posts for username: ${username}`); // Log the username being searched
    const posts = await Post.find({ username });

    if (posts.length > 0) {
      console.log(`Found posts: ${JSON.stringify(posts)}`); // Log the found posts
      res.json(posts);
    } else {
      console.log('No posts found for this username');
      res.status(404).json({ message: 'No posts found for this username' });
    }
  } catch (error) {
    console.error(`Error fetching posts: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, validatePost, getPosts, getPostsByUsername };
