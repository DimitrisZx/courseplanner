import React from 'react'
// dalacin c 300mg algofren 600mg
const lessonDays = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή'];
const addExtraZero = num => num < 10 ? '0' : '';

const DayRowComponent = ({ dayName, availableHours }) => {
  const availableHoursGen = [];
  availableHoursGen.length = availableHours;
  availableHoursGen.fill(0);
  return (
    <tr>
      <th scope="row">{dayName}</th>
      {availableHoursGen.map((_, index) => <td key={index}>-</td>)}
    </tr>
  )
}

const genHours = (times) => {
  const timesToDo = [];
  timesToDo.length = times;
  timesToDo.fill(0)
  const arrayToReturn = timesToDo.map((_, index) =>
    <th key={index} scope={'col'}>{`${addExtraZero((index + 8))}${index + 8}:00`}</th>)
  return arrayToReturn;
}

const BottomPart = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">{'Ημέρα'}</th>
          {genHours(14)}
        </tr>
      </thead>
      <tbody>
        {
          lessonDays.map((day, index) =>
            <DayRowComponent
              key={index}
              dayName={day}
              availableHours={14}
            />)
        }
      </tbody>
    </table>
  )
}

export { BottomPart }
