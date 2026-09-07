// 2ª tela da sequência de apresentação (após Dispositivo.js). Destaca o
// monitoramento cardíaco em tempo real. Estilos compartilhados vêm de
// "apresentacao.styles.js".

// Imports de componentes, estilos e cores.
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import styles from "../styles/apresentacao.styles";
import colors from "../theme/colors";

export default function Apresentacao2({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Barra de status do sistema. */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Botão de voltar para a tela anterior (Dispositivo). */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={10}
      >
        <Text style={styles.backButtonText}>{"‹"}</Text>
      </TouchableOpacity>

      {/* Conteúdo central: ícone de coração + título + descrição. */}
      <View style={styles.content}>
        <Image
          source={require("../../assets/imagens/HeroCoracao.png")}
          style={styles.mockup}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          <Text style={styles.titleNavy}>Acompanhe seu </Text>
          <Text style={styles.titleOrange}>coração</Text>
        </Text>

        <Text style={styles.description}>
          Veja sua frequência cardíaca e variabilidade em tempo real, com alertas quando
          algo sair do padrão.
        </Text>
      </View>

      {/* Rodapé: dots indicando a posição (2 de 4) + botão de avançar. */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Apresentacao3")}
        >
          <Text style={styles.nextArrow}>{"→"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
