const Button = ({ name, bg }) => {
  return <button className={bg + " py-1 px-4 rounded"}>{name}</button>;
};

export default Button;
