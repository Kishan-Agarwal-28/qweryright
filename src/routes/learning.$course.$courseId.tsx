import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { courseStructure, findLessonBySlug, getAdjacentLesson } from '@/lib/course-structure';

type SavedHighlight = {
  id: string;
  courseId: string; // e.g., 'mod_1_1'
  containerSelector: string; // e.g., "p:nth-child(3)" - to identify the specific paragraph
  startOffset: number;
  endOffset: number;
  text: string; // For verification
  color: string;
}

export const Route = createFileRoute('/learning/$course/$courseId')({
  beforeLoad: ({ params }) => {
    const { course: courseType, courseId } = params;
    const lessonData = findLessonBySlug(courseType, courseId);
    
    // If lesson not found, redirect to first lesson
    if (!lessonData?.lesson) {
      const currentCourseStructure = courseStructure[courseType as 'sql' | 'mongodb'] || courseStructure.sql;
      const firstModule = currentCourseStructure[0];
      const firstLesson = firstModule?.lessons[0];
      
      if (firstLesson) {
        throw redirect({
          to: '/learning/$course/$courseId',
          params: { course: courseType, courseId: firstLesson.slug },
          replace: true,
        });
      }
    }
  },
  component: RouteComponent,
  loader:({params})=>{
    let prev=getAdjacentLesson(params.course,params.courseId,'prev');
    let next=getAdjacentLesson(params.course,params.courseId,'next');
    const savedHighlights : SavedHighlight[] = [
       // Empty initially, or populate from DB
    ]
    return {props:{prev,next,savedHighlights}}
  }
})

import { useRef } from 'react';
import { CourseSidebar } from '@/components/course-sidebar';
import { mdxComponents } from '@/components/mdx-components';



// Direct imports for all SQL MDX files for SSR
import sqlMod1_1 from '../course_content/sql/module_1/mod_1_1.mdx';
import sqlMod1_2 from '../course_content/sql/module_1/mod_1_2.mdx';
import sqlMod1_3 from '../course_content/sql/module_1/mod_1_3.mdx';
import sqlMod1_4 from '../course_content/sql/module_1/mod_1_4.mdx';
import sqlMod1_5 from '../course_content/sql/module_1/mod_1_5.mdx';
import sqlMod1_6 from '../course_content/sql/module_1/mod_1_6.mdx';
import sqlMod2_1 from '../course_content/sql/module_2/mod_2_1.mdx';
import sqlMod2_2 from '../course_content/sql/module_2/mod_2_2.mdx';
import sqlMod2_3 from '../course_content/sql/module_2/mod_2_3.mdx';
import sqlMod2_4 from '../course_content/sql/module_2/mod_2_4.mdx';
import sqlMod2_5 from '../course_content/sql/module_2/mod_2_5.mdx';
import sqlMod3_1 from '../course_content/sql/module_3/mod_3_1.mdx';
import sqlMod3_2 from '../course_content/sql/module_3/mod_3_2.mdx';
import sqlMod3_3 from '../course_content/sql/module_3/mod_3_3.mdx';
import sqlMod3_4 from '../course_content/sql/module_3/mod_3_4.mdx';
import sqlMod3_5 from '../course_content/sql/module_3/mod_3_5.mdx';
import sqlMod3_6 from '../course_content/sql/module_3/mod_3_6.mdx';
import sqlMod4_1 from '../course_content/sql/module_4/mod_4_1.mdx';
import sqlMod4_2 from '../course_content/sql/module_4/mod_4_2.mdx';
import sqlMod4_3 from '../course_content/sql/module_4/mod_4_3.mdx';
import sqlMod4_4 from '../course_content/sql/module_4/mod_4_4.mdx';
import sqlMod4_5 from '../course_content/sql/module_4/mod_4_5.mdx';
import sqlMod4_6 from '../course_content/sql/module_4/mod_4_6.mdx';
import sqlMod5_1 from '../course_content/sql/module_5/mod_5_1.mdx';
import sqlMod5_2 from '../course_content/sql/module_5/mod_5_2.mdx';
import sqlMod5_3 from '../course_content/sql/module_5/mod_5_3.mdx';
import sqlMod5_4 from '../course_content/sql/module_5/mod_5_4.mdx';
import sqlMod5_5 from '../course_content/sql/module_5/mod_5_5.mdx';
import sqlMod5_6 from '../course_content/sql/module_5/mod_5_6.mdx';
import sqlMod6_1 from '../course_content/sql/module_6/mod_6_1.mdx';
import sqlMod6_2 from '../course_content/sql/module_6/mod_6_2.mdx';
import sqlMod6_3 from '../course_content/sql/module_6/mod_6_3.mdx';
import sqlMod6_4 from '../course_content/sql/module_6/mod_6_4.mdx';
import sqlMod6_5 from '../course_content/sql/module_6/mod_6_5.mdx';
import sqlMod6_6 from '../course_content/sql/module_6/mod_6_6.mdx';
import sqlMod7_1 from '../course_content/sql/module_7/mod_7_1.mdx';
import sqlMod7_2 from '../course_content/sql/module_7/mod_7_2.mdx';
import sqlMod7_3 from '../course_content/sql/module_7/mod_7_3.mdx';
import sqlMod7_4 from '../course_content/sql/module_7/mod_7_4.mdx';
import sqlMod7_5 from '../course_content/sql/module_7/mod_7_5.mdx';
import sqlMod7_6 from '../course_content/sql/module_7/mod_7_6.mdx';

