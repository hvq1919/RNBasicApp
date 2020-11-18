import AsyncStorage from "@react-native-community/async-storage";

const sessionToken = "sessionToken";

const database = {
  async setSessionToken(data) {
    try {
      await AsyncStorage.setItem(sessionToken, data);
    } catch (error) {
      return;
    }
  },
  async getSessionToken(callback) {
    try {
      let data = await AsyncStorage.getItem(sessionToken);
      callback(data);
    } catch (error) {
      callback(null);
    }
  },

  logOut() {
    AsyncStorage.clear();
  },
};
export default database;
