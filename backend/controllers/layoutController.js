const Layout = require("../models/Layout");

exports.saveLayout = async (req, res) => {
  const { roomName, tables } = req.body;

  try {
    const layout = await Layout.findOneAndUpdate(
      { roomName },
      { tables, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Room layout saved successfully", layout });
  } catch (error) {
    console.error("Error saving layout:", error);
    res.status(500).json({ message: "Failed to save layout" });
  }
};

exports.getLayouts = async (req, res) => {
  try {
    const data = await Layout.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLayout = async (req, res) => {
  const { id } = req.params;

  try {
    const layout = await Layout.findById(id);

    if (layout) {
      res.status(200).json(layout);
    } else {
      res.status(404).json({ message: "Room layout not found" });
    }
  } catch (error) {
    console.error("Error fetching layout:", error);
    res.status(500).json({ message: "Failed to fetch layout" });
  }
};
