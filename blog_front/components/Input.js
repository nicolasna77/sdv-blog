import classNames from "classnames";

const Input = (props) => {
  const { className, ...otherProps } = props;

  return (
    <input
      {...otherProps}
      className={classNames(
        "block mt-2 border-2 border-slate-200 w-1/2 py-1 px-2",
        props.className
      )}
    />
  );
};

export default Input;
