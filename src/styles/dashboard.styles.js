// Estilos e cores compartilhados pelas telas do app logado (Home, Painel,
// Alertas, Perfil e as telas de detalhe abertas a partir do Perfil).
// Cada tela mantém no próprio arquivo só o que é exclusivo dela.

import { StyleSheet } from "react-native";
import colors from "../theme/colors";

// Cor de fundo dos círculos de ícone (Acesso rápido, alertas, lista do perfil).
export const iconTones = {
  heart: { icon: colors.heart, bg: colors.heartBg },
  moon: { icon: colors.moon, bg: colors.moonBg },
  zen: { icon: colors.zen, bg: colors.zenBg },
  lungs: { icon: colors.lungs, bg: colors.lungsBg },
  orange: { icon: colors.orange, bg: colors.orangeSoft },
  navy: { icon: colors.navy, bg: "#E7E9EE" },
};

// Gradiente laranja único do app: usado nas barras de atividade do Painel
// e no fundo do avatar do Editar Perfil, sempre com os mesmos tons/paradas.
export const orangeGradient = {
  id: "orangeGradient",
  stops: [
    { offset: "0%", color: colors.orangeSoft },
    { offset: "100%", color: colors.orangeDeep },
  ],
};

const dashboardStyles = StyleSheet.create({
  // Estrutura geral da tela (SafeAreaView + padding do ScrollView).
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    padding: 22,
    paddingBottom: 40,
  },

  // Botão de voltar simples, usado nas telas de detalhe.
  backButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 28,
    color: colors.text,
    fontWeight: "700",
  },

  // Cabeçalho com seta de voltar + título (telas de detalhe do Perfil).
  headerWithBack: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerWithBackTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: colors.text,
    marginLeft: 4,
  },

  // Cabeçalho padrão (título da tela + ação opcional à direita).
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orangeSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  // Título de seção em caixa alta (ex: "Acesso rápido", "HOJE").
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 22,
  },

  // Variações de card reaproveitadas nas telas (padrão, escuro e suave).
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDark: {
    backgroundColor: colors.navy,
    borderRadius: 18,
    padding: 18,
  },
  cardSoft: {
    backgroundColor: colors.splashBg,
    borderRadius: 18,
    padding: 16,
  },

  // Círculos coloridos usados atrás de ícones, em dois tamanhos.
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleSmall: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  // Badge/pill pequeno (ex: "-3%", "Meta batida").
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },

  // Linha com ícone + título + descrição + Switch (Notificações, Privacidade).
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  toggleTextWrap: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  toggleDescription: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },

  // Banner informativo (aviso em destaque no topo de uma tela).
  infoBanner: {
    backgroundColor: colors.splashBg,
    borderRadius: 14,
    padding: 14,
  },
  infoBannerText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
  },

  // Linha de lista com ícone + texto + seta (usada no Perfil).
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listRowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  listRowText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 12,
  },
});

export default dashboardStyles;
