import { useEffect, useState } from 'react'
import axios from 'axios'
import { HOST } from '../config'

const courseMax = 3

export default function WebForm({ notify }) {
  const [choiceA, setChoiceA] = useState('')
  const [choiceB, setChoiceB] = useState('')
  const [choiceC, setChoiceC] = useState('')
  const [calculusExist, setCalculusExist] = useState(false)
  const isCalculusInChoice = () => {
    const choicesVal = [choiceA, choiceB, choiceC]
    for (let i = 0; i < courseMax; i++) {
      if (choicesVal[i].toLowerCase() === 'calculus') {
        return true
      }
    }
    return false
  }

  const clearFields = () => {
    setChoiceA('')
    setChoiceB('')
    setChoiceC('')
  }

  const handleChoiceA = (event) => {
    setChoiceA((currentVal) => event.target.value)
  }

  const handleChoiceB = (event) => {
    setChoiceB((currentVal) => event.target.value)
  }

  const handleChoiceC = (event) => {
    setChoiceC((currentVal) => event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // store values to an object and submit
    let formData = {
      choiceA: choiceA.toLowerCase(),
      choiceB: choiceB.toLowerCase(),
      choiceC: choiceC.toLowerCase(),
    }

    try {
      const response = await axios.post(`/api/choices`, formData)
      if (response.status === 201) {
        notify(response.data.message, 'success')
        clearFields()
      }
    } catch (error) {
      notify(error, 'error')
    }
  }

  //called whenever choiceA, choiceB, choiceC changed
  useEffect(() => {
    setCalculusExist(() => isCalculusInChoice())
  }, [choiceA, choiceB, choiceC])

  return (
    <div className="w-11/12 max-w-3xl rounded-2xl bg-white p-20 sm:w-3/5 md:w-7/12 lg:w-1/2">
      <h1 className="mb-10 text-2xl font-bold">Just Webform</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center space-y-3 text-left"
      >
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
              onChange={handleChoiceC}
              value={choiceC}
            ></input>
          </label>
        </div>
        <div className="h-5 text-red-500">
          {calculusExist ? null : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              One of the choices has to be calculus
            </span>
          )}
        </div>
        <div className=" w-full">
          <button
            type="submit"
            className={`w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              !calculusExist ? 'cursor-not-allowed' : ''
            }`}
            disabled={!calculusExist}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
