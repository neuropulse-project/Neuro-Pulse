// Tela de preferências de notificação, agrupadas em seções (Alertas de
// saúde, Atividade, Geral). Cada linha tem ícone, título, descrição e um
// Switch para ligar/desligar aquele tipo de aviso.

// Imports de componentes, ícones e estilos compartilhados.
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { iconTones } from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Estado inicial de cada preferência (mock — viria do backend numa versão real).
const PREFERENCIAS_INICIAIS = {
  frequenciaElevada: true,
  estresseAlto: true,
  lembretePausa: false,
  relatorioSemanal: true,
  metaDiaria: true,
  push: true,
  email: false,
};

// Uma linha de preferência: ícone colorido + título + descrição + switch.
function LinhaToggle({ tone, iconName, titulo, descricao, valor, aoAlternar }) {
  return (
    <View style={styles.toggleRow}>
      <View style={[styles.iconCircleSmall, { backgroundColor: tone.bg }]}>
        <Ionicons name={iconName} size={16} color={tone.icon} />
      </View>
      <View style={styles.toggleTextWrap}>
        <Text style={styles.toggleTitle}>{titulo}</Text>
        <Text style={styles.toggleDescription}>{descricao}</Text>
      </View>
      <Switch
        value={valor}
        onValueChange={aoAlternar}
        trackColor={{ false: colors.border, true: colors.navy }}
        thumbColor={colors.white}
      />
    </View>
  );
}

export default function Notificacoes({ navigation }) {
  // Estado com todas as preferências de notificação (liga/desliga).
  const [prefs, setPrefs] = useState(PREFERENCIAS_INICIAIS);

  // Alterna uma preferência específica, mantendo as demais como estão.
  const alternar = (chave) => (valor) => {
    setPrefs((atual) => ({ ...atual, [chave]: valor }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com seta de voltar. */}
        <View style={styles.headerWithBack}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.backButtonText}>{"‹"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerWithBackTitle}>Notificações</Text>
        </View>

        {/* Seção: alertas de saúde. */}
        <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Alertas de saúde</Text>
        <LinhaToggle
          tone={iconTones.heart}
          iconName="heart"
          titulo="Frequência cardíaca elevada"
          descricao="Avisar quando o bpm sair do padrão"
          valor={prefs.frequenciaElevada}
          aoAlternar={alternar("frequenciaElevada")}
        />
        <LinhaToggle
          tone={iconTones.zen}
          iconName="body"
          titulo="Nível de estresse alto"
          descricao="Alertar em picos de estresse"
          valor={prefs.estresseAlto}
          aoAlternar={alternar("estresseAlto")}
        />
        <LinhaToggle
          tone={iconTones.moon}
          iconName="moon"
          titulo="Lembrete de pausa"
          descricao="Sugestões de pausas ao longo do dia"
          valor={prefs.lembretePausa}
          aoAlternar={alternar("lembretePausa")}
        />

        {/* Seção: atividade. */}
        <Text style={styles.sectionTitle}>Atividade</Text>
        <LinhaToggle
          tone={iconTones.orange}
          iconName="stats-chart"
          titulo="Relatório semanal"
          descricao="Resumo todo domingo às 8h"
          valor={prefs.relatorioSemanal}
          aoAlternar={alternar("relatorioSemanal")}
        />
        <LinhaToggle
          tone={iconTones.navy}
          iconName="checkmark-circle-outline"
          titulo="Meta diária atingida"
          descricao="Comemorar quando bater a meta"
          valor={prefs.metaDiaria}
          aoAlternar={alternar("metaDiaria")}
        />

        {/* Seção: geral. */}
        <Text style={styles.sectionTitle}>Geral</Text>
        <LinhaToggle
          tone={iconTones.orange}
          iconName="phone-portrait-outline"
          titulo="Notificações push"
          descricao="Alertas direto no seu celular"
          valor={prefs.push}
          aoAlternar={alternar("push")}
        />
        <LinhaToggle
          tone={iconTones.moon}
          iconName="mail-outline"
          titulo="Notificações por e-mail"
          descricao="Receber também no seu e-mail"
          valor={prefs.email}
          aoAlternar={alternar("email")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
