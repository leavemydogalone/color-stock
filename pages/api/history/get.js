import clientPromise from "/lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    const body = req.body;

    const history = await db
      .collection("history")
      .find({})
      .sort({ _id: -1 })
      .limit(5)
      .toArray();

    console.log(body);

    res.send(JSON.stringify(history));
  } catch (e) {
    console.error(e);
  }
};