// Direct imports for all MongoDB MDX files for SSR
import mongoMod1_1 from '../course_content/mongodb/module_1/mod_1_1.mdx';
import mongoMod1_2 from '../course_content/mongodb/module_1/mod_1_2.mdx';
import mongoMod1_3 from '../course_content/mongodb/module_1/mod_1_3.mdx';
import mongoMod1_4 from '../course_content/mongodb/module_1/mod_1_4.mdx';
import mongoMod1_5 from '../course_content/mongodb/module_1/mod_1_5.mdx';
import mongoMod2_1 from '../course_content/mongodb/module_2/mod_2_1.mdx';
import mongoMod2_2 from '../course_content/mongodb/module_2/mod_2_2.mdx';
import mongoMod2_3 from '../course_content/mongodb/module_2/mod_2_3.mdx';
import mongoMod2_4 from '../course_content/mongodb/module_2/mod_2_4.mdx';
import mongoMod2_5 from '../course_content/mongodb/module_2/mod_2_5.mdx';
import mongoMod3_1 from '../course_content/mongodb/module_3/mod_3_1.mdx';
import mongoMod3_2 from '../course_content/mongodb/module_3/mod_3_2.mdx';
import mongoMod3_3 from '../course_content/mongodb/module_3/mod_3_3.mdx';
import mongoMod3_4 from '../course_content/mongodb/module_3/mod_3_4.mdx';
import mongoMod3_5 from '../course_content/mongodb/module_3/mod_3_5.mdx';
import mongoMod4_1 from '../course_content/mongodb/module_4/mod_4_1.mdx';
import mongoMod4_2 from '../course_content/mongodb/module_4/mod_4_2.mdx';
import mongoMod4_3 from '../course_content/mongodb/module_4/mod_4_3.mdx';
import mongoMod4_4 from '../course_content/mongodb/module_4/mod_4_4.mdx';
import mongoMod4_5 from '../course_content/mongodb/module_4/mod_4_5.mdx';
import mongoMod5_1 from '../course_content/mongodb/module_5/mod_5_1.mdx';
import mongoMod5_2 from '../course_content/mongodb/module_5/mod_5_2.mdx';
import mongoMod5_3 from '../course_content/mongodb/module_5/mod_5_3.mdx';
import mongoMod5_4 from '../course_content/mongodb/module_5/mod_5_4.mdx';
import mongoMod5_5 from '../course_content/mongodb/module_5/mod_5_5.mdx';
import mongoMod5_6 from '../course_content/mongodb/module_5/mod_5_6.mdx';
import mongoMod6_1 from '../course_content/mongodb/module_6/mod_6_1.mdx';
import mongoMod6_2 from '../course_content/mongodb/module_6/mod_6_2.mdx';
import mongoMod6_3 from '../course_content/mongodb/module_6/mod_6_3.mdx';
import mongoMod6_4 from '../course_content/mongodb/module_6/mod_6_4.mdx';
import mongoMod6_5 from '../course_content/mongodb/module_6/mod_6_5.mdx';
import mongoMod7_1 from '../course_content/mongodb/module_7/mod_7_1.mdx';
import mongoMod7_2 from '../course_content/mongodb/module_7/mod_7_2.mdx';
import mongoMod7_3 from '../course_content/mongodb/module_7/mod_7_3.mdx';
import mongoMod7_4 from '../course_content/mongodb/module_7/mod_7_4.mdx';
import mongoMod7_5 from '../course_content/mongodb/module_7/mod_7_5.mdx';
import BottomDock from '@/components/bottom-dock';
import { PageHeader } from '@/components/article-header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';


