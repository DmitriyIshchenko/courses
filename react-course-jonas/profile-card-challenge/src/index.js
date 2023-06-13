import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

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
  return <div></div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
