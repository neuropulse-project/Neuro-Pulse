// Tela de recuperação de senha, acessada pelo link "Esqueceu a senha?" no
// Login. Tem dois estados visuais: formulário de e-mail e confirmação de
// envio. Estilos em comum vêm de "auth.styles.js".

// Imports de componentes, estilos e cores.
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import authStyles from "../styles/auth.styles";
import colors from "../theme/colors";

export default function EsqueciSenha({ navigation }) {
  // Estado do e-mail digitado e da etapa atual (formulário ou confirmação).
  const [Email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  // Simula o envio do link de recuperação (troque pela chamada real à API
  // quando houver um backend/serviço de autenticação).
  const handleEnviar = () => {
    if (!Email) return;
    setEnviado(true);
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar. */}
      <TouchableOpacity
        style={authStyles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={10}
      >
        <Text style={authStyles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {!enviado ? (
            // Estado 1: formulário pedindo o e-mail.
            <>
              <Text style={styles.title}>Esqueceu a senha?</Text>
              <Text style={styles.subtitle}>
                Digite seu e-mail cadastrado e enviaremos um link para você criar uma nova senha.
              </Text>

              <View>
                <Text style={authStyles.label}>Email</Text>
                <TextInput
                  placeholder="Digite seu Email"
                  placeholderTextColor={colors.muted}
                  keyboardType="email-address"
                  value={Email}
                  onChangeText={setEmail}
                  style={authStyles.input}
                />
              </View>

              <View style={[authStyles.buttonRow, styles.buttonSpacing]}>
                <TouchableOpacity style={authStyles.button} onPress={handleEnviar}>
                  <Text style={authStyles.buttonText}>Enviar link de recuperação</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            // Estado 2: confirmação de que o link foi enviado.
            <>
              <Text style={styles.title}>Verifique seu e-mail</Text>
              <Text style={styles.subtitle}>
                Enviamos um link de recuperação para {Email || "seu e-mail"}. Abra a mensagem e
                siga as instruções para criar uma nova senha.
              </Text>

              <View style={[authStyles.buttonRow, styles.buttonSpacing]}>
                <TouchableOpacity
                  style={authStyles.button}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={authStyles.buttonText}>Voltar para o login</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleEnviar}>
                <Text style={styles.resendText}>Não recebeu? Reenviar e-mail</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Rodapé com link fixo de volta ao Login. */}
          <View style={[authStyles.footerRow, { marginTop: 32 }]}>
            <Text style={authStyles.footerText}>Lembrou a senha? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={authStyles.link}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    paddingTop: 16,
    backgroundColor: colors.bg,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 10,
    lineHeight: 21,
  },
  buttonSpacing: {
    marginTop: 26,
  },
  resendText: {
    textAlign: "center",
    marginTop: 18,
    fontSize: 13,
    color: colors.orange,
    fontWeight: "700",
  },
});
