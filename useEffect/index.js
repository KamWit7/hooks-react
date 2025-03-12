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

  const useEffect = (callback, dependencies) => {
    let hasChanged = true

    const oldDependencies = state[hooksIndex]

    if (oldDependencies) {
      hasChanged = false

      dependencies.forEach((dependency, index) => {
        const oldDependency = oldDependencies[index]

        const areTheSame = Object.is(dependency, oldDependency)

        if (!areTheSame) {
          hasChanged = true
        }
      })
    }

    if (hasChanged) {
      callback()
    }

    // store dependencies in last index
    state[hooksIndex] = dependencies
    hooksIndex++
  }

  return {
    useEffect,
    useState,
    resetIndex,
  }
}

const { useState, resetIndex, useEffect } = ReactHooks()

const CountComponent = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect:', count)
  }, [count])

  useEffect(() => {
    console.log('ONCE useEffect:', count)
  }, [])

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
