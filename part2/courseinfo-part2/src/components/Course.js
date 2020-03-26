import React from "react";

const Header = ({ courseName }) => (
  <>
    <h1>{courseName}</h1>
  </>
)

const Part = ({ name, exercises }) => (
  <>
    <p>{name} {exercises}</p>
  </>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)}
    <Total parts={parts} />
  </>
)

const Total = ({ parts }) => (
  <>
    <h3>total of {parts.reduce((result, item) => result + item.exercises, 0)} exercises</h3>
  </>
)

const Course = ({ course }) => (
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
  </>
)

export default Course;
