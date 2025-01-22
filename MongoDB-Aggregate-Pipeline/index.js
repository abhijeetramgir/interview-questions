db.sales.aggregate([
  {
    $unwind: "$items", // Unwind the items array to process each item individually
  },
  {
    $addFields: {
      month: {
        $dateToString: { format: "%Y-%m", date: "$date" }, // Extract the month from the date field
      },
    },
  },
  {
    $group: {
      _id: { store: "$store", month: "$month" }, // Group by store and month
      totalRevenue: {
        $sum: { $multiply: ["$items.quantity", "$items.price"] },
      }, // Calculate total revenue
      totalQuantity: { $sum: "$items.quantity" }, // Sum up the quantities
      totalPrice: { $sum: "$items.price" }, // Sum up the prices
    },
  },
  {
    $addFields: {
      averagePrice: { $divide: ["$totalPrice", "$totalQuantity"] }, // Calculate the average price
    },
  },
  {
    $project: {
      store: "$_id.store", // Include the store in the output
      month: "$_id.month", // Include the month in the output
      totalRevenue: 1,
      averagePrice: 1,
      _id: 0, // Exclude the _id field
    },
  },
  {
    $sort: { store: 1, month: 1 }, // Sort by store and month in ascending order
  },
]);
