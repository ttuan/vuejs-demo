# Vuex

## Why we need Vuex

+ Never update state directly, without calling a mutation
    Store's state to access the data, and a mutation to update state

    Mutations are wrappers around individual state changes, that make them easy
    to track and debug

+ Like computed properties, getters always track their own dependencies and
    automatically update when dependency changed

+ Action are also responsible for the logic of when a mutation should be fired.
    Action decide when a mutation should fire
    Mutations are always the ones reponsible for state changes, Never change the
    state directly in an action

=> We decouple our components from the API logic
