// Estilos externos e compartilhados das 4 telas de apresentação
// (Dispositivo, Apresentacao2, Apresentacao3 e Apresentacao4): container,
// botão de voltar, bloco central (imagem/título/descrição) e rodapé.

import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const apresentacaoStyles = StyleSheet.create({
  // Container geral da tela.
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Botão de voltar (‹), no canto superior esquerdo.
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backButtonText: {
    fontSize: 30,
    color: colors.text,
    fontWeight: "700",
  },

  // Bloco central: imagem + título (com destaque em laranja) + descrição.
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  mockup: {
    width: 260,
    height: 260,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 34,
  },
  titleNavy: {
    color: colors.navy,
  },
  titleOrange: {
    color: colors.orange,
  },
  description: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    marginTop: 14,
    lineHeight: 21,
  },

  // Rodapé: dots de progresso + botão de avançar/concluir.
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingBottom: 24,
    paddingTop: 8,
  },
  dots: {
    flexDirection: "row",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: colors.orange,
    width: 18,
  },
  nextButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.navy,
    alignItems: "center",
    justifyContent: "center",
  },
  nextArrow: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
  },
});

export default apresentacaoStyles;
