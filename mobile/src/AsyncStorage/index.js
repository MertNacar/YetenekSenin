import AsyncStorage from "@react-native-community/async-storage";

export const getDataStorage = async () => {
  try {
    let value;
    value = await AsyncStorage.getItem("tokenJWT");
    if (value !== null) {
      return { value, err: false };
    } else {
      return { err: true };
    }
  } catch (e) {
    return {
      err: true
    };
  }
};

export const storeDataStorage = async token => {
  try {
    await AsyncStorage.setItem("tokenJWT", token);
    return { err: false };
  } catch (e) {
    return { err: true };
  }
};
