import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("colors");

    const colors = await db.collection("colors").find({}).toArray();

    res.json(colors);
  } catch (e) {
    console.error(e);
  }
};
