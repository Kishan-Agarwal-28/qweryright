export interface LessonItem {
  id: string;
  title: string;
  file: string;
  slug: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  lessons: LessonItem[];
}

export interface CourseStructure {
  [key: string]: ModuleItem[];
}

// Helper function to find lesson by slug
export function findLessonBySlug(courseType: string, slug: string): { lesson: LessonItem; module: ModuleItem } | null {
  const structure = courseStructure[courseType];
  if (!structure) return null;
  
  for (const module of structure) {
    const lesson = module.lessons.find(l => l.slug === slug);
    if (lesson) {
      return { lesson, module };
    }
  }
  return null;
}

// Helper function to get the next/previous lesson
export function getAdjacentLesson(courseType: string, currentSlug: string, direction: 'next' | 'prev'): LessonItem | null {
  const structure = courseStructure[courseType];
  if (!structure) return null;
  
  const allLessons: LessonItem[] = [];
  structure.forEach(module => {
    allLessons.push(...module.lessons);
  });
  
  const currentIndex = allLessons.findIndex(l => l.slug === currentSlug);
  if (currentIndex === -1) return null;
  
  const adjacentIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
  return allLessons[adjacentIndex] || null;
}

export const courseStructure: CourseStructure = {
  sql: [
  {
    id: 'module_1',
    title: 'Module 1: SQL Foundations',
    lessons: [
      { id: 'mod_1_1', title: 'Introduction to Databases', file: 'module_1/mod_1_1.mdx', slug: 'introduction-to-databases' },
      { id: 'mod_1_2', title: 'Basic SELECT Queries', file: 'module_1/mod_1_2.mdx', slug: 'basic-select-queries' },
      { id: 'mod_1_3', title: 'Filtering with WHERE', file: 'module_1/mod_1_3.mdx', slug: 'filtering-with-where' },
      { id: 'mod_1_4', title: 'Sorting and Limiting', file: 'module_1/mod_1_4.mdx', slug: 'sorting-and-limiting' },
      { id: 'mod_1_5', title: 'Aggregate Functions', file: 'module_1/mod_1_5.mdx', slug: 'aggregate-functions' },
      { id: 'mod_1_6', title: 'GROUP BY and HAVING', file: 'module_1/mod_1_6.mdx', slug: 'group-by-and-having' },
    ],
  },
  {
    id: 'module_2',
    title: 'Module 2: Data Manipulation',
    lessons: [
      { id: 'mod_2_1', title: 'INSERT Statements', file: 'module_2/mod_2_1.mdx', slug: 'insert-statements' },
      { id: 'mod_2_2', title: 'UPDATE Statements', file: 'module_2/mod_2_2.mdx', slug: 'update-statements' },
      { id: 'mod_2_3', title: 'DELETE Statements', file: 'module_2/mod_2_3.mdx', slug: 'delete-statements' },
      { id: 'mod_2_4', title: 'CASE Expressions', file: 'module_2/mod_2_4.mdx', slug: 'case-expressions' },
      { id: 'mod_2_5', title: 'NULL Handling', file: 'module_2/mod_2_5.mdx', slug: 'null-handling' },
    ],
  },
  {
    id: 'module_3',
    title: 'Module 3: Data Aggregation',
    lessons: [
      { id: 'mod_3_1', title: 'COUNT and SUM', file: 'module_3/mod_3_1.mdx', slug: 'count-and-sum' },
      { id: 'mod_3_2', title: 'AVG, MIN, MAX', file: 'module_3/mod_3_2.mdx', slug: 'avg-min-max' },
      { id: 'mod_3_3', title: 'GROUP BY Basics', file: 'module_3/mod_3_3.mdx', slug: 'group-by-basics' },
      { id: 'mod_3_4', title: 'HAVING Clause', file: 'module_3/mod_3_4.mdx', slug: 'having-clause' },
      { id: 'mod_3_5', title: 'String Functions', file: 'module_3/mod_3_5.mdx', slug: 'string-functions' },
      { id: 'mod_3_6', title: 'Date Functions', file: 'module_3/mod_3_6.mdx', slug: 'date-functions' },
    ],
  },
  {
    id: 'module_4',
    title: 'Module 4: Joins and Subqueries',
    lessons: [
      { id: 'mod_4_1', title: 'INNER JOIN', file: 'module_4/mod_4_1.mdx', slug: 'inner-join' },
      { id: 'mod_4_2', title: 'LEFT and RIGHT JOIN', file: 'module_4/mod_4_2.mdx', slug: 'left-and-right-join' },
      { id: 'mod_4_3', title: 'FULL OUTER JOIN', file: 'module_4/mod_4_3.mdx', slug: 'full-outer-join' },
      { id: 'mod_4_4', title: 'Self Joins', file: 'module_4/mod_4_4.mdx', slug: 'self-joins' },
      { id: 'mod_4_5', title: 'Subqueries', file: 'module_4/mod_4_5.mdx', slug: 'subqueries' },
      { id: 'mod_4_6', title: 'Correlated Subqueries', file: 'module_4/mod_4_6.mdx', slug: 'correlated-subqueries' },
    ],
  },
  {
    id: 'module_5',
    title: 'Module 5: Advanced Techniques',
    lessons: [
      { id: 'mod_5_1', title: 'Common Table Expressions', file: 'module_5/mod_5_1.mdx', slug: 'common-table-expressions' },
      { id: 'mod_5_2', title: 'Window Functions', file: 'module_5/mod_5_2.mdx', slug: 'window-functions' },
      { id: 'mod_5_3', title: 'RANK and DENSE_RANK', file: 'module_5/mod_5_3.mdx', slug: 'rank-and-dense-rank' },
      { id: 'mod_5_4', title: 'ROW_NUMBER', file: 'module_5/mod_5_4.mdx', slug: 'row-number' },
      { id: 'mod_5_5', title: 'PARTITION BY', file: 'module_5/mod_5_5.mdx', slug: 'partition-by' },
      { id: 'mod_5_6', title: 'Recursive CTEs', file: 'module_5/mod_5_6.mdx', slug: 'recursive-ctes' },
    ],
  },
  {
    id: 'module_6',
    title: 'Module 6: Database Design',
    lessons: [
      { id: 'mod_6_1', title: 'Normalization', file: 'module_6/mod_6_1.mdx', slug: 'normalization' },
      { id: 'mod_6_2', title: 'DDL Operations', file: 'module_6/mod_6_2.mdx', slug: 'ddl-operations' },
      { id: 'mod_6_3', title: 'Indexes', file: 'module_6/mod_6_3.mdx', slug: 'indexes' },
      { id: 'mod_6_4', title: 'Query Analysis', file: 'module_6/mod_6_4.mdx', slug: 'query-analysis' },
      { id: 'mod_6_5', title: 'Best Practices', file: 'module_6/mod_6_5.mdx', slug: 'best-practices' },
      { id: 'mod_6_6', title: 'Transactions', file: 'module_6/mod_6_6.mdx', slug: 'transactions' },
    ],
  },
  {
    id: 'module_7',
    title: 'Module 7: Advanced Analytics',
    lessons: [
      { id: 'mod_7_1', title: 'LAG and LEAD', file: 'module_7/mod_7_1.mdx', slug: 'lag-and-lead' },
      { id: 'mod_7_2', title: 'OLAP and Data Warehousing', file: 'module_7/mod_7_2.mdx', slug: 'olap-and-data-warehousing' },
      { id: 'mod_7_3', title: 'Materialized Views', file: 'module_7/mod_7_3.mdx', slug: 'materialized-views' },
      { id: 'mod_7_4', title: 'JSONB Data Types', file: 'module_7/mod_7_4.mdx', slug: 'jsonb-data-types' },
      { id: 'mod_7_5', title: 'Regular Expressions', file: 'module_7/mod_7_5.mdx', slug: 'regular-expressions' },
      { id: 'mod_7_6', title: 'Dashboard Case Study', file: 'module_7/mod_7_6.mdx', slug: 'dashboard-case-study' },
    ],
  },
],
mongodb: [
  {
    id: 'module_1',
    title: 'Module 1: Aggregation Pipeline Basics',
    lessons: [
      { id: 'mod_1_1', title: 'What are Aggregation Pipelines', file: 'module_1/mod_1_1.mdx', slug: 'what-are-aggregation-pipelines' },
      { id: 'mod_1_2', title: 'Aggregation Framework Architecture', file: 'module_1/mod_1_2.mdx', slug: 'aggregation-framework-architecture' },
      { id: 'mod_1_3', title: 'The $match Stage', file: 'module_1/mod_1_3.mdx', slug: 'match-stage' },
      { id: 'mod_1_4', title: 'The $project Stage', file: 'module_1/mod_1_4.mdx', slug: 'project-stage' },
      { id: 'mod_1_5', title: 'Hands-on Lab: Filtering and Projection', file: 'module_1/mod_1_5.mdx', slug: 'filtering-and-projection-lab' },
    ],
  },
  {
    id: 'module_2',
    title: 'Module 2: Grouping and Accumulation',
    lessons: [
      { id: 'mod_2_1', title: 'The $group Stage', file: 'module_2/mod_2_1.mdx', slug: 'group-stage' },
      { id: 'mod_2_2', title: 'Accumulator Operators', file: 'module_2/mod_2_2.mdx', slug: 'accumulator-operators' },
      { id: 'mod_2_3', title: 'The $unwind Stage', file: 'module_2/mod_2_3.mdx', slug: 'unwind-stage' },
      { id: 'mod_2_4', title: 'The $sort and $limit Stages', file: 'module_2/mod_2_4.mdx', slug: 'sort-and-limit-stages' },
      { id: 'mod_2_5', title: 'Hands-on Lab: Aggregation Analysis', file: 'module_2/mod_2_5.mdx', slug: 'aggregation-analysis-lab' },
    ],
  },
  {
    id: 'module_3',
    title: 'Module 3: Advanced Aggregation',
    lessons: [
      { id: 'mod_3_1', title: 'The $lookup Stage', file: 'module_3/mod_3_1.mdx', slug: 'lookup-stage' },
      { id: 'mod_3_2', title: 'Array Operations', file: 'module_3/mod_3_2.mdx', slug: 'array-operations' },
      { id: 'mod_3_3', title: 'Conditional Expressions', file: 'module_3/mod_3_3.mdx', slug: 'conditional-expressions' },
      { id: 'mod_3_4', title: 'String Manipulation', file: 'module_3/mod_3_4.mdx', slug: 'string-manipulation' },
      { id: 'mod_3_5', title: 'Hands-on Lab: Complex Pipelines', file: 'module_3/mod_3_5.mdx', slug: 'complex-pipelines-lab' },
    ],
  },
  {
    id: 'module_4',
    title: 'Module 4: Date and Math Operations',
    lessons: [
      { id: 'mod_4_1', title: 'Date Operators', file: 'module_4/mod_4_1.mdx', slug: 'date-operators' },
      { id: 'mod_4_2', title: 'Arithmetic Operators', file: 'module_4/mod_4_2.mdx', slug: 'arithmetic-operators' },
      { id: 'mod_4_3', title: 'Comparison and Boolean Logic', file: 'module_4/mod_4_3.mdx', slug: 'comparison-and-boolean-logic' },
      { id: 'mod_4_4', title: 'Type Conversion', file: 'module_4/mod_4_4.mdx', slug: 'type-conversion' },
      { id: 'mod_4_5', title: 'Hands-on Lab: Data Transformation', file: 'module_4/mod_4_5.mdx', slug: 'data-transformation-lab' },
    ],
  },
  {
    id: 'module_5',
    title: 'Module 5: Pipeline Optimization',
    lessons: [
      { id: 'mod_5_1', title: 'Index Utilization', file: 'module_5/mod_5_1.mdx', slug: 'index-utilization' },
      { id: 'mod_5_2', title: 'Pipeline Performance', file: 'module_5/mod_5_2.mdx', slug: 'pipeline-performance' },
      { id: 'mod_5_3', title: 'explain() Method', file: 'module_5/mod_5_3.mdx', slug: 'explain-method' },
      { id: 'mod_5_4', title: 'Memory Management', file: 'module_5/mod_5_4.mdx', slug: 'memory-management' },
      { id: 'mod_5_5', title: 'Best Practices', file: 'module_5/mod_5_5.mdx', slug: 'best-practices' },
      { id: 'mod_5_6', title: 'Hands-on Lab: Optimization', file: 'module_5/mod_5_6.mdx', slug: 'optimization-lab' },
    ],
  },
  {
    id: 'module_6',
    title: 'Module 6: Real-World Applications',
    lessons: [
      { id: 'mod_6_1', title: 'E-commerce Analytics', file: 'module_6/mod_6_1.mdx', slug: 'ecommerce-analytics' },
      { id: 'mod_6_2', title: 'Time-Series Analysis', file: 'module_6/mod_6_2.mdx', slug: 'time-series-analysis' },
      { id: 'mod_6_3', title: 'Geospatial Queries', file: 'module_6/mod_6_3.mdx', slug: 'geospatial-queries' },
      { id: 'mod_6_4', title: 'Text Search Pipelines', file: 'module_6/mod_6_4.mdx', slug: 'text-search-pipelines' },
      { id: 'mod_6_5', title: 'Hands-on Lab: Case Studies', file: 'module_6/mod_6_5.mdx', slug: 'case-studies-lab' },
    ],
  },
  {
    id: 'module_7',
    title: 'Module 7: Advanced Techniques',
    lessons: [
      { id: 'mod_7_1', title: 'The $facet Stage', file: 'module_7/mod_7_1.mdx', slug: 'facet-stage' },
      { id: 'mod_7_2', title: 'The $bucket Stage', file: 'module_7/mod_7_2.mdx', slug: 'bucket-stage' },
      { id: 'mod_7_3', title: 'The $graphLookup Stage', file: 'module_7/mod_7_3.mdx', slug: 'graph-lookup-stage' },
      { id: 'mod_7_4', title: 'Views and On-Demand Pipelines', file: 'module_7/mod_7_4.mdx', slug: 'views-and-on-demand-pipelines' },
      { id: 'mod_7_5', title: 'Final Project: Dashboard', file: 'module_7/mod_7_5.mdx', slug: 'final-project-dashboard' },
    ],
  },
],
};
