exports.createPost = async (req, res) => {
  const imagePath = "/uploads/" + req.file.filename;

  await Post.create({
    userId: req.user.id, // assuming auth
    image: imagePath,
  });

  res.json({ success: true, image: imagePath });
};