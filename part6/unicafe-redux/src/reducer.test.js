import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const goodAction = {
    type: 'GOOD'
  }
  const okAction = {
    type:'OK'
  }
  const badAction = {
    type: 'BAD'
  }
  const zeroAction = {
    type: 'ZERO'
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, goodAction)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, okAction)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, badAction)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('good, ok, bad are incremented', () => {
    const state = initialState
    deepFreeze(state)

    const newStateOne = counterReducer(state, goodAction)
    deepFreeze(newStateOne)

    const newStateTwo = counterReducer(newStateOne, okAction)
    deepFreeze(newStateTwo)

    const newStateThree = counterReducer(newStateTwo, badAction)

    expect(newStateThree).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
  })

  test('good, ok, bad are incremented then zeroed', () => {
    const state = initialState
    deepFreeze(state)

    const newStateOne = counterReducer(state, goodAction)
    deepFreeze(newStateOne)

    const newStateTwo = counterReducer(newStateOne, okAction)
    deepFreeze(newStateTwo)

    const newStateThree = counterReducer(newStateTwo, badAction)

    expect(newStateThree).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })

    deepFreeze(newStateThree)

    const zeroedState = counterReducer(newStateThree, zeroAction)

    expect(zeroedState).toEqual(initialState)
  })
})