// Tela de privacidade: aviso sobre criptografia dos dados, opção de
// compartilhar dados anônimos para pesquisa, e links para exportar dados,
// política de privacidade, termos de uso e exclusão de conta.

// Imports de componentes, ícones e estilos compartilhados.
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles, { iconTones } from "../styles/dashboard.styles";
import colors from "../theme/colors";

// Links da tela. "Excluir minha conta" é tratado à parte, por ser uma
// ação destrutiva (texto/ícone em vermelho, sem seta).
const LINKS = [
  { id: "1", icone: "download-outline", texto: "Exportar meus dados" },
  { id: "2", icone: "shield-outline", texto: "Política de privacidade" },
  { id: "3", icone: "document-text-outline", texto: "Termos de uso" },
];

export default function PrivacidadeDados({ navigation }) {
  // Estado do switch "dados anônimos para pesquisa".
  const [dadosAnonimos, setDadosAnonimos] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Cabeçalho com seta de voltar. */}
        <View style={styles.headerWithBack}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={10}>
            <Text style={styles.backButtonText}>{"‹"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerWithBackTitle}>Privacidade e dados</Text>
        </View>

        {/* Aviso sobre criptografia dos dados. */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerText}>
            Seus dados fisiológicos são criptografados de ponta a ponta e nunca são vendidos a
            terceiros.
          </Text>
        </View>

        {/* Compartilhamento de dados anônimos para pesquisa. */}
        <Text style={styles.sectionTitle}>Compartilhamento</Text>
        <View style={styles.toggleRow}>
          <View style={[styles.iconCircleSmall, { backgroundColor: iconTones.zen.bg }]}>
            <Ionicons name="analytics-outline" size={16} color={iconTones.zen.icon} />
          </View>
          <View style={styles.toggleTextWrap}>
            <Text style={styles.toggleTitle}>Dados anônimos para pesquisa</Text>
            <Text style={styles.toggleDescription}>Ajuda a melhorar o NeuroPulse</Text>
          </View>
          <Switch
            value={dadosAnonimos}
            onValueChange={setDadosAnonimos}
            trackColor={{ false: colors.border, true: colors.navy }}
            thumbColor={colors.white}
          />
        </View>

        {/* Links de privacidade + ação destrutiva de excluir conta. */}
        <View style={{ marginTop: 12 }}>
          {LINKS.map((link) => (
            <TouchableOpacity key={link.id} style={styles.listRow}>
              <View style={styles.listRowLeft}>
                <Ionicons name={link.icone} size={20} color={colors.orange} />
                <Text style={styles.listRowText}>{link.texto}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.muted} />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={[styles.listRow, { borderBottomWidth: 0 }]}>
            <View style={styles.listRowLeft}>
              <Ionicons name="trash-outline" size={20} color="#E4483A" />
              <Text style={[styles.listRowText, { color: "#E4483A" }]}>Excluir minha conta</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
