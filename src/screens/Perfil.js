// Tela de perfil: avatar, nome/e-mail, status da smartband conectada e a
// lista de opções (dispositivos, notificações, privacidade, ajuda).

// Imports de componentes, ícones e estilos compartilhados.
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Itens do menu do perfil, cada um com a rota que deve abrir.
const OPCOES = [
  { id: "1", icone: "phone-portrait-outline", texto: "Meus dispositivos", rota: "MeusDispositivos" },
  { id: "2", icone: "notifications-outline", texto: "Notificações", rota: "Notificacoes" },
  { id: "3", icone: "shield-checkmark-outline", texto: "Privacidade e dados", rota: "PrivacidadeDados" },
  { id: "4", icone: "help-circle-outline", texto: "Ajuda e suporte", rota: "AjudaSuporte" },
];

export default function Perfil({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Título da tela. */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Avatar, nome, e-mail e botão de editar perfil. */}
        <View style={localStyles.avatarBlock}>
          <View style={localStyles.avatar}>
            <Text style={localStyles.avatarLetter}>A</Text>
          </View>
          <Text style={localStyles.nome}>Ana Beatriz Costa</Text>
          <Text style={localStyles.email}>ana.costa@email.com</Text>

          <TouchableOpacity
            style={localStyles.editButton}
            onPress={() => navigation.navigate("EditarPerfil")}
          >
            <Text style={localStyles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Card da smartband conectada. */}
        <View style={[styles.cardDark, localStyles.deviceCard]}>
          <View style={localStyles.deviceIconBox}>
            <Ionicons name="watch-outline" size={20} color={colors.white} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={localStyles.deviceTitle}>Smartband NeuroPulse</Text>
            <Text style={localStyles.deviceSubtitle}>Conectado · sincronizado agora</Text>
          </View>
          <Text style={localStyles.deviceBattery}>82%</Text>
        </View>

        {/* Lista de opções do perfil. */}
        <View style={{ marginTop: 22 }}>
          {OPCOES.map((opcao) => (
            <TouchableOpacity
              key={opcao.id}
              style={styles.listRow}
              onPress={() => navigation.navigate(opcao.rota)}
            >
              <View style={styles.listRowLeft}>
                <Ionicons name={opcao.icone} size={20} color={colors.navy} />
                <Text style={styles.listRowText}>{opcao.texto}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const localStyles = {
  avatarBlock: {
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.white,
  },
  nome: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginTop: 12,
  },
  email: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  editButton: {
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
  },
  deviceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  deviceSubtitle: {
    fontSize: 12,
    color: "#AEB7C9",
    marginTop: 2,
  },
  deviceBattery: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.white,
  },
};
