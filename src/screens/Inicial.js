// Tela de splash / carregamento inicial do app — a única onde a logo do
// NeuroPulse aparece. Mostra uma barra de progresso animada e, ao terminar,
// navega automaticamente para a tela de Login.

// Imports de componentes do React Native e da paleta de cores.
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated, SafeAreaView, StatusBar } from "react-native";
import colors from "../theme/colors";

export default function Inicial({ navigation }) {
  // Valor animado (0 a 1) que controla a largura da barra de progresso.
  const progress = useRef(new Animated.Value(0)).current;

  // Dispara a animação ao montar a tela e navega para o Login ao terminar.
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate("Login");
    });
  }, []);

  // Converte o valor animado (0 a 1) em uma largura de 8% a 100%.
  const widthInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["8%", "100%"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.splashBg} />

      {/* Logo e subtítulo, centralizados na tela. */}
      <View style={styles.center}>
        <Image
          source={require("../../assets/imagens/LogoNrP.png")}
          style={{ width: 260, height: 200 }}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Seu bem-estar{"\n"}em sintonia</Text>
      </View>

      {/* Barra de progresso animada + texto "Carregando...". */}
      <View style={styles.bottom}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: widthInterpolate }]} />
        </View>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    </SafeAreaView>
  );
}

// Estilos desta tela.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.splashBg },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  subtitle: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: colors.navy,
    textAlign: "center",
    lineHeight: 28,
  },
  bottom: { paddingHorizontal: 60, paddingBottom: 50 },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E7DFCB",
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.orange, borderRadius: 2 },
  loadingText: { marginTop: 10, textAlign: "center", color: colors.muted, fontSize: 13 },
});
