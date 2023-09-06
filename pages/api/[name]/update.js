import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  const { name } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    // const num = parseInt();
    const color = await db
      .collection("colors")
      .findOneAndUpdate(
        { name: `${name}` },
        { $inc: { count: parseInt(req.body.number) } },
        { returnDocument: "after" }
      );
    const count = color.value.count;
    res.json({ count });
  } catch (e) {
    console.error(e);
  }
};