const sqlMdxModules = {
  'module_1/mod_1_1.mdx': sqlMod1_1,
  'module_1/mod_1_2.mdx': sqlMod1_2,
  'module_1/mod_1_3.mdx': sqlMod1_3,
  'module_1/mod_1_4.mdx': sqlMod1_4,
  'module_1/mod_1_5.mdx': sqlMod1_5,
  'module_1/mod_1_6.mdx': sqlMod1_6,
  'module_2/mod_2_1.mdx': sqlMod2_1,
  'module_2/mod_2_2.mdx': sqlMod2_2,
  'module_2/mod_2_3.mdx': sqlMod2_3,
  'module_2/mod_2_4.mdx': sqlMod2_4,
  'module_2/mod_2_5.mdx': sqlMod2_5,
  'module_3/mod_3_1.mdx': sqlMod3_1,
  'module_3/mod_3_2.mdx': sqlMod3_2,
  'module_3/mod_3_3.mdx': sqlMod3_3,
  'module_3/mod_3_4.mdx': sqlMod3_4,
  'module_3/mod_3_5.mdx': sqlMod3_5,
  'module_3/mod_3_6.mdx': sqlMod3_6,
  'module_4/mod_4_1.mdx': sqlMod4_1,
  'module_4/mod_4_2.mdx': sqlMod4_2,
  'module_4/mod_4_3.mdx': sqlMod4_3,
  'module_4/mod_4_4.mdx': sqlMod4_4,
  'module_4/mod_4_5.mdx': sqlMod4_5,
  'module_4/mod_4_6.mdx': sqlMod4_6,
  'module_5/mod_5_1.mdx': sqlMod5_1,
  'module_5/mod_5_2.mdx': sqlMod5_2,
  'module_5/mod_5_3.mdx': sqlMod5_3,
  'module_5/mod_5_4.mdx': sqlMod5_4,
  'module_5/mod_5_5.mdx': sqlMod5_5,
  'module_5/mod_5_6.mdx': sqlMod5_6,
  'module_6/mod_6_1.mdx': sqlMod6_1,
  'module_6/mod_6_2.mdx': sqlMod6_2,
  'module_6/mod_6_3.mdx': sqlMod6_3,
  'module_6/mod_6_4.mdx': sqlMod6_4,
  'module_6/mod_6_5.mdx': sqlMod6_5,
  'module_6/mod_6_6.mdx': sqlMod6_6,
  'module_7/mod_7_1.mdx': sqlMod7_1,
  'module_7/mod_7_2.mdx': sqlMod7_2,
  'module_7/mod_7_3.mdx': sqlMod7_3,
  'module_7/mod_7_4.mdx': sqlMod7_4,
  'module_7/mod_7_5.mdx': sqlMod7_5,
  'module_7/mod_7_6.mdx': sqlMod7_6,
} as const;

