import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  const { name } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    console.log("received");
    const body = req.body;

    const color = await db.collection("colors").findOne({ name: `${name}` });

    console.log(color.count);
    if (
      color.count - body.adjustment >= 200 ||
      color.count + body.adjustment <= -200
    ) {
      const returnToZero = await db
        .collection("colors")
        .updateOne(
          { name: `${name}` },
          { $set: { count: 0 } },
          { returnDocument: "after" }
        );
    } else {
      const findAndUpdate = await db
        .collection("colors")
        .findOneAndUpdate(
          { name: `${name}` },
          { $inc: { count: parseInt(body.adjustment) } },
          { returnDocument: "after" }
        );
    }
    const colors = await db.collection("colors").find({}).toArray();
    res.send(JSON.stringify(colors));
  } catch (e) {
    console.error(e);
  }
};
