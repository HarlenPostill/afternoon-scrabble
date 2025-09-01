import { useGame } from "@/context/GameContext";
import { router } from "expo-router";
import * as React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IntroScreen = () => {
  const { loadSavedGame } = useGame();
  const [useCustomNames, setUseCustomNames] = React.useState(false);

  const handleResumeGame = async () => {
    const hasGame = await loadSavedGame();
    if (hasGame) {
      router.replace("/(game)/activeGame");
    }
  };

  const handleStartNewGame = () => {
    router.push({
      pathname: "/(game)/newGame",
      params: { useCustomNames: useCustomNames ? "1" : "0" },
    });
  };

  return (
    <SafeAreaView style={[styles.introScreen, styles.buttonFlexBox]}>
      <Image
        source={require("../assets/icon.png")}
        style={{ width: 150, height: 150, borderRadius: 20 }}
      />
      <Text style={[styles.title, styles.titleTypo]}>Afternoon Scrabble</Text>
      <TouchableOpacity
        style={[styles.button, styles.buttonFlexBox]}
        onPress={handleStartNewGame}
      >
        <Text style={[styles.newGame, styles.titleTypo]}>New game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonFlexBox]}
        onPress={handleResumeGame}
      >
        <Text style={[styles.newGame, styles.titleTypo]}>Resume Game</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          marginTop: 16,
          marginBottom: 8,
          padding: 10,
          backgroundColor: "#feeef1",
          borderRadius: 8,
        }}
        onPress={() => setUseCustomNames((prev) => !prev)}
      >
        <Text style={{ color: "#dc7480", fontWeight: "500", fontSize: 16 }}>
          {useCustomNames
            ? "Use default Player names"
            : "Use Amelie, Harlen, Josie, Ari, Fletcher"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          position: "absolute",
          textAlign: "right",
          right: 20,
          opacity: 0.2,
          bottom: 40,
        }}
      >
        Release version 1.2
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  titleTypo: {
    textAlign: "left",
    color: "#000",
    fontFamily: "SF Pro Display",
    textTransform: "capitalize",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  newGame: {
    fontSize: 22,
    fontWeight: "500",
  },
  button: {
    alignSelf: "stretch",
    borderRadius: 10,
    backgroundColor: "#f7b6c1",
    borderStyle: "solid",
    borderColor: "#dc7480",
    borderBottomWidth: 2,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  introScreen: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 844,
    paddingHorizontal: 24,
    paddingVertical: 0,
    gap: 16,
  },
});

export default IntroScreen;
