import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  const { name } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    const body = JSON.parse(req.body);

    // const num = parseInt();
    const color = await db
      .collection("colors")
      .findOneAndUpdate(
        { name: `${name}` },
        { $inc: { count: parseInt(body.count) } },
        { returnDocument: "after" }
      );
    // const count = color.value.count;

    const colors = await db.collection("colors").find({}).toArray();
    res.json(colors);
  } catch (e) {
    console.error(e);
  }
};
