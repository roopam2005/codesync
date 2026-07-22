// Wrapper for consistent tooltip styling using react-tooltip
import { Tooltip } from 'react-tooltip';

const TooltipWrapper = ({
  id,
  content,
  place = 'top',
  children,
}) => {
  return (
    <>
      <div data-tooltip-id={id} data-tooltip-content={content}>
        {children}
      </div>
      <Tooltip
        id={id}
        place={place}
        style={{
          backgroundColor: '#12121a',
          color: '#fff',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '16px',
          fontFamily: 'VT323, monospace',
          zIndex: 9999,
        }}
      />
    </>
  );
};

export default TooltipWrapper;