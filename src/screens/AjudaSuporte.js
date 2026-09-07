// Tela de ajuda: busca, atalhos para falar com o suporte/central de ajuda
// e uma lista de perguntas frequentes.

// Imports de componentes, ícones e estilos compartilhados.
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Perguntas frequentes exibidas na lista.
const PERGUNTAS = [
  { id: "1", texto: "Como conectar minha pulseira?" },
  { id: "2", texto: "Como funciona o cálculo de estresse?" },
  { id: "3", texto: "Como exportar meus dados?" },
  { id: "4", texto: "Esqueci minha senha, e agora?" },
];

export default function AjudaSuporte({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com seta de voltar. */}
        <View style={styles.headerWithBack}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.backButtonText}>{"‹"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerWithBackTitle}>Ajuda e suporte</Text>
        </View>

        {/* Campo de busca. */}
        <View style={localStyles.searchBox}>
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <TextInput
            placeholder="Buscar ajuda"
            placeholderTextColor={colors.muted}
            style={localStyles.searchInput}
          />
        </View>

        {/* Atalhos de contato: fale conosco e central de ajuda. */}
        <View style={localStyles.actionsRow}>
          <TouchableOpacity style={[styles.cardDark, localStyles.actionCard]}>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color={colors.white} />
            <Text style={localStyles.actionText}>Fale conosco</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.cardDark, localStyles.actionCard]}>
            <Ionicons name="bookmark-outline" size={22} color={colors.white} />
            <Text style={localStyles.actionText}>Central de ajuda</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de perguntas frequentes. */}
        <Text style={styles.sectionTitle}>Perguntas frequentes</Text>
        {PERGUNTAS.map((pergunta) => (
          <TouchableOpacity key={pergunta.id} style={styles.listRow}>
            <Text style={[styles.listRowText, { marginLeft: 0 }]}>{pergunta.texto}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const localStyles = {
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: colors.text,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionCard: {
    width: "48%",
    alignItems: "flex-start",
  },
  actionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 22,
  },
};
