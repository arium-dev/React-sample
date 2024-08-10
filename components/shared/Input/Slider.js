import ReactSlider from "react-slider";

const Slider = ({
  disabled = false,
  min = 0,
  max = 100,
  value = 0,
  onChange = () => {},
  className = "",
}) => {
  return (
    <div className="slider-wrapper">
      <ReactSlider
        disabled={disabled}
        min={min}
        max={max}
        value={value}
        className={`progress-slider ${className}`}
        onChange={onChange}
        renderThumb={(props, state) => {
          let style = props.style;
          let left = parseInt(state.valueNow) || 0;
          let val = state.valueNow / 40;
          left = left - (left * val) / 100;
          style = {
            ...style,
            left: `${left - 1}%`,
            right: "unset",
          };
          props = {
            ...props,
            style,
          };

          return <div {...props}>{state.valueNow}</div>;
        }}
        renderTrack={(props, state) => {
          let style = props.style;
          if (props.key === "track-0") {
            style = {
              ...style,
              left: 0,
              right: "unset",
              width: `${state.value}%`,
            };
          }
          if (props.key === "track-1") {
            let left = props.style.left || 0;
            let val = state.value / 45;
            left = left + (left * val) / 100;
            style = {
              ...style,
              left,
              right: "unset",
            };
          }
          props = {
            ...props,
            style,
          };
          return <div {...props} />;
        }}
      />
    </div>
  );
};

export default Slider;
