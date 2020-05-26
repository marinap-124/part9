import React from "react";
import ReactDOM from "react-dom";


interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.name}</h1>;
};


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};



// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseAndDescr extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBaseAndDescr {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBaseAndDescr {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;


const Part: React.FC<CoursePart> = (course) => {

  return (
    <div>  
      {  
        (() => {
          switch(course.name){
            case "Fundamentals":
              return(<p>
                  {course.name} {course.exerciseCount} {course.description}
              </p>)

            case "Using props to pass data":
              return(<p>
              {course.name} {course.exerciseCount} {course.groupProjectCount}
              </p>)

            case "Deeper type usage":
              return(<p>
                  {course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}
              </p>)

            default:
              return assertNever(course);     
            
          }
        })()       
        
      }         

    </div>
  )
};



interface ContentProps {
  content: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>  
    {  
      props.content.map( (course) => {
        switch(course.name){            
          case "Fundamentals":
            return(<Part key={course.name} name={course.name} exerciseCount={course.exerciseCount} 
                  description={course.description}/>)

          case "Using props to pass data":
            return(<Part key={course.name} name={course.name}  exerciseCount={course.exerciseCount} 
              groupProjectCount={course.groupProjectCount} 
                />)

          case "Deeper type usage":
            return(<Part key={course.name} name={course.name} exerciseCount={course.exerciseCount} 
              description={course.description} exerciseSubmissionLink={course.exerciseSubmissionLink}/>
            )
          default:
            return assertNever(course);                 
        }
      })
   }
   </div>
 )
};


const Total: React.FC<ContentProps> = (props) => {
  return (
    <div>  
      {  
        <b>
          Number of exercises{" "}
          {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </b>
      }         
    </div>
  )
};


const App: React.FC = () => {
  const courseName = "Half Stack application development";

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  }
];

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));