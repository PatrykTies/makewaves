import {backgroundColor} from '@shopify/restyle';
import _ from 'lodash';
import React, {Component} from 'react';
import {
  Platform,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from 'react-native-calendars';
import {Text as ThemeText, Box, Card} from '../../theme';

const testIDs = {
  menu: {
    CONTAINER: 'menu',
    CALENDARS: 'calendars_btn',
    CALENDAR_LIST: 'calendar_list_btn',
    HORIZONTAL_LIST: 'horizontal_list_btn',
    AGENDA: 'agenda_btn',
    EXPANDABLE_CALENDAR: 'expandable_calendar_btn',
    WEEK_CALENDAR: 'week_calendar_btn',
  },
  calendars: {
    CONTAINER: 'calendars',
    FIRST: 'first_calendar',
    LAST: 'last_calendar',
  },
  calendarList: {CONTAINER: 'calendarList'},
  horizontalList: {CONTAINER: 'horizontalList'},
  agenda: {
    CONTAINER: 'agenda',
    ITEM: 'item',
  },
  expandableCalendar: {CONTAINER: 'expandableCalendar'},
  weekCalendar: {CONTAINER: 'weekCalendar'},
};

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(0); //was 3
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

// this generates array od days in format that calendar wants
// ['2019-06-01','2019-06-01','2019-06-01','2019-06-01']
function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - 864e5 * days).toISOString().split('T')[0];
}

const ITEMS = [
  {
    title: '2021-03-29',
    data: [
      {hour: '4', duration: 'Worked on bugs', title: 'BAU'},
      {hour: '32', duration: 'Worked on checkout /pay page', title: 'CHECKOUT'},
    ],
  },
  {
    title: '2021-04-05',
    data: [
      {hour: '4pm', duration: '7d', title: 'Pilates ABC'},
      {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'},
    ],
  },
  {
    title: '2021-04-12',
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Streches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'},
    ],
  },
  {
    title: '2021-04-19',
    data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}],
  },
  {title: '2021-04-26', data: [{}]},
  {
    title: dates[5],
    data: [
      {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'},
    ],
  },
  {
    title: dates[6],
    data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}],
  },
  {title: dates[7], data: [{}]},
  {
    title: dates[8],
    data: [
      {hour: '9pm', duration: '1h', title: 'Pilates Reformer'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'},
    ],
  },
  {
    title: dates[9],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Streches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'},
    ],
  },
  {
    title: dates[10],
    data: [{hour: '12am', duration: '1h', title: 'Last Yoga'}],
  },
];

export default class ExpandableCalendarScreen extends Component {
  onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  buttonPressed() {
    Alert.alert('show more');
  }

  itemPressed(id) {
    Alert.alert(id);
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity
        onPress={() => this.itemPressed(item.title)}
        style={styles.item}
        testID={testIDs.agenda.ITEM}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Card
          variant="shadow_md"
          justifyContent="center"
          alignItems="center"
          backgroundColor="yellow">
          <Text style={styles.itemTitleText}>{item.title}</Text>
        </Card>

        <View style={styles.itemButtonContainer}>
          <Button color={'grey'} title={'Edit'} onPress={this.buttonPressed} />
        </View>
      </TouchableOpacity>
    );
  };

  getMarkedDates = () => {
    const marked = {};
    ITEMS.forEach(item => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      } else {
        marked[item.title] = {disabled: true};
      }
    });
    return marked;
  };

  getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: 'white',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
    };
  };

  render() {
    const {width, height: wHeight} = Dimensions.get('window');
    return (
      <SafeAreaView
        height={
          wHeight - (Platform.OS === 'android' ? StatusBar.currentHeight : 0)
        }>
        <CalendarProvider
          date={ITEMS[0].title}
          onDateChanged={this.onDateChanged}
          onMonthChange={this.onMonthChange}
          showTodayButton
          disabledOpacity={0.6}
          // theme={{
          //   todayButtonTextColor: themeColor
          // }}
          // todayBottomMargin={16}
        >
          {this.props.weekView ? (
            <WeekCalendar
              testID={testIDs.weekCalendar.CONTAINER}
              firstDay={1}
              markedDates={this.getMarkedDates()}
            />
          ) : (
            <ExpandableCalendar
              testID={testIDs.expandableCalendar.CONTAINER}
              // horizontal={false}
              // hideArrows
              //disablePan
              //hideKnob
              initialPosition={ExpandableCalendar.positions.OPEN}
              // calendarStyle={styles.calendar}
              // headerStyle={styles.calendar} // for horizontal only
              // disableWeekScroll
              // theme={this.getTheme()}
              disableAllTouchEventsForDisabledDays
              firstDay={1} //this makes Monday as first day to display
              //markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
              leftArrowImageSource={require('../../assets/previous.png')}
              rightArrowImageSource={require('../../assets/next.png')}
              markedDates={markedWeeks}
              // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
              markingType={'period'}
            />
          )}
          <AgendaList
            sections={ITEMS}
            extraData={this.state}
            renderItem={this.renderItem}
            // sectionStyle={styles.section}
          />
        </CalendarProvider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

const markedWeeks = {
  '2021-03-29': {
    selected: true,
    startingDay: true,
    color: 'lightgrey',
  },
  '2021-03-30': {
    selected: true,
    color: 'lightgrey',
  },
  '2021-03-31': {
    selected: true,
    color: 'lightgrey',
  },
  '2021-04-01': {
    selected: true,
    color: 'lightgrey',
  },
  '2021-04-02': {
    selected: true,
    color: 'lightgrey',
  },
  '2021-04-03': {
    selected: true,
    color: 'lightgrey',
  },
  '2021-04-04': {
    selected: true,
    endingDay: true,
    color: 'lightgrey',
  },
  '2021-04-05': {
    selected: true,
    startingDay: true,
    color: '#f6b688',
  },
  '2021-04-06': {
    selected: true,
    color: '#f6b688',
  },
  '2021-04-07': {
    selected: true,
    color: '#f6b688',
  },
  '2021-04-08': {
    selected: true,
    color: '#f6b688',
  },
  '2021-04-09': {
    selected: true,
    color: '#f6b688',
  },
  '2021-04-10': {
    selected: true,
    color: '#f6b688',
  },
  '2021-04-11': {
    selected: true,
    endingDay: true,
    color: '#f6b688',
  },
  '2021-04-12': {
    selected: true,
    startingDay: true,
    color: '#83AF9B',
  },
  '2021-04-13': {
    selected: true,
    color: '#83AF9B',
  },
  '2021-04-14': {
    selected: true,
    color: '#83AF9B',
  },
  '2021-04-15': {
    selected: true,
    color: '#83AF9B',
  },
  '2021-04-16': {
    selected: true,
    color: '#83AF9B',
  },
  '2021-04-17': {
    selected: true,
    color: '#83AF9B',
  },
  '2021-04-18': {
    selected: true,
    endingDay: true,
    color: '#83AF9B',
  },
};
