// Tela de acesso (e-mail/senha), com "Guardar login", link de recuperação
// de senha, login social (Google/Facebook) e atalho para o Cadastro.
// Estilos em comum vêm de "auth.styles.js".

// Imports de componentes, bibliotecas externas, estilos e cores.
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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import authStyles from "../styles/auth.styles";
import colors from "../theme/colors";

export default function Login({ navigation }) {
  // Estados dos campos do formulário.
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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
          <Text style={styles.title}>Acesse</Text>

          {/* Campos de e-mail e senha. */}
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
          </View>

          {/* Checkbox "Guardar login" + link "Esqueceu a senha?". */}
          <View style={styles.checkboxRow}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <BouncyCheckbox
                size={18}
                fillColor={colors.navy}
                unfillColor={colors.white}
                iconStyle={{ borderColor: colors.navy }}
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={isChecked}
                onPress={setIsChecked}
                text="Guardar login"
                textStyle={styles.checkboxLabel}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("EsqueciSenha")}>
              <Text style={styles.forgotText}> Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          {/* Botões "Entrar" (primário) e "Cadastro" (contorno). */}
          <View style={authStyles.buttonRow}>
            <TouchableOpacity
              style={authStyles.button}
              onPress={() => navigation.navigate("Dispositivo")}
            >
              <Text style={authStyles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={() => navigation.navigate("Cadastro")}
            >
              <Text style={styles.buttonOutlineText}>Cadastro</Text>
            </TouchableOpacity>
          </View>

          {/* Separador "Ou entre via". */}
          <View style={authStyles.separatorRow}>
            <View style={authStyles.separatorLinha} />
            <Text style={authStyles.orText}> Ou entre via </Text>
            <View style={authStyles.separatorLinha} />
          </View>

          {/* Login social: Google e Facebook. */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela (o que não é comum com Cadastro/EsqueciSenha).
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: colors.text,
  },
  forgotText: {
    color: colors.orange,
    fontSize: 13,
    fontWeight: "700",
  },
  buttonOutline: {
    flex: 1,
    borderColor: colors.navy,
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 20,
    backgroundColor: colors.white,
  },
  buttonOutlineText: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "700",
  },
});
