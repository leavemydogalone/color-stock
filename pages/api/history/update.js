import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    const adjustment = (number) => {
      const adjust = Math.floor(Math.random() * 40);
      const finalAdjuster = Math.random() < 0.5 ? adjust : -adjust;

      const output =
        number > 0
          ? Math.min(number + finalAdjuster, 100)
          : Math.max(number + finalAdjuster, -100);
      return output;
    };

    const colors = await db.collection("colors").find({}).toArray();
    // const oneColor = await db
    //   .collection("colors")
    //   .find({})
    //   .sort({ _id: -1 })
    //   .limit(1);

    // console.log(oneColor);

    const update = await colors.forEach((color) => {
      const findAndUpdate = db
        .collection("colors")
        .findOneAndUpdate(
          { name: `${color.name}` },
          { $set: { count: adjustment(color.count) } },
          { returnDocument: "after" }
        );
    });

    const history = await db
      .collection("history")
      .insertOne({ colors: [...colors] });

    res.send(JSON.stringify("History addition Success!"));
  } catch (e) {
    console.error(e);
  }
};
