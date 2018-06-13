import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import { lightTheme, darkTheme, alternativeTheme } from './Themes';
import NavigationBar from './NavigationBar';
import Preferences from './Preferences';
import getWeekEvents from './BackendConnection';
import germanLang from './Texts_de';
import englishLang from './Texts_en';

export default class App extends React.Component {
  raplaLink = window.localStorage.getItem('raplaLink');

  constructor(props) {
    super(props);

    if (this.raplaLink === null) {
      // TODO: Onboarding
    }

    let weekStartsOnMonday = window.localStorage.getItem('weekStartsOnMonday');
    if (weekStartsOnMonday === null) {
      weekStartsOnMonday = true;
    } else {
      weekStartsOnMonday = weekStartsOnMonday === true;
    }

    // TODO: Set week starting day in moment js

    moment.locale(window.localStorage.getItem('mmtLocale') || 'de');

    const languageSetting = window.localStorage.getItem('language') || 'german';

    this.state = {
      theme: this.getTheme(window.localStorage.getItem('theme')) || darkTheme,
      displayDate: moment(),
      preferencesOpen: false,
      datePickerOpen: false,
      weekStartsOnMonday,
      languageSetting,
      language: languageSetting === 'german' ? germanLang : englishLang,
    };
  }

  setWeekStartsOnMonday = (weekStartsOnMonday) => {
    window.localStorage.setItem('weekStartsOnMonday', weekStartsOnMonday ? 'true' : 'false');
    this.setState({ weekStartsOnMonday });
  }

  getLanguage = (languageString) => {
    return languageString === 'german' ? germanLang : englishLang;
  };

  setLanguage = (languageString) => {
    const mmtLocale = languageString === 'german' ? 'de' : 'en';
    window.localStorage.setItem('mmtLocale', mmtLocale);
    moment.locale(mmtLocale);
    // force rebuild the moment to apply the new locale
    const d = this.state.displayDate;
    window.localStorage.setItem('language', languageString);
    this.setState({
      displayDate: moment(`${d.month() + 1}-${d.date()}-${d.year()}`, 'MM-DD-YYYY'),
      languageSetting: languageString,
      language: this.getLanguage(languageString),
    });
  }

  getTheme = (themeString) => {
    if (themeString === 'dark') {
      return darkTheme;
    }
    return themeString === 'light' ? lightTheme : alternativeTheme;
  };

  setTheme = (themeString) => {
    const theme = this.getTheme(themeString);
    window.localStorage.setItem('theme', themeString);
    this.setState({ theme });
  }

  getThemeString = (theme) => {
    if (theme === darkTheme) {
      return 'dark';
    } else if (theme === lightTheme) {
      return 'light';
    }
    return 'alternative';
  }

  setDisplayDate = (displayDate) => {
    // TODO: Fetch event data
    this.setState({ displayDate });
  }

  doRefresh = () => {
    getWeekEvents(this.state.url, this.state.displayDate,
      this.onGetDone, this.onGetFail);
  }

  showPreferences = () => {
    this.setState({ preferencesOpen: true });
  }

  hidePreferences = () => {
    this.setState({ preferencesOpen: false });
  }

  showDatePicker = () => {
    this.setState({ datePickerOpen: true });
  }

  hideDatePicker = () => {
    this.setState({ datePickerOpen: false });
  }

  setLink = (link) => {
    this.raplaLink = link;
    window.localStorage.setItem('raplaLink', link);
    this.setState({ displayDate: moment() });
    this.doRefresh();
  }

  onGetDone = () => {

  }

  onGetFail = () => {

  }

  render() {
    const { displayDate, theme, preferencesOpen, weekStartsOnMonday,
      languageSetting, language } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <NavigationBar
            language={language}
            displayDate={displayDate}
            setDisplayDate={this.setDisplayDate}
            doRefresh={this.doRefresh}
            darkFont={theme === lightTheme}
            showPreferences={this.showPreferences}
            showDatePicker={this.showDatePicker}
          />
          <Preferences
            language={language}
            open={preferencesOpen}
            setTheme={this.setTheme}
            theme={this.getThemeString(theme)}
            setLanguage={this.setLanguage}
            languageSetting={languageSetting}
            weekStartsOnMonday={weekStartsOnMonday}
            setWeekStartsOnMonday={this.setWeekStartsOnMonday}
            raplaLink={this.raplaLink}
            setLink={this.setLink}
            hidePreferences={this.hidePreferences}
          />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
