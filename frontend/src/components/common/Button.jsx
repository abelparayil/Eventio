const Button = ({ name, styleclass, onClick }) => {
  return (
    <button data onClick={onClick} className={styleclass + " py-2 px-4 "}>
      {name}
    </button>
  );
};

export default Button;
