const Header = ({course}) => {
    return <h1>{course.name}</h1>
  }
  
  const Total = ({course}) => {
    const exercises = course.parts.map(part => part.exercises)
    const result = exercises.reduce((number1, number2) => number1 + number2)
    return <div><p>Number of exercises {result}</p></div>
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({course}) => {
    const parts = course.parts
    const result = parts.map(part => 
      <Part name={part.name} exercises={part.exercises} key={part.id}/>
    )
    return (
      <div>
        {result}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
      </div>
    )
  }

export default Course