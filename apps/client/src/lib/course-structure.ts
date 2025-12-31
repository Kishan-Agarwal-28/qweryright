export interface LessonItem {
  id: string
  title: string
  file: string
  slug: string
  content_url: string
}

export interface ModuleItem {
  id: string
  title: string
  lessons: Array<LessonItem>
}

export interface CourseStructure {
  [key: string]: Array<ModuleItem>
}

// Helper function to find lesson by slug
export function findLessonBySlug(
  courseType: string,
  slug: string,
): { lesson: LessonItem; module: ModuleItem } | null {
  const structure = courseStructure[courseType]
  if (!structure) return null

  for (const module of structure) {
    const lesson = module.lessons.find((l) => l.slug === slug)
    if (lesson) {
      return { lesson, module }
    }
  }
  return null
}

// Helper function to get the next/previous lesson
export function getAdjacentLesson(
  courseType: string,
  currentSlug: string,
  direction: 'next' | 'prev',
): LessonItem | null {
  const structure = courseStructure[courseType]
  if (!structure) return null

  const allLessons: Array<LessonItem> = []
  structure.forEach((module) => {
    allLessons.push(...module.lessons)
  })

  const currentIndex = allLessons.findIndex((l) => l.slug === currentSlug)
  if (currentIndex === -1) return null

  const adjacentIndex =
    direction === 'next' ? currentIndex + 1 : currentIndex - 1
  return allLessons[adjacentIndex] || null
}

