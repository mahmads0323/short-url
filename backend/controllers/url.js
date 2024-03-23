const URL = require("../models/url");
const { nanoid } = require("nanoid");
const { IncrementClickCounter } = require("./urlStats");
const User = require("../models/user");

const nanoidLength = 8;

const handlePostPasswordandGetUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  if (!shortUrl) {
    return res.status(400).json({ error: "no specified shortUrl!" });
  }
  if (shortUrl.length != nanoidLength) {
    return res.status(404).json({ error: "incorrect shortUrl!" });
  }
  const url = await URL.findOne({ shortUrl: shortUrl });
  if (!url) {
    return res.status(404).json({ error: "incorrect shortUrl!" });
  }
  if (url.password != undefined) {
    if (req.body.password === undefined) {
      return res.status(400).json({ error: "password required" });
    }
    if (url.password !== req.body.password) {
      return res.status(400).json({ error: "incorrect password" });
    }
  }
  await URL.updateOne(
    { shortUrl: shortUrl },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  IncrementClickCounter();
  res.status(200).json({ targetUrl: url.targetUrl });
};

const handlePostUrl = async (req, res) => {
  const body = req.body;
  if (!body.targetUrl) {
    return res.status(400).json({
      error: "target url not provided",
    });
  }
  const shortUrl = nanoid(nanoidLength);
  const newUrl = await URL.create({
    shortUrl: shortUrl,
    targetUrl: body.targetUrl,
    password: body.password,
  });
  const url_id = newUrl._id;
  const _id = req.currentUser._id;
  await User.findByIdAndUpdate(_id, { $push: { creations: url_id } });
  return res.status(200).json({ shortUrl: shortUrl });
};

const handleDeleteUrl = async (req, res) => {
  try {
    const userId = req.currentUser._id;
    const _id = req.headers.idtodelete;
    const result = await URL.deleteOne({ _id: _id });
    try {
      const result = await User.findByIdAndUpdate(userId, {
        $pull: { creations: _id },
      });
    } catch (e) {}
    return res.json({ message: result?.deletedCount === 1 });
  } catch (error) {
    return res.status(401).json({ error: "no url found" });
  }
};

const handleSpecifiedNumberOfUrls = async (req, res) => {
  let data = [];
  const skipAmount = Number(req.headers.skip);
  const userId = req.currentUser._id;
  const user = await User.findById(userId);
  const userCreations = user.creations != null ? user.creations : null;
  const allUrls = await URL.find({ _id: { $in: userCreations } })
    .limit(10 + skipAmount)
    .sort({ $natural: -1 })
    .skip(skipAmount);

  allUrls.map((url) => {
    const date = new Date(url.createdAt);
    data.push({
      _id: url._id,
      originalUrl: url.targetUrl,
      created: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
      shortUrl: url.shortUrl,
      views: url.visitHistory.length,
    });
  });
  return res.json({ data: data });
};

module.exports = {
  handlePostUrl,
  handlePostPasswordandGetUrl,
  handleDeleteUrl,
  handleSpecifiedNumberOfUrls,
};
