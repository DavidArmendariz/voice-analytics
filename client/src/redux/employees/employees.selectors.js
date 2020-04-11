import { createSelector } from 'reselect';

const selectEmployeesFromStore = store => store.employees;

export const selectEmployees = createSelector(
  [selectEmployeesFromStore],
  employees => employees.employees
);

export const selectEmployeesAsTable = createSelector(
  [selectEmployees],
  employees => employees ? employees.map(({uid, name, score}) => ({uid, name, score})) : null
);