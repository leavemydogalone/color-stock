import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  const { name } = req.query;
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    const body = req.body;

    const color = await db.collection("colors").findOne({ name: `${name}` });

    console.log(body);

    if (!body.type || !body.adjustment) {
      res.send({ error: "No type or count adjustment" });
      throw new Error("No type or count adjustment");
    }

    switch (body.type) {
      case "sell":
        if (color.count - body.adjustment >= 100) {
          const setMax = await db
            .collection("colors")
            .updateOne(
              { name: `${name}` },
              { $set: { count: 100 } },
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
        break;
      case "buy":
        if (color.count - body.adjustment <= -100) {
          const setMin = await db
            .collection("colors")
            .updateOne(
              { name: `${name}` },
              { $set: { count: -100 } },
              { returnDocument: "after" }
            );
        } else {
          const findAndUpdate = await db
            .collection("colors")
            .findOneAndUpdate(
              { name: `${name}` },
              { $inc: { count: -parseInt(body.adjustment) } },
              { returnDocument: "after" }
            );
        }
        break;
      default:
        throw new Error("no type selected");
        break;
    }
    // if (
    //   color.count - body.adjustment >= 200 ||
    //   color.count + body.adjustment <= -200
    // ) {
    //   const setMax = await db
    //     .collection("colors")
    //     .updateOne(
    //       { name: `${name}` },
    //       { $set: { count: 0 } },
    //       { returnDocument: "after" }
    //     );
    // } else {
    //   const findAndUpdate = await db
    //     .collection("colors")
    //     .findOneAndUpdate(
    //       { name: `${name}` },
    //       { $inc: { count: parseInt(body.adjustment) } },
    //       { returnDocument: "after" }
    //     );
    // }
    const colors = await db.collection("colors").find({}).toArray();
    res.send(JSON.stringify(colors));
  } catch (e) {
    console.error(e);
  }
};
