import { useState } from "react";

const initialProgram = [
  {
    day: "monday",
    isRestDay: false,
    exercises: [
      {
        exercise: "pushups",
        sets: 3,
        reps: 50,
      },
      {
        exercise: "leg raises",
        sets: 3,
        reps: 30,
      },
    ],
  },
  {
    day: "tuesday",
    isRestDay: false,
    exercises: [
      {
        exercise: "pullups",
        sets: 3,
        reps: 10,
      },
      {
        exercise: "squats",
        sets: 3,
        reps: 30,
      },
    ],
  },
  {
    day: "wednesday",
    isRestDay: false,
    exercises: [
      {
        exercise: "bridges",
        sets: 3,
        reps: 50,
      },
      {
        exercise: "twists",
        sets: 3,
        reps: 60,
      },
    ],
  },
  {
    day: "thursday",
    isRestDay: false,
    exercises: [
      {
        exercise: "pushups",
        sets: 3,
        reps: 50,
      },
      {
        exercise: "leg raises",
        sets: 3,
        reps: 30,
      },
    ],
  },
  {
    day: "friday",
    isRestDay: false,
    exercises: [
      {
        exercise: "pullups",
        sets: 3,
        reps: 10,
      },
      {
        exercise: "squats",
        sets: 3,
        reps: 30,
      },
    ],
  },
  {
    day: "saturday",
    isRestDay: false,
    exercises: [
      {
        exercise: "bridges",
        sets: 3,
        reps: 50,
      },
      {
        exercise: "twists",
        sets: 3,
        reps: 60,
      },
    ],
  },
  {
    day: "sunday",
    isRestDay: true,
    exercises: [],
  },
];

const initialSession = [
  { exercise: "pushups", sets: 1, reps: 50 },
  { exercise: "leg raises", sets: 1, reps: 30 },
];

export default function App() {
  const [sessionLog, setSessionLog] = useState(initialSession);

  return (
    <div className="App">
      <SessionGoal />
      <SessionLog exercises={sessionLog} />
      <FormAddExercise />
    </div>
  );
}

function SessionLog() {
  return (
    <div>
      <h2>Today's log</h2>
      <ul>
        <li>Pushups x50</li>
        <li>Leg raises x30</li>
      </ul>
    </div>
  );
}

function SessionGoal() {
  const [program, setProgram] = useState(initialProgram);

  const todayGoal = program[new Date().getDay()];

  return (
    <div>
      <h2>Today's goal:</h2>

      {todayGoal.isRestDay ? (
        <p>Rest day!</p>
      ) : (
        <ul>
          {todayGoal.exercises.map((exercise) => (
            <li key={exercise.exercise}>
              {`${exercise.exercise} ${exercise.sets}x${exercise.reps}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FormAddExercise() {
  return (
    <form>
      <h2>Add exercise</h2>

      <select>
        <option value="pushups">Pushups</option>
        <option value="pullups">pullups</option>
      </select>

      <input type="text" placeholder="reps" />

      <button>Log exercise</button>
    </form>
  );
}
