const ReactHooks = () => {
  let state = []
  let hooksIndex = 0

  const useState = (initialState) => {
    const currentIndex = hooksIndex
    hooksIndex++

    if (state[currentIndex] === undefined) {
      state[currentIndex] = initialState
    }

    const setState = (newState) => {
      state[currentIndex] = newState
    }

    return [state[currentIndex], setState]
  }

  const resetIndex = () => {
    hooksIndex = 0
  }

  return {
    useState,
    resetIndex,
  }
}

const { useState, resetIndex } = ReactHooks()

const CountComponent = () => {
  const [count, setCount] = useState(0)

  return {
    add: () => {
      setCount(count + 1)
      console.log('add:', count)
    },
    subtract: () => {
      setCount(count - 1)
      console.log('sub:', count)
    },
    count,
  }
}

const updateHTML = (count) => {
  document.getElementById('add-button').innerText = count
  document.getElementById('subtract-button').innerText = count
}

const buttonAdd = () => {
  const { add, count } = CountComponent()
  add()
  resetIndex()

  updateHTML(count)
}

const buttonSubtract = () => {
  const { subtract, count } = CountComponent()
  subtract()
  resetIndex()

  updateHTML(count)
}
