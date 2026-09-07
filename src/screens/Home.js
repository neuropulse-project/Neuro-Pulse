// Tela inicial após o login: resumo rápido de saúde do dia (frequência
// cardíaca, sono, estresse, passos) e uma dica com base no dia anterior.

// Imports de componentes, ícones, SVG e estilos compartilhados.
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import styles, { iconTones } from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Pequeno cartão usado na seção "Acesso rápido".
function AcessoRapidoCard({ tone, value, label }) {
  return (
    <View style={[localStyles.quickCard]}>
      <View style={[styles.iconCircle, { backgroundColor: tone.bg }]}>
        <Ionicons name={tone.iconName} size={20} color={tone.icon} />
      </View>
      <Text style={localStyles.quickValue}>{value}</Text>
      <Text style={localStyles.quickLabel}>{label}</Text>
    </View>
  );
}

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Saudação + atalho para notificações. */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              <Ionicons name="sunny" size={18} color={colors.orange} /> Olá,{" "}
              <Text style={{ color: colors.orangeDeep }}>Ana</Text>
            </Text>
            <Text style={styles.headerSubtitle}>Seu resumo de hoje está pronto</Text>
          </View>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => navigation.navigate("Alertas")}
          >
            <Ionicons name="notifications-outline" size={20} color={colors.orange} />
            <View style={localStyles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Card de destaque: frequência cardíaca agora. */}
        <View style={styles.cardDark}>
          <Text style={localStyles.darkLabel}>FREQUÊNCIA CARDÍACA AGORA</Text>
          <Text style={localStyles.darkValue}>
            72 <Text style={localStyles.darkUnit}>bpm</Text> · estável
          </Text>

          <View style={localStyles.darkStatsRow}>
            <View>
              <Text style={localStyles.darkStatValue}>8h 24m</Text>
              <Text style={localStyles.darkStatLabel}>Sono</Text>
            </View>
            <View>
              <Text style={localStyles.darkStatValue}>Baixo</Text>
              <Text style={localStyles.darkStatLabel}>Estresse</Text>
            </View>
            <View>
              <Text style={localStyles.darkStatValue}>6.2k</Text>
              <Text style={localStyles.darkStatLabel}>Passos</Text>
            </View>
          </View>

          {/* Linha de pulso decorativa, abaixo das estatísticas. */}
          <Svg width="100%" height={18} viewBox="0 0 200 18" style={{ marginTop: 10 }}>
            <Path
              d="M0,9 H70 L80,2 L90,16 L100,6 L108,9 H200"
              fill="none"
              stroke={colors.orange}
              strokeWidth={1.5}
              strokeOpacity={0.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>

        {/* Seção "Acesso rápido": coração, sono e estresse. */}
        <Text style={styles.sectionTitle}>Acesso rápido</Text>
        <View style={localStyles.quickRow}>
          <AcessoRapidoCard
            tone={{ ...iconTones.heart, iconName: "heart" }}
            value="72"
            label="Coração"
          />
          <AcessoRapidoCard
            tone={{ ...iconTones.moon, iconName: "moon" }}
            value="8h24"
            label="Sono"
          />
          <AcessoRapidoCard
            tone={{ ...iconTones.zen, iconName: "body" }}
            value="Baixo"
            label="Estresse"
          />
        </View>

        {/* Card com a dica do dia. */}
        <View style={[styles.cardSoft, localStyles.tipCard]}>
          <View style={[styles.iconCircleSmall, { backgroundColor: colors.orange }]}>
            <Ionicons name="sunny" size={16} color={colors.white} />
          </View>
          <Text style={localStyles.tipText}>
            Você dormiu <Text style={localStyles.tipHighlight}>40min a mais</Text> que ontem.
            Continue assim para manter o equilíbrio.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const localStyles = {
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E4483A",
    borderWidth: 1.5,
    borderColor: colors.orangeSoft,
  },
  darkLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#AEB7C9",
    letterSpacing: 0.5,
  },
  darkValue: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    marginTop: 6,
  },
  darkUnit: {
    fontSize: 16,
    fontWeight: "600",
  },
  darkStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  darkStatValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  darkStatLabel: {
    fontSize: 12,
    color: "#AEB7C9",
    marginTop: 2,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickCard: {
    width: "31%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    alignItems: "flex-start",
  },
  quickValue: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginTop: 10,
  },
  quickLabel: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  tipText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
  },
  tipHighlight: {
    fontWeight: "800",
  },
};
