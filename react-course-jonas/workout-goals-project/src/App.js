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
  { name: "pushups", reps: 50 },
  { name: "pushups", reps: 50 },
  { name: "leg raises", reps: 30 },
];

export default function App() {
  const [sessionLog, setSessionLog] = useState(initialSession);
  const [program, setProgram] = useState(initialProgram);

  const handleAddExercise = (newExercise) => {
    setSessionLog((curLog) => [...curLog, newExercise]);
  };

  return (
    <div className="App">
      <SessionGoal program={program} exercises={sessionLog} />
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
        {exercises.map((exercise, i) => (
          <li key={`${exercise.name}-set${i}`}>
            {exercise.name} x{exercise.reps}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SessionGoal({ program, exercises }) {
  const todayProgram = program[new Date().getDay()];

  if (todayProgram.isRestDay) {
    return (
      <div>
        <h2>Today's goal:</h2>
        <p>Rest!</p>
      </div>
    );
  }

  const performed = exercises.reduce(
    (acc, exercise) => ({
      ...acc,
      [exercise.name]: acc[exercise.name] + exercise.reps || exercise.reps,
    }),
    {}
  );

  const goal = todayProgram.exercises.reduce(
    (acc, exercise) => ({
      ...acc,
      [exercise.name]:
        (acc[exercise.name] += exercise.sets * exercise.reps) ||
        exercise.sets * exercise.reps,
    }),
    {}
  );

  const percentage = Math.floor(
    Object.keys(goal)
      .map((exercise) => (performed[exercise] / goal[exercise]) * 100 || 0)
      .reduce((acc, cur, _, arr) => acc + cur / arr.length, 0)
  );

  const message =
    percentage === 0
      ? "Let's start exercising!"
      : percentage < 100
      ? `You have accomplished ${percentage}% of today's goal! Keep it up!`
      : "You accomplished today's goal! Good job!";

  return (
    <div>
      <h2>Today's goal:</h2>

      <ul>
        {todayProgram.exercises.map((exercise) => (
          <li key={exercise.name}>
            {`${exercise.name} ${exercise.sets}x${exercise.reps}`}
          </li>
        ))}
      </ul>

      <p>{message}</p>
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExercise = {
      name: selectedExercise,
      reps,
    };

    onAddExercise(newExercise);

    setSelectedExercise("pushups");
    setReps("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
