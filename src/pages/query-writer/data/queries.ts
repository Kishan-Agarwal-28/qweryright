export type QueryType = "sql" | "mongodb";
export type Difficulty = "basic" | "intermediate" | "advanced";

export interface Query {
  id: string;
  text: string;
  type: QueryType;
  difficulty: Difficulty;
  charCount: number;
}

export const sqlQueries: Query[] = [
  // Basic SQL - Short
  {
    id: "sql-1",
    text: `SELECT * FROM users;`,
    type: "sql",
    difficulty: "basic",
    charCount: 20,
  },
  {
    id: "sql-2",
    text: `SELECT name, email
FROM customers
WHERE active = true;`,
    type: "sql",
    difficulty: "basic",
    charCount: 52,
  },
  {
    id: "sql-3",
    text: `INSERT INTO products (name, price)
VALUES ('Widget', 29.99);`,
    type: "sql",
    difficulty: "basic",
    charCount: 60,
  },
  {
    id: "sql-4",
    text: `UPDATE orders
SET status = 'shipped'
WHERE id = 1234;`,
    type: "sql",
    difficulty: "basic",
    charCount: 53,
  },
  {
    id: "sql-5",
    text: `DELETE FROM sessions
WHERE expires_at < NOW();`,
    type: "sql",
    difficulty: "basic",
    charCount: 45,
  },
  {
    id: "sql-6",
    text: `SELECT id, name, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;`,
    type: "sql",
    difficulty: "basic",
    charCount: 70,
  },

  // Intermediate SQL
  {
    id: "sql-7",
    text: `SELECT
  u.name,
  COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;`,
    type: "sql",
    difficulty: "intermediate",
    charCount: 110,
  },
  {
    id: "sql-8",
    text: `SELECT *
FROM products
WHERE price BETWEEN 10 AND 100
ORDER BY created_at DESC
LIMIT 20;`,
    type: "sql",
    difficulty: "intermediate",
    charCount: 95,
  },
  {
    id: "sql-9",
    text: `SELECT
  category,
  AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 50;`,
    type: "sql",
    difficulty: "intermediate",
    charCount: 100,
  },
  {
    id: "sql-10",
    text: `SELECT *
FROM employees
WHERE department_id IN (
  SELECT id
  FROM departments
  WHERE name = 'Engineering'
);`,
    type: "sql",
    difficulty: "intermediate",
    charCount: 115,
  },
  {
    id: "sql-11",
    text: `SELECT DISTINCT customer_id
FROM orders
WHERE order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY);`,
    type: "sql",
    difficulty: "intermediate",
    charCount: 85,
  },

  // Advanced SQL
  {
    id: "sql-12",
    text: `CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE KEY,
  startDate DATE NOT NULL,
  INDEX startDateIdx (startDate)
);`,
    type: "sql",
    difficulty: "advanced",
    charCount: 160,
  },
  {
    id: "sql-13",
    text: `WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue
  FROM orders
  GROUP BY 1
)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month
FROM monthly_sales;`,
    type: "sql",
    difficulty: "advanced",
    charCount: 220,
  },
  {
    id: "sql-14",
    text: `SELECT
  id,
  name,
  salary,
  RANK() OVER (
    PARTITION BY department_id
    ORDER BY salary DESC
  ) AS salary_rank
FROM employees;`,
    type: "sql",
    difficulty: "advanced",
    charCount: 145,
  },
  {
    id: "sql-15",
    text: `SELECT
  p.name,
  COALESCE(SUM(oi.quantity), 0) AS total_sold
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY total_sold DESC;`,
    type: "sql",
    difficulty: "advanced",
    charCount: 170,
  },
  {
    id: "sql-16",
    text: `CREATE INDEX CONCURRENTLY idx_orders_user_date
ON orders (user_id, order_date DESC)
WHERE status = 'completed';`,
    type: "sql",
    difficulty: "advanced",
    charCount: 120,
  },
];