const mongodbMdxModules = {
  'module_1/mod_1_1.mdx': mongoMod1_1,
  'module_1/mod_1_2.mdx': mongoMod1_2,
  'module_1/mod_1_3.mdx': mongoMod1_3,
  'module_1/mod_1_4.mdx': mongoMod1_4,
  'module_1/mod_1_5.mdx': mongoMod1_5,
  'module_2/mod_2_1.mdx': mongoMod2_1,
  'module_2/mod_2_2.mdx': mongoMod2_2,
  'module_2/mod_2_3.mdx': mongoMod2_3,
  'module_2/mod_2_4.mdx': mongoMod2_4,
  'module_2/mod_2_5.mdx': mongoMod2_5,
  'module_3/mod_3_1.mdx': mongoMod3_1,
  'module_3/mod_3_2.mdx': mongoMod3_2,
  'module_3/mod_3_3.mdx': mongoMod3_3,
  'module_3/mod_3_4.mdx': mongoMod3_4,
  'module_3/mod_3_5.mdx': mongoMod3_5,
  'module_4/mod_4_1.mdx': mongoMod4_1,
  'module_4/mod_4_2.mdx': mongoMod4_2,
  'module_4/mod_4_3.mdx': mongoMod4_3,
  'module_4/mod_4_4.mdx': mongoMod4_4,
  'module_4/mod_4_5.mdx': mongoMod4_5,
  'module_5/mod_5_1.mdx': mongoMod5_1,
  'module_5/mod_5_2.mdx': mongoMod5_2,
  'module_5/mod_5_3.mdx': mongoMod5_3,
  'module_5/mod_5_4.mdx': mongoMod5_4,
  'module_5/mod_5_5.mdx': mongoMod5_5,
  'module_5/mod_5_6.mdx': mongoMod5_6,
  'module_6/mod_6_1.mdx': mongoMod6_1,
  'module_6/mod_6_2.mdx': mongoMod6_2,
  'module_6/mod_6_3.mdx': mongoMod6_3,
  'module_6/mod_6_4.mdx': mongoMod6_4,
  'module_6/mod_6_5.mdx': mongoMod6_5,
  'module_7/mod_7_1.mdx': mongoMod7_1,
  'module_7/mod_7_2.mdx': mongoMod7_2,
  'module_7/mod_7_3.mdx': mongoMod7_3,
  'module_7/mod_7_4.mdx': mongoMod7_4,
  'module_7/mod_7_5.mdx': mongoMod7_5,
} as const;
import { TextHighlighter } from '@/components/text-highlighter';
export default function RouteComponent() {

  const { course: courseType, courseId } = Route.useParams();
  const { prev, next ,savedHighlights } = Route.useLoaderData().props;
  
  // Ref to track the content for reading time calculation
  const contentRef = useRef<HTMLDivElement>(null); 

  const mdxModules = courseType === 'mongodb' ? mongodbMdxModules : sqlMdxModules;

  const lessonData = findLessonBySlug(courseType, courseId);
  const currentLesson = lessonData?.lesson;


  const mdxModule = currentLesson ? mdxModules[currentLesson.file as keyof typeof mdxModules] : null;
  const MdxContent = mdxModule;
const handleSaveHighlight = async (highlightData: any) => {
    // This runs on the client when user clicks "Highlight"
    console.log("Saving to DB:", highlightData);

    // Call your API route here
    // await fetch('/api/highlights', { method: 'POST', body: JSON.stringify({...highlightData, courseId}) });
    
    return "new-id-from-db";
  };
  const handleDeleteHighlight = async (id: string) => {
    // This runs on the client when user clicks "Delete"
    console.log("Deleting from DB:", id);

    // Call your API route here
    // await fetch('/api/highlights', { method: 'DELETE', body: JSON.stringify({id, courseId}) });
    
  };
 return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 shrink-0 hidden md:block">
        <CourseSidebar
          currentLessonSlug={courseId}
          courseType={courseType}
        />
      </div>

      {/* Main Content */}
      <div 
        id="course-content-scroll-area" 
        className="flex-1 overflow-y-auto bg-background relative scroll-smooth"
      >
        <div className="max-w-4xl mx-auto px-8 py-12">
          
       
          <PageHeader contentRef={contentRef as React.RefObject<HTMLDivElement>} className="mb-8" />
          
          {/* Article Content */}
          <article ref={contentRef} className="prose dark:prose-invert max-w-none">
            <TextHighlighter 
              savedHighlights={savedHighlights as any} 
              onSaveHighlight={handleSaveHighlight}
              onDeleteHighlight={handleDeleteHighlight}
            >
            {MdxContent ? (
              <MdxContent components={mdxComponents} />
            ) : null}
            </TextHighlighter>
          </article>
          <div className=' w-full p-8  flex gap-8 items-center-safe justify-between'>
          {
            prev?.slug&&
            (
                <Link
            to="/learning/$course/$courseId"
            params={
              {
                course:courseType,
                courseId:prev?.slug,
              }
            }
            className='w-full'
            >
          <Button
          className='w-full cursor-pointer  p-10 border-2 rounded-xl border-border'
          variant='ghost'
          >
            <ArrowLeft/>
            Previous Chapter
              <img
            src={`${prev?.content_url}`}
            alt={prev?.title}
            loading='lazy'
            crossOrigin='anonymous'
            className='object-cover h-15 rounded-md mx-2'
            />
          </Button>
          
            </Link>
            )
          }
          {
            next?.slug&&
            (
              <Link
          to="/learning/$course/$courseId"
          params={
            {
              course:courseType,
              courseId:next?.slug,
            }
          }
          className='w-full'
          >
          <Button
          className='w-full  cursor-pointer p-10 border-2 rounded-xl border-border'
          variant='ghost'
          >
              <img
            src={`${next?.content_url}`}
            alt={next?.title}
            loading='lazy'
            crossOrigin='anonymous'
            className='object-cover h-15 rounded-md mx-2'
            />
            Next Chapter
            <ArrowRight/>
          </Button>
            </Link>
            )
          }
          </div>
        </div>

        <BottomDock containerId="course-content-scroll-area" />
      </div>
    </div>
  );
}