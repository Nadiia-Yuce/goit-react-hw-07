import css from "./RequestError.module.css";

export default function RequestError() {
  return (
    <p
      className={css.requestError}
    >{`Oops... Something went wrong! Please, try again later :)`}</p>
  );
}
