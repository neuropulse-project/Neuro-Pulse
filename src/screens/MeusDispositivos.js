// Tela de busca de dispositivos Bluetooth próximos. Mostra uma animação de
// radar (círculos concêntricos pulsando) e a lista de smartbands
// encontradas; a pessoa escolhe uma e toca em "Conectar".

// Imports de componentes, animação, ícones e estilos compartilhados.
import { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Dispositivos encontrados (mock — viria de uma varredura Bluetooth real).
const DISPOSITIVOS = [
  { id: "1", nome: "NeuroPulse Band 032", bateria: 82, local: "próxima", sinal: 3 },
  { id: "2", nome: "NeuroPulse Band 018", bateria: 64, local: "sala ao lado", sinal: 1 },
];

// Um anel do radar: escala e desaparece em loop, com atraso próprio.
function AnelRadar({ atraso }) {
  const progresso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.delay(atraso),
        Animated.timing(progresso, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(progresso, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    animacao.start();
    return () => animacao.stop();
  }, []);

  const escala = progresso.interpolate({ inputRange: [0, 1], outputRange: [1, 2.4] });
  const opacidade = progresso.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });

  return (
    <Animated.View
      style={[
        localStyles.anel,
        { transform: [{ scale: escala }], opacity: opacidade },
      ]}
    />
  );
}

// Barrinhas de sinal (1 a 3): mais barras acesas = sinal mais forte.
function BarrasSinal({ nivel }) {
  return (
    <View style={localStyles.sinalRow}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={[
            localStyles.sinalBarra,
            { height: 5 + i * 3, backgroundColor: i <= nivel ? colors.zen : colors.border },
          ]}
        />
      ))}
    </View>
  );
}

export default function MeusDispositivos({ navigation }) {
  // Dispositivo atualmente selecionado na lista (afeta o botão "Conectar").
  const [selecionado, setSelecionado] = useState(DISPOSITIVOS[0].id);
  const dispositivoAtivo = DISPOSITIVOS.find((d) => d.id === selecionado);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar. */}
      <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()} hitSlop={10}>
        <Text style={styles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={localStyles.scroll} showsVerticalScrollIndicator={false}>
        {/* Radar animado com o ícone do dispositivo no centro. */}
        <View style={localStyles.radarWrap}>
          <AnelRadar atraso={0} />
          <AnelRadar atraso={600} />
          <AnelRadar atraso={1200} />
          <View style={localStyles.radarCenter}>
            <Ionicons name="watch-outline" size={26} color={colors.white} />
          </View>
        </View>

        <Text style={localStyles.titulo}>Procurando dispositivos</Text>
        <Text style={localStyles.subtitulo}>
          Deixe sua NeuroPulse Band por perto e com o Bluetooth ativado.
        </Text>

        {/* Lista de dispositivos encontrados, tocável para selecionar. */}
        <View style={{ width: "100%", marginTop: 26 }}>
          {DISPOSITIVOS.map((dispositivo) => {
            const ativo = dispositivo.id === selecionado;
            return (
              <TouchableOpacity
                key={dispositivo.id}
                style={[localStyles.deviceRow, ativo && localStyles.deviceRowActive]}
                onPress={() => setSelecionado(dispositivo.id)}
              >
                <View style={localStyles.deviceIcon}>
                  <Ionicons name="watch-outline" size={18} color={colors.navy} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={localStyles.deviceNome}>{dispositivo.nome}</Text>
                  <Text style={localStyles.deviceInfo}>
                    Bateria {dispositivo.bateria}% · {dispositivo.local}
                  </Text>
                </View>
                <BarrasSinal nivel={dispositivo.sinal} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Botão fixo de conectar, sempre referente ao dispositivo selecionado. */}
      <View style={localStyles.footer}>
        <TouchableOpacity style={localStyles.connectButton}>
          <Text style={localStyles.connectButtonText}>
            Conectar {dispositivoAtivo?.nome}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const localStyles = {
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  scroll: {
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 20,
  },
  radarWrap: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  anel: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.orange,
  },
  radarCenter: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 19,
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  deviceRowActive: {
    borderColor: colors.navy,
    backgroundColor: "#F7F8FB",
  },
  deviceIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.orangeSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  deviceNome: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  deviceInfo: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  sinalRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  sinalBarra: {
    width: 3,
    borderRadius: 2,
    marginLeft: 2,
  },
  footer: {
    paddingHorizontal: 22,
    paddingBottom: 22,
    paddingTop: 8,
  },
  connectButton: {
    backgroundColor: colors.navy,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  connectButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
};
