// Tela de edição do perfil: avatar (com o gradiente laranja padrão do app),
// formulário de nome/e-mail/senha e a seção "Conta" (telefone e endereço).

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import styles, { orangeGradient } from "../styles/dashboard.styles";
import authStyles from "../styles/auth.styles";
import colors from "../theme/colors";

// Itens da seção "Conta".
const CONTA = [
  { id: "1", icone: "call-outline", texto: "Telefone" },
  { id: "2", icone: "home-outline", texto: "Endereço" },
];

export default function EditarPerfil({ navigation }) {
  // Estados do formulário, pré-preenchidos com os dados atuais (mock).
  const [nome, setNome] = useState("Ana Beatriz Costa");
  const [email, setEmail] = useState("ana.costa@email.com");
  const [senha, setSenha] = useState("••••••••");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar. */}
      <TouchableOpacity style={localStyles.backButton} onPress={() => navigation.goBack()} hitSlop={10}>
        <Text style={styles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Título centralizado. */}
          <Text style={localStyles.title}>Editar perfil</Text>
          <Text style={localStyles.subtitle}>Atualize suas informações pessoais</Text>

          {/* Avatar com o mesmo gradiente laranja usado no Painel. */}
          <View style={localStyles.avatarWrap}>
            <Svg width={84} height={84} style={{ position: "absolute" }}>
              <Defs>
                <LinearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
                  {orangeGradient.stops.map((s, idx) => (
                    <Stop key={idx} offset={s.offset} stopColor={s.color} />
                  ))}
                </LinearGradient>
              </Defs>
              <Circle cx={42} cy={42} r={42} fill="url(#avatarGrad)" />
            </Svg>
            <Text style={localStyles.avatarLetter}>A</Text>
          </View>

          {/* Formulário: nome, e-mail e senha. */}
          <TextInput
            value={nome}
            onChangeText={setNome}
            style={[authStyles.input, { marginTop: 26 }]}
            placeholderTextColor={colors.muted}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={authStyles.input}
            placeholderTextColor={colors.muted}
          />
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={authStyles.input}
            placeholderTextColor={colors.muted}
          />

          {/* Botão de salvar. */}
          <View style={[authStyles.buttonRow, { marginTop: 22 }]}>
            <TouchableOpacity style={authStyles.button}>
              <Text style={authStyles.buttonText}>Salvar alterações</Text>
            </TouchableOpacity>
          </View>

          {/* Seção "Conta": telefone e endereço. */}
          <Text style={styles.sectionTitle}>Conta</Text>
          {CONTA.map((item) => (
            <TouchableOpacity key={item.id} style={styles.listRow}>
              <View style={styles.listRowLeft}>
                <Ionicons name={item.icone} size={20} color={colors.navy} />
                <Text style={styles.listRowText}>{item.texto}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Estilos específicos desta tela.
const localStyles = {
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    marginTop: 4,
  },
  avatarWrap: {
    width: 84,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 22,
  },
  avatarLetter: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.white,
  },
};
