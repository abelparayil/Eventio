const Button = ({ name, styleclass }) => {
  return <button className={styleclass + " py-2 px-4 "}>{name}</button>;
};

export default Button;
