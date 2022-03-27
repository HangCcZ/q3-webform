import { useState } from 'react'

const courseMax = 3
const courseMin = 1

export default function WebForm() {
  const [choiceA, setChoiceA] = useState('')
  const [choiceB, setChoiceB] = useState('')
  const [choiceC, setChoiceC] = useState('')
  const [numberOfCourses, setNumberOfCourses] = useState(1)
  const [calculusExist, setCalculusExist] = useState(false)

  const handleNumberOfCourses = (event) => {
    if (event.target.value >= 1 && event.target.value <= 3) {
      const setChoices = [setChoiceA, setChoiceB, setChoiceC]
      for (let i = event.target.value; i < courseMax; i++) {
        setChoices[i]('')
      }
    }
    setNumberOfCourses((currentVal) => event.target.value)
  }

  const checkCalculusExist = (oldInput, eventValue) => {
    const newInput = eventValue.toLowerCase()
    if (newInput === 'calculus') {
      setCalculusExist(() => true)
    } else if (
      oldInput.toLowerCase() === 'calculus' &&
      newInput !== 'calculus'
    ) {
      setCalculusExist(() => false)
    }
  }

  const handleChoiceA = (event) => {
    checkCalculusExist(choiceA, event.target.value)
    setChoiceA((currentVal) => event.target.value)
  }

  const handleChoiceB = (event) => {
    checkCalculusExist(choiceB, event.target.value)
    setChoiceB((currentVal) => event.target.value)
  }

  const handleChoiceC = (event) => {
    checkCalculusExist(choiceC, event.target.value)
    setChoiceC((currentVal) => event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // store values to an object and submit
    const choicesVal = [{ choiceA }, { choiceB }, { choiceC }]
    let formBody = { numberOfCourses, courseChoices: [] }
    for (let i = 0; i < numberOfCourses; i++) {
      formBody.courseChoices.push(choicesVal[i])
    }
  }

  return (
    <div className="w-11/12 max-w-3xl rounded-2xl bg-white p-20 sm:w-3/5 md:w-7/12 lg:w-1/2">
      <h1 className="mb-10 text-2xl font-bold">Just Webform</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center space-y-3 text-left"
      >
        <div className="w-full">
          <label>
            <span className="text-gray-600">Number of Courses:</span>
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-300 p-1 px-2 outline-none focus:border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Number of Courses Here"
              onChange={handleNumberOfCourses}
              value={numberOfCourses}
            ></input>
          </label>
          {numberOfCourses > courseMax ? (
            <span className="text-red-500">
              Number of courses cannot be more than {courseMax}
            </span>
          ) : null}
          {numberOfCourses < courseMin ? (
            <span className="text-red-500">
              Number of courses cannot be less than {courseMin}
            </span>
          ) : null}
        </div>
        <div className="w-full">
          <label>
            <span className="text-gray-600">Choice A:</span>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 p-1 px-2 outline-none focus:border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your Course Here"
              onChange={handleChoiceA}
              value={choiceA}
            ></input>
          </label>
        </div>

        <div className="w-full">
          <label>
            <span className="text-gray-600">Choice B:</span>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 p-1 px-2 outline-none focus:border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your Course Here"
              disabled={numberOfCourses >= 2 ? false : true}
              onChange={handleChoiceB}
              value={choiceB}
            ></input>
          </label>
        </div>
        <div className="w-full">
          <label>
            <span className="text-gray-600">Choice C:</span>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 p-1 px-2 outline-none focus:border-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your Course Here"
              disabled={numberOfCourses >= 3 ? false : true}
              onChange={handleChoiceC}
              value={choiceC}
            ></input>
          </label>
        </div>
        <div className="h-5 text-red-500">
          {calculusExist
            ? null
            : 'Please make sure atleast one of the choices is calculus'}
        </div>
        <div className=" w-full">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={
              numberOfCourses < courseMin ||
              numberOfCourses > courseMax ||
              !calculusExist
            }
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
