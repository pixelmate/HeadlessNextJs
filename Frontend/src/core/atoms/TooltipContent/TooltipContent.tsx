import { useTranslate } from 'hooks/useTranslate';
import { WarningIcon } from 'core/atoms/Icons/WarningIcon';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';

const TooltipContent = ({ message }: { message: string }): JSX.Element => {
  const { t } = useTranslate();
  return (
    <Form.Control.Feedback type="invalid" className="d-flex align-items-center ps-2 w-auto">
      <OverlayTrigger
        delay={{ hide: 250, show: 300 }}
        overlay={(props) => <Tooltip {...props}>{t(message)}</Tooltip>}
        placement="top"
      >
        <span>
          <WarningIcon className="cursor-pointer" />
        </span>
      </OverlayTrigger>
    </Form.Control.Feedback>
  );
};

export default TooltipContent;
