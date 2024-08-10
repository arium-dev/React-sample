import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { TOOLTIP_PLACEMENT } from "../../../utils/Constants";

const ToolTip = ({
  placement = TOOLTIP_PLACEMENT.TOP,
  title = "",
  className = "",
  children,
}) => {
  const renderTooltip = (props) => <Tooltip {...props}>{title}</Tooltip>;

  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 100, hide: 200 }}
      overlay={renderTooltip}
      className={className}
    >
      <div>{children}</div>
    </OverlayTrigger>
  );
};

export default ToolTip;
