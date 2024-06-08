const User = require('../models/User');

// Update user profile (excluding profile photo)
const updateUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
  }

  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { companyName, bio, credits, fullname, following, followers } = req.body;

    // Update user fields if provided in the request body
    if (companyName !== undefined) {
      user.companyName = companyName;
    }
    if (bio !== undefined) {
      user.bio = bio;
    }
    if (credits !== undefined) {
      user.credits = credits;
    }
    if (fullname !== undefined) {
      user.fullname = fullname;
    }
    if (following !== undefined) {
      user.following = following;
    }
    if (followers !== undefined) {
      user.followers = followers;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      username: updatedUser.username,
      email: updatedUser.email,
      category: updatedUser.category,
      companyName: updatedUser.companyName,
      bio: updatedUser.bio,
      profilePhoto: updatedUser.profilePhoto,
      credits: updatedUser.credits,
      followers: updatedUser.followers,
      following: updatedUser.following,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile photo
const updateUserProfilePhoto = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { profilePhoto } = req.body;

    if (profilePhoto !== undefined) {
      user.profilePhoto = profilePhoto;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      profilePhoto: updatedUser.profilePhoto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateUserProfile, updateUserProfilePhoto };