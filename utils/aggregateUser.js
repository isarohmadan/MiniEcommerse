const dbConnect = require('./../config/dbConnect') 

async function getUsersCount(prodId) {
  try {
    const db = await dbConnect();
    const usersCollection = db.collection('users');

    const result = await usersCollection.aggregate([{$match: { wishlist:prodId }}]).toArray();

    return result;
  } catch (err) {
    console.error('Error while getting user', err);
    throw err;
  }
}

module.exports = {
  getUsersCount,
};