export const mongodbQueries: Query[] = [
  // Basic MongoDB
  {
    id: "mongo-1",
    text: `db.users.find({})`,
    type: "mongodb",
    difficulty: "basic",
    charCount: 17,
  },
  {
    id: "mongo-2",
    text: `db.products.find({
  price: { $gte: 100 }
})`,
    type: "mongodb",
    difficulty: "basic",
    charCount: 45,
  },
  {
    id: "mongo-3",
    text: `db.orders.insertOne({
  item: "widget",
  qty: 5,
  status: "pending"
})`,
    type: "mongodb",
    difficulty: "basic",
    charCount: 70,
  },
  {
    id: "mongo-4",
    text: `db.users.updateOne(
  { _id: ObjectId("abc123") },
  { $set: { active: true } }
)`,
    type: "mongodb",
    difficulty: "basic",
    charCount: 80,
  },
  {
    id: "mongo-5",
    text: `db.sessions.deleteMany({
  expiresAt: { $lt: new Date() }
})`,
    type: "mongodb",
    difficulty: "basic",
    charCount: 60,
  },
  {
    id: "mongo-6",
    text: `db.products.find({
  tags: { $in: ["electronics", "gadgets"] }
}).sort({ price: -1 })`,
    type: "mongodb",
    difficulty: "basic",
    charCount: 85,
  },

  // Intermediate MongoDB
  {
    id: "mongo-7",
    text: `db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
    _id: "$userId",
    total: { $sum: "$amount" }
  }}
])`,
    type: "mongodb",
    difficulty: "intermediate",
    charCount: 130,
  },
  {
    id: "mongo-8",
    text: `db.users.aggregate([
  { $lookup: {
    from: "orders",
    localField: "_id",
    foreignField: "userId",
    as: "orders"
  }}
])`,
    type: "mongodb",
    difficulty: "intermediate",
    charCount: 130,
  },
  {
    id: "mongo-9",
    text: `db.posts.updateMany(
  { views: { $gt: 1000 } },
  {
    $set: { popular: true },
    $inc: { score: 10 }
  }
)`,
    type: "mongodb",
    difficulty: "intermediate",
    charCount: 105,
  },
  {
    id: "mongo-10",
    text: `db.analytics.aggregate([
  { $unwind: "$events" },
  { $group: {
    _id: "$events.type",
    count: { $sum: 1 }
  }}
])`,
    type: "mongodb",
    difficulty: "intermediate",
    charCount: 115,
  },

  // Advanced MongoDB
  {
    id: "mongo-11",
    text: `db.orders.aggregate([
  { $match: {
    date: { $gte: ISODate("2024-01-01") }
  }},
  { $group: {
    _id: {
      $dateToString: {
        format: "%Y-%m",
        date: "$date"
      }
    },
    revenue: { $sum: "$total" },
    count: { $sum: 1 }
  }},
  { $sort: { _id: 1 } }
])`,
    type: "mongodb",
    difficulty: "advanced",
    charCount: 270,
  },
  {
    id: "mongo-12",
    text: `db.products.aggregate([
  { $bucket: {
    groupBy: "$price",
    boundaries: [0, 50, 100, 200, 500],
    default: "expensive",
    output: {
      count: { $sum: 1 },
      avgRating: { $avg: "$rating" }
    }
  }}
])`,
    type: "mongodb",
    difficulty: "advanced",
    charCount: 200,
  },
  {
    id: "mongo-13",
    text: `db.users.aggregate([
  { $graphLookup: {
    from: "users",
    startWith: "$managerId",
    connectFromField: "managerId",
    connectToField: "_id",
    as: "reportingHierarchy"
  }}
])`,
    type: "mongodb",
    difficulty: "advanced",
    charCount: 190,
  },
  {
    id: "mongo-14",
    text: `db.inventory.aggregate([
  { $facet: {
    byCategory: [
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ],
    lowStock: [
      { $match: { qty: { $lt: 10 } } },
      { $count: "total" }
    ]
  }}
])`,
    type: "mongodb",
    difficulty: "advanced",
    charCount: 210,
  },
];

// Calculate char counts
sqlQueries.forEach((q) => (q.charCount = q.text.length));
mongodbQueries.forEach((q) => (q.charCount = q.text.length));

export const getAllQueries = (): Query[] => [...sqlQueries, ...mongodbQueries];

export const getQueriesByType = (type: QueryType): Query[] =>
  type === "sql" ? sqlQueries : mongodbQueries;

export const getQueriesByDifficulty = (
  type: QueryType,
  difficulty: Difficulty
): Query[] => getQueriesByType(type).filter((q) => q.difficulty === difficulty);

// Target characters per timer duration (approximate WPM of 40 = 200 chars/min)
const getTargetChars = (timerDuration: number): number => {
  const charsPerSecond = 3.5; // ~42 WPM
  return Math.floor(timerDuration * charsPerSecond);
};

export const getQueriesForTimer = (
  type: QueryType,
  timerDuration: number,
  difficulty?: Difficulty
): Query[] => {
  const targetChars = getTargetChars(timerDuration);
  const source = difficulty
    ? getQueriesByDifficulty(type, difficulty)
    : getQueriesByType(type);

  const shuffled = [...source].sort(() => Math.random() - 0.5);
  const selected: Query[] = [];
  let totalChars = 0;

  for (const query of shuffled) {
    if (totalChars + query.charCount <= targetChars * 1.2) {
      selected.push(query);
      totalChars += query.charCount;
      if (totalChars >= targetChars * 0.8) break;
    }
  }

  // Ensure at least one query
  if (selected.length === 0 && shuffled.length > 0) {
    selected.push(shuffled[0]);
  }

  return selected;
};
