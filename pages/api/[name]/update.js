import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  const { name } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    console.log("received");
    const body = req.body;

    const color = await db
      .collection("colors")
      .findOneAndUpdate(
        { name: `${name}` },
        { $inc: { count: parseInt(body.adjustment) } },
        { returnDocument: "after" }
      );

    const colors = await db.collection("colors").find({}).toArray();
    res.send(JSON.stringify(colors));
  } catch (e) {
    console.error(e);
  }
};
