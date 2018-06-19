import React from 'react';
import PropTypes from 'prop-types';

export default function SideTimeView(props) {
  const { start, end, theme, navbarHeight } = props;
  const lines = end - start + 1;
  return (
    <div>
      <div
        className="sidetimesview-times-container"
        style={{
          backgroundColor: theme.palette.primary.light,
          top: `${navbarHeight + 31}px`, // 64px navbar + 31px dayheader
        }}
      >
        {Array(lines).fill().map((_, i) => {
          return (
              <span
                className="sidetimesview-time"
                key={`time${i}`}
                style={{
                  color: theme.palette.primary.dark,
                  top: `calc(${(100 / lines) * i}% - 6.5px)`,
                  // top: `calc(((100vh - 31px) / ${lines}) * ${i} - 6.5px + 31px)`,
                }}
              >{i + start}</span>
          );
        })}
      </div>
      {Array(lines).fill().map((_, i) => {
        return (
          <span
            className="sidetimesview-line"
            key={`line${i}`}
            style={{
              backgroundColor: theme.palette.primary.dark,
              top: `calc(${(100 / lines) * i}% + ${31 + navbarHeight}px)`,
              // top: `calc(((100vh - 31px) / ${lines}) * ${i} + 64px + 31px)`,
            }}
          />
        );
      })}
    </div>
  );
}

SideTimeView.propTypes = {
  navbarHeight: PropTypes.number.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
  theme: PropTypes.object.isRequired,
};

SideTimeView.defaultProps = {
  start: 7,
  end: 19,
};
