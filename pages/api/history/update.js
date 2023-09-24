import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    const body = req.body;

    // if (!body.historyArray) {
    //   res.send({ error: "No type or count adjustment" });
    //   throw new Error("No type or count adjustment");
    // }

    const colors = await db.collection("colors").find({}).toArray();

    // const colorsWithoutID = colors.map(color => { return {count:...color.count, ...color.name}});
    const history = await db
      .collection("history")
      .insertOne({ colors: [...colors] });

    console.log(body);

    res.send(JSON.stringify("History addition Success!"));
  } catch (e) {
    console.error(e);
  }
};