export const courseStructure: CourseStructure = {
  sql: [
    {
      id: 'module_1',
      title: 'Module 1: SQL Foundations',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'Introduction to Databases',
          file: 'module_1/mod_1_1.mdx',
          slug: 'introduction-to-databases',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724358/1_ohdrt8.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Basic SELECT Queries',
          file: 'module_1/mod_1_2.mdx',
          slug: 'basic-select-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724357/2_eu9pwl.webp',
        },
        {
          id: 'mod_1_3',
          title: 'Filtering with WHERE',
          file: 'module_1/mod_1_3.mdx',
          slug: 'filtering-with-where',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724357/3_h9h3lq.webp',
        },
        {
          id: 'mod_1_4',
          title: 'Sorting and Limiting',
          file: 'module_1/mod_1_4.mdx',
          slug: 'sorting-and-limiting',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/4_hhqhop.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Aggregate Functions',
          file: 'module_1/mod_1_5.mdx',
          slug: 'aggregate-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724379/5_zz1ddw.webp',
        },
        {
          id: 'mod_1_6',
          title: 'GROUP BY and HAVING',
          file: 'module_1/mod_1_6.mdx',
          slug: 'group-by-and-having',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724357/6_zx7vbb.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Data Manipulation',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'INSERT Statements',
          file: 'module_2/mod_2_1.mdx',
          slug: 'insert-statements',
          // Image 7 ignored as requested; using Image 8
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724363/8_uxmfvu.webp',
        },
        {
          id: 'mod_2_2',
          title: 'UPDATE Statements',
          file: 'module_2/mod_2_2.mdx',
          slug: 'update-statements',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/9_epzgcc.webp',
        },
        {
          id: 'mod_2_3',
          title: 'DELETE Statements',
          file: 'module_2/mod_2_3.mdx',
          slug: 'delete-statements',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/10_t71xd9.webp',
        },
        {
          id: 'mod_2_4',
          title: 'CASE Expressions',
          file: 'module_2/mod_2_4.mdx',
          slug: 'case-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724364/11_doucbr.webp',
        },
        {
          id: 'mod_2_5',
          title: 'NULL Handling',
          file: 'module_2/mod_2_5.mdx',
          slug: 'null-handling',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724437/12_lsqx5j.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Data Aggregation',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'COUNT and SUM',
          file: 'module_3/mod_3_1.mdx',
          slug: 'count-and-sum',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724375/13_f7xugr.webp',
        },
        {
          id: 'mod_3_2',
          title: 'AVG, MIN, MAX',
          file: 'module_3/mod_3_2.mdx',
          slug: 'avg-min-max',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724668/14_lxhrcu.webp',
        },
        {
          id: 'mod_3_3',
          title: 'GROUP BY Basics',
          file: 'module_3/mod_3_3.mdx',
          slug: 'group-by-basics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724371/15_bohhxd.webp',
        },
        {
          id: 'mod_3_4',
          title: 'HAVING Clause',
          file: 'module_3/mod_3_4.mdx',
          slug: 'having-clause',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724378/16_jjxodt.webp',
        },
        {
          id: 'mod_3_5',
          title: 'String Functions',
          file: 'module_3/mod_3_5.mdx',
          slug: 'string-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724375/17_vjw4v5.webp',
        },
        {
          id: 'mod_3_6',
          title: 'Date Functions',
          file: 'module_3/mod_3_6.mdx',
          slug: 'date-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724379/18_jvy16f.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Joins and Subqueries',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'INNER JOIN',
          file: 'module_4/mod_4_1.mdx',
          slug: 'inner-join',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724705/19_d1yetd.webp',
        },
        {
          id: 'mod_4_2',
          title: 'LEFT and RIGHT JOIN',
          file: 'module_4/mod_4_2.mdx',
          slug: 'left-and-right-join',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724680/20_vmsd1j.webp',
        },
        {
          id: 'mod_4_3',
          title: 'FULL OUTER JOIN',
          file: 'module_4/mod_4_3.mdx',
          slug: 'full-outer-join',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724414/21_y3an2d.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Self Joins',
          file: 'module_4/mod_4_4.mdx',
          slug: 'self-joins',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724680/22_oku6ee.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Subqueries',
          file: 'module_4/mod_4_5.mdx',
          slug: 'subqueries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724702/23_solojy.webp',
        },
        {
          id: 'mod_4_6',
          title: 'Correlated Subqueries',
          file: 'module_4/mod_4_6.mdx',
          slug: 'correlated-subqueries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724685/24_foofim.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Advanced Techniques',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Common Table Expressions',
          file: 'module_5/mod_5_1.mdx',
          slug: 'common-table-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724698/25_hqoxfp.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Window Functions',
          file: 'module_5/mod_5_2.mdx',
          slug: 'window-functions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724711/26_ohxyyg.webp',
        },
        {
          id: 'mod_5_3',
          title: 'RANK and DENSE_RANK',
          file: 'module_5/mod_5_3.mdx',
          slug: 'rank-and-dense-rank',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724716/27_tijnt2.webp',
        },
        {
          id: 'mod_5_4',
          title: 'ROW_NUMBER',
          file: 'module_5/mod_5_4.mdx',
          slug: 'row-number',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724709/28_gzexkd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'PARTITION BY',
          file: 'module_5/mod_5_5.mdx',
          slug: 'partition-by',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724662/29_ht3hdk.webp',
        },
        {
          id: 'mod_5_6',
          title: 'Recursive CTEs',
          file: 'module_5/mod_5_6.mdx',
          slug: 'recursive-ctes',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724661/30_n13umw.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Database Design',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'Normalization',
          file: 'module_6/mod_6_1.mdx',
          slug: 'normalization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724663/31_eddimi.webp',
        },
        {
          id: 'mod_6_2',
          title: 'DDL Operations',
          file: 'module_6/mod_6_2.mdx',
          slug: 'ddl-operations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724666/32_bvnout.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Indexes',
          file: 'module_6/mod_6_3.mdx',
          slug: 'indexes',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724666/33_rl2utm.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Query Analysis',
          file: 'module_6/mod_6_4.mdx',
          slug: 'query-analysis',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724673/34_xrrqvf.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Best Practices',
          file: 'module_6/mod_6_5.mdx',
          slug: 'best-practices',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724668/35_qrdijj.webp',
        },
        {
          id: 'mod_6_6',
          title: 'Transactions',
          file: 'module_6/mod_6_6.mdx',
          slug: 'transactions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724672/36_tre7iu.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Analytics',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'LAG and LEAD',
          file: 'module_7/mod_7_1.mdx',
          slug: 'lag-and-lead',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724671/37_zk4mus.webp',
        },
        {
          id: 'mod_7_2',
          title: 'OLAP and Data Warehousing',
          file: 'module_7/mod_7_2.mdx',
          slug: 'olap-and-data-warehousing',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724672/38_blyzkj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'Materialized Views',
          file: 'module_7/mod_7_3.mdx',
          slug: 'materialized-views',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724677/39_dnhy4v.webp',
        },
        {
          id: 'mod_7_4',
          title: 'JSONB Data Types',
          file: 'module_7/mod_7_4.mdx',
          slug: 'jsonb-data-types',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724682/40_wygong.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Regular Expressions',
          file: 'module_7/mod_7_5.mdx',
          slug: 'regular-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724680/41_jcxbch.webp',
        },
        {
          id: 'mod_7_6',
          title: 'Dashboard Case Study',
          file: 'module_7/mod_7_6.mdx',
          slug: 'dashboard-case-study',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724676/42_qeihz8.webp',
        },
      ],
    },
  ],
  mongodb: [
    {
      id: 'module_1',
      title: 'Module 1: Aggregation Pipeline Basics',
      lessons: [
        {
          id: 'mod_1_1',
          title: 'What are Aggregation Pipelines',
          file: 'module_1/mod_1_1.mdx',
          slug: 'what-are-aggregation-pipelines',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724133/1_ed0ywl.webp',
        },
        {
          id: 'mod_1_2',
          title: 'Aggregation Framework Architecture',
          file: 'module_1/mod_1_2.mdx',
          slug: 'aggregation-framework-architecture',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/2_vwpwls.webp',
        },
        {
          id: 'mod_1_3',
          title: 'The $match Stage',
          file: 'module_1/mod_1_3.mdx',
          slug: 'match-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724124/3_yq8nva.webp',
        },
        {
          id: 'mod_1_4',
          title: 'The $project Stage',
          file: 'module_1/mod_1_4.mdx',
          slug: 'project-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/4_v73sib.webp',
        },
        {
          id: 'mod_1_5',
          title: 'Hands-on Lab: Filtering and Projection',
          file: 'module_1/mod_1_5.mdx',
          slug: 'filtering-and-projection-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724146/5_iamh1v.webp',
        },
      ],
    },
    {
      id: 'module_2',
      title: 'Module 2: Grouping and Accumulation',
      lessons: [
        {
          id: 'mod_2_1',
          title: 'The $group Stage',
          file: 'module_2/mod_2_1.mdx',
          slug: 'group-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724132/6_f7upuf.webp',
        },
        {
          id: 'mod_2_2',
          title: 'Accumulator Operators',
          file: 'module_2/mod_2_2.mdx',
          slug: 'accumulator-operators',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/7_utz3uk.webp',
        },
        {
          id: 'mod_2_3',
          title: 'The $unwind Stage',
          file: 'module_2/mod_2_3.mdx',
          slug: 'unwind-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724123/8_vqlnfh.webp',
        },
        {
          id: 'mod_2_4',
          title: 'The $sort and $limit Stages',
          file: 'module_2/mod_2_4.mdx',
          slug: 'sort-and-limit-stages',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/9_gct12t.webp',
        },
        {
          id: 'mod_2_5',
          title: 'Hands-on Lab: Aggregation Analysis',
          file: 'module_2/mod_2_5.mdx',
          slug: 'aggregation-analysis-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724158/11_swxeoy.webp',
        },
      ],
    },
    {
      id: 'module_3',
      title: 'Module 3: Advanced Aggregation',
      lessons: [
        {
          id: 'mod_3_1',
          title: 'The $lookup Stage',
          file: 'module_3/mod_3_1.mdx',
          slug: 'lookup-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724140/12_mtv0yd.webp',
        },
        {
          id: 'mod_3_2',
          title: 'Array Operations',
          file: 'module_3/mod_3_2.mdx',
          slug: 'array-operations',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/13_wtc4os.webp',
        },
        {
          id: 'mod_3_3',
          title: 'Conditional Expressions',
          file: 'module_3/mod_3_3.mdx',
          slug: 'conditional-expressions',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724142/14_eqms5l.webp',
        },
        {
          id: 'mod_3_4',
          title: 'String Manipulation',
          file: 'module_3/mod_3_4.mdx',
          slug: 'string-manipulation',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724152/15_jdt3re.webp',
        },
        {
          id: 'mod_3_5',
          title: 'Hands-on Lab: Complex Pipelines',
          file: 'module_3/mod_3_5.mdx',
          slug: 'complex-pipelines-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724151/16_ha304n.webp',
        },
      ],
    },
    {
      id: 'module_4',
      title: 'Module 4: Date and Math Operations',
      lessons: [
        {
          id: 'mod_4_1',
          title: 'Date Operators',
          file: 'module_4/mod_4_1.mdx',
          slug: 'date-operators',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724156/17_xluqjx.webp',
        },
        {
          id: 'mod_4_2',
          title: 'Arithmetic Operators',
          file: 'module_4/mod_4_2.mdx',
          slug: 'arithmetic-operators',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724184/18_zmtnre.webp',
        },
        {
          id: 'mod_4_3',
          title: 'Comparison and Boolean Logic',
          file: 'module_4/mod_4_3.mdx',
          slug: 'comparison-and-boolean-logic',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724157/19_ueithj.webp',
        },
        {
          id: 'mod_4_4',
          title: 'Type Conversion',
          file: 'module_4/mod_4_4.mdx',
          slug: 'type-conversion',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724183/21_bny3d3.webp',
        },
        {
          id: 'mod_4_5',
          title: 'Hands-on Lab: Data Transformation',
          file: 'module_4/mod_4_5.mdx',
          slug: 'data-transformation-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/22_qvqsoc.webp',
        },
      ],
    },
    {
      id: 'module_5',
      title: 'Module 5: Pipeline Optimization',
      lessons: [
        {
          id: 'mod_5_1',
          title: 'Index Utilization',
          file: 'module_5/mod_5_1.mdx',
          slug: 'index-utilization',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724182/23_lne39d.webp',
        },
        {
          id: 'mod_5_2',
          title: 'Pipeline Performance',
          file: 'module_5/mod_5_2.mdx',
          slug: 'pipeline-performance',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724173/24_hni5xo.webp',
        },
        {
          id: 'mod_5_3',
          title: 'explain() Method',
          file: 'module_5/mod_5_3.mdx',
          slug: 'explain-method',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724188/25_dhfg00.webp',
        },
        {
          id: 'mod_5_4',
          title: 'Memory Management',
          file: 'module_5/mod_5_4.mdx',
          slug: 'memory-management',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724186/26_jl0syd.webp',
        },
        {
          id: 'mod_5_5',
          title: 'Best Practices',
          file: 'module_5/mod_5_5.mdx',
          slug: 'best-practices',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724194/27_f18r8h.webp',
        },
        {
          id: 'mod_5_6',
          title: 'Hands-on Lab: Optimization',
          file: 'module_5/mod_5_6.mdx',
          slug: 'optimization-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/28_zhzllv.webp',
        },
      ],
    },
    {
      id: 'module_6',
      title: 'Module 6: Real-World Applications',
      lessons: [
        {
          id: 'mod_6_1',
          title: 'E-commerce Analytics',
          file: 'module_6/mod_6_1.mdx',
          slug: 'ecommerce-analytics',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724204/29_ok2d2l.webp',
        },
        {
          id: 'mod_6_2',
          title: 'Time-Series Analysis',
          file: 'module_6/mod_6_2.mdx',
          slug: 'time-series-analysis',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724198/30_mct2ta.webp',
        },
        {
          id: 'mod_6_3',
          title: 'Geospatial Queries',
          file: 'module_6/mod_6_3.mdx',
          slug: 'geospatial-queries',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724193/31_yxxbzl.webp',
        },
        {
          id: 'mod_6_4',
          title: 'Text Search Pipelines',
          file: 'module_6/mod_6_4.mdx',
          slug: 'text-search-pipelines',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724196/32_xus3l5.webp',
        },
        {
          id: 'mod_6_5',
          title: 'Hands-on Lab: Case Studies',
          file: 'module_6/mod_6_5.mdx',
          slug: 'case-studies-lab',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724207/33_eaanos.webp',
        },
      ],
    },
    {
      id: 'module_7',
      title: 'Module 7: Advanced Techniques',
      lessons: [
        {
          id: 'mod_7_1',
          title: 'The $facet Stage',
          file: 'module_7/mod_7_1.mdx',
          slug: 'facet-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724201/34_rjcxwa.webp',
        },
        {
          id: 'mod_7_2',
          title: 'The $bucket Stage',
          file: 'module_7/mod_7_2.mdx',
          slug: 'bucket-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724209/35_nhprcj.webp',
        },
        {
          id: 'mod_7_3',
          title: 'The $graphLookup Stage',
          file: 'module_7/mod_7_3.mdx',
          slug: 'graph-lookup-stage',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724216/36_vcsbja.webp',
        },
        {
          id: 'mod_7_4',
          title: 'Views and On-Demand Pipelines',
          file: 'module_7/mod_7_4.mdx',
          slug: 'views-and-on-demand-pipelines',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724205/37_bo8iin.webp',
        },
        {
          id: 'mod_7_5',
          title: 'Final Project: Dashboard',
          file: 'module_7/mod_7_5.mdx',
          slug: 'final-project-dashboard',
          content_url:
            'https://res.cloudinary.com/testifywebdev/image/upload/v1765724220/38_zve90h.webp',
        },
      ],
    },
  ],
}
