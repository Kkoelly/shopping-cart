export function Error(props) {
    if (props.error === "") return <></>;
    return <div className="error">{props.error}</div>;
  }