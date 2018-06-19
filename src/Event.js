import React from 'react';
import PropTypes from 'prop-types';
import Dotdotdot from 'react-dotdotdot';

export default class Event extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { style, theme } = this.props;
    const eventStyle = {
      backgroundColor: theme.palette.primary.main,
      boxShadow: `1.5px 2px 5px 1px ${theme.palette.primary.dark}`,
      ...style,
    };

    return (<div className="event" style={eventStyle}>
        <Dotdotdot clamp={1}><p className="event-time" style={{ color: theme.palette.primary.contrastText }}>08:00 - 12:00</p></Dotdotdot>
        <Dotdotdot clamp={2}><p className="event-title" style={{ color: theme.palette.primary.contrastText }}>Very Long Lineare Algebra</p></Dotdotdot>
        <Dotdotdot className="event-description-wrapper" clamp={1}><p className="event-description" style={{ color: theme.palette.primary.contrastText }}>Ein tolles Fach. Oskar Dunkeldich</p></Dotdotdot>
    </div>);
  }
}

Event.propTypes = {
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

Event.defaultProps = {
  style: {},
};
