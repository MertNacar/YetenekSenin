import React, { Component } from "react";
import { Text, View, DatePickerAndroid, Picker } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { editUser } from "../../../../src/store/user/userActionCreator";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { COLOR_PRIMARY } from "../../../../src/styles/const";
import moment from "moment";
import * as Http from "../../../../utils/httpHelper";
class UpdateOtherScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDay()
      },
      datePickerTitle: moment(this.props.getUser.birthday).calendar(),
      cities: [],
      data: {
        fCity: this.props.getUser.fCity,
        city: this.props.getUser.city,
        birthday: this.props.getUser.birthday,
        phone: this.props.getUser.phone,
        socialMedia: this.props.getUser.socialMedia
      },
      colors: {
        cityColor: COLOR_PRIMARY,
        birthdayColor: COLOR_PRIMARY,
        phoneColor: COLOR_PRIMARY
      },
      err: null
    };
  }

  saveOthers = () => {
    console.log("önce state", this.props.getUser);
    let data = this.setCityName();
    let newUser = {
      ...this.props.getUser,
      ...data
    };
    console.log("sonra state", newUser);
    this.props.editUser(newUser);
    Navigation.pop("ProfileScreen");
  };

  setCityName = () => {
    let { data, cities } = this.state;
    cities.find(item => {
      return item.code === data.fCity;
    });
    console.log(cities);
    data.city = cities[0].city;

    return data;
  };

  async componentDidMount() {
    try {
      let cities = await Http.getWithoutToken("/profile/city");
      console.log("h", cities);
      if (cities.err) throw new Error();
      else {
        this.setState({
          cities: [...cities.data]
        });
      }
    } catch (err) {
      console.log(err.message);
      return;
    }
  }

  phoneHandler = input => {
    let { data, colors } = this.state;
    let validate = validateRegex(typeRegex, input);
    if (validate) {
      this.setState({
        data: { ...data, phone: input },
        colors: { ...colors, phoneColor: "green" }
      });
    } else this.setState({ colors: { ...colors, phoneColor: "red" } });
  };

  pickerCityHandler = itemID => {
    let { colors, data } = this.state;
    if (itemID !== 0) {
      this.setState({
        data: { ...data, fCity: itemID },
        colors: { ...colors, cityColor: "green" }
      });
    } else {
      this.setState({
        data: { ...data, fCity: 0 },
        colors: { ...colors, cityColor: "red" }
      });
    }
  };

  createDate = (year, month, day) => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let calendar = moment({ year, month, day }).calendar();
    let birthday = moment({ year, month, day, hour, minute, second }).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    return { calendar, birthday };
  };

  DatePickerAndroid = async () => {
    let { date, data, colors } = this.state;
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        maxDate: new Date(date.year - 12, date.month, date.day),
        date: new Date(
          moment(date.birthday).year(),
          moment(date.birthday).month(),
          moment(date.birthday).day()
        )
      });
      if (action === DatePickerAndroid.dateSetAction) {
        let result = this.createDate(year, month, day);
        console.log("birthday", result.birthday);

        this.setState({
          datePickerTitle: result.calendar,
          data: { ...data, birthday: result.birthday },
          colors: { ...colors, birthdayColor: "green" }
        });
      } else if (action === DatePickerAndroid.dismissedAction) {
        this.setState({
          datePickerTitle: moment(data.birthday).calendar(),
          colors: { ...colors, birthdayColor: "green" }
        });
      } else throw new Error();
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  render() {
    let { colors, datePickerTitle, cities, data } = this.state;
    let validate =
      colors.birthdayColor === "green" &&
      colors.cityColor === "green" &&
      colors.phoneColor === "green";

    let cityList = cities.map((item, index) => {
      return (
        <Picker.Item
          key={index}
          label={`${item.code}-${item.city}`}
          value={item.code}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.rowSingle}>
          <Input
            placeholder="Phone"
            value={data.phone}
            underlineColorAndroid="transparent"
            leftIcon={<Icon name="phone" size={24} color={COLOR_PRIMARY} />}
            inputStyle={{ paddingLeft: 15, fontSize: 15 }}
            inputContainerStyle={{
              borderColor: COLOR_PRIMARY
            }}
            onChangeText={phone => this.phoneHandler(phone)}
          />
        </View>
        <View
          style={[
            styles.rowSingle,
            {
              borderBottomWidth: 2,
              borderColor: colors.cityColor
            }
          ]}
        >
          <View style={styles.cityIcon}>
            <Icon name="city" size={24} color={colors.cityColor}></Icon>
          </View>
          <View style={styles.cityPicker}>
            <Picker
              selectedValue={data.fCity}
              onValueChange={itemID => this.pickerCityHandler(itemID)}
            >
              <Picker.Item label="Şehir Seçiniz" value={0} />
              {cityList}
            </Picker>
          </View>
        </View>

        <View style={styles.rowItems}>
          <View style={styles.dateIcon}>
            <Icon name="birthday-cake" size={30} color={colors.birthdayColor} />
          </View>
          <View style={styles.datepicker}>
            <Button
              //buttonStyle={}
              title={datePickerTitle}
              onPress={() => this.DatePickerAndroid()}
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            style={{ opacity: 1 }}
            disabledStyle={{ opacity: 0.3, backgroundColor: COLOR_PRIMARY }}
            disabled={!validate}
            onPress={() => this.saveOthers()}
            title="Bitti"
          />
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    getUser: state.user
  };
};
mapDispatchToProps = dispatch => {
  return {
    editUser: user => dispatch(editUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateOtherScreen);
