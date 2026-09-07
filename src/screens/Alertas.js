// Lista de notificações do NeuroPulse, agrupadas por dia (Hoje / Ontem).
// Cada alerta tem um ícone colorido, título, descrição e horário.

// Imports de componentes, ícones e estilos compartilhados.
import { View, Text, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { iconTones } from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Alertas de hoje (mock — numa versão real viriam de uma API/backend).
const ALERTAS_HOJE = [
  {
    id: "1",
    tone: { ...iconTones.heart, iconName: "heart" },
    titulo: "Frequência cardíaca elevada",
    descricao: "Detectamos 118 bpm em repouso às 14:32. Respire fundo por 1 minuto.",
    horario: "Há 12 minutos",
  },
  {
    id: "2",
    tone: { ...iconTones.zen, iconName: "body" },
    titulo: "Hora de uma pausa",
    descricao: "Seu nível de estresse subiu nas últimas 2 horas. Que tal uma caminhada curta?",
    horario: "Há 1 hora",
  },
];

// Alertas de ontem (mock).
const ALERTAS_ONTEM = [
  {
    id: "3",
    tone: { ...iconTones.moon, iconName: "moon" },
    titulo: "Seu relatório semanal está pronto",
    descricao: "Você dormiu em média 7h52 essa semana, 12% a mais que a anterior.",
    horario: "Ontem, 08:00",
  },
  {
    id: "4",
    tone: { ...iconTones.orange, iconName: "watch" },
    titulo: "Bateria da pulseira em 20%",
    descricao: "Conecte sua NeuroPulse Band ao carregador.",
    horario: "Ontem, 19:41",
  },
];

// Card de um alerta individual (ícone + título + descrição + horário).
function AlertaCard({ alerta }) {
  return (
    <View style={[styles.cardSoft, localStyles.alertCard]}>
      <View style={[styles.iconCircleSmall, { backgroundColor: alerta.tone.bg }]}>
        <Ionicons name={alerta.tone.iconName} size={17} color={alerta.tone.icon} />
      </View>
      <View style={localStyles.alertTextWrap}>
        <Text style={localStyles.alertTitulo}>{alerta.titulo}</Text>
        <Text style={localStyles.alertDescricao}>{alerta.descricao}</Text>
        <Text style={localStyles.alertHorario}>{alerta.horario}</Text>
      </View>
    </View>
  );
}

export default function Alertas() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Título da tela. */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Alertas</Text>
        </View>

        {/* Alertas de hoje. */}
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Hoje</Text>
        {ALERTAS_HOJE.map((alerta) => (
          <AlertaCard key={alerta.id} alerta={alerta} />
        ))}

        {/* Alertas de ontem. */}
        <Text style={styles.sectionTitle}>Ontem</Text>
        {ALERTAS_ONTEM.map((alerta) => (
          <AlertaCard key={alerta.id} alerta={alerta} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const localStyles = {
  alertCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  alertTextWrap: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  alertDescricao: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
    lineHeight: 19,
  },
  alertHorario: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 6,
  },
};
