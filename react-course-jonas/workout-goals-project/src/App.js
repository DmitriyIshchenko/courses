const initilalProgram = [
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
  return (
    <div className="App">
      <SessionGoal />
      <SessionLog />
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
  return (
    <div>
      <h2>Today's goal:</h2>

      <ul>
        <li>Pushups: 3x50</li>
        <li>Leg raises: 3x30</li>
      </ul>
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
