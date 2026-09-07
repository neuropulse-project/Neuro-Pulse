// Tela de criação de conta (e-mail, senha e confirmação), com cadastro
// social (Google/Facebook) e link de volta para o Login. Estilos em comum
// vêm de "auth.styles.js".

// Imports de componentes, estilos e cores.
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import authStyles from "../styles/auth.styles";
import colors from "../theme/colors";

export default function Cadastro({ navigation }) {
  // Estados dos campos do formulário.
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [ConfirmarSenha, setConfirmarSenha] = useState("");

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
          {/* Título da tela. */}
          <Text style={styles.title}>Cadastra-se</Text>

          {/* Campos de e-mail, senha e confirmação de senha. */}
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

            <Text style={authStyles.label}>Senha</Text>
            <TextInput
              placeholder="Digite sua Senha"
              placeholderTextColor={colors.muted}
              secureTextEntry
              value={Senha}
              onChangeText={setSenha}
              style={authStyles.input}
            />

            <Text style={authStyles.label}> Confirmar Senha</Text>
            <TextInput
              placeholder="Digite sua Senha"
              placeholderTextColor={colors.muted}
              secureTextEntry
              value={ConfirmarSenha}
              onChangeText={setConfirmarSenha}
              style={authStyles.input}
            />
          </View>

          {/* Botão "Cadastrar". */}
          <View style={authStyles.buttonRow}>
            <TouchableOpacity
              style={authStyles.button}
              onPress={() => navigation.navigate("Dispositivo")}
            >
              <Text style={authStyles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          {/* Separador "Ou entre via". */}
          <View style={authStyles.separatorRow}>
            <View style={authStyles.separatorLinha} />
            <Text style={authStyles.orText}> Ou entre via </Text>
            <View style={authStyles.separatorLinha} />
          </View>

          {/* Cadastro social: Google e Facebook. */}
          <View style={authStyles.redesocial}>
            <TouchableOpacity
              style={authStyles.redesocialButton}
              onPress={() => navigation.navigate("Dispositivo")}
            >
              <Image
                source={require("../../assets/imagens/Google.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={authStyles.redesocialButton}
              onPress={() => navigation.navigate("Dispositivo")}
            >
              <Image
                source={require("../../assets/imagens/Facebook.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Link "Já tem uma conta? Entrar". */}
          <View style={[authStyles.footerRow, { marginTop: 12 }]}>
            <Text style={authStyles.footerText}>Já tem uma conta? </Text>
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
    paddingTop: 8,
    backgroundColor: colors.bg,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    alignSelf: "flex-start",
    color: colors.text,
    marginTop: 12,
  },
});
