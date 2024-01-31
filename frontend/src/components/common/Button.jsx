const Button = ({ name, bg }) => {
  return <button className={bg + " py-2 px-4 "}>{name}</button>;
};

export default Button;
