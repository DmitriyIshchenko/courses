import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "orangered",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "yellow",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "mediumseagreen",
  },
  {
    skill: "React",
    level: "beginner",
    color: "paleturquoise",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar avatarSrc="avatar.jpg" />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return <img src={props.avatarSrc} alt="avatar" className="avatar" />;
}

function Intro() {
  return (
    <div>
      <h1>Dmitry Ishchenko</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sed
        doloremque repellat ratione suscipit enim repudiandae! Sint tempora vel,
        sed exercitationem reiciendis eaque aut rem cum omnis? Voluptatum, fuga
        accusamus.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <ul className="skill-list">
      {skills.map((skill) => (
        <Skill
          skill={skill.skill}
          level={skill.level}
          color={skill.color}
          key={skill.skill}
        />
      ))}
    </ul>
  );
}

function Skill({ skill, level, color }) {
  const emojis = {
    beginner: "👶",
    intermediate: "👍",
    advanced: "💪",
  };
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      <span>{skill}</span>
      <span>{emojis[level]}</span>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
