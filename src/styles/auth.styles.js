// Estilos em comum entre as telas de autenticação (Login, Cadastro e
// EsqueciSenha): estrutura da tela, formulário, botão principal, login
// social e rodapé. Cada tela mantém no próprio arquivo o que só ela usa.

import { StyleSheet } from "react-native";
import colors from "../theme/colors";

const authStyles = StyleSheet.create({
  // Estrutura geral da tela.
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // Botão de voltar, no canto superior esquerdo.
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backButtonText: {
    fontSize: 30,
    color: colors.text,
    fontWeight: "700",
  },

  // Campos de formulário (rótulo + input).
  label: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.inputBg,
  },

  // Botão principal, cor navy e largura total.
  buttonRow: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    backgroundColor: colors.navy,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  // Separador "ou entre via", entre o formulário e o login social.
  separatorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  separatorLinha: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  orText: {
    textAlign: "center",
    color: colors.muted,
    fontSize: 14,
  },

  // Botões de login/cadastro social (Google/Facebook).
  redesocial: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  redesocialButton: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 10,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Rodapé com link (ex: "Já tem uma conta? Entrar").
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13,
    color: colors.muted,
  },
  link: {
    fontSize: 13,
    color: colors.orange,
    fontWeight: "700",
  },
});

export default authStyles;
