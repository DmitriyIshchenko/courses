import { useState } from "react";

const initialProgram = [
  {
    day: "monday",
    isRestDay: false,
    exercises: [
      {
        name: "pushups",
        sets: 3,
        reps: 50,
      },
      {
        name: "leg raises",
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
        name: "pullups",
        sets: 3,
        reps: 10,
      },
      {
        name: "squats",
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
        name: "bridges",
        sets: 3,
        reps: 50,
      },
      {
        name: "twists",
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
        name: "pushups",
        sets: 3,
        reps: 50,
      },
      {
        name: "leg raises",
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
        name: "pullups",
        sets: 3,
        reps: 10,
      },
      {
        name: "squats",
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
        name: "bridges",
        sets: 3,
        reps: 50,
      },
      {
        name: "twists",
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
  { name: "pushups", sets: 1, reps: 50 },
  { name: "leg raises", sets: 1, reps: 30 },
];

export default function App() {
  const [sessionLog, setSessionLog] = useState(initialSession);
  const [program, setProgram] = useState(initialProgram);

  const handleAddExercise = (newExercise) => {
    console.log(newExercise);
  };

  return (
    <div className="App">
      <SessionGoal program={program} />
      <SessionLog exercises={sessionLog} />
      <FormAddExercise program={program} onAddExercise={handleAddExercise} />
    </div>
  );
}

function SessionLog({ exercises }) {
  return (
    <div>
      <h2>Today's log</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.name}>
            {exercise.name} x{exercise.reps}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SessionGoal({ program }) {
  const todayGoal = program[new Date().getDay()];

  return (
    <div>
      <h2>Today's goal:</h2>

      {todayGoal.isRestDay ? (
        <p>Rest day!</p>
      ) : (
        <ul>
          {todayGoal.exercises.map((exercise) => (
            <li key={exercise.name}>
              {`${exercise.name} ${exercise.sets}x${exercise.reps}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FormAddExercise({ program, onAddExercise }) {
  const [selectedExercise, setSelectedExercise] = useState("pushups");
  const [reps, setReps] = useState("");

  const exerciseNames = [
    ...new Set(
      program
        .map((day) => day.exercises.map((exercise) => exercise.name))
        .flat()
    ),
  ];

  return (
    <form>
      <h2>Add exercise</h2>

      <select
        value={selectedExercise}
        onChange={(e) => setSelectedExercise(e.target.value)}
      >
        {exerciseNames.map((exercise) => (
          <option value={exercise} key={exercise}>
            {exercise}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="reps"
        value={reps}
        onChange={(e) => setReps(+e.target.value)}
      />

      <button>Log exercise</button>
    </form>
  );
}
